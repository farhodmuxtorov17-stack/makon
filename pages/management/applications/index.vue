<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Arizalar</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Nomer</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Ism</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in apps" :key="a.id" class="border-b border-ink-50 dark:border-white/5 hover:bg-ink-50 dark:hover:bg-white/5 cursor-pointer">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ a.number }}</td>
            <td class="px-4 py-3 text-sm text-ink-600 dark:text-ink-300">{{ a.name }}</td>
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
  { id: 1, number: 'APP-2026-031', name: 'Jasur Karimov', unit: 'A-301', status: 'NEW' },
  { id: 2, number: 'APP-2026-030', name: 'Dilnoza Ahmedova', unit: 'B-201', status: 'REVIEW' },
  { id: 3, number: 'APP-2026-029', name: 'Orient Logistika', unit: 'G-001', status: 'APPROVED' },
]
function statusLabel(s: string) { return { NEW: 'Yangi', REVIEW: 'Ko\'rib chiqilmoqda', APPROVED: 'Tasdiqlangan', REJECTED: 'Rad etilgan' }[s] || s }
function statusClass(s: string) { return { NEW: 'bg-blue-500/10 text-blue-500', REVIEW: 'bg-amber-500/10 text-amber-500', APPROVED: 'bg-emerald-500/10 text-emerald-500', REJECTED: 'bg-red-500/10 text-red-500' }[s] || '' }
</script>
