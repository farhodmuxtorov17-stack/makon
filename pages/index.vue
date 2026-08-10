<template>
  <div class="min-h-screen bg-ink-950 text-white overflow-x-hidden">
    <!-- Nav -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-lg shadow-lg shadow-brand-500/30">M</div>
          <div>
            <div class="font-bold tracking-tight">MAKON</div>
            <div class="text-[10px] text-ink-500 uppercase tracking-widest">Real Estate</div>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-6 text-sm text-ink-400">
          <a href="#features" class="hover:text-white transition-colors">Imkoniyatlar</a>
          <a href="#buildings" class="hover:text-white transition-colors">Binolar</a>
          <a href="#stats" class="hover:text-white transition-colors">Statistika</a>
          <NuxtLink to="/catalog" class="hover:text-white transition-colors">Katalog</NuxtLink>
        </div>
        <div class="flex gap-2">
          <NuxtLink to="/login" class="btn btn-ghost btn-sm">Kirish</NuxtLink>
          <NuxtLink to="/catalog" class="btn btn-primary btn-sm">Katalog</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80');" />
      <div class="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950" />
      <div class="absolute inset-0 bg-grid opacity-30" />
      <div class="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-[150px]" />

      <div class="relative max-w-7xl mx-auto px-4 lg:px-6 w-full">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span class="text-xs text-ink-300">Toshkent shahri · 2026</span>
          </div>
          <h1 class="text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
            Binolaringiz boshqaruvi
            <span class="text-gradient">bir tizimda</span>
          </h1>
          <p class="text-lg text-ink-400 mb-8 max-w-xl leading-relaxed">
            Tashkent City, Trillant Tower, IT Park va boshqa premium binolarda ofis, savdo va ombor maydonlarini boshqaring. Shartnomalar, to'lovlar va servis — bitta platformada.
          </p>
          <div class="flex gap-3">
            <NuxtLink to="/catalog" class="btn btn-primary btn-lg">
              Maydonlarni ko'rish <ArrowRight :size="18" />
            </NuxtLink>
            <NuxtLink to="/register/eri" class="btn btn-secondary btn-lg">
              <ShieldCheck :size="18" /> ERI ro'yxat
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-600">
        <span class="text-xs">Pastga</span>
        <ChevronDown :size="16" class="animate-bounce" />
      </div>
    </section>

    <!-- Stats -->
    <section id="stats" class="py-20 relative">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="stat in stats" :key="stat.label" class="card p-6 text-center">
            <div class="text-4xl font-bold text-gradient mb-2">{{ stat.value }}</div>
            <div class="text-sm text-ink-400">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-20 relative">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">Platforma imkoniyatlari</h2>
          <p class="text-ink-400 max-w-xl mx-auto">18 modul, 5 rol, ERI integratsiya va 3D navigatsiya — barchasi bir tizimda</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="f in features" :key="f.title" class="card p-6 card-hover">
            <div class="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-4">
              <component :is="f.icon" :size="24" class="text-brand-400" />
            </div>
            <h3 class="text-white font-semibold mb-2">{{ f.title }}</h3>
            <p class="text-sm text-ink-400 leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Buildings -->
    <section id="buildings" class="py-20 relative">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 class="text-3xl lg:text-4xl font-bold mb-2">Premium binolar</h2>
            <p class="text-ink-400">Toshkentning eng yirik biznes markazlari</p>
          </div>
          <NuxtLink to="/catalog" class="btn btn-secondary btn-sm">Barcha binolar <ArrowRight :size="14" /></NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <NuxtLink v-for="b in showcaseBuildings" :key="b.id" :to="'/catalog'" class="card overflow-hidden card-hover group">
            <div class="relative h-56 overflow-hidden">
              <img :src="b.gallery[0]" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute top-3 left-3">
                <span class="badge badge-brand glass">{{ typeLabel(b.type) }}</span>
              </div>
              <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ink-950 to-transparent" />
            </div>
            <div class="p-5">
              <h3 class="text-white font-semibold mb-1">{{ b.name }}</h3>
              <p class="text-sm text-ink-500 flex items-center gap-1 mb-3"><MapPin :size="12" />{{ b.district }}, {{ b.city }}</p>
              <div class="flex gap-3 text-sm text-ink-400">
                <span>{{ b.floorsCount }} qavat</span>
                <span>·</span>
                <span>{{ b.totalUnits }} unit</span>
                <span>·</span>
                <span class="text-emerald-400">{{ b.vacantUnits }} bo'sh</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 relative">
      <div class="max-w-4xl mx-auto px-4 lg:px-6">
        <div class="card p-10 lg:p-16 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-transparent" />
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-500/10 blur-[100px]" />
          <div class="relative">
            <h2 class="text-3xl lg:text-4xl font-bold mb-4">Boshlashga tayyormisiz?</h2>
            <p class="text-ink-400 mb-8 max-w-lg mx-auto">MAKON platformasida ro'yxatdan o'ting va binolaringizni boshqarishni boshlang</p>
            <div class="flex gap-3 justify-center">
              <NuxtLink to="/register/eri" class="btn btn-primary btn-lg">Ro'yxatdan o'tish <ArrowRight :size="18" /></NuxtLink>
              <NuxtLink to="/login" class="btn btn-secondary btn-lg">Tizimga kirish</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-8">
      <div class="max-w-6xl mx-auto px-4 lg:px-6 flex items-center justify-between flex-wrap gap-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-sm">M</div>
          <span class="text-sm text-ink-500">© 2026 MAKON · O'zbekiston Respublikasi</span>
        </div>
        <div class="flex gap-6 text-sm text-ink-500">
          <NuxtLink to="/catalog" class="hover:text-white">Katalog</NuxtLink>
          <NuxtLink to="/login" class="hover:text-white">Kirish</NuxtLink>
          <NuxtLink to="/register/eri" class="hover:text-white">ERI</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

