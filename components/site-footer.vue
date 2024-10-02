<template>
  <footer class="mt-auto w-full h-[65px] v-center bg-gray-800">
    <div class="mx-5 md:mx-16 lg:mx-32">
      <span class="text-slate-100 text-sm"
        >Copyright © {{ year }} Darkube. All rights reserved.</span
      >
    </div>
  </footer>
</template>
<script setup>
const date = new Date()
const year = date.getFullYear()
</script>
