<template>
  <input
    v-bind:value="value"
    @input="$emit('update:value', $event.target.value)"
    :type="type || __('text')"
    :name="name || ''"
    :required="required || false"
    :id="id"
    :class="{
      'text-input placeholder-gray-500 placeholder:text-sm border-gray-700 bg-gray-900 border-2 outline-none text-gray-300 h-10 px-3 focus:border-indigo-600 focus:ring-indigo-600 rounded-md shadow-sm': true,
      [className]: true,
    }"
    :disabled="disabled || false"
    autocomplete="false"
  />
</template>
<script setup>
const props = defineProps({
  id: String,
  disabled: Boolean,
  className: String,
  type: String,
  name: String,
  autocomplete: Boolean,
  required: Boolean,
  value: String,
})
</script>
