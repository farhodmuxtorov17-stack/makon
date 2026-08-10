<template>
  <div class="min-h-screen">
    <!-- Nav -->
    <nav class="fixed top-0 inset-x-0 z-50 glass-dark">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
            <Building2 :size="18" :stroke-width="2" class="text-white" />
          </div>
          <div>
            <div class="font-display font-bold text-white text-base leading-none">MAKON</div>
            <div class="text-[9px] text-white/40 font-medium tracking-widest uppercase mt-0.5">Real Estate</div>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" class="text-white/60 hover:text-white transition-colors">Imkoniyatlar</a>
          <a href="#modules" class="text-white/60 hover:text-white transition-colors">Modullar</a>
          <a href="#platform" class="text-white/60 hover:text-white transition-colors">Platforma</a>
        </div>
        <NuxtLink to="/login" class="btn btn-primary btn-sm">Tizimga kirish</NuxtLink>
      </div>
    </nav>

    <!-- Hero -->
    <section class="mesh-dark min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0); background-size: 24px 24px;"></div>
      <div class="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-600/15 rounded-full blur-[140px]"></div>
      <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-800/10 rounded-full blur-[100px]"></div>

      <div class="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="animate-fade-in-up">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-white/50 text-xs font-medium">Enterprise · v2.0 · 2026</span>
            </div>
            <h1 class="font-display text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6">
              Koʻchmulkingizni<br><span class="text-gradient">bir joydan</span> boshqaring
            </h1>
            <p class="text-white/40 text-lg leading-relaxed mb-8 max-w-lg">
              Binolar, ijara, shartnomalar, invoyslar, servis va hisobotlar — zamonaviy platformada birlashtirilgan.
            </p>
            <div class="flex flex-wrap items-center gap-4">
              <NuxtLink to="/login" class="btn btn-primary btn-lg">
                Boshlash <ArrowRight :size="18" :stroke-width="2" />
              </NuxtLink>
              <a href="#features" class="btn btn-outline btn-lg !bg-white/5 !border-white/10 !text-white hover:!bg-white/10">Imkoniyatlar</a>
            </div>
            <div class="flex items-center gap-8 mt-12 pt-8 border-t border-white/5">
              <div v-for="s in stats" :key="s.label">
                <div class="font-display text-2xl font-bold text-white">{{ s.value }}</div>
                <div class="text-white/30 text-xs">{{ s.label }}</div>
              </div>
            </div>
          </div>

          <!-- UI Preview -->
          <div class="hidden lg:block animate-fade-in-up delay-200">
            <div class="relative">
              <div class="absolute inset-0 bg-brand-600/20 blur-[80px] rounded-3xl"></div>
              <div class="relative glass-dark rounded-3xl p-5 border border-white/10 overflow-hidden">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex gap-1.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-rose-500/60"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-amber-500/60"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></div>
                  </div>
                  <div class="text-white/30 text-xs">admin.makon.uz</div>
                </div>
                <div class="grid grid-cols-3 gap-3 mb-4">
                  <div v-for="s in heroStats" :key="s.label" class="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div class="w-7 h-7 rounded-lg flex items-center justify-center mb-2" :class="s.bg">
                      <component :is="s.icon" :size="14" :stroke-width="2" :class="s.color" />
                    </div>
                    <div class="text-white text-lg font-bold font-display">{{ s.value }}</div>
                    <div class="text-white/30 text-[10px]">{{ s.label }}</div>
                  </div>
                </div>
                <div class="bg-white/5 rounded-xl p-4 border border-white/5 mb-4">
                  <div class="flex items-center justify-between mb-3">
                    <div class="text-white/60 text-xs font-semibold">Daromad dinamikasi</div>
                    <div class="text-emerald-400 text-xs font-semibold">+12.5%</div>
                  </div>
                  <div class="flex items-end gap-1.5 h-20">
                    <div v-for="(h, i) in chartBars" :key="i" class="flex-1 bg-gradient-to-t from-brand-600/40 to-brand-400/80 rounded-t" :style="{ height: h + '%' }"></div>
                  </div>
                </div>
                <div class="space-y-2">
                  <div v-for="i in 3" :key="i" class="flex items-center gap-3 bg-white/5 rounded-lg p-2.5">
                    <div class="w-8 h-8 rounded-lg bg-white/10"></div>
                    <div class="flex-1"><div class="h-2 w-24 bg-white/10 rounded-full mb-1.5"></div><div class="h-1.5 w-16 bg-white/5 rounded-full"></div></div>
                    <div class="h-5 w-12 rounded" :class="i % 2 ? 'bg-emerald-500/20' : 'bg-amber-500/20'"></div>
                  </div>
                </div>
              </div>
              <div class="absolute -top-4 -right-4 glass-dark rounded-2xl p-3 border border-white/10 animate-float">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center"><TrendingUp :size="14" :stroke-width="2" class="text-emerald-400" /></div>
                  <div><div class="text-white text-xs font-semibold">To'lov qabul</div><div class="text-white/30 text-[10px]">₸ 2.4M</div></div>
                </div>
              </div>
              <div class="absolute -bottom-4 -left-4 glass-dark rounded-2xl p-3 border border-white/10 animate-float" style="animation-delay: 1s">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center"><Bell :size="14" :stroke-width="2" class="text-brand-400" /></div>
                  <div><div class="text-white text-xs font-semibold">Yangi ariza</div><div class="text-white/30 text-[10px]">5 daqiqa oldin</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-24 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <div class="badge badge-info mb-4 px-3 py-1.5">Imkoniyatlar</div>
          <h2 class="font-display text-4xl font-bold text-ink-900 mb-3">Barchasi bitta tizimda</h2>
          <p class="text-ink-500 text-lg max-w-2xl mx-auto">MAKON — koʻchmulk boshqaruvining to'liq ekotizimi</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="f in features" :key="f.title" class="card-hover p-6 group">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" :class="f.bg">
              <component :is="f.icon" :size="22" :stroke-width="2" :class="f.color" />
            </div>
            <h3 class="font-display text-lg font-semibold text-ink-900 mb-2">{{ f.title }}</h3>
            <p class="text-ink-500 text-sm leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Modules -->
    <section id="modules" class="py-24 bg-ink-50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <div class="badge badge-neutral mb-4 px-3 py-1.5">Modullar</div>
          <h2 class="font-display text-4xl font-bold text-ink-900 mb-3">16+ modul, bitta tizim</h2>
          <p class="text-ink-500 text-lg max-w-2xl mx-auto">Har bir rol uchun maxsus imkoniyatlar</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="m in modules" :key="m.title" class="bg-white rounded-2xl border border-ink-200/60 p-5 hover:shadow-card-hover hover:border-ink-300/60 transition-all duration-300 group">
            <div class="w-10 h-10 rounded-xl bg-ink-50 group-hover:bg-brand-50 flex items-center justify-center mb-4 transition-colors">
              <component :is="m.icon" :size="18" :stroke-width="2" class="text-ink-600 group-hover:text-brand-600 transition-colors" />
            </div>
            <div class="font-display font-semibold text-ink-900 text-sm mb-1">{{ m.title }}</div>
            <div class="text-ink-400 text-xs">{{ m.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Platform -->
    <section id="platform" class="py-24 bg-ink-950 relative overflow-hidden">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0); background-size: 24px 24px;"></div>
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px]"></div>
      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
              <span class="text-white/50 text-xs font-medium">Koʻp platformali</span>
            </div>
            <h2 class="font-display text-4xl font-bold text-white mb-4">Har qurilmada — bir xil tajriba</h2>
            <p class="text-white/40 text-lg mb-8 max-w-lg">Telegram Mini-App, iPhone, Android va veb-panel. Doim qoʻlingizda.</p>
            <div class="space-y-4">
              <div v-for="p in platforms" :key="p.title" class="flex items-center gap-4">
                <div class="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <component :is="p.icon" :size="20" :stroke-width="2" :class="p.color" />
                </div>
                <div>
                  <div class="text-white font-semibold text-sm">{{ p.title }}</div>
                  <div class="text-white/30 text-xs">{{ p.desc }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative flex items-center justify-center scale-90">
            <div style="transform: perspective(1000px) rotateY(-12deg) rotateX(4deg);">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="font-display text-4xl font-bold text-ink-900 mb-4">Bugundan boshlang</h2>
        <p class="text-ink-500 text-lg mb-8 max-w-xl mx-auto">MAKON platformasida roʻyxatdan oʻting va koʻchmulingizni boshqaring.</p>
        <NuxtLink to="/login" class="btn btn-primary btn-lg">Tizimga kirish <ArrowRight :size="18" :stroke-width="2" /></NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-ink-950 py-10">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center"><Building2 :size="16" :stroke-width="2" class="text-white" /></div>
          <div class="text-white font-display font-bold">MAKON</div>
        </div>
        <div class="text-white/30 text-sm">© 2026 MAKON · Koʻchmulk Boshqaruvi Tizimi</div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  Building2, ArrowRight, TrendingUp, Bell, ShieldCheck, FileText, CreditCard,
  Wrench, BarChart3, Wallet, Building, Search, ClipboardList, Package,
  Truck, Users, Settings, Activity, LayoutGrid, Send, Smartphone, Monitor, Apple, Calendar,
} from 'lucide-vue-next'
definePageMeta({ layout: 'public' })

