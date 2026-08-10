<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Invoyslar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ data?.invoices.length || 0 }} invoys</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-secondary btn-sm">
          <Download :size="16" /> Eksport
        </button>
        <button class="btn btn-primary btn-sm">
          <Plus :size="16" /> Yangi invoys
        </button>
      </div>
    </div>

    <!-- Summary -->
    <div v-if="data" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">Jami summa</div>
        <div class="text-xl font-bold">{{ formatPrice(totalAmount, 'UZS') }}</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">To'langan</div>
        <div class="text-xl font-bold text-emerald-400">{{ formatPrice(totalPaid, 'UZS') }}</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">Qoldiq</div>
        <div class="text-xl font-bold text-red-400">{{ formatPrice(totalBalance, 'UZS') }}</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">To'lanmagan</div>
        <div class="text-xl font-bold">{{ unpaidCount }} ta</div>
      </div>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <div v-else-if="data" class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-white/5 text-ink-500 text-xs uppercase tracking-widest">
            <th class="text-left font-medium px-4 py-3">Nomer</th>
            <th class="text-left font-medium px-4 py-3 hidden md:table-cell">Ijachi</th>
            <th class="text-left font-medium px-4 py-3 hidden lg:table-cell">Shartnoma</th>
            <th class="text-left font-medium px-4 py-3 hidden md:table-cell">Davr</th>
            <th class="text-right font-medium px-4 py-3">Summa</th>
            <th class="text-right font-medium px-4 py-3 hidden sm:table-cell">Qoldiq</th>
            <th class="text-center font-medium px-4 py-3 hidden md:table-cell">Muddat</th>
            <th class="text-center font-medium px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inv in data.invoices" :key="inv.id" class="border-b border-white/5 hover:bg-white/5 transition-colors">
            <td class="px-4 py-3 font-mono text-xs">{{ inv.number }}</td>
            <td class="px-4 py-3 hidden md:table-cell">{{ inv.tenantName }}</td>
            <td class="px-4 py-3 hidden lg:table-cell text-ink-500 font-mono text-xs">{{ inv.contractNumber }}</td>
            <td class="px-4 py-3 hidden md:table-cell text-ink-400">{{ inv.period }}</td>
            <td class="px-4 py-3 text-right font-medium">{{ formatPrice(inv.amount, inv.currency) }}</td>
            <td class="px-4 py-3 text-right hidden sm:table-cell" :class="inv.balance > 0 ? 'text-red-400' : 'text-emerald-400'">
              {{ formatPrice(inv.balance, inv.currency) }}
            </td>
            <td class="px-4 py-3 hidden md:table-cell text-center text-ink-400 text-xs">{{ formatDate(inv.dueDate) }}</td>
            <td class="px-4 py-3 text-center">
              <span class="badge" :class="invoiceBadge(inv.status)">{{ invoiceLabel(inv.status) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Download } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const data = ref({
  stats: { totalInvoiced: 380000000, totalCollected: 295000000, outstanding: 85000000, unpaidCount: 7, paidCount: 35 },
  invoices: [
    { id: 'inv1', number: 'INV-2026-052', contractNumber: 'CTR-2026-001', tenantName: 'ABC Logistics MChJ', period: 'Avg 2026', amount: 25000000, paidAmount: 0, balance: 25000000, status: 'UNPAID', dueDate: '2026-08-15', currency: 'UZS' },
    { id: 'inv2', number: 'INV-2026-051', contractNumber: 'CTR-2026-002', tenantName: 'Global Trade MChJ', period: 'Avg 2026', amount: 21000000, paidAmount: 21000000, balance: 0, status: 'PAID', dueDate: '2026-08-15', currency: 'UZS' },
    { id: 'inv3', number: 'INV-2026-050', contractNumber: 'CTR-2026-005', tenantName: 'Smart Solutions MChJ', period: 'Avg 2026', amount: 35000000, paidAmount: 35000000, balance: 0, status: 'PAID', dueDate: '2026-08-15', currency: 'UZS' },
    { id: 'inv4', number: 'INV-2026-049', contractNumber: 'CTR-2025-098', tenantName: 'Export Group MChJ', period: 'Avg 2026', amount: 22000000, paidAmount: 0, balance: 22000000, status: 'OVERDUE', dueDate: '2026-08-05', currency: 'UZS' },
    { id: 'inv5', number: 'INV-2026-048', contractNumber: 'CTR-2024-045', tenantName: 'Logistics Plus', period: 'Avg 2026', amount: 15000000, paidAmount: 0, balance: 15000000, status: 'OVERDUE', dueDate: '2026-08-05', currency: 'UZS' },
    { id: 'inv6', number: 'INV-2026-047', contractNumber: 'CTR-2025-098', tenantName: 'Export Group MChJ', period: 'Iyl 2026', amount: 22000000, paidAmount: 22000000, balance: 0, status: 'PAID', dueDate: '2026-07-15', currency: 'UZS' },
    { id: 'inv7', number: 'INV-2026-046', contractNumber: 'CTR-2026-001', tenantName: 'ABC Logistics MChJ', period: 'Iyl 2026', amount: 25000000, paidAmount: 12500000, balance: 12500000, status: 'PARTIALLY_PAID', dueDate: '2026-07-15', currency: 'UZS' },
  ],
})

const totalAmount = computed(() => data.value?.invoices.reduce((s: number, i: any) => s + (i.amount || 0), 0) || 0)
const totalPaid = computed(() => data.value?.invoices.reduce((s: number, i: any) => s + (i.paidAmount || 0), 0) || 0)
const totalBalance = computed(() => data.value?.invoices.reduce((s: number, i: any) => s + (i.balance || 0), 0) || 0)
const unpaidCount = computed(() => data.value?.invoices.filter((i: any) => i.status === 'UNPAID' || i.status === 'PARTIALLY_PAID').length || 0)

function formatPrice(price: number, currency: string) {
  if (!price) return '—'
  const formatted = new Intl.NumberFormat('ru-RU').format(price)
  return currency === 'USD' ? `$${formatted}` : `${(formatted / 1000000).toFixed(1)}M`
}

function formatDate(date: string) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function invoiceBadge(status: string) {
  const map: Record<string, string> = {
    PAID: 'badge-success', UNPAID: 'badge-danger', PARTIALLY_PAID: 'badge-warning', DRAFT: 'badge-neutral', CANCELLED: 'badge-neutral',
  }
  return map[status] || 'badge-neutral'
}

function invoiceLabel(status: string) {
  const map: Record<string, string> = {
    PAID: 'To\'langan', UNPAID: 'To\'lanmagan', PARTIALLY_PAID: 'Qisman', DRAFT: 'Qoralama', CANCELLED: 'Bekor',
  }
  return map[status] || status
}
</script>
