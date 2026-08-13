<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">Servis so'rovlari</div>
      <h1 class="page-title">Xizmat so'rovlari</h1>
      <p class="page-sub">Ijarachilardan kelgan so'rovlar va ularning holati</p>
        <p class="text-ink-500 text-sm mt-1">Xizmat ko'rsatish so'rovlari oqimi va SLA ijro nazorati</p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Building filter -->
        <select v-model="buildingFilter" class="input w-auto text-xs font-semibold">
          <option value="">Barcha binolar</option>
          <option v-for="b in makonStore.buildings" :key="b.id" :value="b.id">{{ b.name }}</option>
        </select>

        <button @click="showCreateModal = true" class="btn btn-primary btn-sm flex items-center gap-2">
          <Plus :size="16" /> Yangi so'rov yaratish
        </button>
      </div>
    </div>

    <!-- KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Wrench :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ totalRequests }}</div>
          <div class="dash-kpi__label">Jami so'rovlar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ newCount }}</div>
          <div class="dash-kpi__label">Yangi</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileSignature :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ inProgressCount }}</div>
          <div class="dash-kpi__label">Jarayonda</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ completedCount }}</div>
          <div class="dash-kpi__label">Tugatilgan</div>
        </div>
        <div v-if="totalRequests" class="kpi-strip__pct">{{ Math.round(completedCount / totalRequests * 100) }}%</div>
      </div>
    </div>

    <!-- Kanban -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
      <div v-for="col in kanbanColumns" :key="col.status" class="bg-black/5 dark:bg-white/5 p-3 rounded-2xl border border-black/5 dark:border-white/5 space-y-3 min-w-[240px]">
        <div class="flex items-center justify-between px-1">
          <span class="text-xs font-bold text-ink-900 dark:text-white flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" :class="col.color"></span>
            {{ col.label }}
          </span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/10 dark:bg-white/10 text-ink-500">
            {{ getColumnRequests(col.status).length }}
          </span>
        </div>

        <!-- Cards List -->
        <div class="space-y-3">
          <div
            v-for="sr in getColumnRequests(col.status)" :key="sr.id"
            class="card p-3 space-y-2.5 hover:border-brand-500/50 transition-all cursor-pointer bg-white dark:bg-ink-900"
            @click="selectedRequest = sr"
          >
            <!-- Header badges -->
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono font-bold text-brand-500">{{ sr.number }}</span>
              <span class="badge text-[10px]" :class="priorityBadge(sr.priority)">{{ sr.priority }}</span>
            </div>

            <!-- Title & Category -->
            <div>
              <div class="font-bold text-xs text-ink-900 dark:text-white line-clamp-1">{{ sr.title }}</div>
              <div class="text-[11px] text-ink-500 flex items-center justify-between mt-0.5">
                <span>{{ sr.buildingName }}</span>
                <span class="font-mono text-ink-900 dark:text-white">Unit {{ sr.unitNumber }}</span>
              </div>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 text-[11px]">
              <span class="flex items-center gap-1 text-amber-500 font-medium">
                <Clock :size="12" /> SLA: 2-soat qoldi
              </span>
              <span class="badge badge-neutral text-[10px]">{{ sr.category }}</span>
            </div>

            <!-- Assignee Footer -->
            <div class="flex items-center justify-between pt-1 border-t border-black/5 dark:border-white/5 text-[10px]">
              <span class="text-ink-500">Ijrochi: <b class="text-ink-900 dark:text-white">{{ sr.assignedTo || 'Biriktirilmagan' }}</b></span>
              <button @click.stop="openAssignModal(sr)" class="text-brand-500 hover:underline">O'zgartirish</button>
            </div>
          </div>

          <div v-if="getColumnRequests(col.status).length === 0" class="p-6 text-center text-ink-500 text-xs border border-dashed border-black/10 dark:border-white/10 rounded-xl">
            So'rovlar yo'q
          </div>
        </div>
      </div>
    </div>

    <!-- Create Request Modal -->
    <Teleport to="body">
      <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showCreateModal = false"></div>
        <div class="relative w-full max-w-md bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 z-10 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <h3 class="text-lg font-bold text-ink-900 dark:text-white">Yangi Xizmat So'rovi</h3>
            <button @click="showCreateModal = false" class="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-ink-400"><X :size="20" /></button>
          </div>

          <form @submit.prevent="handleCreateRequest" class="space-y-3">
            <div>
              <label class="label">Bino</label>
              <select v-model="newSr.buildingId" class="input w-full" required>
                <option v-for="b in makonStore.buildings" :key="b.id" :value="b.id">{{ b.name }}</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="label">Unit Raqami</label>
                <input v-model="newSr.unitNumber" type="text" required placeholder="101" class="input w-full" />
              </div>
              <div>
                <label class="label">Kategoriya</label>
                <select v-model="newSr.category" class="input w-full">
                  <option value="HVAC">HVAC (Sovitish/Isitish)</option>
                  <option value="Plumbing">Santehnika (Plumbing)</option>
                  <option value="Electrical">Elektr (Electrical)</option>
                  <option value="Cleaning">Tozalash (Cleaning)</option>
                  <option value="Security">Xavfsizlik (Security)</option>
                  <option value="General">Umumiy (General)</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="label">Muhimlik (Priority)</label>
                <select v-model="newSr.priority" class="input w-full">
                  <option value="URGENT">Shoshilinch (Urgent)</option>
                  <option value="HIGH">Yuqori (High)</option>
                  <option value="NORMAL">O'rtacha (Normal)</option>
                  <option value="LOW">Past (Low)</option>
                </select>
              </div>
              <div>
                <label class="label">Ijrochi xodim</label>
                <select v-model="newSr.assignedTo" class="input w-full">
                  <option value="Jasur Rahimov">Jasur Rahimov</option>
                  <option value="Alisher Qodirov">Alisher Qodirov</option>
                  <option value="Chinor Service MChJ">Chinor Service</option>
                </select>
              </div>
            </div>

            <div>
              <label class="label">Sarlavha</label>
              <input v-model="newSr.title" type="text" required placeholder="Konditsioner sovutmayapti" class="input w-full" />
            </div>

            <div>
              <label class="label">Tavsif</label>
              <textarea v-model="newSr.description" rows="2" placeholder="Xatolik tafsilotlari..." class="input w-full text-xs"></textarea>
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-black/5 dark:border-white/5">
              <button type="button" @click="showCreateModal = false" class="btn btn-secondary">Bekor qilish</button>
              <button type="submit" class="btn btn-primary">So'rovni yaratish</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Assign Modal -->
    <Teleport to="body">
      <div v-if="assigningRequest" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="assigningRequest = null"></div>
        <div class="relative w-full max-w-sm bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 z-10 space-y-4">
          <h3 class="text-lg font-bold text-ink-900 dark:text-white">Facility Xodimini Biriktirish</h3>
          <div>
            <label class="label">Xodim / Pudratchi</label>
            <select v-model="assignedWorker" class="input w-full">
              <option value="Jasur Rahimov">Jasur Rahimov (HVAC Mutaxassis)</option>
              <option value="Alisher Qodirov">Alisher Qodirov (Elektrik)</option>
              <option value="Chinor Service MChJ">Chinor Service MChJ (Klining)</option>
            </select>
          </div>
          <div class="flex items-center justify-end gap-3 pt-3">
            <button @click="assigningRequest = null" class="btn btn-secondary text-xs">Bekor qilish</button>
            <button @click="saveAssignee" class="btn btn-primary text-xs">Saqlash</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Plus, Clock, X , CheckCircle, FileSignature, FileText, Wrench} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'FACILITY'],  layout: 'admin', middleware: 'role' })

