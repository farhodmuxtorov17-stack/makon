<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Hisobotlar</h1>
        <p class="text-ink-500 text-sm mt-1">Tizim analitikasi va ko'rsatkichlar</p>
      </div>
      <div class="flex items-center gap-2">
        <select v-model="period" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
          <option value="month">Oylik</option>
          <option value="quarter">Choraklik</option>
          <option value="year">Yillik</option>
        </select>
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> PDF</button>
        <button class="btn btn-secondary btn-sm"><FileSpreadsheet :size="14" /> Excel</button>
      </div>
    </div>

    <!-- KPI row -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div v-for="kpi in kpis" :key="kpi.label" class="card p-4 relative overflow-hidden">
        <div class="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" :style="{ background: kpi.barColor }"></div>
        <div class="flex items-start justify-between mb-2">
          <KpiScene3D :type="kpi.scene" :size="44" />
          <span v-if="kpi.trend" class="text-xs font-bold flex items-center gap-0.5" :class="kpi.trend > 0 ? 'text-emerald-500' : 'text-red-500'">
            <component :is="kpi.trend > 0 ? TrendingUp : TrendingDown" :size="11" /> {{ Math.abs(kpi.trend) }}%
          </span>
        </div>
        <div class="text-xl font-bold" :class="kpi.color">{{ kpi.value }}</div>
        <div class="text-xs text-ink-500 mt-0.5">{{ kpi.label }}</div>
      </div>
    </div>

    <!-- Charts row 1 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Revenue by building -->
      <div class="card p-5 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-ink-900 dark:text-white">Binolar bo'yicha tushum (6 oy)</h3>
        </div>
        <MakonChart type="bar" :series="revenueByBuilding" :categories="months" :height="280" :colors="['#6366f1', '#3b82f6', '#10b981', '#f59e0b']" :stacked="true" />
      </div>

      <!-- Conversion donut -->
      <div class="card p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Ariza konversiyasi</h3>
        <MakonChart type="donut" :series="[842, 156, 42, 28]" :donutLabels="['Ko\'rishlar', 'Arizalar', 'Shartnomalar', 'Imzolangan']" :height="280" :colors="['#3b82f6', '#6366f1', '#a855f7', '#10b981']" />
      </div>
    </div>

    <!-- Charts row 2 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Occupancy trend -->
      <div class="card p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Bandlik dinamikasi</h3>
        <MakonChart type="area" :series="occupancySeries" :categories="months" :height="240" :colors="['#10b981']" />
      </div>

      <!-- Service SLA -->
      <div class="card p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Servis SLA holati (kategoriya bo'yicha)</h3>
        <MakonChart type="bar" :series="slaSeries" :categories="slaCategories" :height="240" :colors="['#10b981', '#f59e0b', '#ef4444']" :horizontal="true" :stacked="true" />
      </div>
    </div>

    <!-- Building performance table -->
    <div class="card overflow-hidden">
      <div class="p-5 border-b border-black/5 dark:border-white/5">
        <h3 class="font-semibold text-ink-900 dark:text-white">Binolar bo'yicha ko'rsatkichlar</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-5 py-3">Bino</th>
              <th class="text-center font-medium px-5 py-3 hidden md:table-cell">Unitlar</th>
              <th class="text-center font-medium px-5 py-3">Bandlik</th>
              <th class="text-right font-medium px-5 py-3 hidden sm:table-cell">Oylik tushum</th>
              <th class="text-right font-medium px-5 py-3 hidden lg:table-cell">Metr² narxi</th>
              <th class="text-center font-medium px-5 py-3 hidden md:table-cell">Arizalar</th>
              <th class="text-center font-medium px-5 py-3">SLA</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in buildingsReport" :key="b.name" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td class="px-5 py-3 font-medium text-ink-900 dark:text-white">{{ b.name }}</td>
              <td class="px-5 py-3 text-center hidden md:table-cell text-ink-500">{{ b.units }}</td>
              <td class="px-5 py-3 text-center">
                <div class="inline-flex items-center gap-2">
                  <div class="w-14 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <div class="h-full rounded-full" :style="{ width: b.occupancy + '%', background: b.occupancy > 80 ? '#10b981' : b.occupancy > 60 ? '#f59e0b' : '#ef4444' }"></div>
                  </div>
                  <span class="text-xs font-medium text-ink-500">{{ b.occupancy }}%</span>
                </div>
              </td>
              <td class="px-5 py-3 text-right hidden sm:table-cell font-medium">{{ formatShort(b.revenue) }}</td>
              <td class="px-5 py-3 text-right hidden lg:table-cell text-ink-500">{{ formatShort(b.pricePerM2) }}</td>
              <td class="px-5 py-3 text-center hidden md:table-cell">
                <span v-if="b.apps > 0" class="badge badge-brand text-xs">{{ b.apps }}</span>
                <span v-else class="text-ink-400 text-xs">—</span>
              </td>
              <td class="px-5 py-3 text-center">
                <span class="text-sm font-bold" :class="b.sla >= 90 ? 'text-emerald-500' : b.sla >= 75 ? 'text-amber-500' : 'text-red-500'">{{ b.sla }}%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Recent activity feed -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">So'nggi faollik</h3>
        <div class="space-y-2">
          <div v-for="a in activities" :key="a.id" class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :class="a.iconBg">
              <component :is="a.icon" :size="15" :class="a.iconColor" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm text-ink-900 dark:text-white truncate">{{ a.text }}</div>
              <div class="text-xs text-ink-400">{{ a.time }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Top ijarachi (daromad)</h3>
        <div class="space-y-2">
          <div v-for="(t, i) in topTenants" :key="t.name" class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <span class="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" :class="i === 0 ? 'bg-amber-500/15 text-amber-500' : 'bg-ink-500/10 text-ink-500'">{{ i + 1 }}</span>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-ink-900 dark:text-white truncate">{{ t.name }}</div>
              <div class="text-xs text-ink-500">{{ t.units }} unit · {{ t.building }}</div>
            </div>
            <span class="text-sm font-bold text-brand-500 flex-shrink-0">{{ formatShort(t.revenue) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KpiScene3D from '~/components/KpiScene3D.vue'
import { Download, FileSpreadsheet, TrendingUp, TrendingDown, FileText, CheckCircle2, AlertCircle, Wrench, Building2, Users } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const period = ref('month')

const kpis = [
  { label: 'Konversiya', value: '68%', color: 'text-emerald-500', trend: 5 },
  { label: "O'rtacha ijara", value: '23.4M', color: 'text-ink-900 dark:text-white', trend: 3 },
  { label: 'Hal qilish', value: '2.1 kun', color: 'text-ink-900 dark:text-white', trend: -8 },
  { label: 'Mamnunlik', value: '92%', color: 'text-emerald-500', trend: 3 },
  { label: 'KPI Score', value: '8.4/10', color: 'text-brand-500', trend: 2 },
]

const months = ['Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg']
const revenueByBuilding = [
  { name: 'Tashkent City', data: [380, 390, 400, 410, 415, 420] },
  { name: 'Trillant Tower', data: [340, 350, 360, 365, 375, 380] },
  { name: 'IT Park', data: [250, 255, 260, 270, 275, 280] },
  { name: 'Piramit', data: [160, 165, 170, 172, 175, 180] },
]

const occupancySeries = [
  { name: 'Bandlik %', data: [82, 83, 84, 85, 86, 87.3] },
]

const slaCategories = ['Elektr', 'Santexnika', 'Devor', 'Lift', 'Eshik', 'Konditsioner']
const slaSeries = [
  { name: 'SLA ichida', data: [45, 38, 22, 18, 15, 12] },
  { name: 'SLA yaqin', data: [3, 2, 1, 1, 2, 1] },
  { name: 'SLA buzilgan', data: [1, 1, 0, 0, 1, 0] },
]

const buildingsReport = [
  { name: 'Tashkent City', units: 420, occupancy: 90, revenue: 420000000, pricePerM2: 294000, apps: 8, sla: 96 },
  { name: 'Trillant Tower', units: 180, occupancy: 95, revenue: 380000000, pricePerM2: 316000, apps: 3, sla: 98 },
  { name: 'IT Park', units: 150, occupancy: 82, revenue: 280000000, pricePerM2: 268000, apps: 5, sla: 92 },
  { name: 'Piramit', units: 90, occupancy: 78, revenue: 180000000, pricePerM2: 200000, apps: 2, sla: 85 },
  { name: 'Savdo Markaz', units: 120, occupancy: 79, revenue: 95000000, pricePerM2: 182000, apps: 0, sla: 90 },
  { name: 'Bektemir Sanoat', units: 288, occupancy: 72, revenue: 65000000, pricePerM2: 95000, apps: 0, sla: 78 },
]

const activities = [
  { id: '1', text: 'Yangi shartnoma CTR-2026-010 imzolandi', time: '5 daq oldin', icon: FileText, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-500' },
  { id: '2', text: 'ABC Logistics MChJ 22M so\'m to\'ladi', time: '20 daq oldin', icon: CheckCircle2, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-500' },
  { id: '3', text: 'Export Group MChJ invoys muddati o\'tdi', time: '1 soat oldin', icon: AlertCircle, iconBg: 'bg-red-500/10', iconColor: 'text-red-500' },
  { id: '4', text: 'Work order WO-038 yaratildi (Tashkent City)', time: '2 soat oldin', icon: Wrench, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-500' },
  { id: '5', text: 'Yangi bino "Savdo Markaz" qo\'shildi', time: '5 soat oldin', icon: Building2, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-500' },
  { id: '6', text: '5 ta yangi ariza qabul qilindi', time: '1 kun oldin', icon: FileText, iconBg: 'bg-indigo-500/10', iconColor: 'text-indigo-500' },
]

const topTenants = [
  { name: 'Smart Solutions MChJ', units: 3, building: 'IT Park + Trillant', revenue: 95000000 },
  { name: 'ABC Logistics MChJ', units: 2, building: 'Tashkent City', revenue: 50000000 },
  { name: 'Global Trade MChJ', units: 2, building: 'Tashkent City', revenue: 42000000 },
  { name: 'Mega Group MChJ', units: 1, building: 'Trillant Tower', revenue: 32000000 },
  { name: 'Tech Hub MChJ', units: 1, building: 'IT Park', revenue: 28000000 },
]

function formatShort(v: number) {
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1) + 'B'
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M'
  if (v >= 1_000) return (v / 1_000).toFixed(0) + 'K'
  return String(v)
}
</script>
