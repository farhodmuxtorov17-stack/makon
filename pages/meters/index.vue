<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Hisoblagichlar</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Bino</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Turi</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Ko\'rsatish</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in meters" :key="m.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm text-ink-400">{{ m.building }}</td>
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ m.unit }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ m.type }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ m.reading }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const meters = [
  { id: 1, building: 'MAKON BC', unit: 'A-301', type: 'Elektr', reading: '4 852 kWh' },
  { id: 2, building: 'MAKON BC', unit: 'A-301', type: 'Suv', reading: '38 m³' },
  { id: 3, building: 'MAKON BC', unit: 'B-201', type: 'Elektr', reading: '6 240 kWh' },
  { id: 4, building: 'City Plaza', unit: 'C-105', type: 'Elektr', reading: '2 180 kWh' },
]
</script>
