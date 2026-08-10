<template>
  <div class="min-h-screen bg-white">
    <!-- Nav -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-ink-100">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
            <Building2 :size="18" :stroke-width="2" class="text-white" />
          </div>
          <div>
            <div class="font-display font-bold text-ink-900 text-base leading-none">MAKON</div>
            <div class="text-[9px] text-ink-400 font-medium tracking-widest uppercase mt-0.5">Real Estate</div>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" class="text-ink-500 hover:text-ink-900 transition-colors">Imkoniyatlar</a>
          <a href="#modules" class="text-ink-500 hover:text-ink-900 transition-colors">Modullar</a>
          <a href="#platform" class="text-ink-500 hover:text-ink-900 transition-colors">Platforma</a>
        </div>
        <NuxtLink to="/login" class="btn btn-primary btn-sm">Tizimga kirish</NuxtLink>
      </div>
    </nav>

    <!-- Hero — Split with real photo -->
    <section class="pt-24 pb-20 px-6">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div class="animate-fade-in-up">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
            <span class="text-brand-700 text-xs font-semibold">Enterprise · v2.0 · 2026</span>
          </div>
          <h1 class="font-display text-5xl lg:text-6xl font-bold text-ink-900 leading-[1.05] mb-6 tracking-tight">
            Koʻchmulkingizni<br>bir tizimda<br><span class="text-brand-600">boshqaring</span>
          </h1>
          <p class="text-ink-500 text-lg leading-relaxed mb-8 max-w-lg">
            Binolar, ijara, shartnomalar, invoyslar va servis — bitta zamonaviy platformada. Real-time dashboard, avtomatlashtirilgan workflow va Telegram Mini-App.
          </p>
          <div class="flex flex-wrap items-center gap-4 mb-12">
            <NuxtLink to="/login" class="btn btn-primary btn-lg">
              Boshlash <ArrowRight :size="18" :stroke-width="2" />
            </NuxtLink>
            <a href="#features" class="btn btn-outline btn-lg">Imkoniyatlar</a>
          </div>
          <div class="flex items-center gap-8 pt-8 border-t border-ink-100">
            <div v-for="s in stats" :key="s.label">
              <div class="font-display text-3xl font-bold text-ink-900">{{ s.value }}</div>
              <div class="text-ink-400 text-sm">{{ s.label }}</div>
            </div>
          </div>
        </div>

        <!-- Real building photo -->
        <div class="relative animate-fade-in-up delay-200">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop"
              alt="Modern office building"
              class="w-full h-[560px] object-cover"
              loading="eager"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent"></div>
          </div>

          <!-- Floating stat card -->
          <div class="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-ink-100 p-5 w-56 hidden sm:block">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <TrendingUp :size="20" :stroke-width="2" class="text-emerald-600" />
              </div>
              <div>
                <div class="text-ink-900 font-display font-bold text-lg">₸8.2M</div>
                <div class="text-ink-400 text-xs">Daromad · Oy</div>
              </div>
            </div>
            <div class="flex items-end gap-1 h-10">
              <div v-for="(h, i) in miniBars" :key="i" class="flex-1 bg-brand-100 rounded-t" :class="i === miniBars.length - 1 ? '!bg-brand-600' : ''" :style="{ height: h + '%' }"></div>
            </div>
          </div>

          <!-- Floating occupancy card -->
          <div class="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-ink-100 p-4 hidden sm:block">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                <Building2 :size="20" :stroke-width="2" class="text-brand-600" />
              </div>
              <div>
                <div class="text-ink-900 font-display font-bold text-lg">94%</div>
                <div class="text-ink-400 text-xs">Bandlik</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted by band -->
    <section class="py-12 border-y border-ink-100 bg-ink-50/50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <p class="text-ink-400 text-sm font-medium">Oʻzbekistondagi yetakchi koʻchmulk boshqaruvchilari MAKON tanlaydi</p>
          <div class="flex flex-wrap items-center gap-x-10 gap-y-4">
            <div v-for="b in brands" :key="b" class="font-display text-xl font-bold text-ink-300">{{ b }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features with real photos -->
    <section id="features" class="py-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="max-w-2xl mb-16">
          <span class="text-brand-600 text-sm font-semibold uppercase tracking-wider">Imkoniyatlar</span>
          <h2 class="font-display text-4xl font-bold text-ink-900 mt-2 mb-4 tracking-tight">Barchasi bitta tizimda</h2>
          <p class="text-ink-500 text-lg">MAKON — koʻchmulk boshqaruvining to'liq ekotizimi. 16+ modul, real-time hisobotlar va avtomatlashtirilgan jarayonlar.</p>
        </div>

        <!-- Big feature card 1 -->
        <div class="grid lg:grid-cols-2 gap-8 mb-8 items-center">
          <div class="relative rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80&auto=format&fit=crop"
              alt="Office management"
              class="w-full h-80 object-cover"
            />
          </div>
          <div class="px-4">
            <div class="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5">
              <Building :size="24" :stroke-width="2" class="text-brand-600" />
            </div>
            <h3 class="font-display text-2xl font-bold text-ink-900 mb-3">Bino va maydon boshqaruvi</h3>
            <p class="text-ink-500 text-lg leading-relaxed mb-6">Binolar, ofislar va turar joylarni boshqaring. Maydon, zonalar, ijara narxlari va bandlikni real-time kuzating.</p>
            <ul class="space-y-3">
              <li v-for="f in feature1Details" :key="f" class="flex items-center gap-3 text-ink-600">
                <CheckCircle2 :size="18" :stroke-width="2" class="text-emerald-500 flex-shrink-0" />
                {{ f }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Big feature card 2 (reversed) -->
        <div class="grid lg:grid-cols-2 gap-8 mb-8 items-center">
          <div class="lg:order-2 relative rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop"
              alt="Finance and contracts"
              class="w-full h-80 object-cover"
            />
          </div>
          <div class="lg:order-1 px-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-5">
              <Wallet :size="24" :stroke-width="2" class="text-emerald-600" />
            </div>
            <h3 class="font-display text-2xl font-bold text-ink-900 mb-3">Moliya va shartnomalar</h3>
            <p class="text-ink-500 text-lg leading-relaxed mb-6">Shartnomalarni avtomatlashtiring — yaratish, uzaytirish, bekor qilish. Invoyslar va toʻlovlarni boshqaring.</p>
            <ul class="space-y-3">
              <li v-for="f in feature2Details" :key="f" class="flex items-center gap-3 text-ink-600">
                <CheckCircle2 :size="18" :stroke-width="2" class="text-emerald-500 flex-shrink-0" />
                {{ f }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Big feature card 3 -->
        <div class="grid lg:grid-cols-2 gap-8 items-center">
          <div class="relative rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&q=80&auto=format&fit=crop"
              alt="Service and maintenance"
              class="w-full h-80 object-cover"
            />
          </div>
          <div class="px-4">
            <div class="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
              <Wrench :size="24" :stroke-width="2" class="text-amber-600" />
            </div>
            <h3 class="font-display text-2xl font-bold text-ink-900 mb-3">Servis va taʼmirlash</h3>
            <p class="text-ink-500 text-lg leading-relaxed mb-6">Texnik xizmat soʻrovlarini tracking qiling. Brigade tayinlang, statuslarni kuzating, sifatni nazorat qiling.</p>
            <ul class="space-y-3">
              <li v-for="f in feature3Details" :key="f" class="flex items-center gap-3 text-ink-600">
                <CheckCircle2 :size="18" :stroke-width="2" class="text-emerald-500 flex-shrink-0" />
                {{ f }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats band -->
    <section class="py-20 bg-ink-950 relative overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1600&q=80&auto=format&fit=crop"
          alt="City buildings"
          class="w-full h-full object-cover opacity-10"
        />
      </div>
      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="s in bigStats" :key="s.label" class="text-center">
            <div class="font-display text-5xl font-bold text-white mb-2">{{ s.value }}</div>
            <div class="text-ink-400 text-sm">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modules -->
    <section id="modules" class="py-24 px-6 bg-ink-50">
      <div class="max-w-7xl mx-auto">
        <div class="max-w-2xl mb-16">
          <span class="text-brand-600 text-sm font-semibold uppercase tracking-wider">Modullar</span>
          <h2 class="font-display text-4xl font-bold text-ink-900 mt-2 mb-4 tracking-tight">16+ modul, bitta tizim</h2>
          <p class="text-ink-500 text-lg">Har bir rol uchun maxsus imkoniyatlar — direktordan texnik xizmat xodimigacha.</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="m in modules" :key="m.title" class="bg-white rounded-2xl border border-ink-200/60 p-5 hover:shadow-card-hover hover:border-brand-200 transition-all duration-300 group">
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
    <section id="platform" class="py-24 px-6">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span class="text-brand-600 text-sm font-semibold uppercase tracking-wider">Platforma</span>
          <h2 class="font-display text-4xl font-bold text-ink-900 mt-2 mb-4 tracking-tight">Har qurilmada — bir xil tajriba</h2>
          <p class="text-ink-500 text-lg mb-8 max-w-lg">Telegram Mini-App, iPhone, Android va veb-panel. Doim qoʻlingizda.</p>
          <div class="space-y-5">
            <div v-for="p in platforms" :key="p.title" class="flex items-start gap-4 p-4 rounded-2xl border border-ink-200/60 hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-ink-50 flex items-center justify-center flex-shrink-0">
                <component :is="p.icon" :size="22" :stroke-width="2" :class="p.color" />
              </div>
              <div>
                <div class="text-ink-900 font-display font-semibold">{{ p.title }}</div>
                <div class="text-ink-500 text-sm">{{ p.desc }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="relative flex items-center justify-center">
          <div style="transform: perspective(1000px) rotateY(-12deg) rotateX(4deg);">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6 bg-ink-950 relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[120px]"></div>
      <div class="max-w-3xl mx-auto text-center relative z-10">
        <h2 class="font-display text-4xl font-bold text-white mb-4 tracking-tight">Bugundan boshlang</h2>
        <p class="text-ink-400 text-lg mb-8 max-w-xl mx-auto">MAKON platformasida roʻyxatdan oʻting va koʻchmulingizni professional darajada boshqaring.</p>
        <NuxtLink to="/login" class="btn btn-primary btn-lg">Tizimga kirish <ArrowRight :size="18" :stroke-width="2" /></NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white py-12 border-t border-ink-100">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div class="col-span-2 md:col-span-1">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
                <Building2 :size="18" :stroke-width="2" class="text-white" />
              </div>
              <div class="font-display font-bold text-ink-900">MAKON</div>
            </div>
            <p class="text-ink-400 text-sm">Koʻchmulk Boshqaruvi Tizimi</p>
          </div>
          <div>
            <div class="font-semibold text-ink-900 text-sm mb-4">Platforma</div>
            <ul class="space-y-2 text-sm text-ink-500">
              <li><a href="#features" class="hover:text-ink-900 transition-colors">Imkoniyatlar</a></li>
              <li><a href="#modules" class="hover:text-ink-900 transition-colors">Modullar</a></li>
              <li><a href="#platform" class="hover:text-ink-900 transition-colors">Platforma</a></li>
            </ul>
          </div>
          <div>
            <div class="font-semibold text-ink-900 text-sm mb-4">Kompaniya</div>
            <ul class="space-y-2 text-sm text-ink-500">
              <li><a class="hover:text-ink-900 transition-colors cursor-pointer">Haqimizda</a></li>
              <li><a class="hover:text-ink-900 transition-colors cursor-pointer">Aloqa</a></li>
              <li><a class="hover:text-ink-900 transition-colors cursor-pointer">Maxfiylik</a></li>
            </ul>
          </div>
          <div>
            <div class="font-semibold text-ink-900 text-sm mb-4">Aloqa</div>
            <ul class="space-y-2 text-sm text-ink-500">
              <li>info@makon.uz</li>
              <li>+998 71 123 45 67</li>
              <li>Toshkent, Oʻzbekiston</li>
            </ul>
          </div>
        </div>
        <div class="pt-8 border-t border-ink-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-ink-400 text-sm">© 2026 MAKON · Koʻchmulk Boshqaruvi Tizimi</p>
          <div class="flex items-center gap-6 text-sm text-ink-400">
            <a class="hover:text-ink-900 transition-colors cursor-pointer">Maxfiylik</a>
            <a class="hover:text-ink-900 transition-colors cursor-pointer">Shartlar</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  Building2, ArrowRight, TrendingUp, CheckCircle2, Building, Wallet, Wrench,
  FileText, CreditCard, ShieldCheck, BarChart3, Package, Users, Settings,
  Activity, ClipboardList, Search as SearchIcon, Calendar, LayoutGrid,
  Send, Smartphone, Monitor, Truck,
} from 'lucide-vue-next'

definePageMeta({ layout: 'public' })

const miniBars = [40, 55, 35, 70, 60, 85, 95]
const stats = [
  { value: '16+', label: 'Modullar' },
  { value: '5', label: 'Binolar' },
  { value: '60+', label: 'Unit' },
  { value: '99.9%', label: 'Uptime' },
]
const bigStats = [
  { value: '₸8.2M', label: 'Oylik daromad' },
  { value: '94%', label: 'Oʻrtacha bandlik' },
  { value: '48', label: 'Faol ijarachilar' },
  { value: '12', label: 'Faol shartnomalar' },
]
const brands = ['Urban Office', 'Business Plaza', 'Makon Group', 'Alfa Properties', 'Delta Real Estate']
const feature1Details = ['Maydon va zonalar boʻyicha ijara narxlari', 'Real-time bandlik monitoringi', 'Bino turlari: ofis, turar joy, savdo', 'Bino boʻyicha toʻliq hisobotlar']
const feature2Details = ['Avtomatik shartnoma yaratish', 'Invoys va toʻlov tracking', 'ERI orqali elektron imzo', 'Hisob davrlari va tasdiqlash workflow']
const feature3Details = ['Soʻrov yaratish va tracking', 'Brigade tayinlash', 'Statuslar va SLA monitoring', 'Sklad va materiallar bilan integratsiya']
const modules = [
  { title: 'Ishchi panel', desc: 'Dashboard', icon: LayoutGrid },
  { title: 'Binolar', desc: 'Boshqaruv', icon: Building },
  { title: 'Listinglar', desc: 'Katalog', icon: SearchIcon },
  { title: 'Arizalar', desc: 'Soʻrovlar', icon: ClipboardList },
  { title: 'Shartnomalar', desc: 'Moliya', icon: FileText },
  { title: 'Invoyslar', desc: 'Hisob-faktura', icon: CreditCard },
  { title: 'Toʻlovlar', desc: 'Tranzaksiya', icon: Wallet },
  { title: 'Tasdiqlar', desc: 'Workflow', icon: ShieldCheck },
  { title: 'Hisob davrlari', desc: 'Periodlar', icon: Calendar },
  { title: 'Servis', desc: 'Texnik xizmat', icon: Wrench },
  { title: 'Sklad', desc: 'Ombor', icon: Package },
  { title: 'Taʼminotchilar', desc: 'Suppliers', icon: Truck },
  { title: 'Hisobotlar', desc: 'Statistika', icon: BarChart3 },
  { title: 'Foydalanuvchilar', desc: 'Admin', icon: Users },
  { title: 'Sozlamalar', desc: 'Tizim', icon: Settings },
  { title: 'Monitoring', desc: 'Tizim', icon: Activity },
]
const platforms = [
  { title: 'Telegram Mini-App', desc: '30 soniyada kirish, bot orqali bildirishnomalar', icon: Send, color: 'text-sky-500' },
  { title: 'Veb-panel', desc: 'Toʻliq funksional boshqaruv paneli', icon: Monitor, color: 'text-ink-600' },
  { title: 'Mobil ilova', desc: 'iOS va Android uchun mahalliy ilova', icon: Smartphone, color: 'text-ink-600' },
]
</script>
