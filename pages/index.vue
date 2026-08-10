<template>
  <div class="min-h-screen bg-white text-slate-900">
    <!-- Top nav -->
    <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span class="text-white text-sm font-bold">M</span>
          </div>
          <span class="font-bold text-lg tracking-tight">MAKON</span>
          <span class="text-slate-300 text-sm font-normal hidden sm:inline">| Koʻchmulk katalogi</span>
        </div>
        <div class="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#" class="text-slate-900">Katalog</a>
          <a href="#" class="hover:text-slate-900 transition-colors">Xizmatlar</a>
          <a href="#" class="hover:text-slate-900 transition-colors">Tizim haqida</a>
          <a href="#" class="hover:text-slate-900 transition-colors">Hamkorlar</a>
          <a href="#" class="hover:text-slate-900 transition-colors">Blog</a>
        </div>
        <div class="flex items-center gap-3">
          <button class="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
            <span>♡</span> Sevimlilar
          </button>
          <NuxtLink to="/login" class="text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all">Kirish</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Search hero -->
    <section class="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <!-- Tabs -->
        <div class="flex gap-1 mb-4">
          <button v-for="t in dealTabs" :key="t.id" @click="activeDeal = t.id"
            class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            :class="activeDeal === t.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'">
            {{ t.label }}
            <span class="ml-1.5 text-xs opacity-60">{{ t.count }}</span>
          </button>
        </div>

        <!-- Search row -->
        <div class="flex flex-col lg:flex-row gap-3">
          <div class="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-slate-200 shadow-sm">
            <span class="text-lg">📍</span>
            <input type="text" placeholder="Manzil, metro, tuman yoki kalit soʻz" class="bg-transparent outline-none text-sm w-full placeholder:text-slate-400" v-model="searchQuery" />
            <button v-if="searchQuery" @click="searchQuery = ''" class="text-slate-400 hover:text-slate-600 text-sm">✕</button>
          </div>

          <select class="text-sm text-slate-700 bg-white border border-slate-200 rounded-xl px-4 py-3.5 outline-none cursor-pointer shadow-sm hover:border-slate-300 transition-colors">
            <option>Har qanday turdagi mulk</option>
            <option>Kvartira</option>
            <option>Ofis</option>
            <option>Doʻkon</option>
            <option>Ombor</option>
            <option>Turar joy</option>
          </select>

          <select class="text-sm text-slate-700 bg-white border border-slate-200 rounded-xl px-4 py-3.5 outline-none cursor-pointer shadow-sm hover:border-slate-300 transition-colors">
            <option>Har qanday narx</option>
            <option>10 mln soʻmgacha</option>
            <option>10-30 mln soʻm</option>
            <option>30-50 mln soʻm</option>
            <option>50+ mln soʻm</option>
          </select>

          <button @click="showFilters = !showFilters" class="flex items-center gap-2 text-sm font-medium text-slate-600 px-5 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
            <span>⚙</span> Filter
            <span v-if="activeFiltersCount > 0" class="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">{{ activeFiltersCount }}</span>
          </button>

          <button class="flex items-center justify-center gap-2 text-sm font-semibold text-white px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all whitespace-nowrap">
            Qidirish
          </button>
        </div>

        <!-- Expanded filters -->
        <div v-if="showFilters" class="mt-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            <!-- Rooms -->
            <div>
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Xonalar</label>
              <div class="flex gap-2">
                <button v-for="r in roomOptions" :key="r" @click="toggleRoom(r)"
                  class="w-10 h-10 rounded-xl text-sm font-medium transition-all"
                  :class="selectedRooms.includes(r) ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'">
                  {{ r === '5+' ? '5+' : r }}
                </button>
              </div>
            </div>
            <!-- Price range -->
            <div class="md:col-span-2">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Narx oraligʻi (soʻm/oy)</label>
              <div class="flex items-center gap-3">
                <input type="text" placeholder="5 000 000" v-model="priceMin" class="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-sm outline-none border border-slate-100" />
                <span class="text-slate-300">—</span>
                <input type="text" placeholder="50 000 000" v-model="priceMax" class="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-sm outline-none border border-slate-100" />
              </div>
            </div>
            <!-- Area -->
            <div>
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Maydon (m²)</label>
              <div class="flex items-center gap-3">
                <input type="text" placeholder="30" class="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-sm outline-none border border-slate-100" />
                <span class="text-slate-300">—</span>
 <input type="text" placeholder="200" class="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-sm outline-none border border-slate-100" />
              </div>
            </div>
            <!-- Floor -->
            <div>
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Qavat</label>
              <div class="flex items-center gap-3">
                <input type="text" placeholder="1" class="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-sm outline-none border border-slate-100" />
                <span class="text-slate-300">—</span>
                <input type="text" placeholder="20" class="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-sm outline-none border border-slate-100" />
              </div>
            </div>
            <!-- Building type -->
            <div>
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Bino turi</label>
              <select class="w-full text-sm text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none cursor-pointer">
                <option>Har qanday</option>
                <option>Biznes-markaz</option>
                <option>Savdo-markaz</option>
                <option>Turar binolar</option>
                <option>Industrial</option>
              </select>
            </div>
            <!-- Renovation -->
            <div>
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Holati</label>
              <select class="w-full text-sm text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none cursor-pointer">
                <option>Har qanday</option>
                <option>Taʼmirlangan</option>
                <option>Taʼmirsiz</option>
                <option>Yangi bino</option>
              </select>
            </div>
            <!-- Amenities -->
            <div class="md:col-span-2">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Qulayliklar</label>
              <div class="flex flex-wrap gap-2">
                <button v-for="a in amenities" :key="a" @click="toggleAmenity(a)"
                  class="px-3 py-2 rounded-xl text-sm font-medium transition-all"
                  :class="selectedAmenities.includes(a) ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100'">
                  {{ a }}
                </button>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
            <button @click="resetFilters" class="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">Filterni tozalash</button>
            <button @click="showFilters = false" class="text-sm font-semibold text-white px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors">Koʻrsatish ({{ filteredCount }})</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Category pills -->
    <section class="border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto">
        <button v-for="c in categories" :key="c.title" @click="activeCategory = c.id"
          class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0"
          :class="activeCategory === c.id ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'">
          <span class="text-base">{{ c.icon }}</span> {{ c.title }}
        </button>
      </div>
    </section>

    <!-- Listings + sidebar -->
    <section class="max-w-7xl mx-auto px-6 py-6">
      <!-- Header row -->
      <div class="flex items-center justify-between mb-5">
        <div>
          <h1 class="text-xl font-bold tracking-tight">
            {{ activeDealLabel }} — {{ activeCategoryLabel }}
          </h1>
          <p class="text-sm text-slate-400 mt-0.5">{{ filteredCount }} eʼlon topildi · Toshkent</p>
        </div>
        <div class="flex items-center gap-3">
          <select v-model="sortBy" class="text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none cursor-pointer hover:border-slate-300 transition-colors">
            <option value="new">Eng yangilari</option>
            <option value="price-asc">Narxi: arzon → qimmat</option>
            <option value="price-desc">Narxi: qimmat → arzon</option>
            <option value="area-desc">Maydon: katta → kichik</option>
          </select>
          <div class="flex bg-slate-100 rounded-xl p-1">
            <button @click="viewMode = 'list'" class="px-3 py-2 rounded-lg text-sm font-medium transition-colors" :class="viewMode === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'">☰ Roʻyxat</button>
            <button @click="viewMode = 'map'" class="px-3 py-2 rounded-lg text-sm font-medium transition-colors" :class="viewMode === 'map' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'">📍 Xarita</button>
          </div>
        </div>
      </div>

      <!-- Map view -->
      <div v-if="viewMode === 'map'" class="rounded-2xl overflow-hidden border border-slate-200 h-[600px] relative bg-slate-50">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <div class="text-5xl mb-3">🗺️</div>
            <p class="text-slate-400 text-sm">Xarita koʻrinishi tez orada</p>
          </div>
        </div>
        <!-- Map pins -->
        <div v-for="(p, i) in mapPins" :key="i" class="absolute group cursor-pointer" :style="{ top: p.y + '%', left: p.x + '%' }">
          <div class="px-3 py-1.5 rounded-full bg-white shadow-lg border border-slate-200 text-xs font-bold text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-all whitespace-nowrap">
            {{ p.price }}
          </div>
        </div>
      </div>

      <!-- List view -->
      <div v-else>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <NuxtLink v-for="p in listings" :key="p.id" :to="`/catalog/${p.id}`" class="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200 hover:border-slate-300 transition-all">
            <!-- Photo -->
            <div class="relative h-52 overflow-hidden">
              <img :src="p.img" :alt="p.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute top-3 left-3 flex gap-2">
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full" :class="p.deal === 'Ijaraga' ? 'bg-blue-600 text-white' : 'bg-emerald-500 text-white'">{{ p.deal }}</span>
                <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 text-slate-700 backdrop-blur-sm">{{ p.type }}</span>
              </div>
              <button @click.prevent class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-base hover:bg-white transition-colors shadow-sm">♡</button>
              <div class="absolute bottom-3 right-3 text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">{{ p.photos }} foto</div>
            </div>
            <!-- Content -->
            <div class="p-4">
              <div class="flex items-baseline justify-between mb-2">
                <div class="font-bold text-lg text-slate-900">{{ p.priceText }}</div>
                <div class="text-xs text-slate-400">{{ p.pricePerM2 }}</div>
              </div>
              <h3 class="font-semibold text-sm mb-1 group-hover:text-blue-600 transition-colors">{{ p.title }}</h3>
              <p class="text-slate-400 text-xs mb-3 flex items-center gap-1">📍 {{ p.address }}</p>
              <div class="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-3">
                <span class="flex items-center gap-1">📐 {{ p.area }} m²</span>
                <span class="flex items-center gap-1">🏢 {{ p.floor }}/{{ p.totalFloor }}</span>
                <span class="flex items-center gap-1">{{ p.rooms }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Load more -->
        <div class="text-center mt-10">
          <button class="px-8 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            Yana koʻrsatish ({{ filteredCount - listings.length }} ta)
          </button>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="s in stats" :key="s.label" class="text-center bg-slate-50 rounded-2xl py-8">
          <div class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{{ s.value }}</div>
          <div class="text-slate-400 text-sm mt-1">{{ s.label }}</div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-6 pb-16">
      <div class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-center">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <h2 class="relative text-2xl md:text-3xl font-bold text-white mb-3">Obyektingizni joylashtiring</h2>
        <p class="relative text-blue-100 mb-8 max-w-md mx-auto">5 000+ foydalanuvchi koʻrishini xohlaysizmi?</p>
        <button class="relative inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors shadow-lg">Eʼlon joylashtish →</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-slate-100 py-12 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div class="col-span-2 md:col-span-1">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center"><span class="text-white text-xs font-bold">M</span></div>
              <span class="font-bold text-sm">MAKON</span>
            </div>
            <p class="text-slate-400 text-sm">Koʻchmulk katalogi va boshqaruvi</p>
            <p class="text-slate-400 text-sm mt-1">Toshkent, Oʻzbekiston</p>
          </div>
          <div>
            <p class="text-sm font-semibold mb-4">Katalog</p>
            <ul class="space-y-2.5 text-sm text-slate-400">
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Ijaraga olish</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Sotib olish</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Xaritada koʻrish</a></li>
            </ul>
          </div>
          <div>
            <p class="text-sm font-semibold mb-4">Xizmatlar</p>
            <ul class="space-y-2.5 text-sm text-slate-400">
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Bino boshqaruvi</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Shartnomalar</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Servis</a></li>
            </ul>
          </div>
          <div>
            <p class="text-sm font-semibold mb-4">Aloqa</p>
            <ul class="space-y-2.5 text-sm text-slate-400">
              <li>info@makon.uz</li>
              <li>+998 71 123 45 67</li>
            </ul>
          </div>
          <div>
            <p class="text-sm font-semibold mb-4">Kompaniya</p>
            <ul class="space-y-2.5 text-sm text-slate-400">
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Haqimizda</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Maxfiylik</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Shartlar</a></li>
            </ul>
          </div>
        </div>
        <div class="pt-6 border-t border-slate-100">
          <p class="text-slate-400 text-sm">© 2026 MAKON · Toshkent, Oʻzbekiston</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })
