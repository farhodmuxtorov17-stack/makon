<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Mening kabinetim</h1>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="card-premium p-4"><div class="text-xs text-ink-400 mb-1">Faol unitlar</div><div class="text-lg font-bold text-ink-900 dark:text-white">3</div></div>
      <div class="card-premium p-4"><div class="text-xs text-ink-400 mb-1">Shartnomalar</div><div class="text-lg font-bold text-ink-900 dark:text-white">3</div></div>
      <div class="card-premium p-4"><div class="text-xs text-ink-400 mb-1">Servis so'rovlari</div><div class="text-lg font-bold text-ink-900 dark:text-white">2</div></div>
      <div class="card-premium p-4"><div class="text-xs text-ink-400 mb-1">Qarz</div><div class="text-lg font-bold text-red-500">0 UZS</div></div>
    </div>
    <div class="card-premium p-4">
      <h3 class="text-sm font-semibold text-ink-900 dark:text-white mb-4">Faol shartnomalar</h3>
      <div v-for="c in contracts" :key="c.id" class="flex items-center justify-between py-3 border-b border-ink-50 dark:border-white/5 last:border-0">
        <div>
          <div class="text-sm font-medium text-ink-900 dark:text-white">{{ c.unit }}</div>
          <div class="text-xs text-ink-400">{{ c.number }} · {{ c.rent }}/oy</div>
        </div>
        <span class="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500">Faol</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const contracts = [
  { id: 1, unit: 'A-301', number: 'CTR-2026-001', rent: '25 000 000 UZS' },
  { id: 2, unit: 'B-201', number: 'CTR-2025-098', rent: '15 000 000 UZS' },
  { id: 3, unit: 'C-105', number: 'CTR-2026-003', rent: '8 000 000 UZS' },
]
</script>