const makonStore = useMakonStore()

const buildingFilter = ref('')
const selectedRequest = ref<any>(null)
const showCreateModal = ref(false)
const assigningRequest = ref<any>(null)
const assignedWorker = ref('Jasur Rahimov')

const totalRequests = computed(() => makonStore.serviceRequests.length)
const newCount = computed(() => makonStore.serviceRequests.filter(r => r.status === 'NEW').length)
const inProgressCount = computed(() => makonStore.serviceRequests.filter(r => r.status === 'ASSIGNED' || r.status === 'IN_PROGRESS').length)
const completedCount = computed(() => makonStore.serviceRequests.filter(r => r.status === 'COMPLETED').length)

const kanbanColumns = [
  { status: 'NEW', label: '1. YANGI', color: 'bg-blue-500' },
  { status: 'TRIAGED', label: '2. SARTIROVKA', color: 'bg-purple-500' },
  { status: 'ASSIGNED', label: '3. BIRIKTIRILDI', color: 'bg-amber-500' },
  { status: 'IN_PROGRESS', label: '4. JARAYONDA', color: 'bg-brand-500' },
  { status: 'COMPLETED', label: '5. BAJARILDI', color: 'bg-emerald-500' },
  { status: 'CLOSED', label: '6. YOPILDI', color: 'bg-gray-500' }
]

