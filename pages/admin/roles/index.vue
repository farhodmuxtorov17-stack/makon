<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Rollar va huquqlar</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="r in roles" :key="r.id" class="card-premium p-4">
        <h3 class="text-sm font-semibold text-ink-900 dark:text-white mb-1">{{ r.name }}</h3>
        <p class="text-xs text-ink-400">{{ r.users }} foydalanuvchi</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const roles = [
  { id: 1, name: 'Super Rahbar', users: 1 },
  { id: 2, name: 'Bino Rahbari', users: 3 },
  { id: 3, name: 'Buxgalter', users: 2 },
  { id: 4, name: 'Pudratchi', users: 5 },
  { id: 5, name: 'Ijarachi', users: 48 },
]
</script>
