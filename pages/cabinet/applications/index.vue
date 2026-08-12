<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">CABINET / APPLICATIONS</div>
      <h1 class="page-title">Ariza va hujjatlar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ apps.length }} ta ariza · {{ activeCount }} faol</p>
      </div>
      <NuxtLink to="/catalog" class="btn btn-primary btn-sm btn-glow"><Plus :size="14" /> Yangi ariza</NuxtLink>
    </div>

    <!-- Status tabs -->
    <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 w-fit overflow-x-auto">
      <button v-for="tab in tabs" :key="tab.value" @click="statusFilter = tab.value"
        class="px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all font-medium"
        :class="statusFilter === tab.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500'">
        {{ tab.label }}
        <span v-if="tab.count > 0" class="ml-1 text-xs" :class="statusFilter === tab.value ? 'text-brand-500' : 'text-ink-400'">{{ tab.count }}</span>
      </button>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ apps.length }}</div>
          <div class="dash-kpi__label">Jami arizalar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ activeCount }}</div>
          <div class="dash-kpi__label">Faol</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><PenTool :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ pendingCount }}</div>
          <div class="dash-kpi__label">Jarayonda</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileSignature :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ signedCount }}</div>
          <div class="dash-kpi__label">Imzolangan</div>
        </div>
      </div>
    </div>

    <!-- Applications -->
    <div class="space-y-4">
      <div v-for="app in filteredApps" :key="app.id" class="card p-5 hover:shadow-md transition-shadow">
        <!-- Header -->
        <div class="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0" :class="appStatusClass(app.status)">
              {{ app.number.slice(-3) }}
            </div>
            <div>
              <div class="font-semibold text-ink-900 dark:text-white text-sm">{{ app.number }}</div>
              <div class="text-xs text-ink-500 mt-0.5">{{ app.unit }} · {{ app.type === 'RENT' ? 'Ijara' : 'Sotib olish' }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-ink-900 dark:text-white">{{ formatUZS(app.price) }}</div>
            <span class="badge text-xs mt-1 inline-block" :class="appStatusBadge(app.status)">{{ appStatusLabel(app.status) }}</span>
          </div>
        </div>

        <!-- Timeline -->
        <div class="flex items-center mb-4 overflow-x-auto pb-1">
          <div v-for="(step, i) in app.timeline" :key="i" class="flex items-center flex-shrink-0">
            <div class="flex flex-col items-center gap-1.5">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all"
                :class="step.done ? 'bg-emerald-500/10 text-emerald-500' : step.current ? 'bg-brand-500/10 text-brand-500' : 'bg-black/5 dark:bg-white/5 text-ink-400'"
              >
                <Check v-if="step.done" :size="14" />
                <Clock v-else-if="step.current" :size="14" />
                <span v-else class="text-[10px]">{{ i + 1 }}</span>
              </div>
              <span class="text-[10px] whitespace-nowrap font-medium" :class="step.done ? 'text-ink-900 dark:text-white' : step.current ? 'text-brand-500' : 'text-ink-400'">{{ step.label }}</span>
            </div>
            <div v-if="i < app.timeline.length - 1" class="w-6 sm:w-12 h-0.5 mx-1 rounded-full flex-shrink-0" :class="step.done && app.timeline[i+1].done ? 'bg-emerald-500/40' : 'bg-black/10 dark:bg-white/10'"></div>
          </div>
        </div>

        <!-- Details -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs">
          <div>
            <div class="text-ink-500 mb-0.5">Yaratilgan</div>
            <div class="font-medium text-ink-900 dark:text-white">{{ app.createdDate }}</div>
          </div>
          <div>
            <div class="text-ink-500 mb-0.5">Muddat</div>
            <div class="font-medium text-ink-900 dark:text-white">{{ app.durationMonths }} oy</div>
          </div>
          <div>
            <div class="text-ink-500 mb-0.5">Boshlash</div>
            <div class="font-medium text-ink-900 dark:text-white">{{ app.startDate }}</div>
          </div>
          <div>
            <div class="text-ink-500 mb-0.5">ERI imzo</div>
            <div class="font-medium" :class="app.eriSigned ? 'text-emerald-500' : 'text-amber-500'">{{ app.eriSigned ? 'Imzolangan' : 'Kutilmoqda' }}</div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 flex-wrap pt-3 border-t border-black/5 dark:border-white/5">
          <NuxtLink :to="`/applications/${app.id}/offer`" class="btn btn-secondary btn-sm">
            <FileText :size="14" /> Tijoriy taklif
          </NuxtLink>
          <NuxtLink :to="`/applications/${app.id}/history`" class="btn btn-ghost btn-sm">
            <History :size="14" /> Tarix
          </NuxtLink>
          <button v-if="app.status === 'DRAFT_READY' && !app.eriSigned" class="btn btn-primary btn-sm ml-auto">
            <FileSignature :size="14" /> ERI imzolash
          </button>
          <NuxtLink v-if="app.status === 'SIGNED' || app.status === 'ACTIVE'" :to="`/contracts/${app.contractId}`" class="btn btn-primary btn-sm ml-auto">
            <ScrollText :size="14" /> Shartnomani ko'rish
          </NuxtLink>
          <span v-if="app.status === 'FINANCE_REVIEW'" class="text-xs text-ink-500 ml-auto flex items-center gap-1">
            <Clock :size="12" /> Buxgalter ko'rik kutilmoqda
          </span>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filteredApps.length === 0" class="card p-12 text-center">
      <FileText :size="32" class="text-ink-300 mx-auto mb-3" />
      <p class="text-ink-500 text-sm mb-4">Bu statusda arizalar yo'q</p>
      <NuxtLink to="/catalog" class="btn btn-primary btn-sm btn-glow"><Plus :size="14" /> Yangi ariza yuborish</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Check, Clock, FileText, History, FileSignature, ScrollText , CheckCircle, PenTool} from 'lucide-vue-next'

