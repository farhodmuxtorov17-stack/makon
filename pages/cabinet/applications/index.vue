<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Ariza va hujjatlar</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Nomer</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in apps" :key="a.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ a.number }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ a.unit }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="statusClass(a.status)">{{ statusLabel(a.status) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const apps = [
  { id: 1, number: 'APP-2026-028', unit: 'A-301', status: 'APPROVED' },
  { id: 2, number: 'APP-2026-025', unit: 'B-201', status: 'APPROVED' },
  { id: 3, number: 'APP-2026-031', unit: 'D-402', status: 'REVIEW' },
]
function statusLabel(s: string) { return { APPROVED: 'Tasdiqlangan', REVIEW: 'Ko\'rib chiqilmoqda', REJECTED: 'Rad etilgan' }[s] || s }
function statusClass(s: string) { return { APPROVED: 'bg-emerald-500/10 text-emerald-500', REVIEW: 'bg-amber-500/10 text-amber-500', REJECTED: 'bg-red-500/10 text-red-500' }[s] || '' }
</script>
