<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Moliya davrlari</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Davr</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Daromad</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Xarajat</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in periods" :key="p.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ p.name }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ p.income.toLocaleString('ru-RU') }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ p.expense.toLocaleString('ru-RU') }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="p.status === 'CLOSED' ? 'bg-ink-200 text-ink-500' : 'bg-emerald-500/10 text-emerald-500'">{{ p.status === 'CLOSED' ? 'Yopilgan' : 'Faol' }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const periods = [
  { id: 1, name: 'Avgust 2026', income: 42000000, expense: 8500000, status: 'OPEN' },
  { id: 2, name: 'Iyul 2026', income: 38500000, expense: 7800000, status: 'CLOSED' },
  { id: 3, name: 'Iyun 2026', income: 41000000, expense: 8200000, status: 'CLOSED' },
  { id: 4, name: 'May 2026', income: 37000000, expense: 7500000, status: 'CLOSED' },
]
</script>
