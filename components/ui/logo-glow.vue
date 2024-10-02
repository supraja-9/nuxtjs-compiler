<template>
  <div
    :class="{
      'hover-effect relative aspect-square w-[200px] cursor-none ': true,
      [className]: true,
    }"
  >
    <ui-logo class="absolute z-[0] left-0 right-0 h-full"></ui-logo>
    <ui-logo
      class="absolute z-[1] hover:blur-md left-0 right-0 h-full"
    ></ui-logo>
    <ui-logo
      class="animate-pulse absolute z-[0] blur-xl left-0 right-0 h-full"
    ></ui-logo>
  </div>
</template>
<script setup>
const props = defineProps({
  className: String,
})
</script>
