<template>
  <div class="min-h-screen bg-ink-950">
    <!-- Hero -->
    <div class="relative h-[420px] overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80');" />
      <div class="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950" />
      <div class="absolute inset-0 bg-grid opacity-30" />

      <div class="relative h-full max-w-6xl mx-auto px-4 lg:px-6 flex flex-col justify-center">
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full glass w-fit mb-6">
          <MapPin :size="14" class="text-brand-400" />
          <span class="text-xs text-ink-300">Toshkent shahri · O'zbekiston</span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight max-w-2xl">
          Bo'sh maydonlarni
          <span class="text-gradient">toping</span>
        </h1>
        <p class="text-ink-400 text-lg mb-8 max-w-xl">
          Tashkent City, Trillant Tower, IT Park va boshqa premium binolarda ofis, savdo va ombor maydonlari
        </p>

        <!-- Search bar -->
        <div class="flex flex-col sm:flex-row gap-3 max-w-2xl">
          <div class="relative flex-1">
            <Search :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              v-model="searchQuery"
              type="text"
              class="input pl-12 py-3 text-base"
              placeholder="Bino nomi, tuman, maydon..."
              @keyup.enter="applySearch"
            />
          </div>
          <button class="btn btn-primary btn-lg" @click="applySearch">
            Qidirish
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-6xl mx-auto px-4 lg:px-6 py-8">
      <!-- Filters -->
      <div class="card p-4 mb-6">
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex gap-1 p-1 rounded-xl bg-white/5">
            <button
              v-for="t in typeFilters"
              :key="t.id"
              @click="filterType = t.id; updateUrl()"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              :class="filterType === t.id ? 'bg-white text-ink-900' : 'text-ink-400 hover:text-white'"
            >
              {{ t.label }}
            </button>
          </div>

          <select v-model="filterDistrict" class="input w-auto" @change="updateUrl">
            <option value="">Barcha tumanlar</option>
            <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
          </select>

          <select v-model="filterOffer" class="input w-auto" @change="updateUrl">
            <option value="">Hammasi</option>
            <option value="RENT">Ijara</option>
            <option value="SALE">Sotuv</option>
          </select>

          <select v-model="sortBy" class="input w-auto" @change="updateUrl">
            <option value="newest">Eng yangi</option>
            <option value="price-asc">Narx: arzon</option>
            <option value="price-desc">Narx: qimmat</option>
            <option value="views">Eng ko'p ko'rilgan</option>
          </select>

          <div class="flex gap-1 p-1 rounded-xl bg-white/5 ml-auto">
            <button @click="viewMode = 'grid'" class="p-1.5 rounded-lg transition-all" :class="viewMode === 'grid' ? 'bg-white text-ink-900' : 'text-ink-400'">
              <LayoutGrid :size="16" />
            </button>
            <button @click="viewMode = 'list'" class="p-1.5 rounded-lg transition-all" :class="viewMode === 'list' ? 'bg-white text-ink-900' : 'text-ink-400'">
              <List :size="16" />
            </button>
          </div>
        </div>
      </div>

      <!-- Results count -->
      <div class="flex items-center justify-between mb-5">
        <p class="text-sm text-ink-400">
          <span class="text-white font-semibold">{{ filteredListings.length }}</span> ta taklif topildi
        </p>
      </div>

      <!-- Grid view -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <NuxtLink
          v-for="listing in filteredListings"
          :key="listing.id"
          :to="`/catalog/${listing.id}`"
          class="card overflow-hidden card-hover group"
        >
          <div class="relative h-56 overflow-hidden">
            <img :src="listing.photos[0]" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute top-3 left-3">
              <span class="badge" :class="listing.offerType === 'RENT' ? 'badge-brand' : 'badge-success'">
                {{ listing.offerType === 'RENT' ? 'Ijara' : 'Sotuv' }}
              </span>
            </div>
            <div class="absolute top-3 right-3 glass rounded-lg px-2.5 py-1 flex items-center gap-1.5">
              <Eye :size="12" class="text-ink-300" />
              <span class="text-xs text-white">{{ listing.viewsCount }}</span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ink-950 to-transparent" />
          </div>
          <div class="p-5">
            <div class="text-xs text-ink-500 mb-1">{{ getBuildingName(listing.buildingId) }}</div>
            <h3 class="text-white font-semibold mb-3 line-clamp-1">{{ listing.titleUz }}</h3>
            <p class="text-sm text-ink-400 line-clamp-2 mb-4">{{ listing.descriptionUz }}</p>
            <div class="flex items-end justify-between">
              <div>
                <div class="text-2xl font-bold text-white">{{ formatPriceShort(listing.price) }}</div>
                <div class="text-xs text-ink-500">{{ listing.offerType === 'RENT' ? 'oyiga' : '' }}</div>
              </div>
              <div class="flex items-center gap-1 text-brand-400 text-sm group-hover:gap-2 transition-all">
                Ko'rish <ArrowRight :size="14" />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- List view -->
      <div v-else class="space-y-3">
        <NuxtLink
          v-for="listing in filteredListings"
          :key="listing.id"
          :to="`/catalog/${listing.id}`"
          class="card p-4 card-hover group flex gap-4"
        >
          <div class="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img :src="listing.photos[0]" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="badge" :class="listing.offerType === 'RENT' ? 'badge-brand' : 'badge-success'">
                {{ listing.offerType === 'RENT' ? 'Ijara' : 'Sotuv' }}
              </span>
              <span class="text-xs text-ink-500">{{ getBuildingName(listing.buildingId) }}</span>
            </div>
            <h3 class="text-white font-medium mb-1 line-clamp-1">{{ listing.titleUz }}</h3>
            <p class="text-sm text-ink-400 line-clamp-1">{{ listing.descriptionUz }}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <div class="text-xl font-bold text-white">{{ formatPriceShort(listing.price) }}</div>
            <div class="flex items-center gap-1 text-xs text-ink-500 justify-end mt-1">
              <Eye :size="12" /> {{ listing.viewsCount }}
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty -->
      <div v-if="filteredListings.length === 0" class="card p-12 text-center">
        <SearchX :size="40" class="text-ink-600 mx-auto mb-4" />
        <h3 class="text-white font-semibold mb-1">Hech narsa topilmadi</h3>
        <p class="text-ink-500 text-sm">Filtrlarni o'zgartirib qaytadan urinib ko'ring</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, MapPin, ArrowRight, Eye, LayoutGrid, List, SearchX } from 'lucide-vue-next'
