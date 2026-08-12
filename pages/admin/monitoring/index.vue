<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">ADMIN / MONITORING</div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Tizim monitoringi</h1>
        <p class="text-ink-500 text-sm mt-1">Server holati, API va foydalanuvchilar faolligi</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="refreshData" class="btn btn-secondary btn-sm" :class="{ 'animate-spin': isRefreshing }">
          <RefreshCw :size="14" /> Yangilash
        </button>
        <div class="flex items-center gap-2 text-sm px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-emerald-500 font-medium">Barcha tizimlar faol</span>
        </div>
      </div>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="kpi-strip kpi-strip--emerald">
        <div class="kpi-strip__icon"><CheckCircle :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">99.98<span class="text-sm">%</span></div>
          <div class="kpi-strip__label">Server Uptime</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--blue">
        <div class="kpi-strip__icon"><DollarSign :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">42<span class="text-sm">ms</span></div>
          <div class="kpi-strip__label">API kechikish</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--teal">
        <div class="kpi-strip__icon"><Building2 :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">7<span class="text-sm text-ink-400"> / 24</span></div>
          <div class="kpi-strip__label">Online foydalanuvchilar</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--amber">
        <div class="kpi-strip__icon"><Package :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">1.2<span class="text-sm">GB</span></div>
          <div class="kpi-strip__label">Ma'lumot bazasi</div>
        </div>
      </div>
    </div>

    <!-- API response chart -->
    <div class="card-premium p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">API javob vaqti (24 soat)</h3>
        <span class="text-xs text-ink-500">ms</span>
      </div>
      <MakonChart type="area" :series="apiSeries" :categories="apiHours" :height="220" :colors="['#3b82f6']" />
    </div>

    <!-- Two columns: Online users + Error log -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Online users -->
      <div class="card-premium p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Online foydalanuvchilar</h3>
        <div class="space-y-2">
          <div v-for="u in onlineUsers" :key="u.id" @click="viewUserProfile(u.id)" class="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-500/5 cursor-pointer transition-colors">
            <div class="relative">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0" :style="{ background: roleColor(u.role) }">
                {{ u.name.charAt(0) }}
              </div>
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-ink-900"></span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-ink-900 dark:text-white truncate">{{ u.name }}</div>
              <div class="text-xs text-ink-500">{{ u.page }}</div>
            </div>
            <span class="text-xs text-ink-400 flex-shrink-0">{{ u.duration }}</span>
          </div>
        </div>
      </div>

      <!-- Error log -->
      <div class="card-premium p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">So'nggi xatolar</h3>
        <div class="space-y-2">
          <div v-for="err in visibleErrors" :key="err.id" class="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
            <div class="flex items-start gap-3">
              <AlertCircle :size="16" class="text-red-500 mt-0.5 flex-shrink-0" />
              <div class="flex-1">
                <div class="text-sm font-medium text-ink-900 dark:text-white">{{ err.title }}</div>
                <div class="text-xs text-ink-500 mt-0.5">{{ err.details }}</div>
              </div>
              <span class="text-xs text-ink-400 flex-shrink-0">{{ err.time }}</span>
            </div>
          </div>
          <div v-if="visibleErrors.length === 0" class="text-center py-8">
            <CheckCircle :size="32" class="text-emerald-500 mx-auto mb-2" />
            <p class="text-ink-500 text-sm">Xatolar yo'q 🎉</p>
          </div>
        </div>
      </div>
    </div>

    <!-- System metrics bars -->
    <div class="card-premium p-5">
      <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Resurs sarfi</h3>
      <div class="space-y-4">
        <div v-for="m in metrics" :key="m.label" class="metric-bar">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-sm font-medium text-ink-900 dark:text-white flex items-center gap-2">
              <component :is="m.icon" :size="15" class="text-ink-400" />
              {{ m.label }}
            </span>
            <span class="text-sm font-bold" :class="m.value > 80 ? 'text-red-500' : m.value > 60 ? 'text-amber-500' : 'text-emerald-500'">{{ m.value }}%</span>
          </div>
          <div class="h-2.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
            <div class="h-full rounded-full transition-all" :style="{ width: m.value + '%', background: m.value > 80 ? '#ef4444' : m.value > 60 ? '#f59e0b' : '#10b981' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Activity, Users, AlertTriangle, Server, Database, Cpu, Zap, TrendingUp, AlertCircle, CheckCircle, RefreshCw, X , Building2, DollarSign, Package} from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const makonStore = useMakonStore()
const isRefreshing = ref(false)

function refreshData() {
  isRefreshing.value = true
  setTimeout(() => isRefreshing.value = false, 1200)
}

const metrics = computed(() => [
  { label: 'API Latency', value: makonStore.monitoringMetrics.apiLatency + 'ms', icon: Zap, color: '#10b981', status: 'healthy' },
  { label: 'Uptime', value: makonStore.monitoringMetrics.uptime + '%', icon: Activity, color: '#2563EB', status: 'healthy' },
  { label: 'Faol foydalanuvchilar', value: makonStore.monitoringMetrics.activeUsers, icon: Users, color: '#f59e0b', status: 'normal' },
  { label: 'DB Hajmi', value: makonStore.monitoringMetrics.dbSize, icon: Database, color: '#8b5cf6', status: 'normal' },
  { label: "So'rovlar soni", value: makonStore.monitoringMetrics.totalRequests.toLocaleString(), icon: Server, color: '#ec4899', status: 'normal' },
  { label: 'Xato stavkasi', value: makonStore.monitoringMetrics.errorRate + '%', icon: AlertTriangle, color: '#ef4444', status: 'warning' },
])

const apiHours = ['00', '02', '04', '06', '08', '10', '12', '14', '16']
const apiSeries = [45, 38, 42, 68, 120, 185, 210, 165, 142]

const onlineUsers = computed(() => makonStore.onlineUsers)
const visibleErrors = computed(() => makonStore.monitoringErrors.slice(0, 5))

function viewUserProfile(id: string) {
  navigateTo(`/admin/users/${id}`)
}
const errors = computed(() => makonStore.monitoringErrors)

function roleColor(role: string) {
  const colors: Record<string, string> = {
    SUPER_HEAD: '#2563EB',
    BUILDING_MANAGER: '#10b981',
    ACCOUNTANT: '#f59e0b',
    FACILITY: '#8b5cf6',
    TENANT_OWNER: '#ec4899',
  }
  return colors[role] || '#71717a'
}
</script>
<style scoped>
.metric-bar { padding: 4px 0; }

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
