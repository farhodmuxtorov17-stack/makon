<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Shartnomalarim</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Nomer</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Ijara</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Muddat</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in contracts" :key="c.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ c.number }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ c.unit }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ c.rent }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-400">{{ c.end }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const contracts = [
  { id: 1, number: 'CTR-2026-001', unit: 'A-301', rent: '25 000 000 UZS', end: '31.12.26' },
  { id: 2, number: 'CTR-2025-098', unit: 'B-201', rent: '15 000 000 UZS', end: '31.08.26' },
  { id: 3, number: 'CTR-2026-003', unit: 'C-105', rent: '8 000 000 UZS', end: '28.02.27' },
]
</script>