definePageMeta({ layout: "public" })
<script setup lang="ts">
import { ArrowRight, ShieldCheck, ChevronDown, MapPin, Building2, Box, Wallet, FileText, Wrench, BarChart3, Gauge, Users } from 'lucide-vue-next'
import { buildings } from '~/utils/mockData'

const stats = [
  { value: '5', label: 'Premium binolar' },
  { value: '375+', label: 'Jami unitlar' },
  { value: '67', label: 'Bo\'sh maydonlar' },
  { value: '98%', label: 'To\'lov darajasi' },
]

const features = [
    { title: '3D bino navigatsiyasi', desc: "Qavat bo'yicha interaktiv ko'rinish, bo'sh maydonlarni real-time tanlash", icon: Box },
  { title: 'ERI integratsiya', desc: 'Shartnomalarni elektron raqamli imzo bilan onlayn imzolash', icon: ShieldCheck },
  { title: 'Moliyaviy boshqaruv', desc: 'Invoyslar, qarzdorlik, aging tahlil va billing davrlari', icon: Wallet },
  { title: 'Ariza va shartnoma', desc: '11 bosqichli ariza funnel, avtomatik shartnoma generatsiyasi', icon: FileText },
  { title: 'Servis va SLA', desc: 'Kanban dashboard, SLA monitoring, material so\'rovlar', icon: Wrench },
  { title: 'Hisoblagichlar', desc: 'Elektr, suv, gaz, issiqlik — ko\'rsatkichlar va sarf monitoring', icon: Gauge },
  { title: 'Hisobotlar', desc: '6 standart hisobot turi, PDF/XLSX/CSV eksport', icon: BarChart3 },
  { title: '5 rol li tizim', desc: 'Super rahbar, bino rahbari, buxgalter, pudratchi, ijarachi', icon: Users },
  { title: 'Audit jurnali', desc: 'Barcha amallar tarixi, trace ID va IP manzillar bilan', icon: Building2 },
]

const showcaseBuildings = buildings.slice(0, 6)

function typeLabel(t: string) {
  const m: Record<string, string> = { BUSINESS_CENTER: 'Biznes markaz', OFFICE: 'Ofis', SHOPPING: 'Savdo', WAREHOUSE: 'Ombor', MIXED: 'Aralash', RESIDENTIAL: 'Turar joy' }
  return m[t] || t
}
</script>
