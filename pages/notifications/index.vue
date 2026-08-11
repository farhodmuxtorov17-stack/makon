<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Bildirishnomalar</h1>
    <div class="card-premium divide-y divide-ink-50 dark:divide-white/5">
      <div v-for="n in notifications" :key="n.id" class="flex items-start gap-3 px-4 py-3 hover:bg-ink-50 dark:hover:bg-white/5">
        <div class="w-2 h-2 rounded-full mt-2 flex-shrink-0" :class="n.read ? 'bg-ink-200' : 'bg-blue-500'"></div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-ink-900 dark:text-white">{{ n.title }}</div>
          <div class="text-xs text-ink-400 mt-0.5">{{ n.desc }}</div>
        </div>
        <span class="text-xs text-ink-400 flex-shrink-0">{{ n.time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const notifications = [
  { id: 1, title: 'Yangi ariza', desc: 'APP-2026-031 — Jasur Karimov', time: '2 soat', read: false },
  { id: 2, title: 'Shartnoma faol holatga o\'tdi', desc: 'CTR-2026-002 — Ipak Yuli', time: '5 soat', read: false },
  { id: 3, title: 'Invoys muddati o\'tdi', desc: 'INV-2026-046 — Markaz Savdo', time: '1 kun', read: true },
  { id: 4, title: 'Servis so\'rovi yopildi', desc: 'SR-2026-016 — bajarilgan', time: '2 kun', read: true },
]
</script>
