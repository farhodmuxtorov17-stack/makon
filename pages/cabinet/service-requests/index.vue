<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">CABINET / SERVICE-REQUESTS</div>
      <h1 class="page-title">Servis so'rovlari</h1>
        <p class="text-ink-500 text-sm mt-1">Texnik xizmat so'rovlari tarixi va holati</p>
      </div>
      <NuxtLink to="/cabinet/service-requests/new" class="btn btn-primary btn-sm btn-glow"><Plus :size="14" /> Yangi so'rov</NuxtLink>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="kpi-strip__icon"><Wrench :size="18" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ requests.length }}</div>
          <div class="dash-kpi__label">Jami so'rov</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="kpi-strip__icon"><Clock :size="18" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ activeCount }}</div>
          <div class="dash-kpi__label">Faol / Ishlanmoqda</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="kpi-strip__icon"><CheckCircle2 :size="18" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ resolvedCount }}</div>
          <div class="dash-kpi__label">Yechilgan</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--violet">
        <div class="kpi-strip__icon"><Star :size="18" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ avgRating }}<span class="text-sm">★</span></div>
          <div class="dash-kpi__label">O'rtacha reyting</div>
        </div>
      </div>
    </div>

    <!-- Status filter tabs -->
    <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 w-fit">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
        :class="activeTab === tab.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500 hover:text-ink-800 dark:text-ink-100'"
      >
        {{ tab.label }}
        <span v-if="tab.count > 0" class="ml-1 text-xs opacity-60">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Request cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        v-for="r in filteredRequests"
        :key="r.id"
        class="sr-card"
        :class="`sr-card--${r.status.toLowerCase()}`"
        @click="navigateTo('/cabinet/service-requests/new')"
      >
        <!-- Top -->
        <div class="sr-card__top">
          <div class="sr-card__left">
            <div class="sr-card__icon" :style="{ background: categoryColor(r.category) + '15', color: categoryColor(r.category) }">
              <component :is="categoryIcon(r.category)" :size="16" />
            </div>
            <div>
              <div class="sr-card__num">{{ r.number }}</div>
              <div class="sr-card__date">{{ r.date }}</div>
            </div>
          </div>
          <span class="sr-badge" :class="`sr-badge--${r.status.toLowerCase()}`">{{ statusLabel(r.status) }}</span>
        </div>

        <!-- Body -->
        <div class="sr-card__body">
          <div class="sr-card__cat" :style="{ color: categoryColor(r.category) }">{{ categoryLabel(r.category) }}</div>
          <div class="sr-card__desc">{{ r.description }}</div>
        </div>

        <!-- Timeline / Rating -->
        <div class="sr-card__foot">
          <!-- Mini timeline for active -->
          <div v-if="r.status === 'IN_PROGRESS' || r.status === 'ASSIGNED'" class="sr-timeline">
            <div class="sr-tl-step sr-tl-step--done"><CheckCircle2 :size="12" /></div>
            <div class="sr-tl-line sr-tl-line--done"></div>
            <div class="sr-tl-step sr-tl-step--done"><UserCheck :size="12" /></div>
            <div class="sr-tl-line sr-tl-line--done"></div>
            <div class="sr-tl-step sr-tl-step--active"><Loader :size="12" class="animate-spin" /></div>
            <div class="sr-tl-line"></div>
            <div class="sr-tl-step"><CheckCircle2 :size="12" /></div>
          </div>
          <!-- Rating for completed -->
          <div v-else-if="r.status === 'COMPLETED' && r.rating" class="sr-rating">
            <div class="sr-stars">
              <Star v-for="i in 5" :key="i" :size="13" :class="i <= r.rating ? 'sr-star--filled' : 'sr-star--empty'" />
            </div>
            <span class="sr-rating__text">{{ r.rating }} / 5</span>
          </div>
          <!-- Cancelled -->
          <div v-else-if="r.status === 'CANCELLED'" class="sr-cancelled">
            <XCircle :size="13" /> Bekor qilingan
          </div>
          <!-- Pending -->
          <div v-else class="sr-pending">
            <Clock :size="13" /> Kutilmoqda
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Wrench, Clock, CheckCircle2, Star, UserCheck, Loader, XCircle, Lightbulb, Droplet, DoorOpen, Thermometer, Snowflake, Zap } from 'lucide-vue-next'

definePageMeta({ roles: ['TENANT_OWNER'],  layout: 'admin', middleware: 'role' })

const makonStore = useMakonStore()
const activeTab = ref('all')

const requests = computed(() => makonStore.tenantServiceRequests)

const activeCount = computed(() => requests.value.filter(r => r.status === 'IN_PROGRESS').length)
const resolvedCount = computed(() => requests.value.filter(r => r.status === 'COMPLETED').length)
const ratedRequests = computed(() => requests.value.filter(r => r.rating !== null))
const avgRating = computed(() => {
  const rated = ratedRequests.value
  return rated.length > 0 ? (rated.reduce((sum, r) => sum + (r.rating || 0), 0) / rated.length).toFixed(1) : '—'
})

