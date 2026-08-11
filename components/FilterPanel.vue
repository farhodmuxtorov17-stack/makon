<template>
  <div class="filter-panel">
    <div class="filter-panel__header">
      <span class="filter-panel__title">Filtrlar</span>
      <button class="filter-panel__reset" @click="$emit('reset')">Tozalash</button>
    </div>

    <!-- Search -->
    <div class="filter-group">
      <div class="filter-search">
        <Search :size="14" class="text-ink-400" />
        <input
          :value="search"
          type="text"
          placeholder="Nom bo'yicha..."
          @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <!-- Sort -->
    <div class="filter-group">
      <label class="filter-label">Saralash</label>
      <select
        :value="sort"
        class="filter-select"
        @change="$emit('update:sort', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">Select</option>
        <option value="price_asc">Narx: pastdan yuqoriga</option>
        <option value="price_desc">Narx: yuqoridan pastga</option>
        <option value="area_desc">Maydon: kattadan kichikka</option>
      </select>
    </div>

    <!-- Offer type -->
    <div class="filter-group">
      <label class="filter-label">Ijara turi</label>
      <div class="filter-pills">
        <button
          class="filter-pill"
          :class="{ 'filter-pill--active': offerType === '' }"
          @click="$emit('update:offerType', '')"
        >Barchasi</button>
        <button
          class="filter-pill"
          :class="{ 'filter-pill--active': offerType === 'RENT' }"
          @click="$emit('update:offerType', 'RENT')"
        >Ijara</button>
        <button
          class="filter-pill"
          :class="{ 'filter-pill--active': offerType === 'SALE' }"
          @click="$emit('update:offerType', 'SALE')"
        >Sotish</button>
      </div>
    </div>

    <!-- Property type -->
    <div class="filter-group">
      <label class="filter-label">Mulk turi</label>
      <div class="filter-type-grid">
        <button
          class="filter-type-btn"
          :class="{ 'filter-type-btn--active': propertyType === '' }"
          @click="$emit('update:propertyType', '')"
        >
          <LayoutGrid :size="18" />
          <span>Barchasi</span>
        </button>
        <button
          class="filter-type-btn"
          :class="{ 'filter-type-btn--active': propertyType === 'OFFICE' }"
          @click="$emit('update:propertyType', 'OFFICE')"
        >
          <Building2 :size="18" />
          <span>Ofis</span>
        </button>
        <button
          class="filter-type-btn"
          :class="{ 'filter-type-btn--active': propertyType === 'SHOPPING' }"
          @click="$emit('update:propertyType', 'SHOPPING')"
        >
          <ShoppingBag :size="18" />
          <span>Savdo</span>
        </button>
        <button
          class="filter-type-btn"
          :class="{ 'filter-type-btn--active': propertyType === 'WAREHOUSE' }"
          @click="$emit('update:propertyType', 'WAREHOUSE')"
        >
          <Factory :size="18" />
          <span>Sanoat</span>
        </button>
        <button
          class="filter-type-btn"
          :class="{ 'filter-type-btn--active': propertyType === 'RESIDENTIAL' }"
          @click="$emit('update:propertyType', 'RESIDENTIAL')"
        >
          <Home :size="18" />
          <span>Turar-joy</span>
        </button>
        <button
          class="filter-type-btn"
          :class="{ 'filter-type-btn--active': propertyType === 'WAREHOUSE_ONLY' }"
          @click="$emit('update:propertyType', 'WAREHOUSE')"
        >
          <Package :size="18" />
          <span>Ombor</span>
        </button>
      </div>
    </div>

    <!-- Price -->
    <div class="filter-group">
      <label class="filter-label">Narx (UZS)</label>
      <div class="filter-range">
        <input
          type="number"
          placeholder="0"
          :value="priceMin ?? ''"
          @input="$emit('update:priceMin', toNum(($event.target as HTMLInputElement).value))"
        />
        <span class="filter-range__sep">—</span>
        <input
          type="number"
          placeholder="∞"
          :value="priceMax ?? ''"
          @input="$emit('update:priceMax', toNum(($event.target as HTMLInputElement).value))"
        />
      </div>
    </div>

    <!-- Area -->
    <div class="filter-group">
      <label class="filter-label">Maydon (m²)</label>
      <div class="filter-range">
        <input
          type="number"
          placeholder="0"
          :value="areaMin ?? ''"
          @input="$emit('update:areaMin', toNum(($event.target as HTMLInputElement).value))"
        />
        <span class="filter-range__sep">—</span>
        <input
          type="number"
          placeholder="∞"
          :value="areaMax ?? ''"
          @input="$emit('update:areaMax', toNum(($event.target as HTMLInputElement).value))"
        />
      </div>
    </div>

    <!-- Amenities -->
    <div class="filter-group">
      <label class="filter-label">Qulayliklar</label>
      <select
        :value="amenities"
        class="filter-select"
        @change="$emit('update:amenities', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">Tanlang...</option>
        <option value="parking">Avtoturargoh</option>
        <option value="security">Xavfsizlik</option>
        <option value="elevator">Lift</option>
        <option value="ac">Konditsioner</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, LayoutGrid, Building2, ShoppingBag, Factory, Home, Package } from 'lucide-vue-next'

