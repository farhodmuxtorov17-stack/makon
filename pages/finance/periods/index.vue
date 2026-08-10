<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Moliya davrlari</h1>
        <p class="text-ink-500 text-sm mt-1">Hisob-kitob davrlari va holati</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="16" /> Yangi davr</button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card p-4 flex items-center gap-3">
        <Calendar :size="18" class="text-brand-500" />
        <div><div class="text-sm font-semibold">{{ periods.length }}</div><div class="text-xs text-ink-500">Jami davrlar</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <CheckCircle2 :size="18" class="text-emerald-500" />
        <div><div class="text-sm font-semibold text-emerald-500">{{ periods.filter(p => p.status === 'CLOSED').length }}</div><div class="text-xs text-ink-500">Yopilgan</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <Clock :size="18" class="text-amber-500" />
        <div><div class="text-sm font-semibold text-amber-500">{{ periods.filter(p => p.status === 'OPEN').length }}</div><div class="text-xs text-ink-500">Faol</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <Wallet :size="18" class="text-brand-500" />
        <div><div class="text-sm font-semibold">{{ totalRevenue }}</div><div class="text-xs text-ink-500">Jami daromad</div></div>
      </div>
    </div>

    <!-- Periods table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">Davr</th>
              <th class="px-4 py-3">Yil</th>
              <th class="px-4 py-3 text-center">Invoyslar</th>
              <th class="px-4 py-3 text-right">Daromad</th>
              <th class="px-4 py-3 text-right">Qarz</th>
              <th class="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in periods" :key="p.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3">
              <td class="px-4 py-3 font-medium text-ink-900 dark:text-white">{{ p.label }}</td>
              <td class="px-4 py-3">{{ p.year }}</td>
              <td class="px-4 py-3 text-center">{{ p.invoiceCount }}</td>
              <td class="px-4 py-3 text-right font-medium text-emerald-500">{{ p.revenue }}</td>
              <td class="px-4 py-3 text-right text-red-500">{{ p.debt }}</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-xs" :class="p.status === 'OPEN' ? 'badge-warning' : 'badge-success'">{{ p.status === 'OPEN' ? 'Faol' : 'Yopilgan' }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Calendar, CheckCircle2, Clock, Wallet } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const config = useRuntimeConfig()
const data = ref({
  periods: [
    { id: 'p1', name: 'Avgust 2026', status: 'OPEN', startDate: '2026-08-01', endDate: '2026-08-31', totalInvoiced: 380000000, totalCollected: 295000000, outstanding: 85000000, invoiceCount: 42, paidCount: 35, unpaidCount: 7 },
    { id: 'p2', name: 'Iyul 2026', status: 'CLOSED', startDate: '2026-07-01', endDate: '2026-07-31', totalInvoiced: 375000000, totalCollected: 365000000, outstanding: 10000000, invoiceCount: 41, paidCount: 40, unpaidCount: 1 },
    { id: 'p3', name: 'Iyun 2026', status: 'CLOSED', startDate: '2026-06-01', endDate: '2026-06-30', totalInvoiced: 370000000, totalCollected: 370000000, outstanding: 0, invoiceCount: 40, paidCount: 40, unpaidCount: 0 },
    { id: 'p4', name: 'May 2026', status: 'CLOSED', startDate: '2026-05-01', endDate: '2026-05-31', totalInvoiced: 365000000, totalCollected: 360000000, outstanding: 5000000, invoiceCount: 39, paidCount: 38, unpaidCount: 1 },
  ],
  invoices: [
    { id: 'inv1', number: 'INV-2026-052', contractId: 'CTR-2026-001', tenantName: 'ABC Logistics MChJ', period: 'Avgust 2026', amount: 25000000, paidAmount: 0, balance: 25000000, status: 'UNPAID', dueDate: '2026-08-15' },
    { id: 'inv2', number: 'INV-2026-051', contractId: 'CTR-2026-002', tenantName: 'Global Trade MChJ', period: 'Avgust 2026', amount: 21000000, paidAmount: 21000000, balance: 0, status: 'PAID', dueDate: '2026-08-15' },
    { id: 'inv3', number: 'INV-2026-050', contractId: 'CTR-2026-005', tenantName: 'Smart Solutions MChJ', period: 'Avgust 2026', amount: 35000000, paidAmount: 35000000, balance: 0, status: 'PAID', dueDate: '2026-08-15' },
    { id: 'inv4', number: 'INV-2026-049', contractId: 'CTR-2025-098', tenantName: 'Export Group MChJ', period: 'Avgust 2026', amount: 22000000, paidAmount: 0, balance: 22000000, status: 'OVERDUE', dueDate: '2026-08-05' },
  ],
})

const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust']

const periods = computed(() => {
  if (!data.value?.invoices) return []
  const totalRevenue = data.value.invoices.reduce((s: number, i: any) => s + (i.paidAmount || 0), 0)
  const totalDebt = data.value.invoices.reduce((s: number, i: any) => s + (i.balance || 0), 0)

  return months.map((m, i) => {
    const invCount = Math.floor(Math.random() * 20) + 3
    return {
      id: `period-${i}`,
      label: m,
      year: 2026,
      invoiceCount: invCount,
      revenue: (totalRevenue / 8 * (0.6 + Math.random() * 0.8) / 1000000).toFixed(1) + 'M',
      debt: (totalDebt / 8 * (0.3 + Math.random() * 0.7) / 1000000).toFixed(1) + 'M',
      status: i < 7 ? 'CLOSED' : 'OPEN',
    }
  }).reverse()
})

const totalRevenue = computed(() => {
  if (!data.value?.invoices) return '0'
  return (data.value.invoices.reduce((s: number, i: any) => s + (i.paidAmount || 0), 0) / 1000000).toFixed(1) + 'M'
})
</script>
