<template>
  <div class="min-h-screen">
    <template v-if="building">
      <!-- Hero -->
      <section class="relative h-[480px] overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-center scale-105" :style="{ backgroundImage: `url(${building.gallery[0]})` }" />
        <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(9,9,11,0.95) 0%, rgba(9,9,11,0.6) 50%, rgba(9,9,11,0.2) 100%);"></div>
        <div class="absolute inset-0" style="background: radial-gradient(ellipse at bottom left, rgba(99,102,241,0.1), transparent 60%);"></div>

        <div class="relative max-w-7xl mx-auto px-4 lg:px-6 h-full flex items-end pb-10">
          <div>
            <NuxtLink to="/catalog" class="inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-white mb-5 transition-all hover:translate-x-[-3px]">
              <ArrowLeft :size="16" /> Katalogga qaytish
            </NuxtLink>
            <div class="flex items-center gap-3 mb-4">
              <span class="badge badge-brand" style="backdrop-filter: blur(8px); background: rgba(99,102,241,0.2); border: 1px solid rgba(99,102,241,0.3);">{{ typeLabel(building.type) }}</span>
              <span v-if="building.vacantUnits > 0" class="badge badge-success" style="backdrop-filter: blur(8px); background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3);">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1"></div>
                {{ building.vacantUnits }} bo'sh maydon
              </span>
            </div>
            <h1 class="text-5xl font-extrabold mb-3 text-white tracking-tight" style="text-shadow: 0 2px 20px rgba(0,0,0,0.3);">{{ building.name }}</h1>
            <p class="text-ink-300 flex items-center gap-2 text-base">
              <MapPin :size="16" /> {{ building.address }}
            </p>
          </div>
        </div>
      </section>

      <!-- Gallery -->
      <section class="py-8 px-4 lg:px-6 max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div v-for="(img, i) in building.gallery" :key="i" class="aspect-square rounded-2xl overflow-hidden bg-ink-900 group cursor-pointer">
            <img :src="img" :alt="`${building.name} - ${i + 1}`" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
          </div>
        </div>
      </section>

      <!-- Info Grid -->
      <section class="py-8 px-4 lg:px-6 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Description -->
          <div class="lg:col-span-2 space-y-6">
            <div class="card-premium p-6">
              <h2 class="font-semibold text-ink-900 dark:text-white mb-3">Bino haqida</h2>
              <p class="text-ink-400 leading-relaxed">{{ building.description }}</p>
            </div>

            <!-- Specs -->
            <div class="card-premium p-6">
              <h2 class="font-semibold text-ink-900 dark:text-white mb-5">Texnik ko'rsatkichlar</h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] transition-all hover:bg-brand-500/5">
                  <div class="text-xs text-ink-600 dark:text-ink-300 mb-1.5">Qavatlar soni</div>
                  <div class="text-2xl font-bold">{{ building.floorsCount }}</div>
                </div>
                <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] transition-all hover:bg-brand-500/5">
                  <div class="text-xs text-ink-600 dark:text-ink-300 mb-1.5">Jami unitlar</div>
                  <div class="text-2xl font-bold">{{ building.totalUnits }}</div>
                </div>
                <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] transition-all hover:bg-emerald-500/5">
                  <div class="text-xs text-ink-600 dark:text-ink-300 mb-1.5">Band</div>
                  <div class="text-2xl font-bold text-emerald-500">{{ building.occupiedUnits }}</div>
                </div>
                <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] transition-all hover:bg-brand-500/5">
                  <div class="text-xs text-ink-600 dark:text-ink-300 mb-1.5">Bo'sh</div>
                  <div class="text-2xl font-bold text-brand-500">{{ building.vacantUnits }}</div>
                </div>
                <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] transition-all hover:bg-brand-500/5">
                  <div class="text-xs text-ink-600 dark:text-ink-300 mb-1.5">Umumiy maydon</div>
                  <div class="text-2xl font-bold">{{ formatArea(building.totalArea) }} m²</div>
                </div>
                <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] transition-all hover:bg-brand-500/5">
                  <div class="text-xs text-ink-600 dark:text-ink-300 mb-1.5">Bandlik</div>
                  <div class="text-2xl font-bold">{{ occupancyPercent }}%</div>
                </div>
                <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] transition-all hover:bg-brand-500/5">
                  <div class="text-xs text-ink-600 dark:text-ink-300 mb-1.5">Tuman</div>
                  <div class="text-lg font-bold">{{ building.district }}</div>
                </div>
                <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] transition-all hover:bg-brand-500/5">
                  <div class="text-xs text-ink-600 dark:text-ink-300 mb-1.5">Shahar</div>
                  <div class="text-lg font-bold">{{ building.city }}</div>
                </div>
              </div>
            </div>

            <!-- Listings -->
            <div v-if="buildingListings.length > 0" class="card-premium p-6">
              <h2 class="font-semibold text-ink-900 dark:text-white mb-4">Bo'sh takliflar ({{ buildingListings.length }})</h2>
              <div class="space-y-3">
                <div v-for="l in buildingListings" :key="l.id" class="flex items-center gap-4 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] hover:border-brand-500/20 hover:shadow-md transition-all duration-300 cursor-pointer" @click="navigateTo('/listings/' + l.id)">
                  <div class="w-16 h-16 rounded-lg overflow-hidden bg-ink-900 flex-shrink-0">
                    <img :src="l.photos[0]" :alt="l.titleUz" class="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="badge" :class="l.offerType === 'RENT' ? 'badge-brand' : 'badge-success'">{{ l.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvga' }}</span>
                    </div>
                    <h4 class="font-medium text-sm truncate">{{ l.titleUz }}</h4>
                    <p class="text-xs text-ink-500 truncate">{{ l.area }} m² · {{ l.floor }}-qavat</p>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <div class="text-lg font-bold text-brand-400">{{ formatUZS(l.price) }}</div>
                    <NuxtLink :to="'/listings/' + l.id" class="btn btn-primary btn-sm mt-1">Batafsil</NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-4">
            <div class="card-premium p-6 glow-brand" style="background: linear-gradient(135deg, rgba(99,102,241,0.05), rgba(139,92,246,0.03));">
              <h3 class="font-semibold dark:text-white mb-4">Aloqa va taklif</h3>
              <p class="text-sm text-ink-400 mb-5">Bu binodagi bo'sh maydonlar haqida taklif olish uchun ariza yuboring.</p>
              <NuxtLink to="/register/eri" class="btn btn-primary w-full mb-2 btn-glow">Taklif so'rash</NuxtLink>
              <NuxtLink to="/login" class="btn btn-secondary w-full">Tizimga kirish</NuxtLink>
            </div>

            <div class="card-premium p-6">
              <h3 class="font-semibold dark:text-white mb-3">Joylashuv</h3>
              <p class="text-sm text-ink-400">{{ building.address }}</p>
              <p class="text-sm text-ink-500 mt-1">{{ building.district }}, {{ building.city }}</p>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- Not found -->
    <div v-else class="py-32 text-center">
      <p class="text-red-400 mb-4">Bino topilmadi</p>
      <NuxtLink to="/catalog" class="btn btn-secondary btn-sm">Katalogga qaytish</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, MapPin } from 'lucide-vue-next'
