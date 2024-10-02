<template></template>
<script>
definePageMeta({
  middleware: [
    () => {
      return navigateTo('/chatroom/home')
    },
  ],
})
</script>
