<template>
  <div class="catalog-page">
    <!-- TOP BAR -->
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
        <NuxtLink to="/register" class="catalog-cta-btn">
          <Plus :size="14" />
          E'lon joylash
        </NuxtLink>
      </div>
    </header>

    <!-- PREMIUM HERO BANNER -->
    <div class="catalog-hero">
      <div class="catalog-hero__bg">
        <img :src="img('/buildings/real_tashkent-skyline.jpg')" alt="Tashkent" class="catalog-hero__img" />
        <div class="catalog-hero__overlay"></div>
      </div>
      <div class="catalog-hero__content">
        <div class="catalog-hero__tag">PREMIUM OBYEKTLAR</div>
        <h1 class="catalog-hero__title">Toshkentning eng yaxshi biznes markazlari</h1>
        <p class="catalog-hero__sub">Ofis, savdo va ombor maydonlari — interaktiv qavat rejasi, raqamli shartnoma va to'liq boshqaruv</p>
      </div>
    </div>

    <!-- TOOLBAR (tabs + chips) -->
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

    <!-- VIP CAROUSEL -->
    <div v-if="vipListings.length > 0 && !favoritesView" class="catalog-vip">
      <div class="catalog-vip__header">
        <span class="catalog-vip__title">
          <Crown :size="16" class="text-amber-500" />
          Tanlangan ob'ektlar
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
          @click="navigateTo(`${item.link}`)"
        >
          <div class="vip-card__image">
            <img :src="img(item.photo)" :alt="item.title" loading="lazy" />
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

    <!-- RESULTS HEADER -->
    <div class="catalog-results-header">
      <div class="catalog-results-count">
        Topildi: <b>{{ filteredListings.length }}</b>
        <span class="catalog-results-total"> / Jami: {{ listings.length }} ta ob'ekt</span>
      </div>
    </div>

    <!-- MAIN BODY -->
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
              <img :src="img(item.photo)" :alt="item.title" loading="lazy" />
              <button class="listing-card__fav" @click.stop="toggleFavorite(item.id)">
                <Heart :size="15" :fill="favorites.has(item.id) ? '#ef4444' : 'none'" :class="favorites.has(item.id) ? 'text-red-500' : 'text-ink-400'" />
              </button>
              <span class="listing-card__type-badge" :class="`listing-card__type-badge--${item.typeColor}`">{{ item.typeLabel }}</span>
            </div>
            <div class="listing-card__body">
              <NuxtLink v-if="view !== 'split'" :to="`${item.link}`" class="listing-card__title">{{ item.title }}</NuxtLink>
              <div v-else class="listing-card__title" @click="selectOnMap(item.id)">{{ item.title }}</div>
              <div class="listing-card__address"><MapPin :size="12" /><span>{{ item.address }}</span></div>
              <div class="listing-card__meta">
                <span><Ruler :size="12" /> {{ item.area }} m²</span>
                <span><component :is="item.typeIcon" :size="12" /> {{ item.typeLabel }}</span>
                <span :class="item.offerType === 'RENT' ? 'text-brand-500' : 'text-emerald-500'">{{ item.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvga' }}</span>
              </div>
              <div class="listing-card__footer">
                <span class="listing-card__price">{{ item.priceFormatted }}</span>
                <NuxtLink :to="`${item.link}`" class="listing-card__cta" @click.stop>Batafsil <ArrowRight :size="14" /></NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- 3D KPI Strip (catalog stats) -->
        <div class="catalog-kpi">
          <div class="dash-kpi dash-kpi--blue">
            <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Building2 :size="22" :stroke-width="1.8" /></div>
            <div class="dash-kpi__body">
              <div class="dash-kpi__value">{{ totalBuildings }}</div>
              <div class="dash-kpi__label">Binolar</div>
            </div>
          </div>
          <div class="dash-kpi dash-kpi--emerald">
            <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Grid3x3 :size="22" :stroke-width="1.8" /></div>
            <div class="dash-kpi__body">
              <div class="dash-kpi__value">{{ availableUnits }}</div>
              <div class="dash-kpi__label">Mavjud unitlar</div>
            </div>
          </div>
          <div class="dash-kpi dash-kpi--amber">
            <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
            <div class="dash-kpi__body">
              <div class="dash-kpi__value">{{ totalViews }}</div>
              <div class="dash-kpi__label">Ko'rishlar</div>
            </div>
          </div>
          <div class="dash-kpi dash-kpi--blue">
            <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileSignature :size="22" :stroke-width="1.8" /></div>
            <div class="dash-kpi__body">
              <div class="dash-kpi__value">{{ avgPrice }}<span class="text-sm">mln</span></div>
              <div class="dash-kpi__label">O'rtacha narx</div>
            </div>
          </div>
        </div>

        <!-- GRID VIEW -->
        <div v-if="view === 'grid'" class="catalog-grid">
          <NuxtLink
            v-for="item in filteredListings"
            :key="item.id"
            :to="`${item.link}`"
            class="grid-card"
            @mouseenter="hoverId = item.id"
            @mouseleave="hoverId = null"
          >
            <div class="grid-card__image">
              <img :src="img(item.photo)" :alt="item.title" loading="lazy" />
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

    <!-- MOBILE FILTER DRAWER -->
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
const { img } = useImg()
import {
  Heart, GitCompareArrows, ChevronDown, List, MapPin, SlidersHorizontal,
  SearchX, Ruler, ArrowRight, X, Building2, ShoppingBag, Warehouse,
  Home as HomeIcon, Search, Plus, LayoutGrid, Crown, ChevronLeft, ChevronRight,
  ArrowUpDown, Clock, Factory, Columns3,
  FileSignature, FileText, Grid3x3
} from 'lucide-vue-next'

definePageMeta({ layout: false })

const { formatUZS, formatUZSShort, formatNumber, formatDate } = useFormat()
useHead({ title: "Katalog — MAKON" })

// ---------------- Store data ----------------
const store = useMakonStore()

// Photo rotation per building
const BUILDING_PHOTOS: Record<string, string[]> = {
  b1: ['/buildings/real_tashkent-night.jpg', '/buildings/real_tashkent-skyline.jpg', '/buildings/real_tashkent-city.jpg'],
  b2: ['/buildings/real_nest-one.jpg', '/buildings/real_tashkent-skyline2.jpg', '/buildings/real_tashkent-street.jpg'],
  b3: ['/buildings/real_finance-center.jpg', '/buildings/real_tashkent-skyline3.jpg', '/buildings/real_tashkent-city.jpg'],
  b4: ['/buildings/real_tashkent-skyline.jpg', '/buildings/real_nest-one2.jpg', '/buildings/real_tashkent-night.jpg'],
  b5: ['/buildings/real_tashkent-skyline3.jpg', '/buildings/real_finance-center.jpg', '/buildings/real_tashkent-street.jpg'],
  b6: ['/buildings/real_tashkent-street.jpg', '/buildings/real_finance-center.jpg', '/buildings/real_tashkent-skyline.jpg'],
  b7: ['/buildings/real_nest-one2.jpg', '/buildings/real_nest-one2.jpg', '/buildings/real_tashkent-city.jpg'],
  b8: ['/buildings/real_tashkent-city.jpg', '/buildings/real_tashkent-skyline2.jpg', '/buildings/real_tashkent-street.jpg'],
  b9: ['/buildings/real_tashkent-city.jpg', '/buildings/real_tashkent-skyline.jpg', '/buildings/real_finance-center.jpg'],
}

// Map store categories to catalog types
const CATEGORY_TO_TYPE: Record<string, 'OFFICE' | 'SHOPPING' | 'WAREHOUSE'> = {
  OFFICE: 'OFFICE',
  COWORKING: 'OFFICE',
  RETAIL: 'SHOPPING',
  WAREHOUSE: 'WAREHOUSE',
}

const TYPE_META: Record<string, { label: string; color: string; icon: any }> = {
  OFFICE: { label: 'Ofis', color: 'blue', icon: Building2 },
  SHOPPING: { label: 'Savdo', color: 'amber', icon: ShoppingBag },
  WAREHOUSE: { label: 'Sanoat', color: 'orange', icon: Warehouse },
}

// Convert USD to UZS for display (approx rate)
const USD_TO_UZS = 12700

interface CatalogItem {
  id: string
  title: string
  district: string
  address: string
  area: number
  floor: number
  type: 'OFFICE' | 'SHOPPING' | 'WAREHOUSE'
  offerType: 'RENT' | 'SALE'
  price: number // UZS
  priceFormatted: string
  priceShort: string
  photo: string
  lat: number
  lng: number
  vip: boolean
  buildingId: string
  unitId: string
  typeLabel: string
  typeColor: string
  typeIcon: any
  link: string
}

// Generate catalog items from store units (VACANT + RESERVED) and published listings
const listings = computed<CatalogItem[]>(() => {
  const items: CatalogItem[] = []
  const seenUnitIds = new Set<string>()

  // First: published listings that have a unitId
  for (const l of store.listings) {
    if (l.status !== 'PUBLISHED') continue
    const unit = store.units.find(u => u.id === l.unitId)
    const building = store.buildings.find(b => b.id === l.buildingId)
    if (!building) continue

    const area = unit?.area || parseInt((l.titleUz.match(/(\d+)m/) || [])[1] || '0')
    const floor = unit?.floor || 0
    const catType = unit ? (CATEGORY_TO_TYPE[unit.category] || 'OFFICE') : 'OFFICE'
    const priceUZS = l.currency === 'USD' ? l.price * USD_TO_UZS : l.price
    const photo = (BUILDING_PHOTOS[building.id] || building.gallery || ['/buildings/real_tashkent-skyline.jpg'])[0]

    items.push({
      id: l.id,
      title: l.titleUz,
      district: building.district,
      address: building.address,
      area, floor,
      type: catType,
      offerType: l.offerType,
      price: priceUZS,
      priceFormatted: formatUZS(priceUZS),
      priceShort: formatUZSShort(priceUZS),
      photo,
      lat: building.lat,
      lng: building.lng,
      vip: l.viewsCount > 200,
      buildingId: building.id,
      unitId: l.unitId || '',
      link: `/listings/${l.id}`,
      typeLabel: TYPE_META[catType].label,
      typeColor: TYPE_META[catType].color,
      typeIcon: TYPE_META[catType].icon,
    })
    if (l.unitId) seenUnitIds.add(l.unitId)
  }

  // Then: vacant/reserved units not already covered by a listing
  for (const u of store.units) {
    if (u.status === 'OCCUPIED') continue
    if (seenUnitIds.has(u.id)) continue
    const building = store.buildings.find(b => b.id === u.buildingId)
    if (!building || !building.isPublished) continue

    const catType = CATEGORY_TO_TYPE[u.category] || 'OFFICE'
    const priceUZS = u.currency === 'USD' ? u.monthlyRent * USD_TO_UZS : u.monthlyRent
    const photo = (BUILDING_PHOTOS[building.id] || building.gallery || ['/buildings/real_tashkent-skyline.jpg'])[0]
    const title = `${building.name} · ${u.unitNumber} · ${u.area} m²`

    items.push({
      id: `unit-${u.id}`,
      title,
      district: building.district,
      address: building.address,
      area: u.area,
      floor: u.floor,
      type: catType,
      offerType: 'RENT',
      price: priceUZS,
      priceFormatted: formatUZS(priceUZS),
      priceShort: formatUZSShort(priceUZS),
      photo,
      lat: building.lat,
      lng: building.lng,
      vip: u.area >= 200,
      buildingId: building.id,
      unitId: u.id,
      link: `/buildings/${building.slug}`,
      typeLabel: TYPE_META[catType].label,
      typeColor: TYPE_META[catType].color,
      typeIcon: TYPE_META[catType].icon,
    })
  }

  return items
})

const vipListings = computed(() => listings.value.filter(l => l.vip))

const districts = computed(() => [...new Set(listings.value.map(l => l.district))].sort())

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
    result = result.filter(l => l.title.toLowerCase().includes(q) || l.address.toLowerCase().includes(q) || l.district.toLowerCase().includes(q))
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
const totalBuildings = computed(() => store.buildings.length)
const availableUnits = computed(() => store.units.filter((u: any) => u.status === "VACANT").length)
const totalViews = computed(() => store.listings.reduce((s: number, l: any) => s + (l.viewsCount || 0), 0))
const avgPrice = computed(() => { const prices = store.listings.map((l: any) => l.price || 0).filter(Boolean); return prices.length ? Math.round(prices.reduce((a: number, b: number) => a + b, 0) / prices.length / 1000000) : 0 })

</script>

<style scoped>
.catalog-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f4f4f5;
  overflow-x: hidden;
  max-width: 100vw;
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
  background: var(--accent);
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
.catalog-cta-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; background: linear-gradient(135deg, #2563EB, #1D4ED8); color: white; font-size: 13px; font-weight: 600; border-radius: 10px; transition: all 0.35s cubic-bezier(0.4,0,0.2,1); box-shadow: 0 4px 12px -2px rgba(37,99,235,0.3); position: relative; overflow: hidden; text-decoration: none; }
.catalog-cta-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%); transform: translateX(-100%); transition: transform 0.6s; }
.catalog-cta-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 20px -4px rgba(37,99,235,0.4); }
.catalog-cta-btn:hover::after { transform: translateX(100%); }
.catalog-cta-btn-hover { background: linear-gradient(135deg, #0052CC 0%, #2563EB 100%); box-shadow: 0 4px 16px rgba(0,102,255,0.35); transform: translateY(-1px); }

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
.catalog-view-toggle button.active { background: var(--bg-card); color: var(--accent-hover); box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
.dark .catalog-view-toggle button.active { background: #27272a; color: var(--accent); }
.catalog-filter-btn {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; color: #52525b;
  padding: 8px 14px; border-radius: 10px;
  border: 1px solid var(--border);
}
.dark .catalog-filter-btn { color: #d4d4d8; border-color: rgba(255,255,255,0.08); }
.catalog-filter-btn__count {
  background: var(--accent-hover); color: white; font-size: 10px; font-weight: 700;
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
.catalog-chip--active { background: rgba(37,99,235,0.1); color: var(--accent-hover); }
.dark .catalog-chip--active { background: rgba(37,99,235,0.15); color: var(--accent); }
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
  border: 1px solid var(--border); color: #52525b;
}
.catalog-vip__nav button:hover { background: rgba(0,0,0,0.04); }
.catalog-vip__nav button:disabled { opacity: 0.4; cursor: not-allowed; }
.dark .catalog-vip__nav button { border-color: rgba(255,255,255,0.08); color: #d4d4d8; }

.catalog-vip__scroll {
  display: flex; gap: 12px; overflow-x: auto; scrollbar-width: none;
  scroll-behavior: smooth;
}
.catalog-vip__scroll::-webkit-scrollbar { display: none; }
.vip-card { position: relative; border-radius: 20px; overflow: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); cursor: pointer; }
.vip-card:hover { transform: translateY(-6px); }
.vip-card__image { border-radius: 18px;
  position: relative; width: 300px; height: 220px; border-radius: 18px; overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}
.vip-card:hover .vip-card__image { border-radius: 18px; box-shadow: 0 12px 36px rgba(0,0,0,0.15); }
.vip-card__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.vip-card:hover .vip-card__image img { transform: scale(1.06); }
.vip-card__badge {
  position: absolute; top: 12px; left: 12px;
  font-size: 10px; font-weight: 800; letter-spacing: 0.06em;
  background: linear-gradient(135deg, #f59e0b, #d97706); color: white;
  padding: 5px 12px; border-radius: 8px;
  box-shadow: 0 2px 8px rgba(245,158,11,0.3);
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
.listing-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); cursor: pointer; }
.listing-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent);
  opacity: 0; transition: opacity 0.3s;
}
.listing-card:hover::before { opacity: 1; }
.dark .listing-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); cursor: pointer; }
.listing-card:hover, .listing-card--active { border-color: rgba(37,99,235,0.4); box-shadow: none; transform: translateY(-2px); }
.listing-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); cursor: pointer; }
.listing-card--active { border-color: var(--accent); background: rgba(37,99,235,0.05); box-shadow: 0 6px 20px rgba(37,99,235,0.18), 0 0 0 1px rgba(37,99,235,0.3); }
.dark .listing-card--active { background: rgba(37,99,235,0.08); }
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
  color: white; background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%); padding: 6px 12px; border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,102,255,0.2), inset 0 1px 0 rgba(255,255,255,0.15); transition: all 0.2s;
}
.listing-card:hover .listing-card__cta { box-shadow: 0 4px 12px rgba(0,102,255,0.3); }

