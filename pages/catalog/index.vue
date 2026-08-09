<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Nav -->
    <nav class="h-16 bg-white border-b border-neutral-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" /></svg>
        </div>
        <span class="text-lg font-bold font-display">MAKON</span>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="text-sm text-neutral-500 hover:text-neutral-900 hidden md:block">Bosh sahifa</NuxtLink>
        <NuxtLink to="/login" class="btn-primary btn-sm">Kirish</NuxtLink>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
      <!-- Header -->
      <div class="text-center py-6">
        <h1 class="text-3xl md:text-4xl font-bold font-display text-neutral-900">Kochmulk katalogi</h1>
        <p class="text-neutral-500 mt-2">Mavjud binolar va ijara/sotuv takliflari</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-col md:flex-row gap-3">
        <div class="flex-1">
          <SearchInput v-model="search" placeholder="Sarlavha bo'yicha qidirish..." />
        </div>
        <div class="flex gap-2">
          <button v-for="t in typeFilters" :key="t.key" :class="['btn btn-sm', activeType === t.key ? 'bg-primary-600 text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50']" @click="activeType = t.key">{{ t.label }}</button>
        </div>
      </div>

      <!-- Results count -->
      <p class="text-sm text-neutral-500">{{ filtered.length }} ta taklif</p>

      <!-- Grid -->
      <div v-if="filtered.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink v-for="l in filtered" :key="l.id" :to="`/catalog/${l.id}`" class="card overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group block">
          <div class="h-44 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center relative">
            <svg class="w-10 h-10 text-primary-300 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="absolute top-3 right-3 badge" :class="l.offerType === 'RENT' ? 'badge-info' : 'badge-success'">{{ l.offerType === 'RENT' ? 'Ijara' : 'Sotuv' }}</span>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{{ l.titleUz }}</h3>
            <p class="text-sm text-neutral-500 mt-1 line-clamp-2">{{ l.descriptionUz }}</p>
            <div class="flex items-center justify-between mt-3">
              <div>
                <p class="text-xl font-bold font-display text-primary-600">{{ formatNumber(l.price) }}</p>
                <p class="text-xs text-neutral-400">so'm{{ l.offerType === 'RENT' ? ' / oy' : '' }}</p>
              </div>
              <span class="btn-secondary btn-sm">Ko'rish</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <EmptyState v-else title="Taklif topilmadi" description="Boshqa so'z bilan qidirib ko'ring yoki filtrni o'zgartiring" icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />

      <!-- Back link -->
      <div class="text-center py-6">
        <NuxtLink to="/" class="text-sm text-neutral-500 hover:text-neutral-900 inline-flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          Bosh sahifaga qaytish
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBuildingStore } from '~/stores/building'
import { formatNumber } from '~/utils'
import SearchInput from '~/components/ui/SearchInput.vue'
import EmptyState from '~/components/ui/EmptyState.vue'

definePageMeta({ layout: 'public' })
const buildingStore = useBuildingStore()
onMounted(() => buildingStore.initMockData())

const search = ref('')
const activeType = ref('ALL')
const typeFilters = [
  { key: 'ALL', label: 'Hammasi' },
  { key: 'RENT', label: 'Ijara' },
  { key: 'SALE', label: 'Sotuv' },
]

const filtered = computed(() => {
  let result = buildingStore.publishedListings
  if (activeType.value !== 'ALL') result = result.filter(l => l.offerType === activeType.value)
  if (search.value) result = result.filter(l => l.titleUz?.toLowerCase().includes(search.value.toLowerCase()))
  return result
})
</script>
