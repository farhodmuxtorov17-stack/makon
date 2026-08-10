<template>
  <div class="space-y-6">
    <PageHeader title="Invoyslar" subtitle="To'lov hujjatlari va ularning statuslari">
      <template #actions>
        <div class="relative">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input v-model="search" type="text" placeholder="Qidirish..." class="input pl-9 w-64" />
        </div>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Yaratish</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon="FileText" :value="String(financeStore.invoices.length)" label="Jami invoyslar" iconBg="bg-brand-50" iconColor="text-brand-600" />
      <StatCard icon="CheckCircle2" :value="String(paidCount)" label="To'langan" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
      <StatCard icon="Clock" :value="String(pendingCount)" label="Kutilmoqda" iconBg="bg-amber-50" iconColor="text-amber-600" />
      <StatCard icon="AlertTriangle" :value="String(overdueCount)" label="Muddati o'tdi" iconBg="bg-rose-50" iconColor="text-rose-600" />
    </div>

    <div class="flex gap-2 flex-wrap">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
        :class="activeTab === tab.id ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'">
        {{ tab.label }} <span class="ml-1.5 text-xs opacity-60">{{ tab.count }}</span>
      </button>
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Invoys №</th>
              <th>Shartnoma</th>
              <th>Davr</th>
              <th>Summa</th>
              <th>To'langan</th>
              <th>Qoldi</th>
              <th>Muddat</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in filteredInvoices" :key="inv.id" class="table-row-hover">
              <td class="font-mono font-semibold text-ink-900">{{ inv.number }}</td>
              <td class="font-mono text-sm">{{ contractNumber(inv.contractId) }}</td>
              <td><span class="badge badge-neutral">{{ inv.period }}</span></td>
              <td class="font-semibold">{{ formatPrice(inv.amount) }}</td>
              <td class="text-emerald-600 font-medium">{{ formatPrice(inv.paidAmount) }}</td>
              <td class="font-medium" :class="inv.amount - inv.paidAmount > 0 ? 'text-rose-600' : 'text-ink-400'">
                {{ formatPrice(inv.amount - inv.paidAmount) }}
              </td>
              <td class="text-ink-500 text-sm">{{ inv.dueDate }}</td>
              <td><StatusBadge :status="inv.status" :variant="invoiceVariant(inv.status)" :label="invoiceLabel(inv.status)" dot /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="filteredInvoices.length === 0" class="p-12">
        <BaseEmptyState title="Invoyslar topilmadi" />
      </div>
    </div>

    <BaseModal v-model="showNew" title="Invoys yaratish">
      <div class="space-y-4">
        <div>
          <label class="label">Shartnoma</label>
          <select v-model="newInvoice.contractId" class="input">
            <option v-for="c in financeStore.contracts" :key="c.id" :value="c.id">{{ c.number }} — {{ c.tenantName }}</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label">Davr</label>
            <input v-model="newInvoice.period" class="input" type="month" />
          </div>
          <div>
            <label class="label">Summa (so'm)</label>
            <input v-model="newInvoice.amount" class="input" type="number" placeholder="0" />
          </div>
        </div>
        <div>
          <label class="label">To'lov muddati</label>
          <input v-model="newInvoice.dueDate" class="input" type="date" />
        </div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-lg" @click="showNew = false">Bekor</button>
        <button class="btn btn-primary btn-lg" @click="createInvoice">Yaratish</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-vue-next'
import type { InvoiceStatus } from '~/types'

const financeStore = useFinanceStore()
const toast = useToast()
onMounted(() => financeStore.initMockData())

const search = ref('')
const activeTab = ref('all')
const showNew = ref(false)

const newInvoice = reactive({ contractId: '', period: '', amount: 0, dueDate: '' })

const paidCount = computed(() => financeStore.invoices.filter(i => i.status === 'PAID').length)
const pendingCount = computed(() => financeStore.invoices.filter(i => i.status === 'PENDING').length)
const overdueCount = computed(() => financeStore.invoices.filter(i => i.status === 'OVERDUE').length)

const tabs = computed(() => [
  { id: 'all', label: 'Hammasi', count: financeStore.invoices.length },
  { id: 'PAID', label: 'To\'langan', count: paidCount.value },
  { id: 'PENDING', label: 'Kutilmoqda', count: pendingCount.value },
  { id: 'OVERDUE', label: 'Muddati o\'tdi', count: overdueCount.value },
  { id: 'PARTIAL', label: 'Qisman', count: financeStore.invoices.filter(i => i.status === 'PARTIAL').length },
])

const filteredInvoices = computed(() => {
  let result = financeStore.invoices
  if (activeTab.value !== 'all') result = result.filter(i => i.status === activeTab.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(i => i.number.toLowerCase().includes(q))
  }
  return result
})

function createInvoice() {
  if (!newInvoice.contractId || !newInvoice.amount) {
    toast.error("Ma'lumot to'liq emas", 'Shartnoma va summa kerak')
    return
  }
  toast.success('Invoys yaratildi', formatPrice(Number(newInvoice.amount)) + ' so\'m')
  showNew.value = false
  Object.assign(newInvoice, { contractId: '', period: '', amount: 0, dueDate: '' })
}

function contractNumber(id: string) { return financeStore.contracts.find(c => c.id === id)?.number || '—' }
function formatPrice(v: number) { return v >= 1000000 ? (v / 1000000).toFixed(1) + ' mln' : v === 0 ? '—' : v.toLocaleString('ru') }
function invoiceLabel(s: InvoiceStatus): string {
  return { PENDING: 'Kutilmoqda', PARTIAL: 'Qisman', PAID: 'To\'langan', OVERDUE: 'Muddati o\'tdi', CANCELLED: 'Bekor' }[s] || s
}
function invoiceVariant(s: InvoiceStatus): string {
  return { PENDING: 'warning', PARTIAL: 'info', PAID: 'success', OVERDUE: 'danger', CANCELLED: 'neutral' }[s] || 'neutral'
}
</script>
