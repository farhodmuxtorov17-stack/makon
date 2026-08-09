<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Ombor</h1>
        <p class="text-sm text-neutral-500 mt-1">
          {{ items.length }} item, {{ lowStock.length }} kam zaxira
        </p>
      </div>
      <div class="flex gap-2">
        <button class="btn-secondary btn-sm">+ Kiritish</button><button class="btn-secondary btn-sm">- Chiqarish</button>
      </div>
    </div>
    <div v-if="lowStock.length" class="card border-warning-200 bg-warning-50">
      <div class="card-body flex items-center gap-3">
        <svg class="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01"
          />
        </svg>
        <p class="text-sm text-warning-700">{{ lowStock.length }} ta itemda kam zaxira aniqlandi</p>
      </div>
    </div>
    <div class="card">
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
            <tr v-for="i in items" :key="i.id">
              <td class="font-mono text-xs">{{ i.sku }}</td>
              <td class="font-medium text-neutral-900">{{ i.name }}</td>
              <td>
                <span class="badge-neutral">{{ i.category }}</span>
              </td>
              <td>
                <span
                  :class="i.stock < i.minStock ? 'text-danger-600 font-bold' : 'text-neutral-700'"
                >{{ i.stock }} {{ i.unit }}</span>
              </td>
              <td class="text-neutral-400">{{ i.minStock }}</td>
              <td class="font-mono">{{ formatNumber(i.unitPrice) }}</td>
              <td class="text-neutral-500">{{ supplierName(i.supplierId) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useServiceStore } from '~/stores/service'
import { formatNumber } from '~/utils'

definePageMeta({ middleware: 'auth' })
const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())
const items = computed(() => serviceStore.warehouseItems)
const lowStock = computed(() => serviceStore.lowStockItems)
const supplierName = (id: string) => serviceStore.suppliers.find((s) => s.id === id)?.name || id
</script>
