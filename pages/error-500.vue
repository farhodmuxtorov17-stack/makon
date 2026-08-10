<template>
  <div class="min-h-[100dvh] admin-bg text-ink-900 dark:text-white flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <!-- 500 illustration -->
      <div class="relative mb-8">
        <div class="text-[120px] font-black leading-none tracking-tighter" style="color: #ef4444;">500</div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      <h1 class="text-2xl font-bold mb-2">Server xatosi</h1>
      <p class="text-ink-500 mb-8">
        Texnik nosozlik yuz berdi. Biz bu haqda xabardor qilindik.
        Iltimos, birozdan keyin qayta urinib ko'ring.
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button @click="handleReload" class="btn btn-primary">
          <RefreshCw :size="18" />
          Qayta yuklash
        </button>
        <NuxtLink to="/" class="btn btn-secondary">
          <Home :size="18" />
          Bosh sahifa
        </NuxtLink>
      </div>

      <!-- Error details (dev only) -->
      <div v-if="error?.message" class="mt-8 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-left">
        <p class="text-xs font-mono text-red-500 mb-1">Error details:</p>
        <pre class="text-xs text-ink-500 overflow-x-auto">{{ error.message }}</pre>
      </div>

      <!-- Support -->
      <div class="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
        <p class="text-sm text-ink-500">
          Muammo davom etmoqdami?
          <a href="mailto:support@makon.uz" class="text-brand-500 hover:text-brand-600 font-medium">support@makon.uz</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home, RefreshCw } from 'lucide-vue-next'

const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

// Redirect 404s to the 404 page component
if (props.error?.statusCode === 404) {
  // Nuxt handles 404 via error.vue, but we can customize
}

function handleReload() {
  if (import.meta.client) {
    window.location.reload()
  }
}

// Set page meta
useHead({
  title: 'Xato — MAKON',
})
</script>