import { BUILDING_TYPE_LABELS } from '~/types'

definePageMeta({ layout: 'public' })

const { formatUZS, formatUZSShort, formatNumber } = useFormat()

const route = useRoute()

// All buildings with real Tashkent imagery
const buildings: Record<string, any> = {
  'tashkent-city': {
    id: 'b1', name: 'Tashkent City', type: 'BUSINESS_CENTER',
    address: 'Mirzo Ulug\'bek tumani, Tashkent', district: 'Mirzo Ulug\'bek', city: 'Toshkent',
    floorsCount: 12, totalUnits: 420, occupiedUnits: 378, vacantUnits: 42, totalArea: 45000,
    gallery: [
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/99fff4d6f_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/41072e285_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png',
    ],
    description: 'Tashkent City — Toshkent shahrining markazidagi premium biznes markazi. 12 qavat, 420 unit, 45 000 m². Zamonaviy infratuzilma, 24/7 xavfsizlik, keng avtoturargoh.',
  },
  'trillant-tower': {
    id: 'b2', name: 'Trillant Tower', type: 'BUSINESS_CENTER',
    address: 'Yashnabad tumani, Toshkent', district: 'Yashnabad', city: 'Toshkent',
    floorsCount: 18, totalUnits: 180, occupiedUnits: 171, vacantUnits: 9, totalArea: 28000,
    gallery: [
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/b0db07788_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png',
    ],
    description: 'Trillant Tower — Yashnabad tumanidagi nufuzli 18 qavatli biznes markazi. Panel oynali fasad, zamonaviy ofis maydonlari, yer osti avtoturargohi. 180 unit, 28 000 m².',
  },
  'it-park': {
    id: 'b3', name: 'IT Park', type: 'OFFICE',
    address: 'Yakkasaray tumani, Toshkent', district: 'Yakkasaray', city: 'Toshkent',
    floorsCount: 8, totalUnits: 150, occupiedUnits: 123, vacantUnits: 27, totalArea: 18000,
    gallery: [
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/e6d4fe6e6_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/6daa9acc3_generated_image.png',
    ],
    description: 'IT Park — O\'zbekistonning yetakchi texnologik markazi. 8 qavat, 150 unit, 18 000 m². Yuqori tezlikdagi internet, konferensiya zallari, start-up inkubatsiya maydonlari.',
  },
  'piramit': {
    id: 'b4', name: 'Piramit', type: 'MIXED',
    address: 'Amir Temur shoh ko\'chasi, Toshkent', district: 'Amir Temur', city: 'Toshkent',
    floorsCount: 10, totalUnits: 90, occupiedUnits: 70, vacantUnits: 20, totalArea: 15000,
    gallery: [
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/8fa70df4e_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png',
    ],
    description: 'Piramit Center — markazda joylashgan aralash tipdagi bino. Ofislar, savdo maydonlari va omborlarni o\'zida jamlagan. 10 qavat, 90 unit, 15 000 m².',
  },
  'savdo-markaz': {
    id: 'b5', name: 'Savdo Markaz', type: 'SHOPPING',
    address: 'Sergeli tumani, Toshkent', district: 'Sergeli', city: 'Toshkent',
    floorsCount: 4, totalUnits: 120, occupiedUnits: 95, vacantUnits: 25, totalArea: 12000,
    gallery: [
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/9adbd3468_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/41072e285_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png',
      'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3075330ac_generated_image.png',
    ],
    description: 'Savdo Markaz — Sergeli tumanidagi yirik savdo markazi. 4 qavat, 120 unit, 12 000 m². Do\'konlar, kafe, oziq-ovqat bo\'limi, keng avtoturargoh.',
  },
}

