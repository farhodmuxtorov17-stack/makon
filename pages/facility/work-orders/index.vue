<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Xizmat so'rovlari</h1>
        <p class="text-ink-500 text-sm mt-1">{{ data?.requests.length || 0 }} so'rov</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" /> Yangi so'rov
      </button>
    </div>

    <!-- Filter -->
    <div class="flex items-center gap-1 p-1 rounded-xl bg-white/5 w-fit">
      <button
        v-for="tab in tabs" :key="tab.value"
        @click="activeTab = tab.value"
        class="px-3 py-1.5 rounded-lg text-sm transition-all"
        :class="activeTab === tab.value ? 'bg-brand-500/10 text-brand-400' : 'text-ink-500 hover:text-white'"
      >
        {{ tab.label }}
        <span v-if="tab.count !== undefined" class="ml-1 text-xs opacity-60">{{ tab.count }}</span>
      </button>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <div v-else-if="data" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="req in filteredRequests" :key="req.id" class="card p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="priorityBg(req.priority)">
              <Wrench :size="18" :class="priorityColor(req.priority)" />
            </div>
            <div>
              <div class="font-medium text-sm">{{ req.number }}</div>
              <div class="text-xs text-ink-500">{{ req.buildingName }}</div>
            </div>
          </div>
          <span class="badge" :class="statusBadge(req.status)">{{ statusLabel(req.status) }}</span>
        </div>

        <div class="flex items-center gap-2 mb-3">
          <span class="badge badge-neutral">{{ categoryLabel(req.category) }}</span>
          <span class="badge" :class="priorityBadge(req.priority)">{{ priorityLabel(req.priority) }}</span>
        </div>

        <p class="text-sm text-ink-400 mb-3 line-clamp-2">{{ req.description }}</p>

        <div class="flex items-center justify-between text-xs text-ink-600">
          <span>{{ formatDate(req.createdDate) }}</span>
          <div class="flex items-center gap-3">
            <span v-if="req.assignedTo" class="flex items-center gap-1">
              <UserCircle :size="14" /> {{ req.assignedTo }}
            </span>
            <span v-if="req.slaDueAt" class="flex items-center gap-1" :class="isSlaOverdue(req.slaDueAt) ? 'text-red-400' : ''">
              <Clock :size="14" /> SLA: {{ formatDate(req.slaDueAt) }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="filteredRequests.length === 0" class="md:col-span-2 text-center py-12 text-ink-500">
        Bu tabda so'rovlar yo'q
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Wrench, Plus, UserCircle, Clock } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const data = ref({
  requests: [
    { id: 'sr1', number: 'SR-2026-012', buildingName: 'Tashkent City', unitName: 'A-301', category: 'ELECTRICAL', priority: 'HIGH', status: 'IN_PROGRESS', description: 'Elektr simi almashtirish', assignedTo: 'Sardor Yusupov', createdDate: '2026-08-08', slaDueAt: '2026-08-11', rating: 0 },
    { id: 'sr2', number: 'SR-2026-011', buildingName: 'Trillant Tower', unitName: 'B-501', category: 'HVAC', priority: 'MEDIUM', status: 'NEW', description: 'Konditsioner sovqotmayapti', assignedTo: '', createdDate: '2026-08-09', slaDueAt: '2026-08-13', rating: 0 },
    { id: 'sr3', number: 'SR-2026-010', buildingName: 'IT Park', unitName: 'C-201', category: 'PLUMBING', priority: 'URGENT', status: 'NEW', description: 'Truba oqmoqda', assignedTo: '', createdDate: '2026-08-10', slaDueAt: '2026-08-11', rating: 0 },
    { id: 'sr4', number: 'SR-2026-009', buildingName: 'Tashkent City', unitName: 'A-302', category: 'CLEANING', priority: 'LOW', status: 'DONE', description: 'Ofisni tozalash kerak', assignedTo: 'Dilnoza Karimova', createdDate: '2026-08-05', slaDueAt: '2026-08-07', rating: 5 },
    { id: 'sr5', number: 'SR-2026-008', buildingName: 'Piramit', unitName: 'D-102', category: 'STRUCTURAL', priority: 'MEDIUM', status: 'DONE', description: 'Deraza ramkasi almashtirish', assignedTo: 'Aziz Toshmatov', createdDate: '2026-08-01', slaDueAt: '2026-08-04', rating: 4 },
    { id: 'sr6', number: 'SR-2026-007', buildingName: 'Trillant Tower', unitName: 'B-502', category: 'ELECTRICAL', priority: 'LOW', status: 'CANCELLED', description: 'Lampa almashtirish', assignedTo: '', createdDate: '2026-07-28', slaDueAt: '2026-08-02', rating: 0 },
  ],
})

