<template>
  <div class="min-h-[100dvh] admin-bg text-ink-900 dark:text-white flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <!-- 404 illustration -->
      <div class="relative mb-8">
        <div class="text-[120px] font-black text-gradient leading-none tracking-tighter">404</div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-32 h-32 bg-brand-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      <h1 class="text-2xl font-bold mb-2">Sahifa topilmadi</h1>
      <p class="text-ink-500 mb-8">
        Ushbu sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
        Bosh sahifaga qaytib boshqattan urinib ko'ring.
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <NuxtLink to="/" class="btn btn-primary">
          <Home :size="18" />
          Bosh sahifa
        </NuxtLink>
        <NuxtLink to="/catalog" class="btn btn-secondary">
          <Building2 :size="18" />
          Katalog
        </NuxtLink>
      </div>

      <!-- Helpful links -->
      <div class="mt-12 pt-8 border-t border-black/5 dark:border-white/5">
        <p class="text-xs text-ink-500 mb-3 uppercase tracking-wider">Foydali havolalar</p>
        <div class="flex flex-wrap gap-2 justify-center">
          <NuxtLink to="/login" class="badge badge-neutral">Kirish</NuxtLink>
          <NuxtLink to="/dashboard" class="badge badge-neutral">Dashboard</NuxtLink>
          <NuxtLink to="/cabinet" class="badge badge-neutral">Kabinet</NuxtLink>
          <NuxtLink to="/notifications" class="badge badge-neutral">Bildirishnomalar</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home, Building2 } from 'lucide-vue-next'

defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

// Use error layout (no admin sidebar)
definePageMeta({ layout: 'public' })

// Apply saved theme on mount
onMounted(() => {
  const stored = localStorage.getItem('makon-theme')
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  }
})
</script>
