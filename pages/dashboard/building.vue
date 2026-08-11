<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Bino Dashboard</h1>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="kpi in kpis" :key="kpi.label" class="card-premium p-4">
        <div class="text-xs text-ink-400 mb-2">{{ kpi.label }}</div>
        <div class="text-lg font-bold text-ink-900 dark:text-white">{{ kpi.value }}</div>
      </div>
    </div>

    <div class="card-premium overflow-hidden">
      <div class="px-4 py-3 border-b border-ink-100 dark:border-white/10">
        <h3 class="text-sm font-semibold text-ink-900 dark:text-white">Unitlar holati</h3>
      </div>
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Qavat</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Status</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Narx</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in units" :key="u.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ u.name }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ u.floor }}</td>
            <td class="px-4 py-3">
              <span class="text-xs px-2 py-1 rounded-full" :class="u.status === 'RENTED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'">
                {{ u.status === 'RENTED' ? 'Band' : 'Bo\'sh' }}
              </span>
            </td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ u.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

const kpis = [
  { label: 'Bandlik', value: '87%' },
  { label: "Bo'sh unitlar", value: '12' },
  { label: 'Faol shartnoma', value: '48' },
  { label: 'Qarzdorlik', value: '18.2 mln' },
]

const units = [
  { id: 1, name: 'A-101', floor: 1, status: 'RENTED', price: '3 500 000 UZS' },
  { id: 2, name: 'A-102', floor: 1, status: 'VACANT', price: '3 200 000 UZS' },
  { id: 3, name: 'B-201', floor: 2, status: 'RENTED', price: '4 800 000 UZS' },
  { id: 4, name: 'B-202', floor: 2, status: 'RENTED', price: '4 500 000 UZS' },
  { id: 5, name: 'C-301', floor: 3, status: 'VACANT', price: '5 200 000 UZS' },
  { id: 6, name: 'C-302', floor: 3, status: 'RENTED', price: '5 800 000 UZS' },
]
</script>
