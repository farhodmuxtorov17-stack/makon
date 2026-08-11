<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Unitlar</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Bino</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Qavat</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Maydon</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in units" :key="u.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ u.name }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ u.building }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ u.floor }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ u.area }} m²</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="u.status === 'RENTED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'">{{ u.status === 'RENTED' ? 'Band' : 'Bo\'sh' }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const units = [
  { id: 1, name: 'A-101', building: 'MAKON BC', floor: 1, area: 45, status: 'RENTED' },
  { id: 2, name: 'A-102', building: 'MAKON BC', floor: 1, area: 38, status: 'VACANT' },
  { id: 3, name: 'B-201', building: 'MAKON BC', floor: 2, area: 65, status: 'RENTED' },
  { id: 4, name: 'C-105', building: 'City Plaza', floor: 1, area: 52, status: 'VACANT' },
  { id: 5, name: 'D-302', building: 'City Plaza', floor: 3, area: 85, status: 'RENTED' },
]
</script>
