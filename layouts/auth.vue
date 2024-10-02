<template>
  <Head>
    <Title>Darkube | {{ title || 'Auth' }}</Title>
    <Meta name="description" content="DARKUBE - Auth" />
  </Head>

  <body class="font-sans text-gray-900 antialiased">
    <div style="height: 100dvh;" class="a-center bg-gray-900 dark:bg-gray-900">
      <div
        style="width: min(100%, 500px)"
        class="min-h-screen flex flex-col justify-center pt-6 px-3 sm:pt-0"
      >
        <div class="flex flex-col">
          <NuxtLink to="/home" class="flex justify-start px-3">
            <ui-logo-glow class-name="w-[80px] mr-2"></ui-logo-glow>
            <div class="a-center">
              <h1 class="text-2xl block font-normal logo-text">DARKUBE</h1>
            </div>
          </NuxtLink>
        </div>
        <div
          class="w-full sm:max-w-md mt-2 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden rounded-lg"
        >
          <slot />
        </div>
      </div>
    </div>
  </body>
</template>
<script setup>
const props = defineProps({
  title: String,
})
</script>
