<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">ADMIN / MONITORING</div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Tizim monitoringi</h1>
        <p class="text-ink-500 text-sm mt-1">Server holati, API va foydalanuvchilar faolligi</p>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-emerald-500 font-medium">Barcha tizimlar faol</span>
      </div>
    </div>

    <!-- System health cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card-premium p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><Server :size="16" class="text-emerald-500" /></div>
          <span class="text-xs text-ink-500">Server</span>
        </div>
        <div class="text-lg font-bold text-emerald-500">99.98%</div>
        <div class="text-xs text-ink-500 mt-0.5">Uptime (30 kun)</div>
      </div>
      <div class="card-premium p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><Gauge :size="16" class="text-blue-500" /></div>
          <span class="text-xs text-ink-500">API kechikish</span>
        </div>
        <div class="text-lg font-bold text-ink-900 dark:text-white">42<span class="text-xs text-ink-500 font-normal">ms</span></div>
        <div class="text-xs text-emerald-500 mt-0.5">↓ 8ms</div>
      </div>
      <div class="card-premium p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><Users :size="16" class="text-purple-500" /></div>
          <span class="text-xs text-ink-500">Online foydalanuvchilar</span>
        </div>
        <div class="text-lg font-bold text-ink-900 dark:text-white">7</div>
        <div class="text-xs text-ink-500 mt-0.5">/ 24 jami</div>
      </div>
      <div class="card-premium p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><Database :size="16" class="text-amber-500" /></div>
          <span class="text-xs text-ink-500">Ma'lumot bazasi</span>
        </div>
        <div class="text-lg font-bold text-ink-900 dark:text-white">1.2<span class="text-xs text-ink-500 font-normal">GB</span></div>
        <div class="text-xs text-ink-500 mt-0.5">/ 10GB limit</div>
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
          <div v-for="u in onlineUsers" :key="u.id" class="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
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
          <div v-for="err in errors" :key="err.id" class="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
            <div class="flex items-start gap-3">
              <AlertCircle :size="16" class="text-red-500 mt-0.5 flex-shrink-0" />
              <div class="flex-1">
                <div class="text-sm font-medium text-ink-900 dark:text-white">{{ err.title }}</div>
                <div class="text-xs text-ink-500 mt-0.5">{{ err.details }}</div>
              </div>
              <span class="text-xs text-ink-400 flex-shrink-0">{{ err.time }}</span>
            </div>
          </div>
          <div v-if="errors.length === 0" class="text-center py-8">
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
import { Activity, Users, AlertTriangle, Server, Database, Cpu, Zap, TrendingUp } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const makonStore = useMakonStore()

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
const errors = computed(() => makonStore.monitoringErrors)
</script>
<style scoped>
.metric-bar { padding: 4px 0; }
</style>