const tabs = computed(() => [
  { value: 'all', label: 'Barchasi', count: requests.value.length },
  { value: 'IN_PROGRESS', label: 'Faol', count: activeCount.value },
  { value: 'COMPLETED', label: 'Yechilgan', count: resolvedCount.value },
  { value: 'CANCELLED', label: 'Bekor', count: requests.value.filter(r => r.status === 'CANCELLED').length },
])

const filteredRequests = computed(() => {
  if (activeTab.value === 'all') return requests.value
  return requests.value.filter(r => r.status === activeTab.value)
})

function statusBadge(s: string) {
  return { IN_PROGRESS: 'badge-warning', COMPLETED: 'badge-success', CANCELLED: 'badge-danger', ASSIGNED: 'badge-brand' }[s] || 'badge-neutral'
}
function statusLabel(s: string) {
  return { IN_PROGRESS: 'Jarayonda', COMPLETED: 'Bajarildi', CANCELLED: 'Bekor qilindi', ASSIGNED: 'Tayinlandi' }[s] || s
}
function categoryColor(cat: string) {
  return { 'Elektr': '#f59e0b', 'Sanitariya': '#3b82f6', 'Konditsioner': '#06b6d4', 'Eshik-qulf': '#8b5cf6' }[cat] || '#71717a'
}
function categoryLabel(cat: string) { return cat }
function categoryIcon(cat: string) {
  return { 'Elektr': Zap, 'Sanitariya': Droplet, 'Konditsioner': Snowflake, 'Eshik-qulf': DoorOpen }[cat] || Wrench
}
</script>
<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  background: var(--card-bg, #fff);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px; position: relative; overflow: hidden;
}
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--violet::before { background: #8b5cf6; }
.kpi-strip__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); color: var(--accent, #2563EB); }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); color: #f59e0b; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); color: #10b981; }
.kpi-strip--violet .kpi-strip__icon { background: rgba(139,92,246,0.1); color: #8b5cf6; }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; }
.dash-kpi__label { font-size: 11px; color: var(--ink-500); margin-top: 3px; font-weight: 500; }

.sr-card {
  background: var(--card-bg, #fff);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px; padding: 16px 18px;
  cursor: pointer; transition: all 0.2s ease;
  position: relative; overflow: hidden;
}
.sr-card:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); border-color: rgba(37,99,235,0.2); }
.sr-card--in_progress { border-left: 3px solid #f59e0b; }
.sr-card--completed { border-left: 3px solid #10b981; }
.sr-card--cancelled { border-left: 3px solid #71717a; opacity: 0.65; }
.sr-card--pending { border-left: 3px solid #6366f1; }
.sr-card__top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.sr-card__left { display: flex; align-items: center; gap: 10px; }
.sr-card__icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sr-card__num { font-size: 13px; font-weight: 700; font-family: 'SF Mono', 'Fira Code', monospace; }
.sr-card__date { font-size: 11px; color: var(--ink-400); margin-top: 1px; }
.sr-badge { font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
.sr-badge--in_progress { background: rgba(245,158,11,0.12); color: #f59e0b; }
.sr-badge--completed { background: rgba(16,185,129,0.12); color: #10b981; }
.sr-badge--cancelled { background: rgba(113,113,122,0.12); color: #71717a; }
.sr-badge--pending { background: rgba(99,102,241,0.12); color: #6366f1; }
.sr-card__body { margin-top: 12px; }
.sr-card__cat { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.sr-card__desc { font-size: 13px; color: var(--ink-600, #444); margin-top: 4px; line-height: 1.5; }
.sr-card__foot { margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.04); }

.sr-timeline { display: flex; align-items: center; gap: 3px; }
.sr-tl-step { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.06); color: var(--ink-400); flex-shrink: 0; }
.sr-tl-step--done { background: rgba(16,185,129,0.12); color: #10b981; }
.sr-tl-step--active { background: rgba(245,158,11,0.15); color: #f59e0b; }
.sr-tl-line { width: 16px; height: 2px; background: rgba(0,0,0,0.08); border-radius: 1px; }
.sr-tl-line--done { background: #10b981; }

.sr-rating { display: flex; align-items: center; gap: 8px; }
.sr-stars { display: flex; gap: 2px; }
.sr-star--filled { color: #f59e0b; fill: #f59e0b; }
.sr-star--empty { color: rgba(0,0,0,0.15); }
.sr-rating__text { font-size: 11px; color: var(--ink-500); font-weight: 600; }

.sr-cancelled { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #71717a; font-weight: 500; }
.sr-pending { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #6366f1; font-weight: 500; }
:deep(.dark) .sr-card { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .sr-card__foot { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .kpi-strip { border-color: rgba(255,255,255,0.06); }
</style>
