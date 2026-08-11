export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/aurora.css'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/color-mode'],
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'makon-theme',
  },
  app: {
    baseURL: '/makon/',
    head: {
      title: 'MAKON — Ko\'chmas mulk platformasi',
      htmlAttrs: { lang: 'uz' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' },
        { name: 'description', content: 'MAKON — Toshkentdagi premium biznes markazlari, ofislar va ombor maydonlari uchun yagona boshqaruv platformasi.' },
        { name: 'theme-color', content: '#6366f1' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { property: 'og:title', content: 'MAKON — Ko\'chmas mulk platformasi' },
        { property: 'og:description', content: 'Tashkent City, Trillant Tower, IT Park va boshqa premium binolarda ofis, savdo va ombor maydonlari.' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'icon', type: 'image/svg+xml', href: '/makon/favicon.svg' },
        { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css' },
      ],
      script: [
        // Telegram Mini App SDK
        { src: 'https://telegram.org/js/telegram-web-app.js', defer: true },
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
      crawlLinks: true,
      routes: ['/', '/catalog', '/login', '/register/eri', '/200.html', '/floors/3/plan', '/cabinet', '/cabinet/applications', '/cabinet/units', '/cabinet/contracts', '/cabinet/service-requests', '/cabinet/services', '/cabinet/meter-readings', '/meters', '/notifications', '/finance/approvals', '/admin/backups', '/admin/settings', '/admin/notification-templates', '/admin/users', '/admin/roles', '/profile', '/reports/executive', '/reports/building', '/finance/inventory', '/finance/stock-issues', '/facility/material-requests'],
      failOnError: false,
    },
  },
  typescript: { strict: false },
})