const activeTab = ref('all')

const tabs = computed(() => {
  const reqs = data.value?.requests || []
  return [
    { value: 'all', label: 'Hammasi', count: reqs.length },
    { value: 'open', label: 'Ochiq', count: reqs.filter((r: any) => r.status === 'OPEN' || r.status === 'IN_PROGRESS').length },
    { value: 'done', label: 'Yakunlangan', count: reqs.filter((r: any) => r.status === 'COMPLETED' || r.status === 'RESOLVED').length },
    { value: 'cancelled', label: 'Bekor', count: reqs.filter((r: any) => r.status === 'CANCELLED').length },
  ]
})

const filteredRequests = computed(() => {
  const reqs = data.value?.requests || []
  if (activeTab.value === 'all') return reqs
  if (activeTab.value === 'open') return reqs.filter((r: any) => r.status === 'OPEN' || r.status === 'IN_PROGRESS')
  if (activeTab.value === 'done') return reqs.filter((r: any) => r.status === 'COMPLETED' || r.status === 'RESOLVED')
  if (activeTab.value === 'cancelled') return reqs.filter((r: any) => r.status === 'CANCELLED')
  return reqs
})

function formatDate(date: string) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

function isSlaOverdue(date: string) {
  return new Date(date) < new Date()
}

function priorityBg(p: string) {
  return { LOW: 'bg-ink-500/10', MEDIUM: 'bg-amber-500/10', HIGH: 'bg-orange-500/10', URGENT: 'bg-red-500/10' }[p] || 'bg-ink-500/10'
}
function priorityColor(p: string) {
  return { LOW: 'text-ink-400', MEDIUM: 'text-amber-400', HIGH: 'text-orange-400', URGENT: 'text-red-400' }[p] || 'text-ink-400'
}
function priorityBadge(p: string) {
  return { LOW: 'badge-neutral', MEDIUM: 'badge-warning', HIGH: 'badge-warning', URGENT: 'badge-danger' }[p] || 'badge-neutral'
}
function priorityLabel(p: string) {
  return { LOW: 'Past', MEDIUM: 'O\'rtacha', HIGH: 'Yuqori', URGENT: 'Shoshilinch' }[p] || p
}
function statusBadge(s: string) {
  return { OPEN: 'badge-warning', IN_PROGRESS: 'badge-brand', COMPLETED: 'badge-success', RESOLVED: 'badge-success', CANCELLED: 'badge-neutral' }[s] || 'badge-neutral'
}
function statusLabel(s: string) {
  return { OPEN: 'Ochiq', IN_PROGRESS: 'Jarayonda', COMPLETED: 'Yakunlandi', RESOLVED: 'Hal qilindi', CANCELLED: 'Bekor' }[s] || s
}
function categoryLabel(c: string) {
  const map: Record<string, string> = { PLUMBING: 'Sanitariya', ELECTRICAL: 'Elektrika', HVAC: 'Konditsioner', CLEANING: 'Tozalash', STRUCTURAL: 'Konstruksiya', SECURITY: 'Xavfsizlik', OTHER: 'Boshqa' }
  return map[c] || c
}
</script>
