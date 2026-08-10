
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Material so'rovlar</h1>
        <p class="text-ink-400 text-sm mt-1">{{ requests.length }} ta so'rov</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div v-for="mr in requests" :key="mr.id" class="card p-5">
        <div class="flex items-start justify-between mb-3">
          <div>
            <span class="text-xs font-mono text-ink-400">{{ mr.number }}</span>
            <h3 class="text-white font-medium mt-1">Material so'rovi</h3>
          </div>
          <span class="badge" :class="statusClass(mr.status)">{{ statusLabel(mr.status) }}</span>
        </div>
        <div class="space-y-2 mb-3">
          <div v-for="item in mr.items" :key="item.id" class="flex items-center justify-between text-sm">
            <span class="text-ink-300">{{ item.name }}</span>
            <span class="text-white">{{ item.quantity }} {{ item.unit }} · {{ formatPriceShort(item.unitPrice * item.quantity) }}</span>
          </div>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-white/5">
          <span class="text-sm text-ink-500">Jami: <span class="text-white font-medium">{{ formatPriceShort(mr.totalValue) }}</span></span>
          <button v-if="mr.status === 'SUBMITTED'" class="btn btn-primary btn-sm">Tasdiqlash</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { materialRequests } from '~/utils/mockData'
import type { MaterialRequestStatus } from '~/types'

const { formatPriceShort } = useFormat()

const requests = materialRequests

function statusLabel(s: MaterialRequestStatus) {
  return { DRAFT: 'Qoralama', SUBMITTED: 'Yuborilgan', APPROVED: 'Tasdiqlangan', REJECTED: 'Rad', ISSUED: 'Berilgan', CANCELLED: 'Bekor' }[s]
}
function statusClass(s: MaterialRequestStatus) {
  return { DRAFT: 'badge-neutral', SUBMITTED: 'badge-warning', APPROVED: 'badge-success', REJECTED: 'badge-danger', ISSUED: 'badge-brand', CANCELLED: 'badge-neutral' }[s]
}
</script>
