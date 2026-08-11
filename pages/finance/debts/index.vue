<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Qarzdorlik</h1>

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div class="card-premium p-4">
        <div class="text-xs text-ink-400 mb-1">Jami qarz</div>
        <div class="text-lg font-bold text-red-500">18.6 mln UZS</div>
      </div>
      <div class="card-premium p-4">
        <div class="text-xs text-ink-400 mb-1">Muddati o'tgan</div>
        <div class="text-lg font-bold text-amber-500">6.2 mln UZS</div>
      </div>
      <div class="card-premium p-4">
        <div class="text-xs text-ink-400 mb-1">Ijarachilar</div>
        <div class="text-lg font-bold text-ink-900 dark:text-white">4</div>
      </div>
    </div>

    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Ijarachi</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Invoys</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Qarz</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Muddat</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in debts" :key="d.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ d.tenant }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ d.invoice }}</td>
            <td class="px-4 py-3 text-right text-sm font-medium text-red-500">{{ d.amount.toLocaleString('ru-RU') }} UZS</td>
            <td class="px-4 py-3 text-right text-sm text-ink-400">{{ d.dueDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: "Qarzdorlik — MAKON" })

const debts = [
  { id: 1, tenant: 'Markaz Savdo', invoice: 'INV-2026-046', amount: 3100000, dueDate: '15.07.26' },
  { id: 2, tenant: 'Alfa Biznes', invoice: 'INV-2026-044', amount: 1800000, dueDate: '01.07.26' },
  { id: 3, tenant: 'Chorsu Retail', invoice: 'INV-2026-045', amount: 5500000, dueDate: '20.07.26' },
  { id: 4, tenant: 'Zomin Invest', invoice: 'INV-2026-047', amount: 8200000, dueDate: '05.08.26' },
]
</script>
