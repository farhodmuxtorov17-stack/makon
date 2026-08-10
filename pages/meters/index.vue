<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Hisoblagichlar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ meters.length }} ta hisoblagich · {{ unreadCount }} o'qilmagan</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
        <button class="btn btn-primary btn-sm"><Plus :size="14" /> Ko'rsatkich kiritish</button>
      </div>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><Gauge :size="16" class="text-blue-500" /></div>
          <span class="text-xs text-ink-500">Elektr</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ typeCounts.ELECTRICITY }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center"><Droplet :size="16" class="text-cyan-500" /></div>
          <span class="text-xs text-ink-500">Suv</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ typeCounts.WATER }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><Flame :size="16" class="text-amber-500" /></div>
          <span class="text-xs text-ink-500">Gaz</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ typeCounts.GAS }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"><AlertCircle :size="16" class="text-red-500" /></div>
          <span class="text-xs text-ink-500">O'qilmagan</span>
        </div>
        <div class="text-xl font-bold text-red-500">{{ unreadCount }}</div>
      </div>
    </div>

    <!-- Consumption chart -->
    <div class="card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">Sarflash dinamikasi (6 oy)</h3>
      </div>
      <MakonChart type="bar" :series="consumptionSeries" :categories="months" :height="220" :colors="['#f59e0b', '#3b82f6', '#ef4444']" :stacked="true" />
    </div>

    <!-- Filter tabs -->
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5">
        <button
          v-for="tab in typeTabs"
          :key="tab.value"
          @click="activeType = tab.value"
          class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          :class="activeType === tab.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500 hover:text-ink-800'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Meters table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-4 py-3">Hisoblagich</th>
              <th class="text-left font-medium px-4 py-3 hidden sm:table-cell">Bino / Unit</th>
              <th class="text-left font-medium px-4 py-3">Turi</th>
              <th class="text-right font-medium px-4 py-3">Joriy ko'rsatkich</th>
              <th class="text-right font-medium px-4 py-3 hidden md:table-cell">Oldingi</th>
              <th class="text-right font-medium px-4 py-3 hidden sm:table-cell">Sarflash</th>
              <th class="text-center font-medium px-4 py-3 hidden md:table-cell">O'qilgan</th>
              <th class="text-center font-medium px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in filteredMeters" :key="m.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <td class="px-4 py-3 font-mono text-xs text-ink-700 dark:text-ink-300">{{ m.number }}</td>
              <td class="px-4 py-3 hidden sm:table-cell">
                <div class="text-xs font-medium text-ink-900 dark:text-white">{{ m.building }}</div>
                <div class="text-xs text-ink-500">{{ m.unit }}</div>
              </td>
              <td class="px-4 py-3">
                <span class="badge text-xs" :class="typeBadge(m.type)">{{ typeLabel(m.type) }}</span>
              </td>
              <td class="px-4 py-3 text-right font-mono font-semibold text-ink-900 dark:text-white">{{ formatReading(m.currentReading, m.type) }}</td>
              <td class="px-4 py-3 text-right hidden md:table-cell font-mono text-xs text-ink-500">{{ formatReading(m.previousReading, m.type) }}</td>
              <td class="px-4 py-3 text-right hidden sm:table-cell font-mono text-sm">
                <span :class="m.consumption > 0 ? 'text-amber-500 font-medium' : 'text-ink-400'">{{ m.consumption }}</span>
                <span class="text-xs text-ink-400"> {{ m.unit }}</span>
              </td>
              <td class="px-4 py-3 text-center hidden md:table-cell text-xs text-ink-500">{{ m.lastReadDate }}</td>
              <td class="px-4 py-3 text-center">
                <span v-if="m.status === 'UNREAD'" class="badge badge-danger text-xs">O'qilmagan</span>
                <span v-else class="badge badge-success text-xs">OK</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Plus, Download, Gauge, Droplet, Flame, AlertCircle,
} from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const activeType = ref('all')

interface Meter {
  id: string; number: string; building: string; unit: string;
  type: 'ELECTRICITY' | 'WATER' | 'GAS';
  currentReading: number; previousReading: number; consumption: number;
  unit: string; lastReadDate: string; status: 'READ' | 'UNREAD';
}

