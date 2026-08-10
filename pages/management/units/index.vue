<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Unitlar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ filteredUnits.length }} ta unit · {{ occupiedCount }} band · {{ vacantCount }} bo'sh</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi unit</button>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center"><Layers :size="16" class="text-indigo-500" /></div>
          <span class="text-xs text-ink-500">Jami</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ units.length }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><CheckCircle2 :size="16" class="text-emerald-500" /></div>
          <span class="text-xs text-ink-500">Band</span>
        </div>
        <div class="text-xl font-bold text-emerald-500">{{ occupiedCount }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><AlertCircle :size="16" class="text-amber-500" /></div>
          <span class="text-xs text-ink-500">Bo'sh</span>
        </div>
        <div class="text-xl font-bold text-amber-500">{{ vacantCount }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><Ruler :size="16" class="text-blue-500" /></div>
          <span class="text-xs text-ink-500">Maydon</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ totalArea }}<span class="text-xs text-ink-500 font-normal"> m²</span></div>
      </div>
    </div>

    <!-- Search + filters -->
    <div class="flex flex-wrap items-center gap-2">
      <div class="relative flex-1 min-w-[200px]">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input v-model="search" type="text" placeholder="Unit nomi, bino..." class="w-full text-sm border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
      </div>
      <select v-model="statusFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
        <option value="">Holat: Barchasi</option>
        <option value="VACANT">Bo'sh</option>
        <option value="OCCUPIED">Band</option>
        <option value="RESERVED">Rezerv</option>
      </select>
      <select v-model="typeFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
        <option value="">Tur: Barchasi</option>
        <option value="OFFICE">Ofis</option>
        <option value="RETAIL">Savdo</option>
        <option value="WAREHOUSE">Ombor</option>
        <option value="MIXED">Aralash</option>
      </select>
      <select v-model="buildingFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
        <option value="">Bino: Barchasi</option>
        <option v-for="b in buildings" :key="b" :value="b">{{ b }}</option>
      </select>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-4 py-3">Unit</th>
              <th class="text-left font-medium px-4 py-3 hidden sm:table-cell">Bino</th>
              <th class="text-center font-medium px-4 py-3 hidden md:table-cell">Qavat</th>
              <th class="text-center font-medium px-4 py-3">Maydon</th>
              <th class="text-left font-medium px-4 py-3 hidden lg:table-cell">Tur</th>
              <th class="text-right font-medium px-4 py-3 hidden md:table-cell">Narxi/m²</th>
              <th class="text-center font-medium px-4 py-3">Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in filteredUnits" :key="u.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td class="px-4 py-3 font-medium text-ink-900 dark:text-white">{{ u.name }}</td>
              <td class="px-4 py-3 hidden sm:table-cell text-ink-500">{{ u.building }}</td>
              <td class="px-4 py-3 text-center hidden md:table-cell text-ink-500">{{ u.floor }}</td>
              <td class="px-4 py-3 text-center font-medium text-ink-900 dark:text-white">{{ u.area }} m²</td>
              <td class="px-4 py-3 hidden lg:table-cell">
                <span class="badge text-[10px] badge-neutral">{{ typeLabel(u.type) }}</span>
              </td>
              <td class="px-4 py-3 text-right hidden md:table-cell text-ink-500">{{ formatShort(u.pricePerM2) }}</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-[10px]" :class="statusBadge(u.status)">{{ statusLabel(u.status) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="filteredUnits.length === 0" class="py-12 text-center">
        <SearchX :size="32" class="text-ink-300 mx-auto mb-2" />
        <p class="text-ink-500 text-sm">Unitlar topilmadi</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Layers, CheckCircle2, AlertCircle, Ruler, Search, SearchX } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const search = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const buildingFilter = ref('')

const buildings = ['Tashkent City', 'Trillant Tower', 'IT Park', 'Piramit', 'Savdo Markaz']

const units = [
  { id: 'u1', name: 'A-301', building: 'Tashkent City', floor: 3, area: 85, type: 'OFFICE', pricePerM2: 294000, status: 'OCCUPIED' },
  { id: 'u2', name: 'A-302', building: 'Tashkent City', floor: 3, area: 92, type: 'OFFICE', pricePerM2: 294000, status: 'OCCUPIED' },
  { id: 'u3', name: 'A-305', building: 'Tashkent City', floor: 3, area: 65, type: 'OFFICE', pricePerM2: 294000, status: 'VACANT' },
  { id: 'u4', name: 'B-205', building: 'Trillant Tower', floor: 2, area: 120, type: 'OFFICE', pricePerM2: 316000, status: 'OCCUPIED' },
  { id: 'u5', name: 'B-301', building: 'Trillant Tower', floor: 3, area: 85, type: 'OFFICE', pricePerM2: 316000, status: 'VACANT' },
  { id: 'u6', name: 'C-101', building: 'IT Park', floor: 1, area: 45, type: 'RETAIL', pricePerM2: 268000, status: 'OCCUPIED' },
  { id: 'u7', name: 'C-201', building: 'IT Park', floor: 2, area: 60, type: 'OFFICE', pricePerM2: 268000, status: 'OCCUPIED' },
  { id: 'u8', name: 'D-102', building: 'Piramit', floor: 1, area: 150, type: 'WAREHOUSE', pricePerM2: 200000, status: 'RESERVED' },
  { id: 'u9', name: 'D-401', building: 'Piramit', floor: 4, area: 85, type: 'OFFICE', pricePerM2: 200000, status: 'OCCUPIED' },
  { id: 'u10', name: 'E-102', building: 'Trillant Tower', floor: 1, area: 55, type: 'RETAIL', pricePerM2: 316000, status: 'VACANT' },
  { id: 'u11', name: 'SM-12', building: 'Savdo Markaz', floor: 1, area: 30, type: 'RETAIL', pricePerM2: 182000, status: 'OCCUPIED' },
  { id: 'u12', name: 'SM-15', building: 'Savdo Markaz', floor: 1, area: 28, type: 'RETAIL', pricePerM2: 182000, status: 'VACANT' },
]

const occupiedCount = computed(() => units.filter(u => u.status === 'OCCUPIED').length)
const vacantCount = computed(() => units.filter(u => u.status === 'VACANT').length)
const totalArea = computed(() => units.reduce((s, u) => s + u.area, 0))

const filteredUnits = computed(() => {
  let r = [...units]
  if (search.value) {
    const q = search.value.toLowerCase()
    r = r.filter(u => u.name.toLowerCase().includes(q) || u.building.toLowerCase().includes(q))
  }
  if (statusFilter.value) r = r.filter(u => u.status === statusFilter.value)
  if (typeFilter.value) r = r.filter(u => u.type === typeFilter.value)
  if (buildingFilter.value) r = r.filter(u => u.building === buildingFilter.value)
  return r
})

function formatShort(v: number) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(0) + 'M'
  if (v >= 1_000) return (v / 1_000).toFixed(0) + 'K'
  return String(v)
}
function statusLabel(s: string) { return { OCCUPIED: 'Band', VACANT: "Bo'sh", RESERVED: 'Rezerv' }[s] || s }
function statusBadge(s: string) { return { OCCUPIED: 'badge-success', VACANT: 'badge-warning', RESERVED: 'badge-brand' }[s] || 'badge-neutral' }
function typeLabel(t: string) { return { OFFICE: 'Ofis', RETAIL: 'Savdo', WAREHOUSE: 'Ombor', MIXED: 'Aralash' }[t] || t }
</script>
