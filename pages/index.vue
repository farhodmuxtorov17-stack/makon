<template>
  <div class="min-h-screen bg-neutral-950 text-white flex flex-col overflow-x-hidden">
    <!-- Nav -->
    <nav class="h-16 px-4 md:px-6 flex items-center justify-between border-b border-white/5 sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-lg">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" />
          </svg>
        </div>
        <span class="text-lg font-bold font-display">MAKON</span>
      </div>
      <div class="hidden md:flex items-center gap-6">
        <a href="#features" class="text-sm text-white/60 hover:text-white transition-colors">Imkoniyatlar</a>
        <a href="#modules" class="text-sm text-white/60 hover:text-white transition-colors">Modullar</a>
        <a href="#pricing" class="text-sm text-white/60 hover:text-white transition-colors">Narxlar</a>
        <NuxtLink to="/catalog" class="text-sm text-white/60 hover:text-white transition-colors">Katalog</NuxtLink>
        <NuxtLink to="/login" class="btn-primary btn-sm">Kirish</NuxtLink>
      </div>
      <button class="md:hidden btn-ghost btn-icon text-white" @click="mobileMenu = !mobileMenu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mobileMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
        </svg>
      </button>
    </nav>

    <!-- Mobile menu -->
    <div v-if="mobileMenu" class="md:hidden fixed inset-0 top-16 z-40 bg-neutral-950/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6 text-lg">
      <a href="#features" class="text-white/80 hover:text-white" @click="mobileMenu = false">Imkoniyatlar</a>
      <a href="#modules" class="text-white/80 hover:text-white" @click="mobileMenu = false">Modullar</a>
      <a href="#pricing" class="text-white/80 hover:text-white" @click="mobileMenu = false">Narxlar</a>
      <NuxtLink to="/catalog" class="text-white/80 hover:text-white" @click="mobileMenu = false">Katalog</NuxtLink>
      <NuxtLink to="/login" class="btn-primary" @click="mobileMenu = false">Kirish</NuxtLink>
    </div>

    <!-- Hero -->
    <section class="flex-1 flex flex-col justify-center px-4 md:px-6 max-w-5xl mx-auto w-full relative py-20 md:py-0">
      <div class="absolute inset-0 opacity-20" :style="{ background: 'radial-gradient(circle at 20% 20%, rgb(99 102 241 0.4), transparent 50%), radial-gradient(circle at 80% 80%, rgb(20 184 166 0.3), transparent 50%)' }" />
      <div class="relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
          <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
          <span class="text-xs text-white/80 font-medium">Kochmulk boshqaruvi platformasi</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold font-display leading-tight mb-6">
          Kochmulkingizni<br /><span class="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">bir joydan</span> boshqaring
        </h1>
        <p class="text-base md:text-lg text-white/60 max-w-xl mb-10">
          Binolar, ijara, shartnomalar, invoyslar, servis va hisobotlar — zamonaviy platformada barchasi birlashtirilgan.
        </p>
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <NuxtLink to="/login" class="btn-primary btn-lg w-full sm:w-auto">Boshlash <span class="text-lg">→</span></NuxtLink>
          <NuxtLink to="/catalog" class="btn btn-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 w-full sm:w-auto">Katalog ko'rish</NuxtLink>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 max-w-2xl">
          <div v-for="stat in stats" :key="stat.label" class="border-l-2 border-primary-500/30 pl-4">
            <p class="text-2xl md:text-3xl font-bold font-display text-white">{{ stat.value }}</p>
            <p class="text-xs md:text-sm text-white/50 mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="px-4 md:px-6 py-20 max-w-5xl mx-auto w-full">
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-bold font-display mb-3">Platforma imkoniyatlari</h2>
        <p class="text-white/50 text-sm md:text-base">Barcha boshqaruv vazifalari bir joyda</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="feature in features" :key="feature.title" class="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/30 transition-all duration-300 hover:bg-white/[0.07]">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-white/50">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Modules -->
    <section id="modules" class="px-4 md:px-6 py-20 max-w-5xl mx-auto w-full">
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-bold font-display mb-3">Boshqaruv modullari</h2>
        <p class="text-white/50 text-sm md:text-base">12+ modul — barchasi integratsiyalangan</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div v-for="mod in modules" :key="mod.name" class="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/30 transition-all duration-300 hover:bg-white/[0.07] group cursor-pointer">
          <div :class="['w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors', mod.color]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mod.icon" />
            </svg>
          </div>
          <p class="text-sm font-semibold text-white">{{ mod.name }}</p>
          <p class="text-xs text-white/40 mt-0.5">{{ mod.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="px-4 md:px-6 py-20 max-w-5xl mx-auto w-full">
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-bold font-display mb-3">Narxlar</h2>
        <p class="text-white/50 text-sm md:text-base">Hajmingizga mos rejani tanlang</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="plan in pricingPlans" :key="plan.name" :class="['p-6 rounded-2xl border transition-all', plan.featured ? 'border-primary-500/50 bg-primary-500/5 shadow-lg shadow-primary-500/10' : 'border-white/10 bg-white/5']">
          <div v-if="plan.featured" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs font-semibold mb-4">Tavsiya etiladi</div>
          <h3 class="text-lg font-bold text-white mb-1">{{ plan.name }}</h3>
          <p class="text-sm text-white/40 mb-4">{{ plan.desc }}</p>
          <p class="text-3xl font-bold font-display text-white mb-1">{{ plan.price }}</p>
          <p class="text-xs text-white/40 mb-6">{{ plan.period }}</p>
          <ul class="space-y-2 mb-6">
            <li v-for="feat in plan.features" :key="feat" class="flex items-start gap-2 text-sm text-white/60">
              <svg class="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
              {{ feat }}
            </li>
          </ul>
          <NuxtLink to="/login" :class="['btn w-full', plan.featured ? 'btn-primary' : 'bg-white/10 text-white hover:bg-white/20']">Tanlash</NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-4 md:px-6 py-20 max-w-3xl mx-auto w-full text-center">
      <h2 class="text-2xl md:text-4xl font-bold font-display mb-4">Bugun boshlang</h2>
      <p class="text-white/50 text-sm md:text-base mb-8">MAKON platformasida 30 kun bepul sinov muddati</p>
      <NuxtLink to="/login" class="btn-primary btn-lg">Bepul sinov →</NuxtLink>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/5 px-6 py-8">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
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
definePageMeta({ layout: 'public' })

const mobileMenu = ref(false)

const stats = [
  { value: '5', label: 'Bino' },
  { value: '60+', label: 'Unit' },
  { value: '12', label: 'Faol shartnoma' },
  { value: '99.9%', label: 'Uptime' },
]

const features = [
  { title: 'ERI integratsiya', description: 'Elektron raqamli imzo orqali shartnomalarni onlayn imzolash va tasdiqlash.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { title: 'Moliyaviy boshqaruv', description: "Invoyslar, to'lovlar, hisob davrlari va avtomatik generatsiya.", icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
  { title: 'Servis va ombor', description: "Servis so'rovlar, ish buyruqlari, materiallar va ombor boshqaruvi.", icon: 'M11.42 7.83a6 6 0 015.68 1.78l2.12 2.12a6 6 0 11-8.49 8.49l-1.5-1.5' },
]

const modules = [
  { name: 'Binolar', desc: 'Bino, qavat, unit', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z', color: 'bg-primary-500/20 text-primary-400' },
  { name: 'Listinglar', desc: 'Ijara va sotuv', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z', color: 'bg-accent-500/20 text-accent-400' },
  { name: 'Arizalar', desc: 'Workflow boshqaruvi', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2', color: 'bg-success-500/20 text-success-400' },
  { name: 'Shartnomalar', desc: 'ERI imzo', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586', color: 'bg-warning-500/20 text-warning-400' },
  { name: 'Invoyslar', desc: 'Avtomatik generatsiya', icon: 'M9 14l6-6m-5.5.5h.01', color: 'bg-info-500/20 text-info-400' },
  { name: "To'lovlar", desc: 'Onlayn to\'lov', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z', color: 'bg-primary-500/20 text-primary-400' },
  { name: 'Servis', desc: "So'rovlar va ishlar", icon: 'M11.42 7.83a6 6 0 015.68 1.78', color: 'bg-warning-500/20 text-warning-400' },
  { name: 'Ombor', desc: 'Zaxira boshqaruvi', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2', color: 'bg-purple-500/20 text-purple-400' },
  { name: 'Hisoblagichlar', desc: 'Energiya sarfi', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'bg-danger-500/20 text-danger-400' },
  { name: 'Hisobotlar', desc: 'Eksport va analitika', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z', color: 'bg-accent-500/20 text-accent-400' },
  { name: 'Bildirishnomalar', desc: 'Push, email, Telegram', icon: 'M15 17h5l-1.405-1.405', color: 'bg-info-500/20 text-info-400' },
  { name: 'Admin', desc: 'Foydalanuvchilar va tizim', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z', color: 'bg-neutral-500/20 text-neutral-400' },
]

const pricingPlans = [
  { name: 'Start', desc: 'Kichik biznes uchun', price: "0 so'm", period: '/oy', featured: false, features: ['3 bino', '30 unit', '1 foydalanuvchi', 'Asosiy hisobotlar'] },
  { name: 'Pro', desc: 'O\'rtacha biznes uchun', price: '500K so\'m', period: '/oy', featured: true, features: ['10 bino', '200 unit', '10 foydalanuvchi', 'ERI integratsiya', 'Barcha hisobotlar', 'Telegram bot'] },
  { name: 'Enterprise', desc: 'Yirik kompaniyalar uchun', price: 'Custom', period: '', featured: false, features: ['Cheksiz bino', 'Cheksiz unit', 'Cheksiz foydalanuvchi', 'Custom integratsiyalar', '24/7 qo\'llab-quvvatlash', 'SLA 99.9%'] },
]
</script>
