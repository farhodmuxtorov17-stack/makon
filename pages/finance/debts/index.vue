<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Qarzdorlik</h1>
        <p class="text-ink-500 text-sm mt-1">To'lanmagan invoyslar bo'yicha qoldiqlar</p>
      </div>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <template v-else-if="data">
      <!-- Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="card p-5">
          <div class="text-xs text-ink-500 mb-1">Jami qarzdorlik</div>
          <div class="text-2xl font-bold text-red-400">{{ formatPrice(totalDebt, 'UZS') }}</div>
        </div>
        <div class="card p-5">
          <div class="text-xs text-ink-500 mb-1">Muddati o'tgan</div>
          <div class="text-2xl font-bold text-red-400">{{ formatPrice(overdueDebt, 'UZS') }}</div>
        </div>
        <div class="card p-5">
          <div class="text-xs text-ink-500 mb-1">Qarzdorlar soni</div>
          <div class="text-2xl font-bold">{{ debtors.length }}</div>
        </div>
      </div>

      <!-- Debtors table -->
      <div class="card overflow-hidden">
        <div class="p-4 border-b border-white/5">
          <h3 class="font-semibold">Qarzdorlar ro'yxati</h3>
        </div>
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-4 py-3">Ijachi</th>
              <th class="text-left font-medium px-4 py-3 hidden md:table-cell">Invoys</th>
              <th class="text-right font-medium px-4 py-3">Summa</th>
              <th class="text-right font-medium px-4 py-3">Qoldiq</th>
              <th class="text-center font-medium px-4 py-3 hidden md:table-cell">Muddat</th>
              <th class="text-center font-medium px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in debtors" :key="inv.id" class="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td class="px-4 py-3 font-medium">{{ inv.tenantName }}</td>
              <td class="px-4 py-3 hidden md:table-cell font-mono text-xs text-ink-500">{{ inv.number }}</td>
              <td class="px-4 py-3 text-right">{{ formatPrice(inv.amount, inv.currency) }}</td>
              <td class="px-4 py-3 text-right text-red-400 font-semibold">{{ formatPrice(inv.balance, inv.currency) }}</td>
              <td class="px-4 py-3 hidden md:table-cell text-center text-xs" :class="isOverdue(inv.dueDate) ? 'text-red-400' : 'text-ink-400'">
                {{ formatDate(inv.dueDate) }}
              </td>
              <td class="px-4 py-3 text-center">
                <span class="badge" :class="isOverdue(inv.dueDate) ? 'badge-danger' : 'badge-warning'">
                  {{ isOverdue(inv.dueDate) ? 'Muddati o\'tgan' : 'Kutilmoqda' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="debtors.length === 0" class="p-12 text-center text-ink-500">
          Qarzdorlik yo'q 🎉
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

const data = ref({
  stats: { totalDebt: 85000000, overdueCount: 7, overdueAmount: 45000000, atRiskCount: 3 },
  debts: [
    { id: 'd1', tenantName: 'Export Group MChJ', contractNumber: 'CTR-2025-098', invoiceNumber: 'INV-2026-049', amount: 22000000, balance: 22000000, daysOverdue: 5, status: 'OVERDUE', unitName: 'B-303', buildingName: 'Tashkent City' },
    { id: 'd2', tenantName: 'ABC Logistics MChJ', contractNumber: 'CTR-2026-001', invoiceNumber: 'INV-2026-052', amount: 25000000, balance: 12500000, daysOverdue: 0, status: 'PARTIALLY_PAID', unitName: 'A-301', buildingName: 'Tashkent City' },
    { id: 'd3', tenantName: 'Piramit Tenant', contractNumber: 'CTR-2024-045', invoiceNumber: 'INV-2026-048', amount: 15000000, balance: 15000000, daysOverdue: 12, status: 'OVERDUE', unitName: 'D-102', buildingName: 'Piramit' },
    { id: 'd4', tenantName: 'Small Business Co', contractNumber: 'CTR-2026-011', invoiceNumber: 'INV-2026-046', amount: 8000000, balance: 8000000, daysOverdue: 3, status: 'OVERDUE', unitName: 'C-203', buildingName: 'IT Park' },
    { id: 'd5', tenantName: 'Export Group MChJ', contractNumber: 'CTR-2025-098', invoiceNumber: 'INV-2026-047', amount: 22000000, balance: 8000000, daysOverdue: 0, status: 'AT_RISK', unitName: 'B-303', buildingName: 'Tashkent City' },
  ],
})

const debtors = computed(() => {
  return (data.value?.invoices || []).filter((i: any) => (i.balance || 0) > 0)
})

const totalDebt = computed(() => debtors.value.reduce((s: number, i: any) => s + (i.balance || 0), 0))
const overdueDebt = computed(() => debtors.value.filter((i: any) => isOverdue(i.dueDate)).reduce((s: number, i: any) => s + (i.balance || 0), 0))

function isOverdue(date: string) {
  if (!date) return false
  return new Date(date) < new Date()
}

function formatPrice(price: number, currency: string) {
  if (!price) return '—'
  const formatted = new Intl.NumberFormat('ru-RU').format(price)
  return currency === 'USD' ? `$${formatted}` : `${(formatted / 1000000).toFixed(1)}M`
}

function formatDate(date: string) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
