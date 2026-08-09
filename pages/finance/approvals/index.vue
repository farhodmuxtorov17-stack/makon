<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Moliyaviy tasdiqlar</h1>
        <p class="text-sm text-neutral-500 mt-1">
          {{ pendingApps.length + pendingMaterials.length }} tasdiq kutilmoqda
        </p>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3 class="font-semibold">Arizalar — Finance review</h3></div>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Raqam</th>
              <th>Mijoz</th>
              <th>Narx</th>
              <th>Sana</th>
              <th class="text-right">Amal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="a in pendingApps" :key="a.id">
              <td class="font-mono text-xs">{{ a.number }}</td>
              <td class="font-medium">{{ a.applicantName }}</td>
              <td class="font-mono">{{ formatNumber(a.offeredPrice) }}</td>
              <td class="text-neutral-500">{{ formatDate(a.createdAt) }}</td>
              <td class="text-right">
                <div class="flex justify-end gap-2">
                  <button class="btn-success btn-sm">Tasdiqlash</button><button class="btn-ghost btn-sm text-danger-600">Rad</button>
                </div>
              </td>
            </tr>
            <tr v-if="!pendingApps.length">
              <td colspan="5" class="text-center text-neutral-400 py-8">
                Finance review kutilayotgan arizalar yo'q
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3 class="font-semibold">Material so'rovlari</h3></div>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Ish buyruq</th>
              <th>Itemlar</th>
              <th>Sana</th>
              <th class="text-right">Amal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in pendingMaterials" :key="m.id">
              <td class="font-mono text-xs">{{ m.workOrderId }}</td>
              <td class="text-neutral-500">{{ m.items.length }} ta item</td>
              <td class="text-neutral-500">{{ formatDate(m.createdAt) }}</td>
              <td class="text-right">
                <div class="flex justify-end gap-2">
                  <button class="btn-success btn-sm">Tasdiqlash</button><button class="btn-ghost btn-sm text-danger-600">Rad</button>
                </div>
              </td>
            </tr>
            <tr v-if="!pendingMaterials.length">
              <td colspan="4" class="text-center text-neutral-400 py-8">
                Kutilayotgan so'rovlar yo'q
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFinanceStore } from '~/stores/finance'
import { useServiceStore } from '~/stores/service'
import { formatNumber, formatDate } from '~/utils'

definePageMeta({ middleware: 'auth' })
const financeStore = useFinanceStore()
const serviceStore = useServiceStore()
onMounted(() => {
  financeStore.initMockData()
  serviceStore.initMockData()
})
const pendingApps = computed(() => financeStore.pendingApplications)
const pendingMaterials = computed(() => serviceStore.pendingMaterialApprovals)
</script>
