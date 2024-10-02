<template>
  <nav class="w-full bg-gray-800 border-b border-gray-700">
    <div class="m-container flex">
      <div class="v-center mr-5 md:mr-10">
        <NuxtLink to="/home">
          <ui-logo-glow class="w-[55px]"></ui-logo-glow>
        </NuxtLink>
      </div>
      <div class="space-x-4 flex">
        <ui-nav-link :to="'/compiler/home'" :active="page === 'home'"
          >Home</ui-nav-link
        >
        <ui-nav-link :to="'/compiler/editor'" :active="page === 'editor'"
          >Editor</ui-nav-link
        >
      </div>
      <div class="ml-auto v-center">
        <login-button></login-button>
      </div>
    </div>
  </nav>
</template>
<script setup>
const props = defineProps({
  page: String,
})
</script>