const stats = [
  { value: '5', label: 'Bino' },
  { value: '60+', label: 'Unit' },
  { value: '12', label: 'Shartnoma' },
  { value: '99.9%', label: 'Uptime' },
]
const chartBars = [40, 55, 35, 70, 60, 85, 95, 50, 65, 80, 45, 90]
const heroStats = [
  { value: '₸8.2M', label: 'Daromad', bg: 'bg-emerald-500/15', color: 'text-emerald-400', icon: TrendingUp },
  { value: '94%', label: 'Bandlik', bg: 'bg-brand-500/15', color: 'text-brand-400', icon: Building2 },
  { value: '12', label: 'Shartnoma', bg: 'bg-amber-500/15', color: 'text-amber-400', icon: FileText },
]
const features = [
  { title: 'Bino boshqaruvi', desc: 'Binolar, ofislar va turar joylarni boshqaring.', bg: 'bg-brand-50', color: 'text-brand-600', icon: Building },
  { title: 'Ijara va shartnomalar', desc: 'Shartnomalarni avtomatlashtiring — yangilash, bekor qilish.', bg: 'bg-emerald-50', color: 'text-emerald-600', icon: FileText },
  { title: 'Moliya va invoyslar', desc: 'Invoyslar va toʻlovlarni avtomatik boshqaring.', bg: 'bg-amber-50', color: 'text-amber-600', icon: Wallet },
  { title: 'Servis va soʻrovlar', desc: 'Texnik xizmat soʻrovlarini tracking qiling.', bg: 'bg-sky-50', color: 'text-sky-600', icon: Wrench },
  { title: 'Hisobotlar va analitika', desc: 'Real-time dashboardlar va hisobotlar.', bg: 'bg-rose-50', color: 'text-rose-600', icon: BarChart3 },
  { title: 'ERI integratsiyasi', desc: 'Elektron raqamli imzo orqali xavfsiz kirish.', bg: 'bg-brand-50', color: 'text-brand-600', icon: ShieldCheck },
]
const modules = [
  { title: 'Ishchi panel', desc: 'Dashboard', icon: LayoutGrid },
  { title: 'Binolar', desc: 'Boshqaruv', icon: Building },
  { title: 'Listinglar', desc: 'Katalog', icon: Search },
  { title: 'Arizalar', desc: 'Soʻrovlar', icon: ClipboardList },
  { title: 'Shartnomalar', desc: 'Moliya', icon: FileText },
  { title: 'Invoyslar', desc: 'Hisob-faktura', icon: CreditCard },
  { title: 'Toʻlovlar', desc: 'Tranzaksiya', icon: Wallet },
  { title: 'Tasdiqlar', desc: 'Workflow', icon: ShieldCheck },
  { title: 'Hisob davrlari', desc: 'Periodlar', icon: Calendar },
  { title: 'Soʻrovlar', desc: 'Servis', icon: Wrench },
  { title: 'Sklad', desc: 'Ombor', icon: Package },
  { title: 'Taʼminotchilar', desc: 'Suppliers', icon: Truck },
  { title: 'Hisobotlar', desc: 'Statistika', icon: BarChart3 },
  { title: 'Foydalanuvchilar', desc: 'Admin', icon: Users },
  { title: 'Sozlamalar', desc: 'Tizim', icon: Settings },
  { title: 'Monitoring', desc: 'Tizim', icon: Activity },
]
const platforms = [
  { title: 'Telegram Mini-App', desc: '30 soniyada kirish, bot orqali bildirishnomalar', icon: Send, color: 'text-sky-400' },
  { title: 'Veb-panel', desc: 'Toʻliq funksional boshqaruv paneli', icon: Monitor, color: 'text-white/60' },
  { title: 'Mobil ilova', desc: 'iOS va Android uchun mahalliy ilova', icon: Smartphone, color: 'text-white/60' },
]
</script>
