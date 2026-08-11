<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-ink-900 dark:text-white">Rezerv nusxalar</h1>
      <button class="btn-primary">+ Yangi nusxa</button>
    </div>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Sana</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Hajmi</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in backups" :key="b.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ b.date }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ b.size }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500">Tayyor</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const backups = [
  { id: 1, date: '11.08.2026 03:00', size: '248 MB' },
  { id: 2, date: '10.08.2026 03:00', size: '246 MB' },
  { id: 3, date: '09.08.2026 03:00', size: '244 MB' },
]
</script>
