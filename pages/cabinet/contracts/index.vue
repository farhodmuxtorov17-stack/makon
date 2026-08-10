<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink to="/cabinet" class="btn btn-ghost btn-sm"><ArrowLeft :size="16" /> Mening kabinetim</NuxtLink>
    </div>

    <div>
      <h1 class="text-2xl font-bold">Mening shartnomalarim</h1>
      <p class="text-ink-500 text-sm mt-1">Faol va tugagan shartnomalar</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card p-4 text-center">
        <FileCheck2 :size="20" class="mx-auto text-emerald-500 mb-2" />
        <div class="text-2xl font-bold">{{ activeContracts.length }}</div>
        <div class="text-xs text-ink-500">Faol</div>
      </div>
      <div class="card p-4 text-center">
        <Clock :size="20" class="mx-auto text-amber-500 mb-2" />
        <div class="text-2xl font-bold">{{ pendingContracts.length }}</div>
        <div class="text-xs text-ink-500">Imzolanmoqda</div>
      </div>
      <div class="card p-4 text-center">
        <CheckCircle2 :size="20" class="mx-auto text-brand-500 mb-2" />
        <div class="text-2xl font-bold">{{ formatPrice(totalMonthly) }}</div>
        <div class="text-xs text-ink-500">Oylik ijara</div>
      </div>
      <div class="card p-4 text-center">
        <CalendarClock :size="20" class="mx-auto text-red-500 mb-2" />
        <div class="text-2xl font-bold">{{ expiringSoon }}</div>
        <div class="text-xs text-ink-500">30 kun muddat</div>
      </div>
    </div>

    <!-- Contract list -->
    <div class="space-y-4">
      <div v-for="c in contracts" :key="c.id" class="card p-5 space-y-4">
        <div class="flex items-start justify-between flex-wrap gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="statusBg(c.status)">
              <ScrollText :size="22" :class="statusText(c.status)" />
            </div>
            <div>
              <div class="font-semibold">{{ c.number }}</div>
              <div class="text-xs text-ink-500">{{ c.unitName }} · {{ c.buildingName }}</div>
            </div>
          </div>
          <span class="badge" :class="statusBadge(c.status)">{{ statusLabel(c.status) }}</span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <div class="text-xs text-ink-500">Boshlanish</div>
            <div class="font-medium mt-0.5">{{ formatDate(c.startDate) }}</div>
          </div>
          <div>
            <div class="text-xs text-ink-500">Tugash</div>
            <div class="font-medium mt-0.5">{{ formatDate(c.endDate) }}</div>
          </div>
          <div>
            <div class="text-xs text-ink-500">Oylik ijara</div>
            <div class="font-medium mt-0.5">{{ formatPrice(c.monthlyRent) }}</div>
          </div>
          <div>
            <div class="text-xs text-ink-500">Depozit</div>
            <div class="font-medium mt-0.5">{{ formatPrice(c.deposit) }}</div>
          </div>
        </div>

        <!-- Progress bar -->
        <div v-if="c.status === 'ACTIVE'">
          <div class="flex items-center justify-between text-xs text-ink-500 mb-1">
            <span>Muddat: {{ daysRemaining(c) }} kun qoldi</span>
            <span>{{ progressPercent(c) }}%</span>
          </div>
          <div class="h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
            <div class="h-full rounded-full transition-all" :class="progressColor(c)" :style="{ width: progressPercent(c) + '%' }"></div>
          </div>
        </div>

        <!-- ERI status -->
        <div v-if="c.eriStatus" class="flex items-center gap-2 text-xs">
          <ShieldCheck :size="14" :class="c.eriStatus === 'SIGNED' ? 'text-emerald-500' : 'text-amber-500'" />
          <span :class="c.eriStatus === 'SIGNED' ? 'text-emerald-500' : 'text-amber-500'">
            {{ c.eriStatus === 'SIGNED' ? 'ERI imzolangan' : 'ERI imzo kutilmoqda' }}
          </span>
          <span class="text-ink-500">· {{ c.eriId }}</span>
        </div>

        <!-- Actions -->
        <div class="flex gap-2 flex-wrap">
          <NuxtLink :to="`/contracts/${c.id}`" class="btn btn-secondary btn-sm"><Eye :size="14" /> Tafsilot</NuxtLink>
          <button v-if="c.status === 'PENDING_SIGNATURE'" @click="signERI(c)" class="btn btn-primary btn-sm"><PenLine :size="14" /> ERI imzolash</button>
          <button v-if="c.status === 'ACTIVE'" class="btn btn-ghost btn-sm"><Download :size="14" /> PDF yuklab olish</button>
          <button v-if="c.status === 'EXPIRED'" class="btn btn-ghost btn-sm"><RefreshCw :size="14" /> Uzaytirish</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, FileCheck2, Clock, CheckCircle2, CalendarClock, ScrollText, ShieldCheck, Eye, PenLine, Download, RefreshCw } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const contracts = ref([
  {
    id: 'c1', number: 'CTR-2026-001', unitName: 'A-301', buildingName: 'Tashkent City',
    status: 'ACTIVE', type: 'RENT', startDate: '2026-03-15', endDate: '2027-03-15',
    monthlyRent: 25000000, deposit: 50000000, currency: 'UZS',
    eriStatus: 'SIGNED', eriId: 'ERI-2026-001',
  },
  {
    id: 'c2', number: 'CTR-2026-005', unitName: 'B-501', buildingName: 'Trillent Tower',
    status: 'PENDING_SIGNATURE', type: 'RENT', startDate: '2026-08-15', endDate: '2027-08-15',
    monthlyRent: 18000000, deposit: 36000000, currency: 'UZS',
    eriStatus: 'PENDING', eriId: 'ERI-2026-005',
  },
  {
    id: 'c3', number: 'CTR-2025-098', unitName: 'B-303', buildingName: 'Tashkent City',
    status: 'ACTIVE', type: 'RENT', startDate: '2025-01-01', endDate: '2026-01-01',
    monthlyRent: 22000000, deposit: 44000000, currency: 'UZS',
    eriStatus: 'SIGNED', eriId: 'ERI-2025-098',
  },
  {
    id: 'c4', number: 'CTR-2024-045', unitName: 'C-201', buildingName: 'IT Park',
    status: 'EXPIRED', type: 'RENT', startDate: '2024-06-01', endDate: '2026-06-01',
    monthlyRent: 15000000, deposit: 30000000, currency: 'UZS',
    eriStatus: 'SIGNED', eriId: 'ERI-2024-045',
  },
])

