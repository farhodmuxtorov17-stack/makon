<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Ishchi panel</h1>
        <p class="text-ink-500 text-sm mt-1">Tizim holati va asosiy ko'rsatkichlar</p>
      </div>
      <div class="text-sm text-ink-500">{{ new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}</div>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <template v-else-if="data">
      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="card p-5">
          <div class="flex items-center justify-between mb-2">
            <div class="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <Building2 :size="20" class="text-brand-400" />
            </div>
          </div>
          <div class="text-2xl font-bold">{{ data.stats.totalBuildings }}</div>
          <div class="text-xs text-ink-500">Jami binolar</div>
        </div>
        <div class="card p-5">
          <div class="flex items-center justify-between mb-2">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp :size="20" class="text-emerald-400" />
            </div>
            <span class="text-xs font-medium text-emerald-400">{{ data.stats.occupancyRate }}%</span>
          </div>
          <div class="text-2xl font-bold">{{ data.stats.occupiedUnits }}/{{ data.stats.totalUnits }}</div>
          <div class="text-xs text-ink-500">Band birliklar</div>
        </div>
        <div class="card p-5">
          <div class="flex items-center justify-between mb-2">
            <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <FileText :size="20" class="text-amber-400" />
            </div>
          </div>
          <div class="text-2xl font-bold">{{ data.stats.pendingApplications }}</div>
          <div class="text-xs text-ink-500">Kutilayotgan arizalar</div>
        </div>
        <div class="card p-5">
          <div class="flex items-center justify-between mb-2">
            <div class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Wallet :size="20" class="text-red-400" />
            </div>
          </div>
          <div class="text-2xl font-bold">{{ formatPrice(data.stats.outstandingDebt, 'UZS') }}</div>
          <div class="text-xs text-ink-500">Qarzdorlik</div>
        </div>
      </div>

      <!-- Secondary Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="card p-4 flex items-center gap-3">
          <Package :size="18" class="text-brand-400" />
          <div>
            <div class="text-sm font-semibold">{{ data.stats.vacantUnits }} birlik</div>
            <div class="text-xs text-ink-500">Bo'sh maydon</div>
          </div>
        </div>
        <div class="card p-4 flex items-center gap-3">
          <FileCheck2 :size="18" class="text-emerald-400" />
          <div>
            <div class="text-sm font-semibold">{{ data.stats.activeContracts }} faol</div>
            <div class="text-xs text-ink-500">Shartnomalar</div>
          </div>
        </div>
        <div class="card p-4 flex items-center gap-3">
          <Receipt :size="18" class="text-amber-400" />
          <div>
            <div class="text-sm font-semibold">{{ data.stats.unpaidInvoices }} ta</div>
            <div class="text-xs text-ink-500">To'lanmagan invoys</div>
          </div>
        </div>
        <div class="card p-4 flex items-center gap-3">
          <Wrench :size="18" class="text-red-400" />
          <div>
            <div class="text-sm font-semibold">{{ data.stats.openServiceRequests }} ta</div>
            <div class="text-xs text-ink-500">Faol xizmat so'rovi</div>
          </div>
        </div>
      </div>

      <!-- Charts row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Occupancy donut chart -->
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Bandlik darajasi</h3>
          <div class="flex items-center justify-center">
            <div class="relative w-40 h-40">
              <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="8" class="text-white/5" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="8"
                  class="text-brand-500 transition-all duration-1000"
                  :stroke-dasharray="`${(data.stats.occupancyRate / 100) * 251.2} 251.2`"
                  stroke-linecap="round" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <div class="text-3xl font-bold">{{ data.stats.occupancyRate }}%</div>
                <div class="text-xs text-ink-500">band</div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center gap-4 mt-4 text-xs">
            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-brand-500"></span> Band {{ data.stats.occupiedUnits }}</span>
            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-white/10"></span> Bo'sh {{ data.stats.vacantUnits }}</span>
          </div>
        </div>

        <!-- Applications by status -->
        <div class="card p-6 lg:col-span-2">
          <h3 class="font-semibold mb-4">Arizalar bo'yicha statuslar</h3>
          <div class="space-y-3">
            <div v-for="s in applicationStatusData" :key="s.label" class="flex items-center gap-3">
              <div class="w-28 text-sm text-ink-400 flex-shrink-0">{{ s.label }}</div>
              <div class="flex-1 h-7 rounded-lg bg-white/5 overflow-hidden">
                <div class="h-full rounded-lg transition-all duration-700 flex items-center px-2"
                  :class="s.color"
                  :style="{ width: Math.max((s.count / maxAppCount) * 100, s.count > 0 ? 8 : 0) + '%' }">
                  <span class="text-xs font-medium text-white" v-if="s.count > 0">{{ s.count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Buildings occupancy bars + revenue chart -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Buildings occupancy -->
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Binolar bo'yicha bandlik</h3>
          <div class="space-y-3">
            <div v-for="b in data.buildings" :key="b.id" class="flex items-center gap-3">
              <div class="w-32 flex-shrink-0">
                <div class="text-sm font-medium truncate">{{ b.name }}</div>
                <div class="text-xs text-ink-600">{{ b.address }}</div>
              </div>
              <div class="flex-1 h-6 rounded-lg bg-white/5 overflow-hidden">
                <div class="h-full rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-700"
                  :style="{ width: b.occupancyRate + '%' }"></div>
              </div>
              <div class="w-10 text-right text-sm font-medium">{{ b.occupancyRate }}%</div>
            </div>
          </div>
        </div>

        <!-- Revenue vs debt -->
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Daromad vs Qarzdorlik</h3>
          <div class="flex items-end justify-around h-48 pt-4">
            <div class="flex flex-col items-center gap-2">
              <div class="text-xs text-ink-500">{{ formatPrice(totalRevenue, 'UZS') }}</div>
              <div class="w-16 rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-700"
                :style="{ height: revenueBarHeight + 'px' }"></div>
              <div class="text-xs text-ink-400 font-medium">Daromad</div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="text-xs text-ink-500">{{ formatPrice(data.stats.outstandingDebt, 'UZS') }}</div>
              <div class="w-16 rounded-t-lg bg-gradient-to-t from-red-600 to-red-400 transition-all duration-700"
                :style="{ height: debtBarHeight + 'px' }"></div>
              <div class="text-xs text-ink-400 font-medium">Qarzdorlik</div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="text-xs text-ink-500">{{ formatPrice(totalContracts, 'UZS') }}</div>
              <div class="w-16 rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400 transition-all duration-700"
                :style="{ height: contractsBarHeight + 'px' }"></div>
              <div class="text-xs text-ink-400 font-medium">Shartnomalar</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent applications + Service requests -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Recent applications -->
        <div class="card p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold">So'nggi arizalar</h3>
            <NuxtLink to="/management/applications" class="btn btn-ghost btn-sm">Barchasi →</NuxtLink>
          </div>
          <div class="space-y-2">
            <div v-for="app in data.recentApplications" :key="app.id" class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center text-xs font-bold text-brand-400">
                  {{ app.applicantName?.charAt(0) }}
                </div>
                <div>
                  <div class="text-sm font-medium">{{ app.applicantName }}</div>
                  <div class="text-xs text-ink-500">{{ app.number }} · {{ formatDate(app.createdDate) }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="text-sm text-ink-400">{{ formatPrice(app.offeredPrice, app.currency) }}</div>
                <span class="badge" :class="statusBadge(app.status)">{{ statusLabel(app.status) }}</span>
              </div>
            </div>
            <div v-if="!data.recentApplications || data.recentApplications.length === 0" class="text-center py-4 text-ink-500 text-sm">Arizalar yo'q</div>
          </div>
        </div>

        <!-- Service requests by priority -->
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Xizmat so'rovlari prioriteti</h3>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="p in priorityData" :key="p.label" class="p-4 rounded-xl bg-white/5">
              <div class="flex items-center gap-2 mb-1">
                <span class="w-2 h-2 rounded-full" :class="p.dot"></span>
                <span class="text-xs text-ink-500">{{ p.label }}</span>
              </div>
              <div class="text-2xl font-bold" :class="p.text">{{ p.count }}</div>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-white/5">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-ink-400">SLA buzilgan</span>
              <span class="text-sm font-bold text-red-400">{{ slaOverdueCount }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-ink-400">SLA ichida</span>
              <span class="text-sm font-bold text-emerald-400">{{ slaWithinCount }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Tezkor amallar</h3>
        <div class="grid grid-cols-2 md:grid-cols-6 gap-3">
          <NuxtLink to="/management/buildings" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
            <Building2 :size="22" class="text-brand-400" />
            <span class="text-xs text-ink-300">Binolar</span>
          </NuxtLink>
          <NuxtLink to="/management/applications" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
            <FileText :size="22" class="text-amber-400" />
            <span class="text-xs text-ink-300">Arizalar</span>
          </NuxtLink>
          <NuxtLink to="/finance/invoices" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
            <Receipt :size="22" class="text-emerald-400" />
            <span class="text-xs text-ink-300">Invoyslar</span>
          </NuxtLink>
          <NuxtLink to="/finance/debts" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
            <Wallet :size="22" class="text-red-400" />
            <span class="text-xs text-ink-300">Qarzlar</span>
          </NuxtLink>
          <NuxtLink to="/facility/work-orders" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
            <Wrench :size="22" class="text-orange-400" />
            <span class="text-xs text-ink-300">Topshiriqlar</span>
          </NuxtLink>
          <NuxtLink to="/profile" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
            <UserCircle :size="22" class="text-brand-400" />
            <span class="text-xs text-ink-300">Kabinet</span>
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Building2, TrendingUp, FileText, Wallet, Package, FileCheck2, Receipt, Wrench, UserCircle } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { fetchAdminData } = useApi()
const { data, pending } = await useAsyncData('admin-dashboard', () => fetchAdminData('dashboard'))

// Application status distribution
const applicationStatusData = computed(() => {
  if (!data.value?.recentApplications) return []
  const apps = data.value.recentApplications
  const allApps = data.value.allApplications || apps
  const statuses = [
    { key: 'NEW', label: 'Yangi', color: 'bg-ink-500', count: 0 },
    { key: 'BUILDING_REVIEW', label: 'Bino ko\'rib', color: 'bg-amber-500', count: 0 },
    { key: 'FINANCE_REVIEW', label: 'Moliya', color: 'bg-brand-500', count: 0 },
    { key: 'OFFER_SENT', label: 'Taklif yuborildi', color: 'bg-indigo-500', count: 0 },
    { key: 'ERI_PENDING', label: 'ERI kutilmoqda', color: 'bg-purple-500', count: 0 },
    { key: 'APPROVED', label: 'Tasdiqlandi', color: 'bg-emerald-500', count: 0 },
    { key: 'REJECTED', label: 'Rad etildi', color: 'bg-red-500', count: 0 },
  ]
  allApps.forEach((a: any) => {
    const s = statuses.find(s => s.key === a.status)
    if (s) s.count++
  })
  return statuses
})

const maxAppCount = computed(() => Math.max(...applicationStatusData.value.map(s => s.count), 1))

// Revenue calculations
const totalRevenue = computed(() => {
  if (!data.value?.invoices) return 0
  return data.value.invoices.reduce((s: number, i: any) => s + (i.paidAmount || 0), 0)
})

const totalContracts = computed(() => {
  if (!data.value?.contracts) return 0
  return data.value.contracts.reduce((s: number, c: any) => s + (c.monthlyRent || 0) * 12, 0)
})

const maxFinancial = computed(() => Math.max(totalRevenue.value, data.value?.stats?.outstandingDebt || 0, totalContracts.value, 1))

const revenueBarHeight = computed(() => (totalRevenue.value / maxFinancial.value) * 160)
const debtBarHeight = computed(() => ((data.value?.stats?.outstandingDebt || 0) / maxFinancial.value) * 160)
const contractsBarHeight = computed(() => (totalContracts.value / maxFinancial.value) * 160)

// Priority distribution for service requests
const priorityData = computed(() => {
  const reqs = data.value?.serviceRequests || data.value?.recentServiceRequests || []
  return [
    { label: 'Shoshilinch', count: reqs.filter((r: any) => r.priority === 'URGENT').length, dot: 'bg-red-500', text: 'text-red-400' },
    { label: 'Yuqori', count: reqs.filter((r: any) => r.priority === 'HIGH').length, dot: 'bg-orange-500', text: 'text-orange-400' },
    { label: 'O\'rta', count: reqs.filter((r: any) => r.priority === 'MEDIUM').length, dot: 'bg-amber-500', text: 'text-amber-400' },
    { label: 'Past', count: reqs.filter((r: any) => r.priority === 'LOW').length, dot: 'bg-ink-500', text: 'text-ink-400' },
  ]
})

const slaOverdueCount = computed(() => {
  const reqs = data.value?.serviceRequests || data.value?.recentServiceRequests || []
  return reqs.filter((r: any) => r.slaDueAt && new Date(r.slaDueAt) < new Date()).length
})
const slaWithinCount = computed(() => {
  const reqs = data.value?.serviceRequests || data.value?.recentServiceRequests || []
  return reqs.filter((r: any) => r.slaDueAt && new Date(r.slaDueAt) >= new Date()).length
})

function formatPrice(price: number, currency: string) {
  if (!price) return '0'
  const formatted = new Intl.NumberFormat('ru-RU').format(price)
  return currency === 'USD' ? `$${formatted}` : `${(formatted / 1000000).toFixed(1)}M`
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    NEW: 'badge-neutral', PENDING: 'badge-warning', BUILDING_REVIEW: 'badge-warning',
    FINANCE_REVIEW: 'badge-brand', OFFER_SENT: 'badge-brand',
    ERI_PENDING: 'badge-warning', APPROVED: 'badge-success',
    REJECTED: 'badge-danger', CANCELLED: 'badge-neutral',
  }
  return map[status] || 'badge-neutral'
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    NEW: 'Yangi', PENDING: 'Kutilmoqda', BUILDING_REVIEW: 'Bino ko\'rib',
    FINANCE_REVIEW: 'Moliya', OFFER_SENT: 'Taklif',
    ERI_PENDING: 'ERI', APPROVED: 'Tasdiqlandi',
    REJECTED: 'Rad', CANCELLED: 'Bekor',
  }
  return map[status] || status
}
</script>
