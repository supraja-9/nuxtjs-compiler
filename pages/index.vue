<template></template>
<script>
definePageMeta({
  middleware: [
    () => {
      return navigateTo('/home')
    },
  ],
})
</script>
