<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Moliya davrlari</h1>
        <p class="text-ink-500 text-sm mt-1">Hisob-kitob davrlari va holati</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="16" /> Yangi davr</button>
    </div>

    <!-- Stats with 3D icons -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="flex items-start justify-between mb-3">
          <KpiCard :icon="Layers" label="Jami davrlar" value="{{ periods.length }}" icon-color="#6366f1" icon-bg="rgba(99,102,241,0.1)" />
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ periods.length }}</div>
        <div class="text-xs text-ink-500 mt-0.5">Jami davrlar</div>
      </div>
      <div class="card p-4">
        <div class="flex items-start justify-between mb-3">
          <KpiCard :icon="CheckCircle2" label="Jami davrlar" value="{{ periods.length }}" icon-color="#10b981" icon-bg="rgba(16,185,129,0.1)" />
        </div>
        <div class="text-xl font-bold text-emerald-500">{{ closedCount }}</div>
        <div class="text-xs text-ink-500 mt-0.5">Yopilgan</div>
      </div>
      <div class="card p-4">
        <div class="flex items-start justify-between mb-3">
          <KpiCard :icon="AlertCircle" label="Yopilgan" value="{{ closedCount }}" icon-color="#ef4444" icon-bg="rgba(239,68,68,0.1)" />
        </div>
        <div class="text-xl font-bold text-amber-500">{{ openCount }}</div>
        <div class="text-xs text-ink-500 mt-0.5">Faol davr</div>
      </div>
      <div class="card p-4">
        <div class="flex items-start justify-between mb-3">
          <KpiCard :icon="DollarSign" label="Faol davr" value="{{ openCount }}" icon-color="#f59e0b" icon-bg="rgba(245,158,11,0.1)" />
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ totalRevenue }}</div>
        <div class="text-xs text-ink-500 mt-0.5">Jami daromad (oy)</div>
      </div>
    </div>

    <!-- Revenue chart -->
    <div class="card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">Daromad dinamikasi (8 oy)</h3>
        <div class="flex items-center gap-3 text-xs text-ink-500">
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-brand-500"></span> Daromad</span>
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-red-400"></span> Qarz</span>
        </div>
      </div>
      <MakonChart type="bar" :series="chartSeries" :categories="chartMonths" :height="220" :colors="['#6366f1', '#ef4444']" :stacked="true" />
    </div>

    <!-- Periods table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 uppercase tracking-widest border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">Davr</th>
              <th class="px-4 py-3">Yil</th>
              <th class="px-4 py-3 text-center">Invoyslar</th>
              <th class="px-4 py-3 text-center hidden md:table-cell">To'langan</th>
              <th class="px-4 py-3 text-right">Daromad</th>
              <th class="px-4 py-3 text-right">Qarz</th>
              <th class="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in periods" :key="p.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td class="px-4 py-3 font-medium text-ink-900 dark:text-white">{{ p.label }}</td>
              <td class="px-4 py-3 text-ink-500">{{ p.year }}</td>
              <td class="px-4 py-3 text-center text-ink-700 dark:text-ink-300">{{ p.invoiceCount }}</td>
              <td class="px-4 py-3 text-center hidden md:table-cell text-emerald-500">{{ p.paidCount }}</td>
              <td class="px-4 py-3 text-right font-medium text-emerald-500">{{ p.revenue }}</td>
              <td class="px-4 py-3 text-right text-red-500">{{ p.debt }}</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-xs" :class="p.status === 'OPEN' ? 'badge-warning' : 'badge-success'">{{ p.status === 'OPEN' ? 'Faol' : 'Yopilgan' }}</span>
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
import { Plus, Calendar, CheckCircle2, Clock, Wallet } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const periods = [
  { id: 'p1', label: 'Avgust', year: 2026, invoiceCount: 42, paidCount: 35, revenue: '295.0M', debt: '85.0M', status: 'OPEN' },
  { id: 'p2', label: 'Iyul', year: 2026, invoiceCount: 41, paidCount: 40, revenue: '365.0M', debt: '10.0M', status: 'CLOSED' },
  { id: 'p3', label: 'Iyun', year: 2026, invoiceCount: 40, paidCount: 40, revenue: '370.0M', debt: '0', status: 'CLOSED' },
  { id: 'p4', label: 'May', year: 2026, invoiceCount: 39, paidCount: 38, revenue: '360.0M', debt: '5.0M', status: 'CLOSED' },
  { id: 'p5', label: 'Aprel', year: 2026, invoiceCount: 38, paidCount: 37, revenue: '352.0M', debt: '8.0M', status: 'CLOSED' },
  { id: 'p6', label: 'Mart', year: 2026, invoiceCount: 37, paidCount: 35, revenue: '345.0M', debt: '15.0M', status: 'CLOSED' },
  { id: 'p7', label: 'Fevral', year: 2026, invoiceCount: 36, paidCount: 34, revenue: '338.0M', debt: '12.0M', status: 'CLOSED' },
  { id: 'p8', label: 'Yanvar', year: 2026, invoiceCount: 35, paidCount: 33, revenue: '330.0M', debt: '18.0M', status: 'CLOSED' },
]

const closedCount = periods.filter(p => p.status === 'CLOSED').length
const openCount = periods.filter(p => p.status === 'OPEN').length
const totalRevenue = '295.0M'

const chartMonths = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg']
const chartSeries = [
  { name: 'Daromad (mln so\'m)', data: [330, 338, 345, 352, 360, 370, 365, 295] },
  { name: 'Qarz (mln so\'m)', data: [18, 12, 15, 8, 5, 0, 10, 85] },
]
</script>
