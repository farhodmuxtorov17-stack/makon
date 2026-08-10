<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Ishchi panel</h1>
        <p class="text-ink-400 text-sm mt-1">Xayrli tong, {{ user?.fullName?.split(' ')[0] || 'Admin' }} 👋</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex gap-1 p-1 rounded-xl bg-white/5">
          <button
            v-for="period in periods"
            :key="period.id"
            @click="activePeriod = period.id"
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            :class="activePeriod === period.id ? 'bg-white text-ink-900' : 'text-ink-400 hover:text-white'"
          >
            {{ period.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="kpi in kpiCards"
        :key="kpi.label"
        class="card p-5 card-hover"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="kpi.iconBg">
            <component :is="kpi.icon" :size="20" :class="kpi.iconColor" />
          </div>
          <span
            class="text-xs font-semibold px-2 py-1 rounded-lg"
            :class="kpi.trend > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'"
          >
            {{ kpi.trend > 0 ? '↑' : '↓' }} {{ Math.abs(kpi.trend) }}%
          </span>
        </div>
        <div class="text-2xl font-bold text-white">{{ kpi.value }}</div>
        <div class="text-sm text-ink-500 mt-1">{{ kpi.label }}</div>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue chart -->
      <div class="card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-white font-semibold">Daromat dinamikasi</h3>
            <p class="text-sm text-ink-500 mt-0.5">Oxirgi 6 oy, so'm</p>
          </div>
          <div class="flex gap-1 p-1 rounded-lg bg-white/5">
            <button class="px-2.5 py-1 rounded text-xs bg-white text-ink-900 font-medium">Maydon</button>
            <button class="px-2.5 py-1 rounded text-xs text-ink-400 hover:text-white">Ustun</button>
          </div>
        </div>
        <!-- Area chart -->
        <div class="relative h-56">
          <svg class="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6366f1" stop-opacity="0.4" />
                <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 140 L 67 110 L 133 125 L 200 80 L 267 95 L 333 55 L 400 40 L 400 200 L 0 200 Z"
              fill="url(#revenueGrad)"
            />
            <path
              d="M 0 140 L 67 110 L 133 125 L 200 80 L 267 95 L 333 55 L 400 40"
              stroke="#6366f1"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <!-- Points -->
            <g v-for="(point, i) in chartPoints" :key="i">
              <circle :cx="point.x" :cy="point.y" r="3" fill="#6366f1" />
              <circle :cx="point.x" :cy="point.y" r="6" fill="#6366f1" fill-opacity="0.2" />
            </g>
          </svg>
        </div>
        <div class="flex justify-between mt-4 text-xs text-ink-500">
          <span>Fev</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Iyun</span>
          <span>Iyul</span>
        </div>
      </div>

      <!-- Occupancy donut -->
      <div class="card p-6">
        <h3 class="text-white font-semibold mb-1">Bandlik darajasi</h3>
        <p class="text-sm text-ink-500 mb-6">Maydon bo'yicha</p>
        <div class="flex items-center justify-center mb-6">
          <div class="relative w-36 h-36">
            <svg class="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.06)" stroke-width="10" fill="none" />
              <circle
                cx="60" cy="60" r="50"
                stroke="#6366f1" stroke-width="10" fill="none"
                stroke-dasharray="285.6 314"
                stroke-linecap="round"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-3xl font-bold text-white">91%</span>
              <span class="text-xs text-ink-500">Band</span>
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-brand-500" />
              <span class="text-ink-400">Band</span>
            </div>
            <span class="text-white font-medium">312</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-ink-600" />
              <span class="text-ink-400">Bo'sh</span>
            </div>
            <span class="text-white font-medium">31</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Buildings occupancy + Quick actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Buildings -->
      <div class="card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-white font-semibold">Binolar bo'yicha bandlik</h3>
          <NuxtLink to="/management/buildings" class="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
            Barchasi <ChevronRight :size="14" />
          </NuxtLink>
        </div>
        <div class="space-y-4">
          <div v-for="b in buildingOccupancy" :key="b.name" class="flex items-center gap-4">
            <div class="w-32 flex-shrink-0">
              <div class="text-sm text-white font-medium truncate">{{ b.name }}</div>
              <div class="text-xs text-ink-500">{{ b.area }} m²</div>
            </div>
            <div class="flex-1 h-7 rounded-lg bg-white/5 overflow-hidden relative">
              <div
                class="h-full rounded-lg transition-all duration-500"
                :class="b.pct > 90 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : b.pct > 70 ? 'bg-gradient-to-r from-brand-500 to-brand-400' : 'bg-gradient-to-r from-amber-500 to-amber-400'"
                :style="{ width: b.pct + '%' }"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-white">{{ b.occupied }}/{{ b.total }}</span>
            </div>
            <div class="w-12 text-right text-sm font-semibold text-white">{{ b.pct }}%</div>
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="card p-6">
        <h3 class="text-white font-semibold mb-4">Tezkor amallar</h3>
        <div class="space-y-2">
          <NuxtLink v-for="action in quickActions" :key="action.to" :to="action.to"
            class="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center" :class="action.bg">
              <component :is="action.icon" :size="18" :class="action.color" />
            </div>
            <span class="flex-1 text-sm text-ink-200 group-hover:text-white transition-colors">{{ action.label }}</span>
            <ChevronRight :size="14" class="text-ink-600 group-hover:text-ink-400 transition-colors" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Recent activity + alerts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent activity -->
      <div class="card p-6">
        <h3 class="text-white font-semibold mb-4">So'nggi faollik</h3>
        <div class="space-y-3">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start gap-3 py-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :class="activity.bg">
              <component :is="activity.icon" :size="14" :class="activity.color" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-ink-200">{{ activity.text }}</p>
              <p class="text-xs text-ink-500 mt-0.5">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Alerts -->
      <div class="card p-6">
        <h3 class="text-white font-semibold mb-4">Ogohlantirishlar</h3>
        <div class="space-y-3">
          <div v-for="alert in alerts" :key="alert.id"
            class="flex items-start gap-3 p-3 rounded-xl border" :class="alert.borderClass">
            <component :is="alert.icon" :size="18" :class="alert.color" class="flex-shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-sm text-white font-medium">{{ alert.title }}</p>
              <p class="text-xs text-ink-400 mt-0.5">{{ alert.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import {
  Building2, Wallet, FileText, Wrench, TrendingUp, ChevronRight,
  AlertTriangle, Clock, Package, CheckCircle2, Plus, BarChart3, FileSearch,
  Receipt, Users
} from 'lucide-vue-next'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const periods = [
  { id: 'week', label: 'Hafta' },
  { id: 'month', label: 'Oy' },
  { id: 'quarter', label: 'Chorak' },
  { id: 'year', label: 'Yil' },
]
const activePeriod = ref('month')

const chartPoints = [
  { x: 0, y: 140 }, { x: 67, y: 110 }, { x: 133, y: 125 },
  { x: 200, y: 80 }, { x: 267, y: 95 }, { x: 333, y: 55 }, { x: 400, y: 40 }
]

const kpiCards = [
  { label: 'Jami tushum', value: '127.4M', trend: 12, icon: Wallet, iconBg: 'bg-brand-500/10', iconColor: 'text-brand-400' },
  { label: 'Bandlik', value: '91%', trend: 3, icon: Building2, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
  { label: 'Faol arizalar', value: '24', trend: -8, icon: FileText, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
  { label: 'Ochiq servis', value: '7', trend: 2, icon: Wrench, iconBg: 'bg-red-500/10', iconColor: 'text-red-400' },
]

const buildingOccupancy = [
  { name: 'Tashkent City Tower', area: '45,000', occupied: 95, total: 100, pct: 95 },
  { name: 'Trillant Tower', area: '32,000', occupied: 78, total: 85, pct: 92 },
  { name: 'IT Park Tashkent', area: '28,000', occupied: 42, total: 60, pct: 70 },
  { name: 'Piramit Complex', area: '20,000', occupied: 55, total: 80, pct: 69 },
  { name: 'Business Center Aura', area: '15,000', occupied: 38, total: 50, pct: 76 },
]

const quickActions = [
  { to: '/management/buildings', label: 'Bino qo\'shish', icon: Building2, bg: 'bg-brand-500/10', color: 'text-brand-400' },
  { to: '/management/applications', label: 'Arizani ko\'rib chiqish', icon: FileText, bg: 'bg-amber-500/10', color: 'text-amber-400' },
  { to: '/finance/invoices', label: 'Invoice yaratish', icon: Receipt, bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
  { to: '/reports', label: 'Hisobot generatsiya', icon: BarChart3, bg: 'bg-blue-500/10', color: 'text-blue-400' },
  { to: '/admin/users', label: 'Foydalanuvchi boshqarish', icon: Users, bg: 'bg-purple-500/10', color: 'text-purple-400' },
]

const recentActivity = [
  { id: 1, text: 'Aziz Karimov ijara shartnomasi imzolandi — Trillant Tower, 5-qavat', time: '10 daqiqa oldin', icon: CheckCircle2, bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
  { id: 2, text: 'Yangi servis so\'rovi — IT Park, ofis 301, konditsioner nosoz', time: '34 daqiqa oldin', icon: Wrench, bg: 'bg-amber-500/10', color: 'text-amber-400' },
  { id: 3, text: 'Invoice #INV-2025-0342 to\'landi — 4.5M so\'m', time: '1 soat oldin', icon: Wallet, bg: 'bg-brand-500/10', color: 'text-brand-400' },
  { id: 4, text: 'Material so\'rovi tasdiqlandi — rozetka x2, 70,000 so\'m', time: '2 soat oldin', icon: Package, bg: 'bg-blue-500/10', color: 'text-blue-400' },
  { id: 5, text: 'Yangi ariza — Business Center Aura, ofis 210, ijara', time: '3 soat oldin', icon: FileText, bg: 'bg-purple-500/10', color: 'text-purple-400' },
]

const alerts = [
  { id: 1, title: '3 ta invoice muddati o\'tdi', desc: 'Jami: 12.3M so\'m — Tashkent City Tower', icon: AlertTriangle, color: 'text-red-400', borderClass: 'bg-red-500/5 border-red-500/20' },
  { id: 2, title: 'Kritik servis so\'rovi kechikdi', desc: 'IT Park, ofis 301 — SLA: 2 soatdan oshdi', icon: Clock, color: 'text-amber-400', borderClass: 'bg-amber-500/5 border-amber-500/20' },
  { id: 3, title: 'Ombor: minimal qoldiqdan past', desc: 'Lampa LED 12W — qoldiq: 3 dona (min: 10)', icon: Package, color: 'text-blue-400', borderClass: 'bg-blue-500/5 border-blue-500/20' },
]
</script>
