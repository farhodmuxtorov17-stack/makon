<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-xl font-bold text-ink-900 dark:text-white">Dashboard</h1>
        <p class="text-sm text-ink-400 mt-0.5">{{ buildings.length }} ta biznes markaz</p>
      </div>
      <select v-model="scopeFilter" class="input max-w-[200px]">
        <option value="">Barcha obyektlar</option>
        <option v-for="b in buildings" :key="b.name" :value="b.name">{{ b.name }}</option>
      </select>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div v-for="kpi in kpis" :key="kpi.label" class="card-premium p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-ink-400">{{ kpi.label }}</span>
          <span class="text-xs font-medium" :class="kpi.trend > 0 ? 'text-emerald-500' : 'text-red-500'">
            {{ kpi.trend > 0 ? '+' : '' }}{{ kpi.trend }}%
          </span>
        </div>
        <div class="text-lg font-bold text-ink-900 dark:text-white">{{ kpi.value }}</div>
      </div>
    </div>

    <!-- Buildings table -->
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs font-medium text-ink-400 px-4 py-3">Bino</th>
            <th class="text-right text-xs font-medium text-ink-400 px-4 py-3">Bandlik</th>
            <th class="text-right text-xs font-medium text-ink-400 px-4 py-3">Qarzdorlik</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in buildings" :key="b.slug" class="border-b border-ink-50 dark:border-white/5 hover:bg-ink-50 dark:hover:bg-white/5 transition-colors">
            <td class="px-4 py-3">
              <NuxtLink :to="`/management/buildings/${b.slug}`" class="text-sm font-medium text-ink-900 dark:text-white hover:text-brand-500">{{ b.name }}</NuxtLink>
            </td>
            <td class="px-4 py-3 text-right">
              <span class="text-sm font-medium" :class="b.occupancy > 85 ? 'text-emerald-500' : 'text-amber-500'">{{ b.occupancy }}%</span>
            </td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ b.debt }} mln</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

const scopeFilter = ref('')

const kpis = [
  { label: "Bandlik", value: '87%', trend: 4.2 },
  { label: 'Bo\'sh', value: '13%', trend: -2.1 },
  { label: 'Qarzdorlik', value: '125.4 mln', trend: 6.3 },
  { label: 'Servis', value: '156', trend: -8.0 },
  { label: "To'lovlar", value: '824.6 mln', trend: 12.5 },
]

const buildings = [
  { name: 'MAKON Business Center', slug: 'makon-bc', occupancy: 92, debt: 18.2 },
  { name: "Navro'z Business Center", slug: 'navroz-bc', occupancy: 85, debt: 22.5 },
  { name: 'City Plaza', slug: 'city-plaza', occupancy: 88, debt: 27.4 },
  { name: 'Tashkent Finance Center', slug: 'tashkent-finance-center', occupancy: 80, debt: 31.6 },
  { name: 'Green Park Office', slug: 'green-park-office', occupancy: 90, debt: 25.7 },
]
</script>
