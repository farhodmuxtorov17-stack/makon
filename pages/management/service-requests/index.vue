
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Servis so'rovlar</h1>
        <p class="text-ink-400 text-sm mt-1">{{ requests.length }} ta so'rov</p>
      </div>
    </div>

    <!-- SLA alerts -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
          <AlertTriangle :size="18" class="text-red-400" />
        </div>
        <div><div class="text-lg font-bold text-white">1</div><div class="text-xs text-ink-500">SLA buzilgan</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
          <Clock :size="18" class="text-amber-400" />
        </div>
        <div><div class="text-lg font-bold text-white">2</div><div class="text-xs text-ink-500">SLA yaqin</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
          <Wrench :size="18" class="text-brand-400" />
        </div>
        <div><div class="text-lg font-bold text-white">1</div><div class="text-xs text-ink-500">Jarayonda</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle2 :size="18" class="text-emerald-400" />
        </div>
        <div><div class="text-lg font-bold text-white">1</div><div class="text-xs text-ink-500">Bajarilgan</div></div>
      </div>
    </div>

    <!-- Kanban -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="column in kanbanColumns" :key="column.id" class="space-y-3">
        <div class="flex items-center justify-between px-2">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" :class="column.dotClass" />
            <span class="text-sm font-medium text-white">{{ column.label }}</span>
          </div>
          <span class="text-xs text-ink-500">{{ column.items.length }}</span>
        </div>
        <div v-for="item in column.items" :key="item.id" class="card p-4 card-hover cursor-pointer">
          <div class="flex items-start justify-between mb-2">
            <span class="text-xs font-mono text-ink-400">{{ item.number }}</span>
            <span class="badge" :class="priorityClass(item.priority)">{{ priorityLabel(item.priority) }}</span>
          </div>
          <p class="text-sm text-white mb-2">{{ item.description }}</p>
          <div class="flex items-center justify-between text-xs">
            <span class="text-ink-500">{{ item.category }}</span>
            <span :class="slaColor(item.slaDueAt)" class="flex items-center gap-1">
              <Clock :size="12" /> {{ slaLabel(item.slaDueAt) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { AlertTriangle, Clock, Wrench, CheckCircle2 } from 'lucide-vue-next'
import { serviceRequests } from '~/utils/mockData'
import type { ServiceRequestPriority, ServiceRequestStatus } from '~/types'

const requests = serviceRequests

const kanbanColumns = computed(() => [
  { id: 'NEW', label: 'Yangi', dotClass: 'bg-blue-500', items: requests.filter(r => r.status === 'NEW') },
  { id: 'ASSIGNED', label: 'Biriktirilgan', dotClass: 'bg-brand-500', items: requests.filter(r => r.status === 'ASSIGNED') },
  { id: 'IN_PROGRESS', label: 'Jarayonda', dotClass: 'bg-amber-500', items: requests.filter(r => r.status === 'IN_PROGRESS') },
  { id: 'COMPLETED', label: 'Bajarilgan', dotClass: 'bg-emerald-500', items: requests.filter(r => r.status === 'COMPLETED') },
])

function priorityLabel(p: ServiceRequestPriority) {
  return { LOW: 'Past', MEDIUM: "O'rta", HIGH: 'Yuqori', URGENT: 'Kritik' }[p]
}
function priorityClass(p: ServiceRequestPriority) {
  return { LOW: 'badge-neutral', MEDIUM: 'badge-info', HIGH: 'badge-warning', URGENT: 'badge-danger' }[p]
}

function slaLabel(due: string) {
  const diff = new Date(due).getTime() - Date.now()
  const hours = Math.floor(diff / 3600000)
  if (hours < 0) return `${Math.abs(hours)}s kech`
  return `${hours}s qoldi`
}
function slaColor(due: string) {
  const hours = (new Date(due).getTime() - Date.now()) / 3600000
  if (hours < 0) return 'text-red-400'
  if (hours < 4) return 'text-amber-400'
  return 'text-ink-500'
}
</script>
