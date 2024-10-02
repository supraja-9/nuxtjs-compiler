<template>
  <NuxtLayout
    :name="layout"
    page="dashboard"
    header="Dashboard"
    title="Dashboard"
  >
    <div class="py-12 mx-2 md:mx-0">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-gray-800 overflow-hidden shadow-sm rounded-lg">
          <div
            class="p-6 text-sm font-semibold text-gray-100 dark:text-gray-100"
          >
            {{ __("You're just logged in! That all nothing special.") }}
          </div>
        </div>
      </div>
      <div class="py-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-gray-800 overflow-hidden shadow-sm rounded-lg">
          <div class="p-6 flex justify-center">
            <ui-logo-glow
              class-name="w-full md:w-10/12 lg:w-1/2"
            ></ui-logo-glow>
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-gray-800 overflow-hidden shadow-sm rounded-lg">
          <div
            class="p-6 text-sm font-semibold text-gray-100 dark:text-gray-100"
          >
            {{ __("Remaining things will be added soon.") }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
const layout = 'app'
const { session } = await useSession()
const route = useRoute()
if (!session.value || !session.value._id) {
  navigateTo(`/login?redirect=${route.path}`)
}
</script>
