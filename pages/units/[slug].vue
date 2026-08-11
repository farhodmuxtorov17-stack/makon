<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-sm text-ink-500">
      <NuxtLink to="/catalog" class="hover:text-brand-500">Katalog</NuxtLink>
      <ChevronRight :size="14" />
      <NuxtLink :to="`/buildings/${building.slug}`" class="hover:text-brand-500">{{ building.name }}</NuxtLink>
      <ChevronRight :size="14" />
      <span class="text-ink-900 dark:text-white">{{ unit.name }}</span>
    </div>

    <!-- Unit header -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: photos -->
      <div class="lg:col-span-2 space-y-4">
        <div class="card overflow-hidden">
          <div class="h-80 bg-gradient-to-br from-brand-500/5 to-brand-700/10 relative flex items-center justify-center">
            <svg viewBox="0 0 400 200" class="w-full h-full p-8">
              <polygon :points="unit.planPoints" fill="rgba(99,102,241,0.08)" stroke="#6366f1" stroke-width="2" />
              <text :x="200" :y="100" text-anchor="middle" class="text-lg fill-current text-brand-500 font-bold">{{ unit.name }}</text>
              <text :x="200" :y="120" text-anchor="middle" class="text-xs fill-current text-ink-500">{{ unit.area }} m²</text>
            </svg>
          </div>
        </div>

        <!-- Features -->
        <div class="card p-6">
          <h3 class="font-semibold dark:text-white mb-4">Unit xususiyatlari</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="f in unit.features" :key="f.label" class="flex items-center gap-2">
              <component :is="f.icon" :size="16" class="text-brand-500" />
              <div>
                <div class="text-xs text-ink-500">{{ f.label }}</div>
                <div class="text-sm font-medium">{{ f.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: price & actions -->
      <div class="space-y-4">
        <div class="card p-6 sticky top-20">
          <div class="mb-4">
            <div class="text-2xl font-bold">{{ formatUZS(unit.price) }}</div>
            <div class="text-sm text-ink-500">{{ unit.pricePerM2 }} so\'m/m² oyiga</div>
          </div>

          <div class="space-y-3 mb-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-ink-500">Taklif turi</span>
              <span class="badge badge-brand">{{ unit.offerType === 'RENT' ? 'Ijara' : 'Sotuv' }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-ink-500">Bino</span>
              <span class="font-medium">{{ building.name }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-ink-500">Qavat</span>
              <span class="font-medium">{{ unit.floor }}-qavat</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-ink-500">Maydon</span>
              <span class="font-medium">{{ unit.area }} m²</span>
            </div>
          </div>

          <div class="space-y-2">
            <button @click="viewDetails" class="btn btn-secondary w-full">
              <Eye :size="16" /> Ko\'rish
            </button>
            <button @click="makeOffer" class="btn btn-primary w-full">
              <FileText :size="16" /> Taklif qilish
            </button>
          </div>

          <div class="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
            <div class="text-xs text-ink-500 mb-2">Bu unit bilan bog\'liq</div>
            <NuxtLink :to="`/buildings/${building.slug}`" class="block text-sm text-brand-500 hover:underline mb-1">Bino sahifasi</NuxtLink>
            <NuxtLink to="/catalog" class="block text-sm text-brand-500 hover:underline">Katalogga qaytish</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, Eye, FileText, Maximize, Building2, Layers, Wind, Wifi, Car, Coffee } from 'lucide-vue-next'

definePageMeta({ layout: 'public' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const route = useRoute()

const building = { slug: 'tashkent-city', name: 'Tashkent City' }
const unit = {
  name: 'A-301',
  area: 85,
  floor: 3,
  price: 25000000,
  pricePerM2: 294118,
  offerType: 'RENT',
  planPoints: '50,30 350,30 350,170 150,170 150,100 50,100',
  features: [
    { label: 'Maydon', value: '85 m²', icon: Maximize },
    { label: 'Qavat', value: '3', icon: Layers },
    { label: 'Konditsioner', value: 'Bor', icon: Wind },
    { label: 'Internet', value: 'Fiber', icon: Wifi },
    { label: 'Parkovka', value: '2 joy', icon: Car },
    { label: 'Panjara', value: 'Bor', icon: Coffee },
  ]
}

function viewDetails() {
  alert('Unit to\'liq tafsilotlari: ' + unit.name)
}

function makeOffer() {
  navigateTo('/register/eri?redirect=/applications/new')
}


</script>
