<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Monitoring</h1>
        <p class="text-sm text-neutral-500 mt-1">Tizim holati va xizmatlar</p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="s in services" :key="s.name" class="card p-5">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-neutral-900">{{ s.name }}</h3>
          <span :class="statusClass(s.status)">{{ s.statusLabel }}</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 rounded-xl bg-neutral-50">
            <p class="text-xs text-neutral-500">Response</p>
            <p class="font-bold mt-0.5">{{ s.responseTime }}ms</p>
          </div>
          <div class="p-3 rounded-xl bg-neutral-50">
            <p class="text-xs text-neutral-500">Uptime</p>
            <p class="font-bold mt-0.5">{{ s.uptime }}%</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3 class="font-semibold">Tizim metrikalari</h3></div>
      <div class="card-body grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="m in metrics" :key="m.label" class="text-center p-4 rounded-xl bg-neutral-50">
          <p class="text-3xl font-bold font-display" :class="m.color">{{ m.value }}</p>
          <p class="text-xs text-neutral-500 mt-1">{{ m.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
definePageMeta({ middleware: 'auth' })
const services = ref([
  {
    name: 'API Server',
    status: 'healthy',
    statusLabel: "Sog'lom",
    responseTime: 45,
    uptime: 99.95,
  },
  { name: 'Database', status: 'healthy', statusLabel: "Sog'lom", responseTime: 12, uptime: 99.99 },
  {
    name: 'ERI Service',
    status: 'degraded',
    statusLabel: 'Sekin',
    responseTime: 850,
    uptime: 98.5,
  },
  {
    name: 'File Storage',
    status: 'healthy',
    statusLabel: "Sog'lom",
    responseTime: 120,
    uptime: 99.9,
  },
  {
    name: 'Cache (Redis)',
    status: 'healthy',
    statusLabel: "Sog'lom",
    responseTime: 3,
    uptime: 99.99,
  },
  {
    name: 'Notification Queue',
    status: 'down',
    statusLabel: 'Ishlamayapti',
    responseTime: 0,
    uptime: 87.2,
  },
])
const metrics = ref([
  { label: 'CPU', value: '34%', color: 'text-success-600' },
  { label: 'RAM', value: '62%', color: 'text-warning-600' },
  { label: 'Disk', value: '41%', color: 'text-success-600' },
  { label: 'Requests/sec', value: '1.2K', color: 'text-primary-600' },
])
function statusClass(s: string) {
  return (
    { healthy: 'badge-success', degraded: 'badge-warning', down: 'badge-danger' }[s] ||
    'badge-neutral'
  )
}
</script>
