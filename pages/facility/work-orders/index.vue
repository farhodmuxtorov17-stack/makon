<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Work orderlar</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Nomer</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Turi</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Bino</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="w in orders" :key="w.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ w.number }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ w.type }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ w.building }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="statusClass(w.status)">{{ statusLabel(w.status) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const orders = [
  { id: 1, number: 'WO-2026-018', type: 'Elektr', building: 'MAKON BC', status: 'OPEN' },
  { id: 2, number: 'WO-2026-017', type: 'Santexnika', building: 'City Plaza', status: 'IN_PROGRESS' },
  { id: 3, number: 'WO-2026-016', type: 'Devor', building: 'MAKON BC', status: 'DONE' },
]
function statusLabel(s: string) { return { OPEN: 'Ochiq', IN_PROGRESS: 'Ishlanmoqda', DONE: 'Bajarilgan' }[s] || s }
function statusClass(s: string) { return { OPEN: 'bg-blue-500/10 text-blue-500', IN_PROGRESS: 'bg-amber-500/10 text-amber-500', DONE: 'bg-emerald-500/10 text-emerald-500' }[s] || '' }
</script>
