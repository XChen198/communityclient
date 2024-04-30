// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt', '@pinia/nuxt'],
  devServer: {
    https: {
      key: 'C:\\ertbot\\live\\www.nyknow.com\\privkey.pem',
      cert: 'C:\\ertbot\\live\\www.nyknow.com\\fullchain.pem',
    },
    port: 443
  },
})
