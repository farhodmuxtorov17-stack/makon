<template>
  <div class="space-y-6">
    <PageHeader title="Monitoring" subtitle="Tizim holati va samaradorlik" />

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-5">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><Server :size="20" class="text-emerald-600" /></div>
          <div><p class="font-semibold text-sm">Tizim holati</p><p class="text-xs text-ink-400">Barcha xizmatlar</p></div>
        </div>
        <span class="badge badge-success">Faol</span>
      </div>
      <StatCard icon="Cpu" :value="'42%'" label="CPU" iconBg="bg-brand-50" iconColor="text-brand-600" />
      <StatCard icon="MemoryStick" :value="'6.2 GB'" label="RAM" iconBg="bg-sky-50" iconColor="text-sky-600" />
      <StatCard icon="HardDrive" :value="'340 GB'" label="Disk" iconBg="bg-amber-50" iconColor="text-amber-600" />
    </div>

    <div class="card p-6">
      <h3 class="font-semibold mb-4">Xizmatlar holati</h3>
      <div class="space-y-3">
        <div v-for="s in services" :key="s.name" class="flex items-center justify-between py-3 border-b border-ink-100 last:border-0">
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full" :class="s.status === 'UP' ? 'bg-emerald-500' : 'bg-rose-500'"></div>
            <div>
              <p class="font-medium text-sm">{{ s.name }}</p>
              <p class="text-xs text-ink-400">{{ s.url }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-sm font-semibold" :class="s.status === 'UP' ? 'text-emerald-600' : 'text-rose-600'">{{ s.status === 'UP' ? s.latency + 'ms' : 'Offline' }}</p>
            <p class="text-xs text-ink-400">{{ s.uptime }}% uptime</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card p-6">
        <h3 class="font-semibold mb-4">So'rovlar dinamikasi</h3>
        <client-only>
          <apexchart type="area" height="200" :options="reqChartOptions" :series="reqSeries" />
        </client-only>
      </div>
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Oxirgi hodisalar</h3>
        <div class="space-y-3">
          <div v-for="log in logs" :key="log.id" class="flex items-start gap-3 text-sm">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" :class="log.bg">
              <component :is="log.icon" :size="14" :class="log.color" />
            </div>
            <div class="flex-1">
              <p class="text-ink-700">{{ log.text }}</p>
              <p class="text-xs text-ink-400 mt-0.5">{{ formatDate(log.time, 'relative') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Server, Cpu, MemoryStick, HardDrive, CheckCircle2, AlertTriangle, RefreshCw, Database } from 'lucide-vue-next'
import type { Component } from 'vue'
const { formatDate } = useFormat()

const services = [
  { name: 'API Gateway', url: 'api.makon.uz', status: 'UP', latency: 42, uptime: 99.98 },
  { name: 'Database', url: 'db.makon.uz:5432', status: 'UP', latency: 8, uptime: 99.99 },
  { name: 'Redis Cache', url: 'redis.makon.uz:6379', status: 'UP', latency: 2, uptime: 100 },
  { name: 'File Storage', url: 's3.makon.uz', status: 'UP', latency: 35, uptime: 99.95 },
  { name: 'ERI Service', url: 'eri.uz/api', status: 'UP', latency: 120, uptime: 99.85 },
  { name: 'Click API', url: 'api.click.uz', status: 'UP', latency: 85, uptime: 99.92 },
]

const reqSeries = [{ name: "So'rovlar/min", data: [120, 145, 132, 178, 165, 190, 185, 210, 195, 225, 240, 218] }]
const reqChartOptions = {
  chart: { type: 'area', toolbar: { show: false }, fontFamily: 'Inter, sans-serif', sparkline: { enabled: true } },
  colors: ['#4f46e5'],
  stroke: { curve: 'smooth', width: 2 },
  fill: { type: 'gradient', gradient: { opacityFrom: 0.15, opacityTo: 0.01 } },
  dataLabels: { enabled: false },
}

const logs: { id: string; icon: Component; text: string; time: string; bg: string; color: string }[] = [
  { id: 'l1', icon: CheckCircle2, text: 'Database backup muvaffaqiyatli yakunlandi', time: '2025-07-08T03:00:00', bg: 'bg-emerald-50', color: 'text-emerald-600' },
  { id: 'l2', icon: RefreshCw, text: 'API Gateway qayta ishga tushdi', time: '2025-07-08T02:15:00', bg: 'bg-sky-50', color: 'text-sky-600' },
  { id: 'l3', icon: Database, text: 'Redis cache tozalandi (2.4 GB)', time: '2025-07-07T22:00:00', bg: 'bg-brand-50', color: 'text-brand-600' },
  { id: 'l4', icon: AlertTriangle, text: 'ERI service kechikish aniqlandi (120ms)', time: '2025-07-07T18:30:00', bg: 'bg-amber-50', color: 'text-amber-600' },
  { id: 'l5', icon: CheckCircle2, text: 'Click API ulanishi tiklandi', time: '2025-07-07T14:00:00', bg: 'bg-emerald-50', color: 'text-emerald-600' },
]
</script>
