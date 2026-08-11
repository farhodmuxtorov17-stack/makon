<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-ink-900 dark:text-white">Invoyslar</h1>
      <button class="btn-primary">+ Yangi invoys</button>
    </div>

    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Nomer</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Ijarachi</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Davr</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Summa</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inv in invoices" :key="inv.id" class="border-b border-ink-50 dark:border-white/5 hover:bg-ink-50 dark:hover:bg-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ inv.number }}</td>
            <td class="px-4 py-3 text-sm text-ink-600 dark:text-ink-300">{{ inv.tenant }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ inv.period }}</td>
            <td class="px-4 py-3 text-right text-sm font-medium text-ink-900 dark:text-white">{{ inv.amount.toLocaleString('ru-RU') }} UZS</td>
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
useHead({ title: "Invoyslar — MAKON" })

const invoices = [
  { id: 1, number: 'INV-2026-049', tenant: 'Orient Logistika', period: 'Iyl 2026', amount: 18500000, status: 'PAID' },
  { id: 2, number: 'INV-2026-051', tenant: 'Ipak Yuli Savdo', period: 'Avg 2026', amount: 21000000, status: 'PAID' },
  { id: 3, number: 'INV-2026-052', tenant: 'Alfa Biznes', period: 'Avg 2026', amount: 12500000, status: 'PENDING' },
  { id: 4, number: 'INV-2026-046', tenant: 'Markaz Savdo', period: 'Iyl 2026', amount: 6200000, status: 'OVERDUE' },
  { id: 5, number: 'INV-2026-053', tenant: 'Chorsu Retail', period: 'Avg 2026', amount: 9800000, status: 'PENDING' },
  { id: 6, number: 'INV-2026-048', tenant: 'Zomin Invest', period: 'Iyl 2026', amount: 15600000, status: 'PAID' },
]

function statusLabel(s: string) { return { PAID: 'To\'langan', PENDING: 'Kutilmoqda', OVERDUE: 'Muddati o\'tgan' }[s] || s }
function statusClass(s: string) { return { PAID: 'bg-emerald-500/10 text-emerald-500', PENDING: 'bg-blue-500/10 text-blue-500', OVERDUE: 'bg-red-500/10 text-red-500' }[s] || '' }
</script>