defineProps<{
  search: string
  sort: string
  offerType: string
  propertyType: string
  priceMin: number | null
  priceMax: number | null
  areaMin: number | null
  areaMax: number | null
  amenities: string
}>()

defineEmits<{
  (e: 'update:search', v: string): void
  (e: 'update:sort', v: string): void
  (e: 'update:offerType', v: string): void
  (e: 'update:propertyType', v: string): void
  (e: 'update:priceMin', v: number | null): void
  (e: 'update:priceMax', v: number | null): void
  (e: 'update:areaMin', v: number | null): void
  (e: 'update:areaMax', v: number | null): void
  (e: 'update:amenities', v: string): void
  (e: 'reset'): void
}>()

function toNum(v: string): number | null {
  if (v === '') return null
  const n = Number(v)
  return isNaN(n) ? null : n
}
</script>

<style scoped>
.filter-panel {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}
.filter-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filter-panel__title {
  font-size: 15px;
  font-weight: 700;
  color: #18181b;
}
.dark .filter-panel__title { color: #fff; }
.filter-panel__reset {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent-hover);
}
.dark .filter-panel__reset { color: var(--accent); }

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.filter-label {
  font-size: 11.5px;
  font-weight: 700;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.filter-search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: 10px;
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.06);
}
.dark .filter-search { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.08); }
.filter-search input {
  flex: 1;
  background: transparent;
  border: none;
  font-size: 13px;
  color: #18181b;
  outline: none;
}
.dark .filter-search input { color: #fff; }

.filter-select {
  width: 100%;
  padding: 9px 12px;
  border-radius: 10px;
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.06);
  font-size: 13px;
  color: #18181b;
}
.dark .filter-select { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.08); color: #fff; }

.filter-pills {
  display: flex;
  gap: 6px;
  background: rgba(0,0,0,0.04);
  padding: 4px;
  border-radius: 11px;
}
.dark .filter-pills { background: rgba(255,255,255,0.05); }
.filter-pill {
  flex: 1;
  font-size: 12.5px;
  font-weight: 600;
  padding: 7px 0;
  border-radius: 8px;
  color: #71717a;
  text-align: center;
}
.filter-pill--active {
  background: var(--accent-hover);
  color: white;
}

.filter-type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
}
.filter-type-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 4px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.07);
  background: #ffffff;
  color: #71717a;
  font-size: 10.5px;
  font-weight: 600;
}
.dark .filter-type-btn { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.07); color: #a1a1aa; }
.filter-type-btn--active {
  border-color: var(--accent-hover);
  background: rgba(37,99,235,0.08);
  color: var(--accent-hover);
}
.dark .filter-type-btn--active { color: var(--accent); background: rgba(37,99,235,0.15); }

.filter-range {
  display: flex;
  align-items: center;
  gap: 8px;
}
.filter-range input {
  flex: 1;
  width: 0;
  padding: 9px 10px;
  border-radius: 10px;
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.06);
  font-size: 12.5px;
  color: #18181b;
}
.dark .filter-range input { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.08); color: #fff; }
.filter-range__sep {
  color: #a1a1aa;
  font-size: 12px;
}
</style>