const newSr = ref({
  buildingId: makonStore.buildings[0]?.id || '',
  unitNumber: '101',
  category: 'HVAC' as any,
  priority: 'HIGH' as any,
  title: '',
  description: '',
  assignedTo: 'Jasur Rahimov'
})

function getColumnRequests(status: string) {
  return makonStore.serviceRequests.filter(sr => {
    const matchesB = !buildingFilter.value || sr.buildingId === buildingFilter.value
    return matchesB && sr.status === status
  })
}

function priorityBadge(p: string) {
  if (p === 'URGENT') return 'badge-danger'
  if (p === 'HIGH') return 'badge-warning'
  if (p === 'NORMAL') return 'badge-brand'
  return 'badge-neutral'
}

function openAssignModal(sr: any) {
  assigningRequest.value = sr
  assignedWorker.value = sr.assignedTo || 'Jasur Rahimov'
}

function saveAssignee() {
  if (assigningRequest.value) {
    assigningRequest.value.assignedTo = assignedWorker.value
    assigningRequest.value.status = 'ASSIGNED'
    assigningRequest.value = null
  }
}

function handleCreateRequest() {
  const b = makonStore.buildings.find(item => item.id === newSr.value.buildingId) || makonStore.buildings[0]
  makonStore.addServiceRequest({
    buildingId: b.id,
    buildingName: b.name,
    unitNumber: newSr.value.unitNumber,
    category: newSr.value.category,
    priority: newSr.value.priority,
    status: 'NEW',
    title: newSr.value.title,
    description: newSr.value.description,
    assignedTo: newSr.value.assignedTo,
    slaDeadline: new Date(Date.now() + 86400000).toISOString()
  })
  showCreateModal.value = false
  newSr.value.title = ''
  newSr.value.description = ''
}
</script>

<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--card-bg, rgba(255,255,255,0.9));
  border: 1px solid rgba(0,0,0,0.06);
  position: relative; overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.kpi-strip:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--blue::before { background: #3b82f6; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); }
.kpi-strip--blue .kpi-strip__icon { background: rgba(59,130,246,0.1); }
.kpi-strip__icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.dash-kpi__body { flex: 1; min-width: 0; }
.dash-kpi__value { font-size: 20px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.dash-kpi__label { font-size: 10px; color: var(--text-muted, #71717a); margin-top: 3px; }
.kpi-strip__pct { font-size: 12px; font-weight: 700; color: #10b981; padding: 2px 8px; border-radius: 8px; background: rgba(16,185,129,0.1); }
</style>
