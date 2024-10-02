<template>
  <Head>
    <Title>Darkube | {{ title || 'home' }}</Title>
    <Meta
      name="description"
      content="Welcome to DARKUBE - Your Ultimate Coding Hub!"
    />
  </Head>

  <body class="font-sans antialiased bg-gray-900">
    <div class="min-h-screen">
      <nav-bar :page="page"></nav-bar>
      <header class="bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p class="text-slate-100 font-semibold">{{ header }}</p>
        </div>
      </header>
      <slot />
      <site-footer></site-footer>
    </div>
  </body>
</template>
<script setup>
const props = defineProps({
  page: String,
  header: String,
  title: String,
})
</script>
