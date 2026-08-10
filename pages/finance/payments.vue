<template>
  <div class="space-y-6">
    <PageHeader title="To'lovlar" :subtitle="`${filtered.length} ta to'lov`">
      <template #actions>
        <button class="btn btn-outline btn-sm" @click="exportCSV"><Download :size="16" /> Eksport</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon="Wallet" :value="formatPriceShort(totalAmount)" label="Jami to'lov" iconBg="bg-brand-50" iconColor="text-brand-600" :trend="`+12.5%`" :trendUp="true" :sparkline="[80,85,92,98,103,112,118]" sparkColor="#6366f1" />
      <StatCard icon="CheckCircle2" :value="String(completed)" label="Yakunlangan" iconBg="bg-emerald-50" iconColor="text-emerald-600" :sparkline="[5,6,7,8,9,10,11]" sparkColor="#10b981" />
      <StatCard icon="Clock" :value="String(pending)" label="Kutilmoqda" iconBg="bg-amber-50" iconColor="text-amber-600" :sparkline="[2,1,3,2,1,2,1]" sparkColor="#f59e0b" />
      <StatCard icon="XCircle" :value="String(failed)" label="Rad" iconBg="bg-rose-50" iconColor="text-rose-600" :sparkline="[1,0,1,0,1,0,1]" sparkColor="#f43f5e" />
    </div>

    <div class="card p-4">
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input v-model="search" class="input pl-10" placeholder="Nomer, ijarachi..." />
        </div>
        <select v-model="filterMethod" class="input w-auto">
          <option value="">Usul: Hammasi</option>
          <option value="CLICK">Click</option>
          <option value="PAYME">Payme</option>
          <option value="BANK_TRANSFER">Bank o'tkazma</option>
          <option value="CASH">Naqd</option>
        </select>
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
              <th>Invoys</th>
              <th>Ijarachi</th>
              <th @click="sortBy('amount')" class="cursor-pointer hover:text-ink-700 text-right">
                <span class="inline-flex items-center gap-1">Summa <ArrowUpDown :size="12" :class="sortKey === 'amount' ? 'text-brand-500' : 'text-ink-300'" /></span>
              </th>
              <th>Usul</th>
              <th>Sana</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in paginated" :key="p.id" class="table-row-hover">
              <td class="font-mono font-semibold">{{ p.number }}</td>
              <td class="text-ink-500">{{ p.invoiceNumber }}</td>
              <td>{{ p.payerName }}</td>
              <td class="text-right font-semibold">{{ formatPriceShort(p.amount) }}</td>
              <td><span class="badge badge-neutral">{{ methodLabel(p.method) }}</span></td>
              <td class="text-ink-500 text-xs">{{ formatDate(p.paymentDate) }}</td>
              <td><StatusBadge :status="p.status" :variant="paymentVariant(p.status)" :label="statusLabel(p.status)" dot /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Pagination :page="page" :per-page="perPage" :total="filtered.length" @update:page="page = $event" />
  </div>
</template>

<script setup lang="ts">
import { Download, Search, Wallet, CheckCircle2, Clock, XCircle, ArrowUpDown } from 'lucide-vue-next'
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
const search = ref('')
const filterMethod = ref('')
const filterStatus = ref('')
const sortKey = ref('number')
const sortDir = ref(1)
const page = ref(1)
const perPage = 10

const statuses = ['COMPLETED', 'PENDING', 'FAILED', 'REFUNDED']

const totalAmount = computed(() => financeStore.payments.filter(p => p.status === 'COMPLETED').reduce((s, p) => s + p.amount, 0))
const completed = computed(() => financeStore.payments.filter(p => p.status === 'COMPLETED').length)
const pending = computed(() => financeStore.payments.filter(p => p.status === 'PENDING').length)
const failed = computed(() => financeStore.payments.filter(p => p.status === 'FAILED').length)

const filtered = computed(() => {
  let list = financeStore.payments
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.number.toLowerCase().includes(q) || p.payerName?.toLowerCase().includes(q) || p.invoiceNumber?.toLowerCase().includes(q))
  }
  if (filterMethod.value) list = list.filter(p => p.method === filterMethod.value)
  if (filterStatus.value) list = list.filter(p => p.status === filterStatus.value)
  list = [...list].sort((a, b) => {
    const av = (a as any)[sortKey.value], bv = (b as any)[sortKey.value]
    if (typeof av === 'number') return (av - bv) * sortDir.value
    return String(av).localeCompare(String(bv)) * sortDir.value
  })
  return list
})

const paginated = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

function sortBy(key: string) { if (sortKey.value === key) sortDir.value *= -1; else { sortKey.value = key; sortDir.value = 1 } }
function statusLabel(s: string) { return { COMPLETED: 'Yakunlangan', PENDING: 'Kutilmoqda', FAILED: 'Rad', REFUNDED: 'Qaytarilgan' }[s] || s }
function paymentVariant(s: string) { return { COMPLETED: 'success', PENDING: 'warning', FAILED: 'danger', REFUNDED: 'neutral' }[s] || 'neutral' }
function methodLabel(m: string) { return { CLICK: 'Click', PAYME: 'Payme', BANK_TRANSFER: 'Bank', CASH: 'Naqd' }[m] || m }
function exportCSV() { toast.success('Eksport', 'CSV yuklab olinmoqda') }
</script>