const meters: Meter[] = [
  { id: '1', number: 'EL-001', building: 'Tashkent City', unit: 'A-301', type: 'ELECTRICITY', currentReading: 15420, previousReading: 14980, consumption: 440, unit: 'kWh', lastReadDate: '01 Avg', status: 'READ' },
  { id: '2', number: 'EL-002', building: 'Tashkent City', unit: 'A-302', type: 'ELECTRICITY', currentReading: 12850, previousReading: 12400, consumption: 450, unit: 'kWh', lastReadDate: '01 Avg', status: 'READ' },
  { id: '3', number: 'EL-003', building: 'Trillant Tower', unit: 'B-501', type: 'ELECTRICITY', currentReading: 0, previousReading: 18900, consumption: 0, unit: 'kWh', lastReadDate: '15 Iyl', status: 'UNREAD' },
  { id: '4', number: 'WT-001', building: 'Tashkent City', unit: 'A-301', type: 'WATER', currentReading: 3420, previousReading: 3290, consumption: 130, unit: 'm³', lastReadDate: '01 Avg', status: 'READ' },
  { id: '5', number: 'WT-002', building: 'IT Park', unit: 'C-201', type: 'WATER', currentReading: 0, previousReading: 2890, consumption: 0, unit: 'm³', lastReadDate: '30 Iyl', status: 'UNREAD' },
  { id: '6', number: 'WT-003', building: 'Piramit', unit: 'D-102', type: 'WATER', currentReading: 1850, previousReading: 1780, consumption: 70, unit: 'm³', lastReadDate: '01 Avg', status: 'READ' },
  { id: '7', number: 'GS-001', building: 'Tashkent City', unit: 'A-301', type: 'GAS', currentReading: 9200, previousReading: 9050, consumption: 150, unit: 'm³', lastReadDate: '01 Avg', status: 'READ' },
  { id: '8', number: 'GS-002', building: 'Bektemir', unit: 'G-001', type: 'GAS', currentReading: 0, previousReading: 4500, consumption: 0, unit: 'm³', lastReadDate: '28 Iyl', status: 'UNREAD' },
  { id: '9', number: 'EL-004', building: 'IT Park', unit: 'C-205', type: 'ELECTRICITY', currentReading: 8900, previousReading: 8650, consumption: 250, unit: 'kWh', lastReadDate: '01 Avg', status: 'READ' },
  { id: '10', number: 'EL-005', building: 'Piramit', unit: 'D-201', type: 'ELECTRICITY', currentReading: 0, previousReading: 11200, consumption: 0, unit: 'kWh', lastReadDate: '25 Iyl', status: 'UNREAD' },
  { id: '11', number: 'WT-004', building: 'Trillant Tower', unit: 'B-302', type: 'WATER', currentReading: 4100, previousReading: 3980, consumption: 120, unit: 'm³', lastReadDate: '01 Avg', status: 'READ' },
  { id: '12', number: 'GS-003', building: 'IT Park', unit: 'C-301', type: 'GAS', currentReading: 3100, previousReading: 3050, consumption: 50, unit: 'm³', lastReadDate: '01 Avg', status: 'READ' },
]

const typeTabs = [
  { value: 'all', label: 'Barchasi' },
  { value: 'ELECTRICITY', label: 'Elektr' },
  { value: 'WATER', label: 'Suv' },
  { value: 'GAS', label: 'Gaz' },
]

const filteredMeters = computed(() => {
  if (activeType.value === 'all') return meters
  return meters.filter(m => m.type === activeType.value)
})

const typeCounts = computed(() => ({
  ELECTRICITY: meters.filter(m => m.type === 'ELECTRICITY').length,
  WATER: meters.filter(m => m.type === 'WATER').length,
  GAS: meters.filter(m => m.type === 'GAS').length,
}))

const unreadCount = computed(() => meters.filter(m => m.status === 'UNREAD').length)

const months = ['Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg']
const consumptionSeries = [
  { name: 'Elektr (kWh)', data: [3200, 3450, 3100, 3800, 3650, 3900] },
  { name: 'Suv (m³)', data: [890, 950, 820, 1050, 980, 1100] },
  { name: 'Gaz (m³)', data: [420, 380, 350, 480, 400, 450] },
]

function formatReading(value: number, type: string) {
  if (value === 0) return '—'
  return new Intl.NumberFormat('ru-RU').format(value)
}

function typeBadge(type: string) {
  return { ELECTRICITY: 'badge-brand', WATER: 'badge-info', GAS: 'badge-warning' }[type] || 'badge-neutral'
}

function typeLabel(type: string) {
  return { ELECTRICITY: 'Elektr', WATER: 'Suv', GAS: 'Gaz' }[type] || type
}
</script>
