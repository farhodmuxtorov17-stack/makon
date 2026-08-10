<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Shartnomalar reyestri</h1>
        <p class="text-ink-500 text-sm mt-1">Ijara va sotuv shartnomalari · ERI imzo statuslari</p>
      </div>
      <NuxtLink to="/management/applications" class="btn btn-primary btn-sm">
        <Plus :size="14" /> Yangi shartnoma
      </NuxtLink>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><CheckCircle2 :size="16" class="text-emerald-500" /></div>
          <span class="text-xs text-ink-500">Aktiv</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ statusCounts.ACTIVE }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><Clock :size="16" class="text-amber-500" /></div>
          <span class="text-xs text-ink-500">Imzolanmoqda</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ statusCounts.PARTIALLY_SIGNED + statusCounts.DRAFT_READY }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"><AlertCircle :size="16" class="text-red-500" /></div>
          <span class="text-xs text-ink-500">Muddati o'tgan</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ statusCounts.EXPIRED }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><ShieldCheck :size="16" class="text-purple-500" /></div>
          <span class="text-xs text-ink-500">ERI imzolangan</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ eriSignedCount }}<span class="text-sm text-ink-500 font-normal">/{{ contracts.length }}</span></div>
      </div>
    </div>

    <!-- Search & filters -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-2 flex-1">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input v-model="search" type="text" placeholder="Nomer, ijachi yoki STIR..." class="w-full text-sm border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
        </div>
        <select v-model="statusFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
          <option value="">Barcha statuslar</option>
          <option value="ACTIVE">Aktiv</option>
          <option value="PARTIALLY_SIGNED">Qisman imzolangan</option>
          <option value="DRAFT_READY">Qoralama tayyor</option>
          <option value="EXPIRED">Muddati o'tgan</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-4 py-3">Nomer</th>
              <th class="text-left font-medium px-4 py-3">Ijarachi</th>
              <th class="text-left font-medium px-4 py-3 hidden md:table-cell">Bino / Unit</th>
              <th class="text-right font-medium px-4 py-3">Oylik ijara</th>
              <th class="text-center font-medium px-4 py-3 hidden lg:table-cell">Davr</th>
              <th class="text-center font-medium px-4 py-3">ERI</th>
              <th class="text-center font-medium px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in filteredContracts" :key="c.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer" @click="navigateTo(`/contracts/${c.id}`)">
              <td class="px-4 py-3 font-mono font-bold text-xs text-ink-900 dark:text-white">{{ c.number }}</td>
              <td class="px-4 py-3">
                <div class="font-medium text-ink-900 dark:text-white text-sm">{{ c.tenantName }}</div>
                <div class="text-xs text-ink-500 font-mono">STIR: {{ c.tenantTin }}</div>
              </td>
              <td class="px-4 py-3 hidden md:table-cell">
                <div class="text-sm text-ink-900 dark:text-white">{{ c.buildingName }}</div>
                <div class="text-xs text-brand-500 font-mono">{{ c.unitNumber }}</div>
              </td>
              <td class="px-4 py-3 text-right font-bold text-brand-500">{{ formatMoney(c.monthlyRent) }}</td>
              <td class="px-4 py-3 text-center hidden lg:table-cell text-xs text-ink-500 font-mono">
                {{ c.startDate }} — {{ c.endDate }}
              </td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center gap-1">
                  <span class="eri-badge" :class="c.eriTenantSigned ? 'eri-badge--signed' : 'eri-badge--pending'" title="Ijarachi imzosi">T</span>
                  <span class="eri-badge" :class="c.eriLandlordSigned ? 'eri-badge--signed' : 'eri-badge--pending'" title="Bino egasi imzosi">L</span>
                </div>
              </td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-xs" :class="contractBadge(c.status)">{{ contractLabel(c.status) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="filteredContracts.length === 0" class="py-12 text-center">
        <SearchX :size="32" class="text-ink-300 mx-auto mb-2" />
        <p class="text-ink-500 text-sm">Shartnomalar topilmadi</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, CheckCircle2, Clock, AlertCircle, ShieldCheck, SearchX } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const search = ref('')
const statusFilter = ref('')

interface Contract {
  id: string; number: string; tenantName: string; tenantTin: string;
  buildingName: string; unitNumber: string; monthlyRent: number;
  startDate: string; endDate: string; status: string;
  eriTenantSigned: boolean; eriLandlordSigned: boolean;
}

