// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
      '@pinia/nuxt',
      '@nuxt/fonts'
  ],
  plugins: [
      '~/plugins/axios',
      '~/plugins/vue-awesome-paginate',
  ],
  srcDir: 'src/',
  css: ['~/assets/style/main.scss'],
  compatibilityDate: '2024-11-10',
})