import { listings, buildings } from '~/utils/mockData'
import type { ListingStatus } from '~/types'

const route = useRoute()
const router = useRouter()
const { formatPriceShort } = useFormat()

const searchQuery = ref((route.query.q as string) || '')
const filterType = ref((route.query.type as string) || '')
const filterDistrict = ref((route.query.district as string) || '')
const filterOffer = ref((route.query.offer as string) || '')
const sortBy = ref((route.query.sort as string) || 'newest')
const viewMode = ref<'grid' | 'list'>('grid')

const typeFilters = [
  { id: '', label: 'Hammasi' },
  { id: 'BUSINESS_CENTER', label: 'Biznes markaz' },
  { id: 'OFFICE', label: 'Ofis' },
  { id: 'SHOPPING', label: 'Savdo' },
  { id: 'WAREHOUSE', label: 'Ombor' },
]

const districts = ['Mirzo Ulug\'bek', 'Shayxontohur', 'Yunusobod', 'Mirobod', 'Yakkasaroy']

function getBuildingName(id: string) {
  return buildings.find(b => b.id === id)?.name || ''
}

const filteredListings = computed(() => {
  let result = [...listings].filter(l => l.status === 'PUBLISHED')

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(l =>
      l.titleUz.toLowerCase().includes(q) ||
      l.descriptionUz.toLowerCase().includes(q) ||
      getBuildingName(l.buildingId).toLowerCase().includes(q)
    )
  }

  if (filterType.value) {
    result = result.filter(l => {
      const b = buildings.find(b => b.id === l.buildingId)
      return b?.type === filterType.value
    })
  }

  if (filterDistrict.value) {
    result = result.filter(l => {
      const b = buildings.find(b => b.id === l.buildingId)
      return b?.district === filterDistrict.value
    })
  }

  if (filterOffer.value) {
    result = result.filter(l => l.offerType === filterOffer.value)
  }

  switch (sortBy.value) {
    case 'price-asc': result.sort((a, b) => a.price - b.price); break
    case 'price-desc': result.sort((a, b) => b.price - a.price); break
    case 'views': result.sort((a, b) => b.viewsCount - a.viewsCount); break
    default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return result
})

function applySearch() {
  updateUrl()
}

function updateUrl() {
  router.replace({
    query: {
      q: searchQuery.value || undefined,
      type: filterType.value || undefined,
      district: filterDistrict.value || undefined,
      offer: filterOffer.value || undefined,
      sort: sortBy.value || undefined,
    }
  })
}
</script>
