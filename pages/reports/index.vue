<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Hisobotlar</h1>
        <p class="text-ink-500 text-sm mt-1">Tizim analitikasi va ko'rsatkichlar</p>
      </div>
      <div class="flex gap-2">
        <select v-model="period" class="input w-auto">
          <option value="month">Oylik</option>
          <option value="quarter">Choraklik</option>
          <option value="year">Yillik</option>
        </select>
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> PDF</button>
        <button class="btn btn-secondary btn-sm"><FileSpreadsheet :size="14" /> Excel</button>
      </div>
    </div>

    <!-- Summary cards -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">Konversiya</div>
        <div class="text-2xl font-bold text-emerald-500">68%</div>
        <div class="text-xs text-emerald-500 mt-1 flex items-center gap-1"><TrendingUp :size="12" /> +5%</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">O'rtacha ijara</div>
        <div class="text-2xl font-bold">23.4M</div>
        <div class="text-xs text-ink-500 mt-1">so'm/oy</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">O'rtacha hal qilish</div>
        <div class="text-2xl font-bold">2.1 kun</div>
        <div class="text-xs text-emerald-500 mt-1">SLA 3 kun</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">Mamnunlik</div>
        <div class="text-2xl font-bold text-emerald-500">92%</div>
        <div class="text-xs text-emerald-500 mt-1 flex items-center gap-1"><TrendingUp :size="12" /> +3%</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">Binolar</div>
        <div class="text-2xl font-bold">12</div>
        <div class="text-xs text-ink-500 mt-1">420 unit</div>
      </div>
    </div>

    <!-- Revenue cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card p-5 bg-gradient-to-br from-emerald-500/5 to-transparent">
        <div class="flex items-center gap-2 mb-2"><TrendingUp :size="16" class="text-emerald-500" /><span class="text-xs text-ink-500">Jami daromad</span></div>
        <div class="text-2xl font-bold text-emerald-500">1.24 mlrd so'm</div>
        <div class="text-xs text-ink-500 mt-1">12 oy davomida</div>
      </div>
      <div class="card p-5 bg-gradient-to-br from-red-500/5 to-transparent">
        <div class="flex items-center gap-2 mb-2"><AlertTriangle :size="16" class="text-red-500" /><span class="text-xs text-ink-500">Qarzdorlik</span></div>
        <div class="text-2xl font-bold text-red-500">85.2M so'm</div>
        <div class="text-xs text-red-500 mt-1">7 ta ijarachi</div>
      </div>
      <div class="card p-5 bg-gradient-to-br from-brand-500/5 to-transparent">
        <div class="flex items-center gap-2 mb-2"><FileCheck2 :size="16" class="text-brand-500" /><span class="text-xs text-ink-500">Shartnoma qiymati</span></div>
        <div class="text-2xl font-bold text-brand-500">4.8 mlrd so'm</div>
        <div class="text-xs text-ink-500 mt-1">378 faol shartnoma</div>
      </div>
    </div>

    <!-- Monthly trend chart -->
    <div class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Oylik dinamika</h3>
        <div class="flex items-center gap-4 text-xs">
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-brand-500/60"></span> Daromad</span>
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-emerald-500/40"></span> Yangi shartnomalar</span>
        </div>
      </div>
      <div class="flex items-end justify-between h-48 gap-2">
        <div v-for="t in trend" :key="t.month" class="flex-1 flex flex-col items-center gap-1 group">
          <div class="w-full flex flex-col items-center gap-0.5">
            <div class="w-full rounded-t bg-brand-500/60 group-hover:bg-brand-500 transition-all cursor-pointer relative" :style="{ height: barHeight(t.revenue, maxRevenue) + 'px' }">
              <div class="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-medium whitespace-nowrap">{{ formatPrice(t.revenue) }}</div>
            </div>
            <div class="w-full rounded-t bg-emerald-500/40 group-hover:bg-emerald-500/60 transition-all" :style="{ height: barHeight(t.contracts, maxContracts) + 'px' }"></div>
          </div>
          <span class="text-xs text-ink-500">{{ t.month }}</span>
        </div>
      </div>
    </div>

    <!-- Applications funnel -->
    <div class="card p-6">
      <h3 class="font-semibold mb-4">Arizalar voronkasi</h3>
      <div class="space-y-3">
        <div v-for="f in funnel" :key="f.stage" class="flex items-center gap-3">
          <div class="w-32 text-sm text-ink-500 flex-shrink-0">{{ f.stage }}</div>
          <div class="flex-1 h-8 rounded-lg bg-black/5 dark:bg-white/5 overflow-hidden">
            <div class="h-full rounded-lg flex items-center px-3 transition-all duration-700"
              :style="{ width: Math.max((f.count / maxFunnel) * 100, 6) + '%', backgroundColor: f.color }">
              <span class="text-xs font-medium text-white" v-if="f.count > 0">{{ f.count }}</span>
            </div>
          </div>
          <div class="w-12 text-right text-sm font-medium">{{ f.count }}</div>
          <div class="w-12 text-right text-xs text-ink-500">{{ f.percent }}%</div>
        </div>
      </div>
    </div>

    <!-- Occupancy by type + Request categories -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Bandlik bo'yicha turlar</h3>
        <div class="space-y-3">
          <div v-for="o in occupancyByType" :key="o.type" class="flex items-center gap-3">
            <div class="w-36 text-sm text-ink-500 flex-shrink-0">{{ typeLabel(o.type) }}</div>
            <div class="flex-1 h-6 rounded-lg bg-black/5 dark:bg-white/5 overflow-hidden">
              <div class="h-full rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-700" :style="{ width: o.rate + '%' }"></div>
            </div>
            <div class="w-12 text-right text-sm font-medium">{{ o.rate }}%</div>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <h3 class="font-semibold mb-4">Xizmat so'rovlari kategoriyalari</h3>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="r in requestsByCategory" :key="r.category" class="p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div class="text-xs text-ink-500 mb-1">{{ categoryLabel(r.category) }}</div>
            <div class="flex items-center gap-2">
              <span class="text-lg font-bold">{{ r.count }}</span>
              <span v-if="r.open > 0" class="text-xs text-amber-500">{{ r.open }} ochiq</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Building performance -->
    <div class="card p-6">
      <h3 class="font-semibold mb-4">Binolar bo'yicha samaradorlik</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-3 py-2">Bino</th>
              <th class="px-3 py-2 text-right">Unit</th>
              <th class="px-3 py-2 text-right">Bandlik</th>
              <th class="px-3 py-2 text-right">Daromad</th>
              <th class="px-3 py-2 text-right">Qarz</th>
              <th class="px-3 py-2 text-right">So'rovlar</th>
              <th class="px-3 py-2 text-center">SLA</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in buildingPerf" :key="b.name" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3">
              <td class="px-3 py-2 font-medium">{{ b.name }}</td>
              <td class="px-3 py-2 text-right">{{ b.units }}</td>
              <td class="px-3 py-2 text-right">
                <div class="flex items-center justify-end gap-2">
                  <div class="w-16 h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                    <div class="h-full rounded-full" :class="b.occupancy > 90 ? 'bg-emerald-500' : b.occupancy > 75 ? 'bg-amber-500' : 'bg-red-500'" :style="{ width: b.occupancy + '%' }"></div>
                  </div>
                  <span class="text-xs">{{ b.occupancy }}%</span>
                </div>
              </td>
              <td class="px-3 py-2 text-right font-medium">{{ formatPrice(b.revenue) }}</td>
              <td class="px-3 py-2 text-right" :class="b.debt > 0 ? 'text-red-500' : 'text-ink-500'">{{ b.debt > 0 ? formatPrice(b.debt) : '-' }}</td>
              <td class="px-3 py-2 text-right">{{ b.requests }}</td>
              <td class="px-3 py-2 text-center">
                <span class="badge text-xs" :class="b.slaMet ? 'badge-success' : 'badge-danger'">{{ b.slaMet ? 'OK' : 'Past' }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrendingUp, AlertTriangle, FileCheck2, Download, FileSpreadsheet } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const period = ref('month')

