<template>
  <NuxtLayout :name="layout" title="register">
    <form @submit.prevent="registerSubmit">
      <!-- UserName -->
      <div>
        <ui-input-label for="username" :value="__('Username')" />
        <ui-text-input
          :value="body.username"
          @update:value="(x) => changeValue('username', x)"
          id="username"
          className="block mt-1 w-full"
          type="text"
          name="username"
          placeholder="Enter Username"
          required
          autofocus
        />
        <ui-input-error :messages="errors.username" className="mt-2" />
      </div>
      <!-- Name -->
      <div class="mt-2">
        <ui-input-label for="name" :value="__('Name')" />
        <ui-text-input
          :value="body.name"
          @update:value="(x) => changeValue('name', x)"
          id="name"
          className="block mt-1 w-full"
          type="text"
          placeholder="Enter Your Name"
          name="name"
          required
          autofocus
        />
        <ui-input-error :messages="null" className="mt-2" />
      </div>
      <!-- Email Address -->
      <div class="mt-2">
        <ui-input-label for="email" :value="__('Email')" />
        <ui-text-input
          :value="body.email"
          @update:value="(x) => changeValue('email', x)"
          id="email"
          className="block mt-1 w-full"
          type="email"
          placeholder="Enter Your Email Address"
          name="email"
          required
        />
        <ui-input-error :messages="null" className="mt-2" />
      </div>

      <div class="mt-2 flex space-x-2">
        <!-- Password -->
        <div>
          <ui-input-label for="password" :value="__('Password')" />
          <ui-text-input
            :value="body.passwd"
            @update:value="(x) => changeValue('passwd', x)"
            id="password"
            className="block mt-1 w-full"
            type="password"
            placeholder="Enter Strong Password"
            name="password"
            required
          />
          <ui-input-error :messages="errors.passwd" className="mt-2" />
        </div>
        <!-- Confirm Password -->
        <div>
          <ui-input-label
            for="password_confirmation"
            :value="__('Confirm Password')"
          />
          <ui-text-input
            :value="body.cpasswd"
            @update:value="(x) => changeValue('cpasswd', x)"
            id="password_confirmation"
            className="block mt-1 w-full"
            type="password"
            placeholder="Confirm Password"
            name="password_confirmation"
            required
          />
          <ui-input-error :messages="errors.cpasswd" className="mt-2" />
        </div>
      </div>

      <div class="flex items-center justify-between mt-4">
        <NuxtLink
          to="/login"
          class="underline text-sm text-gray-400 hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800"
        >
          {{ __('Already registered?') }}
        </NuxtLink>
        <ui-button-primary v-if="!loading" type="submit" class="ms-4">
          Register
        </ui-button-primary>
        <ui-button-loading v-if="loading" class="ms-4">
          Creating...
        </ui-button-loading>
      </div>
    </form>
  </NuxtLayout>
</template>
<script setup>
const layout = 'auth'
const { session, remove, overwrite } = await useSession()
const route = useRoute()
const { redirect } = route.query
if (session.value?._id) {
  navigateTo('/home')
}

const debounce = function (f, interval = 500) {
  let instance = null
  return (...args) => {
    clearTimeout(instance)
    instance = setTimeout(() => {
      f(...args)
    }, interval)
  }
}

const checkUsername = debounce(async () => {
  if (!body.value.username || body.value.username.length < 4) {
    return
  }
  try {
    const response = await $fetch('/api/username', {
      method: 'POST',
      body: {
        username: body.value.username,
      },
    })
    if (response.status === 'ALREADY_TAKEN') {
      errors.value.username = 'Username Already Taken'
    }
  } catch {}
}, 2000)

const body = useState('body', () => {
  return {
    username: '',
    name: '',
    email: '',
    passwd: '',
    cpasswd: '',
  }
})

const errors = useState('errors', () => {
  return {
    username: null,
    name: null,
    email: null,
    passwd: null,
    cpasswd: null,
  }
})

const loading = useState('loading', () => false)

const changeValue = (key, value) => {
  body.value[key] = value
  if (key === 'username') {
    checkUsername()
  }
  validate()
}

const validate = () => {
  errors.value = {
    username: null,
    name: null,
    email: null,
    passwd: null,
    cpasswd: null,
  }
  let flag = true
  if (body.value.username && body.value.username.length < 4) {
    errors.value.username = 'Username contains atleast 4 characters'
    flag = false
  }
  if (body.value.passwd && body.value.passwd.length < 8) {
    errors.value.passwd = 'Password contains atleast 8 characters'
    flag = false
  }
  if (body.value.cpasswd && body.value.passwd !== body.value.cpasswd) {
    errors.value.cpasswd = "Password didn't Match"
    flag = false
  }
  return flag
}

const registerSubmit = async () => {
  if (!validate()) {
    return
  }
  const { username, name, email, passwd } = body.value
  body.value = {
    username: '',
    name: '',
    email: '',
    passwd: '',
    cpasswd: '',
  }
  if (session.value?._id) {
    await remove()
  }
  loading.value = true
  try {
    const response = await $fetch('/api/user/register', {
      method: 'POST',
      body: {
        username,
        name,
        passwd,
        email,
      },
    })
    if (response.error) {
      errors.value.username = response.error
      setTimeout(() => {
        errors.value.username = null
      }, 3000)
      return
    }
    loading.value = false
    await overwrite(response)
    if (redirect) {
      navigateTo(redirect)
    } else {
      navigateTo('/home')
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

const runOnMount = () => {
  loading.value = false
}

onMounted(runOnMount)
</script>
