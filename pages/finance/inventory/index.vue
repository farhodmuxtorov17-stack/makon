<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Ombor</h1>
        <p class="text-ink-500 text-sm mt-1">Materiallar va zaxiralar</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
        <button class="btn btn-primary btn-sm"><Plus :size="16" /> Yangi material</button>
      </div>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <template v-else-if="data">
      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="card p-4 flex items-center gap-3">
          <Package :size="18" class="text-brand-400" />
          <div><div class="text-sm font-semibold">{{ data.stats.totalItems }}</div><div class="text-xs text-ink-500">Materiallar</div></div>
        </div>
        <div class="card p-4 flex items-center gap-3">
          <Wallet :size="18" class="text-emerald-400" />
          <div><div class="text-sm font-semibold">{{ formatPrice(data.stats.totalValue) }}</div><div class="text-xs text-ink-500">Umumiy qiymat</div></div>
        </div>
        <div class="card p-4 flex items-center gap-3">
          <AlertTriangle :size="18" class="text-red-400" />
          <div><div class="text-sm font-semibold text-red-400">{{ data.stats.lowStock }}</div><div class="text-xs text-ink-500">Kam qoldi</div></div>
        </div>
        <div class="card p-4 flex items-center gap-3">
          <TrendingDown :size="18" class="text-amber-400" />
          <div><div class="text-sm font-semibold">{{ data.stats.usedThisMonth }}</div><div class="text-xs text-ink-500">Oyda sarflandi</div></div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex items-center gap-1 p-1 rounded-xl bg-white/5 w-fit">
        <button @click="tab = 'stock'" class="px-3 py-1.5 rounded-lg text-sm" :class="tab === 'stock' ? 'bg-brand-500/10 text-brand-400' : 'text-ink-500'">Zaxira</button>
        <button @click="tab === 'movements'" class="px-3 py-1.5 rounded-lg text-sm" :class="tab === 'movements' ? 'bg-brand-500/10 text-brand-400' : 'text-ink-500'">Harakatlar</button>
      </div>

      <!-- Stock tab -->
      <div v-if="tab === 'stock'">
        <div class="flex items-center gap-3 mb-4">
          <div class="relative flex-1">
            <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
            <input v-model="search" type="text" placeholder="Material qidirish..." class="input pl-9" />
          </div>
          <select v-model="categoryFilter" class="input w-auto">
            <option value="">Barcha kategoriyalar</option>
            <option value="ELECTRICAL">Elektrika</option>
            <option value="PLUMBING">Sanitariya</option>
            <option value="FINISHING">Finishing</option>
            <option value="STRUCTURAL">Konstruksiya</option>
            <option value="HVAC">Konditsioner</option>
            <option value="DOORS">Eshiklar</option>
            <option value="SECURITY">Xavfsizlik</option>
          </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="item in filteredItems" :key="item.id" class="card p-4">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="font-medium text-sm">{{ item.name }}</h3>
                <p class="text-xs text-ink-500 mt-0.5">{{ categoryLabel(item.category) }}</p>
              </div>
              <span class="badge text-xs" :class="stockBadge(item.status)">{{ stockLabel(item.status) }}</span>
            </div>
            <div class="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div class="text-ink-600">Qoldiq</div>
                <div class="font-semibold text-lg" :class="item.stock < item.minStock ? 'text-red-400' : ''">{{ item.stock }}</div>
                <div class="text-ink-600">{{ item.unit }}</div>
              </div>
              <div>
                <div class="text-ink-600">Min</div>
                <div class="font-medium">{{ item.minStock }}</div>
              </div>
              <div>
                <div class="text-ink-600">Qiymat</div>
                <div class="font-medium">{{ formatPrice(item.totalValue) }}</div>
              </div>
            </div>
            <!-- Stock bar -->
            <div class="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div class="h-full rounded-full transition-all" :class="item.status === 'LOW' ? 'bg-red-500' : item.status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'" :style="{ width: Math.min((item.stock / (item.minStock * 3)) * 100, 100) + '%' }"></div>
            </div>
            <div class="mt-2 text-xs text-ink-600">Narxi: {{ formatPrice(item.unitPrice) }} / {{ item.unit }}</div>
          </div>
        </div>
      </div>

      <!-- Movements tab -->
      <div v-else class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-xs text-ink-500 border-b border-white/5">
                <th class="px-4 py-3">Sana</th>
                <th class="px-4 py-3">Tur</th>
                <th class="px-4 py-3">Material</th>
                <th class="px-4 py-3 text-right">Miqdor</th>
                <th class="px-4 py-3">Sabab</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="mv in data.movements" :key="mv.id" class="border-b border-white/5 hover:bg-white/5">
                <td class="px-4 py-3 text-ink-400">{{ formatDate(mv.date) }}</td>
                <td class="px-4 py-3"><span class="badge badge-danger text-xs">Sarflandi</span></td>
                <td class="px-4 py-3 font-medium">{{ mv.materialName }}</td>
                <td class="px-4 py-3 text-right">{{ mv.quantity }}</td>
                <td class="px-4 py-3 text-ink-400 font-mono text-xs">{{ mv.reason }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Package, Wallet, AlertTriangle, TrendingDown, Search, Plus, Download } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const config = useRuntimeConfig()
