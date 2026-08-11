<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Kirish tarixi</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Foydalanuvchi</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">IP</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Sana</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in logins" :key="l.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ l.user }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ l.ip }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-400">{{ l.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const logins = [
  { id: 1, user: 'Akmal Jumayev', ip: '94.158.12.34', date: '11.08 14:02' },
  { id: 2, user: 'Nodira Azizova', ip: '94.158.12.35', date: '11.08 09:15' },
  { id: 3, user: 'Saida Rahimova', ip: '94.158.12.36', date: '10.08 17:30' },
]
</script>
