<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Xizmatlar</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="s in services" :key="s.id" class="card-premium p-4">
        <h3 class="text-sm font-semibold text-ink-900 dark:text-white mb-1">{{ s.name }}</h3>
        <p class="text-xs text-ink-400 mb-3">{{ s.desc }}</p>
        <div class="text-sm font-medium text-blue-500">{{ s.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const services = [
  { id: 1, name: 'Tozalash', desc: 'Ofis tozalash xizmati', price: '500 000 UZS/oy' },
  { id: 2, name: 'Internet', desc: 'Yuqori tezlikdagi internet', price: '800 000 UZS/oy' },
  { id: 3, name: 'Parking', desc: 'Avtoturargoh', price: '300 000 UZS/oy' },
]
</script>
