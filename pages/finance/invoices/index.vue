<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Invoyslar</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ invoices.length }} invoys</p>
      </div>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="To'langan"
        :value="invoices.filter((i) => i.status === 'PAID').length"
        color="success"
        icon="M5 13l4 4L19 7"
      />
      <StatCard
        label="Kutilmoqda"
        :value="invoices.filter((i) => i.status === 'PENDING').length"
        color="warning"
        icon="M12 8v4l3 3"
      />
      <StatCard
        label="Qisman"
        :value="invoices.filter((i) => i.status === 'PARTIAL').length"
        color="info"
        icon="M9 12h6"
      />
      <StatCard
        label="Muddati o'tgan"
        :value="invoices.filter((i) => i.status === 'OVERDUE').length"
        color="danger"
        icon="M12 9v2m0 4h.01"
      />
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Raqam</th>
              <th>Shartnoma</th>
              <th>Davr</th>
              <th>Summa</th>
              <th>To'langan</th>
              <th>Muddat</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in invoices" :key="inv.id">
              <td class="font-mono text-xs font-medium">{{ inv.number }}</td>
              <td class="text-neutral-500">{{ inv.contractId }}</td>
              <td class="text-neutral-500">{{ inv.period }}</td>
              <td class="font-mono">{{ formatNumber(inv.amount) }}</td>
              <td class="font-mono text-success-600">{{ formatNumber(inv.paidAmount) }}</td>
              <td class="text-neutral-500">{{ formatDate(inv.dueDate) }}</td>
              <td><StatusBadge :status="inv.status" :dot="true" /></td>
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
const invoices = computed(() => financeStore.invoices)
</script>
