<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Ishchi panel</h1>
        <p class="text-ink-500 text-sm mt-0.5">Xush kelibsiz, {{ authStore.user?.fullName }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-outline btn-sm">
          <Calendar :size="16" />
          Oy: Iyul 2026
        </button>
        <button class="btn btn-primary btn-sm">
          <Plus :size="16" />
          Yangi ob'ekt
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="kpi in kpis" :key="kpi.label" class="card p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="kpi.bgClass">
            <component :is="kpi.icon" :size="20" :class="kpi.iconClass" />
          </div>
          <span class="text-xs font-semibold px-2 py-1 rounded-lg" :class="kpi.trendClass">
            {{ kpi.trend }}
          </span>
        </div>
        <p class="text-2xl font-bold font-display tracking-tight">{{ kpi.value }}</p>
        <p class="text-sm text-ink-400 mt-0.5">{{ kpi.label }}</p>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Revenue chart -->
      <div class="card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="font-semibold text-ink-900">Daromat dinamikasi</h3>
            <p class="text-sm text-ink-400">Oxirgi 6 oy, so'm</p>
          </div>
          <div class="flex gap-2">
            <button class="text-xs font-medium px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700">Oylik</button>
            <button class="text-xs font-medium px-3 py-1.5 rounded-lg text-ink-400 hover:bg-ink-100">Yillik</button>
          </div>
        </div>
        <!-- Bar chart -->
        <div class="flex items-end gap-3 h-48">
          <div v-for="(bar, i) in chartData" :key="i" class="flex-1 flex flex-col items-center gap-2 group">
            <div class="w-full flex-1 flex items-end">
              <div
                class="w-full rounded-t-lg transition-all duration-500 ease-premium group-hover:opacity-80"
                :class="i === chartData.length - 1 ? 'bg-brand-600' : 'bg-brand-200'"
                :style="{ height: bar.height + '%' }"
              >
                <div class="opacity-0 group-hover:opacity-100 transition-opacity text-center text-[10px] font-bold text-white pt-1">
                  {{ bar.label }}
                </div>
              </div>
            </div>
            <span class="text-xs text-ink-400">{{ bar.month }}</span>
          </div>
        </div>
      </div>

      <!-- Occupancy donut -->
      <div class="card p-6">
        <h3 class="font-semibold text-ink-900 mb-1">Bandlik darajasi</h3>
        <p class="text-sm text-ink-400 mb-6">Umumiy maydon</p>
        <div class="relative w-40 h-40 mx-auto mb-6">
          <svg viewBox="0 0 120 120" class="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e4e4e7" stroke-width="14" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#4f46e5" stroke-width="14"
              stroke-dasharray="314" stroke-dashoffset="28.3" stroke-linecap="round" class="transition-all duration-1000" />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <p class="text-3xl font-bold font-display">91%</p>
            <p class="text-xs text-ink-400">band</p>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-brand-600"></span> Band</span>
            <span class="font-semibold">312 maydon</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-ink-200"></span> Bo'sh</span>
            <span class="font-semibold">31 maydon</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Recent applications -->
      <div class="card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-ink-900">Oxirgi arizalar</h3>
          <NuxtLink to="/applications" class="text-sm text-brand-600 hover:text-brand-700 font-medium">Hammasini ko'rish →</NuxtLink>
        </div>
        <div class="space-y-1">
          <div v-for="app in recentApps" :key="app.id" class="flex items-center gap-4 py-3 px-2 rounded-xl hover:bg-ink-50 transition-colors">
            <div class="w-10 h-10 rounded-xl bg-ink-100 flex items-center justify-center flex-shrink-0">
              <ClipboardList :size="18" class="text-ink-500" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-ink-900 truncate">{{ app.applicantName }}</p>
              <p class="text-sm text-ink-400">{{ app.number }} · {{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-ink-900">{{ formatPrice(app.offeredPrice) }}</p>
              <span class="badge" :class="statusBadgeClass(app.status)">{{ statusLabel(app.status) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity feed -->
      <div class="card p-6">
        <h3 class="font-semibold text-ink-900 mb-4">Faollik</h3>
        <div class="space-y-4">
          <div v-for="(act, i) in activities" :key="i" class="flex gap-3">
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :class="act.bg">
                <component :is="act.icon" :size="14" :class="act.color" />
              </div>
              <div v-if="i < activities.length - 1" class="w-px flex-1 bg-ink-100 my-1"></div>
            </div>
            <div class="pb-3">
              <p class="text-sm text-ink-700">{{ act.text }}</p>
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
  Calendar, Plus, Building2, Wallet, TrendingUp, Users, ClipboardList,
  FileText, Wrench, CheckCircle2, AlertTriangle,
} from 'lucide-vue-next'
import type { ApplicationStatus } from '~/types'

const authStore = useAuthStore()
const financeStore = useFinanceStore()

onMounted(() => financeStore.initMockData())

const kpis = [
  { label: "Jami daromat (oy)", value: "285M so'm", icon: Wallet, bgClass: "bg-brand-50", iconClass: "text-brand-600", trend: "+12%", trendClass: "bg-emerald-50 text-emerald-600" },
  { label: "Bandlik darajasi", value: "91%", icon: Building2, bgClass: "bg-emerald-50", iconClass: "text-emerald-600", trend: "+3%", trendClass: "bg-emerald-50 text-emerald-600" },
  { label: "Faol shartnomalar", value: "87", icon: FileText, bgClass: "bg-amber-50", iconClass: "text-amber-600", trend: "+5", trendClass: "bg-emerald-50 text-emerald-600" },
  { label: "Yangi arizalar", value: "3", icon: Users, bgClass: "bg-rose-50", iconClass: "text-rose-600", trend: "+2", trendClass: "bg-emerald-50 text-emerald-600" },
]

const chartData = [
  { month: 'Fev', height: 55, label: '18.5M' },
  { month: 'Mar', height: 68, label: '22.1M' },
  { month: 'Apr', height: 72, label: '24.5M' },
  { month: 'May', height: 82, label: '26.8M' },
  { month: 'Iyun', height: 90, label: '29.2M' },
  { month: 'Iyul', height: 98, label: '31.5M' },
]

const recentApps = computed(() => financeStore.applications.slice(0, 4))

const activities = [
  { icon: FileText, text: "Yangi shartnoma CTR-2025-003 imzolandi", time: "2 soat oldin", bg: "bg-brand-50", color: "text-brand-600" },
  { icon: Wallet, text: "INV-2025-06-001 to'landi (12M so'm)", time: "5 soat oldin", bg: "bg-emerald-50", color: "text-emerald-600" },
  { icon: Wrench, text: "SR-2025-005 servis so'rovi yaratildi", time: "Bugun, 10:00", bg: "bg-amber-50", color: "text-amber-600" },
  { icon: AlertTriangle, text: "INV-2025-04-004 muddati o'tdi", time: "Kecha, 08:00", bg: "bg-rose-50", color: "text-rose-600" },
  { icon: CheckCircle2, text: "WO-2025-001 yakunlandi", time: "Kecha, 15:30", bg: "bg-emerald-50", color: "text-emerald-600" },
]

function formatPrice(v: number) {
  if (v >= 1000000000) return (v / 1000000000).toFixed(1) + ' mlrd'
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  return v.toLocaleString('ru')
}

function statusLabel(s: ApplicationStatus): string {
  const m: Record<string, string> = {
    SUBMITTED: 'Yangi', FINANCE_REVIEW: 'Tekshiruvda', OFFER_SENT: 'Taklif yuborildi',
    CONTRACT_SIGNING: 'Shartnoma', APPROVED: 'Tasdiqlandi', REJECTED: 'Rad etildi',
    CANCELLED: 'Bekor qilindi', DRAFT: 'Qoralama', ERI_SIGNING: 'ERI imzo',
  }
  return m[s] || s
}

function statusBadgeClass(s: ApplicationStatus): string {
  const m: Record<string, string> = {
    SUBMITTED: 'badge-info', FINANCE_REVIEW: 'badge-warning',
    OFFER_SENT: 'badge-info', CONTRACT_SIGNING: 'badge-warning',
    APPROVED: 'badge-success', REJECTED: 'badge-danger',
    CANCELLED: 'badge-neutral', DRAFT: 'badge-neutral', ERI_SIGNING: 'badge-warning',
  }
  return m[s] || 'badge-neutral'
}
</script>
