<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Work orderlar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ workOrders.length }} ta topshiriq · {{ activeCount }} faol</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-secondary btn-sm"><Filter :size="14" /> Filtr</button>
        <button class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi work order</button>
      </div>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><ClipboardList :size="16" class="text-blue-500" /></div>
          <span class="text-xs text-ink-500">Yangi</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ statusCounts.NEW }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><Wrench :size="16" class="text-amber-500" /></div>
          <span class="text-xs text-ink-500">Ishda</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ statusCounts.IN_PROGRESS }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><CheckCheck :size="16" class="text-purple-500" /></div>
          <span class="text-xs text-ink-500">Tekshirish</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ statusCounts.REVIEW }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><CheckCircle2 :size="16" class="text-emerald-500" /></div>
          <span class="text-xs text-ink-500">Yakunlangan</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ statusCounts.DONE }}</div>
      </div>
    </div>

    <!-- Kanban board -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div v-for="col in kanbanColumns" :key="col.status" class="kanban-col">
        <div class="kanban-col__header">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full" :style="{ background: col.color }"></div>
            <span class="text-sm font-semibold text-ink-900 dark:text-white">{{ col.label }}</span>
          </div>
          <span class="text-xs text-ink-400 font-medium">{{ getOrdersByStatus(col.status).length }}</span>
        </div>
        <div class="kanban-col__body">
          <div v-for="order in getOrdersByStatus(col.status)" :key="order.id" class="kanban-card" @click="selectedOrder = order">
            <div class="kanban-card__header">
              <span class="kanban-card__number">{{ order.number }}</span>
              <span class="badge text-[10px]" :class="priorityBadge(order.priority)">{{ priorityLabel(order.priority) }}</span>
            </div>
            <div class="kanban-card__title">{{ order.title }}</div>
            <div class="kanban-card__meta">
              <span class="flex items-center gap-1"><Building2 :size="11" /> {{ order.building }}</span>
              <span class="flex items-center gap-1"><Layers :size="11" /> {{ order.unit }}</span>
            </div>
            <div class="kanban-card__footer">
              <div class="flex items-center gap-2">
                <div class="kanban-card__avatar">{{ order.assignee.charAt(0) }}</div>
                <span class="text-xs text-ink-500">{{ order.assignee }}</span>
              </div>
              <span v-if="order.slaDue" class="kanban-card__sla" :class="slaClass(order.slaDue)">{{ order.slaDue }}</span>
            </div>
          </div>
          <div v-if="getOrdersByStatus(col.status).length === 0" class="kanban-col__empty">
            <Inbox :size="24" class="text-ink-300 mb-1" />
            <span class="text-xs text-ink-400">Bo'sh</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Plus, Filter, ClipboardList, Wrench, CheckCheck, CheckCircle2,
  Building2, Layers, Inbox,
} from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

interface WorkOrder {
  id: string; number: string; title: string; building: string; unit: string;
  status: 'NEW' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignee: string; slaDue: string;
}

const workOrders: WorkOrder[] = [
  { id: '1', number: 'WO-2026-038', title: 'Konditsioner ta\'miri (A-301)', building: 'Tashkent City', unit: 'A-301', status: 'NEW', priority: 'HIGH', assignee: 'Ravshan K.', slaDue: '2 soat' },
  { id: '2', number: 'WO-2026-037', title: 'Elektr simulator almashtirish', building: 'IT Park', unit: 'C-205', status: 'NEW', priority: 'MEDIUM', assignee: 'Jasur T.', slaDue: '5 soat' },
  { id: '3', number: 'WO-2026-036', title: 'Sanitarniy tekshiruv', building: 'Trillant Tower', unit: 'B-501', status: 'NEW', priority: 'LOW', assignee: 'Dilshod A.', slaDue: '1 kun' },
  { id: '4', number: 'WO-2026-035', title: 'Hammom trubasi oqishi', building: 'Piramit', unit: 'D-102', status: 'IN_PROGRESS', priority: 'URGENT', assignee: 'Ravshan K.', slaDue: '30 daq' },
  { id: '5', number: 'WO-2026-034', title: 'Lift texnik xizmat', building: 'Tashkent City', unit: 'Lift-2', status: 'IN_PROGRESS', priority: 'HIGH', assignee: 'Bekzod M.', slaDue: '1 soat' },
  { id: '6', number: 'WO-2026-033', title: 'Devor bo\'yash', building: 'IT Park', unit: 'C-201', status: 'IN_PROGRESS', priority: 'LOW', assignee: 'Dilshod A.', slaDue: '2 kun' },
  { id: '7', number: 'WO-2026-032', title: 'Xavfsizlik kameralari', building: 'Trillant Tower', unit: 'Lobbi', status: 'REVIEW', priority: 'MEDIUM', assignee: 'Jasur T.', slaDue: '—' },
  { id: '8', number: 'WO-2026-031', title: 'Oyna almashtirish', building: 'Tashkent City', unit: 'A-205', status: 'REVIEW', priority: 'MEDIUM', assignee: 'Bekzod M.', slaDue: '—' },
  { id: '9', number: 'WO-2026-030', title: 'Pol momi qilish', building: 'Piramit', unit: 'D-201', status: 'DONE', priority: 'LOW', assignee: 'Dilshod A.', slaDue: '—' },
  { id: '10', number: 'WO-2026-029', title: 'Yoritish lampalari', building: 'IT Park', unit: 'C-301', status: 'DONE', priority: 'MEDIUM', assignee: 'Ravshan K.', slaDue: '—' },
  { id: '11', number: 'WO-2026-028', title: 'Eshik qulfi almashtirish', building: 'Trillant Tower', unit: 'B-302', status: 'DONE', priority: 'HIGH', assignee: 'Jasur T.', slaDue: '—' },
]

