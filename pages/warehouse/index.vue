<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold font-display">Ombor</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ filtered.length }} item, {{ lowStock.length }} kam zaxira</p>
      </div>
      <div class="flex gap-2">
        <button class="btn-secondary btn-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg> Kiritish</button>
        <button class="btn-secondary btn-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg> Chiqarish</button>
      </div>
    </div>

    <!-- Low stock alert -->
    <div v-if="lowStock.length" class="card border-warning-200 bg-warning-50">
      <div class="card-body flex items-center gap-3">
        <svg class="w-5 h-5 text-warning-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" /></svg>
        <p class="text-sm text-warning-700">{{ lowStock.length }} ta itemda kam zaxira aniqlandi — ta'minotchiga murojaat qiling</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1"><SearchInput v-model="search" placeholder="SKU yoki nom bo'yicha..." /></div>
      <select v-model="categoryFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha kategoriyalar</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- Desktop -->
    <div class="card hidden md:block">
      <div class="table-wrapper"><table class="table">
        <thead><tr><th>SKU</th><th>Nomi</th><th>Kategoriya</th><th>Zaxira</th><th>Min</th><th>Narx</th><th>Ta'minotchi</th></tr></thead>
        <tbody>
          <tr v-for="i in pagedItems" :key="i.id">
            <td class="font-mono text-xs">{{ i.sku }}</td>
            <td class="font-medium text-neutral-900">{{ i.name }}</td>
            <td><span class="badge-neutral">{{ i.category }}</span></td>
            <td><span :class="i.stock < i.minStock ? 'text-danger-600 font-bold' : 'text-neutral-700'">{{ i.stock }} {{ i.unit }}</span></td>
            <td class="text-neutral-400">{{ i.minStock }}</td>
            <td class="font-mono">{{ formatNumber(i.unitPrice) }}</td>
            <td class="text-neutral-500">{{ supplierName(i.supplierId) }}</td>
          </tr>
        </tbody>
      </table></div>
      <Pagination v-if="filtered.length > perPage" :page="page" :per-page="perPage" :total="filtered.length" @update:page="page = $event" />
      <EmptyState v-if="!filtered.length" title="Itemlar topilmadi" icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2" />
    </div>

    <!-- Mobile -->
    <div class="md:hidden space-y-3">
      <div v-for="i in pagedItems" :key="i.id" class="card p-4">
        <div class="flex items-center justify-between mb-1">
          <span class="font-medium text-neutral-900">{{ i.name }}</span>
          <span class="font-mono text-xs text-neutral-400">{{ i.sku }}</span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="badge-neutral">{{ i.category }}</span>
          <span :class="i.stock < i.minStock ? 'text-danger-600 font-bold' : 'text-neutral-700'">{{ i.stock }} {{ i.unit }}</span>
        </div>
        <div class="flex items-center justify-between mt-2 text-xs text-neutral-400">
          <span>Narx: {{ formatNumber(i.unitPrice) }}</span>
          <span>{{ supplierName(i.supplierId) }}</span>
        </div>
      </div>
      <EmptyState v-if="!filtered.length" title="Itemlar topilmadi" icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useServiceStore } from '~/stores/service'
import { formatNumber } from '~/utils'
import SearchInput from '~/components/ui/SearchInput.vue'
import Pagination from '~/components/ui/Pagination.vue'
import EmptyState from '~/components/ui/EmptyState.vue'

definePageMeta({ middleware: 'auth' })
const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())

const search = ref('')
const categoryFilter = ref('ALL')
const page = ref(1)
const perPage = 10

const items = computed(() => serviceStore.warehouseItems)
const lowStock = computed(() => serviceStore.lowStockItems)
const categories = computed(() => [...new Set(items.value.map(i => i.category))])

const filtered = computed(() => {
  let r = items.value
  if (categoryFilter.value !== 'ALL') r = r.filter(i => i.category === categoryFilter.value)
  if (search.value) r = r.filter(i => i.sku?.toLowerCase().includes(search.value.toLowerCase()) || i.name?.toLowerCase().includes(search.value.toLowerCase()))
  return r
})
const pagedItems = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))
const supplierName = (id: string) => serviceStore.suppliers.find(s => s.id === id)?.name || id
</script>
