// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt", // needed
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    '@nuxt/test-utils/module'
  ],
  build: {
    transpile: ["pinia-plugin-persistedstate"],
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  }

});
