
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Topshiriqlar</h1>
        <p class="text-ink-400 text-sm mt-1">{{ orders.length }} ta topshiriq</p>
      </div>
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Nomer</th>
              <th>Bino</th>
              <th>Unit</th>
              <th>Tavsif</th>
              <th>SLA</th>
              <th>Xarajat</th>
              <th>Holat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wo in orders" :key="wo.id" class="table-row-hover">
              <td class="text-white font-medium font-mono text-xs">{{ wo.number }}</td>
              <td class="text-ink-400">{{ getBuilding(wo.buildingId) }}</td>
              <td class="text-ink-400">{{ wo.unitId || '—' }}</td>
              <td class="text-white">{{ wo.description }}</td>
              <td class="text-ink-400">{{ formatDate(wo.scheduledDate) }}</td>
              <td class="text-white">{{ wo.actualCost > 0 ? formatPriceShort(wo.actualCost) : formatPriceShort(wo.estimatedCost) + '*' }}</td>
              <td><span class="badge" :class="statusClass(wo.status)">{{ statusLabel(wo.status) }}</span></td>
              <td>
                <NuxtLink :to="`/service/work-orders/${wo.id}`" class="text-brand-400 hover:text-brand-300 text-sm">Ko'rish →</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { workOrders, buildings } from '~/utils/mockData'
import type { WorkOrderStatus } from '~/types'

const { formatPriceShort, formatDate } = useFormat()

const orders = workOrders

function getBuilding(id: string) { return buildings.find(b => b.id === id)?.name || '—' }

function statusLabel(s: WorkOrderStatus) {
  return { CREATED: 'Yaratilgan', ASSIGNED: 'Biriktirilgan', IN_PROGRESS: 'Jarayonda', INSPECTION: 'Tekshiruv', COMPLETED: 'Bajarilgan', CANCELLED: 'Bekor' }[s]
}
function statusClass(s: WorkOrderStatus) {
  return { CREATED: 'badge-neutral', ASSIGNED: 'badge-info', IN_PROGRESS: 'badge-warning', INSPECTION: 'badge-brand', COMPLETED: 'badge-success', CANCELLED: 'badge-danger' }[s]
}
</script>
