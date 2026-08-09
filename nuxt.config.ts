// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
    typeCheck: false,
  },
  app: {
    head: {
      title: 'MAKON — Kochmulk Boshqaruvi Tizimi',
      htmlAttrs: { lang: 'uz' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'MAKON — zamonaviy kochmulk boshqaruvi platformasi' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap',
        },
      ],
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '~/tailwind.config.ts',
  },
  vite: {
    optimizeDeps: {
      include: ['@vueuse/core'],
    },
  },
  nitro: {
    preset: 'node-server',
  },
  ssr: true,
})
