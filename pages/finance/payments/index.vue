<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">To'lovlar</h1>
        <p class="text-ink-500 text-sm mt-0.5">To'lov tarixi va transactionlar</p>
      </div>
      <button class="btn btn-outline btn-sm">
        <Download :size="16" />
        Eksport
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="card p-5">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 :size="20" class="text-emerald-600" />
          </div>
          <div>
            <p class="text-sm text-ink-400">Jami to'langan</p>
            <p class="text-xl font-bold font-display">{{ formatPrice(totalPaid) }}</p>
          </div>
        </div>
      </div>
      <div class="card p-5">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <Clock :size="20" class="text-amber-600" />
          </div>
          <div>
            <p class="text-sm text-ink-400">Kutilmoqda</p>
            <p class="text-xl font-bold font-display">{{ formatPrice(totalPending) }}</p>
          </div>
        </div>
      </div>
      <div class="card p-5">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
            <CreditCard :size="20" class="text-brand-600" />
          </div>
          <div>
            <p class="text-sm text-ink-400">Tranzaksiyalar</p>
            <p class="text-xl font-bold font-display">{{ financeStore.payments.length }} ta</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Payments table -->
    <div class="card overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Tranzaksiya ID</th>
              <th>Invoys</th>
              <th>Summa</th>
              <th>Usul</th>
              <th>Sana</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in financeStore.payments" :key="p.id">
              <td class="font-mono text-sm text-ink-500">{{ p.transactionId }}</td>
              <td class="font-mono font-semibold">{{ invoiceNumber(p.invoiceId) }}</td>
              <td class="font-semibold">{{ formatPrice(p.amount) }}</td>
              <td>
                <span class="badge badge-neutral">{{ p.method }}</span>
              </td>
              <td class="text-ink-500 text-sm">{{ p.paidAt }}</td>
              <td>
                <span class="badge" :class="p.status === 'COMPLETED' ? 'badge-success' : p.status === 'FAILED' ? 'badge-danger' : 'badge-warning'">
                  {{ p.status === 'COMPLETED' ? 'Yakunlangan' : p.status === 'FAILED' ? 'Xato' : 'Kutilmoqda' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, CheckCircle2, Clock, CreditCard } from 'lucide-vue-next'

const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

const totalPaid = computed(() => financeStore.payments.filter(p => p.status === 'COMPLETED').reduce((s, p) => s + p.amount, 0))
const totalPending = computed(() => {
  const paidInvoices = financeStore.invoices.filter(i => i.status === 'PENDING' || i.status === 'PARTIAL')
  return paidInvoices.reduce((s, i) => s + (i.amount - i.paidAmount), 0)
})

function invoiceNumber(id: string) {
  const inv = financeStore.invoices.find(i => i.id === id)
  return inv?.number || '—'
}

function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln so\'m'
  return v.toLocaleString('ru') + ' so\'m'
}
</script>
