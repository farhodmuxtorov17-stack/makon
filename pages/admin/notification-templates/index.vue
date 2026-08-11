<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Shablonlar</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="t in templates" :key="t.id" class="card-premium p-4">
        <h3 class="text-sm font-semibold text-ink-900 dark:text-white mb-1">{{ t.name }}</h3>
        <p class="text-xs text-ink-400">{{ t.preview }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const templates = [
  { id: 1, name: 'Yangi ariza', preview: 'Yangi ariza qabul qilindi...' },
  { id: 2, name: 'Shartnoma faol', preview: 'Shartnoma faol holatga o\'tdi...' },
  { id: 3, name: 'Invoys yaratildi', preview: 'Yangi invoys tayyor...' },
  { id: 4, name: 'Muddati o\'tdi', preview: 'Invoys muddati o\'tdi...' },
]
</script>
