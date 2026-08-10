
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Ombor nomenklaturasi</h1>
        <p class="text-ink-400 text-sm mt-1">{{ items.length }} ta item · {{ lowStock }} ta kam qoldiq</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="14" /> Item qo'shish</button>
    </div>

    <div class="card overflow-hidden">
      <div class="p-4 border-b border-white/5">
        <div class="relative max-w-xs">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input v-model="search" class="input pl-10" placeholder="SKU, nom..." />
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Nomi</th>
              <th>Kategoriya</th>
              <th>Qoldiq</th>
              <th>Min</th>
              <th>Narx</th>
              <th>Ta'minotchі</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filtered" :key="item.id" class="table-row-hover">
              <td class="font-mono text-xs text-ink-400">{{ item.sku }}</td>
              <td class="text-white font-medium">{{ item.name }}</td>
              <td class="text-ink-400">{{ item.category }}</td>
              <td>
                <span :class="item.stock < item.minStock ? 'text-red-400 font-medium' : 'text-white'">
                  {{ item.stock }} {{ item.unit }}
                </span>
              </td>
              <td class="text-ink-500">{{ item.minStock }}</td>
              <td class="text-white">{{ formatPriceShort(item.unitPrice) }}</td>
              <td class="text-ink-400">{{ getSupplier(item.supplierId) }}</td>
              <td>
                <span v-if="item.stock < item.minStock" class="badge badge-danger">Kam qoldiq</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Plus, Search } from 'lucide-vue-next'
import { warehouseItems, suppliers } from '~/utils/mockData'

const { formatPriceShort } = useFormat()

const search = ref('')
const items = warehouseItems

const lowStock = computed(() => items.filter(i => i.stock < i.minStock).length)

function getSupplier(id: string | null) {
  if (!id) return '—'
  return suppliers.find(s => s.id === id)?.name || '—'
}

const filtered = computed(() => {
  if (!search.value) return items
  const q = search.value.toLowerCase()
  return items.filter(i => i.sku.toLowerCase().includes(q) || i.name.toLowerCase().includes(q))
})
</script>
