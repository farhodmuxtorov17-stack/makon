<template>
  <div class="space-y-6">
    <PageHeader title="Arizalar" :subtitle="`${filtered.length} ta ariza`">
      <template #actions>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Yangi ariza</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon="ClipboardList" :value="String(submitted)" label="Yangi" iconBg="bg-brand-50" iconColor="text-brand-600" />
      <StatCard icon="Clock" :value="String(reviewing)" label="Tekshiruvda" iconBg="bg-amber-50" iconColor="text-amber-600" />
      <StatCard icon="CheckCircle2" :value="String(approved)" label="Tasdiqlangan" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
      <StatCard icon="XCircle" :value="String(rejected)" label="Rad etilgan" iconBg="bg-rose-50" iconColor="text-rose-600" />
    </div>

    <div class="flex gap-2 flex-wrap">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
        :class="activeTab === tab.id ? 'bg-ink-900 text-white shadow-sm' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'">
        {{ tab.label }} <span class="ml-1.5 text-xs opacity-60">{{ tab.count }}</span>
      </button>
    </div>

    <TableSkeleton v-if="loading" :rows="6" :cols="5" />
    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Nomer</th>
              <th>Ariza beruvchi</th>
              <th>Turi</th>
              <th class="text-right">Summa</th>
              <th>Sana</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="app in paginated" :key="app.id" class="table-row-hover" @click="navigateTo(`/applications/${app.id}`)">
              <td class="font-mono font-semibold">{{ app.number }}</td>
              <td>
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0">
                    <span class="text-xs font-bold text-white">{{ initials(app.applicantName) }}</span>
                  </div>
                  <span class="font-medium">{{ app.applicantName }}</span>
                </div>
              </td>
              <td><span class="badge badge-neutral">{{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</span></td>
              <td class="text-right font-semibold">{{ formatPriceShort(app.offeredPrice) }}</td>
              <td class="text-ink-500 text-xs">{{ formatDate(app.createdAt) }}</td>
              <td><StatusBadge :status="app.status" :variant="appVariant(app.status)" :label="appLabel(app.status)" dot /></td>
              <td><ChevronRight :size="16" class="text-ink-300" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Pagination :page="page" :per-page="perPage" :total="filtered.length" @update:page="page = $event" />

    <BaseModal v-model="showNew" title="Yangi ariza">
      <div class="space-y-4">
        <div>
          <label class="label">Ariza beruvchi</label>
          <input v-model="newApp.applicantName" class="input" placeholder="F.I.O" />
          <p v-if="errors.applicantName" class="text-xs text-rose-500 mt-1">{{ errors.applicantName }}</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label">Turi</label>
            <select v-model="newApp.type" class="input"><option value="RENT">Ijara</option><option value="SALE">Sotuv</option></select>
          </div>
          <div>
            <label class="label">Summa (so'm/oy)</label>
            <input v-model.number="newApp.offeredPrice" type="number" class="input" placeholder="0" />
            <p v-if="errors.offeredPrice" class="text-xs text-rose-500 mt-1">{{ errors.offeredPrice }}</p>
          </div>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-lg" @click="showNew = false">Bekor</button>
        <button class="btn btn-primary btn-lg" @click="createApp">Yuborish</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Plus, ClipboardList, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-vue-next'
import Pagination from '~/components/ui/Pagination.vue'
import TableSkeleton from '~/components/ui/TableSkeleton.vue'
import type { ApplicationStatus } from '~/types'

const financeStore = useFinanceStore()
const toast = useToast()
const { formatDate, formatPriceShort, initials } = useFormat()

onMounted(async () => {
  loading.value = true
  await financeStore.initMockData()
  setTimeout(() => loading.value = false, 400)
})

const loading = ref(true)
const showNew = ref(false)
const activeTab = ref('all')
const page = ref(1)
const perPage = 10
const newApp = reactive({ applicantName: '', type: 'RENT', offeredPrice: 0 })
const errors = reactive<Record<string, string>>({})

const submitted = computed(() => financeStore.applications.filter(a => a.status === 'SUBMITTED').length)
const reviewing = computed(() => financeStore.applications.filter(a => a.status === 'FINANCE_REVIEW' || a.status === 'OFFER_SENT').length)
const approved = computed(() => financeStore.applications.filter(a => a.status === 'APPROVED').length)
const rejected = computed(() => financeStore.applications.filter(a => a.status === 'REJECTED').length)

const tabs = computed(() => [
  { id: 'all', label: 'Hammasi', count: financeStore.applications.length },
  { id: 'SUBMITTED', label: 'Yangi', count: submitted.value },
  { id: 'FINANCE_REVIEW', label: 'Tekshiruvda', count: reviewing.value },
  { id: 'APPROVED', label: 'Tasdiqlangan', count: approved.value },
  { id: 'REJECTED', label: 'Rad', count: rejected.value },
])

const filtered = computed(() => {
  if (activeTab.value === 'all') return financeStore.applications
  return financeStore.applications.filter(a => a.status === activeTab.value)
})

const paginated = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

function validate(): boolean {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!newApp.applicantName) errors.applicantName = 'Ism kiritilishi shart'
  if (!newApp.offeredPrice || newApp.offeredPrice <= 0) errors.offeredPrice = "Summa 0 dan katta bo'lishi kerak"
  return Object.keys(errors).length === 0
}

function createApp() {
  if (!validate()) { toast.error("Ma'lumot to'liq emas"); return }
  const number = `APP-2025-${String(financeStore.applications.length + 1).padStart(3, '0')}`
  financeStore.applications.unshift({
    id: `app${Date.now()}`, number, applicantName: newApp.applicantName, type: newApp.type,
    offeredPrice: newApp.offeredPrice, status: 'SUBMITTED', createdAt: new Date().toISOString(),
  } as any)
  toast.success('Yuborildi', number)
  showNew.value = false
  Object.assign(newApp, { applicantName: '', type: 'RENT', offeredPrice: 0 })
}

function appLabel(s: ApplicationStatus) {
  return { SUBMITTED: 'Yangi', FINANCE_REVIEW: 'Tekshiruv', OFFER_SENT: 'Taklif', CONTRACT_SIGNING: 'Shartnoma', APPROVED: 'Tasdiqlandi', REJECTED: 'Rad', CANCELLED: 'Bekor', DRAFT: 'Qoralama', ERI_SIGNING: 'ERI' }[s] || s
}
function appVariant(s: ApplicationStatus) {
  return { SUBMITTED: 'info', FINANCE_REVIEW: 'warning', OFFER_SENT: 'info', CONTRACT_SIGNING: 'warning', APPROVED: 'success', REJECTED: 'danger', CANCELLED: 'neutral', DRAFT: 'neutral', ERI_SIGNING: 'warning' }[s] || 'neutral'
}
</script>
