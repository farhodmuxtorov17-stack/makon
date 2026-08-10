<template>
  <div class="space-y-6">
    <NuxtLink
      to="/service/work-orders"
      class="text-sm text-ink-500 hover:text-ink-900 flex items-center gap-1.5 transition-colors"
    >
      <ArrowLeft :size="16" :stroke-width="2" />
      Ish buyruqlari
    </NuxtLink>

    <div v-if="order" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <!-- Order info -->
        <div class="card p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-xs text-ink-400 font-mono">{{ order.number }}</p>
              <h1 class="text-xl font-bold font-display text-ink-900 mt-1">
                {{ order.description }}
              </h1>
            </div>
            <StatusBadge :status="order.status" :dot="true" />
          </div>
          <div class="grid grid-cols-3 gap-4 mt-6">
            <div class="p-3 rounded-xl bg-ink-50">
              <p class="text-xs text-ink-500">Est. xarajat</p>
              <p class="font-bold text-ink-900 mt-1">
                {{ formatNumber(order.estimatedCost) }} so'm
              </p>
            </div>
            <div class="p-3 rounded-xl bg-ink-50">
              <p class="text-xs text-ink-500">Haqiqiy xarajat</p>
              <p
                class="font-bold mt-1"
                :class="
                  order.actualCost > order.estimatedCost ? 'text-danger-600' : 'text-success-600'
                "
              >
                {{ order.actualCost ? formatNumber(order.actualCost) : '—' }}
              </p>
            </div>
            <div class="p-3 rounded-xl bg-ink-50">
              <p class="text-xs text-ink-500">Rejali sana</p>
              <p class="font-medium text-ink-900 mt-1 text-sm">
                {{ formatDate(order.scheduledDate) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Material requests -->
        <div class="card overflow-hidden">
          <div class="px-5 py-4 border-b border-ink-100 flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-warning-50 flex items-center justify-center">
              <Package :size="16" :stroke-width="2" class="text-warning-600" />
            </div>
            <h3 class="font-semibold text-ink-900">Material so'rovlari</h3>
          </div>
          <div class="p-5 space-y-3">
            <div
              v-for="mr in orderMaterials"
              :key="mr.id"
              class="p-4 rounded-xl border border-ink-100"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-ink-900">{{ mr.items.length }} ta item</span>
                <StatusBadge :status="mr.status" :dot="true" />
              </div>
              <div class="space-y-1.5">
                <div v-for="item in mr.items" :key="item.id" class="flex justify-between text-xs">
                  <span class="text-ink-500">{{ item.name }} × {{ item.quantity }} {{ item.unit }}</span>
                  <span class="font-mono text-ink-900">{{ formatNumber(item.quantity * item.unitPrice) }} so'm</span>
                </div>
              </div>
            </div>
            <p v-if="!orderMaterials.length" class="text-center text-ink-400 text-sm py-4">
              Material so'rovlari yo'q
            </p>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-4">
        <div class="card p-5">
          <h3 class="font-semibold text-ink-900 mb-3">Amallar</h3>
          <div class="flex flex-col gap-2">
            <button v-if="order.status === 'ASSIGNED'" class="btn btn-primary">
              <Play :size="16" :stroke-width="2" />
              Boshlash
            </button>
            <button v-if="order.status === 'IN_PROGRESS'" class="btn btn-secondary">
              <Eye :size="16" :stroke-width="2" />
              Inspeksiyaga yuborish
            </button>
            <button v-if="order.status === 'INSPECTION'" class="btn btn-primary">
              <CheckCircle2 :size="16" :stroke-width="2" />
              Tugatish
            </button>
          </div>
        </div>

        <div v-if="order.inspectionNotes" class="card p-5">
          <h3 class="font-semibold text-ink-900 mb-2">Inspeksiya izohi</h3>
          <p class="text-sm text-ink-500 leading-relaxed">{{ order.inspectionNotes }}</p>
        </div>

        <div class="card p-5">
          <h3 class="font-semibold text-ink-900 mb-3">Pudratchi</h3>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-ink-100 flex items-center justify-center">
              <HardHat :size="18" :stroke-width="2" class="text-ink-600" />
            </div>
            <div>
              <p class="font-medium text-ink-900 text-sm">{{ supplierName(order.contractorId) }}</p>
              <p class="text-xs text-ink-400">Pudratchi</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="card p-12 text-center">
      <p class="text-ink-400">Ish buyruq topilmadi</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ArrowLeft, Package, Play, Eye, CheckCircle2, HardHat } from 'lucide-vue-next'
import { useServiceStore } from '~/stores/service'
import { formatNumber, formatDate } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ middleware: 'auth' })
const route = useRoute()
const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())

const order = computed(() => serviceStore.workOrders.find((o) => o.id === route.params.id))
const orderMaterials = computed(() =>
  serviceStore.materialRequests.filter((m) => m.workOrderId === route.params.id)
)
const supplierName = (id: string) => serviceStore.suppliers.find((s) => s.id === id)?.name || id
</script>
