<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Mening unitlarim</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="u in units" :key="u.id" class="card-premium p-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-semibold text-ink-900 dark:text-white">{{ u.name }}</h3>
          <span class="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500">Faol</span>
        </div>
        <p class="text-xs text-ink-400">{{ u.building }}</p>
        <p class="text-xs text-ink-400 mt-1">{{ u.area }} m² · {{ u.floor }}-qavat</p>
        <div class="text-sm font-medium text-blue-500 mt-3">{{ u.rent }}/oy</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const units = [
  { id: 1, name: 'A-301', building: 'MAKON BC', area: 85, floor: 3, rent: '25 000 000 UZS' },
  { id: 2, name: 'B-201', building: 'MAKON BC', area: 65, floor: 2, rent: '15 000 000 UZS' },
  { id: 3, name: 'C-105', building: 'City Plaza', area: 52, floor: 1, rent: '8 000 000 UZS' },
]
</script>
