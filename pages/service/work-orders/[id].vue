<template>
  <div class="space-y-6">
    <NuxtLink to="/service/work-orders" class="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-700">
      <ArrowLeft :size="16" /> Ish buyruqlariga qaytish
    </NuxtLink>

    <div v-if="wo" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <!-- Main info -->
        <div class="card p-6">
          <div class="flex items-start justify-between mb-6">
            <div>
              <span class="font-mono text-sm text-ink-500">{{ wo.number }}</span>
              <h1 class="font-display text-2xl font-bold mt-1">{{ wo.description }}</h1>
            </div>
            <StatusBadge :status="wo.status" :variant="woVariant(wo.status)" :label="woLabel(wo.status)" dot />
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="p-3 rounded-xl bg-ink-50">
              <p class="text-ink-400 text-xs">Rejalashtirilgan</p>
              <p class="font-semibold mt-0.5">{{ formatDate(wo.scheduledDate) }}</p>
            </div>
            <div class="p-3 rounded-xl bg-ink-50">
              <p class="text-ink-400 text-xs">Yakunlangan</p>
              <p class="font-semibold mt-0.5">{{ wo.completedAt ? formatDate(wo.completedAt) : '—' }}</p>
            </div>
            <div class="p-3 rounded-xl bg-ink-50">
              <p class="text-ink-400 text-xs">Taxminiy narx</p>
              <p class="font-semibold mt-0.5">{{ formatPrice(wo.estimatedCost) }} so'm</p>
            </div>
            <div class="p-3 rounded-xl bg-ink-50">
              <p class="text-ink-400 text-xs">Haqiqiy narx</p>
              <p class="font-semibold mt-0.5" :class="wo.actualCost > wo.estimatedCost ? 'text-rose-600' : 'text-emerald-600'">
                {{ wo.actualCost ? formatPrice(wo.actualCost) + ' so\'m' : '—' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Materials -->
        <div class="card p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold">Materiallar</h3>
            <button class="btn btn-outline btn-sm"><Plus :size="14" /> Qo'shish</button>
          </div>
          <div class="space-y-2">
            <div v-for="item in materials" :key="item.id" class="flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-ink-50 transition-colors">
              <div class="w-9 h-9 rounded-lg bg-ink-100 flex items-center justify-center">
                <Package :size="16" class="text-ink-500" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-ink-900">{{ item.name }}</p>
                <p class="text-xs text-ink-400">{{ item.quantity }} {{ item.unit }} × {{ formatPrice(item.unitPrice) }} so'm</p>
              </div>
              <p class="font-semibold text-sm">{{ formatPrice(item.quantity * item.unitPrice) }} so'm</p>
            </div>
            <div v-if="materials.length === 0" class="text-center py-8">
              <BaseEmptyState title="Materiallar qo'shilmagan" description="Ish buyrug'iga material qo'shing" />
            </div>
          </div>
          <div v-if="materials.length > 0" class="flex justify-between mt-4 pt-4 border-t border-ink-100">
            <span class="text-sm font-medium text-ink-600">Jami:</span>
            <span class="font-bold">{{ formatPrice(totalMaterials) }} so'm</span>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-4">
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Tekshiruv</h3>
          <div class="space-y-3 text-sm">
            <div>
              <p class="text-ink-400 text-xs mb-1">Tekshiruv izohi</p>
              <p class="font-medium" :class="wo.inspectionNotes ? 'text-ink-700' : 'text-ink-300'">
                {{ wo.inspectionNotes || 'Izoh yo\'q' }}
              </p>
            </div>
          </div>
          <button v-if="wo.status === 'INSPECTION'" class="btn btn-success btn-lg w-full mt-4">
            <Check :size="18" /> Ishni yakunlash
          </button>
          <button v-else-if="wo.status === 'IN_PROGRESS'" class="btn btn-primary btn-lg w-full mt-4">
            <Eye :size="18" /> Tekshiruvga yuborish
          </button>
        </div>

        <!-- Timeline -->
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Bosqichlar</h3>
          <div class="space-y-3">
            <div v-for="(step, i) in timeline" :key="i" class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  :class="step.done ? 'bg-emerald-100' : step.current ? 'bg-brand-100' : 'bg-ink-100'">
                  <Check v-if="step.done" :size="16" class="text-emerald-600" />
                  <div v-else-if="step.current" class="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></div>
                  <div v-else class="w-2 h-2 rounded-full bg-ink-300"></div>
                </div>
                <div v-if="i < timeline.length - 1" class="w-px flex-1 bg-ink-100 my-1"></div>
              </div>
              <div class="pb-2">
                <p class="text-sm font-medium" :class="step.done ? 'text-ink-500' : step.current ? 'text-ink-900' : 'text-ink-400'">{{ step.label }}</p>
                <p v-if="step.date" class="text-xs text-ink-400 mt-0.5">{{ step.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="card p-12">
      <BaseEmptyState title="Ish buyruqi topilmadi" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Package, Check, Eye, Plus } from 'lucide-vue-next'
import type { WorkOrderStatus } from '~/types'

const route = useRoute()
const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())

const wo = computed(() => serviceStore.workOrders.find(w => w.id === route.params.id))

const materials = computed(() => {
  if (!wo.value) return []
  const mr = serviceStore.materialRequests.find(m => m.workOrderId === wo.value!.id)
  return mr?.items || []
})

const totalMaterials = computed(() => materials.value.reduce((s, i) => s + i.quantity * i.unitPrice, 0))

const timeline = computed(() => {
  if (!wo.value) return []
  const steps = [
    { label: 'Yaratilgan', done: true, current: false, date: wo.value.createdAt.split('T')[0] },
    { label: 'Tayinlangan', done: ['ASSIGNED', 'IN_PROGRESS', 'INSPECTION', 'COMPLETED'].includes(wo.value.status), current: wo.value.status === 'ASSIGNED', date: '' },
    { label: 'Jarayonda', done: ['IN_PROGRESS', 'INSPECTION', 'COMPLETED'].includes(wo.value.status), current: wo.value.status === 'IN_PROGRESS', date: '' },
    { label: 'Tekshiruv', done: ['INSPECTION', 'COMPLETED'].includes(wo.value.status), current: wo.value.status === 'INSPECTION', date: '' },
    { label: 'Yakunlangan', done: wo.value.status === 'COMPLETED', current: false, date: wo.value.completedAt || '' },
  ]
  return steps
})

function woLabel(s: WorkOrderStatus): string {
  const m: Record<string, string> = { CREATED: 'Yaratilgan', ASSIGNED: 'Tayinlangan', IN_PROGRESS: 'Jarayonda', INSPECTION: 'Tekshiruv', COMPLETED: 'Yakunlangan', CANCELLED: 'Bekor' }
  return m[s] || s
}
function woVariant(s: WorkOrderStatus): string {
  const m: Record<string, string> = { CREATED: 'neutral', ASSIGNED: 'info', IN_PROGRESS: 'warning', INSPECTION: 'info', COMPLETED: 'success', CANCELLED: 'danger' }
  return m[s] || 'neutral'
}
function formatDate(d: string) { return d.split('T')[0] }
function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  if (v >= 1000) return (v / 1000).toFixed(0) + 'K'
  return v.toLocaleString('ru')
}
</script>
