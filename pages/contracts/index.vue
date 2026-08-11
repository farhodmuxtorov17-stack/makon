<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Shartnomalar</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Nomer</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Ijarachi</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Ijara</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in contracts" :key="c.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ c.number }}</td>
            <td class="px-4 py-3 text-sm text-ink-600 dark:text-ink-300">{{ c.tenant }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ c.unit }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ c.rent.toLocaleString('ru-RU') }} UZS</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="statusClass(c.status)">{{ statusLabel(c.status) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const contracts = [
  { id: 1, number: 'CTR-2026-001', tenant: 'Orient Logistika', unit: 'G-001', rent: 68000000, status: 'ACTIVE' },
  { id: 2, number: 'CTR-2026-002', tenant: 'Ipak Yuli Savdo', unit: 'B-501', rent: 35000000, status: 'ACTIVE' },
  { id: 3, number: 'CTR-2026-005', tenant: 'Alfa Biznes', unit: 'C-201', rent: 18000000, status: 'ACTIVE' },
  { id: 4, number: 'CTR-2026-008', tenant: 'Markaz Savdo', unit: 'D-102', rent: 22000000, status: 'PENDING' },
]
function statusLabel(s: string) { return { ACTIVE: 'Faol', PENDING: 'Kutilmoqda', EXPIRED: 'Muddati o\'tgan' }[s] || s }
function statusClass(s: string) { return { ACTIVE: 'bg-emerald-500/10 text-emerald-500', PENDING: 'bg-blue-500/10 text-blue-500', EXPIRED: 'bg-red-500/10 text-red-500' }[s] || '' }
</script>
