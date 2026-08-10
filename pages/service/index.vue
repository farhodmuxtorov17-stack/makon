<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Servis</h1>
        <p class="text-ink-500 text-sm mt-0.5">Servis so'rovlari va ish buyruqlari</p>
      </div>
      <button class="btn btn-primary btn-sm" @click="showNew = true">
        <Plus :size="16" />
        Yangi so'rov
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-4">
        <p class="text-sm text-ink-400 mb-1">Yangi so'rovlar</p>
        <p class="text-xl font-bold font-display">{{ statusCount('CREATED') }}</p>
      </div>
      <div class="card p-4">
        <p class="text-sm text-ink-400 mb-1">Jarayonda</p>
        <p class="text-xl font-bold font-display text-amber-600">{{ statusCount('IN_PROGRESS') + statusCount('ASSIGNED') }}</p>
      </div>
      <div class="card p-4">
        <p class="text-sm text-ink-400 mb-1">Tekshiruvda</p>
        <p class="text-xl font-bold font-display text-sky-600">{{ statusCount('APPROVED') }}</p>
      </div>
      <div class="card p-4">
        <p class="text-sm text-ink-400 mb-1">Yakunlangan</p>
        <p class="text-xl font-bold font-display text-emerald-600">{{ statusCount('DONE') }}</p>
      </div>
    </div>

    <!-- Service requests list -->
    <div class="card overflow-hidden">
      <div class="px-5 py-4 border-b border-ink-100">
        <h3 class="font-semibold">Servis so'rovlari</h3>
      </div>
      <div class="divide-y divide-ink-50">
        <div v-for="sr in serviceStore.serviceRequests" :key="sr.id" class="flex items-center gap-4 px-5 py-4 hover:bg-ink-50/50 transition-colors">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            :class="priorityClass(sr.priority)">
            <Wrench :size="18" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <span class="font-mono text-sm font-semibold text-ink-900">{{ sr.number }}</span>
              <span class="badge" :class="priorityBadge(sr.priority)">{{ sr.priority }}</span>
            </div>
            <p class="text-sm text-ink-500 truncate">{{ sr.category }} · {{ sr.description }}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <span class="badge" :class="srStatusClass(sr.status)">{{ srStatusLabel(sr.status) }}</span>
            <p class="text-xs text-ink-400 mt-1">{{ formatDate(sr.createdAt) }}</p>
          </div>
          <NuxtLink :to="`/service/work-orders/${sr.workOrderId || 'sr-' + sr.id}`" class="btn-ghost btn-icon btn-sm flex-shrink-0">
            <ChevronRight :size="18" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- New request modal -->
    <div v-if="showNew" class="fixed inset-0 bg-ink-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showNew = false">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h3 class="font-semibold text-lg mb-4">Yangi servis so'rovi</h3>
        <div class="space-y-4">
          <div>
            <label class="label">Kategoriya</label>
            <select class="input">
              <option>Santexnika</option>
              <option>Elektr</option>
              <option>HVAC</option>
              <option>Tozalash</option>
              <option>Devor</option>
              <option>Boshqa</option>
            </select>
          </div>
          <div>
            <label class="label">Prioritet</label>
            <select class="input">
              <option value="LOW">Past</option>
              <option value="MEDIUM">O'rta</option>
              <option value="HIGH">Yuqori</option>
              <option value="URGENT">Shoshilinch</option>
            </select>
          </div>
          <div>
            <label class="label">Tavsif</label>
            <textarea class="input" rows="3" placeholder="Muammoni tavsiflang..."></textarea>
          </div>
        </div>
        <div class="flex gap-2 mt-6">
          <button class="btn btn-ghost btn-lg flex-1" @click="showNew = false">Bekor qilish</button>
          <button class="btn btn-primary btn-lg flex-1" @click="showNew = false">Yaratish</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Wrench, ChevronRight } from 'lucide-vue-next'
import type { ServiceRequestStatus, ServiceRequestPriority } from '~/types'

const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())

const showNew = ref(false)

function statusCount(s: ServiceRequestStatus) {
  return serviceStore.serviceRequests.filter(sr => sr.status === s).length
}

function srStatusLabel(s: ServiceRequestStatus): string {
  const m: Record<string, string> = {
    CREATED: 'Yangi', APPROVED: 'Tasdiqlangan', ASSIGNED: 'Tayinlangan',
    IN_PROGRESS: 'Jarayonda', DONE: 'Yakunlangan', CLOSED: 'Yopilgan',
  }
  return m[s] || s
}

function srStatusClass(s: ServiceRequestStatus): string {
  const m: Record<string, string> = {
    CREATED: 'badge-neutral', APPROVED: 'badge-info',
    ASSIGNED: 'badge-warning', IN_PROGRESS: 'badge-warning',
    DONE: 'badge-success', CLOSED: 'badge-neutral',
  }
  return m[s] || 'badge-neutral'
}

function priorityBadge(p: ServiceRequestPriority): string {
  const m: Record<string, string> = {
    LOW: 'badge-neutral', MEDIUM: 'badge-info',
    HIGH: 'badge-warning', URGENT: 'badge-danger',
  }
  return m[p] || 'badge-neutral'
}

function priorityClass(p: ServiceRequestPriority): string {
  const m: Record<string, string> = {
    LOW: 'bg-ink-100 text-ink-500', MEDIUM: 'bg-sky-50 text-sky-600',
    HIGH: 'bg-amber-50 text-amber-600', URGENT: 'bg-rose-50 text-rose-600',
  }
  return m[p] || 'bg-ink-100 text-ink-500'
}

function formatDate(d: string) { return d.split('T')[0] }
</script>
