<template>
  <div class="space-y-6">
    <!-- Page header with gradient -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-ink-900 font-display tracking-tight">Ishchi panel</h1>
        <p class="text-sm text-ink-400 mt-1.5 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {{ today }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn-outline btn-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 10v6m0 0l-3-3m3 3l3-3M4 20h16" />
          </svg>
          Eksport
        </button>
        <button class="btn-primary-glow btn-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Yangi
        </button>
      </div>
    </div>

    <!-- Premium Stat Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Revenue -->
      <div class="card-hover p-5 animate-fade-in-up delay-0 stat-glow" style="--glow-color: rgba(16, 185, 129, 0.08)">
        <div class="flex items-center justify-between mb-4 relative">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-lg px-2 py-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" /></svg>
            12%
          </span>
        </div>
        <p class="text-xs text-ink-400 font-medium uppercase tracking-wider mb-1">Daromad (oy)</p>
        <p class="text-2xl font-bold text-ink-900 font-display tracking-tight">{{ formatCurrency(totalRevenue) }}</p>
        <p class="text-xs text-ink-400 mt-2">vs oldingi oy</p>
      </div>

      <!-- Active contracts -->
      <div class="card-hover p-5 animate-fade-in-up delay-50 stat-glow" style="--glow-color: rgba(99, 86, 247, 0.08)">
        <div class="flex items-center justify-between mb-4 relative">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-md shadow-brand-500/20">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-lg px-2 py-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" /></svg>
            5%
          </span>
        </div>
        <p class="text-xs text-ink-400 font-medium uppercase tracking-wider mb-1">Faol shartnomalar</p>
        <p class="text-2xl font-bold text-ink-900 font-display tracking-tight">{{ activeContracts }}</p>
        <p class="text-xs text-ink-400 mt-2">jami {{ financeStore.contracts.length }} dan</p>
      </div>

      <!-- Occupancy -->
      <div class="card-hover p-5 animate-fade-in-up delay-100 stat-glow" style="--glow-color: rgba(249, 144, 7, 0.08)">
        <div class="flex items-center justify-between mb-4 relative">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md shadow-gold-500/20">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-lg px-2 py-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" /></svg>
            3%
          </span>
        </div>
        <p class="text-xs text-ink-400 font-medium uppercase tracking-wider mb-1">Bandlik darajasi</p>
        <p class="text-2xl font-bold text-ink-900 font-display tracking-tight">{{ occupancyRate }}%</p>
        <div class="mt-2 h-1.5 rounded-full bg-ink-100 overflow-hidden">
          <div class="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-500" :style="{ width: occupancyRate + '%' }" />
        </div>
      </div>

      <!-- Notifications -->
      <div class="card-hover p-5 animate-fade-in-up delay-150 stat-glow" style="--glow-color: rgba(244, 63, 94, 0.08)">
        <div class="flex items-center justify-between mb-4 relative">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-md shadow-rose-500/20">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 rounded-lg px-2 py-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
            8%
          </span>
        </div>
        <p class="text-xs text-ink-400 font-medium uppercase tracking-wider mb-1">O'qilmagan xabarlar</p>
        <p class="text-2xl font-bold text-ink-900 font-display tracking-tight">{{ unreadCount }}</p>
        <p class="text-xs text-ink-400 mt-2">oxirgi 24 soatda</p>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue chart -->
      <div class="card lg:col-span-2 animate-fade-in-up delay-200">
        <div class="card-header">
          <div>
            <h3 class="font-semibold text-ink-900">Daromad dinamikasi</h3>
            <p class="text-xs text-ink-400 mt-0.5">Oxirgi 6 oylik ko'rsatkichlar</p>
          </div>
          <div class="flex items-center gap-1 p-1 bg-ink-100 rounded-lg">
            <button @click="chartPeriod = '6'" :class="['px-3 py-1.5 rounded-md text-xs font-semibold transition-all', chartPeriod === '6' ? 'bg-white shadow-sm text-brand-700' : 'text-ink-400']">6 oy</button>
            <button @click="chartPeriod = '12'" :class="['px-3 py-1.5 rounded-md text-xs font-semibold transition-all', chartPeriod === '12' ? 'bg-white shadow-sm text-brand-700' : 'text-ink-400']">12 oy</button>
          </div>
        </div>
        <div class="card-body pt-2">
          <RevenueChart :data="chartPeriod === '6' ? revenueData6 : revenueData12" />
        </div>
      </div>

      <!-- Occupancy donut -->
      <div class="card animate-fade-in-up delay-200">
        <div class="card-header">
          <div>
            <h3 class="font-semibold text-ink-900">Bandlik tuzilmasi</h3>
            <p class="text-xs text-ink-400 mt-0.5">Jami {{ buildingStore.units.length }} unit</p>
          </div>
        </div>
        <div class="card-body flex flex-col items-center">
          <DonutChart :segments="occupancySegments" :size="180" />
          <div class="w-full space-y-2.5 mt-5">
            <div v-for="seg in occupancySegments" :key="seg.label" class="flex items-center justify-between text-sm group">
              <div class="flex items-center gap-2.5">
                <span class="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125" :style="{ background: seg.color }" />
                <span class="text-ink-500">{{ seg.label }}</span>
              </div>
              <span class="font-bold text-ink-900">{{ seg.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick actions - Premium style -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <NuxtLink v-for="(action, i) in quickActions" :key="action.label" :to="action.path"
        class="group relative card-hover p-5 animate-fade-in-up overflow-hidden"
        :style="{ animationDelay: (i * 50) + 'ms' }"
      >
        <div :class="['absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-xl', action.bgColor]" />
        <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform', action.iconBg]">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="action.icon" />
          </svg>
        </div>
        <p class="font-semibold text-ink-900 text-sm">{{ action.label }}</p>
        <p class="text-xs text-ink-400 mt-0.5">{{ action.desc }}</p>
        <svg class="w-4 h-4 text-ink-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Recent activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent applications -->
      <div class="card animate-fade-in-up">
        <div class="card-header">
          <div>
            <h3 class="font-semibold text-ink-900">So'nggi arizalar</h3>
            <p class="text-xs text-ink-400 mt-0.5">Oxirgi {{ recentApps.length }} ta ariza</p>
          </div>
          <NuxtLink to="/applications" class="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group">
            Hammasi
            <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
        <div class="divide-y divide-ink-50">
          <div v-for="app in recentApps" :key="app.id" class="px-5 py-3.5 flex items-center gap-3 hover:bg-ink-50/40 transition-colors cursor-pointer">
            <div :class="['w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', app.type === 'RENT' ? 'bg-brand-50' : 'bg-emerald-50']">
              <svg :class="['w-4.5 h-4.5', app.type === 'RENT' ? 'text-brand-600' : 'text-emerald-600']" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:18px;height:18px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="app.type === 'RENT' ? 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' : 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-ink-900">{{ app.applicantName }}</p>
              <p class="text-xs text-ink-400">{{ app.number }} · {{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</p>
            </div>
            <StatusBadge :status="app.status" :dot="true" />
          </div>
        </div>
      </div>

      <!-- Recent notifications -->
      <div class="card animate-fade-in-up">
        <div class="card-header">
          <div>
            <h3 class="font-semibold text-ink-900">So'nggi bildirishnomalar</h3>
            <p class="text-xs text-ink-400 mt-0.5">Tizim xabarlari</p>
          </div>
          <NuxtLink to="/notifications" class="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group">
            Hammasi
            <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
        <div class="card-body space-y-3">
          <div v-for="notif in recentNotifs" :key="notif.id" class="flex items-start gap-3 group cursor-pointer">
            <div :class="['w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110', notifColorClass(notif.type)]">
              <svg :class="['w-4.5 h-4.5', notifIconColorClass(notif.type)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:18px;height:18px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="notifIconPath(notif.type)" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-ink-900">{{ notif.title }}</p>
              <p class="text-xs text-ink-400">{{ notif.body }}</p>
              <p class="text-2xs text-ink-400 mt-0.5">{{ timeAgo(notif.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFinanceStore } from '~/stores/finance'
import { useBuildingStore } from '~/stores/building'
import { formatCurrency, timeAgo } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import RevenueChart from '~/components/charts/RevenueChart.vue'
import DonutChart from '~/components/charts/DonutChart.vue'

definePageMeta({ middleware: 'auth' })

const financeStore = useFinanceStore()
const buildingStore = useBuildingStore()

const chartPeriod = ref('6')

onMounted(() => {
  financeStore.initMockData()
  buildingStore.initMockData()
})

const today = new Date().toLocaleDateString('uz-UZ', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const totalRevenue = computed(() => financeStore.totalRevenue)
const activeContracts = computed(() => financeStore.activeContracts.length)
const unreadCount = computed(() => financeStore.unreadNotifications.length)
const occupancyRate = computed(() => {
  const total = buildingStore.units.length
  if (!total) return 0
  return Math.round((buildingStore.units.filter((u) => ['RENTED', 'SOLD'].includes(u.status)).length / total) * 100)
})

const revenueData6 = [
  { month: 'Yan', value: 28500000 },
  { month: 'Fev', value: 31000000 },
  { month: 'Mar', value: 32500000 },
  { month: 'Apr', value: 42500000 },
  { month: 'May', value: 38500000 },
  { month: 'Iyun', value: 35500000 },
]

const revenueData12 = [
  { month: 'Iyl', value: 22000000 }, { month: 'Avg', value: 24500000 },
  { month: 'Sen', value: 26500000 }, { month: 'Okt', value: 28000000 },
  { month: 'Noy', value: 27000000 }, { month: 'Dek', value: 29500000 },
  { month: 'Yan', value: 28500000 }, { month: 'Fev', value: 31000000 },
  { month: 'Mar', value: 32500000 }, { month: 'Apr', value: 42500000 },
  { month: 'May', value: 38500000 }, { month: 'Iyun', value: 35500000 },
]

const occupancySegments = computed(() => {
  const total = buildingStore.units.length || 1
  const rented = buildingStore.units.filter((u) => u.status === 'RENTED').length
  const sold = buildingStore.units.filter((u) => u.status === 'SOLD').length
  const vacant = buildingStore.units.filter((u) => u.status === 'VACANT').length
  const other = total - rented - sold - vacant
  return [
    { label: 'Ijarada', value: rented, color: '#6356f7' },
    { label: 'Sotilgan', value: sold, color: '#10b981' },
    { label: "Bo'sh", value: vacant, color: '#f99007' },
    { label: 'Boshqa', value: other, color: '#cbd5e1' },
  ]
})

const quickActions = [
  { label: 'Yangi bino', desc: 'Bino qo\'shish', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z', bgColor: 'bg-brand-500', iconBg: 'bg-gradient-to-br from-brand-400 to-brand-600', path: '/management/buildings' },
  { label: 'Yangi ariza', desc: 'Ariza yaratish', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', bgColor: 'bg-emerald-500', iconBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600', path: '/applications' },
  { label: "Servis so'rov", desc: "So'rov yuborish", icon: 'M11.42 7.83a6 6 0 015.68 1.78l2.12 2.12a6 6 0 11-8.49 8.49l-1.5-1.5', bgColor: 'bg-gold-500', iconBg: 'bg-gradient-to-br from-gold-400 to-gold-600', path: '/service' },
  { label: 'Hisobot', desc: 'Hisobot yaratish', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', bgColor: 'bg-sky-500', iconBg: 'bg-gradient-to-br from-sky-400 to-sky-600', path: '/reports' },
]

const recentApps = computed(() => financeStore.applications.slice(0, 5))
const recentNotifs = computed(() => financeStore.notifications.slice(0, 4))

function notifColorClass(type: string) {
  return { PAYMENT: 'bg-emerald-50', CONTRACT: 'bg-brand-50', APPLICATION: 'bg-gold-50', SYSTEM: 'bg-rose-50', WARNING: 'bg-gold-50' }[type] || 'bg-ink-100'
}
function notifIconColorClass(type: string) {
  return { PAYMENT: 'text-emerald-600', CONTRACT: 'text-brand-600', APPLICATION: 'text-gold-600', SYSTEM: 'text-rose-600', WARNING: 'text-gold-600' }[type] || 'text-ink-600'
}
function notifIconPath(type: string) {
  return {
    PAYMENT: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
    CONTRACT: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    APPLICATION: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    SYSTEM: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    WARNING: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  }[type] || 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
}
</script>
