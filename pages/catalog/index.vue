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

const { fetchCatalog } = useApi()
const { data, pending, error } = await useAsyncData('catalog', () => fetchCatalog())

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
