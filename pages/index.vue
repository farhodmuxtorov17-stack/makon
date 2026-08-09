<template>
  <div class="min-h-screen bg-neutral-950 text-white flex flex-col">
    <!-- Nav -->
    <nav class="h-16 px-6 flex items-center justify-between border-b border-white/5">
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z"
            />
          </svg>
        </div>
        <span class="text-lg font-bold font-display">MAKON</span>
      </div>
      <div class="flex items-center gap-3">
        <NuxtLink to="/catalog" class="text-sm text-white/60 hover:text-white transition-colors">
          Katalog
        </NuxtLink>
        <NuxtLink to="/login" class="btn-primary btn-sm">Kirish</NuxtLink>
      </div>
    </nav>

    <!-- Hero -->
    <section class="flex-1 flex flex-col justify-center px-6 max-w-5xl mx-auto w-full relative">
      <div
        class="absolute inset-0 opacity-20"
        :style="{
          background:
            'radial-gradient(circle at 20% 20%, rgb(99 102 241 0.4), transparent 50%), radial-gradient(circle at 80% 80%, rgb(20 184 166 0.3), transparent 50%)',
        }"
      />
      <div class="relative z-10">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
          <span class="text-xs text-white/80 font-medium">Ko'chmulk boshqaruvi platformasi</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold font-display leading-tight mb-6">
          Ko'chmulkingizni<br /><span class="text-primary-400">bir joydan</span> boshqaring
        </h1>
        <p class="text-lg text-white/60 max-w-xl mb-10">
          Binolar, ijara, shartnomalar, invoyslar, servis va hisobotlar — zamonaviy platformada
          barchasi birlashtirilgan.
        </p>
        <div class="flex items-center gap-3">
          <NuxtLink to="/login" class="btn-primary btn-lg">Boshlash →</NuxtLink>
          <NuxtLink
            to="/catalog"
            class="btn btn-lg bg-white/5 text-white border border-white/10 hover:bg-white/10"
          >
            Katalog ko'rish
          </NuxtLink>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-4 gap-4 mt-16 max-w-2xl">
          <div v-for="stat in stats" :key="stat.label">
            <p class="text-3xl font-bold font-display text-white">{{ stat.value }}</p>
            <p class="text-sm text-white/50 mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="px-6 py-20 max-w-5xl mx-auto w-full">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <div
            class="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="feature.icon"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-white/50">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/5 px-6 py-8 text-center">
      <p class="text-sm text-white/40">© 2025 MAKON. Ko'chmulk boshqaruvi platformasi.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })

const stats = [
  { value: '5', label: 'Bino' },
  { value: '60+', label: 'Unit' },
  { value: '12', label: 'Faol shartnoma' },
  { value: '99.9%', label: 'Uptime' },
]

const features = [
  {
    title: 'ERI integratsiya',
    description: 'Elektron raqamli imzo orqali shartnomalarni onlayn imzolash va tasdiqlash.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Moliyaviy boshqaruv',
    description: "Invoyslar, to'lovlar, hisob davrlari va avtomatik generatsiya.",
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
  },
  {
    title: 'Servis va ombor',
    description: "Servis so'rovlar, ish buyruqlari, materiallar va ombor boshqaruvi.",
    icon: 'M11.42 7.83a6 6 0 015.68 1.78l2.12 2.12a6 6 0 11-8.49 8.49l-1.5-1.5',
  },
]
</script>
