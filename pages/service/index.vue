<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold font-display text-ink-900">Servis so'rovlari</h1>
        <p class="text-sm text-ink-500 mt-1">{{ filtered.length }} so'rov</p>
      </div>
      <button class="btn btn-primary btn-sm" @click="showNewModal = true">
        <Plus :size="16" :stroke-width="2" />
        Yangi so'rov
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
            <CircleDot :size="18" :stroke-width="2" class="text-brand-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ countByStatus('OPEN') }}</p>
            <p class="text-xs text-ink-500">Ochiq</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-warning-50 flex items-center justify-center">
            <UserCheck :size="18" :stroke-width="2" class="text-warning-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ countByStatus('ASSIGNED') }}</p>
            <p class="text-xs text-ink-500">Biriktirilgan</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-info-50 flex items-center justify-center">
            <Loader :size="18" :stroke-width="2" class="text-info-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ countByStatus('IN_PROGRESS') }}</p>
            <p class="text-xs text-ink-500">Bajarilmoqda</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-success-50 flex items-center justify-center">
            <CheckCircle2 :size="18" :stroke-width="2" class="text-success-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ countByStatus('COMPLETED') }}</p>
            <p class="text-xs text-ink-500">Bajarilgan</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1">
        <SearchInput v-model="search" placeholder="Raqam yoki tavsif bo'yicha..." />
      </div>
      <select v-model="priorityFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha ustuvorliklar</option>
        <option value="LOW">Past</option>
        <option value="MEDIUM">O'rta</option>
        <option value="HIGH">Yuqori</option>
        <option value="CRITICAL">Kritik</option>
      </select>
    </div>

    <!-- Desktop table -->
    <div class="card hidden md:block overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Raqam</th>
              <th>Turi</th>
              <th>Tavsif</th>
              <th>Unit</th>
              <th>Ustuvorlik</th>
              <th>Holat</th>
              <th>Sana</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="r in pagedRequests"
              :key="r.id"
              class="cursor-pointer"
              @click="navigateTo(`/service/work-orders/${r.id}`)"
            >
              <td class="font-mono text-xs font-medium text-ink-900">{{ r.number }}</td>
              <td>
                <span class="badge badge-neutral">
                  <component :is="typeIcon(r.type)" :size="12" :stroke-width="2" />
                  {{ typeLabel(r.type) }}
                </span>
              </td>
              <td class="text-ink-500 max-w-xs truncate">{{ r.description }}</td>
              <td class="text-ink-700">{{ unitNumber(r.unitId) }}</td>
              <td>
                <span :class="priorityBadge(r.priority)">{{ priorityLabel(r.priority) }}</span>
              </td>
              <td><StatusBadge :status="r.status" :dot="true" /></td>
              <td class="text-ink-500 text-xs">{{ formatDate(r.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        v-if="filtered.length > perPage"
        :page="page"
        :per-page="perPage"
        :total="filtered.length"
        @update:page="page = $event"
      />
      <EmptyState
        v-if="!filtered.length"
        title="So'rovlar topilmadi"
        icon="M11.42 7.83a6 6 0 015.68 1.78"
      />
    </div>

    <!-- Mobile cards -->
    <div class="md:hidden space-y-3">
      <div
        v-for="r in pagedRequests"
        :key="r.id"
        class="card p-4"
        @click="navigateTo(`/service/work-orders/${r.id}`)"
      >
        <div class="flex items-center justify-between mb-1">
          <span class="font-mono text-xs font-medium text-ink-900">{{ r.number }}</span>
          <StatusBadge :status="r.status" :dot="true" />
        </div>
        <p class="text-sm text-ink-700 line-clamp-2">{{ r.description }}</p>
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center gap-2">
            <span class="badge badge-neutral">{{ typeLabel(r.type) }}</span>
            <span :class="priorityBadge(r.priority)">{{ priorityLabel(r.priority) }}</span>
          </div>
          <span class="text-xs text-ink-400">{{ formatDate(r.createdAt) }}</span>
        </div>
      </div>
      <EmptyState
        v-if="!filtered.length"
        title="So'rovlar topilmadi"
        icon="M11.42 7.83a6 6 0 015.68 1.78"
      />
    </div>

    <!-- New request modal -->
    <Modal v-if="showNewModal" title="Yangi servis so'rovi" @close="showNewModal = false">
      <div class="space-y-4">
        <div>
          <label class="label">Turi</label>
          <select class="input cursor-pointer">
            <option>Texnik</option>
            <option>Tozalash</option>
            <option>Elektr</option>
            <option>Santexnika</option>
          </select>
        </div>
        <div>
          <label class="label">Tavsif</label>
          <textarea class="input" rows="3" placeholder="Muammo tavsifi..."></textarea>
        </div>
        <div>
          <label class="label">Ustuvorlik</label>
          <select class="input cursor-pointer">
            <option>Past</option>
            <option>O'rta</option>
            <option>Yuqori</option>
            <option>Kritik</option>
          </select>
        </div>
      </div>
      <template #actions>
        <button class="btn btn-secondary" @click="showNewModal = false">Bekor qilish</button>
        <button class="btn btn-primary" @click="showNewModal = false">Yaratish</button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  Plus,
  CircleDot,
  UserCheck,
  Loader,
  CheckCircle2,
  Wrench,
  Sparkles,
  Zap,
  Droplets,
  HelpCircle,
} from 'lucide-vue-next'
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
onMounted(() => {
  serviceStore.initMockData()
  buildingStore.initMockData()
})

const search = ref('')
const priorityFilter = ref('ALL')
const page = ref(1)
const perPage = 10
const showNewModal = ref(false)

const requests = computed(() => serviceStore.serviceRequests)
const filtered = computed(() => {
  let r = requests.value
  if (priorityFilter.value !== 'ALL') r = r.filter((s) => s.priority === priorityFilter.value)
  if (search.value)
    r = r.filter(
      (s) =>
        s.number?.toLowerCase().includes(search.value.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.value.toLowerCase())
    )
  return r
})
const pagedRequests = computed(() =>
  filtered.value.slice((page.value - 1) * perPage, page.value * perPage)
)

function countByStatus(s: string) {
  return requests.value.filter((r) => r.status === s).length
}
function typeLabel(t: string) {
  return (
    {
      TECHNICAL: 'Texnik',
      CLEANING: 'Tozalash',
      ELECTRICAL: 'Elektr',
      PLUMBING: 'Santexnika',
      OTHER: 'Boshqa',
    }[t] || t
  )
}
function typeIcon(t: string) {
  return (
    {
      TECHNICAL: Wrench,
      CLEANING: Sparkles,
      ELECTRICAL: Zap,
      PLUMBING: Droplets,
      OTHER: HelpCircle,
    }[t] || Wrench
  )
}
function priorityLabel(p: string) {
  return { LOW: 'Past', MEDIUM: "O'rta", HIGH: 'Yuqori', CRITICAL: 'Kritik' }[p] || p
}
function priorityBadge(p: string) {
  return (
    {
      LOW: 'badge badge-neutral',
      MEDIUM: 'badge badge-info',
      HIGH: 'badge badge-warning',
      CRITICAL: 'badge badge-danger',
    }[p] || 'badge badge-neutral'
  )
}
function unitNumber(id: string) {
  return buildingStore.units.find((u) => u.id === id)?.number || '—'
}
</script>
