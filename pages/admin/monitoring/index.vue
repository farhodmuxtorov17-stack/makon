<template>
  <div class="space-y-6">
    <div>
      <h1 class="font-display text-2xl font-bold tracking-tight">Monitoring</h1>
      <p class="text-ink-500 text-sm mt-0.5">Tizim holati va ishlash ko'rsatkichlari</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="s in services" :key="s.name" class="card p-5">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-medium text-sm text-ink-600">{{ s.name }}</h3>
          <div class="w-2.5 h-2.5 rounded-full" :class="statusDot(s.status)"></div>
        </div>
        <p class="text-2xl font-bold font-display">{{ s.responseTime }}ms</p>
        <p class="text-sm text-ink-400 mt-0.5">{{ s.uptime }}% uptime</p>
        <span class="badge mt-3" :class="statusBadge(s.status)">{{ statusLabel(s.status) }}</span>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="font-semibold mb-4">So'nggi hodisalar</h3>
      <div class="space-y-3 text-sm">
        <div v-for="(log, i) in logs" :key="i" class="flex items-center gap-3 py-2">
          <div class="w-2 h-2 rounded-full" :class="log.color"></div>
          <span class="text-ink-500 font-mono text-xs w-20">{{ log.time }}</span>
          <span class="text-ink-700">{{ log.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const services = [
  { name: 'API Server', status: 'healthy', responseTime: 45, uptime: 99.98 },
  { name: 'Database', status: 'healthy', responseTime: 12, uptime: 99.99 },
  { name: 'Storage', status: 'healthy', responseTime: 28, uptime: 99.95 },
  { name: 'ERI Service', status: 'degraded', responseTime: 320, uptime: 98.21 },
]

const logs = [
  { time: '06:27', message: 'API Server: Health check passed', color: 'bg-emerald-500' },
  { time: '06:25', message: 'Database: Backup completed (2.4 GB)', color: 'bg-emerald-500' },
  { time: '06:20', message: 'ERI Service: Response time degraded (320ms)', color: 'bg-amber-500' },
  { time: '06:15', message: 'Storage: New file uploaded', color: 'bg-sky-500' },
  { time: '06:10', message: 'API Server: 3 new requests processed', color: 'bg-ink-300' },
]

function statusDot(s: string) {
  return { healthy: 'bg-emerald-500', degraded: 'bg-amber-500', down: 'bg-rose-500' }[s] || 'bg-ink-300'
}
function statusBadge(s: string) {
  return { healthy: 'badge-success', degraded: 'badge-warning', down: 'badge-danger' }[s] || 'badge-neutral'
}
function statusLabel(s: string) {
  return { healthy: 'Normal', degraded: 'Sekinlashgan', down: 'Ishlamayapti' }[s] || s
}
</script>
