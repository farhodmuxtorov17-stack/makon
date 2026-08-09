<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div><h1 class="text-2xl font-bold font-display">Servis so'rovlari</h1><p class="text-sm text-neutral-500 mt-1">{{ filtered.length }} so'rov</p></div>
      <button class="btn-primary btn-sm" @click="showNewModal = true">+ Yangi so'rov</button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <div class="card p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center"><svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" /><circle cx="12" cy="12" r="9" stroke-width="2" /></svg></div><div><p class="text-xl font-bold">{{ countByStatus('OPEN') }}</p><p class="text-xs text-neutral-500">Ochiq</p></div></div>
      <div class="card p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-warning-50 flex items-center justify-center"><svg class="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.42 7.83a6 6 0 015.68 1.78" /></svg></div><div><p class="text-xl font-bold">{{ countByStatus('ASSIGNED') }}</p><p class="text-xs text-neutral-500">Biriktirilgan</p></div></div>
      <div class="card p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-info-50 flex items-center justify-center"><svg class="w-5 h-5 text-info-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div><div><p class="text-xl font-bold">{{ countByStatus('IN_PROGRESS') }}</p><p class="text-xs text-neutral-500">Bajarilmoqda</p></div></div>
      <div class="card p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center"><svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg></div><div><p class="text-xl font-bold">{{ countByStatus('COMPLETED') }}</p><p class="text-xs text-neutral-500">Bajarilgan</p></div></div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1"><SearchInput v-model="search" placeholder="Raqam yoki tavsif bo'yicha..." /></div>
      <select v-model="priorityFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha ustuvorliklar</option>
        <option value="LOW">Past</option>
        <option value="MEDIUM">O'rta</option>
        <option value="HIGH">Yuqori</option>
        <option value="CRITICAL">Kritik</option>
      </select>
    </div>

    <!-- Desktop -->
    <div class="card hidden md:block">
      <div class="table-wrapper">
        <table class="table">
          <thead><tr><th>Raqam</th><th>Turi</th><th>Tavsif</th><th>Unit</th><th>Ustuvorlik</th><th>Holat</th><th>Sana</th></tr></thead>
          <tbody>
            <tr v-for="r in pagedRequests" :key="r.id" class="cursor-pointer">
              <td class="font-mono text-xs font-medium">{{ r.number }}</td>
              <td><span class="badge-neutral">{{ typeLabel(r.type) }}</span></td>
              <td class="text-neutral-500 max-w-xs truncate">{{ r.description }}</td>
              <td class="text-neutral-500">{{ unitNumber(r.unitId) }}</td>
              <td><span :class="priorityBadge(r.priority)">{{ priorityLabel(r.priority) }}</span></td>
              <td><StatusBadge :status="r.status" :dot="true" /></td>
              <td class="text-neutral-500 text-xs">{{ formatDate(r.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination v-if="filtered.length > perPage" :page="page" :per-page="perPage" :total="filtered.length" @update:page="page = $event" />
      <EmptyState v-if="!filtered.length" title="So'rovlar topilmadi" icon="M11.42 7.83a6 6 0 015.68 1.78" />
    </div>

    <!-- Mobile -->
    <div class="md:hidden space-y-3">
      <div v-for="r in pagedRequests" :key="r.id" class="card p-4">
        <div class="flex items-center justify-between mb-1"><span class="font-mono text-xs font-medium">{{ r.number }}</span><StatusBadge :status="r.status" :dot="true" /></div>
        <p class="text-sm text-neutral-700 line-clamp-2">{{ r.description }}</p>
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center gap-2"><span class="badge-neutral">{{ typeLabel(r.type) }}</span><span :class="priorityBadge(r.priority)">{{ priorityLabel(r.priority) }}</span></div>
          <span class="text-xs text-neutral-400">{{ formatDate(r.createdAt) }}</span>
        </div>
      </div>
      <EmptyState v-if="!filtered.length" title="So'rovlar topilmadi" icon="M11.42 7.83a6 6 0 015.68 1.78" />
    </div>

    <Modal v-if="showNewModal" title="Yangi servis so'rovi" @close="showNewModal = false">
      <div class="space-y-4">
        <div><label class="label">Turi</label><select class="input cursor-pointer"><option>Texnik</option><option>Tozalash</option><option>Elektr</option><option>Santexnika</option></select></div>
        <div><label class="label">Tavsif</label><textarea class="input" rows="3" placeholder="Muammo tavsifi..."></textarea></div>
        <div><label class="label">Ustuvorlik</label><select class="input cursor-pointer"><option>Past</option><option>O'rta</option><option>Yuqori</option><option>Kritik</option></select></div>
      </div>
      <template #actions><button class="btn-secondary" @click="showNewModal = false">Bekor</button><button class="btn-primary" @click="showNewModal = false">Yaratish</button></template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useServiceStore } from '~/stores/service'
import { useBuildingStore } from '~/stores/building'
import { formatDate } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import Pagination from '~/components/ui/Pagination.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Modal from '~/components/ui/Modal.vue'

definePageMeta({ middleware: 'auth' })
const serviceStore = useServiceStore()
const buildingStore = useBuildingStore()
onMounted(() => { serviceStore.initMockData(); buildingStore.initMockData() })

const search = ref('')
const priorityFilter = ref('ALL')
const page = ref(1)
const perPage = 10
const showNewModal = ref(false)

const requests = computed(() => serviceStore.serviceRequests)
const filtered = computed(() => {
  let r = requests.value
  if (priorityFilter.value !== 'ALL') r = r.filter(s => s.priority === priorityFilter.value)
  if (search.value) r = r.filter(s => s.number?.toLowerCase().includes(search.value.toLowerCase()) || s.description?.toLowerCase().includes(search.value.toLowerCase()))
  return r
})
const pagedRequests = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

function countByStatus(s: string) { return requests.value.filter(r => r.status === s).length }
function typeLabel(t: string) { return ({ TECHNICAL: 'Texnik', CLEANING: 'Tozalash', ELECTRICAL: 'Elektr', PLUMBING: 'Santexnika', OTHER: 'Boshqa' }[t] || t) }
function priorityLabel(p: string) { return ({ LOW: 'Past', MEDIUM: 'O\'rta', HIGH: 'Yuqori', CRITICAL: 'Kritik' }[p] || p) }
function priorityBadge(p: string) { return ({ LOW: 'badge-neutral', MEDIUM: 'badge-info', HIGH: 'badge-warning', CRITICAL: 'badge-danger' }[p] || 'badge-neutral') }
function unitNumber(id: string) { return buildingStore.units.find(u => u.id === id)?.number || '—' }
</script>
