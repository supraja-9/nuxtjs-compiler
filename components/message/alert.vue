<style scoped>
.hide-message {
  opacity: 0;
  transform: translateX(-20%);
  transition: 0.2s;
}

.show-message {
  opacity: 1;
  transform: translateX(0);
}
</style>
<template>
  <div
    :class="{
      'hide-message left-5 bottom-8 m-2 z-10 border-2 rounded border-indigo-600 border-y-0 fixed bg-gray-950': true,
      'show-message': alert != '',
    }"
  >
    <div class="flex justify-start">
      <div
        class="h-0 rounded-t border-t-2 border-indigo-600"
        :style="{
          width: width + '%',
        }"
      ></div>
    </div>
    <div class="px-5 py-3">
      <div class="text-sm text-gray-100">
        {{ message }}
      </div>
    </div>
    <div class="flex justify-end">
      <div
        class="h-0 rounded-b border-b-2 border-indigo-600"
        :style="{
          width: width + '%',
        }"
      ></div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  message: String,
})
const emit = defineEmits(['close'])

const timePeriod = 3000
const width = useState('width', () => 0)
const alert = useState('alert', () => props.message)

const startTimer = () => {
  if (width.value >= 100) {
    return
  }
  setTimeout(() => {
    width.value += 1
    startTimer()
  }, timePeriod / 100)
}

const runOnMount = () => {
  alert.value = props.message || ''
  width.value = 0
  startTimer()
  setTimeout(() => {
    alert.value = ''
    setTimeout(() => {
      emit('close', '')
    }, 500)
  }, timePeriod + 500)
}

watch(
  () => props.message,
  (nm) => {
    if (nm === '') {
      return
    }
    runOnMount()
  }
)

onMounted(runOnMount)
</script>
