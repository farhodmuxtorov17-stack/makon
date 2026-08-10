<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Sklad</h1>
        <p class="text-ink-500 text-sm mt-0.5">Materiallar va zaxiralar boshqaruvi</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" />
        Mahsulot qo'shish
      </button>
    </div>

    <!-- Low stock alert -->
    <div v-if="lowStockItems.length > 0" class="card p-4 border-amber-200 bg-amber-50/50">
      <div class="flex items-center gap-3">
        <AlertTriangle :size="20" class="text-amber-600" />
        <div>
          <p class="font-medium text-amber-900 text-sm">{{ lowStockItems.length }} ta mahsulot minimal zaxiradan past</p>
          <p class="text-amber-700 text-xs mt-0.5">Tezroq yetkazib berishni rejalashtiring</p>
        </div>
      </div>
    </div>

    <!-- Items table -->
    <div class="card overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Nomi</th>
              <th>Kategoriya</th>
              <th>Zaxira</th>
              <th>Min. zaxira</th>
              <th>Narx</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in serviceStore.warehouseItems" :key="item.id">
              <td class="font-mono text-sm text-ink-500">{{ item.sku }}</td>
              <td class="font-medium text-ink-900">{{ item.name }}</td>
              <td><span class="badge badge-neutral">{{ item.category }}</span></td>
              <td>
                <span class="font-semibold" :class="item.stock < item.minStock ? 'text-rose-600' : 'text-ink-900'">
                  {{ item.stock }} {{ item.unit }}
                </span>
              </td>
              <td class="text-ink-500">{{ item.minStock }} {{ item.unit }}</td>
              <td class="font-semibold">{{ formatPrice(item.unitPrice) }}</td>
              <td>
                <span v-if="item.stock < item.minStock" class="badge badge-danger">Kam zaxira</span>
                <span v-else class="badge badge-success">Yetarli</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, AlertTriangle } from 'lucide-vue-next'

const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())

const lowStockItems = computed(() => serviceStore.warehouseItems.filter(i => i.stock < i.minStock))

function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  if (v >= 1000) return (v / 1000).toFixed(0) + 'K'
  return v.toLocaleString('ru')
}
</script>
