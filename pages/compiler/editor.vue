<template>
  <NuxtLayout :name="layout" page="editor" header="Home" title="Editor">
    <compiler-language
      v-if="modal"
      :selectLanguage="
        (id, language) => {
          selected = language
          closeModal()
          swiftLanguage(id)
        }
      "
    ></compiler-language>
    <message-alert :message="message" @close="(x) => (message = x)" />
    <div :class="{ 'editor w-full': true, 'blur-md': blur }">
      <div class="py-4 px-3 flex justify-end md:justify-start">
        <ui-button-secondary @click="openModal">
          <span class="select-btn">{{ selected }}</span>
        </ui-button-secondary>
      </div>
      <div class="w-full px-3 pb-5" style="height: calc(100vh - 50px)">
        <div class="h-full">
          <iframe
            title="compiler"
            id="oc-editor"
            class="h-full w-full rounded-lg"
            src="https://onecompiler.com/embed?hideTitle=true&codeChangeEvent=true&listenToEvents=true&hideNew=true&hideLanguageSelection=true"
          ></iframe>
        </div>
      </div>
      <div v-if="session._id">
        <div
          class="pb-5 px-5 flex flex-col-reverse md:flex-row justify-between"
        >
          <div class="px-4 mt-3 md:mt-0">
            <ui-input-label value="Channel ID" />
            <div class="relative">
              <div
                v-if="!!channelId"
                class="absolute right-0 top-0 h-full aspect-square p-1"
              >
                <div
                  @click="copyChannel(channelId)"
                  class="h-full bg-gray-800 cursor-pointer border-2 border-indigo-400 rounded-md a-center p-1"
                >
                  <font-awesome-icon
                    style="color: #f1f5f9"
                    class="text-sm"
                    icon="fa-solid fa-clone"
                  />
                </div>
              </div>
              <ui-text-input
                className="block mt-1 w-full"
                :value="inputChannelId"
                @update:value="(x) => (inputChannelId = x)"
                :disabled="!!channelId"
              />
            </div>
            <div class="mt-1 flex justify-end md:justify-start">
              <ui-button-primary
                @click="joinChannel()"
                v-if="!loading.join && !channelId"
                class="mt-1"
              >
                Join Channel
              </ui-button-primary>
              <ui-button-danger
                @click="leaveChannel()"
                v-if="!loading.join && !!channelId"
                class="mt-1"
              >
                Leave Channel
              </ui-button-danger>
            </div>
          </div>
          <div class="flex justify-end md:block">
            <ui-switch
              id="sync_code"
              :value="codeSync"
              @update:checked="(x) => (codeSync = x)"
              prompt="Synchronize Code"
            ></ui-switch>
          </div>
        </div>
        <div class="a-center my-5">
          <Button
            @click="createChannel()"
            :disabled="loading.create || !!channelId"
            class="border-2 border-indigo-600 rounded-lg z-[1] py-4 px-10 bg-gray-800 text-slate-100 a-center"
          >
            <font-awesome-icon
              fill="#f1f5f9"
              class="mr-3"
              icon="fa-solid fa-plus"
            />
            <span class="font-normal">Create Channel</span>
          </Button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { validate, v4 as uuidv4 } from 'uuid'
import io from 'socket.io-client'

const { session } = await useSession()

const socket = io({
  path: '/api/socket.io/',
})

const layout = 'compiler'

const user_id = useState('user_id', () => '')
const modal = useState('modal', () => false)
const selected = useState('selected', () => 'Java')
const codeSync = useState('codeSync', () => false)
const blur = useState('blur', () => false)
const channelId = useState('channelId', () => '')
const inputChannelId = useState('inputChannelId', () => '')
const message = useState('message', () => '')

const loading = useState('loading', () => {
  return {
    create: false,
    join: false,
  }
})

const openModal = () => {
  modal.value = true
  blur.value = true
}

const closeModal = () => {
  modal.value = false
  blur.value = false
}

