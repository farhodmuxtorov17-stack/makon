<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Audit jurnali</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Sana</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Foydalanuvchi</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Amal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in audit" :key="a.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm text-ink-400">{{ a.date }}</td>
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ a.user }}</td>
            <td class="px-4 py-3 text-sm text-ink-600 dark:text-ink-300">{{ a.action }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const audit = [
  { id: 1, date: '11.08 14:02', user: 'Akmal Jumayev', action: 'Tizimga kirdi' },
  { id: 2, date: '11.08 13:45', user: 'Nodira Azizova', action: 'Bino f12 ni tahrirladi' },
  { id: 3, date: '11.08 12:30', user: 'Saida Rahimova', action: 'Invoys INV-2026-053 yaratdi' },
  { id: 4, date: '11.08 11:15', user: 'Akmal Jumayev', action: 'Yangi foydalanuvchi qo\'shdi' },
]
</script>