definePageMeta({ roles: ['TENANT_OWNER'],  layout: 'admin', middleware: 'role' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const statusFilter = ref('')

const tabs = computed(() => [
  { value: '', label: 'Hammasi', count: apps.value.length },
  { value: 'SUBMITTED', label: 'Yuborilgan', count: apps.value.filter(a => a.status === 'SUBMITTED').length },
  { value: 'FINANCE_REVIEW', label: 'Moliyaviy', count: apps.value.filter(a => a.status === 'FINANCE_REVIEW').length },
  { value: 'DRAFT_READY', label: 'Loyiha tayyor', count: apps.value.filter(a => a.status === 'DRAFT_READY').length },
  { value: 'SIGNED', label: 'Imzolangan', count: apps.value.filter(a => a.status === 'SIGNED').length },
  { value: 'ACTIVE', label: 'Faol', count: apps.value.filter(a => a.status === 'ACTIVE').length },
])

const store = useMakonStore()

function buildTimeline(status: string) {
  const steps = ['SUBMITTED', 'OPERATION_REVIEW', 'FINANCE_REVIEW', 'DRAFT_READY', 'SIGNED', 'ACTIVE']
  const labels = ['Ariza', 'Operatsion', 'Moliyaviy', 'Loyiha', 'ERI imzo', 'Faol']
  const idx = steps.indexOf(status)
  return labels.map((label, i) => ({
    label,
    done: i < idx || (i === idx && (status === 'SIGNED' || status === 'ACTIVE')),
    current: i === idx && status !== 'ACTIVE',
  }))
}

const apps = computed(() => store.applications.map(a => {
  const unit = store.units.find(u => u.id === a.unitId)
  const building = store.buildings.find(b => b.id === unit?.buildingId)
  return {
    id: a.id,
    number: a.number,
    unit: (unit?.code || '') + ' ' + (building?.name || ''),
    type: a.type,
    price: a.offeredPrice,
    status: a.status,
    eriSigned: a.status === 'SIGNED' || a.status === 'ACTIVE',
    contractId: store.contracts.find(c => c.applicationId === a.id)?.id || '',
    createdDate: formatDate(a.createdDate),
    durationMonths: a.durationMonths,
    startDate: a.desiredStartDate || '—',
    timeline: buildTimeline(a.status),
  }
}))

const activeCount = computed(() => apps.value.filter((a: any) => a.status === 'ACTIVE' || a.status === 'SIGNED').length)
const filteredApps = computed(() => statusFilter.value ? apps.value.filter((a: any) => a.status === statusFilter.value) : apps.value)



function appStatusLabel(s: string) {
  return { SUBMITTED: 'Yuborilgan', OPERATION_REVIEW: 'Operatsion', FINANCE_REVIEW: 'Moliyaviy ko\'rik', FINANCE_APPROVED: 'Moliya tasdiq', DRAFT_READY: 'Loyiha tayyor', PARTIALLY_SIGNED: 'Qisman imzo', SIGNED: 'Imzolangan', ACTIVE: 'Faol', REJECTED: 'Rad etilgan' }[s] || s
}
function appStatusBadge(s: string) {
  return { SUBMITTED: 'badge-neutral', OPERATION_REVIEW: 'badge-brand', FINANCE_REVIEW: 'badge-brand', FINANCE_APPROVED: 'badge-brand', DRAFT_READY: 'badge-warning', PARTIALLY_SIGNED: 'badge-warning', SIGNED: 'badge-success', ACTIVE: 'badge-success', REJECTED: 'badge-danger' }[s] || 'badge-neutral'
}
function appStatusClass(s: string) {
  return { SUBMITTED: 'bg-ink-500/10 text-ink-500', OPERATION_REVIEW: 'bg-brand-500/10 text-brand-500', FINANCE_REVIEW: 'bg-blue-500/10 text-blue-500', FINANCE_APPROVED: 'bg-brand-500/10 text-brand-500', DRAFT_READY: 'bg-amber-500/10 text-amber-500', PARTIALLY_SIGNED: 'bg-amber-500/10 text-amber-500', SIGNED: 'bg-emerald-500/10 text-emerald-500', ACTIVE: 'bg-emerald-500/10 text-emerald-500', REJECTED: 'bg-red-500/10 text-red-500' }[s] || 'bg-ink-500/10 text-ink-500'
}
const pendingCount = computed(() => apps.value.filter((a: any) => a.status === "PENDING").length)
const signedCount = computed(() => apps.value.filter((a: any) => a.status === "SIGNED").length)


</script>

<style scoped>
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
.dash-kpi__body { flex: 1; min-width: 0; }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.dash-kpi__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }
</style>
