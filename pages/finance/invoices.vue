<template>
  <div class="space-y-6">
    <PageHeader title="Invoyslar" :subtitle="`${filtered.length} ta invoys`">
      <template #actions>
        <button class="btn btn-outline btn-sm" @click="exportCSV"><Download :size="16" /> Eksport</button>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Yangi invoys</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon="FileText" :value="String(total)" label="Jami" iconBg="bg-brand-50" iconColor="text-brand-600" />
      <StatCard icon="CheckCircle2" :value="String(paid)" label="To'langan" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
      <StatCard icon="Clock" :value="String(pending)" label="Kutilmoqda" iconBg="bg-amber-50" iconColor="text-amber-600" />
      <StatCard icon="AlertTriangle" :value="String(overdue)" label="Muddati o'tgan" iconBg="bg-rose-50" iconColor="text-rose-600" />
    </div>

    <div class="card p-4">
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input v-model="search" class="input pl-10" placeholder="Nomer, kontrakt..." />
        </div>
        <select v-model="filterStatus" class="input w-auto">
          <option value="">Status: Hammasi</option>
          <option v-for="s in statuses" :key="s" :value="s">{{ statusLabel(s) }}</option>
        </select>
      </div>
    </div>

    <TableSkeleton v-if="loading" :rows="8" :cols="6" />
    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th @click="sortBy('number')" class="cursor-pointer hover:text-ink-700">
                <span class="inline-flex items-center gap-1">Nomer <ArrowUpDown :size="12" :class="sortKey === 'number' ? 'text-brand-500' : 'text-ink-300'" /></span>
              </th>
              <th>Kontrakt</th>
              <th>Turi</th>
              <th @click="sortBy('amount')" class="cursor-pointer hover:text-ink-700 text-right">
                <span class="inline-flex items-center gap-1">Summa <ArrowUpDown :size="12" :class="sortKey === 'amount' ? 'text-brand-500' : 'text-ink-300'" /></span>
              </th>
              <th>Muddat</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in paginated" :key="inv.id" class="table-row-hover">
              <td class="font-mono font-semibold">{{ inv.number }}</td>
              <td class="text-ink-500">{{ inv.contractNumber }}</td>
              <td><span class="badge badge-neutral">{{ inv.type === 'RENT' ? 'Ijara' : 'Servis' }}</span></td>
              <td class="text-right font-semibold">{{ formatPriceShort(inv.amount) }}</td>
              <td class="text-ink-500 text-xs">{{ formatDate(inv.dueDate) }}</td>
              <td><StatusBadge :status="inv.status" :variant="invoiceVariant(inv.status)" :label="statusLabel(inv.status)" dot /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Pagination :page="page" :per-page="perPage" :total="filtered.length" @update:page="page = $event" />

    <BaseModal v-model="showNew" title="Yangi invoys">
      <div class="space-y-4">
        <div>
          <label class="label">Kontrakt</label>
          <select v-model="newInv.contractId" class="input">
            <option value="">Tanlang</option>
            <option v-for="c in financeStore.contracts.filter(c => c.status === 'ACTIVE')" :key="c.id" :value="c.id">{{ c.number }} — {{ c.tenant }}</option>
          </select>
          <p v-if="errors.contractId" class="text-xs text-rose-500 mt-1">{{ errors.contractId }}</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label">Turi</label>
            <select v-model="newInv.type" class="input"><option value="RENT">Ijara</option><option value="SERVICE">Servis</option><option value="UTILITY">Kommunal</option></select>
          </div>
          <div>
            <label class="label">Muddat</label>
            <input v-model="newInv.dueDate" type="date" class="input" />
            <p v-if="errors.dueDate" class="text-xs text-rose-500 mt-1">{{ errors.dueDate }}</p>
          </div>
        </div>
        <div>
          <label class="label">Summa (so'm)</label>
          <input v-model.number="newInv.amount" type="number" class="input" placeholder="0" />
          <p v-if="errors.amount" class="text-xs text-rose-500 mt-1">{{ errors.amount }}</p>
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
import { Plus, Download, Search, FileText, CheckCircle2, Clock, AlertTriangle, ArrowUpDown } from 'lucide-vue-next'
import Pagination from '~/components/ui/Pagination.vue'
import TableSkeleton from '~/components/ui/TableSkeleton.vue'

const financeStore = useFinanceStore()
const toast = useToast()
const { formatDate, formatPriceShort } = useFormat()

onMounted(async () => {
  loading.value = true
  await financeStore.initMockData()
  setTimeout(() => loading.value = false, 400)
})

const loading = ref(true)
const showNew = ref(false)
const search = ref('')
const filterStatus = ref('')
const sortKey = ref('number')
const sortDir = ref(1)
const page = ref(1)
const perPage = 10

const statuses = ['PENDING', 'PAID', 'OVERDUE', 'PARTIALLY_PAID', 'CANCELLED']
const newInv = reactive({ contractId: '', type: 'RENT', dueDate: '', amount: 0 })
const errors = reactive<Record<string, string>>({})

const total = computed(() => financeStore.invoices.length)
const paid = computed(() => financeStore.invoices.filter(i => i.status === 'PAID').length)
const pending = computed(() => financeStore.invoices.filter(i => i.status === 'PENDING').length)
const overdue = computed(() => financeStore.invoices.filter(i => i.status === 'OVERDUE').length)

const filtered = computed(() => {
  let list = financeStore.invoices
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(i => i.number.toLowerCase().includes(q) || i.contractNumber?.toLowerCase().includes(q))
  }
  if (filterStatus.value) list = list.filter(i => i.status === filterStatus.value)
  list = [...list].sort((a, b) => {
    const av = (a as any)[sortKey.value], bv = (b as any)[sortKey.value]
    if (typeof av === 'number') return (av - bv) * sortDir.value
    return String(av).localeCompare(String(bv)) * sortDir.value
  })
  return list
})
const paginated = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

