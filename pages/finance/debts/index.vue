
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Qarzdorlik</h1>
        <p class="text-ink-400 text-sm mt-1">Muddati o'tgan to'lovlar va aging tahlil</p>
      </div>
      <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
    </div>

    <!-- Aging buckets -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="bucket in agingBuckets" :key="bucket.label" class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-ink-400">{{ bucket.label }}</span>
          <span class="badge" :class="bucket.count > 0 ? bucket.badgeClass : 'badge-neutral'">{{ bucket.count }}</span>
        </div>
        <div class="text-xl font-bold" :class="bucket.count > 0 ? bucket.textClass : 'text-ink-500'">
          {{ formatPriceShort(bucket.amount) }}
        </div>
        <div class="text-xs text-ink-500 mt-1">so'm</div>
      </div>
    </div>

    <!-- Chart -->
    <div class="card p-6">
      <h3 class="text-white font-semibold mb-4">Aging diagrammasi</h3>
      <div class="flex items-end gap-4 h-48">
        <div v-for="bucket in agingBuckets" :key="bucket.label" class="flex-1 flex flex-col items-center gap-2">
          <div class="text-xs text-ink-500">{{ formatPriceShort(bucket.amount) }}</div>
          <div
            class="w-full rounded-t-lg transition-all duration-500"
            :class="bucket.barClass"
            :style="{ height: Math.max(bucket.amount / maxAmount * 100, 4) + '%' }"
          />
          <div class="text-xs text-ink-400">{{ bucket.label }}</div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-white/5">
        <h3 class="text-white font-semibold">Muddati o'tgan invoyslar</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Tashkilot</th>
              <th>Unit</th>
              <th>Summa</th>
              <th>Kunlar</th>
              <th>Bucket</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="debt in debts" :key="debt.id" class="table-row-hover">
              <td class="text-white font-mono text-xs">{{ debt.invoiceNumber }}</td>
              <td class="text-white">{{ debt.orgName }}</td>
              <td class="text-ink-400">{{ debt.unitNumber }}</td>
              <td class="text-red-400 font-medium">{{ formatPriceShort(debt.amount) }}</td>
              <td :class="debt.days > 60 ? 'text-red-400' : 'text-amber-400'">{{ debt.days }} kun</td>
              <td><span class="badge" :class="debt.bucket === '90+' ? 'badge-danger' : debt.bucket === '61-90' ? 'badge-warning' : 'badge-info'">{{ debt.bucket }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Download } from 'lucide-vue-next'
import { invoices, contracts } from '~/utils/mockData'

const { formatPriceShort } = useFormat()

const debts = [
  { id: 'd1', invoiceNumber: 'INV-2026-072', orgName: 'Tashkent Logistics LLC', unitNumber: '18-F', amount: 35000000, days: 30, bucket: '0-30' as const },
  { id: 'd2', invoiceNumber: 'INV-2026-074', orgName: 'Aura Biznes Group', unitNumber: '210', amount: 13500000, days: 92, bucket: '90+' as const },
  { id: 'd3', invoiceNumber: 'INV-2026-065', orgName: 'Tashkent Logistics LLC', unitNumber: '18-F', amount: 35000000, days: 62, bucket: '61-90' as const },
  { id: 'd4', invoiceNumber: 'INV-2026-058', orgName: 'Global Trade Co', unitNumber: 'B-7', amount: 18000000, days: 45, bucket: '31-60' as const },
]

const agingBuckets = [
  { label: '0-30 kun', amount: 35000000, count: 1, badgeClass: 'badge-info', textClass: 'text-blue-400', barClass: 'bg-blue-500' },
  { label: '31-60 kun', amount: 18000000, count: 1, badgeClass: 'badge-warning', textClass: 'text-amber-400', barClass: 'bg-amber-500' },
  { label: '61-90 kun', amount: 35000000, count: 1, badgeClass: 'badge-warning', textClass: 'text-amber-400', barClass: 'bg-orange-500' },
  { label: '90+ kun', amount: 13500000, count: 1, badgeClass: 'badge-danger', textClass: 'text-red-400', barClass: 'bg-red-500' },
]

const maxAmount = Math.max(...agingBuckets.map(b => b.amount))
</script>
