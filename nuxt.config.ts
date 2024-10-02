// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@vueup/vue-quill/dist/vue-quill.snow.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plugins: ['~/plugins/fontawesome'],

  modules: [
    'nuxt-icons',
    [
      '@sidebase/nuxt-session',
      {
        session: {
          expiryInSeconds: 6 * 60 * 60,
        },
      },
    ],
  ],

  runtimeConfig: {
    MONGODB: process.env.MONGODB,
    SALT: process.env.SALT,
  },

  compatibilityDate: '2024-09-24',
})