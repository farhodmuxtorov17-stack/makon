<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Invoyslar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ filteredInvoices.length }} / {{ invoices.length }} invoys</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="exportCSV" class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
        <button @click="showCreateModal = true" class="btn btn-primary btn-sm btn-glow"><Plus :size="14" /> Yangi invoys</button>
      </div>
    </div>

    <!-- KPI cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KpiCard :icon="DollarSign" label="Jami summa" :value="formatUZSShort(totalAmount)" icon-color="#f59e0b" icon-bg="rgba(245,158,11,0.1)" to="/finance/invoices" :trend="12.5" :sparkData="[40,55,48,70,65,82,90]" sparkColor="#f59e0b" />
      <KpiCard :icon="CheckCircle2" label="To'langan" :value="formatUZSShort(totalPaid)" icon-color="#10b981" icon-bg="rgba(16,185,129,0.1)" to="/finance/invoices" :trend="8.2" :sparkData="[30,45,50,42,60,55,68]" sparkColor="#10b981" />
      <KpiCard :icon="AlertCircle" label="Qoldiq" :value="formatUZSShort(totalBalance)" icon-color="#ef4444" icon-bg="rgba(239,68,68,0.1)" to="/finance/debts" :trend="-4.1" :sparkData="[60,55,48,52,40,35,30]" sparkColor="#ef4444" />
      <KpiCard :icon="Layers" label="To'lanmagan" :value="`${unpaidCount} ta`" icon-color="var(--accent)" icon-bg="rgba(37,99,235,0.1)" to="/finance/debts" />
    </div>

    <!-- Mini chart -->
    <div class="card-premium p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">To'lov dinamikasi (6 oy)</h3>
        <div class="flex items-center gap-3 text-xs text-ink-500">
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-brand-500"></span> Jami</span>
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> To'langan</span>
        </div>
      </div>
      <MakonChart type="bar" :series="paymentSeries" :categories="paymentMonths" :height="200" :colors="['var(--accent)', '#10b981']" :stacked="true" />
    </div>

    <!-- Status tabs + search -->
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5">
        <button v-for="tab in statusTabs" :key="tab.value" @click="activeTab = tab.value" class="px-4 py-2 rounded-lg text-sm font-medium transition-all" :class="activeTab === tab.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500 hover:text-ink-800 dark:hover:text-ink-200'">
          {{ tab.label }}
          <span v-if="tab.count > 0" class="ml-1.5 text-xs" :class="activeTab === tab.value ? 'text-brand-500' : 'text-ink-400'">{{ tab.count }}</span>
        </button>
      </div>
      <div class="relative">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input v-model="search" type="text" placeholder="Invoys yoki ijarachi..." class="w-56 text-sm border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
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
            <tr v-for="inv in filteredInvoices" :key="inv.id" class="border-b border-black/5 dark:border-white/5 hover:bg-brand-500/5 transition-colors cursor-pointer" @click="openInvoice(inv)">
              <td class="px-4 py-3 font-mono text-xs text-ink-700 dark:text-ink-300">{{ inv.number }}</td>
              <td class="px-4 py-3 hidden md:table-cell font-medium text-ink-900 dark:text-white">{{ inv.tenantName }}</td>
              <td class="px-4 py-3 hidden lg:table-cell text-ink-500 font-mono text-xs">{{ inv.contractNumber }}</td>
              <td class="px-4 py-3 hidden md:table-cell text-ink-500">{{ inv.period }}</td>
              <td class="px-4 py-3 text-right font-semibold text-ink-900 dark:text-white">{{ formatUZSShort(inv.amount) }}</td>
              <td class="px-4 py-3 text-right hidden sm:table-cell" :class="inv.balance > 0 ? 'text-red-500 font-medium' : 'text-emerald-500'">
                {{ formatUZSShort(inv.balance) }}
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

    <!-- Invoice Detail Drawer -->
    <DrawerModal :open="!!selectedInvoice" :title="selectedInvoice?.number || ''" width="480px" @close="selectedInvoice = null">
      <div v-if="selectedInvoice" class="space-y-5">
        <div class="flex items-center gap-2">
          <span class="badge" :class="invoiceBadge(selectedInvoice.status)">{{ invoiceLabel(selectedInvoice.status) }}</span>
          <span class="text-xs text-ink-500">{{ selectedInvoice.period }}</span>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm text-ink-500">Ijarachi</span>
            <span class="text-sm font-semibold text-ink-900 dark:text-white">{{ selectedInvoice.tenantName }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-ink-500">Shartnoma</span>
            <span class="text-sm font-mono text-ink-700 dark:text-ink-300">{{ selectedInvoice.contractNumber }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-ink-500">Muddat</span>
            <span class="text-sm text-ink-900 dark:text-white">{{ formatDate(selectedInvoice.dueDate) }}</span>
          </div>
        </div>
        <div class="p-4 rounded-xl bg-black/5 dark:bg-white/5 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-ink-500">Jami summa</span>
            <span class="font-bold text-ink-900 dark:text-white">{{ formatUZSShort(selectedInvoice.amount) }} UZS</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-ink-500">To'langan</span>
            <span class="font-bold text-emerald-500">{{ formatUZSShort(selectedInvoice.paidAmount) }} UZS</span>
          </div>
          <div class="flex justify-between text-sm border-t border-black/5 dark:border-white/5 pt-2">
            <span class="text-ink-500">Qoldiq</span>
            <span class="font-bold" :class="selectedInvoice.balance > 0 ? 'text-red-500' : 'text-emerald-500'">{{ formatUZSShort(selectedInvoice.balance) }} UZS</span>
          </div>
        </div>
        <div class="flex gap-2">
          <button v-if="selectedInvoice.balance > 0" @click="markAsPaid(selectedInvoice)" class="btn btn-primary btn-sm flex-1">
            <CheckCircle2 :size="14" /> To'lovni tasdiqlash
          </button>
          <button @click="exportSingle(selectedInvoice)" class="btn btn-secondary btn-sm flex-1">
            <Download :size="14" /> Yuklab olish
          </button>
        </div>
      </div>
    </DrawerModal>

    <!-- Create Invoice Modal -->
    <DrawerModal :open="showCreateModal" title="Yangi invoys yaratish" width="480px" @close="showCreateModal = false">
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Ijarachi</label>
          <select v-model="newInvoice.tenantName" class="input w-full">
            <option value="">Tanlang...</option>
            <option>ABC Logistics MChJ</option>
            <option>Global Trade MChJ</option>
            <option>Smart Solutions MChJ</option>
            <option>Export Group MChJ</option>
            <option>Logistics Plus</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Shartnoma raqami</label>
            <input v-model="newInvoice.contractNumber" type="text" class="input w-full" placeholder="CTR-2026-001" />
          </div>
          <div>
            <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Davr</label>
            <input v-model="newInvoice.period" type="text" class="input w-full" placeholder="Avg 2026" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Summa (UZS)</label>
            <input v-model.number="newInvoice.amount" type="number" class="input w-full" placeholder="25000000" />
          </div>
          <div>
            <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Muddat</label>
            <input v-model="newInvoice.dueDate" type="date" class="input w-full" />
          </div>
        </div>
      </div>
      <template #footer>
        <button @click="showCreateModal = false" class="btn btn-ghost btn-sm">Bekor qilish</button>
        <button @click="createInvoice" class="btn btn-primary btn-sm btn-glow"><Check :size="14" /> Yaratish</button>
      </template>
    </DrawerModal>
  </div>
</template>

<script setup lang="ts">
import KpiCard from '~/components/KpiCard.vue'
import { Plus, Download, Receipt, CheckCircle2, AlertCircle, Clock, Search, SearchX, Layers, DollarSign, Check } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const search = ref('')
const activeTab = ref('all')
const showCreateModal = ref(false)
const selectedInvoice = ref<any>(null)

interface Invoice {
  id: string; number: string; contractNumber: string; tenantName: string;
  period: string; amount: number; paidAmount: number; balance: number;
  status: 'PAID' | 'UNPAID' | 'PARTIALLY_PAID' | 'OVERDUE' | 'DRAFT' | 'CANCELLED';
  dueDate: string; currency: string;
}

const invoices = ref<Invoice[]>([
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
])

const newInvoice = ref({ tenantName: '', contractNumber: '', period: 'Avg 2026', amount: 0, dueDate: '2026-08-15' })

const statusTabs = computed(() => [
  { label: 'Barchasi', value: 'all', count: invoices.value.length },
  { label: 'To\'langan', value: 'PAID', count: invoices.value.filter(i => i.status === 'PAID').length },
  { label: 'To\'lanmagan', value: 'UNPAID', count: invoices.value.filter(i => i.status === 'UNPAID').length },
  { label: 'Qisman', value: 'PARTIALLY_PAID', count: invoices.value.filter(i => i.status === 'PARTIALLY_PAID').length },
  { label: 'Muddati o\'tgan', value: 'OVERDUE', count: invoices.value.filter(i => i.status === 'OVERDUE').length },
])

const filteredInvoices = computed(() => {
  let result = [...invoices.value]
  if (activeTab.value !== 'all') result = result.filter(i => i.status === activeTab.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(i => i.number.toLowerCase().includes(q) || i.tenantName.toLowerCase().includes(q))
  }
  return result
})

const totalAmount = computed(() => invoices.value.reduce((s, i) => s + i.amount, 0))
const totalPaid = computed(() => invoices.value.reduce((s, i) => s + i.paidAmount, 0))
const totalBalance = computed(() => invoices.value.reduce((s, i) => s + i.balance, 0))
const unpaidCount = computed(() => invoices.value.filter(i => i.balance > 0).length)

const paymentMonths = ['Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg']
const paymentSeries = [
  { name: 'Jami', data: [180, 195, 210, 225, 240, 255] },
  { name: "To'langan", data: [150, 170, 185, 200, 220, 235] },
]

function openInvoice(inv: any) {
  selectedInvoice.value = inv
}

function markAsPaid(inv: any) {
  inv.paidAmount = inv.amount
  inv.balance = 0
  inv.status = 'PAID'
  selectedInvoice.value = null
}

function createInvoice() {
  const num = `INV-2026-${String(invoices.value.length + 53).padStart(3, '0')}`
  invoices.value.unshift({
    id: 'inv' + Date.now(),
    number: num,
    contractNumber: newInvoice.value.contractNumber,
    tenantName: newInvoice.value.tenantName,
    period: newInvoice.value.period,
    amount: newInvoice.value.amount,
    paidAmount: 0,
    balance: newInvoice.value.amount,
    status: 'UNPAID',
    dueDate: newInvoice.value.dueDate,
    currency: 'UZS'
  })
  showCreateModal.value = false
  newInvoice.value = { tenantName: '', contractNumber: '', period: 'Avg 2026', amount: 0, dueDate: '2026-08-15' }
}

function exportCSV() {
  const headers = 'Raqam,Ijarachi,Shartnoma,Davr,Summa,To\'langan,Qoldiq,Status,Muddat\n'
  const rows = filteredInvoices.value.map(i => `${i.number},${i.tenantName},${i.contractNumber},${i.period},${i.amount},${i.paidAmount},${i.balance},${i.status},${i.dueDate}`).join('\n')
  const blob = new Blob([headers + rows], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'invoyslar.csv'
  a.click()
}

function exportSingle(inv: any) {
  alert(`${inv.number} yuklab olindi`)
}


function invoiceLabel(s: string) {
  return { PAID: "To'langan", UNPAID: "To'lanmagan", PARTIALLY_PAID: 'Qisman', OVERDUE: "Muddati o'tgan", DRAFT: 'Qoralama', CANCELLED: 'Bekor' }[s] || s
}
function invoiceBadge(s: string) {
  return { PAID: 'badge-success', UNPAID: 'badge-warning', PARTIALLY_PAID: 'badge-brand', OVERDUE: 'badge-danger', DRAFT: 'badge-neutral', CANCELLED: 'badge-neutral' }[s] || 'badge-neutral'
}
</script>
