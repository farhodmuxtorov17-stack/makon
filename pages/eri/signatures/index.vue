<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">ERI imzolar</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Hujjat</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Ijarachi</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in signatures" :key="s.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ s.doc }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ s.tenant }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="s.signed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'">{{ s.signed ? 'Imzolangan' : 'Kutilmoqda' }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const signatures = [
  { id: 1, doc: 'CTR-2026-001', tenant: 'Orient Logistika', signed: true },
  { id: 2, doc: 'CTR-2026-002', tenant: 'Ipak Yuli Savdo', signed: true },
  { id: 3, doc: 'CTR-2026-008', tenant: 'Markaz Savdo', signed: false },
]
</script>