function sortBy(key: string) { if (sortKey.value === key) sortDir.value *= -1; else { sortKey.value = key; sortDir.value = 1 } }
function statusLabel(s: string) { return { PENDING: 'Kutilmoqda', PAID: "To'langan", OVERDUE: "Muddati o'tgan", PARTIALLY_PAID: "Qisman to'langan", CANCELLED: 'Bekor' }[s] || s }
function invoiceVariant(s: string) { return { PENDING: 'warning', PAID: 'success', OVERDUE: 'danger', PARTIALLY_PAID: 'warning', CANCELLED: 'neutral' }[s] || 'neutral' }
function exportCSV() { toast.success('Eksport', 'CSV yuklab olinmoqda') }

function validate(): boolean {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!newInv.contractId) errors.contractId = 'Kontrakt tanlang'
  if (!newInv.dueDate) errors.dueDate = 'Muddat tanlang'
  if (!newInv.amount || newInv.amount <= 0) errors.amount = "Summa 0 dan katta bo'lishi kerak"
  return Object.keys(errors).length === 0
}

function createInvoice() {
  if (!validate()) { toast.error("Ma'lumot to'liq emas"); return }
  const contract = financeStore.contracts.find(c => c.id === newInv.contractId)
  const number = `INV-2025-${String(financeStore.invoices.length + 1).padStart(3, '0')}`
  financeStore.invoices.unshift({
    id: `inv${Date.now()}`, number, contractId: newInv.contractId, contractNumber: contract?.number,
    type: newInv.type, amount: newInv.amount, dueDate: newInv.dueDate, status: 'PENDING',
  } as any)
  toast.success('Yaratildi', number)
  showNew.value = false
  Object.assign(newInv, { contractId: '', type: 'RENT', dueDate: '', amount: 0 })
}
</script>
