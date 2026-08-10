<template>
  <div class="space-y-6">
    <PageHeader title="Ish buyruqlari" subtitle="Bajarilayotgan ishlar va tahlil" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink v-for="wo in serviceStore.workOrders" :key="wo.id" :to="`/service/work-orders/${wo.id}`"
        class="card p-5 hover:shadow-card-hover transition-all group">
        <div class="flex items-start justify-between mb-3">
          <div>
            <span class="font-mono font-semibold text-ink-900 group-hover:text-brand-600 transition-colors">{{ wo.number }}</span>
            <p class="text-sm text-ink-500 mt-1">{{ wo.description }}</p>
          </div>
          <StatusBadge :status="wo.status" :variant="woVariant(wo.status)" :label="woLabel(wo.status)" dot />
        </div>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p class="text-ink-400 text-xs">Rejalashtirilgan</p>
            <p class="font-medium text-ink-700">{{ formatDate(wo.scheduledDate) }}</p>
          </div>
          <div>
            <p class="text-ink-400 text-xs">Taxminiy narx</p>
            <p class="font-medium text-ink-700">{{ formatPrice(wo.estimatedCost) }} so'm</p>
          </div>
        </div>
        <div class="flex items-center gap-3 mt-4 pt-3 border-t border-ink-50">
          <div class="flex items-center gap-1.5 text-sm text-ink-500">
            <Package :size="14" /> {{ materialCount(wo.id) }} material
          </div>
          <div v-if="wo.actualCost > 0" class="ml-auto text-sm">
            <span class="text-ink-400">Haqiqiy:</span>
            <span class="font-semibold text-ink-900 ml-1">{{ formatPrice(wo.actualCost) }} so'm</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Package } from 'lucide-vue-next'
import type { WorkOrderStatus } from '~/types'

const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())

function materialCount(woId: string) {
  return serviceStore.materialRequests.filter(mr => mr.workOrderId === woId).length
}
function woLabel(s: WorkOrderStatus): string {
  const m: Record<string, string> = { CREATED: 'Yaratilgan', ASSIGNED: 'Tayinlangan', IN_PROGRESS: 'Jarayonda', INSPECTION: 'Tekshiruv', COMPLETED: 'Yakunlangan', CANCELLED: 'Bekor' }
  return m[s] || s
}
function woVariant(s: WorkOrderStatus): string {
  const m: Record<string, string> = { CREATED: 'neutral', ASSIGNED: 'info', IN_PROGRESS: 'warning', INSPECTION: 'info', COMPLETED: 'success', CANCELLED: 'danger' }
  return m[s] || 'neutral'
}
function formatDate(d: string) { return d.split('T')[0] }
function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  if (v >= 1000) return (v / 1000).toFixed(0) + 'K'
  return v.toLocaleString('ru')
}
</script>