const activeContracts = computed(() => contracts.value.filter(c => c.status === 'ACTIVE'))
const pendingContracts = computed(() => contracts.value.filter(c => c.status === 'PENDING_SIGNATURE'))
const totalMonthly = computed(() => activeContracts.value.reduce((s, c) => s + c.monthlyRent, 0))
const expiringSoon = computed(() => contracts.value.filter(c => {
  if (c.status !== 'ACTIVE') return false
  const days = (new Date(c.endDate).getTime() - Date.now()) / 86400000
  return days <= 30 && days > 0
}).length)

function statusBadge(s: string) {
  return { ACTIVE: 'badge-success', PENDING_SIGNATURE: 'badge-warning', EXPIRED: 'badge-neutral', CANCELLED: 'badge-danger' }[s] || 'badge-neutral'
}
function statusLabel(s: string) {
  return { ACTIVE: 'Faol', PENDING_SIGNATURE: 'Imzolanmoqda', EXPIRED: 'Tugagan', CANCELLED: 'Bekor qilingan' }[s] || s
}
function statusBg(s: string) {
  return { ACTIVE: 'bg-emerald-500/10', PENDING_SIGNATURE: 'bg-amber-500/10', EXPIRED: 'bg-zinc-500/10', CANCELLED: 'bg-red-500/10' }[s] || 'bg-zinc-500/10'
}
function statusText(s: string) {
  return { ACTIVE: 'text-emerald-500', PENDING_SIGNATURE: 'text-amber-500', EXPIRED: 'text-zinc-500', CANCELLED: 'text-red-500' }[s] || 'text-zinc-500'
}
function daysRemaining(c: any) {
  return Math.max(0, Math.floor((new Date(c.endDate).getTime() - Date.now()) / 86400000))
}
function progressPercent(c: any) {
  const total = new Date(c.endDate).getTime() - new Date(c.startDate).getTime()
  const elapsed = Date.now() - new Date(c.startDate).getTime()
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)))
}
function progressColor(c: any) {
  const pct = progressPercent(c)
  return pct > 90 ? 'bg-red-500' : pct > 70 ? 'bg-amber-500' : 'bg-emerald-500'
}
function formatDate(d: string) { return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }) }
function formatPrice(p: number) { return (p / 1000000).toFixed(1) + 'M so\'m' }

function signERI(c: any) {
  c.eriStatus = 'SIGNED'
  c.status = 'ACTIVE'
}
</script>
