<template>
  <div class="catalog-page">
    <!-- ============ TOP BAR ============ -->
    <header class="catalog-topbar">
      <div class="catalog-topbar__left">
        <NuxtLink to="/" class="catalog-logo">
          <div class="catalog-logo__icon">M</div>
          <span class="catalog-logo__text">MAKON</span>
        </NuxtLink>
        <NuxtLink to="/catalog" class="catalog-topbar__pill">Ob'ekt joylash</NuxtLink>
      </div>

      <div class="catalog-topbar__right">
        <button class="catalog-icon-btn" title="Sevimlilar" @click="toggleFavoritesView">
          <Heart :size="18" :fill="favoritesView ? '#ef4444' : 'none'" :class="favoritesView ? 'text-red-500' : ''" />
          <span v-if="favorites.size > 0" class="catalog-icon-btn__badge">{{ favorites.size }}</span>
        </button>
        <button class="catalog-icon-btn" title="Solishtirish">
          <GitCompareArrows :size="18" />
        </button>
        <button class="catalog-lang-btn" @click="toggleLang">{{ lang.toUpperCase() }}</button>
        <button class="catalog-icon-btn" title="Yordam">
          <CircleHelp :size="18" />
        </button>
        <ThemeToggle />
        <button class="catalog-profile-btn">
          <div class="catalog-profile-btn__avatar">FM</div>
          <ChevronDown :size="14" class="text-ink-500" />
        </button>
      </div>
    </header>

    <!-- ============ MOBILE VIEW SWITCH ============ -->
    <div class="catalog-mobile-switch lg:hidden">
      <button :class="{ active: mobileView === 'list' }" @click="mobileView = 'list'">
        <List :size="15" /> Ro'yxat
      </button>
      <button :class="{ active: mobileView === 'map' }" @click="mobileView = 'map'">
        <MapPin :size="15" /> Xarita
      </button>
      <button class="catalog-mobile-switch__filters" @click="showFilterDrawer = true">
        <SlidersHorizontal :size="15" /> Filtrlar
      </button>
    </div>

    <!-- ============ MAIN BODY ============ -->
    <div class="catalog-body">

      <!-- ---------- SIDEBAR FILTERS (desktop) ---------- -->
      <aside class="catalog-sidebar hidden lg:flex">
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

      <!-- ---------- LISTINGS COLUMN ---------- -->
      <section
        class="catalog-listings"
        :class="{ 'catalog-listings--mobile-hidden': mobileView !== 'list' }"
      >
        <div class="catalog-listings__header">
          <div class="catalog-listings__count">{{ filteredListings.length }} ta mavjud variant</div>
          <div class="catalog-region-select">
            <MapPin :size="14" class="text-ink-500" />
            <select v-model="filters.region" class="catalog-region-select__input">
              <option value="">Barcha hududlar</option>
              <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
            </select>
            <ChevronDown :size="14" class="text-ink-500" />
          </div>
        </div>

        <div v-if="filteredListings.length === 0" class="catalog-empty">
          <SearchX :size="40" class="text-ink-300 mb-3" />
          <p class="text-ink-500 mb-4">Filtr bo'yicha obyektlar topilmadi</p>
          <button class="btn btn-secondary btn-sm" @click="resetFilters">Filtrlarni tozalash</button>
        </div>

        <div class="catalog-listings__list">
          <div
            v-for="item in filteredListings"
            :id="`listing-${item.id}`"
            :key="item.id"
            class="listing-card"
            :class="{ 'listing-card--active': activeId === item.id }"
            @mouseenter="activeId = item.id"
            @mouseleave="activeId = null"
          >
            <NuxtLink :to="`/listings/${item.id}`" class="listing-card__photo">
              <img :src="item.photo" :alt="item.title" loading="lazy" />
              <button
                class="listing-card__fav"
                @click.prevent="toggleFavorite(item.id)"
              >
                <Heart :size="15" :fill="favorites.has(item.id) ? '#ef4444' : 'none'" :class="favorites.has(item.id) ? 'text-red-500' : 'text-ink-400'" />
              </button>
              <span class="listing-card__type-badge" :class="`listing-card__type-badge--${item.typeColor}`">
                {{ item.typeLabel }}
              </span>
            </NuxtLink>

            <div class="listing-card__body">
              <NuxtLink :to="`/listings/${item.id}`" class="listing-card__title">{{ item.title }}</NuxtLink>
              <div class="listing-card__address">
                <MapPin :size="12" />
                <span>{{ item.address }}</span>
              </div>
              <div class="listing-card__meta">
                <span><Ruler :size="12" /> {{ item.area }} m²</span>
                <span><component :is="item.typeIcon" :size="12" /> {{ item.typeLabel }}</span>
              </div>
              <div class="listing-card__footer">
                <span class="listing-card__price">{{ item.priceFormatted }}</span>
                <NuxtLink :to="`/listings/${item.id}`" class="listing-card__cta">
                  Batafsil <ArrowRight :size="14" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ---------- MAP COLUMN ---------- -->
      <section
        class="catalog-map-col"
        :class="{ 'catalog-map-col--mobile-hidden': mobileView !== 'map' }"
      >
        <ClientOnly>
          <CatalogMap
            :listings="mapListings"
            :center="[41.2995, 69.2401]"
            :zoom="11"
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
  Heart, GitCompareArrows, CircleHelp, ChevronDown, List, MapPin,
  SlidersHorizontal, SearchX, Ruler, ArrowRight, X, Building2,
  ShoppingBag, Warehouse, Home as HomeIcon,
} from 'lucide-vue-next'

