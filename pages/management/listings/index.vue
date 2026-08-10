<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Listinglar</h1>
        <p class="text-ink-500 text-sm mt-0.5">E'lon qilingan ob'ektlar</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" />
        Yangi listing
      </button>
    </div>

    <div class="flex gap-2 flex-wrap mb-2">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
        :class="activeTab === tab.id ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'">
        {{ tab.label }}
        <span class="ml-1.5 text-xs opacity-60">{{ tab.count }}</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="listing in filteredListings" :key="listing.id" class="card-hover overflow-hidden">
        <div class="aspect-[16/10] overflow-hidden bg-ink-100 relative">
          <img :src="listing.image" :alt="listing.title" class="w-full h-full object-cover" />
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="badge" :class="listing.status === 'PUBLISHED' ? 'badge-success' : 'badge-neutral'">
              {{ listing.status === 'PUBLISHED' ? 'Aktiv' : listing.status === 'PAUSED' ? 'To\'xtatilgan' : 'Arxiv' }}
            </span>
            <span class="badge badge-neutral">{{ listing.offerType === 'RENT' ? 'Ijara' : listing.offerType === 'SALE' ? 'Sotuv' : 'Ijara/Sotuv' }}</span>
          </div>
          <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur rounded-lg px-2.5 py-1">
            <span class="text-sm font-bold">{{ formatPrice(listing.price) }}</span>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-ink-900 mb-1 truncate">{{ listing.title }}</h3>
          <p class="text-sm text-ink-400 flex items-center gap-1.5">
            <MapPin :size="14" /> {{ listing.location }}
          </p>
          <div class="flex items-center gap-3 mt-3 text-sm text-ink-500">
            <span class="flex items-center gap-1"><Eye :size="14" /> {{ listing.views }} ko'rishlar</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, MapPin, Eye } from 'lucide-vue-next'
import type { ListingStatus } from '~/types'

const activeTab = ref('all')

const listings = [
  { id: 'l1', title: 'Trillant Tower — A blok, 3-qavat', location: 'Tashkent City', price: 12000000, status: 'PUBLISHED' as ListingStatus, offerType: 'RENT', views: 342, image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { id: 'l2', title: 'Tashkent City Complex — Ofis 801', location: 'Yashnobod', price: 18500000, status: 'PUBLISHED' as ListingStatus, offerType: 'RENT', views: 521, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { id: 'l3', title: 'Nest One — Loft ofis', location: 'Sergeli', price: 9800000, status: 'PAUSED' as ListingStatus, offerType: 'RENT', views: 187, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { id: 'l4', title: 'IT Park — Coworking maydon', location: 'Mirzo Ulug\'bek', price: 4500000, status: 'PUBLISHED' as ListingStatus, offerType: 'RENT', views: 293, image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80' },
  { id: 'l5', title: 'Crystal Plaza — Savdo maydoni', location: 'Chilonzor', price: 22000000, status: 'ARCHIVED' as ListingStatus, offerType: 'SALE', views: 89, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  { id: 'l6', title: 'Piramit — Penthouse ofis', location: 'Yakkasaroy', price: 35000000, status: 'PUBLISHED' as ListingStatus, offerType: 'SALE', views: 445, image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800&q=80' },
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
  if (v >= 1000000) return (v / 1000000).toFixed(0) + ' mln'
  return v.toLocaleString('ru')
}
</script>
