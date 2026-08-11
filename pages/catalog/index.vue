<template>
  <div class="catalog-page">
    <!-- ============ TOP BAR ============ -->
    <header class="catalog-topbar">
      <div class="catalog-topbar__left">
        <NuxtLink to="/" class="catalog-logo">
          <div class="catalog-logo__icon">M</div>
          <span class="catalog-logo__text">MAKON</span>
        </NuxtLink>
        <div class="catalog-topbar__search">
          <Search :size="16" class="text-ink-400" />
          <input v-model="filters.search" type="text" placeholder="Qidirish: ofis, ombor, savdo maydoni..." @keyup.enter="applySearch" />
        </div>
      </div>

      <div class="catalog-topbar__right">
        <button class="catalog-icon-btn" title="Sevimlilar" @click="favoritesView = !favoritesView">
          <Heart :size="18" :fill="favoritesView ? '#ef4444' : 'none'" :class="favoritesView ? 'text-red-500' : ''" />
          <span v-if="favorites.size > 0" class="catalog-icon-btn__badge">{{ favorites.size }}</span>
        </button>
        <button class="catalog-icon-btn" title="Solishtirish">
          <GitCompareArrows :size="18" />
        </button>
        <button class="catalog-lang-btn" @click="toggleLang">{{ lang.toUpperCase() }}</button>
        <ThemeToggle />
        <NuxtLink to="/login" class="catalog-login-btn">Tizimga kirish</NuxtLink>
        <NuxtLink to="/register/eri" class="catalog-cta-btn">
          <Plus :size="14" />
          E'lon joylash
        </NuxtLink>
      </div>
    </header>

    <!-- ============ TOOLBAR (tabs + chips) ============ -->
    <div class="catalog-toolbar">
      <!-- Category tabs -->
      <div class="catalog-tabs">
        <button :class="{ active: filters.offerType === '' }" @click="filters.offerType = ''">Barchasi</button>
        <button :class="{ active: filters.offerType === 'RENT' }" @click="filters.offerType = 'RENT'">Ijaraga</button>
        <button :class="{ active: filters.offerType === 'SALE' }" @click="filters.offerType = 'SALE'">Sotish</button>
      </div>

      <!-- View toggle + filters button -->
      <div class="catalog-toolbar__actions">
        <div class="catalog-view-toggle">
          <button :class="{ active: view === 'split' }" @click="view = 'split'" title="Ro'yxat + Xarita">
            <Columns3 :size="15" />
          </button>
          <button :class="{ active: view === 'list' }" @click="view = 'list'" title="Ro'yxat">
            <List :size="15" />
          </button>
          <button :class="{ active: view === 'grid' }" @click="view = 'grid'" title="Grid">
            <LayoutGrid :size="15" />
          </button>
          <button :class="{ active: view === 'map' }" @click="view = 'map'" title="Xarita">
            <MapPin :size="15" />
          </button>
        </div>
        <button class="catalog-filter-btn" @click="showFilterDrawer = true">
          <SlidersHorizontal :size="15" />
          Filtrlar
          <span v-if="activeFilterCount > 0" class="catalog-filter-btn__count">{{ activeFilterCount }}</span>
        </button>
      </div>
    </div>

    <!-- Filter chips (horizontal scroll) -->
    <div class="catalog-chips">
      <button class="catalog-chip" :class="{ 'catalog-chip--active': filters.propertyType }" @click="cyclePropertyType">
        <component :is="currentTypeIcon" :size="13" />
        {{ currentTypeLabel }}
        <ChevronDown :size="12" />
      </button>
      <button class="catalog-chip" :class="{ 'catalog-chip--active': filters.region }" @click="cycleRegion">
        <MapPin :size="13" />
        {{ filters.region || 'Barcha hududlar' }}
        <ChevronDown :size="12" />
      </button>
      <button class="catalog-chip" :class="{ 'catalog-chip--active': filters.sort }" @click="cycleSort">
        <ArrowUpDown :size="13" />
        {{ currentSortLabel }}
      </button>
      <button class="catalog-chip" :class="{ 'catalog-chip--active': filters.timeFilter }" @click="cycleTimeFilter">
        <Clock :size="13" />
        {{ filters.timeFilter || 'Vaqt' }}
      </button>
      <button v-if="activeFilterCount > 0" class="catalog-chip catalog-chip--clear" @click="resetFilters">
        <X :size="13" /> Tozalash
      </button>
    </div>

    <!-- ============ VIP CAROUSEL ============ -->
    <div v-if="vipListings.length > 0 && !favoritesView" class="catalog-vip">
      <div class="catalog-vip__header">
        <span class="catalog-vip__title">
          <Crown :size="16" class="text-amber-500" />
          Premium ob'ektlar
        </span>
        <div class="catalog-vip__nav">
          <button @click="scrollVip(-1)" :disabled="vipScrollPos === 0"><ChevronLeft :size="16" /></button>
          <button @click="scrollVip(1)"><ChevronRight :size="16" /></button>
        </div>
      </div>
      <div ref="vipScrollEl" class="catalog-vip__scroll">
        <div
          v-for="item in vipListings"
          :key="item.id"
          class="vip-card"
          @click="navigateTo(`/listings/${item.id}`)"
        >
          <div class="vip-card__image">
            <img :src="item.photo" :alt="item.title" loading="lazy" />
            <span class="vip-card__badge">PREMIUM</span>
            <button class="vip-card__fav" @click.stop="toggleFavorite(item.id)">
              <Heart :size="15" :fill="favorites.has(item.id) ? '#ef4444' : 'none'" :class="favorites.has(item.id) ? 'text-red-500' : 'text-white'" />
            </button>
            <div class="vip-card__overlay">
              <div class="vip-card__price">{{ item.priceFormatted }}</div>
              <div class="vip-card__desc">{{ item.title }}</div>
              <div class="vip-card__meta">{{ item.area }} m² · {{ item.district }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============ RESULTS HEADER ============ -->
    <div class="catalog-results-header">
      <div class="catalog-results-count">
        Topildi: <b>{{ filteredListings.length }}</b>
        <span class="catalog-results-total"> / Jami: {{ listings.length }} ta ob'ekt</span>
      </div>
    </div>

    <!-- ============ MAIN BODY ============ -->
    <div class="catalog-body">
      <!-- ---------- SIDEBAR FILTERS (desktop, list/grid view) ---------- -->
      <aside v-if="view !== 'map'" class="catalog-sidebar">
        <FilterPanel
          v-model:search="filters.search"
          v-model:sort="filters.sort"
          v-model:offer-type="filters.offerType"
          v-model:property-type="filters.propertyType"
          v-model:price-min="filters.priceMin"
          v-model:price-max="filters.priceMax"
          v-model:area-min="filters.areaMin"
          v-model:area-max="filters.areaMax"
          v-model:amenities="filters.amenities"
          @reset="resetFilters"
        />
      </aside>

      <!-- ---------- LISTINGS ---------- -->
      <section v-if="view !== 'map'" class="catalog-listings" :class="{ 'catalog-listings--split': view === 'split' }">
        <!-- LIST / SPLIT VIEW -->
        <div v-if="view === 'list' || view === 'split'" class="catalog-listings__list">
          <div
            v-for="item in filteredListings"
            :id="`listing-${item.id}`"
            :key="item.id"
            class="listing-card"
            :class="{ 'listing-card--active': selectedId === item.id }"
            @click="selectOnMap(item.id)"
            @mouseenter="hoverId = item.id"
            @mouseleave="hoverId = null"
          >
            <div class="listing-card__photo" @click="view === 'split' ? selectOnMap(item.id) : null">
              <img :src="item.photo" :alt="item.title" loading="lazy" />
              <button class="listing-card__fav" @click.stop="toggleFavorite(item.id)">
                <Heart :size="15" :fill="favorites.has(item.id) ? '#ef4444' : 'none'" :class="favorites.has(item.id) ? 'text-red-500' : 'text-ink-400'" />
              </button>
              <span class="listing-card__type-badge" :class="`listing-card__type-badge--${item.typeColor}`">{{ item.typeLabel }}</span>
            </div>
            <div class="listing-card__body">
              <NuxtLink v-if="view !== 'split'" :to="`/listings/${item.id}`" class="listing-card__title">{{ item.title }}</NuxtLink>
              <div v-else class="listing-card__title" @click="selectOnMap(item.id)">{{ item.title }}</div>
              <div class="listing-card__address"><MapPin :size="12" /><span>{{ item.address }}</span></div>
              <div class="listing-card__meta">
                <span><Ruler :size="12" /> {{ item.area }} m²</span>
                <span><component :is="item.typeIcon" :size="12" /> {{ item.typeLabel }}</span>
                <span :class="item.offerType === 'RENT' ? 'text-brand-500' : 'text-emerald-500'">{{ item.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvga' }}</span>
              </div>
              <div class="listing-card__footer">
                <span class="listing-card__price">{{ item.priceFormatted }}</span>
                <NuxtLink :to="`/listings/${item.id}`" class="listing-card__cta" @click.stop>Batafsil <ArrowRight :size="14" /></NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- GRID VIEW -->
        <div v-else class="catalog-grid">
          <NuxtLink
            v-for="item in filteredListings"
            :key="item.id"
            :to="`/listings/${item.id}`"
            class="grid-card"
            @mouseenter="hoverId = item.id"
            @mouseleave="hoverId = null"
          >
            <div class="grid-card__image">
              <img :src="item.photo" :alt="item.title" loading="lazy" />
              <span class="grid-card__badge" :class="`grid-card__badge--${item.typeColor}`">{{ item.typeLabel }}</span>
              <button class="grid-card__fav" @click.prevent="toggleFavorite(item.id)">
                <Heart :size="16" :fill="favorites.has(item.id) ? '#ef4444' : 'none'" :class="favorites.has(item.id) ? 'text-red-500' : 'text-white'" />
              </button>
            </div>
            <div class="grid-card__body">
              <div class="grid-card__title">{{ item.title }}</div>
              <div class="grid-card__address"><MapPin :size="11" /> {{ item.district }}</div>
              <div class="grid-card__specs">
                <span>{{ item.area }} m²</span>
                <span :class="item.offerType === 'RENT' ? 'text-brand-500' : 'text-emerald-500'">{{ item.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvda' }}</span>
              </div>
              <div class="grid-card__price">{{ item.priceFormatted }}</div>
            </div>
          </NuxtLink>
        </div>

        <div v-if="filteredListings.length === 0" class="catalog-empty">
          <SearchX :size="40" class="text-ink-300 mb-3" />
          <p class="text-ink-500 mb-4">Filtr bo'yicha obyektlar topilmadi</p>
          <button class="btn btn-secondary btn-sm" @click="resetFilters">Filtrlarni tozalash</button>
        </div>
      </section>

      <!-- ---------- MAP VIEW (full) ---------- -->
      <section v-if="view === 'map'" class="catalog-map-col">
        <ClientOnly>
          <CatalogMap
            :listings="mapListings"
            :center="[41.2995, 69.2401]"
            :zoom="11"
            :focus-id="selectedId"
            @select="handleMarkerSelect"
          />
          <template #fallback>
            <div class="catalog-map-fallback">Xarita yuklanmoqda...</div>
          </template>
        </ClientOnly>
      </section>

      <!-- ---------- MAP COLUMN (split view, list + map side by side) ---------- -->
      <section v-if="view === 'split'" class="catalog-map-col catalog-map-col--split">
        <ClientOnly>
          <CatalogMap
            :listings="mapListings"
            :center="[41.2995, 69.2401]"
            :zoom="11"
            :focus-id="selectedId"
            @select="handleMarkerSelect"
          />
          <template #fallback>
            <div class="catalog-map-fallback">Xarita yuklanmoqda...</div>
          </template>
        </ClientOnly>
      </section>
    </div>

    <!-- ============ MOBILE FILTER DRAWER ============ -->
    <Transition name="drawer">
      <div v-if="showFilterDrawer" class="catalog-drawer-overlay" @click.self="showFilterDrawer = false">
        <div class="catalog-drawer">
          <div class="catalog-drawer__header">
            <span class="font-semibold">Filtrlar</span>
            <button @click="showFilterDrawer = false"><X :size="20" /></button>
          </div>
          <div class="catalog-drawer__body">
            <FilterPanel
              v-model:search="filters.search"
              v-model:sort="filters.sort"
              v-model:offer-type="filters.offerType"
              v-model:property-type="filters.propertyType"
              v-model:price-min="filters.priceMin"
              v-model:price-max="filters.priceMax"
              v-model:area-min="filters.areaMin"
              v-model:area-max="filters.areaMax"
              v-model:amenities="filters.amenities"
              @reset="resetFilters"
            />
          </div>
          <div class="catalog-drawer__footer">
            <button class="btn btn-primary w-full" @click="showFilterDrawer = false">
              {{ filteredListings.length }} ta natijani ko'rish
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {
  Heart, GitCompareArrows, ChevronDown, List, MapPin, SlidersHorizontal,
  SearchX, Ruler, ArrowRight, X, Building2, ShoppingBag, Warehouse,
  Home as HomeIcon, Search, Plus, LayoutGrid, Crown, ChevronLeft, ChevronRight,
  ArrowUpDown, Clock, Factory, Columns3,
} from 'lucide-vue-next'

definePageMeta({ layout: false })
useHead({ title: "Katalog — MAKON" })

// ---------------- Mock data ----------------
interface RawListing {
  id: string; title: string; district: string; address: string; area: number
  type: 'OFFICE' | 'SHOPPING' | 'WAREHOUSE'; offerType: 'RENT' | 'SALE'
  price: number; photo: string; lat: number; lng: number; vip: boolean
}

const rawListings: RawListing[] = [
  { id: 'l1', title: "Tashkent City'da A-301 · 85 m² ofis", district: "Mirzo Ulug'bek", address: "Amir Temur shoh ko'chasi 108", area: 85, type: 'OFFICE', offerType: 'RENT', price: 25000000, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png', lat: 41.3111, lng: 69.2797, vip: true },
  { id: 'l2', title: "Trillant Tower B-501 · 120 m² premium ofis", district: 'Yashnobod', address: "Ziyolilar ko'chasi 6", area: 120, type: 'OFFICE', offerType: 'RENT', price: 35000000, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/6daa9acc3_generated_image.png', lat: 41.2967, lng: 69.3123, vip: true },
  { id: 'l3', title: "IT Park C-201 · 65 m² savdo maydoni", district: 'Yakkasaroy', address: "Mirobod ko'chasi 22", area: 65, type: 'SHOPPING', offerType: 'RENT', price: 18000000, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png', lat: 41.2865, lng: 69.2654, vip: true },
  { id: 'l4', title: "Piramit D-102 · 200 m² ombor", district: 'Shayxontohur', address: "Navoiy ko'chasi 34", area: 200, type: 'WAREHOUSE', offerType: 'RENT', price: 12000000, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3075330ac_generated_image.png', lat: 41.3267, lng: 69.2389, vip: true },
  { id: 'l5', title: "Savdo Markaz E-301 · 42 m² do'kon", district: 'Sergeli', address: "Qatortol ko'chasi 4", area: 42, type: 'SHOPPING', offerType: 'SALE', price: 450000000, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png', lat: 41.2156, lng: 69.2456, vip: true },
  { id: 'l6', title: "Business Center-1 F-205 · 95 m² ofis", district: 'Chilonzor', address: "Bunyodkor shoh ko'chasi 45", area: 95, type: 'OFFICE', offerType: 'RENT', price: 22000000, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png', lat: 41.2701, lng: 69.1987, vip: false },
  { id: 'l7', title: "Ombor majmuasi G-001 · 560 m²", district: 'Bektemir', address: "Guliston ko'chasi 15", area: 560, type: 'WAREHOUSE', offerType: 'RENT', price: 68000000, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/41072e285_generated_image.png', lat: 41.2312, lng: 69.3452, vip: false },
  { id: 'l8', title: "Mirobod biznes markazi · 110 m²", district: 'Mirobod', address: "Shota Rustaveli ko'chasi 7", area: 110, type: 'OFFICE', offerType: 'RENT', price: 28000000, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/6daa9acc3_generated_image.png', lat: 41.2934, lng: 69.2945, vip: false },
  { id: 'l9', title: "Yashnobod ombor · 340 m² logistika", district: 'Yashnobod', address: "Katortol ko'chasi 11", area: 340, type: 'WAREHOUSE', offerType: 'RENT', price: 45000000, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/41072e285_generated_image.png', lat: 41.3045, lng: 69.3287, vip: false },
  { id: 'l10', title: "Tashkent City A-502 · 60 m² savdo", district: "Mirzo Ulug'bek", address: "Amir Temur shoh ko'chasi 108", area: 60, type: 'SHOPPING', offerType: 'SALE', price: 850000000, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png', lat: 41.3120, lng: 69.2805, vip: false },
  { id: 'l11', title: "Chilonzor BC · 75 m² ofis maydoni", district: 'Chilonzor', address: "Bunyodkor shoh ko'chasi 12", area: 75, type: 'OFFICE', offerType: 'RENT', price: 19500000, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png', lat: 41.2789, lng: 69.2034, vip: false },
  { id: 'l12', title: "Bektemir sanoat zonasi · 720 m²", district: 'Bektemir', address: "Sanoat ko'chasi 3", area: 720, type: 'WAREHOUSE', offerType: 'RENT', price: 89000000, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3075330ac_generated_image.png', lat: 41.2089, lng: 69.3612, vip: false },
]

const TYPE_META: Record<string, { label: string; color: string; icon: any }> = {
  OFFICE: { label: 'Ofis', color: 'blue', icon: Building2 },
  SHOPPING: { label: 'Savdo', color: 'amber', icon: ShoppingBag },
  WAREHOUSE: { label: 'Sanoat', color: 'orange', icon: Warehouse },
}

function formatPriceFull(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + " so'm"
}
function formatPriceShort(price: number) {
  return (price / 1_000_000).toFixed(1) + 'M'
}

const listings = computed(() => rawListings.map(r => ({
  ...r,
  typeLabel: TYPE_META[r.type].label,
  typeColor: TYPE_META[r.type].color,
  typeIcon: TYPE_META[r.type].icon,
  priceFormatted: formatPriceFull(r.price),
  priceShort: formatPriceShort(r.price),
})))

const vipListings = computed(() => listings.value.filter(l => l.vip))

const districts = computed(() => [...new Set(rawListings.map(r => r.district))].sort())

// ---------------- Filters ----------------
const filters = reactive({
  search: '', sort: '', offerType: '' as '' | 'RENT' | 'SALE',
  propertyType: '' as '' | 'OFFICE' | 'SHOPPING' | 'WAREHOUSE',
  priceMin: null as number | null, priceMax: null as number | null,
  areaMin: null as number | null, areaMax: null as number | null,
  amenities: '', region: '', timeFilter: '' as '' | 'week' | 'month',
})

function resetFilters() {
  Object.assign(filters, { search: '', sort: '', offerType: '', propertyType: '', priceMin: null, priceMax: null, areaMin: null, areaMax: null, amenities: '', region: '', timeFilter: '' })
}

const activeFilterCount = computed(() => {
  let n = 0
  if (filters.propertyType) n++
  if (filters.region) n++
  if (filters.sort) n++
  if (filters.timeFilter) n++
  if (filters.priceMin || filters.priceMax) n++
  if (filters.areaMin || filters.areaMax) n++
  return n
})

const filteredListings = computed(() => {
  let result = [...listings.value]
  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter(l => l.title.toLowerCase().includes(q) || l.address.toLowerCase().includes(q))
  }
  if (filters.offerType) result = result.filter(l => l.offerType === filters.offerType)
  if (filters.propertyType) result = result.filter(l => l.type === filters.propertyType)
  if (filters.priceMin) result = result.filter(l => l.price >= filters.priceMin!)
  if (filters.priceMax) result = result.filter(l => l.price <= filters.priceMax!)
  if (filters.areaMin) result = result.filter(l => l.area >= filters.areaMin!)
  if (filters.areaMax) result = result.filter(l => l.area <= filters.areaMax!)
  if (filters.region) result = result.filter(l => l.district === filters.region)
  if (filters.sort === 'price_asc') result.sort((a, b) => a.price - b.price)
  else if (filters.sort === 'price_desc') result.sort((a, b) => b.price - a.price)
  else if (filters.sort === 'area_desc') result.sort((a, b) => b.area - a.area)
  if (favoritesView.value) result = result.filter(l => favorites.value.has(l.id))
  return result
})

const mapListings = computed(() => filteredListings.value.map(l => ({
  id: l.id, lat: l.lat, lng: l.lng, priceLabel: l.priceShort, title: l.title,
  href: `/listings/${l.id}`, active: selectedId.value === l.id || hoverId.value === l.id,
})))

// ---------------- UI state ----------------
const view = ref<'list' | 'grid' | 'map' | 'split'>('split')

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.get('view') === 'map') view.value = 'map'
  else if (params.get('view') === 'grid') view.value = 'grid'
  else if (params.get('view') === 'list') view.value = 'list'
})
const selectedId = ref<string | null>(null)
const hoverId = ref<string | null>(null)
const favorites = ref<Set<string>>(new Set())
const favoritesView = ref(false)
const lang = ref<'uz' | 'ru'>('uz')
const showFilterDrawer = ref(false)
const vipScrollEl = ref<HTMLElement | null>(null)
const vipScrollPos = ref(0)

function toggleFavorite(id: string) {
  if (favorites.value.has(id)) favorites.value.delete(id)
  else favorites.value.add(id)
  favorites.value = new Set(favorites.value)
}
function toggleLang() { lang.value = lang.value === 'uz' ? 'ru' : 'uz' }
function applySearch() { /* search is reactive */ }

function scrollVip(dir: number) {
  if (!vipScrollEl.value) return
  vipScrollEl.value.scrollBy({ left: dir * 320, behavior: 'smooth' })
  vipScrollPos.value = vipScrollEl.value.scrollLeft + dir * 320
}

function handleMarkerSelect(id: string) {
  selectedId.value = id
  if (view.value === 'map') {
    view.value = 'split'
  }
  nextTick(() => document.getElementById(`listing-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
}

function selectOnMap(id: string) {
  selectedId.value = id
}

// Chip cycling
const propertyTypes = ['', 'OFFICE', 'SHOPPING', 'WAREHOUSE'] as const
const propertyTypeLabels: Record<string, string> = { '': 'Mulk turi', OFFICE: 'Ofis', SHOPPING: 'Savdo', WAREHOUSE: 'Sanoat' }
const propertyTypeIcons: Record<string, any> = { '': Building2, OFFICE: Building2, SHOPPING: ShoppingBag, WAREHOUSE: Factory }
const currentTypeLabel = computed(() => propertyTypeLabels[filters.propertyType] || 'Mulk turi')
const currentTypeIcon = computed(() => propertyTypeIcons[filters.propertyType] || Building2)
let ptypeIdx = 0
function cyclePropertyType() {
  ptypeIdx = (ptypeIdx + 1) % propertyTypes.length
  filters.propertyType = propertyTypes[ptypeIdx] as any
}

const sortOptions = ['', 'price_asc', 'price_desc', 'area_desc'] as const
const sortLabels: Record<string, string> = { '': 'Standart', price_asc: 'Arzon → Qimmat', price_desc: 'Qimmat → Arzon', area_desc: 'Katta maydon' }
const currentSortLabel = computed(() => sortLabels[filters.sort] || 'Standart')
let sortIdx = 0
function cycleSort() {
  sortIdx = (sortIdx + 1) % sortOptions.length
  filters.sort = sortOptions[sortIdx] as any
}

const timeOptions = ['', 'week', 'month'] as const
const timeLabels: Record<string, string> = { '': 'Vaqt', week: 'Oxirgi hafta', month: 'Oxirgi oy' }
let timeIdx = 0
function cycleTimeFilter() {
  timeIdx = (timeIdx + 1) % timeOptions.length
  filters.timeFilter = timeOptions[timeIdx] as any
}

const allRegions = computed(() => ['', ...districts.value])
let regionIdx = 0
function cycleRegion() {
  regionIdx = (regionIdx + 1) % allRegions.value.length
  filters.region = allRegions.value[regionIdx]
}
</script>

<style scoped>
.catalog-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f4f4f5;
}
.dark .catalog-page { background: #09090b; }

/* ============ TOP BAR ============ */
.catalog-topbar {
  height: 60px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  z-index: 50;
}
.dark .catalog-topbar { background: #18181b; border-bottom-color: rgba(255,255,255,0.06); }
.catalog-topbar__left { display: flex; align-items: center; gap: 16px; flex: 1; }
.catalog-logo { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.catalog-logo__icon {
  width: 32px; height: 32px; border-radius: 9px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white; display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 14px;
}
.catalog-logo__text { font-weight: 700; font-size: 15px; letter-spacing: -0.02em; color: #18181b; }
.dark .catalog-logo__text { color: #fff; }
.catalog-topbar__search {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 14px; border-radius: 12px;
  background: rgba(0,0,0,0.04); max-width: 420px; flex: 1;
}
.dark .catalog-topbar__search { background: rgba(255,255,255,0.05); }
.catalog-topbar__search input {
  flex: 1; background: transparent; border: none; font-size: 13px; color: #18181b; outline: none;
}
.dark .catalog-topbar__search input { color: #fff; }
.catalog-topbar__right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.catalog-icon-btn {
  position: relative; width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 9px; color: #71717a; transition: all 0.15s;
}
.catalog-icon-btn:hover { background: rgba(0,0,0,0.05); color: #18181b; }
.dark .catalog-icon-btn:hover { background: rgba(255,255,255,0.06); color: #fff; }
.catalog-icon-btn__badge {
  position: absolute; top: -2px; right: -2px; background: #ef4444; color: white;
  font-size: 9px; font-weight: 700; min-width: 15px; height: 15px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; padding: 0 3px;
}
.catalog-lang-btn { font-size: 12px; font-weight: 700; color: #71717a; padding: 6px 10px; border-radius: 8px; }
.catalog-lang-btn:hover { background: rgba(0,0,0,0.05); }
.catalog-login-btn {
  font-size: 13px; font-weight: 600; color: #52525b; padding: 8px 14px; border-radius: 9px;
}
.catalog-login-btn:hover { background: rgba(0,0,0,0.05); }
.dark .catalog-login-btn { color: #d4d4d8; }
.dark .catalog-login-btn:hover { background: rgba(255,255,255,0.06); }
.catalog-cta-btn {
  display: flex; align-items: center; gap: 5px;
  font-size: 13px; font-weight: 700; color: white;
  background: #4f46e5; padding: 8px 14px; border-radius: 9px;
}
.catalog-cta-btn:hover { background: #4338ca; }

/* ============ TOOLBAR ============ */
.catalog-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.dark .catalog-toolbar { background: #18181b; border-bottom-color: rgba(255,255,255,0.06); }
.catalog-tabs {
  display: flex;
  gap: 4px;
  background: rgba(0,0,0,0.04);
  padding: 4px;
  border-radius: 12px;
}
.dark .catalog-tabs { background: rgba(255,255,255,0.05); }
.catalog-tabs button {
  font-size: 13px; font-weight: 600; padding: 8px 18px; border-radius: 9px;
  color: #71717a; transition: all 0.15s;
}
.catalog-tabs button.active { background: #ffffff; color: #18181b; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
.dark .catalog-tabs button.active { background: #27272a; color: #fff; }
.catalog-toolbar__actions { display: flex; align-items: center; gap: 10px; }
.catalog-view-toggle {
  display: flex;
  gap: 4px;
  background: rgba(0,0,0,0.04);
  padding: 4px;
  border-radius: 10px;
}
.dark .catalog-view-toggle { background: rgba(255,255,255,0.05); }
.catalog-view-toggle button {
  width: 34px; height: 32px; display: flex; align-items: center; justify-content: center;
  border-radius: 7px; color: #71717a;
}
.catalog-view-toggle button.active { background: #fff; color: #4f46e5; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
.dark .catalog-view-toggle button.active { background: #27272a; color: #818cf8; }
.catalog-filter-btn {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; color: #52525b;
  padding: 8px 14px; border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.08);
}
.dark .catalog-filter-btn { color: #d4d4d8; border-color: rgba(255,255,255,0.08); }
.catalog-filter-btn__count {
  background: #4f46e5; color: white; font-size: 10px; font-weight: 700;
  min-width: 18px; height: 18px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center; padding: 0 5px;
}

/* ============ CHIPS ============ */
.catalog-chips {
  display: flex;
  gap: 8px;
  padding: 10px 16px;
  overflow-x: auto;
  background: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  scrollbar-width: none;
}
.catalog-chips::-webkit-scrollbar { display: none; }
.dark .catalog-chips { background: #18181b; border-bottom-color: rgba(255,255,255,0.06); }
.catalog-chip {
  display: flex; align-items: center; gap: 5px;
  font-size: 12.5px; font-weight: 600; color: #52525b;
  padding: 7px 12px; border-radius: 20px;
  background: rgba(0,0,0,0.04); white-space: nowrap; flex-shrink: 0;
}
.dark .catalog-chip { background: rgba(255,255,255,0.05); color: #d4d4d8; }
.catalog-chip--active { background: rgba(99,102,241,0.1); color: #4f46e5; }
.dark .catalog-chip--active { background: rgba(99,102,241,0.15); color: #818cf8; }
.catalog-chip--clear { background: rgba(239,68,68,0.08); color: #ef4444; }

/* ============ VIP CAROUSEL ============ */
.catalog-vip {
  padding: 16px;
  background: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.dark .catalog-vip { background: #18181b; border-bottom-color: rgba(255,255,255,0.06); }
.catalog-vip__header {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;
}
.catalog-vip__title {
  display: flex; align-items: center; gap: 6px;
  font-size: 16px; font-weight: 700; color: #18181b;
}
.dark .catalog-vip__title { color: #fff; }
.catalog-vip__nav { display: flex; gap: 6px; }
.catalog-vip__nav button {
  width: 30px; height: 30px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(0,0,0,0.08); color: #52525b;
}
.catalog-vip__nav button:hover { background: rgba(0,0,0,0.04); }
.catalog-vip__nav button:disabled { opacity: 0.4; cursor: not-allowed; }
.dark .catalog-vip__nav button { border-color: rgba(255,255,255,0.08); color: #d4d4d8; }

.catalog-vip__scroll {
  display: flex; gap: 12px; overflow-x: auto; scrollbar-width: none;
  scroll-behavior: smooth;
}
.catalog-vip__scroll::-webkit-scrollbar { display: none; }
.vip-card { flex-shrink: 0; width: 280px; cursor: pointer; }
.vip-card__image {
  position: relative; width: 280px; height: 200px; border-radius: 14px; overflow: hidden;
}
.vip-card__image img { width: 100%; height: 100%; object-fit: cover; }
.vip-card__badge {
  position: absolute; top: 10px; left: 10px;
  font-size: 10px; font-weight: 800; letter-spacing: 0.04em;
  background: linear-gradient(135deg, #f59e0b, #d97706); color: white;
  padding: 4px 10px; border-radius: 6px;
}
.vip-card__fav {
  position: absolute; top: 10px; right: 10px;
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
}
.vip-card__overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
  padding: 20px 14px 12px;
}
.vip-card__price { font-size: 18px; font-weight: 800; color: white; margin-bottom: 4px; }
.vip-card__desc { font-size: 13px; color: rgba(255,255,255,0.9); line-height: 1.3; margin-bottom: 2px; }
.vip-card__meta { font-size: 11px; color: rgba(255,255,255,0.6); }

/* ============ RESULTS HEADER ============ */
.catalog-results-header {
  padding: 12px 16px;
  background: #f4f4f5;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.dark .catalog-results-header { background: #09090b; border-bottom-color: rgba(255,255,255,0.04); }
.catalog-results-count { font-size: 13px; color: #71717a; }
.catalog-results-count b { color: #18181b; font-weight: 700; }
.dark .catalog-results-count b { color: #fff; }
.catalog-results-total { color: #a1a1aa; }

/* ============ BODY ============ */
.catalog-body { display: flex; min-height: 0; flex: 1; }

/* ============ SIDEBAR ============ */
.catalog-sidebar {
  display: flex;
  width: 300px; flex-shrink: 0;
  border-right: 1px solid rgba(0,0,0,0.06);
  background: #ffffff; overflow-y: auto;
}
.dark .catalog-sidebar { background: #18181b; border-right-color: rgba(255,255,255,0.06); }

/* ============ LISTINGS ============ */
.catalog-listings { flex: 1; overflow-y: auto; padding: 12px; }
.catalog-listings--split { flex: 0 0 400px; width: 400px; max-width: 400px; border-right: 1px solid rgba(0,0,0,0.06); }
.dark .catalog-listings--split { border-right-color: rgba(255,255,255,0.06); }
.catalog-listings__list { display: flex; flex-direction: column; gap: 10px; }
.catalog-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; text-align: center; }

/* Listing card (list view) */
.listing-card {
  display: flex; gap: 12px; padding: 10px; border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.06); background: #ffffff; transition: all 0.15s;
}
.dark .listing-card { background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.06); }
.listing-card:hover, .listing-card--active { border-color: rgba(99,102,241,0.4); box-shadow: 0 4px 16px rgba(99,102,241,0.12); }
.listing-card { cursor: pointer; }
.listing-card--active { border-color: #6366f1; background: rgba(99,102,241,0.05); box-shadow: 0 6px 20px rgba(99,102,241,0.18), 0 0 0 1px rgba(99,102,241,0.3); }
.dark .listing-card--active { background: rgba(99,102,241,0.08); }
.listing-card__photo {
  position: relative; width: 128px; height: 96px; flex-shrink: 0;
  border-radius: 10px; overflow: hidden; display: block;
}
.listing-card__photo img { width: 100%; height: 100%; object-fit: cover; }
.listing-card__fav {
  position: absolute; top: 6px; right: 6px; width: 26px; height: 26px;
  border-radius: 50%; background: rgba(255,255,255,0.9);
  display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);
}
.listing-card__type-badge {
  position: absolute; bottom: 6px; left: 6px;
  font-size: 9.5px; font-weight: 700; padding: 3px 8px; border-radius: 6px; color: white;
}
.listing-card__type-badge--blue { background: #2563eb; }
.listing-card__type-badge--amber { background: #d97706; }
.listing-card__type-badge--orange { background: #ea580c; }
.listing-card__body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; padding: 2px 2px 2px 0; }
.listing-card__title {
  font-size: 13.5px; font-weight: 700; color: #18181b; line-height: 1.3;
  display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
}
.dark .listing-card__title { color: #fff; }
.listing-card__address { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #a1a1aa; }
.listing-card__address span { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.listing-card__meta { display: flex; align-items: center; gap: 12px; font-size: 11px; color: #71717a; }
.listing-card__meta span { display: flex; align-items: center; gap: 3px; }
.listing-card__footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
.listing-card__price { font-size: 13.5px; font-weight: 800; color: #ea580c; letter-spacing: -0.02em; }
.listing-card__cta {
  display: flex; align-items: center; gap: 3px; font-size: 11.5px; font-weight: 600;
  color: white; background: #4f46e5; padding: 5px 10px; border-radius: 8px;
}

/* Grid view */
.catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
.grid-card {
  border-radius: 14px; overflow: hidden;
  border: 1px solid rgba(0,0,0,0.06); background: #ffffff; transition: all 0.15s;
}
.dark .grid-card { background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.06); }
.grid-card:hover { border-color: rgba(99,102,241,0.3); box-shadow: 0 4px 16px rgba(99,102,241,0.1); }
.grid-card__image { position: relative; width: 100%; height: 160px; overflow: hidden; }
.grid-card__image img { width: 100%; height: 100%; object-fit: cover; }
.grid-card__badge {
  position: absolute; top: 8px; left: 8px; font-size: 10px; font-weight: 700;
  padding: 3px 8px; border-radius: 6px; color: white;
}
.grid-card__badge--blue { background: #2563eb; }
.grid-card__badge--amber { background: #d97706; }
.grid-card__badge--orange { background: #ea580c; }
.grid-card__fav {
  position: absolute; top: 8px; right: 8px; width: 28px; height: 28px;
  border-radius: 50%; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
}
.grid-card__body { padding: 12px; }
.grid-card__title { font-size: 13px; font-weight: 700; color: #18181b; margin-bottom: 4px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.dark .grid-card__title { color: #fff; }
.grid-card__address { display: flex; align-items: center; gap: 3px; font-size: 11px; color: #a1a1aa; margin-bottom: 6px; }
.grid-card__specs { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #71717a; margin-bottom: 8px; }
.grid-card__price { font-size: 15px; font-weight: 800; color: #ea580c; }

/* ============ MAP ============ */
.catalog-map-col { flex: 1; position: relative; min-height: 500px; }
.catalog-map-col--split { min-height: 0; }
.catalog-map-fallback {
  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  color: #a1a1aa; background: #eef0f4;
}

/* ============ DRAWER ============ */
.catalog-drawer-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 100;
  display: flex; justify-content: flex-end;
}
.catalog-drawer {
  width: 100%; max-width: 360px; background: #ffffff; height: 100%;
  display: flex; flex-direction: column;
}
.dark .catalog-drawer { background: #18181b; }
.catalog-drawer__header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px; border-bottom: 1px solid rgba(0,0,0,0.06);
}
.catalog-drawer__body { flex: 1; overflow-y: auto; }
.catalog-drawer__footer { padding: 16px; border-top: 1px solid rgba(0,0,0,0.06); }
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.2s; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; }

/* ============ RESPONSIVE ============ */
@media (max-width: 1023px) {
  .catalog-topbar__search { max-width: 200px; }
  .catalog-login-btn { display: none; }
  .catalog-sidebar { display: none; }
  .catalog-listings--split { flex: 0 0 340px; width: 340px; max-width: 340px; }
}
@media (max-width: 900px) {
  .catalog-body:has(.catalog-map-col--split) { flex-direction: column; }
  .catalog-listings--split { width: 100%; max-width: 100%; flex: 1 1 auto; border-right: none; }
  .catalog-map-col--split { min-height: 380px; flex: 0 0 380px; }
}
@media (max-width: 640px) {
  .catalog-topbar__search { max-width: 150px; }
  .catalog-cta-btn span { display: none; }
  .catalog-lang-btn { display: none; }
  .catalog-toolbar { flex-direction: column; gap: 8px; align-items: stretch; }
  .catalog-tabs { justify-content: center; }
  .catalog-toolbar__actions { justify-content: center; }
  .vip-card { width: 240px; }
  .vip-card__image { width: 240px; height: 170px; }
  .catalog-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
}
</style>