const searchQuery = ref('')
const showFilters = ref(false)
const viewMode = ref('list')
const activeDeal = ref('rent')
const activeCategory = ref('all')
const sortBy = ref('new')
const selectedRooms = ref<string[]>([])
const selectedAmenities = ref<string[]>([])
const priceMin = ref('')
const priceMax = ref('')

const dealTabs = [
  { id: 'rent', label: 'Ijaraga', count: '3 200+' },
  { id: 'buy', label: 'Sotib olish', count: '1 800+' },
  { id: 'daily', label: 'Kunlik', count: '320+' },
]
const activeDealLabel = computed(() => dealTabs.find(t => t.id === activeDeal.value)?.label || '')
const categories = [
  { id: 'all', title: 'Barchasi', icon: '🏛️' },
  { id: 'office', title: 'Ofis', icon: '🏢' },
  { id: 'retail', title: 'Doʻkon', icon: '🛍️' },
  { id: 'warehouse', title: 'Ombor', icon: '📦' },
  { id: 'residential', title: 'Turar joy', icon: '🏠' },
  { id: 'land', title: 'Yer', icon: '🌍' },
]
const activeCategoryLabel = computed(() => categories.find(c => c.id === activeCategory.value)?.title || '')
const roomOptions = ['1', '2', '3', '4', '5+']
const amenities = ['Parkovka', 'Lift', 'Konditsioner', 'Internet', 'Signalizatsiya', 'Oshxona', 'Mebel', 'Sanuzel']
const stats = [
  { value: '5 300+', label: 'Faol eʼlonlar' },
  { value: '48', label: 'Tuman/shahar' },
  { value: '1 200+', label: 'Biznes-markaz' },
  { value: '4.9★', label: 'Foydalanuvchi bahosi' },
]
const toggleRoom = (r: string) => {
  const idx = selectedRooms.value.indexOf(r)
  if (idx > -1) selectedRooms.value.splice(idx, 1)
  else selectedRooms.value.push(r)
}
const toggleAmenity = (a: string) => {
  const idx = selectedAmenities.value.indexOf(a)
  if (idx > -1) selectedAmenities.value.splice(idx, 1)
  else selectedAmenities.value.push(a)
}
const resetFilters = () => {
  selectedRooms.value = []
  selectedAmenities.value = []
  priceMin.value = ''
  priceMax.value = ''
}
const activeFiltersCount = computed(() => selectedRooms.value.length + selectedAmenities.value.length + (priceMin.value ? 1 : 0) + (priceMax.value ? 1 : 0))
const filteredCount = computed(() => listings.length + 47)

