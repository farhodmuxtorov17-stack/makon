<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Shartnomalar</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ contracts.length }} shartnoma</p>
      </div>
      <button class="btn-primary btn-sm">+ Yangi shartnoma</button>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Faol"
        :value="contracts.filter((c) => c.status === 'ACTIVE').length"
        color="success"
        icon="M9 12l2 2 4-4"
      />
      <StatCard
        label="Imzolash kutilmoqda"
        :value="contracts.filter((c) => c.status === 'PENDING_SIGN').length"
        color="warning"
        icon="M12 8v4l3 3"
      />
      <StatCard
        label="Imzolangan"
        :value="contracts.filter((c) => c.status === 'SIGNED').length"
        color="info"
        icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      <StatCard
        label="Muddati o'tgan"
        :value="contracts.filter((c) => c.status === 'EXPIRED').length"
        color="neutral"
        icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Raqam</th>
              <th>Ijarachi</th>
              <th>Turi</th>
              <th>Boshlanish</th>
              <th>Tugash</th>
              <th>Oylik</th>
              <th>ERI</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in contracts" :key="c.id" class="cursor-pointer">
              <td class="font-mono text-xs font-medium">{{ c.number }}</td>
              <td class="font-medium text-neutral-900">{{ c.tenantName }}</td>
              <td>
                <span class="badge-neutral">{{ c.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</span>
              </td>
              <td class="text-neutral-500">{{ formatDate(c.startDate) }}</td>
              <td class="text-neutral-500">{{ formatDate(c.endDate) }}</td>
              <td class="font-mono">{{ formatNumber(c.monthlyRent) }}</td>
              <td>
                <span v-if="c.signedByErI" class="badge-success">✓ ERI</span><span v-else class="badge-neutral">—</span>
              </td>
              <td><StatusBadge :status="c.status" :dot="true" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFinanceStore } from '~/stores/finance'
import { formatNumber, formatDate } from '~/utils'
import StatCard from '~/components/ui/StatCard.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ middleware: 'auth' })
const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())
const contracts = computed(() => financeStore.contracts)
</script>