definePageMeta({ layout: false })

useHead({ title: "Katalog — MAKON" })

// ---------------- Mock data (realistic Tashkent listings) ----------------
interface RawListing {
  id: string
  title: string
  district: string
  address: string
  area: number
  type: 'OFFICE' | 'SHOPPING' | 'WAREHOUSE' | 'RESIDENTIAL'
  offerType: 'RENT' | 'SALE'
  price: number
  photo: string
  lat: number
  lng: number
}

const rawListings: RawListing[] = [
  { id: 'l1', title: "Yunusobodda ijaraga xonadon", district: 'Yunusobod', address: "Toshkent sh., Yunusobod tumani, Labzak ko'chasi 18", area: 54.21, type: 'RESIDENTIAL', offerType: 'RENT', price: 815860500, photo: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80', lat: 41.3453, lng: 69.2884 },
  { id: 'l2', title: "Yunusobodda sotuvga xonadon", district: 'Yunusobod', address: "Toshkent sh., Yunusobod tumani, Labzak ko'chasi 18", area: 75.37, type: 'RESIDENTIAL', offerType: 'SALE', price: 1134318500, photo: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80', lat: 41.3502, lng: 69.2795 },
  { id: 'l3', title: "Chinor Turar-joy Majmuasida qulay xonadon", district: 'Chilonzor', address: "Toshkent sh., Chilonzor tumani, Bunyodkor shoh ko'chasi 12", area: 59.84, type: 'RESIDENTIAL', offerType: 'SALE', price: 999328000, photo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80', lat: 41.2789, lng: 69.2034 },
  { id: 'l4', title: "Ombor-4 binosida logistika uchun ombor", district: 'Bektemir', address: "Toshkent sh., Bektemir tumani, Guliston ko'chasi 15", area: 560.94, type: 'WAREHOUSE', offerType: 'RENT', price: 2636418000, photo: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&q=80', lat: 41.2312, lng: 69.3452 },
  { id: 'l5', title: "Ombor-3 binosida logistika uchun ombor", district: 'Sergeli', address: "Toshkent sh., Sergeli tumani, Qatortol ko'chasi 4", area: 480.20, type: 'WAREHOUSE', offerType: 'RENT', price: 1886200000, photo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80', lat: 41.2156, lng: 69.2456 },
  { id: 'l6', title: "Tashkent City biznes markazida ofis", district: 'Mirzo Ulug\'bek', address: "Toshkent sh., Mirzo Ulug'bek tumani, Amir Temur shoh ko'chasi 108", area: 120.5, type: 'OFFICE', offerType: 'RENT', price: 1599200000, photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80', lat: 41.3111, lng: 69.2797 },
  { id: 'l7', title: "Trillant Tower'da premium ofis", district: 'Yashnobod', address: "Toshkent sh., Yashnobod tumani, Ziyolilar ko'chasi 6", area: 95.0, type: 'OFFICE', offerType: 'SALE', price: 1153700000, photo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=80', lat: 41.2967, lng: 69.3123 },
  { id: 'l8', title: "IT Park'da zamonaviy ofis maydoni", district: 'Yakkasaroy', address: "Toshkent sh., Yakkasaroy tumani, Mirobod ko'chasi 22", area: 88.3, type: 'OFFICE', offerType: 'RENT', price: 936000000, photo: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&q=80', lat: 41.2865, lng: 69.2654 },
  { id: 'l9', title: "Piramit savdo majmuasida do'kon", district: 'Shayxontohur', address: "Toshkent sh., Shayxontohur tumani, Navoiy ko'chasi 34", area: 65.0, type: 'SHOPPING', offerType: 'RENT', price: 1188900000, photo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80', lat: 41.3267, lng: 69.2389 },
  { id: 'l10', title: "Chilonzor savdo markazida joy", district: 'Chilonzor', address: "Toshkent sh., Chilonzor tumani, Bunyodkor shoh ko'chasi 45", area: 42.0, type: 'SHOPPING', offerType: 'SALE', price: 1064600000, photo: 'https://images.unsplash.com/photo-1555529771-7888783a18d3?w=500&q=80', lat: 41.2701, lng: 69.1987 },
  { id: 'l11', title: "Olmazorda yangi turar-joy", district: 'Olmazor', address: "Toshkent sh., Olmazor tumani, Bogishamol ko'chasi 9", area: 68.5, type: 'RESIDENTIAL', offerType: 'SALE', price: 785888000, photo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80', lat: 41.3356, lng: 69.1765 },
  { id: 'l12', title: "Bektemir'da katta ombor majmuasi", district: 'Bektemir', address: "Toshkent sh., Bektemir tumani, Sanoat ko'chasi 3", area: 720.0, type: 'WAREHOUSE', offerType: 'RENT', price: 1455400000, photo: 'https://images.unsplash.com/photo-1601599963565-b7f49deb2029?w=500&q=80', lat: 41.2089, lng: 69.3612 },
  { id: 'l13', title: "Mirobod hududida biznes ofis", district: 'Mirobod', address: "Toshkent sh., Mirobod tumani, Shota Rustaveli ko'chasi 7", area: 110.0, type: 'OFFICE', offerType: 'RENT', price: 912600000, photo: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80', lat: 41.2934, lng: 69.2945 },
  { id: 'l14', title: "Yashnobodda ombor xizmatlari", district: 'Yashnobod', address: "Toshkent sh., Yashnobod tumani, Katortol ko'chasi 11", area: 340.0, type: 'WAREHOUSE', offerType: 'RENT', price: 1113700000, photo: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500&q=80', lat: 41.3045, lng: 69.3287 },
]

const TYPE_META: Record<string, { label: string; color: string; icon: any }> = {
  OFFICE: { label: 'Ofis', color: 'blue', icon: Building2 },
  SHOPPING: { label: 'Savdo', color: 'amber', icon: ShoppingBag },
  WAREHOUSE: { label: 'Sanoat', color: 'orange', icon: Warehouse },
  RESIDENTIAL: { label: 'Turar-joy', color: 'green', icon: HomeIcon },
}

function formatPriceFull(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + " so'm"
}

function formatPriceShort(price: number) {
  return (price / 1_000_000).toFixed(1) + 'M'
}

const listings = computed(() => rawListings.map(r => ({
  ...r,
  title: r.title,
  typeLabel: TYPE_META[r.type].label,
  typeColor: TYPE_META[r.type].color,
  typeIcon: TYPE_META[r.type].icon,
  priceFormatted: formatPriceFull(r.price),
  priceShort: formatPriceShort(r.price),
})))

const districts = computed(() => [...new Set(rawListings.map(r => r.district))].sort())

// ---------------- Filters state ----------------
const filters = reactive({
  search: '',
  sort: '',
  offerType: '' as '' | 'RENT' | 'SALE',
  propertyType: '' as '' | 'OFFICE' | 'SHOPPING' | 'WAREHOUSE' | 'RESIDENTIAL',
  priceMin: null as number | null,
  priceMax: null as number | null,
  areaMin: null as number | null,
  areaMax: null as number | null,
  amenities: '',
  region: '',
})

function resetFilters() {
  filters.search = ''
  filters.sort = ''
  filters.offerType = ''
  filters.propertyType = ''
  filters.priceMin = null
  filters.priceMax = null
  filters.areaMin = null
  filters.areaMax = null
  filters.amenities = ''
  filters.region = ''
}

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

  return result
})

const mapListings = computed(() => filteredListings.value.map(l => ({
  id: l.id,
  lat: l.lat,
  lng: l.lng,
  priceLabel: l.priceShort,
  title: l.title,
  href: `/listings/${l.id}`,
  active: activeId.value === l.id,
})))

// ---------------- UI state ----------------
const activeId = ref<string | null>(null)
const favorites = ref<Set<string>>(new Set())
const favoritesView = ref(false)
const lang = ref<'uz' | 'ru'>('uz')
const mobileView = ref<'list' | 'map'>('list')
const showFilterDrawer = ref(false)

function toggleFavorite(id: string) {
  if (favorites.value.has(id)) favorites.value.delete(id)
  else favorites.value.add(id)
  favorites.value = new Set(favorites.value)
}

function toggleFavoritesView() {
  favoritesView.value = !favoritesView.value
}

function toggleLang() {
  lang.value = lang.value === 'uz' ? 'ru' : 'uz'
}

function handleMarkerSelect(id: string) {
  activeId.value = id
  mobileView.value = 'list'
  nextTick(() => {
    document.getElementById(`listing-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}
</script>

<style scoped>
.catalog-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  background: #f4f4f5;
  overflow: hidden;
}
.dark .catalog-page {
  background: #09090b;
}

/* ============ TOP BAR ============ */
.catalog-topbar {
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  z-index: 50;
}
.dark .catalog-topbar {
  background: #18181b;
  border-bottom-color: rgba(255,255,255,0.06);
}
.catalog-topbar__left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.catalog-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.catalog-logo__icon {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
}
.catalog-logo__text {
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.02em;
  color: #18181b;
}
.dark .catalog-logo__text { color: #fff; }
.catalog-topbar__pill {
  font-size: 13px;
  font-weight: 500;
  color: #4f46e5;
  background: rgba(99,102,241,0.08);
  padding: 6px 12px;
  border-radius: 8px;
}
.dark .catalog-topbar__pill { color: #818cf8; }
.catalog-topbar__right {
  display: flex;
  align-items: center;
  gap: 6px;
}
.catalog-icon-btn {
  position: relative;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  color: #71717a;
  background: transparent;
  transition: all 0.15s;
}
.catalog-icon-btn:hover { background: rgba(0,0,0,0.05); color: #18181b; }
.dark .catalog-icon-btn:hover { background: rgba(255,255,255,0.06); color: #fff; }
.catalog-icon-btn__badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: white;
  font-size: 9px;
  font-weight: 700;
  min-width: 15px;
  height: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
}
.catalog-lang-btn {
  font-size: 12px;
  font-weight: 700;
  color: #71717a;
  padding: 6px 10px;
  border-radius: 8px;
}
.catalog-lang-btn:hover { background: rgba(0,0,0,0.05); }
.catalog-profile-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px 3px 3px;
  border-radius: 20px;
  margin-left: 4px;
}
.catalog-profile-btn:hover { background: rgba(0,0,0,0.05); }
.catalog-profile-btn__avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ============ MOBILE SWITCH ============ */
.catalog-mobile-switch {
  display: flex;
  gap: 6px;
  padding: 8px 12px;
  background: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  flex-shrink: 0;
}
.dark .catalog-mobile-switch { background: #18181b; border-bottom-color: rgba(255,255,255,0.06); }
.catalog-mobile-switch button {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  font-weight: 600;
  padding: 7px 12px;
  border-radius: 8px;
  color: #71717a;
  background: rgba(0,0,0,0.04);
}
.catalog-mobile-switch button.active {
  background: #4f46e5;
  color: white;
}
.catalog-mobile-switch__filters {
  margin-left: auto;
}

/* ============ BODY ============ */
.catalog-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
}

/* ============ SIDEBAR ============ */
.catalog-sidebar {
  width: 300px;
  flex-shrink: 0;
  border-right: 1px solid rgba(0,0,0,0.06);
  background: #ffffff;
  overflow-y: auto;
}
.dark .catalog-sidebar { background: #18181b; border-right-color: rgba(255,255,255,0.06); }

/* ============ LISTINGS ============ */
.catalog-listings {
  flex: 1 1 480px;
  min-width: 340px;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-right: 1px solid rgba(0,0,0,0.06);
}
.dark .catalog-listings { border-right-color: rgba(255,255,255,0.06); }
.catalog-listings__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  flex-shrink: 0;
}
.dark .catalog-listings__header { border-bottom-color: rgba(255,255,255,0.05); }
.catalog-listings__count {
  font-size: 14px;
  font-weight: 700;
  color: #18181b;
}
.dark .catalog-listings__count { color: #fff; }
.catalog-region-select {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  color: #71717a;
  background: rgba(0,0,0,0.04);
  padding: 5px 8px;
  border-radius: 8px;
}
.catalog-region-select__input {
  background: transparent;
  border: none;
  font-size: 12.5px;
  color: #52525b;
  max-width: 130px;
}
.dark .catalog-region-select { background: rgba(255,255,255,0.06); }
.dark .catalog-region-select__input { color: #d4d4d8; }

.catalog-listings__list {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.catalog-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

/* Listing card */
.listing-card {
  display: flex;
  gap: 12px;
  padding: 10px;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.06);
  background: #ffffff;
  transition: all 0.15s ease;
  cursor: pointer;
}
.dark .listing-card { background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.06); }
.listing-card:hover, .listing-card--active {
  border-color: rgba(99,102,241,0.4);
  box-shadow: 0 4px 16px rgba(99,102,241,0.12);
}
.listing-card__photo {
  position: relative;
  width: 128px;
  height: 96px;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  display: block;
}
.listing-card__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.listing-card__fav {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}
.listing-card__type-badge {
  position: absolute;
  bottom: 6px;
  left: 6px;
  font-size: 9.5px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  color: white;
}
.listing-card__type-badge--green { background: #059669; }
.listing-card__type-badge--blue { background: #2563eb; }
.listing-card__type-badge--amber { background: #d97706; }
.listing-card__type-badge--orange { background: #ea580c; }

.listing-card__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 2px 2px 2px 0;
}
.listing-card__title {
  font-size: 13.5px;
  font-weight: 700;
  color: #18181b;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.dark .listing-card__title { color: #fff; }
.listing-card__address {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #a1a1aa;
  line-height: 1.3;
}
.listing-card__address span {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.listing-card__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: #71717a;
}
.listing-card__meta span {
  display: flex;
  align-items: center;
  gap: 3px;
}
.listing-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
.listing-card__price {
  font-size: 13.5px;
  font-weight: 800;
  color: #ea580c;
  letter-spacing: -0.02em;
}
.listing-card__cta {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 11.5px;
  font-weight: 600;
  color: white;
  background: #4f46e5;
  padding: 5px 10px;
  border-radius: 8px;
}

/* ============ MAP COLUMN ============ */
.catalog-map-col {
  flex: 1;
  min-width: 300px;
  position: relative;
}
.catalog-map-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a1a1aa;
  background: #eef0f4;
}

/* ============ MOBILE ============ */
@media (max-width: 1023px) {
  .catalog-body { flex-direction: column; }
  .catalog-listings { max-width: none; border-right: none; flex: 1; }
  .catalog-listings--mobile-hidden { display: none; }
  .catalog-map-col--mobile-hidden { display: none; }
}

/* ============ FILTER DRAWER ============ */
.catalog-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
}
.catalog-drawer {
  width: 100%;
  max-width: 360px;
  background: #ffffff;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.dark .catalog-drawer { background: #18181b; }
.catalog-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.catalog-drawer__body {
  flex: 1;
  overflow-y: auto;
}
.catalog-drawer__footer {
  padding: 16px;
  border-top: 1px solid rgba(0,0,0,0.06);
}
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.2s; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; }
</style>
