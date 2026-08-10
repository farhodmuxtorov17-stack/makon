<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display text-ink-900">Hisob davrlari</h1>
        <p class="text-sm text-ink-500 mt-1">{{ periods.length }} davr</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" :stroke-width="2" />
        Yangi davr
      </button>
    </div>

    <div class="card overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Yil</th>
              <th>Oy</th>
              <th>Invoyslar</th>
              <th>Summa</th>
              <th>Generatsiya</th>
              <th>Yopilgan</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in periods" :key="p.id">
              <td class="font-semibold text-ink-900">{{ p.year }}</td>
              <td class="font-medium text-ink-900">{{ monthLabel(p.month) }}</td>
              <td class="text-ink-700">{{ p.invoiceCount }}</td>
              <td class="font-mono font-semibold text-ink-900">
                {{ formatNumber(p.totalAmount) }} so'm
              </td>
              <td class="text-ink-500 text-xs">
                {{ p.generatedAt ? formatDateTime(p.generatedAt) : '—' }}
              </td>
              <td class="text-ink-500 text-xs">
                {{ p.closedAt ? formatDateTime(p.closedAt) : '—' }}
              </td>
              <td><StatusBadge :status="p.status" :dot="true" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Plus } from 'lucide-vue-next'
import { useFinanceStore } from '~/stores/finance'
import { formatNumber, formatDateTime, monthLabel } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ middleware: 'auth' })
const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())
const periods = computed(() => financeStore.billingPeriods)
</script>
