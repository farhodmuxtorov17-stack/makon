<template>
  <div class="catalog-page">
    <!-- TOP BAR -->
    <header class="topbar">
      <div class="topbar__left">
        <NuxtLink to="/" class="logo">
          <div class="logo__icon">M</div>
          <span>MAKON</span>
        </NuxtLink>
        <div class="topbar__search">
          <Search :size="16" class="text-ink-400" />
          <input v-model="filters.search" type="text" placeholder="Ofis, savdo, ombor qidirish..." @keyup.enter="applySearch" />
        </div>
      </div>
      <div class="topbar__right">
        <ThemeToggle />
        <NuxtLink to="/login" class="topbar__login">Kirish</NuxtLink>
        <NuxtLink to="/register/eri" class="topbar__cta">Ro'yxatdan o'tish</NuxtLink>
      </div>
    </header>

    <!-- TABS -->
    <div class="tabs-bar">
      <div class="tabs">
        <button :class="{ active: filters.offerType === '' }" @click="filters.offerType = ''">Barchasi</button>
        <button :class="{ active: filters.offerType === 'RENT' }" @click="filters.offerType = 'RENT'">Ijaraga</button>
        <button :class="{ active: filters.offerType === 'SALE' }" @click="filters.offerType = 'SALE'">Sotish</button>
      </div>
      <div class="results-count">Topildi: <b>{{ filteredListings.length }}</b></div>
    </div>

    <!-- BODY -->
    <div class="catalog-body">
      <aside class="catalog-sidebar">
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

      <section class="catalog-grid">
        <NuxtLink
          v-for="item in filteredListings"
          :key="item.id"
          :to="`/listings/${item.id}`"
          class="grid-card"
        >
          <div class="grid-card__image">
            <img :src="item.photo" :alt="item.title" loading="lazy" />
            <span class="grid-card__badge" :class="`grid-card__badge--${item.typeColor}`">{{ item.typeLabel }}</span>
          </div>
          <div class="grid-card__body">
            <div class="grid-card__title">{{ item.title }}</div>
            <div class="grid-card__addr"><MapPin :size="12" /> {{ item.address }}</div>
            <div class="grid-card__meta">{{ item.area }} m² · {{ item.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvga' }}</div>
            <div class="grid-card__price">{{ item.priceFormatted }}</div>
          </div>
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, MapPin, Building2, ShoppingBag, Warehouse } from 'lucide-vue-next'
import FilterPanel from '~/components/FilterPanel.vue'

definePageMeta({ layout: false })
const { formatUZS } = useFormat()
useHead({ title: "Katalog — MAKON" })

const TYPE_META: Record<string, { label: string; color: string }> = {
  OFFICE: { label: 'Ofis', color: 'blue' },
  SHOPPING: { label: 'Savdo', color: 'amber' },
  WAREHOUSE: { label: 'Sanoat', color: 'orange' },
}

const rawListings = [
  { id: 'l1', title: "Tashkent City A-301 · 85 m²", district: "Mirzo Ulug'bek", address: "Amir Temur shoh 108", area: 85, type: 'OFFICE', offerType: 'RENT', price: 25000000, photo: '/buildings/hero-tashkent.jpg' },
  { id: 'l2', title: "Trillant Tower B-501 · 120 m²", district: 'Yashnobod', address: "Ziyolilar 6", area: 120, type: 'OFFICE', offerType: 'RENT', price: 35000000, photo: '/buildings/bc-navroz.jpg' },
  { id: 'l3', title: "IT Park C-201 · 65 m² savdo", district: 'Yakkasaray', address: "Mirobod 22", area: 65, type: 'SHOPPING', offerType: 'RENT', price: 18000000, photo: '/buildings/bc-city-plaza.jpg' },
  { id: 'l4', title: "Piramit D-102 · 200 m² ombor", district: 'Shayxontohur', address: "Navoiy 34", area: 200, type: 'WAREHOUSE', offerType: 'RENT', price: 12000000, photo: '/buildings/hero-tashkent.jpg' },
  { id: 'l5', title: "Savdo Markaz E-301 · 42 m²", district: 'Sergeli', address: "Qatortol 4", area: 42, type: 'SHOPPING', offerType: 'SALE', price: 450000000, photo: '/buildings/bc-navroz.jpg' },
  { id: 'l6', title: "Business Center F-205 · 95 m²", district: 'Chilonzor', address: "Bunyodkor 45", area: 95, type: 'OFFICE', offerType: 'RENT', price: 22000000, photo: '/buildings/bc-city-plaza.jpg' },
  { id: 'l7', title: "Ombor majmuasi G-001 · 560 m²", district: 'Bektemir', address: "Guliston 15", area: 560, type: 'WAREHOUSE', offerType: 'RENT', price: 68000000, photo: '/buildings/hero-tashkent.jpg' },
  { id: 'l8', title: "Mirobod biznes · 110 m²", district: 'Mirobod', address: "Shota Rustaveli 7", area: 110, type: 'OFFICE', offerType: 'RENT', price: 28000000, photo: '/buildings/bc-navroz.jpg' },
  { id: 'l9', title: "Yashnobod ombor · 340 m²", district: 'Yashnobod', address: "Qatortol 11", area: 340, type: 'WAREHOUSE', offerType: 'RENT', price: 45000000, photo: '/buildings/bc-city-plaza.jpg' },
  { id: 'l10', title: "Tashkent City A-502 · 60 m²", district: "Mirzo Ulug'bek", address: "Amir Temur 108", area: 60, type: 'SHOPPING', offerType: 'SALE', price: 850000000, photo: '/buildings/hero-tashkent.jpg' },
  { id: 'l11', title: "Chilonzor BC · 75 m² ofis", district: 'Chilonzor', address: "Bunyodkor 12", area: 75, type: 'OFFICE', offerType: 'RENT', price: 19500000, photo: '/buildings/bc-navroz.jpg' },
  { id: 'l12', title: "Bektemir sanoat · 720 m²", district: 'Bektemir', address: "Sanoat 3", area: 720, type: 'WAREHOUSE', offerType: 'RENT', price: 89000000, photo: '/buildings/bc-city-plaza.jpg' },
]

const listings = computed(() => rawListings.map(r => ({
  ...r,
  typeLabel: TYPE_META[r.type].label,
  typeColor: TYPE_META[r.type].color,
  priceFormatted: formatUZS(r.price),
})))

const filters = reactive({
  search: '', sort: '', offerType: '' as '' | 'RENT' | 'SALE',
  propertyType: '' as '' | 'OFFICE' | 'SHOPPING' | 'WAREHOUSE',
  priceMin: null as number | null, priceMax: null as number | null,
  areaMin: null as number | null, areaMax: null as number | null,
  amenities: '',
})

function resetFilters() {
  Object.assign(filters, { search: '', sort: '', offerType: '', propertyType: '', priceMin: null, priceMax: null, areaMin: null, areaMax: null, amenities: '' })
}

function applySearch() { /* reactive filter handles it */ }

const filteredListings = computed(() => {
  let r = listings.value
  if (filters.search) r = r.filter(l => l.title.toLowerCase().includes(filters.search.toLowerCase()) || l.address.toLowerCase().includes(filters.search.toLowerCase()))
  if (filters.offerType) r = r.filter(l => l.offerType === filters.offerType)
  if (filters.propertyType) r = r.filter(l => l.type === filters.propertyType)
  if (filters.priceMin) r = r.filter(l => l.price >= filters.priceMin!)
  if (filters.priceMax) r = r.filter(l => l.price <= filters.priceMax!)
  if (filters.areaMin) r = r.filter(l => l.area >= filters.areaMin!)
  if (filters.areaMax) r = r.filter(l => l.area <= filters.areaMax!)
  if (filters.sort === 'price_asc') r = [...r].sort((a, b) => a.price - b.price)
  if (filters.sort === 'price_desc') r = [...r].sort((a, b) => b.price - a.price)
  if (filters.sort === 'area_desc') r = [...r].sort((a, b) => b.area - a.area)
  return r
})
</script>

<style scoped>
.catalog-page { min-height: 100vh; background: var(--bg); }

/* TOPBAR */
.topbar { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--ink-100); padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
.topbar__left { display: flex; align-items: center; gap: 24px; }
.logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: var(--ink-900); font-weight: 800; font-size: 18px; }
.logo__icon { width: 32px; height: 32px; border-radius: 9px; background: var(--blue-600); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; }
.topbar__search { display: flex; align-items: center; gap: 8px; background: var(--ink-50); border: 1px solid var(--ink-100); border-radius: 12px; padding: 8px 14px; width: 360px; }
.topbar__search input { border: none; outline: none; background: transparent; font-size: 14px; width: 100%; color: var(--ink-900); }
.topbar__right { display: flex; align-items: center; gap: 14px; }
.topbar__login { font-size: 14px; color: var(--ink-600); text-decoration: none; font-weight: 500; }
.topbar__login:hover { color: var(--ink-900); }
.topbar__cta { background: var(--blue-600); color: white; padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; text-decoration: none; transition: background 0.2s; }
.topbar__cta:hover { background: var(--blue-700); }

