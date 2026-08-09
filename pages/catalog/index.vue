<template>
  <div class="min-h-screen bg-ink-50">
    <!-- Nav -->
    <nav class="h-16 bg-white/80 backdrop-blur-xl border-b border-ink-200/60 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-md shadow-brand-600/20">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" /></svg>
        </div>
        <div>
          <span class="text-lg font-bold font-display text-ink-900 tracking-tight">MAKON</span>
          <p class="text-[10px] text-ink-400 font-medium tracking-widest uppercase">Real Estate</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="text-sm text-ink-400 hover:text-ink-900 hidden md:block transition-colors">Bosh sahifa</NuxtLink>
        <NuxtLink to="/login" class="btn-primary-glow btn-sm">Kirish</NuxtLink>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
      <!-- Header -->
      <div class="text-center py-8">
        <h1 class="text-3xl md:text-4xl font-bold font-display text-ink-900 tracking-tight">Kochmulk katalogi</h1>
        <p class="text-ink-400 mt-2">Mavjud binolar va ijara/sotuv takliflari</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-col md:flex-row gap-3">
        <div class="flex-1"><SearchInput v-model="search" placeholder="Sarlavha bo'yicha qidirish..." /></div>
        <div class="flex gap-2">
          <button v-for="t in typeFilters" :key="t.key"
            :class="['btn btn-sm transition-all', activeType === t.key ? 'bg-brand-600 text-white shadow-sm' : 'bg-white border border-ink-200 text-ink-600 hover:bg-ink-50']"
            @click="activeType = t.key">{{ t.label }}</button>
        </div>
      </div>

      <p class="text-sm text-ink-400">{{ filtered.length }} ta taklif</p>

      <!-- Grid -->
      <div v-if="filtered.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <NuxtLink v-for="(l, i) in filtered" :key="l.id" :to="`/catalog/${l.id}`"
          class="card-hover overflow-hidden cursor-pointer group block animate-fade-in-up"
          :style="{ animationDelay: (i * 50) + 'ms' }"
        >
          <!-- 3D Building visual -->
          <div class="relative h-44 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-gold-50" />
            <div class="absolute inset-0 bg-grid-pattern opacity-20" />
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-brand-200/20 blur-2xl" />
            <div class="relative w-28 h-28 group-hover:scale-110 transition-transform duration-300">
              <Building3DIcon type="complex" :color="listingColor(i)" :size="120" />
            </div>
            <span class="absolute top-3 right-3" :class="l.offerType === 'RENT' ? 'badge-info' : 'badge-success'">
              {{ l.offerType === 'RENT' ? 'Ijara' : 'Sotuv' }}
            </span>
          </div>
          <div class="p-5">
            <h3 class="font-semibold text-ink-900 group-hover:text-brand-600 transition-colors">{{ l.titleUz }}</h3>
            <p class="text-sm text-ink-400 mt-1 line-clamp-2">{{ l.descriptionUz }}</p>
            <div class="flex items-center justify-between mt-4">
              <div>
                <p class="text-xl font-bold font-display text-brand-600">{{ formatNumber(l.price) }}</p>
                <p class="text-xs text-ink-400">so'm{{ l.offerType === 'RENT' ? ' / oy' : '' }}</p>
              </div>
              <span class="btn-outline btn-sm group-hover:bg-brand-50 group-hover:border-brand-200 group-hover:text-brand-600 transition-all">
                Ko'rish
                <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <EmptyState v-else title="Taklif topilmadi" description="Boshqa so'z bilan qidirib ko'ring" icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />

      <div class="text-center py-6">
        <NuxtLink to="/" class="text-sm text-ink-400 hover:text-ink-600 inline-flex items-center gap-1.5 group transition-colors">
          <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
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
import Building3DIcon from '~/components/Building3DIcon.vue'

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

const listingColors = ['#6356f7', '#10b981', '#f99007', '#0ea5e9', '#f43f5e']
function listingColor(i: number) { return listingColors[i % listingColors.length] }

const filtered = computed(() => {
  let result = buildingStore.publishedListings
  if (activeType.value !== 'ALL') result = result.filter(l => l.offerType === activeType.value)
  if (search.value) result = result.filter(l => l.titleUz?.toLowerCase().includes(search.value.toLowerCase()))
  return result
})
</script>
