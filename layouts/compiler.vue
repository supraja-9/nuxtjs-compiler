<template>
  <Head>
    <Title>Darkube Compiler | {{ title || 'Home' }}</Title>
    <Meta
      name="description"
      content="Welcome to DARKUBE Compiler - Your Ultimate Coding Hub!"
    />
  </Head>

  <body class="font-sans antialiased bg-gray-900">
    <div class="min-h-screen">
      <compiler-nav-bar :page="page"></compiler-nav-bar>
      <slot />
      <site-footer></site-footer>
    </div>
  </body>
</template>
<script setup>
const props = defineProps({
  page: String,
  title: String,
})
</script>