const listings = [
  { id: 1, title: 'Green Business Center — A blok', address: 'Mirobod tumani, Amir Temur 88', priceText: '18 000 000 soʻm/oy', pricePerM2: '150 000/m²', deal: 'Ijaraga', type: 'Ofis', img: '/tashkent/finance-center.jpg', area: 120, floor: 3, totalFloor: 12, rooms: '3 xona', photos: 12 },
  { id: 2, title: 'Nest One Tower — 142-xona', address: 'Yashnobod tumani, Tashkent City', priceText: '25 000 000 soʻm/oy', pricePerM2: '180 000/m²', deal: 'Ijaraga', type: 'Ofis', img: '/tashkent/nest-one.jpg', area: 139, floor: 14, totalFloor: 45, rooms: '4 xona', photos: 8 },
  { id: 3, title: 'Mega Mall — savdo maydoni', address: 'Chilonzor tumani, Bunyodkor 12', priceText: '12 000 000 soʻm/oy', pricePerM2: '140 000/m²', deal: 'Ijaraga', type: 'Doʻkon', img: '/tashkent/mall-towers.jpg', area: 85, floor: 1, totalFloor: 5, rooms: '1 zal', photos: 6 },
  { id: 4, title: 'Industrial Park 2 — ombor', address: 'Yuqori Chirchiq, Industrial zona', priceText: '24 000 000 soʻm/oy', pricePerM2: '55 000/m²', deal: 'Ijaraga', type: 'Ombor', img: '/tashkent/new-business.jpg', area: 450, floor: 1, totalFloor: 1, rooms: 'Ochiq maydon', photos: 4 },
  { id: 5, title: 'Tashkent City Mall — pavilion', address: 'Yashnobod tumani, Tashkent City', priceText: '15 000 000 soʻm/oy', pricePerM2: '190 000/m²', deal: 'Ijaraga', type: 'Doʻkon', img: '/tashkent/city-2025.jpg', area: 78, floor: 2, totalFloor: 4, rooms: '1 zal', photos: 9 },
  { id: 6, title: 'Harmony Residence — 4-xonali', address: 'Yakkasaroy tumani, Bobur 45', priceText: '1 250 000 soʻm/m²', pricePerM2: 'Sotuvda', deal: 'Sotuvda', type: 'Turar joy', img: '/tashkent/city-night.jpg', area: 120, floor: 6, totalFloor: 16, rooms: '4 xona', photos: 15 },
]
const mapPins = [
  { x: 35, y: 40, price: '18M' },
  { x: 55, y: 25, price: '25M' },
  { x: 48, y: 55, price: '12M' },
  { x: 65, y: 35, price: '24M' },
  { x: 30, y: 60, price: '15M' },
  { x: 70, y: 50, price: '1.25M' },
]
</script>
