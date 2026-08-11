<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Moliya — Invoyslar</h1>

    <!-- KPIs -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="card p-4"><div class="text-xs text-ink-400 mb-1">Jami</div><div class="text-lg font-bold text-ink-900 dark:text-white">{{ invoices.length }}</div></div>
      <div class="card p-4"><div class="text-xs text-ink-400 mb-1">To'langan</div><div class="text-lg font-bold text-emerald-500">{{ paidCount }}</div></div>
      <div class="card p-4"><div class="text-xs text-ink-400 mb-1">Kutilmoqda</div><div class="text-lg font-bold text-blue-500">{{ pendingCount }}</div></div>
      <div class="card p-4"><div class="text-xs text-ink-400 mb-1">Muddati o'tgan</div><div class="text-lg font-bold text-red-500">{{ overdueCount }}</div></div>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Shartnoma</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Ijarachi</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Davr</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Summa</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inv in invoices" :key="inv.id" class="border-b border-ink-50 dark:border-white/5 hover:bg-ink-50 dark:hover:bg-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ inv.contractNumber }}</td>
            <td class="px-4 py-3 text-sm text-ink-600 dark:text-ink-300">{{ inv.tenantName }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ inv.date }}</td>
            <td class="px-4 py-3 text-right text-sm font-medium text-ink-900 dark:text-white">{{ inv.amount.toLocaleString('ru-RU') }} {{ inv.currency }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="statusClass(inv.status)">{{ statusLabel(inv.status) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

const store = useMakonStore()

interface Invoice {
  id: string
  contractNumber: string
  tenantName: string
  date: string
  amount: number
  currency: string
  status: 'PAID' | 'PENDING' | 'OVERDUE'
}

const invoices = computed<Invoice[]>(() => {
  const result: Invoice[] = []
  for (const c of store.contracts) {
    for (const s of c.schedule) {
      result.push({
        id: `${c.id}-${s.date}`,
        contractNumber: c.number,
        tenantName: c.tenantName,
        date: s.date,
        amount: s.amount,
        currency: c.currency,
        status: s.status as 'PAID' | 'PENDING' | 'OVERDUE',
      })
    }
  }
  return result
})

const paidCount = computed(() => invoices.value.filter(i => i.status === 'PAID').length)
const pendingCount = computed(() => invoices.value.filter(i => i.status === 'PENDING').length)
const overdueCount = computed(() => invoices.value.filter(i => i.status === 'OVERDUE').length)

function statusLabel(s: string) { return { PAID: 'To\'langan', PENDING: 'Kutilmoqda', OVERDUE: 'Muddati o\'tgan' }[s] || s }
function statusClass(s: string) { return { PAID: 'bg-emerald-500/10 text-emerald-500', PENDING: 'bg-blue-500/10 text-blue-500', OVERDUE: 'bg-red-500/10 text-red-500' }[s] || '' }
</script>
