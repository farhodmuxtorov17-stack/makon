<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">ADMIN / AUDIT</div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Audit jurnali</h1>
        <p class="text-ink-500 text-sm mt-1">{{ entries.length }} ta yozuv · So'nggi 24 soat</p>
      </div>
      <button class="btn btn-secondary btn-sm" @click="() => {}"><Download :size="14" /> Eksport</button>
    </div>

    <!-- KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="kpi-strip kpi-strip--emerald">
        <div class="kpi-strip__icon"><KpiScene3D type="applications" :size="38" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ createCount }}</div>
          <div class="kpi-strip__label">Yaratilgan</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--teal">
        <div class="kpi-strip__icon"><KpiScene3D type="contract" :size="38" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ updateCount }}</div>
          <div class="kpi-strip__label">Tahrirlangan</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--amber">
        <div class="kpi-strip__icon"><KpiScene3D type="overdue" :size="38" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ deleteCount }}</div>
          <div class="kpi-strip__label">O'chirilgan</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--blue">
        <div class="kpi-strip__icon"><KpiScene3D type="signing" :size="38" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ authCount }}</div>
          <div class="kpi-strip__label">Kirish amallari</div>
        </div>
      </div>
    </div>

    <!-- Filter -->
    <div class="flex flex-wrap items-center gap-3">
      <div class="relative">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input v-model="search" type="text" placeholder="Amal yoki foydalanuvchi..." class="w-64 text-sm border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
      </div>
      <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5">
        <button v-for="t in typeTabs" :key="t.value" @click="typeFilter = t.value" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all" :class="typeFilter === t.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500'">
          {{ t.label }}
        </button>
      </div>
    </div>

    <!-- Audit timeline -->
    <div class="card-premium p-5">
      <div class="audit-timeline">
        <div v-for="entry in filteredEntries" :key="entry.id" class="audit-timeline__item">
          <div class="audit-timeline__marker" :style="{ background: actionColor(entry.type) + '15', color: actionColor(entry.type) }">
            <component :is="actionIcon(entry.type)" :size="15" />
          </div>
          <div class="audit-timeline__body">
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="text-sm text-ink-900 dark:text-white">
                  <span class="font-medium">{{ entry.user }}</span>
                  <span class="text-ink-500"> · </span>
                  <span class="font-mono text-xs">{{ entry.action }}</span>
                </div>
                <div class="text-xs text-ink-500 mt-0.5">{{ entry.description }}</div>
              </div>
              <div class="text-right flex-shrink-0">
                <div class="text-xs text-ink-400 font-mono">{{ entry.time }}</div>
                <div class="text-[10px] text-ink-400 mt-0.5">{{ entry.ip }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, Search, FileText, Edit3, Trash2, CheckCircle, AlertCircle, LogIn, LogOut, FileSignature, Building2, UserPlus } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const makonStore = useMakonStore()
const search = ref('')
const typeFilter = ref('all')

const typeTabs = [
  { value: 'all', label: 'Barchasi' },
  { value: 'CREATE', label: 'Yaratish' },
  { value: 'UPDATE', label: "Tahrir" },
  { value: 'DELETE', label: "O'chirish" },
  { value: 'AUTH', label: 'Kirish' },
  { value: 'APPROVE', label: 'Tasdiqlash' },
]

const entries = computed(() => makonStore.auditLogs)

const createCount = computed(() => entries.value.filter(e => e.type === 'CREATE').length)
const updateCount = computed(() => entries.value.filter(e => e.type === 'UPDATE').length)
const deleteCount = computed(() => entries.value.filter(e => e.type === 'DELETE').length)
const authCount = computed(() => entries.value.filter(e => e.type === 'AUTH').length)

const filteredEntries = computed(() => {
  let result = [...entries.value]
  if (typeFilter.value !== 'all') result = result.filter(e => e.type === typeFilter.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(e => e.user.toLowerCase().includes(q) || e.action.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
  }
  return result
})

function actionColor(type: string) {
  return { CREATE: '#10b981', UPDATE: 'var(--accent)', DELETE: '#ef4444', AUTH: '#3b82f6', APPROVE: 'var(--accent)' }[type] || '#71717a'
}
function actionIcon(type: string) {
  return { CREATE: FileText, UPDATE: Edit3, DELETE: Trash2, AUTH: LogIn, APPROVE: CheckCircle }[type] || AlertCircle
}
</script>
<style scoped>
.audit-timeline { display: flex; flex-direction: column; gap: 0; }
.audit-timeline__item { display: flex; gap: 12px; padding-bottom: 16px; position: relative; }
.audit-timeline__item:not(:last-child)::before { content: ''; position: absolute; left: 16px; top: 32px; bottom: 0; width: 2px; background: rgba(0,0,0,0.05); }
.dark .audit-timeline__item:not(:last-child)::before { background: rgba(255,255,255,0.05); }
.audit-timeline__marker { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index: 1; }
.audit-timeline__body { flex: 1; min-width: 0; }

/* KPI Strip */
.kpi-strip {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
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
.kpi-strip__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip__body { flex: 1; min-width: 0; }
.kpi-strip__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.kpi-strip__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }
</style>
