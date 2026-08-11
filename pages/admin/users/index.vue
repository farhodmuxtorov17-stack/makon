<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-ink-900 dark:text-white">Foydalanuvchilar</h1>
      <button class="btn-primary">+ Foydalanuvchi</button>
    </div>
    <div class="card-premium overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Ism</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Email</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Rol</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ u.name }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ u.email }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ u.role }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="u.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'">{{ u.status === 'ACTIVE' ? 'Faol' : 'Kutilmoqda' }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const users = [
  { id: 1, name: 'Akmal Jumayev', email: 'a.jumayev@makon.uz', role: 'Super Rahbar', status: 'ACTIVE' },
  { id: 2, name: 'Nodira Azizova', email: 'n.azizova@makon.uz', role: 'Bino Rahbari', status: 'ACTIVE' },
  { id: 3, name: 'Saida Rahimova', email: 's.rahimova@makon.uz', role: 'Buxgalter', status: 'ACTIVE' },
  { id: 4, name: 'Bekzod Karimov', email: 'b.karimov@makon.uz', role: 'Pudratchi', status: 'PENDING' },
]
</script>
