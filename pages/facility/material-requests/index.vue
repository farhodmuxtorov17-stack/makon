<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Material so'rovlari</h1>
        <p class="text-ink-500 text-sm mt-1">Ishga materiallar talab qilish</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="16" /> Yangi so'rov</button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card p-4 flex items-center gap-3">
        <ClipboardList :size="18" class="text-brand-500" />
        <div><div class="text-sm font-semibold">{{ requests.length }}</div><div class="text-xs text-ink-500">Jami so'rovlar</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <Clock :size="18" class="text-amber-500" />
        <div><div class="text-sm font-semibold text-amber-500">{{ requests.filter(r => r.status === 'PENDING').length }}</div><div class="text-xs text-ink-500">Kutilmoqda</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <Package :size="18" class="text-brand-500" />
        <div><div class="text-sm font-semibold text-brand-500">{{ requests.filter(r => r.status === 'APPROVED').length }}</div><div class="text-xs text-ink-500">Tasdiqlangan</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <CheckCircle2 :size="18" class="text-emerald-500" />
        <div><div class="text-sm font-semibold text-emerald-500">{{ requests.filter(r => r.status === 'ISSUED').length }}</div><div class="text-xs text-ink-500">Berilgan</div></div>
      </div>
    </div>

    <!-- Requests table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">So'rov</th>
              <th class="px-4 py-3">Materiallar</th>
              <th class="px-4 py-3">Bino</th>
              <th class="px-4 py-3">Yuboruvchi</th>
              <th class="px-4 py-3 text-right">Summa</th>
              <th class="px-4 py-3 text-center">Status</th>
              <th class="px-4 py-3 text-right">Amal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in requests" :key="r.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3">
              <td class="px-4 py-3 font-mono text-xs text-ink-900 dark:text-white">{{ r.number }}</td>
              <td class="px-4 py-3">
                <div class="flex flex-wrap gap-1">
                  <span v-for="m in r.materials" :key="m.name" class="text-xs px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-ink-500">{{ m.name }} ×{{ m.qty }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-ink-500">{{ r.building }}</td>
              <td class="px-4 py-3 text-ink-500">{{ r.requester }}</td>
              <td class="px-4 py-3 text-right font-medium">{{ r.totalCost }}</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-xs" :class="reqBadge(r.status)">{{ reqLabel(r.status) }}</span>
              </td>
              <td class="px-4 py-3 text-right">
                <button v-if="r.status === 'PENDING'" @click="r.status = 'APPROVED'" class="btn btn-primary btn-sm">Tasdiq</button>
                <button v-if="r.status === 'APPROVED'" @click="r.status = 'ISSUED'" class="btn btn-success btn-sm">Berish</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, ClipboardList, Clock, Package, CheckCircle2 } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const requests = ref([
  { id: 'mr-1', number: 'MR-2026-001', materials: [{ name: 'Lampa LED', qty: 12 }, { name: 'Kabel', qty: 50 }], building: 'Tashkent City Tower', requester: 'Sardor Yusupov', totalCost: '850K so\'m', status: 'PENDING' },
  { id: 'mr-2', number: 'MR-2026-002', materials: [{ name: 'Kraska', qty: 5 }], building: 'Trillant Tower', requester: 'Aziz Toshmatov', totalCost: '900K so\'m', status: 'APPROVED' },
  { id: 'mr-3', number: 'MR-2026-003', materials: [{ name: 'Sement', qty: 20 }, { name: 'Gipsokarton', qty: 15 }], building: 'IT Park', requester: 'Sardor Yusupov', totalCost: '1.9M so\'m', status: 'PENDING' },
  { id: 'mr-4', number: 'MR-2026-004', materials: [{ name: 'Filtr suv', qty: 3 }], building: 'Tashkent City Tower', requester: 'Aziz Toshmatov', totalCost: '255K so\'m', status: 'ISSUED' },
])

function reqBadge(s: string) { return { PENDING: 'badge-warning', APPROVED: 'badge-brand', ISSUED: 'badge-success', REJECTED: 'badge-danger' }[s] || 'badge-neutral' }
function reqLabel(s: string) { return { PENDING: 'Kutilmoqda', APPROVED: 'Tasdiqlangan', ISSUED: 'Berilgan', REJECTED: 'Rad etilgan' }[s] || s }
</script>
