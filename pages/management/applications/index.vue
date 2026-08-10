<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Arizalar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ data?.applications.length || 0 }} ariza</p>
      </div>
    </div>

    <!-- Filter tabs -->
    <div class="flex items-center gap-1 p-1 rounded-xl bg-white/5 w-fit">
      <button
        v-for="tab in tabs" :key="tab.value"
        @click="activeTab = tab.value"
        class="px-3 py-1.5 rounded-lg text-sm transition-all"
        :class="activeTab === tab.value ? 'bg-brand-500/10 text-brand-400' : 'text-ink-500 hover:text-white'"
      >
        {{ tab.label }}
        <span v-if="tab.count" class="ml-1 text-xs opacity-60">{{ tab.count }}</span>
      </button>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <div v-else-if="data" class="space-y-3">
      <div v-for="app in filteredApps" :key="app.id" class="card p-4 hover:border-white/10 transition-colors cursor-pointer" @click="selectedApp = app">
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <div class="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-sm font-bold text-brand-400 flex-shrink-0">
              {{ app.applicantName?.charAt(0) || '?' }}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <span class="font-medium">{{ app.applicantName }}</span>
                <span class="text-xs text-ink-600">{{ app.number }}</span>
              </div>
              <div class="text-xs text-ink-500 flex items-center gap-3">
                <span>{{ app.type === 'RENT' ? 'Ijaraga' : 'Sotib olish' }}</span>
                <span>·</span>
                <span>{{ app.applicantPhone || 'Telefonsiz' }}</span>
                <span class="hidden md:inline">·</span>
                <span class="hidden md:inline">{{ formatDate(app.createdDate) }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 flex-shrink-0">
            <div class="text-right hidden sm:block">
              <div class="text-sm font-semibold">{{ formatPrice(app.offeredPrice, app.currency) }}</div>
              <div v-if="app.durationMonths" class="text-xs text-ink-500">{{ app.durationMonths }} oy</div>
            </div>
            <span class="badge" :class="statusBadge(app.status)">{{ statusLabel(app.status) }}</span>
          </div>
        </div>
      </div>

      <div v-if="filteredApps.length === 0" class="text-center py-12 text-ink-500">
        Bu tabda arizalar yo'q
      </div>
    </div>

    <!-- Detail drawer -->
    <Teleport to="body">
      <div v-if="selectedApp" class="fixed inset-0 z-50 flex justify-end" @click.self="selectedApp = null">
        <div class="absolute inset-0 bg-black/60" />
        <div class="relative w-full max-w-md bg-ink-900 border-l border-white/10 h-full overflow-y-auto p-6 animate-slide-in">
          <div class="flex items-center justify-between mb-6">
            <h3 class="font-semibold">{{ selectedApp.number }}</h3>
            <button @click="selectedApp = null" class="p-2 rounded-lg hover:bg-white/5 text-ink-400"><X :size="18" /></button>
          </div>

          <div class="space-y-4">
            <div>
              <div class="label">Arizachi</div>
              <div class="text-lg font-medium">{{ selectedApp.applicantName }}</div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <div class="label">Telefon</div>
                <div class="text-sm">{{ selectedApp.applicantPhone || '—' }}</div>
              </div>
              <div>
                <div class="label">Email</div>
                <div class="text-sm">{{ selectedApp.applicantEmail || '—' }}</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <div class="label">Taklif narxi</div>
                <div class="text-sm font-semibold">{{ formatPrice(selectedApp.offeredPrice, selectedApp.currency) }}</div>
              </div>
              <div>
                <div class="label">Davr</div>
                <div class="text-sm">{{ selectedApp.durationMonths || '—' }} oy</div>
              </div>
            </div>
            <div>
              <div class="label">Status</div>
              <span class="badge" :class="statusBadge(selectedApp.status)">{{ statusLabel(selectedApp.status) }}</span>
            </div>
            <div v-if="selectedApp.notes">
              <div class="label">Izoh</div>
              <div class="text-sm text-ink-400">{{ selectedApp.notes }}</div>
            </div>
            <div v-if="selectedApp.rejectionReason">
              <div class="label">Rad etish sababi</div>
              <div class="text-sm text-red-400">{{ selectedApp.rejectionReason }}</div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-white/5 space-y-2">
            <button class="btn btn-primary w-full" v-if="selectedApp.status !== 'APPROVED'">Tasdiqlash</button>
            <button class="btn btn-secondary w-full" v-if="selectedApp.status !== 'REJECTED'">Rad etish</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { fetchAdminData } = useApi()
const { data, pending } = await useAsyncData('admin-applications', () => fetchAdminData('applications'))

const activeTab = ref('all')
const selectedApp = ref<any>(null)

const tabs = computed(() => {
  const apps = data.value?.applications || []
  return [
    { value: 'all', label: 'Hammasi', count: apps.length },
    { value: 'pending', label: 'Kutilmoqda', count: apps.filter((a: any) => ['NEW', 'PENDING', 'BUILDING_REVIEW', 'FINANCE_REVIEW', 'ERI_PENDING'].includes(a.status)).length },
    { value: 'offer', label: 'Taklif', count: apps.filter((a: any) => a.status === 'OFFER_SENT').length },
    { value: 'approved', label: 'Tasdiqlangan', count: apps.filter((a: any) => a.status === 'APPROVED').length },
    { value: 'rejected', label: 'Rad etilgan', count: apps.filter((a: any) => a.status === 'REJECTED').length },
  ]
})

const filteredApps = computed(() => {
  const apps = data.value?.applications || []
  if (activeTab.value === 'all') return apps
  if (activeTab.value === 'pending') return apps.filter((a: any) => ['NEW', 'PENDING', 'BUILDING_REVIEW', 'FINANCE_REVIEW', 'ERI_PENDING'].includes(a.status))
  if (activeTab.value === 'offer') return apps.filter((a: any) => a.status === 'OFFER_SENT')
  if (activeTab.value === 'approved') return apps.filter((a: any) => a.status === 'APPROVED')
  if (activeTab.value === 'rejected') return apps.filter((a: any) => a.status === 'REJECTED')
  return apps
})

function formatPrice(price: number, currency: string) {
  if (!price) return '—'
  const formatted = new Intl.NumberFormat('ru-RU').format(price)
  return currency === 'USD' ? `$${formatted}` : `${(formatted / 1000000).toFixed(1)}M`
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    NEW: 'badge-neutral', PENDING: 'badge-warning', BUILDING_REVIEW: 'badge-warning',
    FINANCE_REVIEW: 'badge-brand', OFFER_SENT: 'badge-brand',
    ERI_PENDING: 'badge-warning', APPROVED: 'badge-success',
    REJECTED: 'badge-danger', CANCELLED: 'badge-neutral',
  }
  return map[status] || 'badge-neutral'
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    NEW: 'Yangi', PENDING: 'Kutilmoqda', BUILDING_REVIEW: 'Bino ko\'rib chiqish',
    FINANCE_REVIEW: 'Moliya', OFFER_SENT: 'Taklif yuborildi',
    ERI_PENDING: 'ERI kutilmoqda', APPROVED: 'Tasdiqlandi',
    REJECTED: 'Rad etildi', CANCELLED: 'Bekor qilindi',
  }
  return map[status] || status
}
</script>
