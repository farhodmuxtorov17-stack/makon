<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Global Dashboard</h1>
        <p class="text-ink-500 text-sm mt-1">Barcha obyektlar bo'yicha strategik monitoring</p>
      </div>
      <div class="flex items-center gap-2">
        <select v-model="period" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
          <option value="month">Oylik</option>
          <option value="quarter">Choraklik</option>
          <option value="year">Yillik</option>
        </select>
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <div v-for="kpi in kpis" :key="kpi.label" class="card p-4 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :style="{ background: kpi.bg }">
            <component :is="kpi.icon" :size="20" :style="{ color: kpi.color }" />
          </div>
          <div v-if="kpi.trend" class="ml-auto text-xs font-bold" :class="kpi.trend > 0 ? 'text-emerald-500' : 'text-red-500'">
            {{ kpi.trend > 0 ? '↑' : '↓' }} {{ Math.abs(kpi.trend) }}%
          </div>
        </div>
        <div class="text-2xl font-bold text-ink-900 dark:text-white">{{ kpi.value }}</div>
        <div class="text-xs text-ink-500 mt-0.5">{{ kpi.label }}</div>
      </div>
    </div>

    <!-- Charts row 1 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Revenue trend -->
      <div class="card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-ink-900 dark:text-white">Tushum dinamikasi</h3>
          <div class="flex items-center gap-3 text-xs text-ink-500">
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-brand-500"></span> Tushum</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> To'langan</span>
          </div>
        </div>
        <MakonChart type="area" :series="revenueSeries" :categories="months" :height="280" :colors="['#6366f1', '#10b981']" />
      </div>

      <!-- Occupancy donut -->
      <div class="card p-6">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Bandlik darajasi</h3>
        <MakonChart type="donut" :series="occupancyData" :donutLabels="['Band', 'Bo\'sh']" :height="280" :colors="['#6366f1', '#e4e4e7']" />
        <div class="grid grid-cols-2 gap-3 mt-4">
          <div class="text-center">
            <div class="text-lg font-bold text-ink-900 dark:text-white">1,089</div>
            <div class="text-xs text-ink-500">Band unitlar</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-bold text-ink-900 dark:text-white">159</div>
            <div class="text-xs text-ink-500">Bo'sh unitlar</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts row 2 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Building revenue comparison -->
      <div class="card p-6">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Binolar bo'yicha tushum</h3>
        <MakonChart type="bar" :series="buildingRevenueSeries" :categories="buildingNames" :height="260" :colors="['#6366f1']" />
      </div>

      <!-- Application funnel -->
      <div class="card p-6">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Ariza funnel</h3>
        <MakonChart type="bar" :series="funnelSeries" :categories="funnelLabels" :height="260" :colors="['#6366f1']" />
      </div>
    </div>

    <!-- SLA & Alerts -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- SLA radial -->
      <div class="card p-6">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Servis SLA</h3>
        <MakonChart type="radialBar" :series="[94]" :height="200" :colors="['#10b981']" />
        <div class="grid grid-cols-3 gap-2 mt-2">
          <div class="text-center p-2 rounded-lg bg-emerald-500/5">
            <div class="text-sm font-bold text-emerald-500">94%</div>
            <div class="text-[10px] text-ink-500">Ichida</div>
          </div>
          <div class="text-center p-2 rounded-lg bg-amber-500/5">
            <div class="text-sm font-bold text-amber-500">4%</div>
            <div class="text-[10px] text-ink-500">Yaqin</div>
          </div>
          <div class="text-center p-2 rounded-lg bg-red-500/5">
            <div class="text-sm font-bold text-red-500">2%</div>
            <div class="text-[10px] text-ink-500">Buzilgan</div>
          </div>
        </div>
      </div>

      <!-- Overdue alerts -->
      <div class="card p-6">
        <div class="flex items-center gap-2 mb-4">
          <AlertCircle :size="18" class="text-red-500" />
          <h3 class="font-semibold text-ink-900 dark:text-white">Muddati o'tgan to'lovlar</h3>
        </div>
        <div class="space-y-2">
          <div v-for="alert in overdueAlerts" :key="alert.id" class="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
            <div class="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <Receipt :size="14" class="text-red-500" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-ink-900 dark:text-white truncate">{{ alert.tenant }}</div>
              <div class="text-xs text-ink-500">{{ alert.days }} kun o'tdi · {{ alert.amount }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Material queue -->
      <div class="card p-6">
        <div class="flex items-center gap-2 mb-4">
          <Package :size="18" class="text-amber-500" />
          <h3 class="font-semibold text-ink-900 dark:text-white">Material tasdiqlari</h3>
        </div>
        <div class="space-y-2">
          <div v-for="req in materialQueue" :key="req.id" class="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <Package :size="16" class="text-amber-500 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-ink-900 dark:text-white truncate">{{ req.workOrder }}</div>
              <div class="text-xs text-ink-500">{{ req.building }} · {{ req.date }}</div>
            </div>
            <span class="badge badge-warning text-xs flex-shrink-0">{{ req.amount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Buildings table -->
    <div class="card overflow-hidden">
      <div class="p-5 border-b border-black/5 dark:border-white/5">
        <h3 class="font-semibold text-ink-900 dark:text-white">Binolar bo'yicha holat</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-5 py-3">Bino</th>
              <th class="text-center font-medium px-5 py-3 hidden md:table-cell">Unitlar</th>
              <th class="text-center font-medium px-5 py-3">Bandlik</th>
              <th class="text-right font-medium px-5 py-3 hidden sm:table-cell">Oylik tushum</th>
              <th class="text-center font-medium px-5 py-3 hidden lg:table-cell">Arizalar</th>
              <th class="text-center font-medium px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in buildingsTable" :key="b.name" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td class="px-5 py-3 font-medium text-ink-900 dark:text-white">{{ b.name }}</td>
              <td class="px-5 py-3 text-center hidden md:table-cell text-ink-500">{{ b.units }}</td>
              <td class="px-5 py-3 text-center">
                <div class="inline-flex items-center gap-2">
                  <div class="w-16 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <div class="h-full rounded-full" :style="{ width: b.occupancy + '%', background: b.occupancy > 80 ? '#10b981' : b.occupancy > 60 ? '#f59e0b' : '#ef4444' }"></div>
                  </div>
                  <span class="text-xs font-medium text-ink-500">{{ b.occupancy }}%</span>
                </div>
              </td>
              <td class="px-5 py-3 text-right hidden sm:table-cell font-medium">{{ b.revenue }}</td>
              <td class="px-5 py-3 text-center hidden lg:table-cell">
                <span v-if="b.applications > 0" class="badge badge-brand text-xs">{{ b.applications }}</span>
                <span v-else class="text-ink-400 text-xs">—</span>
              </td>
              <td class="px-5 py-3 text-center">
                <span class="badge" :class="b.statusBadge">{{ b.statusLabel }}</span>
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
  Building2, Layers, CheckCircle2, TrendingUp, AlertCircle, FileText,
  Receipt, Package, Download,
} from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const period = ref('month')

const kpis = [
  { icon: Building2, label: 'Binolar', value: '24', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', trend: 8 },
  { icon: Layers, label: 'Jami unitlar', value: '1,248', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', trend: 3 },
  { icon: CheckCircle2, label: 'Bandlik', value: '87.3%', color: '#10b981', bg: 'rgba(16,185,129,0.1)', trend: 2 },
  { icon: TrendingUp, label: 'Oylik tushum', value: '1.42 mlr', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', trend: 12 },
  { icon: AlertCircle, label: 'Muddati o\'tgan', value: '42', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', trend: -5 },
  { icon: FileText, label: 'Aktiv arizalar', value: '18', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', trend: 4 },
]

const months = ['Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg']
const revenueSeries = [
  { name: 'Tushum', data: [980, 1050, 1120, 1180, 1250, 1420] },
  { name: 'To\'langan', data: [850, 920, 980, 1090, 1150, 1295] },
]

const occupancyData = [1089, 159]

const buildingNames = ['Tashkent City', 'Trillant Tower', 'IT Park', 'Piramit', 'Savdo Markaz', 'Bektemir']
const buildingRevenueSeries = [
  { name: 'Tushum (mln)', data: [420, 380, 280, 180, 95, 65] },
]

const funnelLabels = ['Ko\'rishlar', 'Arizalar', 'Shartnomalar', 'Imzolangan']
const funnelSeries = [
  { name: 'Soni', data: [842, 156, 42, 28] },
]

const overdueAlerts = [
  { id: '1', tenant: 'Export Group MChJ', days: 5, amount: '22.0M so\'m' },
  { id: '2', tenant: 'Logistics Plus', days: 5, amount: '15.0M so\'m' },
  { id: '3', tenant: 'ABC Logistics MChJ', days: 10, amount: '12.5M so\'m' },
]

const materialQueue = [
  { id: '1', workOrder: 'WO-2026-038', building: 'Tashkent City', date: '10 Avg', amount: '2.4M' },
  { id: '2', workOrder: 'WO-2026-037', building: 'IT Park', date: '09 Avg', amount: '1.8M' },
  { id: '3', workOrder: 'WO-2026-036', building: 'Trillant Tower', date: '08 Avg', amount: '0.9M' },
]

const buildingsTable = [
  { name: 'Tashkent City', units: 420, occupancy: 90, revenue: '420M so\'m', applications: 8, statusBadge: 'badge-success', statusLabel: 'Faol' },
  { name: 'Trillant Tower', units: 180, occupancy: 95, revenue: '380M so\'m', applications: 3, statusBadge: 'badge-success', statusLabel: 'Faol' },
  { name: 'IT Park', units: 150, occupancy: 82, revenue: '280M so\'m', applications: 5, statusBadge: 'badge-success', statusLabel: 'Faol' },
  { name: 'Piramit', units: 90, occupancy: 78, revenue: '180M so\'m', applications: 2, statusBadge: 'badge-warning', statusLabel: 'Eslatma' },
  { name: 'Savdo Markaz', units: 120, occupancy: 79, revenue: '95M so\'m', applications: 0, statusBadge: 'badge-success', statusLabel: 'Faol' },
  { name: 'Bektemir Sanoat', units: 288, occupancy: 72, revenue: '65M so\'m', applications: 0, statusBadge: 'badge-warning', statusLabel: 'Past bandlik' },
]
</script>
