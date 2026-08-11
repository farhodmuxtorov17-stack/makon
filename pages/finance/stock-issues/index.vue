<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Material berish</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Sana</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Material</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Kimga</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Miqdor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in issues" :key="s.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm text-ink-400">{{ s.date }}</td>
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ s.material }}</td>
            <td class="px-4 py-3 text-sm text-ink-600 dark:text-ink-300">{{ s.to }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ s.qty }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const issues = [
  { id: 1, date: '10.08.26', material: 'Boyoq oq emal', to: 'Ishchi guruh 3', qty: '5 litr' },
  { id: 2, date: '09.08.26', material: 'Gipsokarton 12mm', to: 'Ishchi guruh 1', qty: '3 varaq' },
  { id: 3, date: '08.08.26', material: 'Sement M400', to: 'Ishchi guruh 2', qty: '4 qop' },
  { id: 4, date: '07.08.26', material: 'Laminat 8mm', to: 'Ishchi guruh 3', qty: '25 m²' },
]
</script>
