<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Ish buyruqlari</h1>
        <p class="text-ink-500 text-sm mt-0.5">Bajarilayotgan ishlar va statuslari</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="wo in serviceStore.workOrders" :key="wo.id" class="card p-5 hover:shadow-card-hover transition-shadow">
        <NuxtLink :to="`/service/work-orders/${wo.id}`">
          <div class="flex items-start justify-between mb-3">
            <div>
              <span class="font-mono font-semibold text-ink-900">{{ wo.number }}</span>
              <p class="text-sm text-ink-500 mt-1">{{ wo.description }}</p>
            </div>
            <span class="badge" :class="woStatusClass(wo.status)">{{ woStatusLabel(wo.status) }}</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p class="text-ink-400 text-xs">Rejalashtirilgan</p>
              <p class="font-medium text-ink-700">{{ formatDate(wo.scheduledDate) }}</p>
            </div>
            <div>
              <p class="text-ink-400 text-xs">Taxminiy narx</p>
              <p class="font-medium text-ink-700">{{ formatPrice(wo.estimatedCost) }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-4 pt-3 border-t border-ink-50">
            <div class="flex items-center gap-1.5 text-sm text-ink-500">
              <Package :size="14" />
              {{ materialCount(wo.id) }} material
            </div>
            <div v-if="wo.actualCost > 0" class="ml-auto text-sm">
              <span class="text-ink-400">Haqiqiy:</span>
              <span class="font-semibold text-ink-900">{{ formatPrice(wo.actualCost) }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Package } from 'lucide-vue-next'
import type { WorkOrderStatus } from '~/types'

const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())

function materialCount(woId: string) {
  return serviceStore.materialRequests.filter(mr => mr.workOrderId === woId).length
}

function woStatusLabel(s: WorkOrderStatus): string {
  const m: Record<string, string> = {
    CREATED: 'Yaratilgan', ASSIGNED: 'Tayinlangan',
    IN_PROGRESS: 'Jarayonda', INSPECTION: 'Tekshiruv',
    COMPLETED: 'Yakunlangan', CANCELLED: 'Bekor qilingan',
  }
  return m[s] || s
}

function woStatusClass(s: WorkOrderStatus): string {
  const m: Record<string, string> = {
    CREATED: 'badge-neutral', ASSIGNED: 'badge-info',
    IN_PROGRESS: 'badge-warning', INSPECTION: 'badge-info',
    COMPLETED: 'badge-success', CANCELLED: 'badge-danger',
  }
  return m[s] || 'badge-neutral'
}

function formatDate(d: string) { return d.split('T')[0] }

function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  return v.toLocaleString('ru')
}
</script>