/* TABS */
.tabs-bar { max-width: 1200px; margin: 0 auto; padding: 24px 24px 0; display: flex; align-items: center; justify-content: space-between; }
.tabs { display: flex; gap: 8px; }
.tabs button { padding: 8px 18px; border: none; background: transparent; font-size: 14px; font-weight: 500; color: var(--ink-400); border-radius: 10px; cursor: pointer; transition: all 0.2s; }
.tabs button:hover { color: var(--ink-700); background: var(--ink-50); }
.tabs button.active { background: var(--ink-900); color: white; }
.results-count { font-size: 14px; color: var(--ink-400); }
.results-count b { color: var(--ink-900); }

/* BODY */
.catalog-body { max-width: 1200px; margin: 0 auto; padding: 24px; display: grid; grid-template-columns: 260px 1fr; gap: 24px; }

/* GRID */
.catalog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.grid-card { border-radius: 16px; overflow: hidden; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.06); text-decoration: none; transition: transform 0.3s, box-shadow 0.3s; }
.grid-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.1); }
.grid-card__image { position: relative; aspect-ratio: 4/3; overflow: hidden; }
.grid-card__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.grid-card:hover .grid-card__image img { transform: scale(1.05); }
.grid-card__badge { position: absolute; top: 12px; left: 12px; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 600; color: white; }
.grid-card__badge--blue { background: var(--blue-600); }
.grid-card__badge--amber { background: #d97706; }
.grid-card__badge--orange { background: #ea580c; }
.grid-card__body { padding: 14px; }
.grid-card__title { font-size: 14px; font-weight: 600; color: var(--ink-900); margin-bottom: 6px; }
.grid-card__addr { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--ink-400); margin-bottom: 4px; }
.grid-card__meta { font-size: 12px; color: var(--ink-400); margin-bottom: 10px; }
.grid-card__price { font-size: 16px; font-weight: 700; color: var(--blue-600); }

/* RESPONSIVE */
@media (max-width: 1024px) { .catalog-grid { grid-template-columns: repeat(2, 1fr); } .catalog-sidebar { display: none; } .catalog-body { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .catalog-grid { grid-template-columns: 1fr; } .topbar__search { display: none; } }
</style>
