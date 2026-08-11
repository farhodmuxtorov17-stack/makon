<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Hisoblagich ko'rsatkichlari</h1>
        <p class="text-ink-500 text-sm mt-1">{{ readings.length }} ta yozuv · {{ unreadCount }} o'qilmagan</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi ko'rsatkich</button>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KpiCard :icon="Zap" label="Elektr" :value="electricReadings" icon-color="#f59e0b" icon-bg="rgba(245,158,11,0.1)" />
      <KpiCard :icon="Droplets" label="Suv" :value="waterReadings" icon-color="#3b82f6" icon-bg="rgba(59,130,246,0.1)" />
      <KpiCard :icon="Flame" label="Gaz" :value="gasReadings" icon-color="#ef4444" icon-bg="rgba(239,68,68,0.1)" />
      <KpiCard :icon="AlertCircle" label="O'qilmagan" :value="unreadCount" icon-color="#6366f1" icon-bg="rgba(99,102,241,0.1)" />
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-2">
      <div class="relative flex-1 min-w-[200px]">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input v-model="search" type="text" placeholder="Unit, bino yoki hisoblagich..." class="w-full text-sm border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
      </div>
      <select v-model="typeFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
        <option value="">Barcha turlari</option>
        <option value="ELECTRIC">Elektr</option>
        <option value="WATER">Suv</option>
        <option value="GAS">Gaz</option>
      </select>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-4 py-3">Hisoblagich</th>
              <th class="text-left font-medium px-4 py-3 hidden sm:table-cell">Unit</th>
              <th class="text-center font-medium px-4 py-3">Tur</th>
              <th class="text-right font-medium px-4 py-3 hidden md:table-cell">Oldingi</th>
              <th class="text-right font-medium px-4 py-3">Joriy</th>
              <th class="text-right font-medium px-4 py-3 hidden lg:table-cell">Sarf</th>
              <th class="text-center font-medium px-4 py-3 hidden md:table-cell">Sana</th>
              <th class="text-center font-medium px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in filteredReadings" :key="r.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td class="px-4 py-3 font-mono text-xs text-ink-900 dark:text-white">{{ r.meterNumber }}</td>
              <td class="px-4 py-3 hidden sm:table-cell text-ink-500">{{ r.unit }} · {{ r.building }}</td>
              <td class="px-4 py-3 text-center">
                <component :is="typeIcon(r.type)" :size="16" :class="typeColor(r.type)" />
              </td>
              <td class="px-4 py-3 text-right hidden md:table-cell text-ink-500 font-mono">{{ r.previous }}</td>
              <td class="px-4 py-3 text-right font-mono font-medium text-ink-900 dark:text-white">{{ r.current }}</td>
              <td class="px-4 py-3 text-right hidden lg:table-cell font-mono text-brand-500">{{ r.consumption }}</td>
              <td class="px-4 py-3 text-center hidden md:table-cell text-xs text-ink-500">{{ r.date }}</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-[10px]" :class="r.read ? 'badge-success' : 'badge-warning'">{{ r.read ? "O'qilgan" : "Kutilmoqda" }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, Zap, Droplet, Flame, CheckCircle2 } from 'lucide-vue-next'
import KpiCard from '~/components/KpiCard.vue'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const search = ref('')
const typeFilter = ref('')

const readings = [
  { id: '1', meterNumber: 'EL-A301-001', unit: 'A-301', building: 'Tashkent City', type: 'ELECTRIC', previous: 14980, current: 15420, consumption: 440, date: '10 Avg', read: true },
  { id: '2', meterNumber: 'EL-B205-002', unit: 'B-205', building: 'Trillant Tower', type: 'ELECTRIC', previous: 28300, current: 28850, consumption: 550, date: '10 Avg', read: true },
  { id: '3', meterNumber: 'WT-A301-001', unit: 'A-301', building: 'Tashkent City', type: 'WATER', previous: 4820, current: 4950, consumption: 130, date: '10 Avg', read: true },
  { id: '4', meterNumber: 'WT-C101-001', unit: 'C-101', building: 'IT Park', type: 'WATER', previous: 2100, current: 2230, consumption: 130, date: '10 Avg', read: true },
  { id: '5', meterNumber: 'GS-D102-001', unit: 'D-102', building: 'Piramit', type: 'GAS', previous: 8500, current: 8650, consumption: 150, date: '09 Avg', read: true },
  { id: '6', meterNumber: 'EL-C201-003', unit: 'C-201', building: 'IT Park', type: 'ELECTRIC', previous: 12500, current: 0, consumption: 0, date: '—', read: false },
  { id: '7', meterNumber: 'EL-B501-004', unit: 'B-501', building: 'Tashkent City', type: 'ELECTRIC', previous: 35200, current: 0, consumption: 0, date: '—', read: false },
  { id: '8', meterNumber: 'GS-A301-002', unit: 'A-301', building: 'Tashkent City', type: 'GAS', previous: 3100, current: 3250, consumption: 150, date: '08 Avg', read: true },
]

const electricReadings = computed(() => readings.filter(r => r.type === 'ELECTRIC').length)
const waterReadings = computed(() => readings.filter(r => r.type === 'WATER').length)
const gasReadings = computed(() => readings.filter(r => r.type === 'GAS').length)
const unreadCount = computed(() => readings.filter(r => !r.read).length)
const readCount = computed(() => readings.filter(r => r.read).length)
const electricTotal = computed(() => readings.filter(r => r.type === 'ELECTRIC').reduce((s, r) => s + r.consumption, 0))
const waterTotal = computed(() => readings.filter(r => r.type === 'WATER').reduce((s, r) => s + r.consumption, 0))
const gasTotal = computed(() => readings.filter(r => r.type === 'GAS').reduce((s, r) => s + r.consumption, 0))

const filteredReadings = computed(() => {
  let r = [...readings]
  if (search.value) {
    const q = search.value.toLowerCase()
    r = r.filter(x => x.meterNumber.toLowerCase().includes(q) || x.unit.toLowerCase().includes(q) || x.building.toLowerCase().includes(q))
  }
  if (typeFilter.value) r = r.filter(x => x.type === typeFilter.value)
  return r
})

function typeIcon(t: string) { return { ELECTRIC: Zap, WATER: Droplet, GAS: Flame }[t] || Zap }
function typeColor(t: string) { return { ELECTRIC: 'text-amber-500', WATER: 'text-blue-500', GAS: 'text-red-500' }[t] || 'text-ink-500' }
</script>
