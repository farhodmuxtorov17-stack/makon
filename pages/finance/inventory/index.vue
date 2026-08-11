<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Ombor</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Material</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Kategoriya</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Miqdor</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Min. stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventory" :key="item.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ item.name }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ item.category }}</td>
            <td class="px-4 py-3 text-right text-sm" :class="item.quantity <= item.minStock ? 'text-red-500 font-medium' : 'text-ink-600 dark:text-ink-300'">{{ item.quantity }} {{ item.unit }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-400">{{ item.minStock }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const inventory = [
  { id: 1, name: 'Boyoq oq emal', category: 'Finish', quantity: 45, unit: 'litr', minStock: 20 },
  { id: 2, name: 'Gipsokarton 12mm', category: 'Qurilish', quantity: 8, unit: 'varaq', minStock: 15 },
  { id: 3, name: 'Laminat 8mm', category: 'Pol', quantity: 120, unit: 'm²', minStock: 50 },
  { id: 4, name: 'Sement M400', category: 'Qurilish', quantity: 28, unit: 'qop', minStock: 20 },
  { id: 5, name: 'Elektr kabel 3x2.5', category: 'Elektr', quantity: 15, unit: 'metr', minStock: 30 },
  { id: 6, name: 'Kraska acryl', category: 'Finish', quantity: 60, unit: 'litr', minStock: 25 },
]
</script>
