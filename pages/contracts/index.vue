<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between mb-6">
      <div class="eyebrow">CABINET / CONTRACTS</div>
      <h1 class="page-title">Shartnomalar</h1>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div class="kpi-strip kpi-strip--emerald">
        <div class="kpi-strip__icon"><CheckCircle :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ statusCounts.ACTIVE }}</div>
          <div class="kpi-strip__label">Faol</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--amber">
        <div class="kpi-strip__icon"><PenTool :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ statusCounts.PARTIALLY_SIGNED + statusCounts.DRAFT_READY }}</div>
          <div class="kpi-strip__label">Imzolanmoqda</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--blue">
        <div class="kpi-strip__icon"><AlertCircle :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ statusCounts.EXPIRED }}</div>
          <div class="kpi-strip__label">Muddati o'tgan</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--teal">
        <div class="kpi-strip__icon"><FileSignature :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ eriSignedCount }}</div>
          <div class="kpi-strip__label">Imzolangan</div>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="flex gap-3 mb-4">
      <input v-model="search" placeholder="Nomer, ijarachi..." class="input flex-1" />
      <select v-model="statusFilter" class="input max-w-[200px]">
        <option value="">Barcha status</option>
        <option value="ACTIVE">Faol</option>
        <option value="PARTIALLY_SIGNED">Qisman imzo</option>
        <option value="DRAFT_READY">Qoralama</option>
        <option value="EXPIRED">Muddati o'tgan</option>
      </select>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Nomer</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Ijarachi</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Ijara/oy</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Muddat</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">ERI</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in filteredContracts" :key="c.id" class="border-b border-ink-50 dark:border-white/5 hover:bg-ink-50 dark:hover:bg-white/5 cursor-pointer" @click="navigateTo(`/contracts/${c.id}`)">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ c.number }}</td>
            <td class="px-4 py-3 text-sm text-ink-600 dark:text-ink-300">{{ c.tenantName }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ c.buildingName }} · {{ c.unitNumber }}</td>
            <td class="px-4 py-3 text-right text-sm font-medium text-ink-900 dark:text-white">{{ c.monthlyRent.toLocaleString('ru-RU') }} {{ c.currency }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ c.startDate }} → {{ c.endDate }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="statusClass(c.status)">{{ statusLabel(c.status) }}</span>
            </td>
            <td class="px-4 py-3 text-right">
              <span v-if="c.eriTenantSigned && c.eriLandlordSigned" class="text-xs text-emerald-500">✓ Ikkala</span>
              <span v-else-if="c.eriTenantSigned || c.eriLandlordSigned" class="text-xs text-amber-500">⚠ Bitta</span>
              <span v-else class="text-xs text-ink-400">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle, CheckCircle, FileSignature, PenTool } from 'lucide-vue-next'
definePageMeta({ layout: 'admin', middleware: 'auth' })

const store = useMakonStore()

const search = ref('')
const statusFilter = ref('')

const contracts = computed(() => store.contracts)

const statusCounts = computed(() => ({
  ACTIVE: contracts.value.filter(c => c.status === 'ACTIVE').length,
  PARTIALLY_SIGNED: contracts.value.filter(c => c.status === 'PARTIALLY_SIGNED').length,
  DRAFT_READY: contracts.value.filter(c => c.status === 'DRAFT_READY').length,
  EXPIRED: contracts.value.filter(c => c.status === 'EXPIRED').length,
}))

const eriSignedCount = computed(() => contracts.value.filter(c => c.eriTenantSigned && c.eriLandlordSigned).length)

const filteredContracts = computed(() => {
  let result = [...contracts.value]
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(c => c.number.toLowerCase().includes(q) || c.tenantName.toLowerCase().includes(q) || c.tenantTin.includes(q))
  }
  if (statusFilter.value) result = result.filter(c => c.status === statusFilter.value)
  return result
})

function statusLabel(s: string) {
  return { ACTIVE: 'Faol', PARTIALLY_SIGNED: 'Qisman imzo', DRAFT_READY: 'Qoralama', DRAFT: 'Qoralama', SIGNED: 'Imzolangan', EXPIRED: 'Muddati o\'tgan', TERMINATED: 'Bekor qilingan' }[s] || s
}
function statusClass(s: string) {
  return { ACTIVE: 'bg-emerald-500/10 text-emerald-500', PARTIALLY_SIGNED: 'bg-amber-500/10 text-amber-500', DRAFT_READY: 'bg-blue-500/10 text-blue-500', DRAFT: 'bg-blue-500/10 text-blue-500', SIGNED: 'bg-emerald-500/10 text-emerald-500', EXPIRED: 'bg-red-500/10 text-red-500', TERMINATED: 'bg-red-500/10 text-red-500' }[s] || ''
}

</script>

<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--card-bg, rgba(255,255,255,0.9));
  border: 1px solid rgba(0,0,0,0.06);
  position: relative; overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.kpi-strip:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--blue::before { background: #3b82f6; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); }
.kpi-strip--blue .kpi-strip__icon { background: rgba(59,130,246,0.1); }
.kpi-strip__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip__body { flex: 1; min-width: 0; }
.kpi-strip__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.kpi-strip__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }
</style>
