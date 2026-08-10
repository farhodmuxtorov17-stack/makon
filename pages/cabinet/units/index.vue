<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-white">Mening unitlarim</h1>
      <p class="text-ink-400 text-sm mt-1">Ijara qilingan maydonlar</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="unit in myUnits" :key="unit.id" class="card p-5 card-hover">
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="text-white font-medium">{{ unit.unitNumber }}</h3>
            <p class="text-sm text-ink-500">{{ unit.buildingName }}</p>
          </div>
          <span class="badge" :class="unit.status === 'ACTIVE' ? 'badge-success' : 'badge-neutral'">{{ statusLabel(unit.status) }}</span>
        </div>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div><span class="text-ink-500">Maydon:</span> <span class="text-white">{{ unit.area }} m²</span></div>
          <div><span class="text-ink-500">Oylik:</span> <span class="text-white">{{ formatPriceShort(unit.monthlyRent) }}</span></div>
          <div><span class="text-ink-500">Shartnoma:</span> <span class="text-white">{{ unit.contractNumber }}</span></div>
          <div><span class="text-ink-500">Tugaydi:</span> <span class="text-ink-400">{{ formatDate(unit.endDate) }}</span></div>
        </div>
        <div class="flex gap-2 mt-4">
          <NuxtLink :to="'/finance/contracts/' + unit.contractId" class="btn btn-secondary btn-sm flex-1">Shartnoma</NuxtLink>
          <NuxtLink to="/cabinet/services" class="btn btn-secondary btn-sm flex-1">Servis</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { contracts, buildings } from '~/utils/mockData'

definePageMeta({ middleware: 'auth' })
const { formatPriceShort, formatDate } = useFormat()

const myUnits = [
  { id: 'cu1', unitNumber: 'A-5', buildingName: 'Tashkent City Tower', area: 120, monthlyRent: 18000000, contractNumber: 'CTR-2026-002', contractId: 'c2', status: 'ACTIVE', endDate: '2027-08-15' },
  { id: 'cu2', unitNumber: 'Startup-301', buildingName: 'IT Park Tashkent', area: 45, monthlyRent: 5400000, contractNumber: 'CTR-2026-001', contractId: 'c1', status: 'ACTIVE', endDate: '2027-02-10' },
]

function statusLabel(s: string) { return { ACTIVE: 'Faol', EXPIRED: 'Tugagan', PENDING: 'Kutilmoqda' }[s] || s }
</script>
