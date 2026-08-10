<template>
  <div class="space-y-6">
    <!-- Welcome -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-slide-up">
      <div>
        <h1 class="font-display text-2xl font-extrabold tracking-tight">Ishchi panel</h1>
        <p class="text-ink-500 text-sm mt-0.5">{{ greeting }}, {{ authStore.user?.fullName?.split(' ')[0] }} 👋</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1 rounded-xl bg-white border border-ink-200 p-1 shadow-sm">
          <button v-for="p in periods" :key="p.id" @click="activePeriod = p.id"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            :class="activePeriod === p.id ? 'bg-ink-900 text-white shadow-sm' : 'text-ink-400 hover:text-ink-600'">
            {{ p.label }}
          </button>
        </div>
        <button class="btn btn-primary btn-sm" @click="toast.info('Yangi ob\'ekt', 'Forma tez orada')">
          <Plus :size="16" /> Ob'ekt
        </button>
      </div>
    </div>

    <!-- KPI Cards with sparklines -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
      <StatCard icon="Wallet" :value="formatPriceShort(totalRevenue)" label="Daromat (oy)" iconBg="bg-brand-50" iconColor="text-brand-600" ::trend="`+12.5%`" :trendUp="true" :sparkline="[20,25,23,30,28,35,38,42]" sparkColor="#6366f1" />
      <StatCard icon="Building2" :value="occupancyPct" label="Bandlik" iconBg="bg-emerald-50" iconColor="text-emerald-600" :trend="`+3.2%`" :trendUp="true" :sparkline="[80,82,85,87,88,90,91,91]" sparkColor="#10b981" />
      <StatCard icon="FileText" :value="String(activeContracts)" label="Aktiv shartnomalar" iconBg="bg-amber-50" iconColor="text-amber-600" :trend="`+${newContracts}`" :trendUp="true" :sparkline="[8,9,10,11,10,11,12,11]" sparkColor="#f59e0b" />
      <StatCard icon="Users" :value="String(newApplications)" label="Yangi arizalar" iconBg="bg-rose-50" iconColor="text-rose-600" :trend="`+${newApplications}`" :trendUp="true" :sparkline="[1,2,3,2,4,3,5,4]" sparkColor="#f43f5e" />
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-slide-up" style="animation-delay:0.3s">
      <div class="card card-hover p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="font-semibold text-ink-900">Daromat dinamikasi</h3>
            <p class="text-sm text-ink-400">Oxirgi 6 oy, so'm</p>
          </div>
          <div class="flex gap-1 p-1 bg-ink-100 rounded-lg">
            <button v-for="t in chartTypes" :key="t.id" @click="chartType = t.id"
              class="text-xs font-semibold px-3 py-1.5 rounded-md transition-all"
              :class="chartType === t.id ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-400'">
              {{ t.label }}
            </button>
          </div>
        </div>
        <client-only>
          <apexchart :type="chartType" height="280" :options="revenueChartOptions" :series="revenueSeries" />
        </client-only>
      </div>

      <div class="card card-hover p-6">
        <h3 class="font-semibold text-ink-900 mb-1">Bandlik darajasi</h3>
        <p class="text-sm text-ink-400 mb-4">Maydon bo'yicha</p>
        <client-only>
          <apexchart type="radialBar" height="240" :options="occupancyChartOptions" :series="occupancySeries" />
        </client-only>
        <div class="grid grid-cols-2 gap-3 mt-2 pt-4 border-t border-ink-100">
          <div class="text-center">
            <div class="flex items-center justify-center gap-1.5 mb-1">
              <span class="w-2 h-2 rounded-full bg-brand-500"></span>
              <span class="text-xs text-ink-500 font-medium">Band</span>
            </div>
            <p class="text-xl font-bold font-display">{{ occupiedUnits }}</p>
          </div>
          <div class="text-center">
            <div class="flex items-center justify-center gap-1.5 mb-1">
              <span class="w-2 h-2 rounded-full bg-ink-200"></span>
              <span class="text-xs text-ink-500 font-medium">Bo'sh</span>
            </div>
            <p class="text-xl font-bold font-display">{{ vacantUnits }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mid row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-slide-up" style="animation-delay:0.4s">
      <div class="card card-hover p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">Binolar bo'yicha bandlik</h3>
          <NuxtLink to="/management/buildings" class="text-sm text-brand-600 hover:text-brand-700 font-medium">Barchasi →</NuxtLink>
        </div>
        <div class="space-y-3">
          <NuxtLink v-for="b in buildings" :key="b.id" :to="`/management/buildings/${b.id}`" class="flex items-center gap-4 group hover-lift p-2 rounded-xl">
            <div class="w-10 h-10 rounded-xl overflow-hidden bg-ink-100 flex-shrink-0 ring-2 ring-transparent group-hover:ring-brand-200 transition-all">
              <img :src="b.img" :alt="b.name" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <p class="font-medium text-sm text-ink-900 truncate group-hover:text-brand-600 transition-colors">{{ b.name }}</p>
                <span class="text-sm font-bold" :class="b.occ >= 90 ? 'text-emerald-600' : b.occ >= 75 ? 'text-amber-600' : 'text-rose-600'">{{ b.occ }}%</span>
              </div>
              <div class="h-2 rounded-full bg-ink-100 overflow-hidden">
                <div class="h-full rounded-full transition-all duration-700"
                  :class="b.occ >= 90 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : b.occ >= 75 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-rose-400 to-rose-500'"
                  :style="{ width: b.occ + '%' }" />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="card card-hover p-6">
        <h3 class="font-semibold mb-4">Tezkor amallar</h3>
        <div class="grid grid-cols-2 gap-2">
          <NuxtLink v-for="a in quickActions" :key="a.label" :to="a.link"
            class="flex flex-col items-center gap-2 p-4 rounded-xl border border-ink-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all group hover-lift">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
              :class="a.bg">
              <component :is="a.icon" :size="18" :class="a.color" />
            </div>
            <span class="text-xs font-medium text-ink-600 text-center">{{ a.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Bottom row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-slide-up" style="animation-delay:0.5s">
      <div class="card card-hover p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">So'nggi arizalar</h3>
          <NuxtLink to="/applications" class="text-sm text-brand-600 hover:text-brand-700 font-medium">Barchasi →</NuxtLink>
        </div>
        <div class="space-y-1">
          <NuxtLink v-for="app in recentApps" :key="app.id" :to="`/applications/${app.id}`"
            class="flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-ink-50 transition-colors group">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
              :class="app.type === 'RENT' ? 'bg-brand-50' : 'bg-amber-50'">
              <component :is="app.type === 'RENT' ? KeyRound : Tag" :size="18"
                :class="app.type === 'RENT' ? 'text-brand-600' : 'text-amber-600'" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm text-ink-900 truncate group-hover:text-brand-600 transition-colors">{{ app.applicantName }}</p>
              <p class="text-xs text-ink-400">{{ app.number }} · {{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</p>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="font-semibold text-sm">{{ formatPriceShort(app.offeredPrice) }}</p>
              <span class="status-dot text-xs mt-1" :class="appStatusClass(app.status)">{{ appStatusLabel(app.status) }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="card card-hover p-6">
        <h3 class="font-semibold mb-4">Faollik oqimi</h3>
        <div class="space-y-4">
          <div v-for="(act, i) in activities" :key="i" class="flex gap-3">
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ring-2 ring-white" :class="act.bg">
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
const { formatPriceShort } = useFormat()

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

const totalRevenue = computed(() => financeStore.payments.filter(p => p.status === 'COMPLETED').reduce((s, p) => s + p.amount, 0))
const occupancyPct = '91%'
const activeContracts = computed(() => financeStore.contracts.filter(c => c.status === 'ACTIVE').length)
const newContracts = computed(() => financeStore.contracts.filter(c => c.status === 'SIGNED' || c.status === 'PENDING_SIGN').length)
const newApplications = computed(() => financeStore.applications.filter(a => a.status === 'SUBMITTED' || a.status === 'FINANCE_REVIEW').length)
const occupiedUnits = 312
const vacantUnits = 31

const revenueSeries = computed(() => {
  const monthlyData = financeStore.billingPeriods.filter(bp => bp.status === 'CLOSED').map(bp => bp.totalAmount)
  return [{ name: 'Daromat', data: monthlyData.length >= 6 ? monthlyData.slice(-6) : [89500000, 94500000, 98200000, 103500000, 112800000, 118400000] }]
})

const revenueChartOptions = {
  chart: { type: 'area', toolbar: { show: false }, fontFamily: 'Inter, sans-serif', sparkline: { enabled: false } },
  colors: ['#6366f1'],
  stroke: { curve: 'smooth', width: 3 },
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.2, opacityTo: 0.01, stops: [0, 90, 100] } },
  dataLabels: { enabled: false },
  grid: { borderColor: '#f4f4f5', strokeDashArray: 0, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { top: 0, right: 0, bottom: 0, left: 0 } },
  xaxis: { categories: ['Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul'], labels: { style: { colors: '#a1a1aa', fontSize: '12px', fontWeight: 500 } }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { labels: { formatter: (v: number) => (v / 1000000).toFixed(0) + 'M', style: { colors: '#a1a1aa', fontSize: '12px' } } },
  tooltip: { y: { formatter: (v: number) => v.toLocaleString('ru') + " so'm" }, theme: 'light', style: { fontSize: '13px', fontFamily: 'Inter' } },
  markers: { size: 0, hover: { size: 6, sizeOffset: 3 } },
  animations: { enabled: true, speed: 800, animateGradually: { enabled: true, delay: 100 }, dynamicAnimation: { enabled: true, speed: 400 } },
}

const occupancySeries = [91]
const occupancyChartOptions = {
  chart: { type: 'radialBar', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
  colors: ['#6366f1'],
  plotOptions: { radialBar: { startAngle: -135, endAngle: 135, hollow: { size: '72%' }, track: { background: '#f4f4f5', strokeWidth: '100%', margin: 5 }, dataLabels: { name: { show: false }, value: { show: true, fontSize: '28px', fontWeight: 700, color: '#18181b', offsetY: 5, formatter: () => '91%' } } } },
  fill: { type: 'gradient', gradient: { shade: 'dark', type: 'horizontal', shadeIntensity: 0.5, gradientToColors: ['#818cf8'], stops: [0, 100] } },
  stroke: { lineCap: 'round' },
  animations: { enabled: true, speed: 1000 },
}

const buildings = [
  { id: 'b1', name: 'Trilliant Tower', occ: 94, img: 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/e23becacd_tashkent_business.jpg' },
  { id: 'b2', name: 'Tashkent City IBC', occ: 87, img: 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/d62df0e1f_ibc_tashkent.jpg' },
  { id: 'b3', name: 'IT Park Tashkent', occ: 92, img: 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/93bd7fd52_nest_one.jpg' },
  { id: 'b4', name: 'Piramit Tower', occ: 78, img: 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/a63dc668a_piramit.jpg' },
  { id: 'b5', name: 'Crystal Plaza', occ: 84, img: 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/e23becacd_tashkent_business.jpg' },
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
  { icon: CheckCircle2, text: "INV-2025-06-001 to'landi — 12 mln so'm", time: '5 soat oldin', bg: 'bg-emerald-50', color: 'text-emerald-600' },
  { icon: Wrench, text: 'SR-2025-005 — Crystal Plaza, santexnika', time: 'Bugun, 10:00', bg: 'bg-amber-50', color: 'text-amber-600' },
  { icon: AlertTriangle, text: "INV-2025-05-009 muddati o'tdi — 4.5 mln qoldi", time: 'Kecha, 08:00', bg: 'bg-rose-50', color: 'text-rose-600' },
  { icon: CheckCircle2, text: "WO-2025-001 yakunlandi — Lift texnik xizmat", time: 'Kecha, 15:30', bg: 'bg-emerald-50', color: 'text-emerald-600' },
]

function appStatusLabel(s: ApplicationStatus): string {
  const m: Record<string, string> = { SUBMITTED: 'Yangi', FINANCE_REVIEW: 'Tekshiruv', OFFER_SENT: 'Taklif yuborildi', CONTRACT_SIGNING: 'Shartnoma', APPROVED: 'Tasdiqlandi', REJECTED: 'Rad', CANCELLED: 'Bekor', DRAFT: 'Qoralama', ERI_SIGNING: 'ERI' }
  return m[s] || s
}
function appStatusClass(s: ApplicationStatus): string {
  const m: Record<string, string> = { SUBMITTED: 'status-info', FINANCE_REVIEW: 'status-warning', OFFER_SENT: 'status-info', CONTRACT_SIGNING: 'status-warning', APPROVED: 'status-success', REJECTED: 'status-danger', CANCELLED: 'status-neutral', DRAFT: 'status-neutral', ERI_SIGNING: 'status-warning' }
  return m[s] || 'status-neutral'
}
</script>
