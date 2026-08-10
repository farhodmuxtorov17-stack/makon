<template>
  <div class="space-y-6">
    <!-- Greeting -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Xush kelibsiz, {{ userFirstName }} 👋</h1>
        <p class="text-ink-400 text-sm mt-1">{{ todayLabel }} · MAKON boshqaruv paneli</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> Hisobot</button>
        <button class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi</button>
      </div>
    </div>

    <!-- KPI cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="kpi in kpis" :key="kpi.label" class="card p-5 card-hover">
        <div class="flex items-start justify-between mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="kpi.bg">
            <component :is="kpi.icon" :size="18" :class="kpi.color" />
          </div>
          <span class="text-xs font-medium" :class="kpi.trendUp ? 'text-emerald-400' : 'text-red-400'">
            {{ kpi.trend }}
          </span>
        </div>
        <div class="text-2xl font-bold text-white">{{ kpi.value }}</div>
        <div class="text-xs text-ink-500 mt-1">{{ kpi.label }}</div>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue chart -->
      <div class="card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-white font-semibold">Tushum dinamikasi</h3>
            <p class="text-xs text-ink-500 mt-0.5">So'nggi 6 oy</p>
          </div>
          <div class="flex gap-1 p-1 rounded-xl bg-white/5">
            <button v-for="p in chartPeriods" :key="p.id" @click="chartPeriod = p.id"
              class="px-3 py-1 rounded-lg text-xs font-medium transition-all"
              :class="chartPeriod === p.id ? 'bg-white text-ink-900' : 'text-ink-400'">
              {{ p.label }}
            </button>
          </div>
        </div>
        <div class="flex items-end gap-3 h-48">
          <div v-for="(bar, i) in chartData" :key="i" class="flex-1 flex flex-col items-center gap-2 group">
            <div class="text-xs text-ink-500 opacity-0 group-hover:opacity-100 transition-opacity">{{ formatPriceShort(bar.value) }}</div>
            <div
              class="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
              :class="bar.current ? 'bg-gradient-to-t from-brand-600 to-brand-400' : 'bg-white/5'"
              :style="{ height: (bar.value / maxChart * 100) + '%' }"
            />
            <div class="text-xs text-ink-500">{{ bar.label }}</div>
          </div>
        </div>
      </div>

      <!-- Occupancy donut -->
      <div class="card p-6">
        <h3 class="text-white font-semibold mb-4">Bandlik darajasi</h3>
        <div class="relative w-40 h-40 mx-auto mb-4">
          <svg viewBox="0 0 120 120" class="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="12" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="url(#grad)" stroke-width="12" stroke-linecap="round"
              :stroke-dasharray="314" :stroke-dashoffset="314 - (314 * occupancyPct / 100)" class="transition-all duration-1000" />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#818cf8" />
                <stop offset="100%" stop-color="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <div class="text-3xl font-bold text-white">{{ occupancyPct }}%</div>
            <div class="text-xs text-ink-500">band</div>
          </div>
        </div>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-ink-500">Band</span><span class="text-white">{{ occupiedTotal }}</span></div>
          <div class="flex justify-between"><span class="text-ink-500">Bo'sh</span><span class="text-brand-400">{{ vacantTotal }}</span></div>
          <div class="flex justify-between"><span class="text-ink-500">Jami</span><span class="text-white">{{ unitsTotal }}</span></div>
        </div>
      </div>
    </div>

    <!-- Building occupancy -->
    <div class="card p-6">
      <h3 class="text-white font-semibold mb-4">Binolar bo'yicha bandlik</h3>
      <div class="space-y-3">
        <div v-for="b in buildings" :key="b.id" class="flex items-center gap-4">
          <div class="w-32 flex-shrink-0">
            <div class="text-sm text-white font-medium truncate">{{ b.name }}</div>
            <div class="text-xs text-ink-500">{{ b.district }}</div>
          </div>
          <div class="flex-1 h-7 rounded-lg bg-white/5 overflow-hidden relative">
            <div class="h-full rounded-lg bg-gradient-to-r from-brand-600 to-brand-400 transition-all duration-700 flex items-center justify-end px-2"
              :style="{ width: occPct(b) + '%' }">
              <span class="text-xs text-white font-medium">{{ occPct(b) }}%</span>
            </div>
          </div>
          <div class="w-20 text-right text-sm text-ink-400 flex-shrink-0">
            {{ b.occupiedUnits }}/{{ b.totalUnits }}
          </div>
        </div>
      </div>
    </div>

    <!-- Quick actions + alerts -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Quick actions -->
      <div class="card p-6">
        <h3 class="text-white font-semibold mb-4">Tezkor amallar</h3>
        <div class="grid grid-cols-2 gap-3">
          <NuxtLink v-for="a in quickActions" :key="a.label" :to="a.to" class="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-center group">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" :class="a.bg">
              <component :is="a.icon" :size="16" :class="a.color" />
            </div>
            <div class="text-xs text-ink-300">{{ a.label }}</div>
          </NuxtLink>
        </div>
      </div>

      <!-- Alerts -->
      <div class="card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-white font-semibold">Bildirishnomalar</h3>
          <NuxtLink to="/notifications" class="text-xs text-brand-400 hover:text-brand-300">Barchasi →</NuxtLink>
        </div>
        <div class="space-y-2">
          <div v-for="alert in alerts" :key="alert.id" class="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" :class="alert.bg">
              <component :is="alert.icon" :size="16" :class="alert.color" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm text-white truncate">{{ alert.title }}</div>
              <div class="text-xs text-ink-500">{{ alert.time }}</div>
            </div>
            <span class="badge" :class="alert.badge">{{ alert.tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Wallet, FileText, AlertTriangle, Plus, Download, TrendingUp, Wrench, Receipt, Calendar, Users, Box, CheckCircle2, Clock } from 'lucide-vue-next'
import { buildings, invoices } from '~/utils/mockData'

definePageMeta({ middleware: 'auth' })

const authStore = useAuthStore()
const { formatPriceShort } = useFormat()

const user = computed(() => authStore.user)
const userFirstName = computed(() => user.value?.fullName?.split(' ')[0] || 'Admin')

const todayLabel = computed(() => {
  const d = new Date()
  const months = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr']
  const days = ['Yakshanba','Dushanba','Seshanba','Chorshanba','Payshanba','Juma','Shanba']
  return days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()]
})

const kpis = [
  { label: 'Jami tushum', value: formatPriceShort(1485000000), trend: '+12%', trendUp: true, icon: Wallet, bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
  { label: 'Bo\'sh maydonlar', value: '67', trend: '-5%', trendUp: false, icon: Building2, bg: 'bg-brand-500/10', color: 'text-brand-400' },
  { label: 'Faol shartnomalar', value: '42', trend: '+3', trendUp: true, icon: FileText, bg: 'bg-blue-500/10', color: 'text-blue-400' },
  { label: 'Qarzdorlik', value: formatPriceShort(101500000), trend: '+8%', trendUp: false, icon: AlertTriangle, bg: 'bg-red-500/10', color: 'text-red-400' },
]

const chartPeriod = ref('6m')
const chartPeriods = [
  { id: '3m', label: '3 oy' },
  { id: '6m', label: '6 oy' },
  { id: '1y', label: '1 yil' },
]

const chartData = [
  { label: 'Mar', value: 1200000000 },
  { label: 'Apr', value: 1280000000 },
  { label: 'May', value: 1350000000 },
  { label: 'Iyun', value: 1390000000 },
  { label: 'Iyul', value: 1450000000 },
  { label: 'Avg', value: 1485000000, current: true },
]

const maxChart = Math.max(...chartData.map(d => d.value))

const occupiedTotal = computed(() => buildings.reduce((s, b) => s + b.occupiedUnits, 0))
const vacantTotal = computed(() => buildings.reduce((s, b) => s + b.vacantUnits, 0))
const unitsTotal = computed(() => buildings.reduce((s, b) => s + b.totalUnits, 0))
const occupancyPct = computed(() => Math.round((occupiedTotal.value / unitsTotal.value) * 100))

function occPct(b: typeof buildings[0]) { return Math.round((b.occupiedUnits / b.totalUnits) * 100) }

const quickActions = [
  { label: 'Yangi ariza', to: '/catalog', icon: FileText, bg: 'bg-brand-500/10', color: 'text-brand-400' },
  { label: 'Invoice', to: '/finance/invoices', icon: Receipt, bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
  { label: 'Servis', to: '/cabinet/services', icon: Wrench, bg: 'bg-amber-500/10', color: 'text-amber-400' },
  { label: 'Hisobot', to: '/reports', icon: Calendar, bg: 'bg-blue-500/10', color: 'text-blue-400' },
  { label: 'Binolar', to: '/management/buildings', icon: Building2, bg: 'bg-purple-500/10', color: 'text-purple-400' },
  { label: '3D ko\'rish', to: '/management/buildings', icon: Box, bg: 'bg-pink-500/10', color: 'text-pink-400' },
]

const alerts = [
  { id: 1, title: 'INV-2026-072 muddati o\'tdi — Tashkent Logistics LLC', time: '2 soat oldin', icon: AlertTriangle, bg: 'bg-red-500/10', color: 'text-red-400', tag: 'Kritik', badge: 'badge-danger' },
  { id: 2, title: 'SRV-2026-043 SLA buzilish xavfi — Trillant Tower 18-qavat', time: '3 soat oldin', icon: Clock, bg: 'bg-amber-500/10', color: 'text-amber-400', tag: 'SLA', badge: 'badge-warning' },
  { id: 3, title: 'APP-2026-002 moliyaviy ko\'rigi kutilmoqda', time: '5 soat oldin', icon: FileText, bg: 'bg-brand-500/10', color: 'text-brand-400', tag: 'Ariza', badge: 'badge-brand' },
  { id: 4, title: 'Billing davri Avgust 2026 ochildi — 24 ta invoice', time: '1 kun oldin', icon: CheckCircle2, bg: 'bg-emerald-500/10', color: 'text-emerald-400', tag: 'Tugatildi', badge: 'badge-success' },
]
</script>
