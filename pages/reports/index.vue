<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">ANALYTICS / REPORTS</div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Hisobotlar</h1>
        <p class="text-ink-500 text-sm mt-1">Daromad, bandlik va operatsion ko'rsatkichlar</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5">
          <button
            v-for="p in periods"
            :key="p.value"
            @click="activePeriod = p.value"
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            :class="activePeriod === p.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500'"
          >{{ p.label }}</button>
        </div>
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
      </div>
    </div>

    <!-- Premium KPI strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="kpi-strip kpi-strip--emerald">
        <div class="kpi-strip__icon"><Wallet :size="18" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">227.5<span class="text-sm font-500"> mln</span></div>
          <div class="kpi-strip__label">Jami daromad (UZS)</div>
        </div>
        <div class="kpi-strip__trend kpi-strip__trend--up">
          <TrendingUp :size="12" /> +12.4%
        </div>
      </div>
      <div class="kpi-strip kpi-strip--teal">
        <div class="kpi-strip__icon"><Building2 :size="18" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">94.2<span class="text-sm font-500">%</span></div>
          <div class="kpi-strip__label">Bandlik darajasi</div>
        </div>
        <div class="kpi-strip__trend kpi-strip__trend--up">
          <TrendingUp :size="12" /> +3.1%
        </div>
      </div>
      <div class="kpi-strip kpi-strip--amber">
        <div class="kpi-strip__icon"><FileText :size="18" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">240</div>
          <div class="kpi-strip__label">Faol shartnoma</div>
        </div>
        <div class="kpi-strip__trend kpi-strip__trend--up">
          <TrendingUp :size="12" /> +8
        </div>
      </div>
      <div class="kpi-strip kpi-strip--rose">
        <div class="kpi-strip__icon"><AlertCircle :size="18" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">24.7<span class="text-sm font-500"> mln</span></div>
          <div class="kpi-strip__label">Qarzdorlik (UZS)</div>
        </div>
        <div class="kpi-strip__trend kpi-strip__trend--down">
          <TrendingDown :size="12" /> -5.2%
        </div>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Revenue chart -->
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="font-bold text-ink-900 dark:text-white text-base">Daromad dinamikasi</h3>
            <p class="text-xs text-ink-500 mt-0.5">So'nggi 8 oy</p>
          </div>
          <div class="flex items-center gap-3 text-xs">
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-brand-500"></span> Daromad</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-rose-400"></span> Qarz</span>
          </div>
        </div>
        <div class="revenue-chart">
          <div v-for="(m, i) in monthlyData" :key="i" class="rev-col">
            <div class="rev-bars">
              <div class="rev-bar rev-bar--debt" :style="{ height: (m.debt / maxVal * 100) + '%' }"></div>
              <div class="rev-bar rev-bar--rev" :style="{ height: (m.revenue / maxVal * 100) + '%' }"></div>
            </div>
            <span class="rev-label">{{ m.month }}</span>
          </div>
        </div>
      </div>

      <!-- Occupancy donut -->
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="font-bold text-ink-900 dark:text-white text-base">Bandlik taqsimoti</h3>
            <p class="text-xs text-ink-500 mt-0.5">Bino bo'yicha</p>
          </div>
        </div>
        <div class="occ-list">
          <div v-for="(b, i) in occupancyData" :key="i" class="occ-row">
            <div class="occ-row__top">
              <span class="occ-row__name">{{ b.name }}</span>
              <span class="occ-row__val">{{ b.pct }}%</span>
            </div>
            <div class="occ-row__track">
              <div class="occ-row__fill" :style="{ width: b.pct + '%', background: b.color }"></div>
            </div>
            <div class="occ-row__meta">{{ b.occupied }} / {{ b.total }} unit</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Building comparison -->
    <div class="card p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-bold text-ink-900 dark:text-white text-base">Bino bo'yicha solishtirma</h3>
          <p class="text-xs text-ink-500 mt-0.5">Daromad va bandlik</p>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 uppercase tracking-widest border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3 font-medium">Bino</th>
              <th class="px-4 py-3 font-medium text-right">Unit</th>
              <th class="px-4 py-3 font-medium text-right">Bandlik</th>
              <th class="px-4 py-3 font-medium text-right hidden md:table-cell">Daromad</th>
              <th class="px-4 py-3 font-medium text-right hidden md:table-cell">Qarz</th>
              <th class="px-4 py-3 font-medium text-center">Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(b, i) in buildingCompare" :key="i" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td class="px-4 py-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ background: b.color + '15' }">
                    <Building2 :size="14" :style="{ color: b.color }" />
                  </div>
                  <span class="font-medium text-ink-900 dark:text-white">{{ b.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-right font-mono">{{ b.units }}</td>
              <td class="px-4 py-3 text-right">
                <span class="font-semibold" :style="{ color: b.occ >= 90 ? '#10b981' : b.occ >= 70 ? '#f59e0b' : '#ef4444' }">{{ b.occ }}%</span>
              </td>
              <td class="px-4 py-3 text-right hidden md:table-cell font-semibold">{{ formatUZSShort(b.revenue) }}</td>
              <td class="px-4 py-3 text-right hidden md:table-cell text-rose-500">{{ b.debt > 0 ? formatUZSShort(b.debt) : '—' }}</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-xs" :class="b.occ >= 90 ? 'badge-success' : b.occ >= 70 ? 'badge-warning' : 'badge-danger'">
                  {{ b.occ >= 90 ? 'Yuqori' : b.occ >= 70 ? "O'rta" : 'Past' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, Wallet, Building2, FileText, AlertCircle, TrendingUp, TrendingDown } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort } = useFormat()

const activePeriod = ref('month')
const periods = [
  { value: 'week', label: 'Hafta' },
  { value: 'month', label: 'Oy' },
  { value: 'quarter', label: 'Chorak' },
  { value: 'year', label: 'Yil' },
]

const monthlyData = [
  { month: 'Mart', revenue: 28, debt: 3.2 },
  { month: 'Aprel', revenue: 31, debt: 2.8 },
  { month: 'May', revenue: 29, debt: 4.1 },
  { month: 'Iyun', revenue: 34, debt: 2.5 },
  { month: 'Iyul', revenue: 36, debt: 3.8 },
  { month: 'Avgust', revenue: 38, debt: 2.9 },
  { month: 'Sent', revenue: 33, debt: 4.2 },
  { month: 'Okt', revenue: 38.5, debt: 2.1 },
]
const maxVal = 40

const occupancyData = [
  { name: 'Tashkent City', pct: 96, occupied: 230, total: 240, color: '#10b981' },
  { name: 'Trillant Tower', pct: 89, occupied: 89, total: 100, color: '#2563EB' },
  { name: 'IT Park', pct: 92, occupied: 46, total: 50, color: '#f59e0b' },
  { name: 'Piramit', pct: 78, occupied: 39, total: 50, color: '#8b5cf6' },
  { name: 'Savdo Markaz', pct: 84, occupied: 42, total: 50, color: '#ec4899' },
]

const buildingCompare = [
  { name: 'Tashkent City', units: 240, occ: 96, revenue: 185000000, debt: 5200000, color: '#10b981' },
  { name: 'Trillant Tower', units: 100, occ: 89, revenue: 68000000, debt: 3100000, color: '#2563EB' },
  { name: 'IT Park', units: 50, occ: 92, revenue: 32000000, debt: 1200000, color: '#f59e0b' },
  { name: 'Piramit', units: 50, occ: 78, revenue: 28000000, debt: 8400000, color: '#8b5cf6' },
  { name: 'Savdo Markaz', units: 50, occ: 84, revenue: 24000000, debt: 6800000, color: '#ec4899' },
]
</script>

<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 12px; padding: 14px 16px;
  background: var(--card-bg, #fff); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px; position: relative; overflow: hidden; flex-wrap: wrap;
}
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--rose::before { background: #f43f5e; }
.kpi-strip__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); color: #10b981; }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); color: var(--accent, #2563EB); }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); color: #f59e0b; }
.kpi-strip--rose .kpi-strip__icon { background: rgba(244,63,94,0.1); color: #f43f5e; }
.kpi-strip__body { flex: 1; min-width: 0; }
.kpi-strip__value { font-size: 22px; font-weight: 800; line-height: 1; }
.kpi-strip__label { font-size: 11px; color: var(--ink-500); margin-top: 3px; font-weight: 500; }
.kpi-strip__trend { display: flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; }
.kpi-strip__trend--up { background: rgba(16,185,129,0.1); color: #10b981; }
.kpi-strip__trend--down { background: rgba(244,63,94,0.1); color: #f43f5e; }

.revenue-chart { display: flex; align-items: flex-end; gap: 6px; height: 200px; padding-top: 10px; }
.rev-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; }
.rev-bars { display: flex; align-items: flex-end; gap: 3px; flex: 1; width: 100%; justify-content: center; }
.rev-bar { width: 18px; border-radius: 4px 4px 0 0; min-height: 4px; transition: height 0.6s ease; }
.rev-bar--rev { background: linear-gradient(180deg, #3B82F6, #2563EB); }
.rev-bar--debt { background: linear-gradient(180deg, #fb7185, #e11d48); }
.rev-label { font-size: 10px; color: var(--ink-400); font-weight: 500; }

.occ-list { display: flex; flex-direction: column; gap: 14px; }
.occ-row__top { display: flex; justify-content: space-between; margin-bottom: 5px; }
.occ-row__name { font-size: 13px; font-weight: 600; color: var(--ink-700, #333); }
.occ-row__val { font-size: 13px; font-weight: 700; }
.occ-row__track { height: 8px; background: rgba(0,0,0,0.06); border-radius: 4px; overflow: hidden; }
.occ-row__fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }
.occ-row__meta { font-size: 11px; color: var(--ink-400); margin-top: 3px; }

:deep(.dark) .kpi-strip { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .occ-row__track { background: rgba(255,255,255,0.08); }
</style>
