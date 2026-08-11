<template>
  <div class="space-y-5">
    <!-- Welcome header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-brand-500/30">A</div>
        <div>
          <h1 class="text-2xl font-bold text-ink-900 dark:text-white">{{ org.name }}</h1>
          <p class="text-ink-500 text-sm mt-0.5">STIR: {{ org.tin }} · {{ units.length }} ta unit · {{ activeContracts }} ta faol shartnoma</p>
        </div>
      </div>
      <NuxtLink to="/catalog" class="btn btn-primary btn-sm btn-glow">
        <Plus :size="14" /> Yangi ariza
      </NuxtLink>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KpiCard :icon="Layers" label="Mening unitlarim" :value="units.length" icon-color="var(--accent)" icon-bg="rgba(37,99,235,0.1)" to="/cabinet/units" scene="units" />
      <KpiCard :icon="CheckCircle2" label="Faol shartnomalar" :value="activeContracts" icon-color="#10b981" icon-bg="rgba(16,185,129,0.1)" to="/cabinet/contracts" scene="contract" />
      <KpiCard :icon="FileText" label="Kutilayotgan arizalar" :value="pendingApps" icon-color="var(--accent)" icon-bg="rgba(37,99,235,0.1)" to="/cabinet/applications" scene="applications" />
      <KpiCard :icon="Wallet" label="Qarzdorlik" :value="formatUZSShort(debt)" icon-color="#ef4444" icon-bg="rgba(239,68,68,0.1)" to="/finance/debts" scene="debt" />
    </div>

    <!-- Two columns: chart + notifications -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Payment history chart -->
      <div class="card p-5 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-ink-900 dark:text-white">To'lovlar tarixi</h3>
          <span class="text-xs text-ink-500">So'nggi 6 oy</span>
        </div>
        <MakonChart type="bar" :series="paymentSeries" :categories="months" :height="200" :colors="['#10b981', '#ef4444']" :stacked="true" />
      </div>

      <!-- Recent notifications -->
      <div class="card-premium p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-ink-900 dark:text-white">Bildirishnomalar</h3>
          <NuxtLink to="/notifications" class="text-xs text-brand-500">Barchasi →</NuxtLink>
        </div>
        <div class="space-y-2">
          <div v-for="n in notifications" :key="n.id" class="flex items-center gap-3 p-2.5 rounded-xl transition-colors" :class="!n.read ? 'bg-brand-500/5' : ''">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :class="n.iconBg">
              <component :is="n.icon" :size="15" :class="n.iconColor" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium truncate" :class="!n.read ? 'text-ink-900 dark:text-white' : 'text-ink-500'">{{ n.title }}</div>
              <div class="text-xs text-ink-400">{{ n.time }}</div>
            </div>
            <span v-if="!n.read" class="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- My Units -->
    <div class="card-premium p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">Mening unitlarim</h3>
        <NuxtLink to="/cabinet/units" class="text-xs text-brand-500">Barchasini ko'rish →</NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="unit in units" :key="unit.id" class="unit-card">
          <div class="unit-card__header">
            <div>
              <div class="font-semibold text-sm text-ink-900 dark:text-white">{{ unit.name }}</div>
              <div class="text-xs text-ink-500">{{ unit.building }} · {{ unit.floor }}-qavat</div>
            </div>
            <span class="badge text-[10px]" :class="unit.type === 'RENT' ? 'badge-brand' : 'badge-success'">{{ unit.type === 'RENT' ? 'Ijara' : 'Mulk' }}</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs mt-3">
            <div><span class="text-ink-500">Maydon:</span> <span class="font-medium text-ink-900 dark:text-white">{{ unit.area }} m²</span></div>
            <div><span class="text-ink-500">Shartnoma:</span> <span class="font-medium text-ink-900 dark:text-white">{{ unit.contractEnd }}</span></div>
          </div>
          <div class="mt-3 flex gap-2">
            <NuxtLink to="/cabinet/units" class="btn btn-secondary btn-sm flex-1 text-xs">Tafsilot</NuxtLink>
            <NuxtLink to="/cabinet/services" class="btn btn-ghost btn-sm flex-1 text-xs">Hisob</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent applications + Service requests -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card-premium p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-ink-900 dark:text-white">So'nggi arizalar</h3>
          <NuxtLink to="/cabinet/applications" class="text-xs text-brand-500">Barchasi →</NuxtLink>
        </div>
        <div class="space-y-2">
          <div v-for="app in applications" :key="app.id" class="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-bold" :class="appStatusClass(app.status)">
              {{ app.number.slice(-3) }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-ink-900 dark:text-white truncate">{{ app.number }}</div>
              <div class="text-xs text-ink-500">{{ app.unit }} · {{ formatUZSShort(app.price) }} UZS</div>
            </div>
            <span class="badge text-[10px] flex-shrink-0" :class="appStatusBadge(app.status)">{{ appStatusLabel(app.status) }}</span>
          </div>
        </div>
      </div>

      <div class="card-premium p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-ink-900 dark:text-white">Servis so'rovlari</h3>
          <NuxtLink to="/cabinet/service-requests/new" class="btn btn-secondary btn-sm text-xs">
            <Plus :size="12" /> Yangi
          </NuxtLink>
        </div>
        <div class="space-y-2">
          <div v-for="sr in serviceRequests" :key="sr.id" class="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <div class="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <Wrench :size="16" class="text-amber-500" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-ink-900 dark:text-white truncate">{{ sr.category }}</div>
              <div class="text-xs text-ink-500">{{ sr.unit }} · {{ sr.date }}</div>
            </div>
            <span class="badge text-[10px] flex-shrink-0" :class="srBadgeClass(sr.status)">{{ srStatusLabel(sr.status) }}</span>
          </div>
          <div v-if="serviceRequests.length === 0" class="text-center py-8 text-ink-500 text-sm">
            Ochiq so'rovlar yo'q
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KpiScene3D from '~/components/KpiScene3D.vue'
import KpiCard from '~/components/KpiCard.vue'
import { Plus, Layers, ScrollText, FileText, Wallet, Wrench, Receipt, AlertCircle, CheckCircle2 } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const org = { name: 'ABC Logistics MChJ', tin: '308745612' }

const units = ref([
  { id: 'u1', name: 'A-301', building: 'Tashkent City', floor: 3, area: 85, type: 'RENT', contractEnd: '15 Mar 2027' },
  { id: 'u2', name: 'B-205', building: 'Trillant Tower', floor: 2, area: 120, type: 'RENT', contractEnd: '01 Dek 2026' },
  { id: 'u3', name: 'C-101', building: 'IT Park', floor: 1, area: 45, type: 'OWNED', contractEnd: '—' },
])

const applications = ref([
  { id: 'a1', number: 'APP-2026-001', unit: 'A-301 Tashkent City', price: 25000000, status: 'FINANCE_REVIEW' },
  { id: 'a2', number: 'APP-2026-002', unit: 'D-401 Piramit', price: 850000000, status: 'SIGNED' },
  { id: 'a3', number: 'APP-2026-003', unit: 'E-102 Trillant', price: 18000000, status: 'SUBMITTED' },
])

const serviceRequests = ref([
  { id: 'sr1', category: 'Elektr ta\'miri', unit: 'A-301', date: '2 kun oldin', status: 'IN_PROGRESS' },
  { id: 'sr2', category: 'Sanitariya', unit: 'B-205', date: '5 kun oldin', status: 'ASSIGNED' },
])

const notifications = ref([
  { id: 'n1', title: 'Invoys INV-2026-001 tasdiqlandi', time: '1 soat oldin', read: false, icon: Receipt, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-500' },
  { id: 'n2', title: 'Shartnoma CTR-2026-002 imzolash kutilmoqda', time: '3 soat oldin', read: false, icon: AlertCircle, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-500' },
  { id: 'n3', title: 'Servis so\'rov SR-004 qabul qilindi', time: '1 kun oldin', read: true, icon: CheckCircle2, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-500' },
  { id: 'n4', title: 'Hisoblagich ko\'rsatkichi eslatmasi', time: '2 kun oldin', read: true, icon: AlertCircle, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-500' },
])

const months = ['Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg']
const paymentSeries = [
  { name: 'To\'langan', data: [22, 25, 25, 28, 25, 22.5] },
  { name: 'Qoldiq', data: [3, 0, 0, 0, 2.5, 4.2] },
]

const activeContracts = computed(() => units.value.filter(u => u.type === 'RENT').length)
const pendingApps = computed(() => applications.value.filter(a => !['SIGNED', 'ACTIVE', 'REJECTED'].includes(a.status)).length)
const debt = computed(() => 4200000)



function appStatusLabel(s: string) {
  return { SUBMITTED: 'Yuborilgan', OPERATION_REVIEW: 'Operatsion', FINANCE_REVIEW: 'Moliyaviy', SIGNED: 'Imzolangan', ACTIVE: 'Faol', REJECTED: 'Rad etilgan' }[s] || s
}
function appStatusBadge(s: string) {
  return { SUBMITTED: 'badge-neutral', OPERATION_REVIEW: 'badge-brand', FINANCE_REVIEW: 'badge-brand', SIGNED: 'badge-success', ACTIVE: 'badge-success', REJECTED: 'badge-danger' }[s] || 'badge-neutral'
}
function appStatusClass(s: string) {
  return { SUBMITTED: 'bg-ink-500/10 text-ink-500', OPERATION_REVIEW: 'bg-brand-500/10 text-brand-500', FINANCE_REVIEW: 'bg-brand-500/10 text-brand-500', SIGNED: 'bg-emerald-500/10 text-emerald-500', ACTIVE: 'bg-emerald-500/10 text-emerald-500', REJECTED: 'bg-red-500/10 text-red-500' }[s] || 'bg-ink-500/10 text-ink-500'
}
function srBadgeClass(s: string) {
  return { ASSIGNED: 'badge-brand', IN_PROGRESS: 'badge-warning', DONE: 'badge-success' }[s] || 'badge-neutral'
}
function srStatusLabel(s: string) {
  return { ASSIGNED: 'Tayinlandi', IN_PROGRESS: 'Ishda', DONE: 'Yakunlandi' }[s] || s
}
</script>

<style scoped>
.unit-card {
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.06);
  background: #ffffff;
  transition: all 0.15s;
}
.dark .unit-card {
  background: rgba(255,255,255,0.02);
  border-color: rgba(255,255,255,0.06);
}
.unit-card:hover {
  border-color: rgba(37,99,235,0.2);
  box-shadow: none;
}
.unit-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
