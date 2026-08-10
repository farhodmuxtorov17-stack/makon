<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Shartnomalar</h1>
        <p class="text-ink-500 text-sm mt-0.5">Barcha ijara va sotuv shartnomalari</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" />
        Yangi shartnoma
      </button>
    </div>

    <!-- Filter tabs -->
    <div class="flex gap-2 flex-wrap">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
        :class="activeTab === tab.id ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'">
        {{ tab.label }}
        <span class="ml-1.5 text-xs opacity-60">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Nomer</th>
              <th>Ijarachi</th>
              <th>Turi</th>
              <th>Oylik to'lov</th>
              <th>Muddat</th>
              <th>ERI</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in filteredContracts" :key="c.id">
              <td class="font-mono font-semibold text-ink-900">{{ c.number }}</td>
              <td>{{ c.tenantName }}</td>
              <td>
                <span class="badge badge-neutral">{{ c.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</span>
              </td>
              <td class="font-semibold">{{ formatPrice(c.monthlyRent) }}</td>
              <td class="text-ink-500 text-sm">{{ c.startDate }} → {{ c.endDate }}</td>
              <td>
                <CheckCircle2 v-if="c.signedByErI" :size="18" class="text-emerald-500" />
                <Clock v-else :size="18" class="text-ink-300" />
              </td>
              <td>
                <span class="badge" :class="contractStatusClass(c.status)">{{ contractStatusLabel(c.status) }}</span>
              </td>
              <td>
                <button class="btn-ghost btn-icon btn-sm"><MoreHorizontal :size="16" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, CheckCircle2, Clock, MoreHorizontal } from 'lucide-vue-next'
import type { ContractStatus } from '~/types'

const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

const activeTab = ref('all')

const tabs = computed(() => [
  { id: 'all', label: 'Hammasi', count: financeStore.contracts.length },
  { id: 'ACTIVE', label: 'Aktiv', count: financeStore.contracts.filter(c => c.status === 'ACTIVE').length },
  { id: 'PENDING_SIGN', label: "Imzolanmagan", count: financeStore.contracts.filter(c => c.status === 'PENDING_SIGN').length },
  { id: 'SIGNED', label: 'Imzolangan', count: financeStore.contracts.filter(c => c.status === 'SIGNED').length },
  { id: 'EXPIRED', label: 'Muddati o\'tgan', count: financeStore.contracts.filter(c => c.status === 'EXPIRED').length },
])

const filteredContracts = computed(() => {
  if (activeTab.value === 'all') return financeStore.contracts
  return financeStore.contracts.filter(c => c.status === activeTab.value)
})

function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  return v.toLocaleString('ru')
}

function contractStatusLabel(s: ContractStatus): string {
  const m: Record<string, string> = {
    ACTIVE: 'Aktiv', PENDING_SIGN: 'Imzolanmagan', SIGNED: 'Imzolangan',
    EXPIRED: 'Muddati o\'tgan', DRAFT: 'Qoralama', TERMINATED: 'Bekor qilingan',
  }
  return m[s] || s
}

function contractStatusClass(s: ContractStatus): string {
  const m: Record<string, string> = {
    ACTIVE: 'badge-success', PENDING_SIGN: 'badge-warning',
    SIGNED: 'badge-info', EXPIRED: 'badge-neutral',
    DRAFT: 'badge-neutral', TERMINATED: 'badge-danger',
  }
  return m[s] || 'badge-neutral'
}
</script>
