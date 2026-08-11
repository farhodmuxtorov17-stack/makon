<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Servis so'rovlari</h1>
        <p class="text-ink-500 text-sm mt-1">Texnik xizmat so'rovlari tarixi</p>
      </div>
      <NuxtLink to="/cabinet/service-requests/new" class="btn btn-primary btn-sm btn-glow">
        <Plus :size="16" /> Yangi so'rov
      </NuxtLink>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">Jami so'rovlar</div>
        <div class="text-2xl font-bold text-ink-900 dark:text-white">{{ requests.length }}</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">Faol</div>
        <div class="text-2xl font-bold text-amber-500">{{ activeCount }}</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">Yechilgan</div>
        <div class="text-2xl font-bold text-emerald-500">{{ resolvedCount }}</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">O'rtacha reyting</div>
        <div class="text-2xl font-bold text-brand-500">{{ avgRating }} ★</div>
      </div>
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 uppercase tracking-widest border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">#</th>
              <th class="px-4 py-3">Kategoriya</th>
              <th class="px-4 py-3">Tavsif</th>
              <th class="px-4 py-3 hidden md:table-cell">Sana</th>
              <th class="px-4 py-3 text-center">Status</th>
              <th class="px-4 py-3 text-center hidden lg:table-cell">Reyting</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in requests" :key="r.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer" @click="navigateTo('/cabinet/service-requests/new')">
              <td class="px-4 py-3 font-medium text-ink-900 dark:text-white">{{ r.number }}</td>
              <td class="px-4 py-3"><span class="badge badge-info text-xs">{{ r.category }}</span></td>
              <td class="px-4 py-3 text-ink-700 dark:text-ink-300 max-w-xs truncate">{{ r.description }}</td>
              <td class="px-4 py-3 text-ink-500 hidden md:table-cell">{{ r.date }}</td>
              <td class="px-4 py-3 text-center"><span class="badge text-xs" :class="statusClass(r.status)">{{ statusLabel(r.status) }}</span></td>
              <td class="px-4 py-3 text-center hidden lg:table-cell">
                <span v-if="r.rating" class="text-amber-400">{{ '★'.repeat(r.rating) }}</span>
                <span v-else class="text-ink-300">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const requests = [
  { id: '1', number: 'SR-0042', category: 'Sanitariya', description: 'Hojatxona jihozi ishlamaydi', date: '11 Avg 2026', status: 'IN_PROGRESS', rating: null as number | null },
  { id: '2', number: 'SR-0038', category: 'Elektr', description: 'Ofisda chiroq yoqilmaydi', date: '08 Avg 2026', status: 'COMPLETED', rating: 5 },
  { id: '3', number: 'SR-0035', category: 'Konditsioner', description: 'Konditsioner sovutmayapti', date: '03 Avg 2026', status: 'COMPLETED', rating: 4 },
  { id: '4', number: 'SR-0031', category: 'Eshik-qulf', description: 'Kirish eshigi qulfi ishlamaydi', date: '28 Iyl 2026', status: 'COMPLETED', rating: 5 },
  { id: '5', number: 'SR-0028', category: 'Sanitariya', description: 'Suv quvurida nuqson', date: '22 Iyl 2026', status: 'CANCELLED', rating: null as number | null },
]

const activeCount = requests.filter(r => r.status === 'IN_PROGRESS').length
const resolvedCount = requests.filter(r => r.status === 'COMPLETED').length
const ratedRequests = requests.filter(r => r.rating !== null)
const avgRating = ratedRequests.length > 0 ? (ratedRequests.reduce((sum, r) => sum + (r.rating || 0), 0) / ratedRequests.length).toFixed(1) : '—'

function statusLabel(s: string) {
  return { PENDING: 'Kutilmoqda', ASSIGNED: 'Tayinlandi', IN_PROGRESS: 'Ishlanmoqda', COMPLETED: 'Yechilgan', CANCELLED: 'Bekor qilingan' }[s] || s
}
function statusClass(s: string) {
  return { PENDING: 'badge-secondary', ASSIGNED: 'badge-info', IN_PROGRESS: 'badge-warning', COMPLETED: 'badge-success', CANCELLED: 'badge-error' }[s] || 'badge-secondary'
}
</script>
