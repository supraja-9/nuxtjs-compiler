<template></template>
<script>
definePageMeta({
  middleware: [
    () => {
      return navigateTo('/askme/home')
    },
  ],
})
</script>
