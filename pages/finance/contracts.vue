<template>
  <div class="space-y-6">
    <PageHeader title="Shartnomalar" :subtitle="`${filtered.length} ta shartnoma`">
      <template #actions>
        <button class="btn btn-outline btn-sm" @click="exportCSV"><Download :size="16" /> Eksport</button>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Yangi shartnoma</button>
      </template>
    </PageHeader>

    <!-- Filters -->
    <div class="card p-4">
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input v-model="search" class="input pl-10" placeholder="Qidirish: nomer, ijarachi..." />
        </div>
        <select v-model="filterStatus" class="input w-auto">
          <option value="">Status: Hammasi</option>
          <option v-for="s in statuses" :key="s" :value="s">{{ statusLabel(s) }}</option>
        </select>
        <select v-model="filterBuilding" class="input w-auto">
          <option value="">Bino: Hammasi</option>
          <option v-for="b in buildings" :key="b">{{ b }}</option>
        </select>
        <button class="btn btn-ghost btn-sm" v-if="search || filterStatus || filterBuilding" @click="clearFilters">
          <X :size="14" /> Tozalash
        </button>
      </div>
    </div>

    <!-- Table -->
    <TableSkeleton v-if="loading" :rows="8" :cols="6" />
    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th @click="sortBy('number')" class="cursor-pointer hover:text-ink-700 transition-colors">
                <span class="inline-flex items-center gap-1">Nomer <ArrowUpDown :size="12" :class="sortKey === 'number' ? 'text-brand-500' : 'text-ink-300'" /></span>
              </th>
              <th @click="sortBy('tenant')" class="cursor-pointer hover:text-ink-700 transition-colors">
                <span class="inline-flex items-center gap-1">Ijarachi <ArrowUpDown :size="12" :class="sortKey === 'tenant' ? 'text-brand-500' : 'text-ink-300'" /></span>
              </th>
              <th>Bino</th>
              <th>Turi</th>
              <th @click="sortBy('amount')" class="cursor-pointer hover:text-ink-700 transition-colors text-right">
                <span class="inline-flex items-center gap-1">Summa <ArrowUpDown :size="12" :class="sortKey === 'amount' ? 'text-brand-500' : 'text-ink-300'" /></span>
              </th>
              <th>Davr</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in paginated" :key="c.id" class="table-row-hover" @click="navigateTo(`/finance/contracts/${c.id}`)">
              <td class="font-mono font-semibold text-ink-900">{{ c.number }}</td>
              <td>{{ c.tenant }}</td>
              <td class="text-ink-500">{{ c.building }}</td>
              <td><span class="badge badge-neutral">{{ c.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</span></td>
              <td class="text-right font-semibold">{{ formatPriceShort(c.amount) }}</td>
              <td class="text-ink-500 text-xs">{{ formatDate(c.startDate) }} → {{ formatDate(c.endDate) }}</td>
              <td><StatusBadge :status="c.status" :variant="contractVariant(c.status)" :label="statusLabel(c.status)" dot /></td>
              <td><button class="btn-ghost btn-icon btn-sm" @click.stop><MoreHorizontal :size="16" /></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Pagination :page="page" :per-page="perPage" :total="filtered.length" @update:page="page = $event" />

    <!-- New contract modal -->
    <BaseModal v-model="showNew" title="Yangi shartnoma">
      <div class="space-y-4">
        <div>
          <label class="label">Ijarachi</label>
          <input v-model="newContract.tenant" class="input" placeholder="F.I.O yoki tashkilot" />
          <p v-if="errors.tenant" class="text-xs text-rose-500 mt-1">{{ errors.tenant }}</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label">Bino</label>
            <select v-model="newContract.building" class="input">
              <option value="">Tanlang</option>
              <option v-for="b in buildings" :key="b" :value="b">{{ b }}</option>
            </select>
            <p v-if="errors.building" class="text-xs text-rose-500 mt-1">{{ errors.building }}</p>
          </div>
          <div>
            <label class="label">Turi</label>
            <select v-model="newContract.type" class="input">
              <option value="RENT">Ijara</option>
              <option value="SALE">Sotuv</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label">Boshlanish</label>
            <input v-model="newContract.startDate" type="date" class="input" />
            <p v-if="errors.startDate" class="text-xs text-rose-500 mt-1">{{ errors.startDate }}</p>
          </div>
          <div>
            <label class="label">Tugash</label>
            <input v-model="newContract.endDate" type="date" class="input" />
            <p v-if="errors.endDate" class="text-xs text-rose-500 mt-1">{{ errors.endDate }}</p>
          </div>
        </div>
        <div>
          <label class="label">Oylik to'lov (so'm)</label>
          <input v-model.number="newContract.amount" type="number" class="input" placeholder="0" />
          <p v-if="errors.amount" class="text-xs text-rose-500 mt-1">{{ errors.amount }}</p>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-lg" @click="showNew = false">Bekor</button>
        <button class="btn btn-primary btn-lg" @click="createContract">Yaratish</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { Plus, Download, Search, X, MoreHorizontal, ArrowUpDown } from 'lucide-vue-next'
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
const filterBuilding = ref('')
const sortKey = ref('number')
const sortDir = ref(1)
const page = ref(1)
const perPage = 10

const statuses = ['ACTIVE', 'PENDING_SIGN', 'EXPIRING', 'EXPIRED', 'TERMINATED', 'DRAFT']
const buildings = ['Trilliant Tower', 'Tashkent City IBC', 'IT Park', 'Piramit Tower', 'Crystal Plaza']

const newContract = reactive({ tenant: '', building: '', type: 'RENT', startDate: '', endDate: '', amount: 0 })
const errors = reactive<Record<string, string>>({})

const filtered = computed(() => {
  let list = financeStore.contracts
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(c => c.number.toLowerCase().includes(q) || c.tenant.toLowerCase().includes(q) || c.building.toLowerCase().includes(q))
  }
  if (filterStatus.value) list = list.filter(c => c.status === filterStatus.value)
  if (filterBuilding.value) list = list.filter(c => c.building === filterBuilding.value)
  list = [...list].sort((a, b) => {
    const av = (a as any)[sortKey.value], bv = (b as any)[sortKey.value]
    if (typeof av === 'number') return (av - bv) * sortDir.value
    return String(av).localeCompare(String(bv)) * sortDir.value
  })
  return list
})

