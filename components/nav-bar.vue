<template>
  <nav class="w-full bg-gray-800 border-b border-gray-700">
    <div class="max-w-7xl mx-3 md:mx-auto sm:px-6 lg:px-8 flex">
      <div class="v-center mr-5 md:mr-10">
        <NuxtLink to="/home">
          <ui-logo-glow class="w-[55px]"></ui-logo-glow>
        </NuxtLink>
      </div>
      <div class="space-x-4 flex">
        <ui-nav-link :to="'/home'" :active="page === 'home'">Home</ui-nav-link>
        <ui-nav-link :to="'/dashboard'" :active="page === 'dashboard'"
          >Dashboard</ui-nav-link
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
