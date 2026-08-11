<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Listinglar</h1>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Sarlavha</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Turi</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Narx</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in listings" :key="l.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ l.title }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ l.type }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ l.price }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="l.active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-ink-200 text-ink-500'">{{ l.active ? 'Faol' : 'Nofaol' }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const listings = [
  { id: 1, title: 'Tashkent City A-301 · 85 m²', type: 'Ijaraga', price: '25 000 000 UZS', active: true },
  { id: 2, title: 'Trillant Tower B-501 · 120 m²', type: 'Ijaraga', price: '35 000 000 UZS', active: true },
  { id: 3, title: 'Piramit D-102 · 200 m²', type: 'Ijaraga', price: '12 000 000 UZS', active: false },
  { id: 4, title: 'Savdo Markaz E-301 · 42 m²', type: 'Sotuvda', price: '450 000 000 UZS', active: true },
]
</script>