const swiftLanguage = (lang) => {
  let x = snippets[lang]
  let data = localStorage.getItem(lang)
  if (data) {
    x = JSON.parse(data)
  }
  editor.contentWindow?.postMessage(
    {
      eventType: 'populateCode',
      language: x.language,
      files: x.files,
    },
    '*'
  )
  const channel_id = localStorage.getItem('channel_id')
  if (channel_id && codeSync.value) {
    socket.emit('code-change', {
      channel_id,
      user_id: user_id.value,
      language: x.language,
      files: x.files,
    })
  }
}

socket.on('multicast', ({ sender_id, language, files }) => {
  if (sender_id == user_id.value || !codeSync.value) {
    return
  }
  selected.value = language
  if (!editor) {
    editor = document.getElementById('oc-editor')
  }
  editor.contentWindow?.postMessage(
    {
      eventType: 'populateCode',
      language: language,
      files: files,
    },
    '*'
  )
})

const handleData = (e) => {
  const channel_id = localStorage.getItem('channel_id')
  if (e.data && e.data.language) {
    const { language, files } = e.data
    localStorage.setItem(e.data.language, JSON.stringify({ language, files }))
    if (channel_id && codeSync.value) {
      socket.emit('code-change', {
        channel_id,
        user_id: user_id.value,
        language,
        files,
      })
    }
  }
}

const copyChannel = (channel_id, msg) => {
  navigator.clipboard
    .writeText(channel_id)
    .then(() => {
      message.value = msg || 'Copied to clipboard.'
    })
    .catch((err) => {
      console.log(err)
    })
}

const createChannel = async () => {
  if (loading.value.create) {
    return
  }
  loading.value.create = true
  try {
    const response = await $fetch('/api/channel/create', {
      method: 'POST',
      body: {
        _id: user_id.value,
      },
    })
    if (response.channel_id) {
      if (!validate(response.channel_id)) {
        return
      }
      socket.emit('connect-channel', {
        channel_id: response.channel_id,
        user_id: user_id.value,
      })
      localStorage.setItem('channel_id', response.channel_id)
      channelId.value = response.channel_id
      inputChannelId.value = response.channel_id
      copyChannel(
        response.channel_id,
        'Channel ID Created, Copied to clipboard.'
      )
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value.create = false
  }
}

const joinChannel = async () => {
  const channel_id = inputChannelId.value || localStorage.getItem('channel_id')
  if (loading.value.join || !channel_id) {
    return
  }
  if (!validate(channel_id)) {
    message.value = 'Invalid channel'
    return
  }
  loading.value.join = true
  try {
    const response = await $fetch('/api/channel/join', {
      method: 'POST',
      body: {
        _id: user_id.value,
        channel_id: channel_id,
      },
    })
    if (response.channel_id) {
      if (!validate(response.channel_id)) {
        return
      }
      socket.emit('connect-channel', {
        channel_id: response.channel_id,
        user_id: user_id.value,
      })
      localStorage.setItem('channel_id', response.channel_id)
      channelId.value = response.channel_id
      inputChannelId.value = response.channel_id
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value.join = false
  }
}

const leaveChannel = () => {
  socket.emit('leave-channel', {
    user_id: user_id.value,
  })
  channelId.value = ''
}

let editor = undefined

const getUserId = () => {
  let user_id = localStorage.getItem('user_id')
  if (!validate(user_id)) {
    user_id = uuidv4()
    localStorage.setItem('user_id', user_id)
  }
  return user_id
}

const runOnMount = () => {
  loading.value = {
    create: false,
    join: false,
  }
  message.value = ''
  codeSync.value = false
  user_id.value = getUserId()
  editor = document.getElementById('oc-editor')
  selected.value = 'Java'
  if (editor) {
    window.addEventListener('message', handleData)
  }
  inputChannelId.value = ''
  channelId.value = ''
}

onMounted(runOnMount)
</script>