const selectedOrder = ref<WorkOrder | null>(null)

const kanbanColumns = [
  { status: 'NEW' as const, label: 'Yangi', color: '#3b82f6' },
  { status: 'IN_PROGRESS' as const, label: 'Ishda', color: '#f59e0b' },
  { status: 'REVIEW' as const, label: 'Tekshirish', color: '#a855f7' },
  { status: 'DONE' as const, label: 'Yakunlangan', color: '#10b981' },
]

const statusCounts = computed(() => ({
  NEW: workOrders.filter(o => o.status === 'NEW').length,
  IN_PROGRESS: workOrders.filter(o => o.status === 'IN_PROGRESS').length,
  REVIEW: workOrders.filter(o => o.status === 'REVIEW').length,
  DONE: workOrders.filter(o => o.status === 'DONE').length,
}))

const activeCount = computed(() => workOrders.filter(o => o.status !== 'DONE').length)

function getOrdersByStatus(status: string) {
  return workOrders.filter(o => o.status === status)
}

function priorityBadge(p: string) {
  return { LOW: 'badge-neutral', MEDIUM: 'badge-brand', HIGH: 'badge-warning', URGENT: 'badge-danger' }[p] || 'badge-neutral'
}

function priorityLabel(p: string) {
  return { LOW: 'Past', MEDIUM: "O'rta", HIGH: 'Yuqori', URGENT: 'Shoshilinch' }[p] || p
}

function slaClass(sla: string) {
  if (sla === '—') return 'kanban-card__sla--done'
  if (sla.includes('daq') || sla.includes('soat')) return 'kanban-card__sla--urgent'
  return ''
}
</script>

<style scoped>
.kanban-col {
  border-radius: 14px;
  background: rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
}
.dark .kanban-col {
  background: rgba(255,255,255,0.02);
  border-color: rgba(255,255,255,0.06);
}
.kanban-col__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 14px 10px;
}
.kanban-col__body {
  flex: 1;
  padding: 0 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 100px;
}
.kanban-card {
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.15s;
}
.dark .kanban-card {
  background: rgba(255,255,255,0.03);
  border-color: rgba(255,255,255,0.06);
}
.kanban-card:hover {
  border-color: rgba(99,102,241,0.3);
  box-shadow: 0 4px 12px rgba(99,102,241,0.08);
  transform: translateY(-1px);
}
.kanban-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.kanban-card__number {
  font-size: 10px;
  font-weight: 700;
  color: #71717a;
  font-family: monospace;
}
.kanban-card__title {
  font-size: 13px;
  font-weight: 600;
  color: #18181b;
  line-height: 1.3;
  margin-bottom: 8px;
}
.dark .kanban-card__title { color: #fafafa; }
.kanban-card__meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 11px;
  color: #a1a1aa;
  margin-bottom: 8px;
}
.kanban-card__meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}
.kanban-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(0,0,0,0.04);
  padding-top: 8px;
}
.dark .kanban-card__footer { border-top-color: rgba(255,255,255,0.04); }
.kanban-card__avatar {
  width: 22px; height: 22px; border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white; font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.kanban-card__sla {
  font-size: 10px; font-weight: 700;
  padding: 2px 6px; border-radius: 4px;
  background: rgba(0,0,0,0.05); color: #71717a;
}
.dark .kanban-card__sla { background: rgba(255,255,255,0.05); }
.kanban-card__sla--urgent { background: rgba(239,68,68,0.1); color: #ef4444; }
.kanban-card__sla--done { background: rgba(16,185,129,0.1); color: #10b981; }
.kanban-col__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 80px;
}
</style>
