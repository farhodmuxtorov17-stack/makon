<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5 py-8 px-4 lg:px-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-2">Katalog</h1>
        <p class="text-ink-500">Bo'sh ofis, savdo va ombor maydonlari</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="border-b border-white/5 py-4 px-4 lg:px-6 sticky top-16 z-30 bg-ink-950/80 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input v-model="search" type="text" placeholder="Qidirish..." class="input pl-9" />
        </div>
        <select v-model="typeFilter" class="input w-auto">
          <option value="">Barcha turlar</option>
          <option v-for="t in types" :key="t" :value="t">{{ BUILDING_TYPE_LABELS[t]?.uz || t }}</option>
        </select>
        <select v-model="offerFilter" class="input w-auto">
          <option value="">Hammasi</option>
          <option value="RENT">Ijaraga</option>
          <option value="SALE">Sotuvga</option>
        </select>
        <select v-model="sortBy" class="input w-auto">
          <option value="name">Nomi bo'yicha</option>
          <option value="vacant">Bo'sh joy bo'yicha</option>
          <option value="area">Maydon bo'yicha</option>
        </select>
        <div class="flex rounded-xl border border-white/10 overflow-hidden">
          <button @click="view = 'grid'" class="p-2 px-3" :class="view === 'grid' ? 'bg-brand-500/10 text-brand-400' : 'text-ink-500'">
            <LayoutGrid :size="16" />
          </button>
          <button @click="view = 'list'" class="p-2 px-3" :class="view === 'list' ? 'bg-brand-500/10 text-brand-400' : 'text-ink-500'">
            <List :size="16" />
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="py-8 px-4 lg:px-6 max-w-7xl mx-auto">
      <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

      <div v-else-if="error" class="text-center py-20 text-red-400">Xatolik</div>

      <div v-else-if="filteredBuildings.length === 0" class="text-center py-20">
        <p class="text-ink-500 mb-4">Filtr bo'yicha binolar topilmadi</p>
        <button @click="resetFilters" class="btn btn-secondary btn-sm">Filtrlarni tozalash</button>
      </div>

      <template v-else>
        <!-- Buildings Grid/List -->
        <div v-if="view === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink v-for="b in filteredBuildings" :key="b.id" :to="`/buildings/${b.slug}`" class="card card-hover overflow-hidden">
            <div class="h-56 overflow-hidden bg-ink-900 relative">
              <img :src="b.gallery[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'" :alt="b.name" class="w-full h-full object-cover" loading="lazy" />
              <div class="absolute top-3 right-3">
                <span v-if="b.vacantUnits > 0" class="badge badge-success">{{ b.vacantUnits }} bo'sh</span>
                <span v-else class="badge badge-neutral">To'liq</span>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2">
                <span class="badge badge-brand">{{ typeLabel(b.type) }}</span>
              </div>
              <h3 class="font-semibold text-lg mb-1">{{ b.name }}</h3>
              <p class="text-sm text-ink-500 mb-3">{{ b.address }}</p>
              <div class="grid grid-cols-3 gap-2 text-xs">
                <div><div class="text-ink-600">Qavatlar</div><div class="font-medium">{{ b.floorsCount }}</div></div>
                <div><div class="text-ink-600">Unitlar</div><div class="font-medium">{{ b.totalUnits }}</div></div>
                <div><div class="text-ink-600">Maydon</div><div class="font-medium">{{ formatArea(b.totalArea) }} m²</div></div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="space-y-3">
          <NuxtLink v-for="b in filteredBuildings" :key="b.id" :to="`/buildings/${b.slug}`" class="card card-hover p-4 flex items-center gap-4">
            <div class="w-24 h-24 rounded-xl overflow-hidden bg-ink-900 flex-shrink-0">
              <img :src="b.gallery[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80'" :alt="b.name" class="w-full h-full object-cover" loading="lazy" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="badge badge-brand">{{ typeLabel(b.type) }}</span>
                <span v-if="b.vacantUnits > 0" class="badge badge-success">{{ b.vacantUnits }} bo'sh</span>
              </div>
              <h3 class="font-semibold mb-1">{{ b.name }}</h3>
              <p class="text-sm text-ink-500">{{ b.address }}</p>
            </div>
            <div class="hidden md:flex items-center gap-6 text-sm">
              <div class="text-center"><div class="text-ink-600 text-xs">Qavat</div><div class="font-medium">{{ b.floorsCount }}</div></div>
              <div class="text-center"><div class="text-ink-600 text-xs">Unit</div><div class="font-medium">{{ b.totalUnits }}</div></div>
              <div class="text-center"><div class="text-ink-600 text-xs">m²</div><div class="font-medium">{{ formatArea(b.totalArea) }}</div></div>
            </div>
          </NuxtLink>
        </div>

        <!-- Active Listings -->
        <div v-if="filteredListings.length > 0" class="mt-12">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">Faol takliflar</h2>
            <span class="text-sm text-ink-500">{{ filteredListings.length }} ta</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NuxtLink v-for="l in filteredListings" :key="l.id" :to="`/listings/${l.id}`" class="card card-hover overflow-hidden">
              <div class="h-40 overflow-hidden bg-ink-900 relative">
                <img v-if="l.photos[0]" :src="l.photos[0]" :alt="l.titleUz" class="w-full h-full object-cover" loading="lazy" />
                <div v-else class="w-full h-full flex items-center justify-center text-ink-600"><ImageOff :size="32" /></div>
                <div class="absolute top-2 right-2">
                  <span class="badge" :class="l.offerType === 'RENT' ? 'badge-brand' : 'badge-success'">{{ l.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvga' }}</span>
                </div>
              </div>
              <div class="p-4">
                <h4 class="font-medium text-sm mb-1 truncate">{{ l.titleUz }}</h4>
                <p class="text-xs text-ink-500 mb-2 line-clamp-1">{{ l.descriptionUz }}</p>
                <div class="text-lg font-bold text-brand-400">{{ formatPrice(l.price, l.currency) }}</div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="mt-6 text-sm text-ink-500 text-center">
          {{ filteredBuildings.length }} bino · {{ filteredListings.length }} taklif
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, LayoutGrid, List, ImageOff } from 'lucide-vue-next'
import { BUILDING_TYPE_LABELS } from '~/types'

definePageMeta({ layout: 'public' })

const data = ref({
  stats: { totalBuildings: 12, totalUnits: 420, vacantUnits: 47, occupiedUnits: 373, publishedListings: 34 },
  buildings: [
    { id: 'b1', name: 'Tashkent City', slug: 'tashkent-city', type: 'BUSINESS_CENTER', address: 'Mirzo Ulug\'bek tumani, Tashkent', floorsCount: 12, totalUnits: 420, occupiedUnits: 378, vacantUnits: 42, totalArea: 45000, gallery: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'] },
    { id: 'b2', name: 'Trillant Tower', slug: 'trillant-tower', type: 'BUSINESS_CENTER', address: 'Yashnabad tumani, Tashkent', floorsCount: 18, totalUnits: 180, occupiedUnits: 171, vacantUnits: 9, totalArea: 28000, gallery: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'] },
    { id: 'b3', name: 'IT Park', slug: 'it-park', type: 'OFFICE', address: 'Yakkasaray tumani, Tashkent', floorsCount: 8, totalUnits: 150, occupiedUnits: 123, vacantUnits: 27, totalArea: 18000, gallery: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'] },
    { id: 'b4', name: 'Piramit', slug: 'piramit', type: 'MIXED', address: 'Amir Temur ko\'chasi, Tashkent', floorsCount: 10, totalUnits: 90, occupiedUnits: 70, vacantUnits: 20, totalArea: 15000, gallery: ['https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=800&q=80'] },
    { id: 'b5', name: 'Business Center 1', slug: 'business-center-1', type: 'BUSINESS_CENTER', address: 'Chilonzor tumani, Tashkent', floorsCount: 6, totalUnits: 60, occupiedUnits: 53, vacantUnits: 7, totalArea: 8000, gallery: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80'] },
    { id: 'b6', name: 'Savdo Markaz', slug: 'savdo-markaz', type: 'SHOPPING', address: 'Sergeli tumani, Tashkent', floorsCount: 4, totalUnits: 120, occupiedUnits: 95, vacantUnits: 25, totalArea: 12000, gallery: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'] },
  ],
  listings: [
    { id: 'l1', buildingId: 'b1', titleUz: 'A-301 · 85 m² ofis', titleRu: 'A-301 · 85 м² офис', offerType: 'RENT', price: 25000000, currency: 'UZS', photos: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'], viewsCount: 234, status: 'PUBLISHED', virtualTourUrl: '' },
    { id: 'l2', buildingId: 'b2', titleUz: 'B-501 · 120 m² ofis', titleRu: 'B-501 · 120 м² офис', offerType: 'RENT', price: 35000000, currency: 'UZS', photos: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80'], viewsCount: 189, status: 'PUBLISHED', virtualTourUrl: '' },
    { id: 'l3', buildingId: 'b3', titleUz: 'C-201 · 65 m² savdo', titleRu: 'C-201 · 65 м² торговое', offerType: 'RENT', price: 18000000, currency: 'UZS', photos: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80'], viewsCount: 312, status: 'PUBLISHED', virtualTourUrl: '' },
    { id: 'l4', buildingId: 'b4', titleUz: 'D-102 · 200 m² ombor', titleRu: 'D-102 · 200 м² склад', offerType: 'RENT', price: 12000000, currency: 'UZS', photos: ['https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80'], viewsCount: 145, status: 'PUBLISHED', virtualTourUrl: '' },
  ],
})

const search = ref('')
const typeFilter = ref('')
const offerFilter = ref('')
const sortBy = ref('name')
const view = ref<'grid' | 'list'>('grid')

const types = computed(() => {
  if (!data.value) return []
  return [...new Set(data.value.buildings.map(b => b.type))]
})

const filteredBuildings = computed(() => {
  if (!data.value) return []
  let result = [...data.value.buildings]
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(b => b.name.toLowerCase().includes(q) || b.address?.toLowerCase().includes(q) || b.district?.toLowerCase().includes(q))
  }
  if (typeFilter.value) result = result.filter(b => b.type === typeFilter.value)
  if (sortBy.value === 'name') result.sort((a, b) => a.name.localeCompare(b.name))
  else if (sortBy.value === 'vacant') result.sort((a, b) => (b.vacantUnits || 0) - (a.vacantUnits || 0))
  else if (sortBy.value === 'area') result.sort((a, b) => (b.totalArea || 0) - (a.totalArea || 0))
  return result
})

const filteredListings = computed(() => {
  if (!data.value) return []
  let result = [...data.value.listings]
  if (offerFilter.value) result = result.filter(l => l.offerType === offerFilter.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(l => l.titleUz?.toLowerCase().includes(q) || l.descriptionUz?.toLowerCase().includes(q))
  }
  return result
})

function resetFilters() {
  search.value = ''
  typeFilter.value = ''
  offerFilter.value = ''
}

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
