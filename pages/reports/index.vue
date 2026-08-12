<template>
  <div class="space-y-6 animate-fade-up">
    <!-- ═══ Header ═══ -->
    <div class="flex items-center justify-between">
      <div>
        <div class="eyebrow">REPORTS / ANALYTICS</div>
        <h1 class="page-title">Hisobotlar</h1>
        <p class="text-sm text-ink-400 mt-1">Tizim analitikasi va statistika</p>
      </div>
      <div class="flex items-center gap-2">
        <select v-model="period" class="input w-auto">
          <option value="month">Oy</option>
          <option value="quarter">Chorak</option>
          <option value="year">Yil</option>
        </select>
        <button class="btn btn-secondary btn-sm">
          <Download :size="14" /> Eksport
        </button>
      </div>
    </div>

    <!-- ═══ KPI Strip ═══ -->
    <div class="kpi-strip">
      <div class="kpi-strip__card">
        <div class="kpi-strip__icon">
          <Building2 :size="28" :stroke-width="1.5" class="text-blue-500" />
        </div>
        <div>
          <div class="dash-kpi__value">9</div>
          <div class="dash-kpi__label">Binolar</div>
        </div>
      </div>
      <div class="kpi-strip__card">
        <div class="kpi-strip__icon" style="background: rgba(5,150,105,0.06)">
          <TrendingUp :size="28" :stroke-width="1.5" class="text-emerald-500" />
        </div>
        <div>
          <div class="dash-kpi__value text-emerald-500">82%</div>
          <div class="dash-kpi__label">Bandlik</div>
        </div>
      </div>
      <div class="kpi-strip__card">
        <div class="kpi-strip__icon" style="background: rgba(217,119,6,0.06)">
          <Wallet :size="28" :stroke-width="1.5" class="text-amber-500" />
        </div>
        <div>
          <div class="dash-kpi__value text-amber-500">4.2M</div>
          <div class="dash-kpi__label">Daromad (UZS)</div>
        </div>
      </div>
      <div class="kpi-strip__card">
        <div class="kpi-strip__icon" style="background: rgba(124,58,237,0.06)">
          <FileText :size="28" :stroke-width="1.5" class="text-purple-500" />
        </div>
        <div>
          <div class="dash-kpi__value text-purple-500">12</div>
          <div class="dash-kpi__label">Arizalar</div>
        </div>
      </div>
    </div>

    <!-- ═══ Charts Grid ═══ -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Revenue Chart -->
      <div class="card p-5">
        <div class="section-header">
          <div>
            <div class="section-header__title">Daromad dinamikasi</div>
            <div class="section-header__sub">Oxirgi 6 oy</div>
          </div>
          <div class="stat-pill stat-pill--success">
            <TrendingUp :size="14" />
            <span>+24%</span>
          </div>
        </div>
        <div class="h-[240px] flex items-end justify-between gap-3 pt-4">
          <div v-for="(m, i) in monthlyData" :key="i" class="flex-1 flex flex-col items-center gap-2">
            <div class="w-full rounded-t-xl bg-gradient-to-t from-brand-500 to-brand-400 transition-all duration-700 hover:opacity-80" :style="{ height: m.height + '%', minHeight: '8px' }"></div>
            <span class="text-xs text-ink-400 font-medium">{{ m.label }}</span>
          </div>
        </div>
      </div>

      <!-- Occupancy by Building -->
      <div class="card p-5">
        <div class="section-header">
          <div>
            <div class="section-header__title">Binolar bo'yicha bandlik</div>
            <div class="section-header__sub">Barcha binolar</div>
          </div>
        </div>
        <div class="space-y-3 pt-2">
          <div v-for="b in buildingOccupancy" :key="b.name" class="flex items-center gap-3">
            <div class="text-xs font-medium text-ink-600 dark:text-ink-300 w-28 truncate">{{ b.name }}</div>
            <div class="flex-1 h-6 rounded-full bg-ink-100 dark:bg-white/5 overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-700"
                :class="b.pct > 85 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : b.pct > 60 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-red-400 to-red-500'"
                :style="{ width: b.pct + '%' }"
              ></div>
            </div>
            <div class="text-xs font-bold tabular-nums w-10 text-right" :class="b.pct > 85 ? 'text-emerald-500' : b.pct > 60 ? 'text-amber-500' : 'text-red-500'">{{ b.pct }}%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ Status Distribution ═══ -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Applications by Status -->
      <div class="card p-5">
        <div class="section-header">
          <div class="section-header__title">Arizalar bo'yicha status</div>
        </div>
        <div class="space-y-3">
          <div v-for="s in appStatusData" :key="s.label" class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full" :class="s.color"></span>
              <span class="text-sm text-ink-600 dark:text-ink-300">{{ s.label }}</span>
            </div>
            <span class="text-sm font-bold tabular-nums text-ink-900 dark:text-white">{{ s.count }}</span>
          </div>
        </div>
      </div>

      <!-- Contracts by Status -->
      <div class="card p-5">
        <div class="section-header">
          <div class="section-header__title">Shartnomalar bo'yicha status</div>
        </div>
        <div class="space-y-3">
          <div v-for="s in contractStatusData" :key="s.label" class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full" :class="s.color"></span>
              <span class="text-sm text-ink-600 dark:text-ink-300">{{ s.label }}</span>
            </div>
            <span class="text-sm font-bold tabular-nums text-ink-900 dark:text-white">{{ s.count }}</span>
          </div>
        </div>
      </div>

      <!-- Top Buildings -->
      <div class="card p-5">
        <div class="section-header">
          <div class="section-header__title">TOP binolar</div>
        </div>
        <div class="space-y-3">
          <div v-for="(b, i) in topBuildings" :key="b.name" class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" :class="i === 0 ? 'bg-amber-500/15 text-amber-500' : i === 1 ? 'bg-slate-400/15 text-slate-400' : i === 2 ? 'bg-orange-700/15 text-orange-700' : 'bg-ink-100 text-ink-400'">{{ i + 1 }}</div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-ink-900 dark:text-white truncate">{{ b.name }}</div>
              <div class="text-xs text-ink-400">{{ b.units }} unit · {{ b.occ }}% band</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, TrendingUp, Wallet, FileText, Download } from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'ACCOUNTANT'],  layout: 'admin', middleware: 'role' })

