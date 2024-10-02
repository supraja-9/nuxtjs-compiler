<style scoped>
.container {
  position: relative;
  display: block;
  width: 2rem;
  height: 1rem;
}

.background {
  position: absolute;
  inset: 0;
  background-color: #111827;
  border-radius: 20px;
  transition: all 150ms ease;
}

.circle {
  width: 1rem;
  height: 1rem;
  position: absolute;
  background-color: #334155;
  border-radius: 100%;
  outline: 1px solid #111827;
  left: 0;
  top: 0;
  transition: all 150ms ease;
}

.checkbox {
  display: none;
}

.checkbox:checked ~ .background {
  background-color: #4f46e5;
  border-color: #4f46e5;
  transition: all 250ms ease;
}

.checkbox:checked ~ .circle {
  transform: translateX(100%);
  transition: all 250ms ease;
  outline-color: #4f46e5;
  background-color: #111827;
}
</style>
<template>
  <label :for="id" class="inline-flex items-center cursor-pointer">
    <label :for="id" class="container cursor-pointer">
      <input
        :checked="checked"
        @input="$emit('update:checked', $event.target.checked)"
        class="checkbox"
        :id="id"
        type="checkbox"
      />
      <div class="background"></div>
      <div class="circle"></div>
    </label>
    <span class="ms-2 text-sm text-gray-400">{{ prompt }}</span>
  </label>
</template>
<script setup>
const props = defineProps({
  id: String,
  prompt: String,
  checked: Boolean,
})
</script>
