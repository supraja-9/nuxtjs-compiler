<template>
  <label class="block font-medium text-sm text-gray-300">
    {{ value }}
  </label>
</template>
<script setup>
const props = defineProps({
  value: String,
})
</script>
