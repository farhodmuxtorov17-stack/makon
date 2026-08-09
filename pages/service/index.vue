<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Servis so'rovlari</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ requests.length }} so'rov</p>
      </div>
      <button class="btn-primary btn-sm">+ Yangi so'rov</button>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Yaratilgan"
        :value="requests.filter((r) => r.status === 'CREATED').length"
        color="neutral"
        icon="M12 4v16m8-8H4"
      />
      <StatCard
        label="Jarayonda"
        :value="requests.filter((r) => r.status === 'IN_PROGRESS').length"
        color="warning"
        icon="M12 8v4l3 3"
      />
      <StatCard
        label="Bajarilgan"
        :value="requests.filter((r) => r.status === 'DONE').length"
        color="success"
        icon="M5 13l4 4L19 7"
      />
      <StatCard
        label="Shoshilinch"
        :value="requests.filter((r) => r.priority === 'URGENT').length"
        color="danger"
        icon="M12 9v2m0 4h.01"
      />
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Raqam</th>
              <th>Bino</th>
              <th>Kategoriya</th>
              <th>Tavsif</th>
              <th>Priority</th>
              <th>Holat</th>
              <th>Sana</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="r in requests"
              :key="r.id"
              class="cursor-pointer"
              @click="navigateTo(`/service/work-orders`)"
            >
              <td class="font-mono text-xs font-medium">{{ r.number }}</td>
              <td class="text-neutral-500">{{ buildingName(r.buildingId) }}</td>
              <td>
                <span class="badge-neutral">{{ r.category }}</span>
              </td>
              <td class="text-neutral-500 max-w-xs truncate">{{ r.description }}</td>
              <td>
                <span :class="priorityClass(r.priority)">{{ priorityLabel(r.priority) }}</span>
              </td>
              <td><StatusBadge :status="r.status" :dot="true" /></td>
              <td class="text-neutral-500 text-xs">{{ formatDate(r.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useServiceStore } from '~/stores/service'
import { useBuildingStore } from '~/stores/building'
import { formatDate } from '~/utils'
import StatCard from '~/components/ui/StatCard.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ middleware: 'auth' })
const serviceStore = useServiceStore()
const buildingStore = useBuildingStore()
onMounted(() => {
  serviceStore.initMockData()
  buildingStore.initMockData()
})
const requests = computed(() => serviceStore.serviceRequests)
const buildingName = (id: string) => buildingStore.buildingById(id)?.name || id
const priorityLabel = (p: string) =>
  ({ LOW: 'Past', MEDIUM: "O'rta", HIGH: 'Yuqori', URGENT: 'Shoshilinch' })[p] || p
const priorityClass = (p: string) =>
  ({ LOW: 'badge-neutral', MEDIUM: 'badge-info', HIGH: 'badge-warning', URGENT: 'badge-danger' })[
    p
  ] || 'badge-neutral'
</script>
