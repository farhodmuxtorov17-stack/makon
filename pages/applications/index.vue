<template>
  <div class="space-y-6">
    <PageHeader title="Arizalar" subtitle="Ijara va sotuv uchun arizalar">
      <template #actions>
        <div class="relative">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input v-model="search" type="text" placeholder="Qidirish..." class="input pl-9 w-64" />
        </div>
      </template>
    </PageHeader>

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
              <th>№</th>
              <th>Ariza beruvchi</th>
              <th>Telefon</th>
              <th>Turi</th>
              <th>Taklif narx</th>
              <th>Status</th>
              <th>Sana</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="app in filteredApps" :key="app.id" class="cursor-pointer hover:bg-ink-50/50 transition-colors" @click="$router.push(`/applications/${app.id}`)">
              <td class="font-mono font-semibold text-ink-900">{{ app.number }}</td>
              <td>
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-xs font-bold text-white">
                    {{ app.applicantName.split(' ').map((w: string) => w[0]).join('').slice(0, 2) }}
                  </div>
                  <span class="font-medium">{{ app.applicantName }}</span>
                </div>
              </td>
              <td class="text-ink-500 text-sm">{{ app.applicantPhone }}</td>
              <td><span class="badge" :class="app.type === 'RENT' ? 'badge-info' : 'badge-warning'">{{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</span></td>
              <td class="font-semibold">{{ formatPrice(app.offeredPrice) }} <span class="text-ink-400 text-xs font-normal">so'm</span></td>
              <td><StatusBadge :status="app.status" :variant="statusVariant(app.status)" :label="statusLabel(app.status)" dot /></td>
              <td class="text-ink-400 text-sm">{{ app.createdAt.split('T')[0] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="filteredApps.length === 0" class="p-12">
        <BaseEmptyState title="Arizalar topilmadi" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import type { ApplicationStatus } from '~/types'

const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

const search = ref('')
const activeTab = ref('all')

const tabs = computed(() => [
  { id: 'all', label: 'Hammasi', count: financeStore.applications.length },
  { id: 'SUBMITTED', label: 'Yangi', count: financeStore.applications.filter(a => a.status === 'SUBMITTED').length },
  { id: 'FINANCE_REVIEW', label: 'Tekshiruvda', count: financeStore.applications.filter(a => a.status === 'FINANCE_REVIEW').length },
  { id: 'OFFER_SENT', label: 'Taklif yuborildi', count: financeStore.applications.filter(a => a.status === 'OFFER_SENT').length },
  { id: 'CONTRACT_SIGNING', label: 'Shartnoma', count: financeStore.applications.filter(a => a.status === 'CONTRACT_SIGNING').length },
])

const filteredApps = computed(() => {
  let result = financeStore.applications
  if (activeTab.value !== 'all') result = result.filter(a => a.status === activeTab.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(a => a.number.toLowerCase().includes(q) || a.applicantName.toLowerCase().includes(q))
  }
  return result
})

function formatPrice(v: number) {
  if (v >= 1000000000) return (v / 1000000000).toFixed(1) + ' mlrd'
  if (v >= 1000000) return (v / 1000000).toFixed(0) + ' mln'
  return v.toLocaleString('ru')
}

function statusLabel(s: ApplicationStatus): string {
  const m: Record<string, string> = { SUBMITTED: 'Yangi', FINANCE_REVIEW: 'Tekshiruvda', OFFER_SENT: 'Taklif yuborildi', CONTRACT_SIGNING: 'Shartnoma', APPROVED: 'Tasdiqlandi', REJECTED: 'Rad', CANCELLED: 'Bekor', DRAFT: 'Qoralama', ERI_SIGNING: 'ERI imzo' }
  return m[s] || s
}
function statusVariant(s: ApplicationStatus): string {
  const m: Record<string, string> = { SUBMITTED: 'info', FINANCE_REVIEW: 'warning', OFFER_SENT: 'info', CONTRACT_SIGNING: 'warning', APPROVED: 'success', REJECTED: 'danger', CANCELLED: 'neutral', DRAFT: 'neutral', ERI_SIGNING: 'warning' }
  return m[s] || 'neutral'
}
</script>