const building = computed(() => {
  const slug = route.params.slug as string
  return buildings[slug] || null
})

const buildingListings = computed(() => {
  if (!building.value) return []
  const slug = route.params.slug as string
  const listingsMap: Record<string, any[]> = {
    'tashkent-city': [
      { id: 'l1', titleUz: 'A-301 · 85 m² ofis', offerType: 'RENT', price: 25000000, area: 85, floor: 3, photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png'] },
      { id: 'l2', titleUz: 'A-302 · 72 m² ofis', offerType: 'RENT', price: 21000000, area: 72, floor: 3, photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png'] },
      { id: 'l6', titleUz: 'A-205 · 50 m² ofis', offerType: 'RENT', price: 15000000, area: 50, floor: 2, photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png'] },
    ],
    'trillant-tower': [
      { id: 'l2', titleUz: 'B-501 · 120 m² premium ofis', offerType: 'RENT', price: 35000000, area: 120, floor: 5, photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/6daa9acc3_generated_image.png'] },
      { id: 'l7', titleUz: 'B-502 · 95 m² ofis', offerType: 'RENT', price: 28000000, area: 95, floor: 5, photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/6daa9acc3_generated_image.png'] },
    ],
    'it-park': [
      { id: 'l3', titleUz: 'C-201 · 65 m² savdo maydoni', offerType: 'RENT', price: 18000000, area: 65, floor: 2, photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/41072e285_generated_image.png'] },
      { id: 'l8', titleUz: 'C-202 · 45 m² ofis', offerType: 'RENT', price: 14000000, area: 45, floor: 2, photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/41072e285_generated_image.png'] },
    ],
    'piramit': [
      { id: 'l4', titleUz: 'D-102 · 200 m² savdo maydoni', offerType: 'RENT', price: 15000000, area: 200, floor: 1, photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/3075330ac_generated_image.png'] },
      { id: 'l9', titleUz: 'D-201 · 80 m² ofis', offerType: 'RENT', price: 22000000, area: 80, floor: 2, photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/3075330ac_generated_image.png'] },
    ],
    'savdo-markaz': [
      { id: 'l5', titleUz: 'E-301 · 42 m² do\'kon', offerType: 'SALE', price: 450000000, area: 42, floor: 3, photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png'] },
      { id: 'l10', titleUz: 'E-102 · 35 m² do\'kon', offerType: 'RENT', price: 12000000, area: 35, floor: 1, photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png'] },
    ],
  }
  return listingsMap[slug] || []
})

const occupancyPercent = computed(() => {
  if (!building.value || !building.value.totalUnits) return 0
  return Math.round((building.value.occupiedUnits / building.value.totalUnits) * 100)
})

function typeLabel(type: string) {
  return BUILDING_TYPE_LABELS[type as keyof typeof BUILDING_TYPE_LABELS]?.uz || type
}

function formatArea(m2: number) {
  return m2?.toLocaleString('ru-RU') || '—'
}


</script>