const trend = [
  { month: 'Yan', revenue: 85000000, contracts: 3 },
  { month: 'Fev', revenue: 92000000, contracts: 5 },
  { month: 'Mar', revenue: 78000000, contracts: 2 },
  { month: 'Apr', revenue: 110000000, contracts: 7 },
  { month: 'May', revenue: 95000000, contracts: 4 },
  { month: 'Iyn', revenue: 120000000, contracts: 8 },
  { month: 'Iyl', revenue: 135000000, contracts: 6 },
  { month: 'Avg', revenue: 128000000, contracts: 5 },
  { month: 'Sen', revenue: 142000000, contracts: 9 },
  { month: 'Okt', revenue: 115000000, contracts: 4 },
  { month: 'Noy', revenue: 130000000, contracts: 7 },
  { month: 'Dek', revenue: 155000000, contracts: 10 },
]

const maxRevenue = Math.max(...trend.map(t => t.revenue))
const maxContracts = Math.max(...trend.map(t => t.contracts))

const funnel = [
  { stage: 'Ariza kelib tushdi', count: 156, percent: 100, color: '#6366f1' },
  { stage: 'Operatsion tekshiruv', count: 142, percent: 91, color: '#818cf8' },
  { stage: 'Moliyaviy tasdiq', count: 128, percent: 82, color: '#a5b4fc' },
  { stage: 'Taklif yuborildi', count: 112, percent: 72, color: '#c7d2fe' },
  { stage: 'ERI imzolash', count: 106, percent: 68, color: '#ddd6fe' },
  { stage: 'Shartnoma tuzildi', count: 106, percent: 68, color: '#10b981' },
]
const maxFunnel = Math.max(...funnel.map(f => f.count))

