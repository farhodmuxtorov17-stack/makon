<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">To'lovlar</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ payments.length }} to'lov</p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <StatCard
        label="Jami to'lov"
        :value="totalPaid"
        type="currency"
        color="success"
        icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2"
      />
      <StatCard
        label="Tugatilgan"
        :value="payments.filter((p) => p.status === 'COMPLETED').length"
        color="primary"
        icon="M5 13l4 4L19 7"
      />
      <StatCard
        label="Xatolik"
        :value="payments.filter((p) => p.status === 'FAILED').length"
        color="danger"
        icon="M12 9v2m0 4h.01"
      />
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Invoys</th>
              <th>Summa</th>
              <th>Usul</th>
              <th>Tranzaksiya</th>
              <th>Sana</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in payments" :key="p.id">
              <td class="font-mono text-xs">{{ p.invoiceId }}</td>
              <td class="font-mono font-medium">{{ formatNumber(p.amount) }} so'm</td>
              <td>
                <span class="badge-neutral">{{ p.method }}</span>
              </td>
              <td class="font-mono text-xs text-neutral-500">{{ p.transactionId }}</td>
              <td class="text-neutral-500">{{ formatDate(p.paidAt) }}</td>
              <td><StatusBadge :status="p.status" :dot="true" /></td>
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
const payments = computed(() => financeStore.payments)
const totalPaid = computed(() =>
  payments.value.filter((p) => p.status === 'COMPLETED').reduce((s, p) => s + p.amount, 0)
)
</script>
