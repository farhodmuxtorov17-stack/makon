<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Hisoblagichlar</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ meters.length }} hisoblagich</p>
      </div>
      <button class="btn-primary btn-sm">+ Yangi</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Kod</th>
              <th>Turi</th>
              <th>Seriya</th>
              <th>Bino</th>
              <th>Unit</th>
              <th>Faol</th>
              <th>O'rnatilgan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in meters" :key="m.id">
              <td class="font-mono text-xs font-medium">{{ m.code }}</td>
              <td>
                <span class="badge-info">{{ typeLabel(m.type) }}</span>
              </td>
              <td class="font-mono text-xs text-neutral-500">{{ m.serialNumber }}</td>
              <td class="text-neutral-500">{{ buildingName(m.buildingId) }}</td>
              <td class="text-neutral-500">{{ m.unitId || '—' }}</td>
              <td>
                <span :class="m.isActive ? 'badge-success' : 'badge-neutral'">{{
                  m.isActive ? 'Faol' : 'Nofaol'
                }}</span>
              </td>
              <td class="text-neutral-500 text-xs">{{ formatDate(m.installedAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="card-header"><h3 class="font-semibold">So'nggi o'qishlar</h3></div>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Hisoblagich</th>
              <th>Qiymat</th>
              <th>Sana</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in readings" :key="r.id">
              <td class="font-mono text-xs">{{ meterCode(r.meterId) }}</td>
              <td class="font-mono font-bold">{{ r.value }}</td>
              <td class="text-neutral-500">{{ formatDate(r.readingAt) }}</td>
              <td><StatusBadge :status="r.status" :dot="true" /></td>
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
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ middleware: 'auth' })
const serviceStore = useServiceStore()
const buildingStore = useBuildingStore()
onMounted(() => {
  serviceStore.initMockData()
  buildingStore.initMockData()
})
const meters = computed(() => serviceStore.meters)
const readings = computed(() => serviceStore.meterReadings)
const typeLabel = (t: string) =>
  ({ ELECTRICITY: 'Elektr', WATER: 'Suv', GAS: 'Gaz', HEAT: 'Issiqlik' })[t] || t
const buildingName = (id: string) => buildingStore.buildingById(id)?.name || id
const meterCode = (id: string) => serviceStore.meters.find((m) => m.id === id)?.code || id
</script>
