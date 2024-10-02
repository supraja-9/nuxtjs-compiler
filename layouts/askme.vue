<template>
  <Head>
    <Title>Darkube AskMe | {{ title || 'Home' }}</Title>
    <Meta
      name="description"
      content="Welcome to DARKUBE AskMe - Your Ultimate Coding Hub!"
    />
  </Head>

  <body class="font-sans antialiased bg-gray-900">
    <div class="min-h-screen">
      <askme-nav-bar :page="page"></askme-nav-bar>
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
