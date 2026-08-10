<template>
  <div class="min-h-screen">
    <!-- Hero with search -->
    <section class="relative min-h-[640px] overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80');" />
      <div class="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white dark:from-ink-950/85 dark:via-ink-950/65 dark:to-ink-950"></div>

      <div class="relative max-w-5xl mx-auto px-4 lg:px-6 min-h-[640px] flex flex-col justify-center items-center text-center">
        <div class="badge badge-brand mb-6">Toshkent #1 kommersiya mulk platformasi</div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-5 text-ink-900 dark:text-white max-w-3xl">
          Biznes maydonlari <span class="text-gradient">bitta platformada</span>
        </h1>
        <p class="text-lg text-ink-600 dark:text-ink-400 mb-8 max-w-2xl">
          Tashkent City, Trillant Tower, IT Park va boshqa premium binolarda ofis, savdo va ombor maydonlari. ERI orqali xavfsiz shartnoma tuzish va to'liq boshqaruv.
        </p>

        <!-- Search bar (joymee-inspired) -->
        <div class="w-full max-w-2xl mb-6">
          <div class="hero-search">
            <Search :size="20" class="text-ink-400 flex-shrink-0" />
            <input v-model="heroSearch" type="text" placeholder="Qidirish: ofis, ombor, savdo maydoni, bino nomi..." @keyup.enter="goToCatalog" />
            <button class="hero-search__btn" @click="goToCatalog">Qidirish</button>
          </div>
          <!-- Quick category pills -->
          <div class="flex flex-wrap items-center justify-center gap-2 mt-4">
            <NuxtLink to="/catalog?offerType=RENT" class="hero-chip">
              <Building2 :size="14" /> Ijaraga ofis
            </NuxtLink>
            <NuxtLink to="/catalog?offerType=SALE" class="hero-chip">
              <ShoppingBag :size="14" /> Sotuvda maydon
            </NuxtLink>
            <NuxtLink to="/catalog?type=WAREHOUSE" class="hero-chip">
              <Warehouse :size="14" /> Ombor
            </NuxtLink>
            <NuxtLink to="/catalog?type=SHOPPING" class="hero-chip">
              <ShoppingBag :size="14" /> Savdo maydoni
            </NuxtLink>
            <NuxtLink to="/catalog" class="hero-chip hero-chip--all">
              Barchasi <ArrowRight :size="14" />
            </NuxtLink>
          </div>
        </div>

        <!-- Stats -->
        <div class="flex items-center gap-6 md:gap-12 mt-8">
          <div v-if="data">
            <div class="text-3xl font-bold text-ink-900 dark:text-white">{{ data.stats.totalBuildings }}</div>
            <div class="text-sm text-ink-500">Binolar</div>
          </div>
          <div class="w-px h-10 bg-black/10 dark:bg-white/10"></div>
          <div v-if="data">
            <div class="text-3xl font-bold text-ink-900 dark:text-white">{{ data.stats.vacantUnits }}</div>
            <div class="text-sm text-ink-500">Bo'sh maydonlar</div>
          </div>
          <div class="w-px h-10 bg-black/10 dark:bg-white/10"></div>
          <div v-if="data">
            <div class="text-3xl font-bold text-ink-900 dark:text-white">{{ data.stats.publishedListings }}</div>
            <div class="text-sm text-ink-500">Faol listinglar</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Bar -->
    <section class="py-8 border-y border-black/5 dark:border-white/5">
      <div class="max-w-7xl mx-auto px-4 lg:px-6">
        <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-ink-400 dark:text-ink-600">
          <div class="flex items-center gap-2 text-sm font-medium"><ShieldCheck :size="18" class="text-brand-500" /> ERI integratsiyasi</div>
          <div class="flex items-center gap-2 text-sm font-medium"><FileCheck2 :size="18" class="text-brand-500" /> 18 modul</div>
          <div class="flex items-center gap-2 text-sm font-medium"><Users :size="18" class="text-brand-500" /> 5 rol</div>
          <div class="flex items-center gap-2 text-sm font-medium"><Building2 :size="18" class="text-brand-500" /> 322 jadval</div>
          <div class="flex items-center gap-2 text-sm font-medium"><Zap :size="18" class="text-brand-500" /> Real-time monitoring</div>
        </div>
      </div>
    </section>

    <!-- Premium Listings Carousel (joymee VIP-inspired) -->
    <section v-if="data && data.listings.length" class="py-12 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold mb-1 text-ink-900 dark:text-white flex items-center gap-2">
            <Crown :size="22" class="text-amber-500" />
            Premium ob'ektlar
          </h2>
          <p class="text-ink-500 text-sm">Bo'sh premium ofislar va savdo maydonlari</p>
        </div>
        <NuxtLink to="/catalog" class="btn btn-ghost btn-sm">Barchasi <ArrowRight :size="14" /></NuxtLink>
      </div>

      <div class="vip-carousel">
        <div
          v-for="(item, i) in premiumListings"
          :key="i"
          class="vip-item"
          @click="navigateTo(`/listings/${item.id}`)"
        >
          <div class="vip-item__image">
            <img :src="item.photos[0]" :alt="item.titleUz" loading="lazy" />
            <span class="vip-item__badge">PREMIUM</span>
            <div class="vip-item__overlay">
              <div class="vip-item__price">{{ formatPrice(item.price, item.currency) }}</div>
              <div class="vip-item__title">{{ item.titleUz }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Building Types -->
    <section class="py-16 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="mb-8">
        <h2 class="text-2xl md:text-3xl font-bold mb-2 text-ink-900 dark:text-white">Obyekt turlari</h2>
        <p class="text-ink-500">Biznes markazlar, ofislar, savdo va ombor maydonlari</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NuxtLink to="/catalog?type=OFFICE" class="card card-hover p-6 text-center group">
          <div class="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
            <Briefcase :size="28" class="text-brand-500" />
          </div>
          <div class="text-sm font-semibold text-ink-900 dark:text-white">Ofislar</div>
          <div class="text-xs text-ink-500 mt-1">Biznes markazlarda</div>
        </NuxtLink>
        <NuxtLink to="/catalog?type=SHOPPING" class="card card-hover p-6 text-center group">
          <div class="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
            <ShoppingBag :size="28" class="text-amber-500" />
          </div>
          <div class="text-sm font-semibold text-ink-900 dark:text-white">Savdo maydonlari</div>
          <div class="text-xs text-ink-500 mt-1">Do'konlar va butiklar</div>
        </NuxtLink>
        <NuxtLink to="/catalog?type=WAREHOUSE" class="card card-hover p-6 text-center group">
          <div class="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
            <Warehouse :size="28" class="text-orange-500" />
          </div>
          <div class="text-sm font-semibold text-ink-900 dark:text-white">Ombor maydonlari</div>
          <div class="text-xs text-ink-500 mt-1">Logistika uchun</div>
        </NuxtLink>
        <NuxtLink to="/catalog" class="card card-hover p-6 text-center group">
          <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
            <Building2 :size="28" class="text-emerald-500" />
          </div>
          <div class="text-sm font-semibold text-ink-900 dark:text-white">Barcha ob'ektlar</div>
          <div class="text-xs text-ink-500 mt-1">To'liq katalog</div>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Buildings -->
    <section v-if="data && data.buildings.length" class="py-16 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-ink-900 dark:text-white">Tavsiya etilgan binolar</h2>
          <p class="text-ink-500">Bo'sh maydonlar mavjud premium obyektlar</p>
        </div>
        <NuxtLink to="/catalog" class="btn btn-ghost btn-sm">Barchasini ko'rish <ArrowRight :size="14" /></NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink v-for="b in data.buildings.slice(0, 6)" :key="b.id" :to="`/buildings/${b.slug}`" class="card card-hover overflow-hidden">
          <div class="h-48 overflow-hidden bg-ink-100 dark:bg-ink-900">
            <img :src="b.gallery[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'" :alt="b.name" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div class="p-5">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge badge-brand">{{ typeLabel(b.type) }}</span>
              <span class="badge badge-success" v-if="b.vacantUnits > 0">{{ b.vacantUnits }} bo'sh</span>
            </div>
            <h3 class="font-semibold text-lg mb-1 text-ink-900 dark:text-white">{{ b.name }}</h3>
            <p class="text-sm text-ink-500 mb-3 line-clamp-1">{{ b.address }}</p>
            <div class="flex items-center gap-4 text-xs text-ink-500">
              <span>{{ b.floorsCount }} qavat</span>
              <span>{{ b.totalUnits }} unit</span>
              <span>{{ formatArea(b.totalArea) }} m²</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Platforma imkoniyatlari</h2>
        <p class="text-ink-500 max-w-2xl mx-auto">18 modul, 322 jadval va 51 yo'nalish — ko'chmas mulkni boshqarishning to'liq raqamli ekotizimi</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="f in features" :key="f.title" class="card p-6 hover:shadow-lg transition-all">
          <div class="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4">
            <component :is="f.icon" :size="24" class="text-brand-500" />
          </div>
          <h3 class="font-semibold mb-2 text-ink-900 dark:text-white">{{ f.title }}</h3>
          <p class="text-sm text-ink-500 leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 px-4 lg:px-6 bg-gradient-to-b from-brand-500/5 to-transparent">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Raqamlarda MAKON</h2>
          <p class="text-ink-500">Tizim hajmi va ko'rsatkichlari</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="card p-6 text-center">
            <div class="text-4xl font-bold text-brand-500 mb-2">{{ data?.stats.totalBuildings || '—' }}</div>
            <div class="text-sm text-ink-500">Boshqariladigan binolar</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl font-bold text-brand-500 mb-2">{{ data?.stats.totalUnits || '—' }}</div>
            <div class="text-sm text-ink-500">Jami birliklar</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl font-bold text-brand-500 mb-2">{{ data?.stats.publishedListings || '—' }}</div>
            <div class="text-sm text-ink-500">Faol listinglar</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl font-bold text-brand-500 mb-2">{{ data?.stats.occupancyRate || '—' }}%</div>
            <div class="text-sm text-ink-500">Bandlik darajasi</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="about" class="py-20 px-4 lg:px-6 bg-gradient-to-b from-transparent to-brand-500/5">
      <div class="max-w-4xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Qanday ishlaydi</h2>
        <p class="text-ink-500">Katalogdan shartnoma imzolashgacha — to'liq raqamli oqim</p>
      </div>
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div v-for="(step, i) in steps" :key="i" class="text-center">
          <div class="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-4 mx-auto font-bold text-brand-500 text-lg">{{ i + 1 }}</div>
          <h4 class="font-semibold mb-1 text-ink-900 dark:text-white">{{ step.title }}</h4>
          <p class="text-sm text-ink-500">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="py-20 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Tarif rejalar</h2>
        <p class="text-ink-500">Biznesingiz hajmiga qarab tanlang</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div v-for="p in pricing" :key="p.name" class="card p-8" :class="p.featured ? 'border-2 border-brand-500 shadow-xl' : ''">
          <div v-if="p.featured" class="badge badge-brand mb-3">Tavsiya etiladi</div>
          <h3 class="font-bold text-xl mb-1 text-ink-900 dark:text-white">{{ p.name }}</h3>
          <p class="text-sm text-ink-500 mb-4">{{ p.desc }}</p>
          <div class="text-3xl font-bold mb-6 text-ink-900 dark:text-white">{{ p.price }}</div>
          <ul class="space-y-2 mb-8">
            <li v-for="feat in p.features" :key="feat" class="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-400">
              <CheckCircle2 :size="16" class="text-emerald-500 flex-shrink-0 mt-0.5" /> {{ feat }}
            </li>
          </ul>
          <button class="btn w-full" :class="p.featured ? 'btn-primary' : 'btn-secondary'">Tanlash</button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section id="contacts" class="py-20 px-4 lg:px-6">
      <div class="max-w-4xl mx-auto card p-12 text-center bg-gradient-to-br from-brand-500/5 to-transparent border-brand-500/20">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Binongizni MAKON ga qo'shing</h2>
        <p class="text-ink-500 mb-8 max-w-xl mx-auto">Binongizni raqamlashtiring, bo'sh maydonlarni avtomatik katalogga chiqaring va ijara jarayonini to'liq boshqaring — ERI orqali xavfsiz shartnoma tuzish bilan.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink to="/register/eri" class="btn btn-primary btn-lg">Ro'yxatdan o'tish</NuxtLink>
          <a href="mailto:info@makon.uz" class="btn btn-secondary btn-lg">Bog'lanish</a>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 px-4 lg:px-6 max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Tez-tez so'raladigan savollar</h2>
      </div>
      <div class="space-y-3">
        <div v-for="(faq, i) in faqs" :key="i" class="card p-5">
          <button @click="faqOpen = faqOpen === i ? -1 : i" class="flex items-center justify-between w-full text-left">
            <span class="font-medium text-ink-900 dark:text-white">{{ faq.q }}</span>
            <ChevronDown :size="18" class="text-ink-400 transition-transform flex-shrink-0" :class="faqOpen === i ? 'rotate-180' : ''" />
          </button>
          <transition name="fade">
            <p v-if="faqOpen === i" class="text-sm text-ink-500 mt-3 leading-relaxed">{{ faq.a }}</p>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Building2, ShoppingBag, Warehouse, Home, Briefcase, Building, ShieldCheck,
  FileCheck2, Users, Zap, Star, ChevronDown, CheckCircle2, Receipt, Wrench,
  BarChart3, Gauge, ScrollText, Package, Settings, Search, ArrowRight, Crown,
} from 'lucide-vue-next'
import { BUILDING_TYPE_LABELS } from '~/types'

