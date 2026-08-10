export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  app: {
    baseURL: '/makon/',
    head: {
      title: 'MAKON — Ko\'chmas mulk platformasi',
      htmlAttrs: { lang: 'uz' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'MAKON — Toshkentdagi premium biznes markazlari, ofislar va ombor maydonlari uchun yagona boshqaruv platformasi.' },
        { property: 'og:title', content: 'MAKON — Ko\'chmas mulk platformasi' },
        { property: 'og:description', content: 'Tashkent City, Trillant Tower, IT Park va boshqa premium binolarda ofis, savdo va ombor maydonlari.' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'icon', type: 'image/svg+xml', href: '/makon/favicon.svg' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://solene-7d68319d.base44.app/functions',
    },
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/', '/catalog'],
    },
  },
  typescript: { strict: false },
})