const period = ref('month')

const monthlyData = [
  { label: 'Mar', height: 65 },
  { label: 'Apr', height: 72 },
  { label: 'May', height: 68 },
  { label: 'Iyn', height: 85 },
  { label: 'Iyl', height: 92 },
  { label: 'Avg', height: 78 },
]

const buildingOccupancy = [
  { name: 'Trillant Tower A', pct: 82 },
  { name: 'Tashkent City Hub', pct: 88 },
  { name: 'IT Park Plaza', pct: 68 },
  { name: 'Silk Road Galleria', pct: 95 },
  { name: 'Sergeli Logistics', pct: 60 },
  { name: 'Amir Tower', pct: 75 },
]

const appStatusData = [
  { label: 'Yuborilgan', count: 4, color: 'bg-blue-500' },
  { label: 'Operatsiya', count: 2, color: 'bg-amber-500' },
  { label: 'Moliya', count: 2, color: 'bg-amber-500' },
  { label: 'Qoralama', count: 1, color: 'bg-purple-500' },
  { label: 'Imzolanmoqda', count: 2, color: 'bg-orange-500' },
  { label: 'Aktiv', count: 1, color: 'bg-emerald-500' },
]

const contractStatusData = [
  { label: 'Aktiv', count: 1, color: 'bg-emerald-500' },
  { label: 'Imzolangan', count: 2, color: 'bg-blue-500' },
  { label: 'Qoralama', count: 1, color: 'bg-slate-400' },
  { label: 'Tugagan', count: 0, color: 'bg-red-500' },
]

const topBuildings = [
  { name: 'Silk Road Galleria', units: 80, occ: 95 },
  { name: 'Tashkent City Hub', units: 210, occ: 88 },
  { name: 'Trillant Tower A', units: 140, occ: 82 },
  { name: 'IT Park Plaza', units: 95, occ: 68 },
  { name: 'Amir Tower', units: 120, occ: 75 },
]
</script>