const contracts: Contract[] = [
  { id: 'c1', number: 'CTR-2026-001', tenantName: 'ABC Logistics MChJ', tenantTin: '308745612', buildingName: 'Tashkent City', unitNumber: 'A-301', monthlyRent: 25000000, startDate: '01 Apr 2026', endDate: '15 Mar 2027', status: 'ACTIVE', eriTenantSigned: true, eriLandlordSigned: true },
  { id: 'c2', number: 'CTR-2026-002', tenantName: 'Global Trade MChJ', tenantTin: '305487291', buildingName: 'Tashkent City', unitNumber: 'B-501', monthlyRent: 35000000, startDate: '15 May 2026', endDate: '14 May 2027', status: 'ACTIVE', eriTenantSigned: true, eriLandlordSigned: true },
  { id: 'c3', number: 'CTR-2026-005', tenantName: 'Smart Solutions MChJ', tenantTin: '309215648', buildingName: 'IT Park', unitNumber: 'C-201', monthlyRent: 18000000, startDate: '01 Jun 2026', endDate: '31 May 2027', status: 'ACTIVE', eriTenantSigned: true, eriLandlordSigned: true },
  { id: 'c4', number: 'CTR-2026-008', tenantName: 'Export Group MChJ', tenantTin: '304561287', buildingName: 'Piramit', unitNumber: 'D-102', monthlyRent: 22000000, startDate: '01 Aug 2026', endDate: '31 Iyl 2027', status: 'PARTIALLY_SIGNED', eriTenantSigned: true, eriLandlordSigned: false },
  { id: 'c5', number: 'CTR-2026-009', tenantName: 'Mega Group MChJ', tenantTin: '307819234', buildingName: 'Trillant Tower', unitNumber: 'B-302', monthlyRent: 32000000, startDate: '15 Aug 2026', endDate: '14 Aug 2027', status: 'DRAFT_READY', eriTenantSigned: false, eriLandlordSigned: false },
  { id: 'c6', number: 'CTR-2025-098', tenantName: 'Logistics Plus', tenantTin: '302345678', buildingName: 'Tashkent City', unitNumber: 'A-205', monthlyRent: 15000000, startDate: '01 Sep 2025', endDate: '31 Avg 2026', status: 'EXPIRED', eriTenantSigned: true, eriLandlordSigned: true },
  { id: 'c7', number: 'CTR-2026-010', tenantName: 'Tech Hub MChJ', tenantTin: '306782345', buildingName: 'IT Park', unitNumber: 'C-205', monthlyRent: 28000000, startDate: '01 Sep 2026', endDate: '31 Avg 2027', status: 'PARTIALLY_SIGNED', eriTenantSigned: false, eriLandlordSigned: true },
]

const statusCounts = computed(() => ({
  ACTIVE: contracts.filter(c => c.status === 'ACTIVE').length,
  PARTIALLY_SIGNED: contracts.filter(c => c.status === 'PARTIALLY_SIGNED').length,
  DRAFT_READY: contracts.filter(c => c.status === 'DRAFT_READY').length,
  EXPIRED: contracts.filter(c => c.status === 'EXPIRED').length,
}))

const eriSignedCount = computed(() => contracts.filter(c => c.eriTenantSigned && c.eriLandlordSigned).length)

const filteredContracts = computed(() => {
  let result = [...contracts]
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(c => c.number.toLowerCase().includes(q) || c.tenantName.toLowerCase().includes(q) || c.tenantTin.includes(q))
  }
  if (statusFilter.value) result = result.filter(c => c.status === statusFilter.value)
  return result
})

function formatMoney(v: number) {
  return (v / 1_000_000).toFixed(1) + 'M'
}

function contractBadge(status: string) {
  return { ACTIVE: 'badge-success', PARTIALLY_SIGNED: 'badge-warning', DRAFT_READY: 'badge-brand', EXPIRED: 'badge-neutral' }[status] || 'badge-neutral'
}

function contractLabel(status: string) {
  return { ACTIVE: 'Aktiv', PARTIALLY_SIGNED: 'Qisman imzo', DRAFT_READY: 'Qoralama', EXPIRED: 'Muddati o\'tgan' }[status] || status
}
</script>

<style scoped>
.eri-badge {
  width: 22px; height: 22px; border-radius: 5px;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700;
}
.eri-badge--signed {
  background: rgba(16,185,129,0.1); color: #10b981;
  border: 1px solid rgba(16,185,129,0.2);
}
.eri-badge--pending {
  background: rgba(245,158,11,0.1); color: #f59e0b;
  border: 1px solid rgba(245,158,11,0.2);
}
</style>
