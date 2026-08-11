<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Material so'rovlari</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Nomer</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Material</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Miqdor</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in requests" :key="m.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ m.number }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ m.material }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ m.qty }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="statusClass(m.status)">{{ statusLabel(m.status) }}</span>
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
  { id: 1, number: 'MR-2026-012', material: 'Boyoq oq emal', qty: '5 litr', status: 'PENDING' },
  { id: 2, number: 'MR-2026-011', material: 'Gipsokarton 12mm', qty: '3 varaq', status: 'APPROVED' },
  { id: 3, number: 'MR-2026-010', material: 'Sement M400', qty: '4 qop', status: 'APPROVED' },
]
function statusLabel(s: string) { return { PENDING: 'Kutilmoqda', APPROVED: 'Tasdiqlangan', REJECTED: 'Rad etilgan' }[s] || s }
function statusClass(s: string) { return { PENDING: 'bg-blue-500/10 text-blue-500', APPROVED: 'bg-emerald-500/10 text-emerald-500', REJECTED: 'bg-red-500/10 text-red-500' }[s] || '' }
</script>
