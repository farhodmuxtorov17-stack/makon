<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Tasdiqlar</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Hujjat</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Turi</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Summa</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in approvals" :key="a.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ a.doc }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ a.type }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ a.amount }}</td>
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
const approvals = [
  { id: 1, doc: 'INV-2026-053', type: 'Invoys', amount: '9 800 000', status: 'PENDING' },
  { id: 2, doc: 'INV-2026-052', type: 'Invoys', amount: '12 500 000', status: 'PENDING' },
  { id: 3, doc: 'WO-2026-018', type: 'Work order', amount: '3 200 000', status: 'APPROVED' },
  { id: 4, doc: 'MR-2026-012', type: 'Material', amount: '1 800 000', status: 'REJECTED' },
]
function statusLabel(s: string) { return { PENDING: 'Kutilmoqda', APPROVED: 'Tasdiqlangan', REJECTED: 'Rad etilgan' }[s] || s }
function statusClass(s: string) { return { PENDING: 'bg-blue-500/10 text-blue-500', APPROVED: 'bg-emerald-500/10 text-emerald-500', REJECTED: 'bg-red-500/10 text-red-500' }[s] || '' }
</script>
