<style>
  .ql-syntax {
    background-color: #0f172a !important;
    color: #f1f5f9 !important; /* #cbd5e1 #e2e8f0 !important; */
    font-family: "Consolas", "Lucida Console", Monaco, monospace !important;
    font-size: 13.5px !important; 
    padding: 15px 20px !important;
    margin: 20px 0px !important;
  }
  
  .ql-container {
    font-size: 14px !important; 
  }

  .ql-toolbar.ql-snow, .ql-container.ql-snow {
    border: 0px !important;
  }
</style>
<template>
  <NuxtLayout
    :name="layout"
    page="home"
    header="AskMe"
    title="AskMe"
  >
    <div style="height: calc(100vh - 130px)" class="overflow-scroll py-12 mx-2 md:mx-0">
      <div class="py-8 px-16 min-h-[270px]">
        <div class="bg-indigo-100 h-full" v-if="isQuillLoaded">
          <QuillEditor class="min-h-[250px] text-gray-100 bg-slate-800" content-type="html" theme="snow" toolbar="full" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
const layout = 'askme'
const isQuillLoaded = useState('isQuillLoaded', () => false)

onMounted(async () => {
  try {
    const { QuillEditor } = await import('@vueup/vue-quill')
    isQuillLoaded.value = true
  } catch (error) {
    console.error('Error loading QuillEditor:', error)
  }
})
</script>
