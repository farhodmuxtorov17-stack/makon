<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display text-ink-900">Tasdiqlar</h1>
        <p class="text-sm text-ink-500 mt-1">
          {{ pendingApps.length + pendingMaterials.length }} tasdiq kutilmoqda
        </p>
      </div>
    </div>

    <!-- Applications -->
    <div class="card overflow-hidden">
      <div class="px-5 py-4 border-b border-ink-100 flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
          <ClipboardList :size="16" :stroke-width="2" class="text-brand-600" />
        </div>
        <h3 class="font-semibold text-ink-900">Arizalar — Finance review</h3>
      </div>
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
              <td class="font-mono text-xs font-medium text-ink-900">{{ a.number }}</td>
              <td class="font-medium text-ink-900">{{ a.applicantName }}</td>
              <td class="font-mono font-semibold text-ink-900">
                {{ formatNumber(a.offeredPrice) }} so'm
              </td>
              <td class="text-ink-500 text-xs">{{ formatDate(a.createdAt) }}</td>
              <td class="text-right">
                <div class="flex justify-end gap-2">
                  <button class="btn btn-primary btn-sm">
                    <Check :size="14" :stroke-width="2.5" />
                    Tasdiqlash
                  </button>
                  <button class="btn btn-secondary btn-sm text-danger-600">
                    <X :size="14" :stroke-width="2.5" />
                    Rad
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!pendingApps.length">
              <td colspan="5" class="text-center text-ink-400 py-8">
                Finance review kutilayotgan arizalar yo'q
              </td>
            </tr>
          </tbody>
        </table>
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
              <td class="font-mono text-xs font-medium text-ink-900">{{ m.workOrderId }}</td>
              <td class="text-ink-700">{{ m.items.length }} ta item</td>
              <td class="text-ink-500 text-xs">{{ formatDate(m.createdAt) }}</td>
              <td class="text-right">
                <div class="flex justify-end gap-2">
                  <button class="btn btn-primary btn-sm">
                    <Check :size="14" :stroke-width="2.5" />
                    Tasdiqlash
                  </button>
                  <button class="btn btn-secondary btn-sm text-danger-600">
                    <X :size="14" :stroke-width="2.5" />
                    Rad
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!pendingMaterials.length">
              <td colspan="4" class="text-center text-ink-400 py-8">Kutilayotgan so'rovlar yo'q</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Check, X, ClipboardList, Package } from 'lucide-vue-next'
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