const data = ref({
  stats: { totalItems: 247, totalValue: 125000000, lowStock: 14, outOfStock: 3 },
  items: [
    { id: 'i1', sku: 'MAT-001', name: 'Lampa LED 12W', category: 'Elektrika', unit: 'dona', stock: 45, minStock: 20, price: 35000, totalValue: 1575000 },
    { id: 'i2', sku: 'MAT-002', name: 'Kabel 2.5mm (1m)', category: 'Elektrika', unit: 'metr', stock: 800, minStock: 200, price: 8000, totalValue: 6400000 },
    { id: 'i3', sku: 'MAT-003', name: 'Radiator panel', category: 'Sanitariya', unit: 'dona', stock: 8, minStock: 15, price: 450000, totalValue: 3600000 },
    { id: 'i4', sku: 'MAT-004', name: 'Truba PPR 25mm', category: 'Sanitariya', unit: 'metr', stock: 0, minStock: 50, price: 25000, totalValue: 0 },
    { id: 'i5', sku: 'MAT-005', name: 'Bo\'yoq akril (10L)', category: 'Boshqa', unit: 'banka', stock: 25, minStock: 10, price: 180000, totalValue: 4500000 },
    { id: 'i6', sku: 'MAT-006', name: 'Sement M400', category: 'Konstruksiya', unit: 'qop', stock: 120, minStock: 30, price: 75000, totalValue: 9000000 },
    { id: 'i7', sku: 'MAT-007', name: 'Filter HVAC HEPA', category: 'Konditsioner', unit: 'dona', stock: 3, minStock: 8, price: 250000, totalValue: 750000 },
    { id: 'i8', sku: 'MAT-008', name: 'Devor bo\'yog\'i (25kg)', category: 'Boshqa', unit: 'qop', stock: 50, minStock: 20, price: 320000, totalValue: 16000000 },
  ],
})

const tab = ref('stock')
const search = ref('')
const categoryFilter = ref('')

const filteredItems = computed(() => {
  if (!data.value?.items) return []
  let result = [...data.value.items]
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(i => i.name?.toLowerCase().includes(q))
  }
  if (categoryFilter.value) result = result.filter(i => i.category === categoryFilter.value)
  return result.sort((a, b) => (a.status === 'LOW' ? -1 : b.status === 'LOW' ? 1 : 0))
})

function categoryLabel(c: string) {
  return { ELECTRICAL: 'Elektrika', PLUMBING: 'Sanitariya', FINISHING: 'Finishing', STRUCTURAL: 'Konstruksiya', HVAC: 'Konditsioner', DOORS: 'Eshiklar', SECURITY: 'Xavfsizlik' }[c] || c
}
function stockBadge(s: string) { return { LOW: 'badge-danger', WARNING: 'badge-warning', OK: 'badge-success' }[s] || 'badge-neutral' }
function stockLabel(s: string) { return { LOW: 'Kam', WARNING: 'Ogohlantirish', OK: 'Yetarli' }[s] || s }
function formatPrice(p: number) { return (p || 0).toLocaleString('ru-RU') + ' so\'m' }
function formatDate(d: string) { return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) }
</script>
