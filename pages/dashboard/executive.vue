<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Global Dashboard</h1>
      <p class="text-ink-500 text-sm mt-1">Barcha obyektlar bo\'yicha strategik monitoring (read-only)</p>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center"><Building2 :size="18" class="text-blue-500" /></div>
        </div>
        <div class="text-2xl font-bold">24</div>
        <div class="text-xs text-ink-500">Binolar</div>
      </div>
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center"><Layers :size="18" class="text-indigo-500" /></div>
        </div>
        <div class="text-2xl font-bold">1,248</div>
        <div class="text-xs text-ink-500">Jami unitlar</div>
      </div>
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center"><CheckCircle2 :size="18" class="text-emerald-500" /></div>
        </div>
        <div class="text-2xl font-bold">87.3<span class="text-sm text-ink-500">%</span></div>
        <div class="text-xs text-ink-500">Bandlik</div>
      </div>
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center"><TrendingUp :size="18" class="text-amber-500" /></div>
        </div>
        <div class="text-2xl font-bold">1.42<span class="text-sm text-ink-500"> mlr</span></div>
        <div class="text-xs text-ink-500">Oylik tushum</div>
      </div>
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center"><AlertCircle :size="18" class="text-red-500" /></div>
        </div>
        <div class="text-2xl font-bold text-red-500">42</div>
        <div class="text-xs text-ink-500">Muddati o\'tgan</div>
      </div>
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center"><FileText :size="18" class="text-purple-500" /></div>
        </div>
        <div class="text-2xl font-bold">18</div>
        <div class="text-xs text-ink-500">Aktiv arizalar</div>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Application funnel -->
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Ariza funnel</h3>
        <div class="space-y-3">
          <div v-for="stage in funnel" :key="stage.label" class="flex items-center gap-3">
            <span class="text-xs text-ink-500 w-24">{{ stage.label }}</span>
            <div class="flex-1 h-8 rounded-lg bg-black/5 dark:bg-white/5 overflow-hidden relative">
              <div class="h-full rounded-lg flex items-center px-3 text-xs font-medium text-white transition-all" :style="{ width: (stage.count / funnel[0].count * 100) + '%', background: stage.color }">
                {{ stage.count }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue chart -->
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Tushum dinamikasi (6 oy)</h3>
        <div class="flex items-end justify-between h-40 gap-2">
          <div v-for="(r, i) in revenue" :key="i" class="flex-1 flex flex-col items-center gap-1">
            <div class="w-full rounded-t bg-brand-500/30 hover:bg-brand-500 transition-all cursor-pointer" :style="{ height: barHeight(r) + 'px' }" :title="formatNum(r)"></div>
            <span class="text-[10px] text-ink-500">{{ months[i] }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SLA & Material -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- SLA -->
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Servis SLA holati</h3>
        <div class="grid grid-cols-3 gap-3">
          <div class="text-center p-4 rounded-xl bg-emerald-500/5">
            <div class="text-2xl font-bold text-emerald-500">94<span class="text-sm">%</span></div>
            <div class="text-xs text-ink-500 mt-1">SLA ichida</div>
          </div>
          <div class="text-center p-4 rounded-xl bg-amber-500/5">
            <div class="text-2xl font-bold text-amber-500">4<span class="text-sm">%</span></div>
            <div class="text-xs text-ink-500 mt-1">SLA yaqin</div>
          </div>
          <div class="text-center p-4 rounded-xl bg-red-500/5">
            <div class="text-2xl font-bold text-red-500">2<span class="text-sm">%</span></div>
            <div class="text-xs text-ink-500 mt-1">SLA buzilgan</div>
          </div>
        </div>
      </div>

      <!-- Material approvals -->
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Material tasdiqlari navbati</h3>
        <div class="space-y-2">
          <div v-for="req in materialQueue" :key="req.id" class="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <Package :size="18" class="text-amber-500" />
            <div class="flex-1">
              <div class="text-sm font-medium">{{ req.workOrder }} · {{ req.items }} ta item</div>
              <div class="text-xs text-ink-500">{{ req.building }} · {{ req.date }}</div>
            </div>
            <span class="badge badge-warning text-xs">{{ req.amount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Buildings table -->
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-black/5 dark:border-white/5">
        <h3 class="font-semibold">Binolar kesimida bandlik</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">Bino</th>
              <th class="px-4 py-3 text-right">Jami</th>
              <th class="px-4 py-3 text-right">Band</th>
              <th class="px-4 py-3 text-right">Bo\'sh</th>
              <th class="px-4 py-3 text-center">Bandlik</th>
              <th class="px-4 py-3 text-right">Tushum</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in buildings" :key="b.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3">
              <td class="px-4 py-3 font-medium">{{ b.name }}</td>
              <td class="px-4 py-3 text-right">{{ b.total }}</td>
              <td class="px-4 py-3 text-right">{{ b.occupied }}</td>
              <td class="px-4 py-3 text-right text-emerald-500">{{ b.vacant }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                    <div class="h-full bg-brand-500 rounded-full" :style="{ width: b.occupancyRate + '%' }"></div>
                  </div>
                  <span class="text-xs text-ink-500 w-10 text-right">{{ b.occupancyRate }}%</span>
                </div>
              </td>
              <td class="px-4 py-3 text-right font-medium">{{ formatNum(b.revenue) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Layers, CheckCircle2, TrendingUp, AlertCircle, FileText, Package } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const funnel = [
  { label: 'Yuborilgan', count: 42, color: '#71717a' },
  { label: 'Operatsion', count: 28, color: '#6366f1' },
  { label: 'Moliyaviy', count: 18, color: '#8b5cf6' },
  { label: 'Loyiha', count: 12, color: '#f59e0b' },
  { label: 'Imzolangan', count: 8, color: '#10b981' },
  { label: 'Faol', count: 5, color: '#059669' },
]

const revenue = [980, 1050, 1120, 1280, 1340, 1420]
const months = ['Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg']

function barHeight(v: number) { return (v / 1500) * 120 }
function formatNum(v: number) { return new Intl.NumberFormat('ru-RU').format(v) + ' mln' }

const materialQueue = [
  { id: 'm1', workOrder: 'WO-2026-012', items: 5, building: 'Tashkent City', date: '2 soat oldin', amount: '2.4 mlr' },
  { id: 'm2', workOrder: 'WO-2026-015', items: 3, building: 'Trillent Tower', date: '5 soat oldin', amount: '850 min' },
  { id: 'm3', workOrder: 'WO-2026-018', items: 8, building: 'IT Park', date: '1 kun oldin', amount: '3.2 mlr' },
]

const buildings = [
  { id: 'b1', name: 'Tashkent City', total: 420, occupied: 378, vacant: 42, occupancyRate: 90, revenue: 480 },
  { id: 'b2', name: 'Trillent Tower', total: 180, occupied: 152, vacant: 28, occupancyRate: 84, revenue: 320 },
  { id: 'b3', name: 'IT Park Tashkent', total: 240, occupied: 228, vacant: 12, occupancyRate: 95, revenue: 280 },
  { id: 'b4', name: 'Piramit', total: 150, occupied: 120, vacant: 30, occupancyRate: 80, revenue: 180 },
  { id: 'b5', name: 'Boulevard Plaza', total: 120, occupied: 96, vacant: 24, occupancyRate: 80, revenue: 160 },
]
</script>
