<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Invoyslar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ filteredInvoices.length }} / {{ invoices.length }} invoys</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
        <button class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi invoys</button>
      </div>
    </div>

    <!-- KPI cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <KpiScene3D type="revenue" :size="48" />
          <span class="text-xs text-ink-500">Jami summa</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ formatShort(totalAmount) }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <KpiScene3D type="paid" :size="48" />
          <span class="text-xs text-ink-500">To'langan</span>
        </div>
        <div class="text-xl font-bold text-emerald-500">{{ formatShort(totalPaid) }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <KpiScene3D type="overdue" :size="48" />
          <span class="text-xs text-ink-500">Qoldiq</span>
        </div>
        <div class="text-xl font-bold text-red-500">{{ formatShort(totalBalance) }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <KpiScene3D type="units" :size="48" />
          <span class="text-xs text-ink-500">To'lanmagan</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ unpaidCount }} <span class="text-sm text-ink-500 font-normal">ta</span></div>
      </div>
    </div>

    <!-- Mini chart -->
    <div class="card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">To'lov dinamikasi (6 oy)</h3>
      </div>
      <MakonChart type="bar" :series="paymentSeries" :categories="paymentMonths" :height="200" :colors="['#6366f1', '#10b981']" :stacked="true" />
    </div>

    <!-- Status tabs + search -->
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5">
        <button
          v-for="tab in statusTabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
          :class="activeTab === tab.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500 hover:text-ink-800 dark:hover:text-ink-200'"
        >
          {{ tab.label }}
          <span v-if="tab.count > 0" class="ml-1.5 text-xs" :class="activeTab === tab.value ? 'text-brand-500' : 'text-ink-400'">{{ tab.count }}</span>
        </button>
      </div>
      <div class="flex items-center gap-2">
        <div class="relative">
          <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input v-model="search" type="text" placeholder="Invoys yoki ijarachi..." class="w-56 text-sm border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-4 py-3">Raqam</th>
              <th class="text-left font-medium px-4 py-3 hidden md:table-cell">Ijarachi</th>
              <th class="text-left font-medium px-4 py-3 hidden lg:table-cell">Shartnoma</th>
              <th class="text-left font-medium px-4 py-3 hidden md:table-cell">Davr</th>
              <th class="text-right font-medium px-4 py-3">Summa</th>
              <th class="text-right font-medium px-4 py-3 hidden sm:table-cell">Qoldiq</th>
              <th class="text-center font-medium px-4 py-3 hidden md:table-cell">Muddat</th>
              <th class="text-center font-medium px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in filteredInvoices" :key="inv.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <td class="px-4 py-3 font-mono text-xs text-ink-700 dark:text-ink-300">{{ inv.number }}</td>
              <td class="px-4 py-3 hidden md:table-cell font-medium text-ink-900 dark:text-white">{{ inv.tenantName }}</td>
              <td class="px-4 py-3 hidden lg:table-cell text-ink-500 font-mono text-xs">{{ inv.contractNumber }}</td>
              <td class="px-4 py-3 hidden md:table-cell text-ink-500">{{ inv.period }}</td>
              <td class="px-4 py-3 text-right font-semibold text-ink-900 dark:text-white">{{ formatShort(inv.amount) }}</td>
              <td class="px-4 py-3 text-right hidden sm:table-cell" :class="inv.balance > 0 ? 'text-red-500 font-medium' : 'text-emerald-500'">
                {{ formatShort(inv.balance) }}
              </td>
              <td class="px-4 py-3 hidden md:table-cell text-center text-ink-500 text-xs">{{ formatDate(inv.dueDate) }}</td>
              <td class="px-4 py-3 text-center">
                <span class="badge" :class="invoiceBadge(inv.status)">{{ invoiceLabel(inv.status) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="filteredInvoices.length === 0" class="py-12 text-center">
        <SearchX :size="32" class="text-ink-300 mx-auto mb-2" />
        <p class="text-ink-500 text-sm">Invoys topilmadi</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Download, Receipt, CheckCircle2, AlertCircle, Clock, Search, SearchX } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const search = ref('')
const activeTab = ref('all')

interface Invoice {
  id: string; number: string; contractNumber: string; tenantName: string;
  period: string; amount: number; paidAmount: number; balance: number;
  status: 'PAID' | 'UNPAID' | 'PARTIALLY_PAID' | 'OVERDUE' | 'DRAFT' | 'CANCELLED';
  dueDate: string; currency: string;
}

const invoices: Invoice[] = [
  { id: 'inv1', number: 'INV-2026-052', contractNumber: 'CTR-2026-001', tenantName: 'ABC Logistics MChJ', period: 'Avg 2026', amount: 25000000, paidAmount: 0, balance: 25000000, status: 'UNPAID', dueDate: '2026-08-15', currency: 'UZS' },
  { id: 'inv2', number: 'INV-2026-051', contractNumber: 'CTR-2026-002', tenantName: 'Global Trade MChJ', period: 'Avg 2026', amount: 21000000, paidAmount: 21000000, balance: 0, status: 'PAID', dueDate: '2026-08-15', currency: 'UZS' },
  { id: 'inv3', number: 'INV-2026-050', contractNumber: 'CTR-2026-005', tenantName: 'Smart Solutions MChJ', period: 'Avg 2026', amount: 35000000, paidAmount: 35000000, balance: 0, status: 'PAID', dueDate: '2026-08-15', currency: 'UZS' },
  { id: 'inv4', number: 'INV-2026-049', contractNumber: 'CTR-2025-098', tenantName: 'Export Group MChJ', period: 'Avg 2026', amount: 22000000, paidAmount: 0, balance: 22000000, status: 'OVERDUE', dueDate: '2026-08-05', currency: 'UZS' },
  { id: 'inv5', number: 'INV-2026-048', contractNumber: 'CTR-2024-045', tenantName: 'Logistics Plus', period: 'Avg 2026', amount: 15000000, paidAmount: 0, balance: 15000000, status: 'OVERDUE', dueDate: '2026-08-05', currency: 'UZS' },
  { id: 'inv6', number: 'INV-2026-047', contractNumber: 'CTR-2025-098', tenantName: 'Export Group MChJ', period: 'Iyl 2026', amount: 22000000, paidAmount: 22000000, balance: 0, status: 'PAID', dueDate: '2026-07-15', currency: 'UZS' },
  { id: 'inv7', number: 'INV-2026-046', contractNumber: 'CTR-2026-001', tenantName: 'ABC Logistics MChJ', period: 'Iyl 2026', amount: 25000000, paidAmount: 12500000, balance: 12500000, status: 'PARTIALLY_PAID', dueDate: '2026-07-15', currency: 'UZS' },
  { id: 'inv8', number: 'INV-2026-045', contractNumber: 'CTR-2026-003', tenantName: 'Tech Hub MChJ', period: 'Iyl 2026', amount: 18000000, paidAmount: 18000000, balance: 0, status: 'PAID', dueDate: '2026-07-15', currency: 'UZS' },
  { id: 'inv9', number: 'INV-2026-044', contractNumber: 'CTR-2025-077', tenantName: 'Mega Group MChJ', period: 'Iyl 2026', amount: 32000000, paidAmount: 0, balance: 32000000, status: 'UNPAID', dueDate: '2026-08-15', currency: 'UZS' },
  { id: 'inv10', number: 'INV-2026-043', contractNumber: 'CTR-2024-045', tenantName: 'Logistics Plus', period: 'Iyl 2026', amount: 15000000, paidAmount: 15000000, balance: 0, status: 'PAID', dueDate: '2026-07-15', currency: 'UZS' },
]

const statusTabs = computed(() => [
  { label: 'Barchasi', value: 'all', count: invoices.length },
  { label: 'To\'langan', value: 'PAID', count: invoices.filter(i => i.status === 'PAID').length },
  { label: 'To\'lanmagan', value: 'UNPAID', count: invoices.filter(i => i.status === 'UNPAID').length },
  { label: 'Qisman', value: 'PARTIALLY_PAID', count: invoices.filter(i => i.status === 'PARTIALLY_PAID').length },
  { label: 'Muddati o\'tgan', value: 'OVERDUE', count: invoices.filter(i => i.status === 'OVERDUE').length },
])

const filteredInvoices = computed(() => {
  let result = [...invoices]
  if (activeTab.value !== 'all') result = result.filter(i => i.status === activeTab.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(i => i.number.toLowerCase().includes(q) || i.tenantName.toLowerCase().includes(q))
  }
  return result
})

const totalAmount = computed(() => invoices.reduce((s, i) => s + i.amount, 0))
const totalPaid = computed(() => invoices.reduce((s, i) => s + i.paidAmount, 0))
const totalBalance = computed(() => invoices.reduce((s, i) => s + i.balance, 0))
const unpaidCount = computed(() => invoices.filter(i => i.status !== 'PAID' && i.status !== 'CANCELLED').length)

const paymentMonths = ['Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg']
const paymentSeries = [
  { name: 'To\'langan', data: [820, 890, 950, 1020, 1090, 1295] },
  { name: 'Qoldiq', data: [180, 110, 170, 80, 160, 225] },
]

function formatShort(price: number) {
  if (!price) return '0'
  if (price >= 1_000_000_000) return (price / 1_000_000_000).toFixed(1) + ' mlr'
  if (price >= 1_000_000) return (price / 1_000_000).toFixed(1) + 'M'
  return new Intl.NumberFormat('ru-RU').format(price)
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

function invoiceBadge(status: string) {
  const map: Record<string, string> = {
    PAID: 'badge-success', UNPAID: 'badge-danger', PARTIALLY_PAID: 'badge-warning',
    OVERDUE: 'badge-danger', DRAFT: 'badge-neutral', CANCELLED: 'badge-neutral',
  }
  return map[status] || 'badge-neutral'
}

function invoiceLabel(status: string) {
  const map: Record<string, string> = {
    PAID: 'To\'langan', UNPAID: 'To\'lanmagan', PARTIALLY_PAID: 'Qisman',
    OVERDUE: 'Muddati o\'tgan', DRAFT: 'Qoralama', CANCELLED: 'Bekor',
  }
  return map[status] || status
}
</script>
