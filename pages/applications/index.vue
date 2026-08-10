<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Arizalar</h1>
        <p class="text-ink-500 text-sm mt-0.5">Ijara va sotuv uchun arizalar</p>
      </div>
    </div>

    <div class="flex gap-2 flex-wrap">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
        :class="activeTab === tab.id ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'">
        {{ tab.label }}
        <span class="ml-1.5 text-xs opacity-60">{{ tab.count }}</span>
      </button>
    </div>

    <div class="card overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Nomer</th>
              <th>Ariza beruvchi</th>
              <th>Telefon</th>
              <th>Turi</th>
              <th>Taklif narx</th>
              <th>Status</th>
              <th>Sana</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="app in filteredApps" :key="app.id" class="cursor-pointer hover:bg-ink-50/50" @click="$router.push(`/applications/${app.id}`)">
              <td class="font-mono font-semibold text-ink-900">{{ app.number }}</td>
              <td class="font-medium">{{ app.applicantName }}</td>
              <td class="text-ink-500 text-sm">{{ app.applicantPhone }}</td>
              <td><span class="badge badge-neutral">{{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</span></td>
              <td class="font-semibold">{{ formatPrice(app.offeredPrice) }}</td>
              <td><span class="badge" :class="statusClass(app.status)">{{ statusLabel(app.status) }}</span></td>
              <td class="text-ink-400 text-sm">{{ app.createdAt.split('T')[0] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApplicationStatus } from '~/types'

const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

const activeTab = ref('all')

const tabs = computed(() => [
  { id: 'all', label: 'Hammasi', count: financeStore.applications.length },
  { id: 'SUBMITTED', label: 'Yangi', count: financeStore.applications.filter(a => a.status === 'SUBMITTED').length },
  { id: 'FINANCE_REVIEW', label: 'Tekshiruvda', count: financeStore.applications.filter(a => a.status === 'FINANCE_REVIEW').length },
  { id: 'OFFER_SENT', label: 'Taklif yuborildi', count: financeStore.applications.filter(a => a.status === 'OFFER_SENT').length },
  { id: 'CONTRACT_SIGNING', label: 'Shartnoma', count: financeStore.applications.filter(a => a.status === 'CONTRACT_SIGNING').length },
])

const filteredApps = computed(() => {
  if (activeTab.value === 'all') return financeStore.applications
  return financeStore.applications.filter(a => a.status === activeTab.value)
})

function formatPrice(v: number) {
  if (v >= 1000000000) return (v / 1000000000).toFixed(1) + ' mlrd'
  if (v >= 1000000) return (v / 1000000).toFixed(0) + ' mln'
  return v.toLocaleString('ru')
}

function statusLabel(s: ApplicationStatus): string {
  const m: Record<string, string> = {
    SUBMITTED: 'Yangi', FINANCE_REVIEW: 'Tekshiruvda', OFFER_SENT: 'Taklif yuborildi',
    CONTRACT_SIGNING: 'Shartnoma', APPROVED: 'Tasdiqlandi', REJECTED: 'Rad etildi',
    CANCELLED: 'Bekor qilindi', DRAFT: 'Qoralama', ERI_SIGNING: 'ERI imzo',
  }
  return m[s] || s
}

function statusClass(s: ApplicationStatus): string {
  const m: Record<string, string> = {
    SUBMITTED: 'badge-info', FINANCE_REVIEW: 'badge-warning',
    OFFER_SENT: 'badge-info', CONTRACT_SIGNING: 'badge-warning',
    APPROVED: 'badge-success', REJECTED: 'badge-danger',
    CANCELLED: 'badge-neutral', DRAFT: 'badge-neutral', ERI_SIGNING: 'badge-warning',
  }
  return m[s] || 'badge-neutral'
}
</script>
