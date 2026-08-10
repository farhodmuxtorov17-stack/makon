<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display text-ink-900">Ish buyruqlari</h1>
        <p class="text-sm text-ink-500 mt-1">{{ orders.length }} ish buyruq</p>
      </div>
    </div>
    <div class="card overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Raqam</th>
              <th>Tavsif</th>
              <th>Pudratchi</th>
              <th>Est. xarajat</th>
              <th>Haqiqiy</th>
              <th>Sana</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="o in orders"
              :key="o.id"
              class="cursor-pointer"
              @click="navigateTo(`/service/work-orders/${o.id}`)"
            >
              <td class="font-mono text-xs font-medium text-ink-900">{{ o.number }}</td>
              <td class="text-ink-500 max-w-xs truncate">{{ o.description }}</td>
              <td class="text-ink-700">{{ supplierName(o.contractorId) }}</td>
              <td class="font-mono text-ink-900">{{ formatNumber(o.estimatedCost) }} so'm</td>
              <td
                class="font-mono"
                :class="
                  o.actualCost > o.estimatedCost
                    ? 'text-danger-600 font-semibold'
                    : 'text-success-600 font-semibold'
                "
              >
                {{ o.actualCost ? formatNumber(o.actualCost) : '—' }}
              </td>
              <td class="text-ink-500 text-xs">{{ formatDate(o.scheduledDate) }}</td>
              <td><StatusBadge :status="o.status" :dot="true" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useServiceStore } from '~/stores/service'
import { formatNumber, formatDate } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ middleware: 'auth' })
const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())
const orders = computed(() => serviceStore.workOrders)
const supplierName = (id: string) => serviceStore.suppliers.find((s) => s.id === id)?.name || id
</script>
