// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt', // needed
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },
})
