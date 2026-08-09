<template>
  <div class="min-h-screen bg-ink-950 text-white flex flex-col overflow-x-hidden">
    <!-- Nav -->
    <nav class="h-16 px-4 md:px-6 flex items-center justify-between border-b border-white/[0.06] sticky top-0 z-50 bg-ink-950/80 backdrop-blur-xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-md shadow-brand-600/20">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" /></svg>
        </div>
        <div>
          <span class="text-lg font-bold font-display tracking-tight">MAKON</span>
          <p class="text-[10px] text-ink-500 font-medium tracking-widest uppercase">Real Estate</p>
        </div>
      </div>
      <div class="hidden md:flex items-center gap-6">
        <a href="#features" class="text-sm text-white/60 hover:text-white transition-colors">Imkoniyatlar</a>
        <a href="#modules" class="text-sm text-white/60 hover:text-white transition-colors">Modullar</a>
        <NuxtLink to="/catalog" class="text-sm text-white/60 hover:text-white transition-colors">Katalog</NuxtLink>
        <NuxtLink to="/login" class="btn-primary-glow btn-sm">Kirish</NuxtLink>
      </div>
      <button class="md:hidden btn-ghost btn-icon text-white" @click="mobileMenu = !mobileMenu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mobileMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" /></svg>
      </button>
    </nav>

    <div v-if="mobileMenu" class="md:hidden fixed inset-0 top-16 z-40 bg-ink-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 text-lg">
      <a href="#features" class="text-white/80 hover:text-white" @click="mobileMenu = false">Imkoniyatlar</a>
      <a href="#modules" class="text-white/80 hover:text-white" @click="mobileMenu = false">Modullar</a>
      <NuxtLink to="/catalog" class="text-white/80 hover:text-white" @click="mobileMenu = false">Katalog</NuxtLink>
      <NuxtLink to="/login" class="btn-primary-glow" @click="mobileMenu = false">Kirish</NuxtLink>
    </div>

    <!-- Hero with 3D building -->
    <section class="flex-1 flex items-center px-4 md:px-6 max-w-7xl mx-auto w-full relative py-20 md:py-16">
      <div class="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div class="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

      <div class="relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full">
        <!-- Text -->
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <span class="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span class="text-xs text-white/80 font-medium">Kochmulk boshqaruvi platformasi</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-bold font-display leading-[1.1] mb-6 tracking-tight">
            Kochmulkingizni<br /><span class="bg-gradient-to-r from-brand-400 via-brand-300 to-gold-400 bg-clip-text text-transparent">bir joydan</span> boshqaring
          </h1>
          <p class="text-base md:text-lg text-white/60 max-w-lg mb-10">
            Binolar, ijara, shartnomalar, invoyslar, servis va hisobotlar — zamonaviy platformada barchasi birlashtirilgan.
          </p>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <NuxtLink to="/login" class="btn-primary-glow btn-lg w-full sm:w-auto">Boshlash <span class="text-lg">→</span></NuxtLink>
            <NuxtLink to="/catalog" class="btn btn-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 w-full sm:w-auto">Katalog ko'rish</NuxtLink>
          </div>
          <div class="grid grid-cols-4 gap-4 mt-12 max-w-lg">
            <div v-for="stat in stats" :key="stat.label" class="border-l-2 border-brand-500/30 pl-3">
              <p class="text-xl md:text-2xl font-bold font-display text-white">{{ stat.value }}</p>
              <p class="text-[10px] md:text-xs text-white/50 mt-0.5">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <!-- 3D Building Hero -->
        <div class="hidden lg:block relative">
          <Building3DHero />
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="px-4 md:px-6 py-20 max-w-7xl mx-auto w-full">
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-bold font-display mb-3 tracking-tight">Platforma imkoniyatlari</h2>
        <p class="text-white/50 text-sm md:text-base">Barcha boshqaruv vazifalari bir joyda</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="feature in features" :key="feature.title" class="p-6 rounded-2xl bg-white/5 border border-white/[0.06] hover:border-brand-500/30 transition-all duration-300 hover:bg-white/[0.07]">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="feature.icon" /></svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-white/50">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Modules -->
    <section id="modules" class="px-4 md:px-6 py-20 max-w-7xl mx-auto w-full">
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-bold font-display mb-3 tracking-tight">Boshqaruv modullari</h2>
        <p class="text-white/50 text-sm md:text-base">12+ modul — barchasi integratsiyalangan</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div v-for="mod in modules" :key="mod.name" class="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/[0.06] hover:border-brand-500/30 transition-all duration-300 hover:bg-white/[0.07] group cursor-pointer">
          <div :class="['w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110', mod.color]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="mod.icon" /></svg>
          </div>
          <p class="text-sm font-semibold text-white">{{ mod.name }}</p>
          <p class="text-xs text-white/40 mt-0.5">{{ mod.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-4 md:px-6 py-20 max-w-3xl mx-auto w-full text-center">
      <div class="relative p-12 rounded-3xl bg-gradient-to-br from-brand-600/10 via-white/5 to-gold-500/10 border border-white/10 overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div class="relative z-10">
          <h2 class="text-2xl md:text-4xl font-bold font-display mb-4 tracking-tight">Bugun boshlang</h2>
          <p class="text-white/50 text-sm md:text-base mb-8">MAKON platformasida 30 kun bepul sinov muddati</p>
          <NuxtLink to="/login" class="btn-primary-glow btn-lg">Bepul sinov →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/[0.06] px-6 py-8">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" /></svg>
          </div>
          <span class="text-sm font-bold font-display">MAKON</span>
        </div>
        <p class="text-sm text-white/40">© 2025 MAKON. Kochmulk boshqaruvi platformasi.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Building3DHero from '~/components/Building3DHero.vue'
definePageMeta({ layout: 'public' })

const mobileMenu = ref(false)

const stats = [
  { value: '5', label: 'Bino' },
  { value: '60+', label: 'Unit' },
  { value: '12', label: 'Shartnoma' },
  { value: '99.9%', label: 'Uptime' },
]

const features = [
  { title: 'Bino boshqaruvi', description: 'Binolar, qavatlar va unitlarni boshqaring', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z' },
  { title: 'Shartnoma va invoys', description: 'ERI imzolangan shartnomalar va avtomatik invoyslar', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { title: 'Servis va so\'rovlar', description: 'Texnik so\'rovlar va ish buyruqlarini boshqaring', icon: 'M11.42 7.83a6 6 0 015.68 1.78l2.12 2.12a6 6 0 11-8.49 8.49l-1.5-1.5' },
]

const modules = [
  { name: 'Ishchi panel', desc: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', color: 'bg-brand-500/20 text-brand-400' },
  { name: 'Binolar', desc: 'Boshqaruv', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z', color: 'bg-emerald-500/20 text-emerald-400' },
  { name: 'Listinglar', desc: 'Katalog', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z', color: 'bg-sky-500/20 text-sky-400' },
  { name: 'Arizalar', desc: 'Mijoz arizalari', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2', color: 'bg-gold-500/20 text-gold-400' },
  { name: 'Shartnomalar', desc: 'ERI imzolash', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586', color: 'bg-brand-500/20 text-brand-400' },
  { name: 'Invoyslar', desc: 'Hisob-faktura', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z', color: 'bg-emerald-500/20 text-emerald-400' },
  { name: "To'lovlar", desc: 'To\'lov boshqaruvi', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z', color: 'bg-sky-500/20 text-sky-400' },
  { name: 'Servis', desc: "So'rovlar", icon: 'M11.42 7.83a6 6 0 015.68 1.78l2.12 2.12a6 6 0 11-8.49 8.49l-1.5-1.5', color: 'bg-gold-500/20 text-gold-400' },
]
</script>
