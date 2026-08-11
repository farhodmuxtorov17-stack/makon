<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Hisoblagich ko'rsatlari</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Turi</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Ko'rsatish</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Sana</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in readings" :key="r.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ r.unit }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ r.type }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ r.reading }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-400">{{ r.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const readings = [
  { id: 1, unit: 'A-301', type: 'Elektr', reading: '4 852 kWh', date: '01.08.26' },
  { id: 2, unit: 'A-301', type: 'Suv', reading: '38 m³', date: '01.08.26' },
  { id: 3, unit: 'B-201', type: 'Elektr', reading: '6 240 kWh', date: '01.08.26' },
]
</script>
