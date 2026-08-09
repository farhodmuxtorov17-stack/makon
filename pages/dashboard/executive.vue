<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 font-display">Ishchi panel</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ today }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn-secondary btn-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3M4 20h16"
            />
          </svg>
          Eksport
        </button>
        <button class="btn-primary btn-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Yangi
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Daromad (oy)"
        :value="totalRevenue"
        type="currency"
        color="success"
        icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
        :trend="12"
      />
      <StatCard
        label="Faol shartnomalar"
        :value="activeContracts"
        color="primary"
        icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        :trend="5"
      />
      <StatCard
        label="Bandlik darajasi"
        :value="occupancyRate"
        type="percent"
        color="accent"
        icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        :trend="3"
      />
      <StatCard
        label="O\'qilmagan bildirishnomalar"
        :value="unreadCount"
        color="warning"
        icon="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        :trend="-8"
      />
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue chart -->
      <div class="card lg:col-span-2">
        <div class="card-header">
          <h3 class="font-semibold text-neutral-900">Daromad dinamikasi</h3>
          <div class="flex items-center gap-2">
            <button class="btn-ghost btn-sm text-xs">6 oy</button>
            <button class="btn-ghost btn-sm text-xs bg-neutral-100">12 oy</button>
          </div>
        </div>
        <div class="card-body">
          <RevenueChart :data="revenueData" />
        </div>
      </div>

      <!-- Occupancy donut -->
      <div class="card">
        <div class="card-header">
          <h3 class="font-semibold text-neutral-900">Bandlik tuzilmasi</h3>
        </div>
        <div class="card-body flex flex-col items-center">
          <DonutChart :segments="occupancySegments" :size="160" />
          <div class="w-full space-y-2 mt-4">
            <div
              v-for="seg in occupancySegments"
              :key="seg.label"
              class="flex items-center justify-between text-sm"
            >
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full" :style="{ background: seg.color }" />
                <span class="text-neutral-500">{{ seg.label }}</span>
              </div>
              <span class="font-semibold text-neutral-900">{{ seg.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <CardHover
        v-for="action in quickActions"
        :key="action.label"
        :title="action.label"
        :icon="action.icon"
        :color="action.color"
        @click="navigateTo(action.path)"
      />
    </div>

    <!-- Recent activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent applications -->
      <div class="card">
        <div class="card-header">
          <h3 class="font-semibold text-neutral-900">So'nggi arizalar</h3>
          <NuxtLink
            to="/applications"
            class="text-xs font-semibold text-primary-600 hover:text-primary-700"
          >
            Hammasi →
          </NuxtLink>
        </div>
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Raqam</th>
                <th>Mijoz</th>
                <th>Turi</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="app in recentApps" :key="app.id">
                <td class="font-mono text-xs font-medium text-neutral-900">{{ app.number }}</td>
                <td class="text-neutral-500">{{ app.applicantName }}</td>
                <td class="text-neutral-500">{{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</td>
                <td><StatusBadge :status="app.status" :dot="true" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent notifications -->
      <div class="card">
        <div class="card-header">
          <h3 class="font-semibold text-neutral-900">So'nggi bildirishnomalar</h3>
          <NuxtLink
            to="/notifications"
            class="text-xs font-semibold text-primary-600 hover:text-primary-700"
          >
            Hammasi →
          </NuxtLink>
        </div>
        <div class="card-body space-y-3">
          <div v-for="notif in recentNotifs" :key="notif.id" class="flex items-start gap-3">
            <div
              :class="[
                'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
                notifColorClass(notif.type),
              ]"
            >
              <svg
                class="w-4 h-4"
                :class="notifIconColorClass(notif.type)"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="notifIconPath(notif.type)"
                />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-neutral-900">{{ notif.title }}</p>
              <p class="text-xs text-neutral-500">{{ notif.body }}</p>
              <p class="text-2xs text-neutral-400 mt-0.5">{{ timeAgo(notif.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFinanceStore } from '~/stores/finance'
import { useBuildingStore } from '~/stores/building'
import { useAuthStore } from '~/stores/auth'
import { formatCurrency, timeAgo } from '~/utils'
import StatCard from '~/components/ui/StatCard.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import CardHover from '~/components/ui/CardHover.vue'
import RevenueChart from '~/components/charts/RevenueChart.vue'
import DonutChart from '~/components/charts/DonutChart.vue'

definePageMeta({ middleware: 'auth' })

const financeStore = useFinanceStore()
const buildingStore = useBuildingStore()
const authStore = useAuthStore()

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
  return Math.round(
    (buildingStore.units.filter((u) => ['RENTED', 'SOLD'].includes(u.status)).length / total) * 100
  )
})

const revenueData = [
  { month: 'Yan', value: 28500000 },
  { month: 'Fev', value: 31000000 },
  { month: 'Mar', value: 32500000 },
  { month: 'Apr', value: 42500000 },
  { month: 'May', value: 38500000 },
  { month: 'Iyun', value: 35500000 },
]

const occupancySegments = computed(() => {
  const total = buildingStore.units.length || 1
  const rented = buildingStore.units.filter((u) => u.status === 'RENTED').length
  const sold = buildingStore.units.filter((u) => u.status === 'SOLD').length
  const vacant = buildingStore.units.filter((u) => u.status === 'VACANT').length
  const other = total - rented - sold - vacant
  return [
    { label: 'Ijarada', value: rented, color: '#6366f1' },
    { label: 'Sotilgan', value: sold, color: '#14b8a6' },
    { label: "Bo'sh", value: vacant, color: '#22c55e' },
    { label: 'Boshqa', value: other, color: '#e2e8f0' },
  ]
})

const quickActions = [
  {
    label: 'Yangi bino',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z',
    color: 'primary',
    path: '/management/buildings',
  },
  {
    label: 'Yangi ariza',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    color: 'success',
    path: '/applications',
  },
  {
    label: "Servis so'rov",
    icon: 'M11.42 7.83a6 6 0 015.68 1.78l2.12 2.12a6 6 0 11-8.49 8.49l-1.5-1.5',
    color: 'warning',
    path: '/service',
  },
  {
    label: 'Hisobot',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    color: 'info',
    path: '/reports',
  },
]

const recentApps = computed(() => financeStore.applications.slice(0, 5))
const recentNotifs = computed(() => financeStore.notifications.slice(0, 4))

function notifColorClass(t: string) {
  return (
    {
      APPLICATION: 'bg-primary-50',
      INVOICE: 'bg-success-50',
      ERI: 'bg-accent-50',
      SERVICE: 'bg-warning-50',
      MATERIAL: 'bg-purple-50',
      SYSTEM: 'bg-neutral-100',
    }[t] || 'bg-neutral-100'
  )
}
function notifIconColorClass(t: string) {
  return (
    {
      APPLICATION: 'text-primary-600',
      INVOICE: 'text-success-600',
      ERI: 'text-accent-600',
      SERVICE: 'text-warning-600',
      MATERIAL: 'text-purple-600',
      SYSTEM: 'text-neutral-500',
    }[t] || 'text-neutral-500'
  )
}
function notifIconPath(t: string) {
  return (
    {
      APPLICATION:
        'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      INVOICE:
        'M9 14l6-6m-5.5.5h.01m4.99 5h.01M18 14l-1.5-1.5M5 21a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5z',
      ERI: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      SERVICE: 'M11.42 7.83a6 6 0 015.68 1.78l2.12 2.12a6 6 0 11-8.49 8.49l-1.5-1.5',
      MATERIAL:
        'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2M7 15h10',
      SYSTEM:
        'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    }[t] ||
    'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5'
  )
}
</script>
