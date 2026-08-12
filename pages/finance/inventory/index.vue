<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">FINANCE / INVENTORY</div>
        <div class="eyebrow">FINANCE / INVENTORY</div>
      <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Ombor boshqaruvi</h1>
        <p class="text-ink-500 text-sm mt-1">{{ materials.length }} ta material · {{ lowStockCount }} ta kam qoldi</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-secondary btn-sm" @click="() => {}"><Download :size="14" /> Eksport</button>
        <button class="btn btn-primary btn-sm btn-glow" @click="() => {}"><Plus :size="14" /> Material qo'shish</button>
      </div>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KpiCard icon="Package" iconBg="rgba(20,184,166,0.1)" iconColor="#0D9488" label="Jami pozitsiyalar" :value="materials.length" icon-color="#f97316" icon-bg="rgba(249,115,22,0.1)" to="/finance/inventory" :sparkData="[20,22,25,23,28,26,30]" sparkColor="#f97316" />
      <KpiCard icon="CheckCircle" iconBg="rgba(16,185,129,0.1)" iconColor="#059669" label="Ombor qiymati" :value="formatUZSShort(totalValue)" icon-color="#10b981" icon-bg="rgba(16,185,129,0.1)" to="/finance/inventory" :sparkData="[30,35,40,42,48,52,55]" sparkColor="#10b981" />
      <KpiCard icon="AlertCircle" iconBg="rgba(239,68,68,0.1)" iconColor="#DC2626" label="Kam qoldi" :value="lowStockCount" icon-color="#ef4444" icon-bg="rgba(239,68,68,0.1)" to="/finance/inventory" :sparkData="[5,3,4,6,8,7,9]" sparkColor="#ef4444" />
      <KpiCard icon="Building2" iconBg="rgba(99,102,241,0.1)" iconColor="#6366F1" label="Oylik sarflash" :value="formatUZSShort(monthlyUsage)" icon-color="var(--accent)" icon-bg="rgba(37,99,235,0.1)" to="/finance/inventory" :sparkData="[40,35,42,38,45,50,48]" sparkColor="var(--accent)" />
    </div>

    <!-- Category filter + search -->
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="activeCategory = cat.value"
          class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          :class="activeCategory === cat.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500 hover:text-ink-800 dark:text-ink-100'"
        >
          {{ cat.label }}
        </button>
      </div>
      <div class="relative">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input v-model="search" type="text" placeholder="Material qidirish..." class="w-56 text-sm border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
      </div>
    </div>

    <!-- Materials table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-4 py-3">Material</th>
              <th class="text-left font-medium px-4 py-3 hidden sm:table-cell">Kategoriya</th>
              <th class="text-right font-medium px-4 py-3">Miqdor</th>
              <th class="text-right font-medium px-4 py-3 hidden md:table-cell">Min. zaxira</th>
              <th class="text-right font-medium px-4 py-3 hidden sm:table-cell">Birlik narxi</th>
              <th class="text-right font-medium px-4 py-3 hidden lg:table-cell">Qiymat</th>
              <th class="text-center font-medium px-4 py-3">Holat</th>
              <th class="text-center font-medium px-4 py-3">Amal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mat in filteredMaterials" :key="mat.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer" @click="navigateTo('/finance/inventory')">
              <td class="px-4 py-3 font-medium text-ink-900 dark:text-white">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ background: categoryColor(mat.category) + '15' }">
                    <component :is="categoryIcon(mat.category)" :size="14" :style="{ color: categoryColor(mat.category) }" />
                  </div>
                  {{ mat.name }}
                </div>
              </td>
              <td class="px-4 py-3 hidden sm:table-cell">
                <span class="text-xs text-ink-500">{{ categoryLabel(mat.category) }}</span>
              </td>
              <td class="px-4 py-3 text-right font-mono text-sm text-ink-900 dark:text-white">{{ mat.quantity }} <span class="text-xs text-ink-400">{{ mat.unit }}</span></td>
              <td class="px-4 py-3 text-right hidden md:table-cell font-mono text-xs text-ink-500">{{ mat.minStock }} {{ mat.unit }}</td>
              <td class="px-4 py-3 text-right hidden sm:table-cell font-medium">{{ formatUZSShort(mat.unitPrice) }}</td>
              <td class="px-4 py-3 text-right hidden lg:table-cell font-semibold">{{ formatUZSShort(mat.quantity * mat.unitPrice) }}</td>
              <td class="px-4 py-3 text-center">
                <span v-if="mat.quantity <= mat.minStock" class="badge badge-danger text-xs">Kam</span>
                <span v-else-if="mat.quantity <= mat.minStock * 1.5" class="badge badge-warning text-xs">Past</span>
                <span v-else class="badge badge-success text-xs">Yetarli</span>
              </td>
              <td class="px-4 py-3 text-center">
                <button class="btn btn-ghost btn-sm px-2" @click="() => {}"><MoreHorizontal :size="16" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KpiCard from '~/components/KpiCard.vue'
