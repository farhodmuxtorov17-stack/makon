<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Invoyslar</h1>
        <p class="text-ink-500 text-sm mt-0.5">To'lov hujjatlari va statuslari</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" />
        Invoys yaratish
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-4">
        <p class="text-sm text-ink-400 mb-1">Jami invoyslar</p>
        <p class="text-xl font-bold font-display">{{ financeStore.invoices.length }}</p>
      </div>
      <div class="card p-4">
        <p class="text-sm text-ink-400 mb-1">To'langan</p>
        <p class="text-xl font-bold font-display text-emerald-600">{{ paidCount }}</p>
      </div>
      <div class="card p-4">
        <p class="text-sm text-ink-400 mb-1">Kutilmoqda</p>
        <p class="text-xl font-bold font-display text-amber-600">{{ pendingCount }}</p>
      </div>
      <div class="card p-4">
        <p class="text-sm text-ink-400 mb-1">Muddati o'tdi</p>
        <p class="text-xl font-bold font-display text-rose-600">{{ overdueCount }}</p>
      </div>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Nomer</th>
              <th>Shartnoma</th>
              <th>Davr</th>
              <th>Summa</th>
              <th>To'langan</th>
              <th>Muddat</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in financeStore.invoices" :key="inv.id">
              <td class="font-mono font-semibold text-ink-900">{{ inv.number }}</td>
              <td>{{ contractNumber(inv.contractId) }}</td>
              <td class="text-ink-500">{{ inv.period }}</td>
              <td class="font-semibold">{{ formatPrice(inv.amount) }}</td>
              <td class="text-emerald-600 font-medium">{{ formatPrice(inv.paidAmount) }}</td>
              <td class="text-ink-500 text-sm">{{ inv.dueDate }}</td>
              <td><span class="badge" :class="invoiceStatusClass(inv.status)">{{ invoiceStatusLabel(inv.status) }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import type { InvoiceStatus } from '~/types'

const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

const paidCount = computed(() => financeStore.invoices.filter(i => i.status === 'PAID').length)
const pendingCount = computed(() => financeStore.invoices.filter(i => i.status === 'PENDING').length)
const overdueCount = computed(() => financeStore.invoices.filter(i => i.status === 'OVERDUE').length)

function contractNumber(id: string) {
  const c = financeStore.contracts.find(c => c.id === id)
  return c?.number || '—'
}

function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  return v.toLocaleString('ru')
}

function invoiceStatusLabel(s: InvoiceStatus): string {
  const m: Record<string, string> = {
    PENDING: 'Kutilmoqda', PARTIAL: 'Qisman', PAID: 'To\'langan',
    OVERDUE: 'Muddati o\'tdi', CANCELLED: 'Bekor qilingan',
  }
  return m[s] || s
}

function invoiceStatusClass(s: InvoiceStatus): string {
  const m: Record<string, string> = {
    PENDING: 'badge-warning', PARTIAL: 'badge-info',
    PAID: 'badge-success', OVERDUE: 'badge-danger', CANCELLED: 'badge-neutral',
  }
  return m[s] || 'badge-neutral'
}
</script>
