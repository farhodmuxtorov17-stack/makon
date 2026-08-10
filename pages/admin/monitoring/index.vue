
<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-white">Texnik monitoring</h1>
      <p class="text-ink-400 text-sm mt-1">Servis holati va metrikalar</p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="svc in services" :key="svc.name" class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-white font-medium">{{ svc.name }}</span>
          <span class="status-dot" :class="svc.status === 'healthy' ? 'status-dot-vacant' : svc.status === 'degraded' ? 'status-dot-reserved' : 'status-dot-maintenance'" />
        </div>
        <div class="flex items-center justify-between text-xs">
          <span :class="svc.status === 'healthy' ? 'text-emerald-400' : svc.status === 'degraded' ? 'text-amber-400' : 'text-red-400'">
            {{ svc.status }}
          </span>
          <span class="text-ink-500">{{ svc.responseTime }}ms · {{ svc.uptime }}%</span>
        </div>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="text-white font-semibold mb-4">ERI navbat holati</h3>
      <div class="space-y-3">
        <div v-for="item in eriQueue" :key="item.id" class="flex items-center justify-between p-3 rounded-xl bg-white/5">
          <div>
            <span class="text-sm text-white">{{ item.document }}</span>
            <span class="text-xs text-ink-500 ml-2">{{ item.signer }}</span>
          </div>
          <span class="badge" :class="item.status === 'PENDING' ? 'badge-warning' : item.status === 'SIGNED' ? 'badge-success' : 'badge-danger'">
            {{ item.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
const services = [
  { name: 'API Server', status: 'healthy', responseTime: 45, uptime: 99.9 },
  { name: 'PostgreSQL', status: 'healthy', responseTime: 12, uptime: 99.99 },
  { name: 'Redis', status: 'healthy', responseTime: 3, uptime: 100 },
  { name: 'ERI Adapter', status: 'degraded', responseTime: 850, uptime: 98.5 },
]

const eriQueue = [
  { id: '1', document: 'CTR-2026-002', signer: 'Aziz Toshmatov', status: 'PENDING' },
  { id: '2', document: 'CTR-2026-001', signer: 'Sardor Yusupov', status: 'SIGNED' },
  { id: '3', document: 'CTR-2025-042', signer: 'Tashkent Logistics', status: 'ERROR' },
]
</script>