definePageMeta({ layout: 'public' })

const heroSearch = ref('')
function goToCatalog() {
  const q = heroSearch.value ? `?search=${encodeURIComponent(heroSearch.value)}` : ''
  navigateTo(`/catalog${q}`)
}

const data = ref({
  stats: { totalBuildings: 12, totalUnits: 420, vacantUnits: 47, occupiedUnits: 373, publishedListings: 34, occupancyRate: 89 },
  buildings: [
    { id: 'b1', name: 'Tashkent City', slug: 'tashkent-city', type: 'BUSINESS_CENTER', address: 'Mirzo Ulug\'bek, Tashkent', floorsCount: 12, totalUnits: 420, occupiedUnits: 378, vacantUnits: 42, totalArea: 45000, gallery: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'] },
    { id: 'b2', name: 'Trillant Tower', slug: 'trillant-tower', type: 'BUSINESS_CENTER', address: 'Yashnabad, Tashkent', floorsCount: 18, totalUnits: 180, occupiedUnits: 171, vacantUnits: 9, totalArea: 28000, gallery: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'] },
    { id: 'b3', name: 'IT Park', slug: 'it-park', type: 'OFFICE', address: 'Yakkasaray, Tashkent', floorsCount: 8, totalUnits: 150, occupiedUnits: 123, vacantUnits: 27, totalArea: 18000, gallery: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'] },
    { id: 'b4', name: 'Piramit', slug: 'piramit', type: 'MIXED', address: 'Amir Temur, Tashkent', floorsCount: 10, totalUnits: 90, occupiedUnits: 70, vacantUnits: 20, totalArea: 15000, gallery: ['https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=800&q=80'] },
    { id: 'b5', name: 'Business Center 1', slug: 'business-center-1', type: 'BUSINESS_CENTER', address: 'Chilonzor, Tashkent', floorsCount: 6, totalUnits: 60, occupiedUnits: 53, vacantUnits: 7, totalArea: 8000, gallery: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80'] },
    { id: 'b6', name: 'Savdo Markaz', slug: 'savdo-markaz', type: 'SHOPPING', address: 'Sergeli, Tashkent', floorsCount: 4, totalUnits: 120, occupiedUnits: 95, vacantUnits: 25, totalArea: 12000, gallery: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'] },
  ],
  listings: [
    { id: 'l1', titleUz: 'A-301 · 85 m² ofis (Tashkent City)', offerType: 'RENT', price: 25000000, currency: 'UZS', photos: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'] },
    { id: 'l2', titleUz: 'B-501 · 120 m² premium ofis (Trillant Tower)', offerType: 'RENT', price: 35000000, currency: 'UZS', photos: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80'] },
    { id: 'l3', titleUz: 'C-201 · 65 m² savdo maydoni (IT Park)', offerType: 'RENT', price: 18000000, currency: 'UZS', photos: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80'] },
    { id: 'l4', titleUz: 'D-102 · 200 m² ombor (Piramit)', offerType: 'RENT', price: 12000000, currency: 'UZS', photos: ['https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80'] },
    { id: 'l5', titleUz: 'E-301 · 42 m² do\'kon (Savdo Markaz)', offerType: 'SALE', price: 450000000, currency: 'UZS', photos: ['https://images.unsplash.com/photo-1555529771-7888783a18d3?w=600&q=80'] },
  ],
})

const premiumListings = computed(() => data.value?.listings.slice(0, 5) || [])

const faqOpen = ref(-1)

const features = [
  { icon: Building2, title: 'Bino boshqaruvi', desc: 'Binolar, qavatlar, birliklar — to\'liq struktura boshqaruvi. 3D ko\'rinish va 2D planlar bilan.' },
  { icon: FileCheck2, title: 'ERI integratsiyasi', desc: 'Yuridik shaxslar uchun xavfsiz elektron imzo. Shartnomalarni onlayn imzolang.' },
  { icon: Receipt, title: 'Moliya boshqaruvi', desc: 'Invoyslar, to\'lovlar, qarzdorlik monitoringi. Avtomatik hisob-kitob va hisobotlar.' },
  { icon: Wrench, title: 'Xizmat ko\'rsatish', desc: 'Service request\'lar, work order\'lar, SLA monitoringi. Faol topshiriqlarni boshqaring.' },
  { icon: Package, title: 'Ombor boshqaruvi', desc: 'Materiallar, qoldiqlar, sarflash monitoringi. Kam qolgan materiallarni avtomatik ogohlantirish.' },
  { icon: Gauge, title: 'Hisoblagichlar', desc: 'Elektr, suv, gaz ko\'rsatkichlari. Tariflar bo\'yicha avtomatik hisob-kitob.' },
  { icon: BarChart3, title: 'Hisobotlar va analitika', desc: 'Bandlik dinamikasi, daromad, konversiya. Real-time dashboard va hisobotlar.' },
  { icon: ShieldCheck, title: 'Rollar va huquqlar', desc: '5 rol: SUPER_HEAD, BUILDING_MANAGER, ACCOUNTANT, FACILITY, TENANT_OWNER. Aniq huquqlar boshqaruvi.' },
  { icon: ScrollText, title: 'Shartnoma boshqaruvi', desc: 'Shartnoma yaratish, ERI imzolash, versiya nazorati. PDF eksport va arxiv.' },
]

const steps = [
  { title: 'Katalogdan tanlang', desc: 'Bo\'sh maydonlarni ko\'ring va mos obyektni tanlang' },
  { title: 'ERI ro\'yxatdan o\'ting', desc: 'Yuridik shaxs sifatida xavfsiz identifikatsiya' },
  { title: 'Ariza yuboring', desc: 'Onlayn ariza va shartnoma jarayoni' },
  { title: 'Shartnoma imzolang', desc: 'ERI orqali elektron imzo va kabinetga kirish' },
]

const pricing = [
  { name: 'Start', price: '500K so\'m', desc: 'Kichik biznes uchun', featured: false, features: ['3 binogacha', '50 unitgacha', 'Asosiy modullar', 'Email qo\'llab-quvvatlash'] },
  { name: 'Business', price: '2M so\'m', desc: 'O\'rta biznes uchun', featured: true, features: ['10 binogacha', '500 unitgacha', 'Barcha modullar', 'ERI integratsiyasi', 'Prioritetli qo\'llab-quvvatlash'] },
  { name: 'Enterprise', price: 'Kelishilgan', desc: 'Yirik tashkilotlar uchun', featured: false, features: ['Cheksiz binolar', 'Cheksiz unitlar', 'Barcha modullar + API', 'Shaxsiy integratsiya', '24/7 qo\'llab-quvvatlash'] },
]

const testimonials = [
  { name: 'Sardor Yusupov', role: 'Tashkent City Tower menejeri', text: 'MAKON tizimi bizga binoni boshqarishda 3 baravar tezlik berdi. ERI orqali shartnoma imzolash — aldamchi masala emas.' },
  { name: 'Dilnoza Karimova', role: 'Trillant Tower buxgalteri', text: 'Invoyslar va qarzdorlik monitoringi avtomatik. Endi har oy hisobot tayyorlashga vaqt sarflamaymiz.' },
  { name: 'Aziz Toshmatov', role: 'IT Park bino menejeri', text: 'Bo\'sh ofislar katalogda avtomatik chiqadi. Ijara jarayoni 2-3 kundan bir necha soatga qisqardi.' },
]

const faqs = [
  { q: 'MAKON faqat Toshkent uchun mo\'ljallanganmi?', a: 'Hozir faqat Toshkent shahridagi biznes markazlari uchun. 2026-yildan boshlab viloyatlarga kengayish rejalashtirilgan.' },
  { q: 'ERI orqali shartnoma qonuniy kuchga egami?', a: 'Ha, ERI (Elektron Raqamli Imzo) O\'zbekiston qonunchiligiga muvofiq qonuniy kuchga ega. Shartnoma PDF formatida saqlanadi.' },
  { q: 'Qaysi mulk turlari qo\'llab-quvvatlanadi?', a: 'Biznes markazlar, ofis binolari, savdo majlari va ombor-sanoat zonasi obyektlari. Turar-joy mulklari bilan ishlamaymiz.' },
  { q: 'Telegram orqali ishlaydimi?', a: 'Ha, MAKON Telegram Mini App sifatida ishlaydi. Bot orqali bildirishnomalar, arizalar va shartnomalarni boshqarishingiz mumkin.' },
]

function typeLabel(type: string) {
  return BUILDING_TYPE_LABELS[type as keyof typeof BUILDING_TYPE_LABELS]?.uz || type
}

function formatArea(m2: number) {
  return m2?.toLocaleString('ru-RU') || '—'
}

function formatPrice(price: number, currency: string) {
  if (!price) return '—'
  const formatted = new Intl.NumberFormat('ru-RU').format(price)
  return currency === 'USD' ? `$${formatted}` : `${(formatted / 1000000).toFixed(1)}M so'm`
}
</script>

<style scoped>
/* Hero search bar (joymee-inspired) */
.hero-search {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 6px 6px 16px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04);
}
.dark .hero-search {
  background: #18181b;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06);
}
.hero-search input {
  flex: 1;
  background: transparent;
  border: none;
  font-size: 15px;
  color: #18181b;
  outline: none;
}
.dark .hero-search input { color: #fff; }
.hero-search__btn {
  font-size: 14px;
  font-weight: 700;
  color: white;
  background: #4f46e5;
  padding: 12px 24px;
  border-radius: 12px;
  white-space: nowrap;
}
.hero-search__btn:hover { background: #4338ca; }
.hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  color: #52525b;
  padding: 8px 14px;
  border-radius: 10px;
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(0,0,0,0.06);
  backdrop-filter: blur(8px);
}
.dark .hero-chip {
  background: rgba(24,24,27,0.7);
  border-color: rgba(255,255,255,0.06);
  color: #d4d4d8;
}
.hero-chip:hover { background: white; color: #4f46e5; border-color: rgba(99,102,241,0.3); }
.dark .hero-chip:hover { background: #27272a; color: #818cf8; }
.hero-chip--all { background: #4f46e5; color: white; border-color: transparent; }
.hero-chip--all:hover { background: #4338ca; color: white; }

/* VIP carousel */
.vip-carousel {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  padding-bottom: 4px;
}
.vip-carousel::-webkit-scrollbar { display: none; }
.vip-item {
  flex-shrink: 0;
  width: 280px;
  cursor: pointer;
}
.vip-item__image {
  position: relative;
  width: 280px;
  height: 200px;
  border-radius: 14px;
  overflow: hidden;
}
.vip-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.vip-item:hover .vip-item__image img { transform: scale(1.05); }
.vip-item__badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
}
.vip-item__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
  padding: 20px 14px 12px;
}
.vip-item__price {
  font-size: 18px;
  font-weight: 800;
  color: white;
  margin-bottom: 4px;
}
.vip-item__title {
  font-size: 13px;
  color: rgba(255,255,255,0.9);
  line-height: 1.3;
}
</style>