const occupancyByType = [
  { type: 'BUSINESS_CENTER', rate: 94 },
  { type: 'OFFICE', rate: 87 },
  { type: 'SHOPPING', rate: 79 },
  { type: 'WAREHOUSE', rate: 72 },
  { type: 'MIXED', rate: 83 },
]

const requestsByCategory = [
  { category: 'PLUMBING', count: 48, open: 3 },
  { category: 'ELECTRICAL', count: 67, open: 5 },
  { category: 'HVAC', count: 52, open: 2 },
  { category: 'CLEANING', count: 34, open: 0 },
  { category: 'STRUCTURAL', count: 12, open: 1 },
  { category: 'SECURITY', count: 8, open: 0 },
]

const buildingPerf = [
  { name: 'Tashkent City', units: 420, occupancy: 90, revenue: 380000000, debt: 12000000, requests: 28, slaMet: true },
  { name: 'Trillent Tower', units: 180, occupancy: 95, revenue: 250000000, debt: 0, requests: 14, slaMet: true },
  { name: 'IT Park', units: 150, occupancy: 82, revenue: 180000000, debt: 8500000, requests: 19, slaMet: true },
  { name: 'Piramit', units: 90, occupancy: 78, revenue: 140000000, debt: 15000000, requests: 22, slaMet: false },
  { name: 'Business Center 1', units: 60, occupancy: 88, revenue: 95000000, debt: 3200000, requests: 8, slaMet: true },
]

function barHeight(val: number, max: number) { return Math.max((val / max) * 160, 3) }
function typeLabel(t: string) { return { BUSINESS_CENTER: 'Biznes markaz', OFFICE: 'Ofis', SHOPPING: 'Savdo', WAREHOUSE: 'Ombor', RESIDENTIAL: 'Turar joy', MIXED: 'Aralash' }[t] || t }
function categoryLabel(c: string) { return { PLUMBING: 'Sanitariya', ELECTRICAL: 'Elektrika', HVAC: 'Konditsioner', CLEANING: 'Tozalash', STRUCTURAL: 'Konstruksiya', SECURITY: 'Xavfsizlik', OTHER: 'Boshqa' }[c] || c }
function formatPrice(p: number) { if (!p) return '0'; if (p >= 1000000000) return (p / 1000000000).toFixed(1) + ' mlrd'; if (p >= 1000000) return (p / 1000000).toFixed(0) + 'M'; return p.toLocaleString('ru-RU') }
</script>
