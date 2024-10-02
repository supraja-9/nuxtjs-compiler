<template>
  <NuxtLink
    :to="to"
    :class="{
      'cursor-pointer h-[65px] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out': true, // always apply these styles
      'border-indigo-600 font-medium leading-5 text-gray-100 focus:outline-none focus:border-indigo-700':
        active,
      'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700 focus:outline-none focus:text-gray-300 focus:border-gray-700':
        !active,
    }"
  >
    <slot />
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  active: Boolean,
  to: String,
})
</script>
