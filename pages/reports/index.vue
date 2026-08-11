<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Hisobotlar</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="r in reports" :key="r.id" class="card-premium p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 class="text-sm font-semibold text-ink-900 dark:text-white mb-1">{{ r.name }}</h3>
        <p class="text-xs text-ink-400">{{ r.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const reports = [
  { id: 1, name: 'Daromad hisoboti', desc: 'Oylik daromad va xarajatlar' },
  { id: 2, name: 'Bandlik hisoboti', desc: 'Bandlik va bo\'sh unitlar' },
  { id: 3, name: 'Shartnoma hisoboti', desc: 'Faol va tugaydigan shartnomalar' },
  { id: 4, name: 'Qarzdorlik hisoboti', desc: 'Ijarachilar bo\'yicha qarzlar' },
  { id: 5, name: 'Servis hisoboti', desc: 'Servis so\'rovlari statistikasi' },
  { id: 6, name: 'Buxgalteriya', desc: 'Invoyslar va to\'lovlar' },
]
</script>
