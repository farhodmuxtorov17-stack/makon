<template>
  <div class="space-y-6">
    <PageHeader title="Servis so'rovlari" subtitle="Bino va ofis xizmatlari boshqaruvi">
      <template #actions>
        <button class="btn btn-primary btn-sm" @click="showNew = true">
          <Plus :size="16" /> Yangi so'rov
        </button>
      </template>
    </PageHeader>

    <!-- View toggle -->
    <div class="flex items-center gap-2">
      <div class="flex gap-1 p-1 bg-ink-100 rounded-xl">
        <button @click="viewMode = 'kanban'" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          :class="viewMode === 'kanban' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-400'">
          <LayoutGrid :size="16" class="inline mr-1" /> Kanban
        </button>
        <button @click="viewMode = 'list'" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          :class="viewMode === 'list' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-400'">
          <List :size="16" class="inline mr-1" /> Ro'yxat
        </button>
      </div>
    </div>

    <!-- Kanban -->
    <div v-if="viewMode === 'kanban'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
      <div v-for="col in kanbanColumns" :key="col.id" class="flex flex-col gap-3">
        <div class="flex items-center justify-between px-1">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full" :class="col.dot"></span>
            <h3 class="font-semibold text-sm text-ink-700">{{ col.title }}</h3>
          </div>
          <span class="text-xs font-semibold text-ink-400 px-2 py-0.5 rounded-lg bg-ink-100">{{ col.items.length }}</span>
        </div>
        <div class="space-y-2">
          <div v-for="sr in col.items" :key="sr.id" class="card p-4 cursor-pointer hover:shadow-card-hover transition-all"
            @click="$router.push(`/service/work-orders/${sr.workOrderId || 'sr-' + sr.id}`)">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-mono text-xs font-semibold text-ink-500">{{ sr.number }}</span>
              <span class="badge" :class="priorityBadge(sr.priority)">{{ sr.priority }}</span>
            </div>
            <p class="text-sm font-medium text-ink-900 mb-1">{{ sr.category }}</p>
            <p class="text-xs text-ink-400 line-clamp-2">{{ sr.description }}</p>
            <div class="flex items-center justify-between mt-3 pt-3 border-t border-ink-50">
              <span class="text-xs text-ink-400">{{ formatDate(sr.createdAt) }}</span>
              <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-[10px] font-bold text-white">
                {{ sr.assignedTo ? sr.assignedTo.slice(-2).toUpperCase() : '?' }}
              </div>
            </div>
          </div>
          <div v-if="col.items.length === 0" class="text-center py-8 text-ink-300 text-sm border-2 border-dashed border-ink-100 rounded-xl">
            Bo'sh
          </div>
        </div>
      </div>
    </div>

    <!-- List view -->
    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>№</th>
              <th>Kategoriya</th>
              <th>Tavsif</th>
              <th>Prioritet</th>
              <th>Status</th>
              <th>Sana</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sr in serviceStore.serviceRequests" :key="sr.id" class="cursor-pointer hover:bg-ink-50/50" @click="$router.push(`/service/work-orders/${sr.workOrderId || 'sr-' + sr.id}`)">
              <td class="font-mono font-semibold">{{ sr.number }}</td>
              <td><span class="badge badge-neutral">{{ sr.category }}</span></td>
              <td class="text-ink-600 text-sm">{{ sr.description }}</td>
              <td><span class="badge" :class="priorityBadge(sr.priority)">{{ sr.priority }}</span></td>
              <td><StatusBadge :status="sr.status" :variant="srVariant(sr.status)" :label="srLabel(sr.status)" dot /></td>
              <td class="text-ink-400 text-sm">{{ formatDate(sr.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- New request modal -->
    <BaseModal v-model="showNew" title="Yangi servis so'rovi">
      <div class="space-y-4">
        <div>
          <label class="label">Bino</label>
          <select class="input">
            <option>Trilliant Tower</option>
            <option>Tashkent City IBC</option>
            <option>IT Park</option>
            <option>Piramit Tower</option>
          </select>
        </div>
        <div>
          <label class="label">Kategoriya</label>
          <select class="input">
            <option>Santexnika</option>
            <option>Elektr</option>
            <option>HVAC</option>
            <option>Tozalash</option>
            <option>Devor</option>
            <option>Boshqa</option>
          </select>
        </div>
        <div>
          <label class="label">Prioritet</label>
          <div class="grid grid-cols-4 gap-2">
            <button v-for="p in priorities" :key="p.id" @click="selectedPriority = p.id"
              class="px-3 py-2 rounded-lg text-sm font-medium border transition-all"
              :class="selectedPriority === p.id ? p.activeClass : 'border-ink-200 text-ink-500 hover:bg-ink-50'">
              {{ p.label }}
            </button>
          </div>
        </div>
        <div>
          <label class="label">Tavsif</label>
          <textarea class="input" rows="3" placeholder="Muammoni batafsil tavsiflang..."></textarea>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-lg" @click="showNew = false">Bekor</button>
        <button class="btn btn-primary btn-lg" @click="showNew = false">Yaratish</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { Plus, LayoutGrid, List } from 'lucide-vue-next'
import type { ServiceRequestStatus, ServiceRequestPriority } from '~/types'

const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())

const viewMode = ref<'kanban' | 'list'>('kanban')
const showNew = ref(false)
const selectedPriority = ref('MEDIUM')

const priorities = [
  { id: 'LOW', label: 'Past', activeClass: 'border-ink-900 bg-ink-900 text-white' },
  { id: 'MEDIUM', label: 'O\'rta', activeClass: 'border-sky-500 bg-sky-500 text-white' },
  { id: 'HIGH', label: 'Yuqori', activeClass: 'border-amber-500 bg-amber-500 text-white' },
  { id: 'URGENT', label: 'Shoshilinch', activeClass: 'border-rose-500 bg-rose-500 text-white' },
]

const kanbanColumns = computed(() => [
  { id: 'CREATED', title: 'Yangi', dot: 'bg-ink-400', items: serviceStore.serviceRequests.filter(s => s.status === 'CREATED') },
  { id: 'APPROVED_ASSIGNED', title: 'Tasdiqlangan', dot: 'bg-brand-500', items: serviceStore.serviceRequests.filter(s => s.status === 'APPROVED' || s.status === 'ASSIGNED') },
  { id: 'IN_PROGRESS', title: 'Jarayonda', dot: 'bg-amber-500', items: serviceStore.serviceRequests.filter(s => s.status === 'IN_PROGRESS') },
  { id: 'DONE', title: 'Yakunlangan', dot: 'bg-emerald-500', items: serviceStore.serviceRequests.filter(s => s.status === 'DONE') },
])

function srLabel(s: ServiceRequestStatus): string {
  const m: Record<string, string> = { CREATED: 'Yangi', APPROVED: 'Tasdiqlangan', ASSIGNED: 'Tayinlangan', IN_PROGRESS: 'Jarayonda', DONE: 'Yakunlangan', CLOSED: 'Yopilgan' }
  return m[s] || s
}
function srVariant(s: ServiceRequestStatus): string {
  const m: Record<string, string> = { CREATED: 'neutral', APPROVED: 'info', ASSIGNED: 'warning', IN_PROGRESS: 'warning', DONE: 'success', CLOSED: 'neutral' }
  return m[s] || 'neutral'
}
function priorityBadge(p: ServiceRequestPriority): string {
  const m: Record<string, string> = { LOW: 'badge-neutral', MEDIUM: 'badge-info', HIGH: 'badge-warning', URGENT: 'badge-danger' }
  return m[p] || 'badge-neutral'
}
function formatDate(d: string) { return d.split('T')[0] }
</script>