import {
  Plus, Download, Package, Wallet, AlertCircle, TrendingDown,
  Search, MoreHorizontal, Wrench, Lightbulb, PaintRoller, Boxes, Droplet,
} from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort, formatNumber } = useFormat()

const search = ref('')
const activeCategory = ref('all')

interface Material {
  id: string; name: string; category: string; quantity: number;
  unit: string; minStock: number; unitPrice: number;
}

const materials: Material[] = [
  { id: '1', name: 'Lampa LED 12W', category: 'ELECTRICAL', quantity: 45, unit: 'dona', minStock: 20, unitPrice: 35000 },
  { id: '2', name: 'Kabel VG 3x2.5', category: 'ELECTRICAL', quantity: 120, unit: 'm', minStock: 50, unitPrice: 12000 },
  { id: '3', name: 'Avtomat 16A', category: 'ELECTRICAL', quantity: 8, unit: 'dona', minStock: 10, unitPrice: 45000 },
  { id: '4', name: 'Truba PP 50mm', category: 'PLUMBING', quantity: 85, unit: 'm', minStock: 30, unitPrice: 22000 },
  { id: '5', name: 'Kraska oq 20L', category: 'PAINT', quantity: 3, unit: 'banka', minStock: 5, unitPrice: 280000 },
  { id: '6', name: 'Gips HP 25kg', category: 'PAINT', quantity: 42, unit: 'qop', minStock: 15, unitPrice: 95000 },
  { id: '7', name: 'Sement M400 50kg', category: 'CONSTRUCTION', quantity: 28, unit: 'qop', minStock: 20, unitPrice: 75000 },
  { id: '8', name: 'Eshik qulfi', category: 'HARDWARE', quantity: 15, unit: 'dona', minStock: 8, unitPrice: 65000 },
  { id: '9', name: 'Pomidor pol (linoleum) 3m', category: 'PAINT', quantity: 4, unit: 'rulon', minStock: 3, unitPrice: 450000 },
  { id: '10', name: 'Shlang AR 15mm 20m', category: 'PLUMBING', quantity: 2, unit: 'dona', minStock: 5, unitPrice: 120000 },
  { id: '11', name: 'Radiator batareyasi', category: 'PLUMBING', quantity: 12, unit: 'dona', minStock: 5, unitPrice: 380000 },
  { id: '12', name: 'Beton blok 200x400', category: 'CONSTRUCTION', quantity: 6, unit: 'dona', minStock: 10, unitPrice: 18000 },
]

const categories = [
  { value: 'all', label: 'Barchasi' },
  { value: 'ELECTRICAL', label: 'Elektr' },
  { value: 'PLUMBING', label: 'Santexnika' },
  { value: 'PAINT', label: 'Bo\'yash' },
  { value: 'CONSTRUCTION', label: 'Qurilish' },
  { value: 'HARDWARE', label: 'Metall buyum' },
]

const filteredMaterials = computed(() => {
  let result = [...materials]
  if (activeCategory.value !== 'all') result = result.filter(m => m.category === activeCategory.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(m => m.name.toLowerCase().includes(q))
  }
  return result
})

const totalValue = computed(() => materials.reduce((s, m) => s + m.quantity * m.unitPrice, 0))
const lowStockCount = computed(() => materials.filter(m => m.quantity <= m.minStock).length)
const monthlyUsage = computed(() => 8450000)


function categoryColor(cat: string) {
  return { ELECTRICAL: '#f59e0b', PLUMBING: '#3b82f6', PAINT: '#ec4899', CONSTRUCTION: '#6b7280', HARDWARE: 'var(--accent)' }[cat] || '#71717a'
}

function categoryLabel(cat: string) {
  return { ELECTRICAL: 'Elektr', PLUMBING: 'Santexnika', PAINT: "Bo'yash", CONSTRUCTION: 'Qurilish', HARDWARE: 'Metall' }[cat] || cat
}

function categoryIcon(cat: string) {
  return { ELECTRICAL: Lightbulb, PLUMBING: Droplet, PAINT: PaintRoller, CONSTRUCTION: Boxes, HARDWARE: Wrench }[cat] || Package
}
</script>
