<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white tracking-tight">Work orderlar</h1>
        <p class="text-sm text-ink-500 mt-1">Servis so'rovlari asosida yaratilgan ish buyruqlari</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-secondary btn-sm" @click="showFilters = !showFilters">
          <Filter :size="16" /> Filtrlar
        </button>
        <button class="btn btn-primary btn-sm" @click="showNew = !showNew">
          <Plus :size="16" /> Yangi work order
        </button>
      </div>
    </div>

    <!-- New work order form -->
    <div v-if="showNew" class="card p-6 space-y-4">
      <h3 class="font-semibold dark:text-white">Yangi work order yaratish</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="label">Servis so'rovi</label>
          <select v-model="newOrder.requestId" class="input">
            <option value="">Tanlang...</option>
            <option v-for="r in serviceRequests" :key="r.id" :value="r.id">{{ r.number }} — {{ r.category }}</option>
          </select>
        </div>
        <div>
          <label class="label">Bino</label>
          <select v-model="newOrder.buildingId" class="input">
            <option value="">Tanlang...</option>
            <option v-for="b in buildings" :key="b.id" :value="b.id">{{ b.name }}</option>
          </select>
        </div>
        <div>
          <label class="label">Ustaxonaga tayinlash</label>
          <select v-model="newOrder.assignedTo" class="input">
            <option value="">Tanlang...</option>
            <option v-for="w in workers" :key="w.id" :value="w.id">{{ w.name }}</option>
          </select>
        </div>
        <div>
          <label class="label">SLA muddati</label>
          <input v-model="newOrder.slaDueAt" type="date" class="input" />
        </div>
        <div class="md:col-span-2">
          <label class="label">Izoh</label>
          <textarea v-model="newOrder.description" rows="3" class="input" placeholder="Ish tavsifi..."></textarea>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-primary btn-sm" @click="createOrder">Yaratish</button>
        <button class="btn btn-secondary btn-sm" @click="showNew = false">Bekor qilish</button>
      </div>
    </div>

    <!-- Filters -->
    <div v-if="showFilters" class="card p-4 flex flex-wrap gap-3 items-center">
      <select v-model="filters.status" class="input max-w-40">
        <option value="">Barcha statuslar</option>
        <option value="ASSIGNED">Tayinlangan</option>
        <option value="IN_PROGRESS">Jarayonda</option>
        <option value="COMPLETED">Tugatilgan</option>
        <option value="CANCELLED">Bekor qilingan</option>
      </select>
      <select v-model="filters.priority" class="input max-w-40">
        <option value="">Barcha prioritetlar</option>
        <option value="URGENT">Shoshilinch</option>
        <option value="HIGH">Yuqori</option>
        <option value="NORMAL">Normal</option>
        <option value="LOW">Past</option>
      </select>
      <button class="btn btn-secondary btn-sm" @click="filters = { status: '', priority: '' }">Tozalash</button>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KpiCard :icon="Wrench" label="Jami work orderlar" :value="workOrders.length" icon-color="#f59e0b" icon-bg="rgba(245,158,11,0.1)" to="/facility/work-orders" />
      <KpiCard :icon="Clock" label="Jarayonda" :value="inProgressCount" icon-color="#6366f1" icon-bg="rgba(99,102,241,0.1)" to="/facility/work-orders" />
      <KpiCard :icon="CheckCircle2" label="Tugatilgan" :value="completedCount" icon-color="#10b981" icon-bg="rgba(16,185,129,0.1)" to="/facility/work-orders" />
      <KpiCard :icon="AlertTriangle" label="SLA buzilgan" :value="slaBreachedCount" icon-color="#ef4444" icon-bg="rgba(239,68,68,0.1)" to="/facility/work-orders" />
    </div>

    <!-- Work orders table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-ink-50 dark:bg-ink-900/50 text-ink-500">
            <tr>
              <th class="text-left px-4 py-3 font-medium">Nomer</th>
              <th class="text-left px-4 py-3 font-medium">Kategoriya</th>
              <th class="text-left px-4 py-3 font-medium">Bino</th>
              <th class="text-left px-4 py-3 font-medium">Usta</th>
              <th class="text-left px-4 py-3 font-medium">Prioritet</th>
              <th class="text-left px-4 py-3 font-medium">Status</th>
              <th class="text-left px-4 py-3 font-medium">SLA</th>
              <th class="text-left px-4 py-3 font-medium">Amal</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-ink-100 dark:divide-ink-800">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-ink-50 dark:hover:bg-ink-900/30">
              <td class="px-4 py-3 font-mono text-xs">{{ order.number }}</td>
              <td class="px-4 py-3">{{ order.category }}</td>
              <td class="px-4 py-3">{{ order.buildingName }}</td>
              <td class="px-4 py-3">{{ order.assignedToName || '—' }}</td>
              <td class="px-4 py-3">
                <span class="badge" :class="priorityClass(order.priority)">{{ priorityLabel(order.priority) }}</span>
              </td>
              <td class="px-4 py-3">
                <span class="badge" :class="statusClass(order.status)">{{ statusLabel(order.status) }}</span>
              </td>
              <td class="px-4 py-3">
                <span :class="order.slaBreached ? 'text-red-400 font-medium' : 'text-ink-500'">
                  {{ formatDate(order.slaDueAt) }}
                </span>
              </td>
              <td class="px-4 py-3">
                <button class="text-brand-500 hover:text-brand-600 text-xs font-medium" @click="selectedOrder = order">
                  Ko'rish
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Detail modal -->
    <div v-if="selectedOrder" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="selectedOrder = null">
      <div class="card p-6 max-w-2xl w-full space-y-4 max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold">{{ selectedOrder.number }}</h3>
          <button @click="selectedOrder = null" class="text-ink-400 hover:text-ink-600">
            <X :size="20" />
          </button>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="text-xs text-ink-500 mb-1">Kategoriya</div>
            <div class="font-medium">{{ selectedOrder.category }}</div>
          </div>
          <div>
            <div class="text-xs text-ink-500 mb-1">Bino</div>
            <div class="font-medium">{{ selectedOrder.buildingName }}</div>
          </div>
          <div>
            <div class="text-xs text-ink-500 mb-1">Usta</div>
            <div class="font-medium">{{ selectedOrder.assignedToName || 'Tayinlanmagan' }}</div>
          </div>
          <div>
            <div class="text-xs text-ink-500 mb-1">SLA muddati</div>
            <div class="font-medium" :class="selectedOrder.slaBreached ? 'text-red-400' : ''">
              {{ formatDate(selectedOrder.slaDueAt) }}
            </div>
          </div>
        </div>
        <div>
          <div class="text-xs text-ink-500 mb-1">Tavsif</div>
          <p class="text-ink-400 text-sm">{{ selectedOrder.description }}</p>
        </div>
        <div>
          <div class="text-xs text-ink-500 mb-2">Statusni o'zgartirish</div>
          <div class="flex gap-2 flex-wrap">
            <button v-for="s in ['ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']" :key="s"
                    class="btn btn-sm" :class="selectedOrder.status === s ? 'btn-primary' : 'btn-secondary'"
                    @click="selectedOrder.status = s">
              {{ statusLabel(s) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KpiCard from '~/components/KpiCard.vue'
import { Filter, Plus, X, Clock, CheckCircle2, AlertTriangle, Wrench } from 'lucide-vue-next'

definePageMeta({ layout: 'admin' })

const showNew = ref(false)
const showFilters = ref(false)
const selectedOrder = ref<any>(null)

const filters = reactive({ status: '', priority: '' })

const newOrder = reactive({
  requestId: '', buildingId: '', assignedTo: '', slaDueAt: '', description: '',
})

const buildings = [
  { id: 'b1', name: 'Tashkent City' },
  { id: 'b2', name: 'Trillant Tower' },
  { id: 'b3', name: 'IT Park' },
  { id: 'b4', name: 'Piramit' },
]

const workers = [
  { id: 'w1', name: 'Akmal Sodiqov — Santexnika' },
  { id: 'w2', name: 'Bekzod Aliyev — Elektrik' },
  { id: 'w3', name: 'Dilshod Karimov — Umumiy' },
]

const serviceRequests = [
  { id: 'sr1', number: 'SR-001', category: 'Santexnika' },
  { id: 'sr2', number: 'SR-002', category: 'Elektr' },
  { id: 'sr3', number: 'SR-003', category: 'Konditsioner' },
]


const inProgressCount = computed(() => workOrders.value.filter(o => o.status === 'IN_PROGRESS').length)
const completedCount = computed(() => workOrders.value.filter(o => o.status === 'COMPLETED' || o.status === 'DONE').length)
const slaBreachedCount = computed(() => workOrders.value.filter(o => o.slaBreached).length)
const workOrders = ref([
  { id: 1, number: 'WO-2026-001', category: 'Santexnika', buildingName: 'Tashkent City', unitCode: 'A-301', assignedToName: 'Akmal Sodiqov', priority: 'URGENT', status: 'IN_PROGRESS', slaDueAt: '2026-08-12', slaBreached: false, description: 'A-301 ofisida quvur nuqsoni, suv oqmoqda. Shoshilinch.' },
  { id: 2, number: 'WO-2026-002', category: 'Elektr', buildingName: 'Trillant Tower', unitCode: 'B-501', assignedToName: 'Bekzod Aliyev', priority: 'HIGH', status: 'ASSIGNED', slaDueAt: '2026-08-14', slaBreached: false, description: 'B-501 da elektr rozetkasi ishlamayapti.' },
  { id: 3, number: 'WO-2026-003', category: 'Konditsioner', buildingName: 'IT Park', unitCode: 'C-201', assignedToName: 'Dilshod Karimov', priority: 'NORMAL', status: 'COMPLETED', slaDueAt: '2026-08-08', slaBreached: false, description: 'C-201 konditsioner filtrlarini almashtirish.' },
  { id: 4, number: 'WO-2026-004', category: 'Umumiy toza', buildingName: 'Piramit', unitCode: 'D-102', assignedToName: null, priority: 'LOW', status: 'ASSIGNED', slaDueAt: '2026-08-15', slaBreached: false, description: 'D-102 umumiy tozalash ishlari.' },
  { id: 5, number: 'WO-2026-005', category: 'Santexnika', buildingName: 'Tashkent City', unitCode: 'A-205', assignedToName: 'Akmal Sodiqov', priority: 'HIGH', status: 'IN_PROGRESS', slaDueAt: '2026-08-09', slaBreached: true, description: 'A-205 dush kabina shikastlangan.' },
  { id: 6, number: 'WO-2026-006', category: 'Elektr', buildingName: 'Savdo Markaz', unitCode: 'E-301', assignedToName: 'Bekzod Aliyev', priority: 'NORMAL', status: 'COMPLETED', slaDueAt: '2026-08-07', slaBreached: false, description: 'E-301 yoritish lampalarini almashtirish.' },
  { id: 7, number: 'WO-2026-007', category: 'Konditsioner', buildingName: 'Trillant Tower', unitCode: 'B-502', assignedToName: null, priority: 'URGENT', status: 'ASSIGNED', slaDueAt: '2026-08-11', slaBreached: false, description: 'B-502 konditsioner sovimayapti, tezkor tahlil kerak.' },
])

const filteredOrders = computed(() => {
  return workOrders.value.filter(o => {
    if (filters.status && o.status !== filters.status) return false
    if (filters.priority && o.priority !== filters.priority) return false
    return true
  })
})

function createOrder() {
  const req = serviceRequests.find(r => r.id === newOrder.requestId)
  const bld = buildings.find(b => b.id === newOrder.buildingId)
  const wrk = workers.find(w => w.id === newOrder.assignedTo)
  workOrders.value.unshift({
    id: Date.now(),
    number: `WO-2026-${String(workOrders.value.length + 1).padStart(3, '0')}`,
    category: req?.category || 'Umumiy',
    buildingName: bld?.name || '—',
    unitCode: '',
    assignedToName: wrk?.name.split(' — ')[0] || null,
    priority: 'NORMAL',
    status: 'ASSIGNED',
    slaDueAt: newOrder.slaDueAt || '',
    slaBreached: false,
    description: newOrder.description,
  })
  showNew.value = false
  newOrder.requestId = ''; newOrder.buildingId = ''; newOrder.assignedTo = ''; newOrder.slaDueAt = ''; newOrder.description = ''
}

function statusLabel(s: string) {
  return { ASSIGNED: 'Tayinlangan', IN_PROGRESS: 'Jarayonda', COMPLETED: 'Tugatilgan', CANCELLED: 'Bekor qilingan' }[s] || s
}
function statusClass(s: string) {
  return { ASSIGNED: 'badge-info', IN_PROGRESS: 'badge-warning', COMPLETED: 'badge-success', CANCELLED: 'badge-error' }[s] || ''
}
function priorityLabel(p: string) {
  return { URGENT: 'Shoshilinch', HIGH: 'Yuqori', NORMAL: 'Normal', LOW: 'Past' }[p] || p
}
function priorityClass(p: string) {
  return { URGENT: 'badge-error', HIGH: 'badge-warning', NORMAL: 'badge-info', LOW: 'badge-secondary' }[p] || ''
}
function formatDate(d: string) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>
