<template>
  <div class="space-y-6">
    <NuxtLink
      to="/service/work-orders"
      class="text-sm text-neutral-500 hover:text-neutral-700 flex items-center gap-1"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Ish buyruqlari
    </NuxtLink>
    <div v-if="order" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="card p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-xs text-neutral-400 font-mono">{{ order.number }}</p>
              <h1 class="text-xl font-bold font-display mt-1">{{ order.description }}</h1>
            </div>
            <StatusBadge :status="order.status" :dot="true" />
          </div>
          <div class="grid grid-cols-3 gap-4 mt-6">
            <div class="p-3 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">Est. xarajat</p>
              <p class="font-bold mt-1">{{ formatNumber(order.estimatedCost) }} so'm</p>
            </div>
            <div class="p-3 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">Haqiqiy xarajat</p>
              <p
                class="font-bold mt-1"
                :class="
                  order.actualCost > order.estimatedCost ? 'text-danger-600' : 'text-success-600'
                "
              >
                {{ order.actualCost ? formatNumber(order.actualCost) : '—' }}
              </p>
            </div>
            <div class="p-3 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">Rejali sana</p>
              <p class="font-medium mt-1 text-sm">{{ formatDate(order.scheduledDate) }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3 class="font-semibold">Material so'rovlari</h3></div>
          <div class="card-body space-y-3">
            <div
              v-for="mr in orderMaterials"
              :key="mr.id"
              class="p-4 rounded-xl border border-neutral-100"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium">{{ mr.items.length }} ta item</span><StatusBadge :status="mr.status" :dot="true" />
              </div>
              <div class="space-y-1">
                <div v-for="item in mr.items" :key="item.id" class="flex justify-between text-xs">
                  <span class="text-neutral-500">{{ item.name }} × {{ item.quantity }} {{ item.unit }}</span><span class="font-mono">{{ formatNumber(item.quantity * item.unitPrice) }}</span>
                </div>
              </div>
            </div>
            <p v-if="!orderMaterials.length" class="text-center text-neutral-400 text-sm py-4">
              Material so'rovlari yo'q
            </p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="card p-5">
          <h3 class="font-semibold mb-3">Amallar</h3>
          <div class="flex flex-col gap-2">
            <button v-if="order.status === 'ASSIGNED'" class="btn-primary">Boshlash</button>
            <button v-if="order.status === 'IN_PROGRESS'" class="btn-warning">
              Inspeksiyaga yuborish
            </button>
            <button v-if="order.status === 'INSPECTION'" class="btn-success">Tugatish</button>
          </div>
        </div>
        <div v-if="order.inspectionNotes" class="card p-5">
          <h3 class="font-semibold mb-2">Inspeksiya izohi</h3>
          <p class="text-sm text-neutral-500">{{ order.inspectionNotes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
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
</script>
