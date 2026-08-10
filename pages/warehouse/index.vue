<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold font-display text-ink-900">Ombor</h1>
        <p class="text-sm text-ink-500 mt-1">
          {{ filtered.length }} item, {{ lowStock.length }} kam zaxira
        </p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-secondary btn-sm">
          <ArrowDownToLine :size="16" :stroke-width="2" />
          Kiritish
        </button>
        <button class="btn btn-secondary btn-sm">
          <ArrowUpFromLine :size="16" :stroke-width="2" />
          Chiqarish
        </button>
      </div>
    </div>

    <!-- Low stock alert -->
    <div
      v-if="lowStock.length"
      class="rounded-2xl border border-warning-200 bg-warning-50 p-4 flex items-center gap-3"
    >
      <div class="w-9 h-9 rounded-xl bg-warning-100 flex items-center justify-center flex-shrink-0">
        <AlertTriangle :size="18" :stroke-width="2" class="text-warning-600" />
      </div>
      <p class="text-sm text-warning-700">
        {{ lowStock.length }} ta itemda kam zaxira aniqlandi — ta'minotchiga murojaat qiling
      </p>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1">
        <SearchInput v-model="search" placeholder="SKU yoki nom bo'yicha..." />
      </div>
      <select v-model="categoryFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha kategoriyalar</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- Desktop table -->
    <div class="card hidden md:block overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Nomi</th>
              <th>Kategoriya</th>
              <th>Zaxira</th>
              <th>Min</th>
              <th>Narx</th>
              <th>Ta'minotchi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in pagedItems" :key="i.id">
              <td class="font-mono text-xs text-ink-900">{{ i.sku }}</td>
              <td class="font-medium text-ink-900">{{ i.name }}</td>
              <td>
                <span class="badge badge-neutral">{{ i.category }}</span>
              </td>
              <td>
                <span :class="i.stock < i.minStock ? 'text-danger-600 font-bold' : 'text-ink-900'">
                  {{ i.stock }} {{ i.unit }}
                </span>
              </td>
              <td class="text-ink-400">{{ i.minStock }}</td>
              <td class="font-mono text-ink-900">{{ formatNumber(i.unitPrice) }} so'm</td>
              <td class="text-ink-500">{{ supplierName(i.supplierId) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        v-if="filtered.length > perPage"
        :page="page"
        :per-page="perPage"
        :total="filtered.length"
        @update:page="page = $event"
      />
      <EmptyState
        v-if="!filtered.length"
        title="Itemlar topilmadi"
        icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2"
      />
    </div>

    <!-- Mobile cards -->
    <div class="md:hidden space-y-3">
      <div v-for="i in pagedItems" :key="i.id" class="card p-4">
        <div class="flex items-center justify-between mb-1">
          <span class="font-medium text-ink-900">{{ i.name }}</span>
          <span class="font-mono text-xs text-ink-400">{{ i.sku }}</span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="badge badge-neutral">{{ i.category }}</span>
          <span :class="i.stock < i.minStock ? 'text-danger-600 font-bold' : 'text-ink-900'">{{ i.stock }} {{ i.unit }}</span>
        </div>
        <div class="flex items-center justify-between mt-2 text-xs text-ink-400">
          <span>{{ formatNumber(i.unitPrice) }} so'm</span>
          <span>{{ supplierName(i.supplierId) }}</span>
        </div>
      </div>
      <EmptyState
        v-if="!filtered.length"
        title="Itemlar topilmadi"
        icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ArrowDownToLine, ArrowUpFromLine, AlertTriangle } from 'lucide-vue-next'
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
const categories = computed(() => [...new Set(items.value.map((i) => i.category))])

const filtered = computed(() => {
  let r = items.value
  if (categoryFilter.value !== 'ALL') r = r.filter((i) => i.category === categoryFilter.value)
  if (search.value)
    r = r.filter(
      (i) =>
        i.sku?.toLowerCase().includes(search.value.toLowerCase()) ||
        i.name?.toLowerCase().includes(search.value.toLowerCase())
    )
  return r
})
const pagedItems = computed(() =>
  filtered.value.slice((page.value - 1) * perPage, page.value * perPage)
)
const supplierName = (id: string) => serviceStore.suppliers.find((s) => s.id === id)?.name || id
</script>
