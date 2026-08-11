<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-ink-900 dark:text-white">Reja importi</h1>
      <button class="btn-primary">+ Import</button>
    </div>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Bino</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Qavat</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in plans" :key="p.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ p.building }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ p.floor }}-qavat</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500">Imported</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const plans = [
  { id: 1, building: 'MAKON BC', floor: 1 },
  { id: 2, building: 'MAKON BC', floor: 2 },
  { id: 3, building: 'City Plaza', floor: 1 },
]
</script>
