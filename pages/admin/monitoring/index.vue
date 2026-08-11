<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Tizim monitoringi</h1>
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
import { Server, Gauge, Users, Database, AlertCircle, CheckCircle, Cpu, HardDrive, Activity, Wifi } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const apiHours = ['00', '02', '04', '06', '08', '10', '12', '14', '16']
const apiSeries = [
  { name: 'Javob vaqti', data: [28, 25, 22, 35, 48, 62, 55, 42, 38] },
]

const onlineUsers = [
  { id: '1', name: 'Alisher Qodirov', role: 'SUPER_HEAD', page: 'Dashboard / Executive', duration: '2s' },
  { id: '2', name: 'Dilnoza Karimova', role: 'ACCOUNTANT', page: 'Finance / Invoices', duration: '45s' },
  { id: '3', name: 'Sardor Yusupov', role: 'BUILDING_MANAGER', page: 'Management / Buildings', duration: '1m' },
  { id: '4', name: 'Ravshan Keldiyev', role: 'FACILITY', page: 'Facility / Work Orders', duration: '3m' },
  { id: '5', name: 'Jasur Tursunov', role: 'FACILITY', page: 'Facility / Material Requests', duration: '8m' },
  { id: '6', name: 'Kamola Rashidova', role: 'SUPER_HEAD', page: 'Admin / Users', duration: '12m' },
  { id: '7', name: 'Otabek Yo\'ldoshev', role: 'BUILDING_MANAGER', page: 'Cabinet', duration: '25m' },
]

const errors = [
  { id: '1', title: 'ERI timeout', details: 'Provayder javob bermadi (10s limit). Retry 2/3', time: '12:45' },
  { id: '2', title: 'API 429 Rate limit', details: '/api/contracts — user Sardor Yusupov', time: '09:30' },
]

const metrics = [
  { label: 'CPU', value: 34, icon: Cpu },
  { label: 'RAM', value: 62, icon: Activity },
  { label: 'Disk', value: 12, icon: HardDrive },
  { label: 'Tarmoq', value: 28, icon: Wifi },
]

function roleColor(r: string) {
  return { SUPER_HEAD: '#8b5cf6', BUILDING_MANAGER: '#6366f1', ACCOUNTANT: '#10b981', FACILITY: '#f59e0b' }[r] || '#71717a'
}
</script>

<style scoped>
.metric-bar { padding: 4px 0; }
</style>
