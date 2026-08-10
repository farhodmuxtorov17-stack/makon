<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Servis so'rovlarim</h1>
        <p class="text-ink-400 text-sm mt-1">{{ myRequests.length }} ta so'rov</p>
      </div>
      <button class="btn btn-primary btn-sm" @click="showModal = true"><Plus :size="14" /> Yangi so'rov</button>
    </div>

    <div class="space-y-3">
      <div v-for="r in myRequests" :key="r.id" class="card p-5">
        <div class="flex items-start justify-between mb-2">
          <div>
            <span class="text-xs font-mono text-ink-400">{{ r.number }}</span>
            <h3 class="text-white font-medium mt-1">{{ r.category }}</h3>
            <p class="text-sm text-ink-500 mt-0.5">{{ r.description }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="badge" :class="priorityClass(r.priority)">{{ priorityLabel(r.priority) }}</span>
            <span class="badge" :class="statusClass(r.status)">{{ statusLabel(r.status) }}</span>
          </div>
        </div>
        <div class="text-xs text-ink-500 mt-3 pt-3 border-t border-white/5">
          Yaratildi: {{ formatDate(r.createdAt) }}
        </div>
      </div>
    </div>

    <!-- New request modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showModal = false" />
      <div class="relative card p-6 w-full max-w-md animate-fade-in">
        <h3 class="text-white font-semibold mb-4">Yangi servis so'rovi</h3>
        <div class="space-y-4">
          <div>
            <label class="label">Kategoriya</label>
            <select class="input">
              <option>Konditsioner</option><option>Elektr</option><option>Santexnika</option><option>Mebel</option><option>Boshqa</option>
            </select>
          </div>
          <div>
            <label class="label">Prioritet</label>
            <select class="input">
              <option value="LOW">Past</option><option value="MEDIUM">O'rta</option><option value="HIGH">Yuqori</option><option value="URGENT">Kritik</option>
            </select>
          </div>
          <div>
            <label class="label">Tavsif</label>
            <textarea class="input min-h-[80px]" placeholder="Muammoni tavsiflang..."></textarea>
          </div>
        </div>
        <div class="flex gap-2 mt-6">
          <button class="btn btn-secondary flex-1" @click="showModal = false">Bekor</button>
          <button class="btn btn-primary flex-1" @click="showModal = false">Yuborish</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { serviceRequests } from '~/utils/mockData'
import type { ServiceRequestPriority, ServiceRequestStatus } from '~/types'

definePageMeta({ middleware: 'auth' })
const { formatDate } = useFormat()

const showModal = ref(false)
const myRequests = serviceRequests

function priorityLabel(p: ServiceRequestPriority) { return { LOW: 'Past', MEDIUM: 'O\'rta', HIGH: 'Yuqori', URGENT: 'Kritik' }[p] }
function priorityClass(p: ServiceRequestPriority) { return { LOW: 'badge-neutral', MEDIUM: 'badge-info', HIGH: 'badge-warning', URGENT: 'badge-danger' }[p] }
function statusLabel(s: ServiceRequestStatus) { return { NEW: 'Yangi', ASSIGNED: 'Biriktirilgan', IN_PROGRESS: 'Jarayonda', COMPLETED: 'Bajarilgan', CANCELLED: 'Bekor' }[s] || s }
function statusClass(s: ServiceRequestStatus) { return { NEW: 'badge-info', ASSIGNED: 'badge-brand', IN_PROGRESS: 'badge-warning', COMPLETED: 'badge-success', CANCELLED: 'badge-neutral' }[s] || 'badge-neutral' }
</script>
