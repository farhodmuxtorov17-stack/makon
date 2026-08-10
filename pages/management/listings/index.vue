<template>
  <div class="space-y-6">
    <PageHeader title="Listinglar" subtitle="E'lon qilingan ob'ektlar">
      <template #actions>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Yangi listing</button>
      </template>
    </PageHeader>

    <div class="flex gap-2 flex-wrap">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
        :class="activeTab === tab.id ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'">
        {{ tab.label }} <span class="ml-1.5 text-xs opacity-60">{{ tab.count }}</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="l in filteredListings" :key="l.id" class="card-hover overflow-hidden group cursor-pointer">
        <div class="aspect-[16/10] overflow-hidden bg-ink-100 relative">
          <img :src="l.image" :alt="l.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="badge" :class="l.status === 'PUBLISHED' ? 'badge-success' : l.status === 'PAUSED' ? 'badge-warning' : 'badge-neutral'">
              {{ l.status === 'PUBLISHED' ? 'Aktiv' : l.status === 'PAUSED' ? 'To\'xtatilgan' : 'Arxiv' }}
            </span>
            <span class="badge badge-neutral">{{ l.offerType === 'RENT' ? 'Ijara' : l.offerType === 'SALE' ? 'Sotuv' : 'Ijara/Sotuv' }}</span>
          </div>
          <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur rounded-lg px-3 py-1.5">
            <span class="text-sm font-bold">{{ formatPrice(l.price) }} <span class="text-ink-400 text-xs font-normal">{{ l.offerType === 'RENT' ? '/oy' : '' }}</span></span>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-ink-900 group-hover:text-brand-600 transition-colors mb-1 truncate">{{ l.title }}</h3>
          <p class="text-sm text-ink-400 flex items-center gap-1.5 mb-3"><MapPin :size="14" /> {{ l.location }}</p>
          <div class="flex items-center gap-3 text-sm text-ink-500">
            <span class="flex items-center gap-1"><Eye :size="14" /> {{ l.views }}</span>
            <span class="flex items-center gap-1"><Square :size="14" /> {{ l.area }} m²</span>
            <span class="ml-auto flex items-center gap-1"><Building2 :size="14" /> {{ l.floor }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, MapPin, Eye, Square, Building2 } from 'lucide-vue-next'
import type { ListingStatus } from '~/types'

const activeTab = ref('all')

const listings = [
  { id: 'l1', title: 'Trilliant Tower — Ofis 301', location: 'Yunusobod, Toshkent', price: 1500000, area: 120, floor: '3/14', status: 'PUBLISHED' as ListingStatus, offerType: 'RENT', views: 342, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/65eba1a8b_generated_image.png' },
  { id: 'l2', title: 'Tashkent City — Ofis 801', location: 'Yashnobod, Toshkent', price: 1850000, area: 85, floor: '8/18', status: 'PUBLISHED' as ListingStatus, offerType: 'RENT', views: 521, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/af7261266_generated_image.png' },
  { id: 'l3', title: 'IT Park — Coworking maydon', location: 'Mirzo Ulug\'bek, Toshkent', price: 650000, area: 45, floor: '2/6', status: 'PUBLISHED' as ListingStatus, offerType: 'RENT', views: 293, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/768655312_generated_image.png' },
  { id: 'l4', title: 'Piramit — Penthouse ofis', location: 'Yakkasaroy, Toshkent', price: 3500000, area: 250, floor: '30/37', status: 'PAUSED' as ListingStatus, offerType: 'SALE', views: 445, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/d889d0296_generated_image.png' },
  { id: 'l5', title: 'Crystal Plaza — Savdo maydoni', location: 'Chilonzor, Toshkent', price: 2200000, area: 150, floor: '1/8', status: 'ARCHIVED' as ListingStatus, offerType: 'SALE', views: 89, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/1908acd10_generated_image.png' },
  { id: 'l6', title: 'Nest One — Loft ofis 204', location: 'Sergeli, Toshkent', price: 980000, area: 78, floor: '2/9', status: 'PUBLISHED' as ListingStatus, offerType: 'RENT', views: 187, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/af7261266_generated_image.png-37526070297c?w=800&q=80' },
]

const tabs = computed(() => [
  { id: 'all', label: 'Hammasi', count: listings.length },
  { id: 'PUBLISHED', label: 'Aktiv', count: listings.filter(l => l.status === 'PUBLISHED').length },
  { id: 'PAUSED', label: 'To\'xtatilgan', count: listings.filter(l => l.status === 'PAUSED').length },
  { id: 'ARCHIVED', label: 'Arxiv', count: listings.filter(l => l.status === 'ARCHIVED').length },
])

const filteredListings = computed(() => {
  if (activeTab.value === 'all') return listings
  return listings.filter(l => l.status === activeTab.value)
})

function formatPrice(v: number) {
  if (v >= 1000000000) return (v / 1000000000).toFixed(1) + ' mlrd'
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  return v.toLocaleString('ru')
}
</script>
