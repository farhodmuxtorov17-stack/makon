<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4 mb-6">
      <div>
        <div class="eyebrow">Shartnomalar</div>
        <h1 class="page-title">Shartnomalar</h1>
        <p class="page-sub">Barcha shartnomalar va imzolash holati</p>
      </div>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 stagger">
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ statusCounts.ACTIVE }}</div>
          <div class="dash-kpi__label">Faol</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><PenTool :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ statusCounts.PARTIALLY_SIGNED + statusCounts.DRAFT_READY }}</div>
          <div class="dash-kpi__label">Imzolanmoqda</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><AlertCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ statusCounts.EXPIRED }}</div>
          <div class="dash-kpi__label">Muddati o'tgan</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileSignature :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ eriSignedCount }}</div>
          <div class="dash-kpi__label">Imzolangan</div>
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
        <option value="TERMINATED">Bekor qilingan</option>
      </select>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 ">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Nomer</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Ijarachi</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Ijara/oy</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Muddat</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Raqamli imzo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in filteredContracts" :key="c.id" class="border-b border-ink-50  hover:bg-ink-50  cursor-pointer" @click="navigateTo(`/contracts/${c.id}`)">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 ">{{ c.number }}</td>
            <td class="px-4 py-3 text-sm text-ink-600 ">{{ c.tenantName }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ c.buildingName }} · {{ c.unitNumber }}</td>
            <td class="px-4 py-3 text-right text-sm font-medium text-ink-900 ">{{ c.monthlyRent.toLocaleString('ru-RU') }} {{ c.currency }}</td>
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
definePageMeta({ roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT'],  layout: 'admin', middleware: 'role' })

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


