<template>
  <div class="space-y-6">
    <!-- Welcome -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Ishchi panel</h1>
        <p class="text-ink-500 text-sm mt-0.5">{{ greeting }}, {{ authStore.user?.fullName?.split(' ')[0] }}</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1 rounded-xl bg-white border border-ink-200 p-1">
          <button v-for="p in periods" :key="p.id" @click="activePeriod = p.id"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            :class="activePeriod === p.id ? 'bg-ink-900 text-white' : 'text-ink-500 hover:text-ink-700'">
            {{ p.label }}
          </button>
        </div>
        <button class="btn btn-primary btn-sm" @click="toast.info('Yangi ob\'ekt', 'Forma tez orada')">
          <Plus :size="16" /> Ob'ekt
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon="Wallet" :value="formatPrice(totalRevenue)" label="Daromat (oy)" iconBg="bg-brand-50" iconColor="text-brand-600" :trend="revenueTrend" :trendUp="true" />
      <StatCard icon="Building2" :value="occupancyPct" label="Bandlik" iconBg="bg-emerald-50" iconColor="text-emerald-600" trend="+3.2%" :trendUp="true" />
      <StatCard icon="FileText" :value="String(activeContracts)" label="Aktiv shartnomalar" iconBg="bg-amber-50" iconColor="text-amber-600" :trend="`+${newContracts}`" :trendUp="true" />
      <StatCard icon="Users" :value="String(newApplications)" label="Yangi arizalar" iconBg="bg-rose-50" iconColor="text-rose-600" :trend="`+${newApplications}`" :trendUp="true" />
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="font-semibold text-ink-900">Daromat dinamikasi</h3>
            <p class="text-sm text-ink-400">Oxirgi 6 oy, so'm</p>
          </div>
          <div class="flex gap-2">
            <button v-for="t in chartTypes" :key="t.id" @click="chartType = t.id"
              class="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              :class="chartType === t.id ? 'bg-brand-50 text-brand-700' : 'text-ink-400 hover:bg-ink-100'">
              {{ t.label }}
            </button>
          </div>
        </div>
        <client-only>
          <apexchart :type="chartType" height="280" :options="revenueChartOptions" :series="revenueSeries" />
        </client-only>
      </div>

      <div class="card p-6">
        <h3 class="font-semibold text-ink-900 mb-1">Bandlik darajasi</h3>
        <p class="text-sm text-ink-400 mb-4">Maydon bo'yicha</p>
        <client-only>
          <apexchart type="radialBar" height="280" :options="occupancyChartOptions" :series="occupancySeries" />
        </client-only>
        <div class="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-ink-100">
          <div class="text-center">
            <div class="flex items-center justify-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-brand-500"></span>
              <span class="text-sm text-ink-600">Band</span>
            </div>
            <p class="text-lg font-bold mt-1">{{ occupiedUnits }}</p>
          </div>
          <div class="text-center">
            <div class="flex items-center justify-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-ink-200"></span>
              <span class="text-sm text-ink-600">Bo'sh</span>
            </div>
            <p class="text-lg font-bold mt-1">{{ vacantUnits }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mid row: Buildings + Quick actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">Binolar bo'yicha bandlik</h3>
          <NuxtLink to="/management/buildings" class="text-sm text-brand-600 hover:text-brand-700 font-medium">Barchasi →</NuxtLink>
        </div>
        <div class="space-y-3">
          <NuxtLink v-for="b in buildings" :key="b.id" :to="`/management/buildings/${b.id}`" class="flex items-center gap-4 group">
            <div class="w-10 h-10 rounded-xl overflow-hidden bg-ink-100 flex-shrink-0">
              <img :src="b.img" :alt="b.name" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <p class="font-medium text-sm text-ink-900 truncate group-hover:text-brand-600 transition-colors">{{ b.name }}</p>
                <span class="text-sm font-semibold" :class="b.occ >= 90 ? 'text-emerald-600' : b.occ >= 75 ? 'text-amber-600' : 'text-rose-600'">{{ b.occ }}%</span>
              </div>
              <div class="h-2 rounded-full bg-ink-100 overflow-hidden">
                <div class="h-full rounded-full transition-all duration-700"
                  :class="b.occ >= 90 ? 'bg-emerald-500' : b.occ >= 75 ? 'bg-amber-500' : 'bg-rose-500'"
                  :style="{ width: b.occ + '%' }" />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="card p-6">
        <h3 class="font-semibold mb-4">Tezkor amallar</h3>
        <div class="grid grid-cols-2 gap-2">
          <NuxtLink v-for="a in quickActions" :key="a.label" :to="a.link"
            class="flex flex-col items-center gap-2 p-4 rounded-xl border border-ink-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all group">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              :class="a.bg + ' group-hover:scale-110 transition-transform'">
              <component :is="a.icon" :size="18" :class="a.color" />
            </div>
            <span class="text-xs font-medium text-ink-600 text-center">{{ a.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Bottom: Applications + Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">So'nggi arizalar</h3>
          <NuxtLink to="/applications" class="text-sm text-brand-600 hover:text-brand-700 font-medium">Barchasi →</NuxtLink>
        </div>
        <div class="space-y-1">
          <NuxtLink v-for="app in recentApps" :key="app.id" :to="`/applications/${app.id}`"
            class="flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-ink-50 transition-colors">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              :class="app.type === 'RENT' ? 'bg-brand-50' : 'bg-amber-50'">
              <component :is="app.type === 'RENT' ? KeyRound : Tag" :size="18"
                :class="app.type === 'RENT' ? 'text-brand-600' : 'text-amber-600'" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm text-ink-900 truncate">{{ app.applicantName }}</p>
              <p class="text-xs text-ink-400">{{ app.number }} · {{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</p>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="font-semibold text-sm">{{ formatPrice(app.offeredPrice) }}</p>
              <StatusBadge :status="app.status" :variant="appStatusVariant(app.status)" :label="appStatusLabel(app.status)" dot />
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="card p-6">
        <h3 class="font-semibold mb-4">Faollik oqimi</h3>
        <div class="space-y-4">
          <div v-for="(act, i) in activities" :key="i" class="flex gap-3">
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :class="act.bg">
                <component :is="act.icon" :size="14" :class="act.color" />
              </div>
              <div v-if="i < activities.length - 1" class="w-px flex-1 bg-ink-100 my-1"></div>
            </div>
            <div class="pb-3">
              <p class="text-sm text-ink-700 leading-snug">{{ act.text }}</p>
              <p class="text-xs text-ink-400 mt-0.5">{{ act.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Plus, Wallet, Building2, FileText, Users, KeyRound, Tag,
  CreditCard, Wrench, Package, CheckCircle2, AlertTriangle, FileCheck,
} from 'lucide-vue-next'
import type { ApplicationStatus } from '~/types'

const authStore = useAuthStore()
const financeStore = useFinanceStore()
const toast = useToast()

onMounted(() => financeStore.initMockData())

const activePeriod = ref('month')
const chartType = ref('area')

const periods = [
  { id: 'week', label: 'Hafta' },
  { id: 'month', label: 'Oy' },
  { id: 'quarter', label: 'Chorak' },
  { id: 'year', label: 'Yil' },
]

const chartTypes = [
  { id: 'area', label: 'Maydon' },
  { id: 'bar', label: 'Ustun' },
]

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Xayrli tong'
  if (h < 18) return 'Xayrli kun'
  return 'Xayrli kech'
})

// KPI from store data
const totalRevenue = computed(() => {
  const paid = financeStore.payments.filter(p => p.status === 'COMPLETED').reduce((s, p) => s + p.amount, 0)
  return paid
})
const revenueTrend = computed(() => '+12.5%')
const occupancyPct = computed(() => '91%')
const activeContracts = computed(() => financeStore.contracts.filter(c => c.status === 'ACTIVE').length)
const newContracts = computed(() => financeStore.contracts.filter(c => c.status === 'SIGNED' || c.status === 'PENDING_SIGN').length)
const newApplications = computed(() => financeStore.applications.filter(a => a.status === 'SUBMITTED' || a.status === 'FINANCE_REVIEW').length)
const occupiedUnits = 312
const vacantUnits = 31

// Revenue chart from store data
const revenueSeries = computed(() => {
  const monthlyData = financeStore.billingPeriods
    .filter(bp => bp.status === 'CLOSED')
    .map(bp => bp.totalAmount)
  return [{
    name: 'Daromat',
    data: monthlyData.length >= 6 ? monthlyData.slice(-6) : [18500000, 22100000, 24500000, 26800000, 29200000, 31500000],
  }]
})

const revenueChartOptions = {
  chart: { type: 'area', toolbar: { show: false }, fontFamily: 'Inter, sans-serif', sparkline: { enabled: false } },
  colors: ['#4f46e5'],
  stroke: { curve: 'smooth', width: 2.5 },
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.15, opacityTo: 0.01, stops: [0, 90, 100] } },
  dataLabels: { enabled: false },
  grid: { borderColor: '#e4e4e7', strokeDashArray: 0, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { top: 0, right: 0, bottom: 0, left: 0 } },
  xaxis: {
    categories: ['Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul'],
    labels: { style: { colors: '#a1a1aa', fontSize: '12px' } },
    axisBorder: { show: false }, axisTicks: { show: false },
  },
  yaxis: { labels: { formatter: (v: number) => (v / 1000000).toFixed(0) + 'M', style: { colors: '#a1a1aa', fontSize: '12px' } } },
  tooltip: { y: { formatter: (v: number) => v.toLocaleString('ru') + " so'm" }, style: { fontSize: '13px' } },
  markers: { size: 0, hover: { size: 5 } },
  animations: { enabled: true, speed: 800, animateGradually: { enabled: true, delay: 100 } },
}

const occupancySeries = [91]
const occupancyChartOptions = {
  chart: { type: 'radialBar', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
  colors: ['#4f46e5'],
  plotOptions: {
    radialBar: {
      startAngle: -135, endAngle: 135, hollow: { size: '70%' },
      track: { background: '#e4e4e7', strokeWidth: '100%', margin: 5 },
      dataLabels: { name: { show: false }, value: { show: true, fontSize: '28px', fontWeight: 700, color: '#18181b', offsetY: 5, formatter: () => '91%' } },
    },
  },
  fill: { type: 'gradient', gradient: { shade: 'dark', type: 'horizontal', shadeIntensity: 0.5, gradientToColors: ['#818cf8'], stops: [0, 100] } },
  stroke: { lineCap: 'round' },
  animations: { enabled: true, speed: 1000 },
}

const buildings = [
  { id: 'b1', name: 'Trilliant Tower', occ: 94, img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=80' },
  { id: 'b2', name: 'Tashkent City IBC', occ: 87, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&q=80' },
  { id: 'b3', name: 'IT Park Tashkent', occ: 92, img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&q=80' },
  { id: 'b4', name: 'Piramit Tower', occ: 78, img: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=200&q=80' },
  { id: 'b5', name: 'Crystal Plaza', occ: 84, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80' },
]

const quickActions = [
  { label: 'Yangi shartnoma', link: '/finance/contracts', icon: FileText, bg: 'bg-brand-50', color: 'text-brand-600' },
  { label: 'Invoys yaratish', link: '/finance/invoices', icon: CreditCard, bg: 'bg-emerald-50', color: 'text-emerald-600' },
  { label: 'Servis so\'rovi', link: '/service', icon: Wrench, bg: 'bg-amber-50', color: 'text-amber-600' },
  { label: 'Sklad operatsiyasi', link: '/warehouse', icon: Package, bg: 'bg-sky-50', color: 'text-sky-600' },
]

const recentApps = computed(() => financeStore.applications.slice(0, 5))

const activities = [
  { icon: FileCheck, text: 'Shartnoma CTR-2025-003 imzolandi (B. Toshmatov)', time: '2 soat oldin', bg: 'bg-brand-50', color: 'text-brand-600' },
  { icon: CheckCircle2, text: 'INV-2025-06-001 to\'landi — 12 mln so\'m', time: '5 soat oldin', bg: 'bg-emerald-50', color: 'text-emerald-600' },
  { icon: Wrench, text: 'SR-2025-005 — Crystal Plaza, santexnika', time: 'Bugun, 10:00', bg: 'bg-amber-50', color: 'text-amber-600' },
  { icon: AlertTriangle, text: 'INV-2025-05-009 muddati o\'tdi — 4.5 mln qoldi', time: 'Kecha, 08:00', bg: 'bg-rose-50', color: 'text-rose-600' },
  { icon: CheckCircle2, text: 'WO-2025-001 yakunlandi — Lift texnik xizmat', time: 'Kecha, 15:30', bg: 'bg-emerald-50', color: 'text-emerald-600' },
]

function formatPrice(v: number) {
  if (v >= 1000000000) return (v / 1000000000).toFixed(1) + ' mlrd'
  if (v >= 1000000) return (v / 1000000).toFixed(0) + ' mln'
  return v.toLocaleString('ru')
}

function appStatusLabel(s: ApplicationStatus): string {
  const m: Record<string, string> = { SUBMITTED: 'Yangi', FINANCE_REVIEW: 'Tekshiruv', OFFER_SENT: 'Taklif yuborildi', CONTRACT_SIGNING: 'Shartnoma', APPROVED: 'Tasdiqlandi', REJECTED: 'Rad', CANCELLED: 'Bekor', DRAFT: 'Qoralama', ERI_SIGNING: 'ERI' }
  return m[s] || s
}
function appStatusVariant(s: ApplicationStatus): string {
  const m: Record<string, string> = { SUBMITTED: 'info', FINANCE_REVIEW: 'warning', OFFER_SENT: 'info', CONTRACT_SIGNING: 'warning', APPROVED: 'success', REJECTED: 'danger', CANCELLED: 'neutral', DRAFT: 'neutral', ERI_SIGNING: 'warning' }
  return m[s] || 'neutral'
}
</script>
