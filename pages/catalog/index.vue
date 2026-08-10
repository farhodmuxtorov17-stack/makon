<template>
  <div class="min-h-screen bg-ink-50">
    <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-ink-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <NuxtLink to="/" class="flex items-center gap-2">
              <div class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
                <Building2 :size="20" class="text-white" />
              </div>
              <span class="text-lg font-bold tracking-tight">MAKON</span>
            </NuxtLink>
            <span class="text-ink-300">/</span>
            <span class="text-ink-500 text-sm font-medium">Katalog</span>
          </div>
          <div class="flex items-center gap-3">
            <NuxtLink to="/login" class="text-sm font-medium text-ink-600 hover:text-ink-900">Kirish</NuxtLink>
            <NuxtLink to="/login" class="btn-primary text-sm px-4 py-2 rounded-lg">Boshqaruv paneli</NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <div class="bg-white border-b border-ink-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex items-center gap-2 text-sm font-medium text-ink-700"><SlidersHorizontal :size="16" /> Filtr:</div>
          <button v-for="f in filterTabs" :key="f.id" @click="activeFilter = f.id"
            class="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all"
            :class="activeFilter === f.id ? 'bg-brand-600 text-white' : 'bg-ink-50 text-ink-600 hover:bg-ink-100'">
            {{ f.label }} <span class="ml-1 opacity-60">{{ f.count }}</span>
          </button>
        </div>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold tracking-tight">Kommersiya ob'ektlari</h1>
        <div class="flex items-center gap-2 text-sm text-ink-500"><LayoutGrid :size="16" /> {{ filteredItems.length }} ta ob'ekt</div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink v-for="item in filteredItems" :key="item.id" :to="`/catalog/${item.id}`"
          class="group bg-white rounded-2xl border border-ink-100 overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all duration-300">
          <div class="relative aspect-[4/3] overflow-hidden bg-ink-100">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-3 left-3 flex gap-2">
              <span class="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur text-xs font-semibold text-brand-700">{{ item.type }}</span>
              <span v-if="item.isNew" class="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-xs font-semibold">Yangi</span>
            </div>
            <div class="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center">
              <Heart :size="16" class="text-ink-400" />
            </div>
          </div>
          <div class="p-5">
            <h3 class="font-semibold text-ink-900 group-hover:text-brand-700 transition-colors mb-1">{{ item.name }}</h3>
            <div class="flex items-center gap-1.5 text-sm text-ink-400 mb-3"><MapPin :size="14" /> {{ item.district }}</div>
            <div class="flex items-center gap-4 text-sm text-ink-500 mb-4">
              <span class="flex items-center gap-1"><Square :size="14" /> {{ item.area }} m²</span>
              <span class="flex items-center gap-1"><Building2 :size="14" /> {{ item.floor }}</span>
            </div>
            <div class="flex items-end justify-between pt-3 border-t border-ink-50">
              <div><div class="text-xs text-ink-400">Narxi</div><div class="text-lg font-bold text-ink-900">{{ item.price }}</div></div>
              <div class="text-sm text-ink-400">{{ item.pricePerM2 }}/m²</div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="mt-12 text-center py-12 bg-white rounded-2xl border border-ink-100">
        <h2 class="text-xl font-bold mb-2">O'z ob'ektingizni joylashtirmoqchimisiz?</h2>
        <p class="text-ink-500 mb-6">MAKON platformasida minglab potensial mijozlarga yeting</p>
        <NuxtLink to="/login" class="btn-primary inline-block px-6 py-3 rounded-xl font-medium">E'lon joylash</NuxtLink>
      </div>
    </main>

    <footer class="border-t border-ink-100 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-ink-400">
        © 2026 MAKON · Ko'chmas mulk boshqaruv platformasi
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Building2, Heart, MapPin, Square, SlidersHorizontal, LayoutGrid } from 'lucide-vue-next'

definePageMeta({ layout: 'public' })

const activeFilter = ref('all')

const filterTabs = [
  { id: 'all', label: 'Hammasi', count: 9 },
  { id: 'office', label: 'Ofislar', count: 5 },
  { id: 'retail', label: 'Savdo maydoni', count: 2 },
  { id: 'warehouse', label: 'Ombor', count: 2 },
]

const items = [
  { id: 'trillant-3', name: 'Trillant Tower · Ofis 301', district: 'Tashkent City', area: 120, floor: '3/12', price: '1,500,000 so\'m/oy', pricePerM2: '12,500', type: 'Ofis', isNew: true, image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { id: 'tashkent-city-5', name: 'Tashkent City · Savdo', district: 'Yashnobod', area: 85, floor: '1/8', price: '980,000 so\'m/oy', pricePerM2: '11,500', type: 'Savdo', isNew: false, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { id: 'it-park-2', name: 'IT Park · Coworking', district: 'Mirzo Ulug\'bek', area: 45, floor: '4/6', price: '650,000 so\'m/oy', pricePerM2: '14,400', type: 'Ofis', isNew: true, image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80' },
  { id: 'nest-one-7', name: 'Nest One · Ombor', district: 'Sergeli', area: 300, floor: '1/1', price: '2,200,000 so\'m/oy', pricePerM2: '7,300', type: 'Ombor', isNew: false, image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800&q=80' },
  { id: 'piramit-4', name: 'Piramit · Ofis 405', district: 'Yakkasaroy', area: 65, floor: '4/16', price: '720,000 so\'m/oy', pricePerM2: '11,000', type: 'Ofis', isNew: false, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  { id: 'city-night-2', name: 'Tashkent City · Loft', district: 'Yashnobod', area: 110, floor: '7/18', price: '1,300,000 so\'m/oy', pricePerM2: '11,800', type: 'Ofis', isNew: true, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { id: 'aerial-1', name: 'Business Center · Savdo', district: 'Chilonzor', area: 50, floor: '2/5', price: '550,000 so\'m/oy', pricePerM2: '11,000', type: 'Savdo', isNew: false, image: 'https://images.unsplash.com/photo-1505739679850-780fc6c9cb1c?w=800&q=80' },
  { id: 'nest-one-3', name: 'Nest One · Ofis 204', district: 'Sergeli', area: 78, floor: '2/9', price: '890,000 so\'m/oy', pricePerM2: '11,400', type: 'Ofis', isNew: false, image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800&q=80' },
  { id: 'business-5', name: 'Business Center · Ombor', district: 'Yunusobod', area: 250, floor: '1/1', price: '1,850,000 so\'m/oy', pricePerM2: '7,400', type: 'Ombor', isNew: true, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
]

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return items
  const map: Record<string, string> = { office: 'Ofis', retail: 'Savdo', warehouse: 'Ombor' }
  return items.filter(i => i.type === map[activeFilter.value])
})
</script>
