<template>
  <div class="space-y-6">
    <!-- Back -->
    <NuxtLink to="/service/work-orders" class="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-700">
      <ArrowLeft :size="16" />
      Ish buyruqlariga qaytish
    </NuxtLink>

    <div v-if="wo" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main info -->
      <div class="lg:col-span-2 space-y-6">
        <div class="card p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <span class="font-mono text-sm text-ink-500">{{ wo.number }}</span>
              <h1 class="font-display text-2xl font-bold mt-1">{{ wo.description }}</h1>
            </div>
            <span class="badge" :class="woStatusClass(wo.status)">{{ woStatusLabel(wo.status) }}</span>
          </div>

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-ink-400 text-xs mb-1">Rejalashtirilgan sana</p>
              <p class="font-medium">{{ formatDate(wo.scheduledDate) }}</p>
            </div>
            <div>
              <p class="text-ink-400 text-xs mb-1">Yakunlangan</p>
              <p class="font-medium">{{ wo.completedAt ? formatDate(wo.completedAt) : '—' }}</p>
            </div>
            <div>
              <p class="text-ink-400 text-xs mb-1">Taxminiy narx</p>
              <p class="font-semibold">{{ formatPrice(wo.estimatedCost) }}</p>
            </div>
            <div>
              <p class="text-ink-400 text-xs mb-1">Haqiqiy narx</p>
              <p class="font-semibold">{{ wo.actualCost ? formatPrice(wo.actualCost) : '—' }}</p>
            </div>
          </div>
        </div>

        <!-- Materials -->
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Materiallar</h3>
          <div class="space-y-2">
            <div v-for="item in materials" :key="item.id" class="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-ink-50">
              <div class="w-8 h-8 rounded-lg bg-ink-100 flex items-center justify-center">
                <Package :size="16" class="text-ink-500" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium">{{ item.name }}</p>
                <p class="text-xs text-ink-400">{{ item.quantity }} {{ item.unit }} × {{ formatPrice(item.unitPrice) }}</p>
              </div>
              <p class="font-semibold text-sm">{{ formatPrice(item.quantity * item.unitPrice) }}</p>
            </div>
            <div v-if="materials.length === 0" class="text-center text-ink-400 text-sm py-6">Materiallar yo'q</div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-4">
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Tekshiruv</h3>
          <div class="space-y-3 text-sm">
            <div>
              <p class="text-ink-400 text-xs">Izoh</p>
              <p class="font-medium">{{ wo.inspectionNotes || 'Izoh yo\'q' }}</p>
            </div>
          </div>
          <button v-if="wo.status === 'INSPECTION'" class="btn btn-success btn-sm w-full mt-4">
            <Check :size="16" />
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>

    <div v-else class="card p-12 text-center">
      <p class="text-ink-400">Ish buyruqi topilmadi</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Package, Check } from 'lucide-vue-next'
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

function woStatusLabel(s: WorkOrderStatus): string {
  const m: Record<string, string> = {
    CREATED: 'Yaratilgan', ASSIGNED: 'Tayinlangan',
    IN_PROGRESS: 'Jarayonda', INSPECTION: 'Tekshiruv',
    COMPLETED: 'Yakunlangan', CANCELLED: 'Bekor qilingan',
  }
  return m[s] || s
}

function woStatusClass(s: WorkOrderStatus): string {
  const m: Record<string, string> = {
    CREATED: 'badge-neutral', ASSIGNED: 'badge-info',
    IN_PROGRESS: 'badge-warning', INSPECTION: 'badge-info',
    COMPLETED: 'badge-success', CANCELLED: 'badge-danger',
  }
  return m[s] || 'badge-neutral'
}

function formatDate(d: string) { return d.split('T')[0] }
function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  return v.toLocaleString('ru')
}
</script>