const paginated = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

function sortBy(key: string) {
  if (sortKey.value === key) sortDir.value *= -1
  else { sortKey.value = key; sortDir.value = 1 }
}

function clearFilters() {
  search.value = ''; filterStatus.value = ''; filterBuilding.value = ''
}

function validate(): boolean {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!newContract.tenant) errors.tenant = 'Ijarachi kiritilishi shart'
  if (!newContract.building) errors.building = 'Bino tanlang'
  if (!newContract.startDate) errors.startDate = 'Sana tanlang'
  if (!newContract.endDate) errors.endDate = 'Sana tanlang'
  if (newContract.startDate && newContract.endDate && newContract.startDate > newContract.endDate) errors.endDate = "Tugash sanasi boshlanishdan keyin bo'lishi kerak"
  if (!newContract.amount || newContract.amount <= 0) errors.amount = "Summa 0 dan katta bo'lishi kerak"
  return Object.keys(errors).length === 0
}

function createContract() {
  if (!validate()) { toast.error("Ma'lumot to'liq emas", 'Formani tekshiring'); return }
  const number = `CTR-2025-${String(financeStore.contracts.length + 1).padStart(3, '0')}`
  financeStore.contracts.unshift({
    id: `c${Date.now()}`, number, tenant: newContract.tenant, building: newContract.building,
    type: newContract.type, amount: newContract.amount, status: 'DRAFT',
    startDate: newContract.startDate, endDate: newContract.endDate,
  } as any)
  toast.success('Yaratildi', `${number} shartnoma yaratildi`)
  showNew.value = false
  Object.assign(newContract, { tenant: '', building: '', type: 'RENT', startDate: '', endDate: '', amount: 0 })
}

function statusLabel(s: string) {
  return { ACTIVE: 'Aktiv', PENDING_SIGN: 'Imzo kutilmoqda', SIGNED: 'Imzolangan', EXPIRING: 'Tugayotgan', EXPIRED: 'Tugagan', TERMINATED: 'Bekor qilingan', DRAFT: 'Qoralama' }[s] || s
}
function contractVariant(s: string) {
  return { ACTIVE: 'success', PENDING_SIGN: 'warning', SIGNED: 'info', EXPIRING: 'warning', EXPIRED: 'danger', TERMINATED: 'danger', DRAFT: 'neutral' }[s] || 'neutral'
}
function exportCSV() { toast.success('Eksport', 'CSV fayl yuklab olinmoqda') }
</script>
