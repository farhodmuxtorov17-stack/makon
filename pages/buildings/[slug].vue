<template>
  <div class="min-h-screen">
    <div v-if="pending" class="py-32 text-center text-ink-500">Yuklanmoqda...</div>

    <div v-else-if="error" class="py-32 text-center">
      <p class="text-red-400 mb-4">Bino topilmadi</p>
      <NuxtLink to="/catalog" class="btn btn-secondary btn-sm">Katalogga qaytish</NuxtLink>
    </div>

    <template v-else-if="data">
      <!-- Hero -->
      <section class="relative h-[400px] overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${data.building.gallery[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80'})` }" />
        <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent"></div>

        <div class="relative max-w-7xl mx-auto px-4 lg:px-6 h-full flex items-end pb-8">
          <div>
            <NuxtLink to="/catalog" class="inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-white mb-4 transition-colors">
              <ArrowLeft :size="16" /> Katalogga qaytish
            </NuxtLink>
            <div class="flex items-center gap-3 mb-3">
              <span class="badge badge-brand">{{ typeLabel(data.building.type) }}</span>
              <span v-if="data.building.vacantUnits > 0" class="badge badge-success">{{ data.building.vacantUnits }} bo'sh maydon</span>
            </div>
            <h1 class="text-4xl font-bold mb-2">{{ data.building.name }}</h1>
            <p class="text-ink-400 flex items-center gap-2">
              <MapPin :size="16" /> {{ data.building.address }}
            </p>
          </div>
        </div>
      </section>

      <!-- Gallery -->
      <section v-if="data.building.gallery.length > 0" class="py-8 px-4 lg:px-6 max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div v-for="(img, i) in data.building.gallery" :key="i" class="aspect-square rounded-xl overflow-hidden bg-ink-900">
            <img :src="img" :alt="`${data.building.name} - ${i + 1}`" class="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <!-- Info Grid -->
      <section class="py-8 px-4 lg:px-6 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Description -->
          <div class="lg:col-span-2 space-y-6">
            <div class="card p-6">
              <h2 class="font-semibold mb-3">Bino haqida</h2>
              <p class="text-ink-400 leading-relaxed">{{ data.building.publicDescription }}</p>
            </div>

            <!-- Specs -->
            <div class="card p-6">
              <h2 class="font-semibold mb-4">Texnik ko'rsatkichlar</h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div class="text-xs text-ink-600 mb-1">Qavatlar soni</div>
                  <div class="text-2xl font-bold">{{ data.building.floorsCount }}</div>
                </div>
                <div>
                  <div class="text-xs text-ink-600 mb-1">Jami unitlar</div>
                  <div class="text-2xl font-bold">{{ data.building.totalUnits }}</div>
                </div>
                <div>
                  <div class="text-xs text-ink-600 mb-1">Band</div>
                  <div class="text-2xl font-bold text-emerald-400">{{ data.building.occupiedUnits }}</div>
                </div>
                <div>
                  <div class="text-xs text-ink-600 mb-1">Bo'sh</div>
                  <div class="text-2xl font-bold text-brand-400">{{ data.building.vacantUnits }}</div>
                </div>
                <div>
                  <div class="text-xs text-ink-600 mb-1">Umumiy maydon</div>
                  <div class="text-2xl font-bold">{{ formatArea(data.building.totalArea) }} m²</div>
                </div>
                <div>
                  <div class="text-xs text-ink-600 mb-1">Bandlik</div>
                  <div class="text-2xl font-bold">{{ occupancyPercent }}%</div>
                </div>
                <div>
                  <div class="text-xs text-ink-600 mb-1">Tuman</div>
                  <div class="text-lg font-bold">{{ data.building.district }}</div>
                </div>
                <div>
                  <div class="text-xs text-ink-600 mb-1">Shahar</div>
                  <div class="text-lg font-bold">{{ data.building.city }}</div>
                </div>
              </div>
            </div>

            <!-- Listings -->
            <div v-if="data.listings.length > 0" class="card p-6">
              <h2 class="font-semibold mb-4">Bo'sh takliflar ({{ data.listings.length }})</h2>
              <div class="space-y-3">
                <div v-for="l in data.listings" :key="l.id" class="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-brand-500/20 transition-colors">
                  <div class="w-16 h-16 rounded-lg overflow-hidden bg-ink-900 flex-shrink-0">
                    <img v-if="l.photos[0]" :src="l.photos[0]" :alt="l.titleUz" class="w-full h-full object-cover" loading="lazy" />
                    <div v-else class="w-full h-full flex items-center justify-center text-ink-600"><ImageOff :size="20" /></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="badge" :class="l.offerType === 'RENT' ? 'badge-brand' : 'badge-success'">{{ l.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvga' }}</span>
                    </div>
                    <h4 class="font-medium text-sm truncate">{{ l.titleUz }}</h4>
                    <p class="text-xs text-ink-500 truncate">{{ l.descriptionUz }}</p>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <div class="text-lg font-bold text-brand-400">{{ formatPrice(l.price, l.currency) }}</div>
                    <NuxtLink :to="'/listings/' + l.id" class="btn btn-primary btn-sm mt-1">Batafsil</NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-4">
            <div class="card p-6">
              <h3 class="font-semibold mb-4">Aloqa va taklif</h3>
              <p class="text-sm text-ink-400 mb-4">Bu binodagi bo'sh maydonlar haqida taklif olish uchun ariza yuboring.</p>
              <NuxtLink to="/register/eri" class="btn btn-primary w-full mb-2">Taklif so'rash</NuxtLink>
              <NuxtLink to="/login" class="btn btn-secondary w-full">Tizimga kirish</NuxtLink>
            </div>

            <div class="card p-6">
              <h3 class="font-semibold mb-3">Joylashuv</h3>
              <p class="text-sm text-ink-400">{{ data.building.address }}</p>
              <p class="text-sm text-ink-500 mt-1">{{ data.building.district }}, {{ data.building.city }}</p>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, MapPin, ImageOff } from 'lucide-vue-next'
import { BUILDING_TYPE_LABELS } from '~/types'

definePageMeta({ layout: 'public' })

const route = useRoute()
const data = ref({
  building: {
    id: 'b1', name: 'Tashkent City', slug: 'tashkent-city', type: 'BUSINESS_CENTER',
    address: 'Mirzo Ulug\'bek tumani, Tashkent', floorsCount: 12, totalUnits: 420,
    occupiedUnits: 378, vacantUnits: 42, totalArea: 45000,
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      'https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=1200&q=80',
    ],
    publicDescription: 'Tashkent City — Toshkent shahrining markazidagi premium biznes markazi. 12 qavat, 420 unit, 45 000 m². Zamonaviy infratuzilma, 24/7 xavfsizlik, keng avtoturargoh.',
  },
  listings: [
    { id: 'l1', titleUz: 'A-301 · 85 m² ofis', offerType: 'RENT', price: 25000000, currency: 'UZS', photos: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'], viewsCount: 234, status: 'PUBLISHED' },
    { id: 'l2', titleUz: 'A-302 · 72 m² ofis', offerType: 'RENT', price: 21000000, currency: 'UZS', photos: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80'], viewsCount: 189, status: 'PUBLISHED' },
    { id: 'l3', titleUz: 'A-303 · 95 m² ofis', offerType: 'RENT', price: 28000000, currency: 'UZS', photos: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80'], viewsCount: 312, status: 'PUBLISHED' },
  ],
})

const occupancyPercent = computed(() => {
  if (!data.value || !data.value.building || !data.value.building.totalUnits) return 0
  return Math.round((data.value.building.occupiedUnits / data.value.building.totalUnits) * 100)
})

function typeLabel(type: string) {
  return BUILDING_TYPE_LABELS[type as keyof typeof BUILDING_TYPE_LABELS]?.uz || type
}

function formatArea(m2: number) {
  return m2?.toLocaleString('ru-RU') || '—'
}

function formatPrice(price: number, currency: string) {
  if (!price) return '—'
  const formatted = new Intl.NumberFormat('ru-RU').format(price)
  return currency === 'USD' ? `$${formatted}` : `${formatted} so'm`
}
</script>
