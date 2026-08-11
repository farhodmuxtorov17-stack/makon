<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-ink-900 dark:text-white">Servis so'rovlari</h1>
      <NuxtLink to="/cabinet/service-requests/new" class="btn-primary">+ Yangi so'rov</NuxtLink>
    </div>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Nomer</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Kategoriya</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in requests" :key="s.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ s.number }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ s.category }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="statusClass(s.status)">{{ statusLabel(s.status) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const requests = [
  { id: 1, number: 'SR-2026-015', category: 'Elektr', status: 'DONE' },
  { id: 2, number: 'SR-2026-019', category: 'Santexnika', status: 'OPEN' },
]
function statusLabel(s: string) { return { OPEN: 'Ochiq', IN_PROGRESS: 'Ishlanmoqda', DONE: 'Bajarilgan' }[s] || s }
function statusClass(s: string) { return { OPEN: 'bg-blue-500/10 text-blue-500', IN_PROGRESS: 'bg-amber-500/10 text-amber-500', DONE: 'bg-emerald-500/10 text-emerald-500' }[s] || '' }
</script>