/* Grid view */
.catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
.grid-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); cursor: pointer; position: relative; }
.dark .grid-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); cursor: pointer; position: relative; }
.grid-card:hover { border-color: rgba(37,99,235,0.2); transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
.grid-card__image img { transition: transform 0.5s; }
.grid-card:hover .grid-card__image img { transform: scale(1.06); }
.grid-card__image { position: relative; width: 100%; height: 180px; overflow: hidden; }
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
.grid-card__body { padding: 14px 16px 16px; }
.grid-card__title { font-size: 14px; font-weight: 700; color: #18181b; margin-bottom: 5px; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; letter-spacing: -0.01em; }
.dark .grid-card__title { color: #fff; }
.grid-card__address { display: flex; align-items: center; gap: 3px; font-size: 11px; color: #a1a1aa; margin-bottom: 6px; }
.grid-card__specs { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #71717a; margin-bottom: 8px; }
.grid-card__price { font-size: 16px; font-weight: 800; color: #ea580c; letter-spacing: -0.02em; }

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
  .catalog-topbar__search { max-width: 120px; }
  .catalog-cta-btn span { display: none; }
  .catalog-lang-btn { display: none; }
  .catalog-topbar__right { gap: 4px; }
  .catalog-toolbar { flex-direction: column; gap: 8px; align-items: stretch; }
  .catalog-tabs { justify-content: center; }
  .catalog-toolbar__actions { justify-content: center; }
  .vip-card { position: relative; border-radius: 20px; overflow: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); cursor: pointer; }
  .vip-card__image { border-radius: 18px; width: 240px; height: 170px; }
  .catalog-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
}
.kpi-strip {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--card-bg, rgba(255,255,255,0.9));
  border: 1px solid var(--border);
  position: relative; overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.kpi-strip:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--blue::before { background: #3b82f6; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); }
.kpi-strip--blue .kpi-strip__icon { background: rgba(59,130,246,0.1); }
.kpi-strip__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.dash-kpi__body { flex: 1; min-width: 0; }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.dash-kpi__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }


.catalog-kpi { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
@media (max-width: 768px) { .catalog-kpi { grid-template-columns: repeat(2, 1fr); } }


/* CATALOG HERO */
.catalog-hero { position: relative; height: 220px; overflow: hidden; }
.catalog-hero__bg { position: absolute; inset: 0; }
.catalog-hero__img { width: 100%; height: 100%; object-fit: cover; }
.catalog-hero__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,10,26,0.5) 0%, rgba(10,10,26,0.75) 100%); }
.catalog-hero__content { position: relative; z-index: 1; max-width: 720px; padding: 40px 24px; }
.catalog-hero__tag { font-size: 11px; font-weight: 700; letter-spacing: 0.18em; color: #60a5fa; text-transform: uppercase; margin-bottom: 10px; }
.catalog-hero__title { font-size: 34px; font-weight: 800; color: #fff; line-height: 1.15; letter-spacing: -0.04em; font-family: 'Sora', sans-serif; animation: fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
.catalog-hero__sub { font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.5; max-width: 560px; }
@media (max-width: 768px) { .catalog-hero { height: 180px; } .catalog-hero__title { font-size: 34px; font-weight: 800; color: #fff; line-height: 1.15; letter-spacing: -0.04em; font-family: 'Sora', sans-serif; animation: fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both; } .catalog-hero__sub { display: none; } }

</style>

@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
