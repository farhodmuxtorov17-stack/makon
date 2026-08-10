<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Tizim monitoringi</h1>
      <p class="text-ink-500 text-sm mt-1">Server holati va ishlash ko'rsatkichlari</p>
    </div>

    <!-- Live stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center"><Cpu :size="20" class="text-brand-500" /></div>
          <span class="text-xs text-emerald-500 font-medium">Normal</span>
        </div>
        <div class="text-2xl font-bold text-ink-900 dark:text-white">{{ cpuUsage }}%</div>
        <div class="text-xs text-ink-500">CPU ishlatish</div>
        <div class="mt-2 h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
          <div class="h-full bg-brand-500 rounded-full transition-all duration-1000" :style="{ width: cpuUsage + '%' }"></div>
        </div>
      </div>
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><MemoryStick :size="20" class="text-emerald-500" /></div>
          <span class="text-xs text-emerald-500 font-medium">Normal</span>
        </div>
        <div class="text-2xl font-bold text-ink-900 dark:text-white">{{ memUsage }}%</div>
        <div class="text-xs text-ink-500">Operativ xotira</div>
        <div class="mt-2 h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
          <div class="h-full bg-emerald-500 rounded-full transition-all duration-1000" :style="{ width: memUsage + '%' }"></div>
        </div>
      </div>
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><HardDrive :size="20" class="text-amber-500" /></div>
          <span class="text-xs text-amber-500 font-medium">Diqqat</span>
        </div>
        <div class="text-2xl font-bold text-ink-900 dark:text-white">{{ diskUsage }}%</div>
        <div class="text-xs text-ink-500">Disk hajmi</div>
        <div class="mt-2 h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
          <div class="h-full bg-amber-500 rounded-full transition-all duration-1000" :style="{ width: diskUsage + '%' }"></div>
        </div>
      </div>
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center"><Activity :size="20" class="text-brand-500" /></div>
          <span class="text-xs text-emerald-500 font-medium">Faol</span>
        </div>
        <div class="text-2xl font-bold text-ink-900 dark:text-white">{{ uptime }}</div>
        <div class="text-xs text-ink-500">Ishlash vaqti</div>
      </div>
    </div>

    <!-- Services -->
    <div>
      <h3 class="font-semibold mb-3 text-ink-900 dark:text-white">Xizmatlar holati</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="s in services" :key="s.name" class="card p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center" :class="s.status === 'UP' ? 'bg-emerald-500/10' : 'bg-red-500/10'">
                <component :is="s.icon" :size="18" :class="s.status === 'UP' ? 'text-emerald-500' : 'text-red-500'" />
              </div>
              <div>
                <div class="text-sm font-medium text-ink-900 dark:text-white">{{ s.name }}</div>
                <div class="text-xs text-ink-500">{{ s.url }}</div>
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full" :class="s.status === 'UP' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'"></span>
              <span class="text-xs font-medium" :class="s.status === 'UP' ? 'text-emerald-500' : 'text-red-500'">{{ s.status }}</span>
            </div>
          </div>
          <div class="flex items-center justify-between text-xs text-ink-500 mt-2 pt-2 border-t border-black/5 dark:border-white/5">
            <span>Response: {{ s.latency }}ms</span>
            <span>Uptime: {{ s.uptime }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Request chart -->
    <div class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">So'rovlar dinamikasi (24 soat)</h3>
        <span class="text-xs text-ink-500">Har soatda</span>
      </div>
      <div class="flex items-end justify-between h-40 gap-1">
        <div v-for="(r, i) in requestChart" :key="i" class="flex-1 flex flex-col items-center gap-1">
          <div class="w-full rounded-t bg-brand-500/40 hover:bg-brand-500 transition-all cursor-pointer" :style="{ height: barHeight(r) + 'px' }" :title="r + ' so\'rov'"></div>
          <span class="text-[10px] text-ink-500">{{ i }}</span>
        </div>
      </div>
    </div>

    <!-- Recent errors -->
    <div class="card p-6">
      <h3 class="font-semibold mb-3 text-ink-900 dark:text-white">So'nggi xatoliklar</h3>
      <div class="space-y-2">
        <div v-for="e in errors" :key="e.id" class="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
          <AlertTriangle :size="16" class="text-red-500 flex-shrink-0" />
          <div class="flex-1">
            <div class="text-sm font-medium text-ink-900 dark:text-white">{{ e.message }}</div>
            <div class="text-xs text-ink-500">{{ e.endpoint }} · {{ e.time }}</div>
          </div>
          <span class="badge badge-danger text-xs">{{ e.code }}</span>
        </div>
        <div v-if="errors.length === 0" class="text-center py-4 text-emerald-500 text-sm">Xatoliklar yo'q 🎉</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cpu, MemoryStick, HardDrive, Activity, AlertTriangle, Server, Database, Globe, Cloud, Zap } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const cpuUsage = ref(34)
const memUsage = ref(58)
const diskUsage = ref(72)
const uptime = '99.97%'

// Animate values
onMounted(() => {
  setInterval(() => {
    cpuUsage.value = Math.floor(Math.random() * 40) + 20
    memUsage.value = Math.floor(Math.random() * 30) + 40
  }, 3000)
})

const services = [
  { icon: Server, name: 'API Server', url: 'api.makon.uz', status: 'UP', latency: 45, uptime: 99.97 },
  { icon: Database, name: 'Database', url: 'db.makon.uz', status: 'UP', latency: 12, uptime: 99.99 },
  { icon: Globe, name: 'Web Server', url: 'makon.uz', status: 'UP', latency: 28, uptime: 99.95 },
  { icon: Cloud, name: 'File Storage', url: 'cdn.makon.uz', status: 'UP', latency: 85, uptime: 99.93 },
  { icon: Zap, name: 'ERI Gateway', url: 'eri.makon.uz', status: 'UP', latency: 120, uptime: 99.90 },
  { icon: Database, name: 'Backup', url: 'backup.makon.uz', status: 'UP', latency: 15, uptime: 100 },
]

const requestChart = Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * 80) + 20)
function barHeight(v: number) { return (v / 100) * 120 }

const errors = [
  { id: 'e-1', message: 'ERI gateway timeout', endpoint: '/api/eri/sign', code: '504', time: '2 soat oldin' },
  { id: 'e-2', message: 'Rate limit exceeded', endpoint: '/api/catalog', code: '429', time: '5 soat oldin' },
]
</script>
