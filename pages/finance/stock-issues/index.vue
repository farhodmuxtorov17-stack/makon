<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Material berish va dalolatnomalar</h1>
      <p class="text-ink-500 text-sm mt-1">Tasdiqlangan so\'rovlar bo\'yicha ombordan material berish</p>
    </div>

    <!-- Pending issues -->
    <div class="card-premium p-6">
      <h3 class="font-semibold dark:text-white mb-4">Berishga tayyor so\'rovlar</h3>
      <div class="space-y-3">
        <div v-for="req in approvedRequests" :key="req.id" class="border border-black/5 dark:border-white/5 rounded-2xl p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background: rgba(16,185,129,0.1); color: #10b981;">
              <CheckCircle2 :size="20" />
            </div>
              <div>
                <div class="text-sm font-medium">{{ req.number }} · {{ req.workOrder }}</div>
                <div class="text-xs text-ink-500">{{ req.building }} · Tasdiqlangan: {{ req.approvedDate }}</div>
              </div>
            </div>
            <span class="text-sm font-medium">{{ req.totalAmount }}</span>
          </div>
          <!-- Items -->
          <div class="space-y-1 mb-3">
            <div v-for="item in req.items" :key="item.sku" class="flex items-center justify-between text-xs p-2 rounded-lg bg-black/5 dark:bg-white/5">
              <span>{{ item.name }} ({{ item.sku }})</span>
              <div class="flex items-center gap-3">
                <span class="text-ink-500">Zaxira: {{ item.stock }}</span>
                <span class="font-medium">{{ item.qty }} {{ item.unit }}</span>
                <span :class="item.stock >= item.qty ? 'text-emerald-500' : 'text-red-500'">
                  {{ item.stock >= item.qty ? 'Yetarli' : 'Yetarli emas' }}
                </span>
              </div>
            </div>
          </div>
          <!-- Issue form -->
          <div class="grid grid-cols-3 gap-3 items-end">
            <div>
              <label class="label text-xs">Oluvchi</label>
              <select class="input">
                <option>Sardor Yusupov</option>
                <option>Aziz Toshmatov</option>
              </select>
            </div>
            <div>
              <label class="label text-xs">Dalolatnoma raqami</label>
              <input type="text" class="input" placeholder="AKT-2026-..." />
            </div>
            <div class="flex gap-2">
              <button class="btn btn-primary flex-1"><Send :size="14" /> Berish</button>
              <button class="btn btn-secondary">ERI tasdiq</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Issue history -->
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-black/5 dark:border-white/5">
        <h3 class="font-semibold dark:text-white">Berish tarixi</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">Dalolatnoma</th>
              <th class="px-4 py-3">So\'rov</th>
              <th class="px-4 py-3">Oluvchi</th>
              <th class="px-4 py-3 text-right">Itemlar</th>
              <th class="px-4 py-3 text-right">Summa</th>
              <th class="px-4 py-3">Sana</th>
              <th class="px-4 py-3 text-center">ERI</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="issue in issues" :key="issue.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3 cursor-pointer" @click="navigateTo('/finance/stock-issues')">
              <td class="px-4 py-3 font-medium">{{ issue.actNumber }}</td>
              <td class="px-4 py-3 text-ink-500">{{ issue.request }}</td>
              <td class="px-4 py-3">{{ issue.recipient }}</td>
              <td class="px-4 py-3 text-right">{{ issue.itemCount }}</td>
              <td class="px-4 py-3 text-right font-medium">{{ issue.amount }}</td>
              <td class="px-4 py-3 text-ink-500 text-xs">{{ issue.date }}</td>
              <td class="px-4 py-3 text-center">
                <span v-if="issue.eriSigned" class="badge badge-success text-xs">Imzolangan</span>
                <span v-else class="badge badge-warning text-xs">Kutilmoqda</span>
              </td>
              <td class="px-4 py-3 text-right">
                <button class="btn btn-ghost btn-sm"><Download :size="14" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KpiCard from '~/components/KpiCard.vue'
import { CheckCircle2, Send, Download } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const approvedRequests = ref([
  {
    id: 'mr1', number: 'MR-2026-008', workOrder: 'WO-2026-012', building: 'Tashkent City', approvedDate: '2 soat oldin', totalAmount: '2,400,000 so\'m',
    items: [
      { sku: 'EL-001', name: 'Kabel 3x2.5', stock: 450, qty: 50, unit: 'm' },
      { sku: 'EL-002', name: 'Rozetka', stock: 32, qty: 8, unit: 'dona' },
      { sku: 'EL-003', name: 'Avtomat 16A', stock: 15, qty: 3, unit: 'dona' },
    ]
  },
  {
    id: 'mr2', number: 'MR-2026-009', workOrder: 'WO-2026-015', building: 'IT Park', approvedDate: '5 soat oldin', totalAmount: '850,000 so\'m',
    items: [
      { sku: 'PL-001', name: 'Truba PPR 25', stock: 120, qty: 20, unit: 'm' },
      { sku: 'PL-002', name: 'Fitil 25', stock: 48, qty: 12, unit: 'dona' },
    ]
  },
])

const issues = ref([
  { id: 'is1', actNumber: 'AKT-2026-012', request: 'MR-2026-006', recipient: 'Sardor Yusupov', itemCount: 5, amount: '1,200,000 so\'m', date: '1 kun oldin', eriSigned: true },
  { id: 'is2', actNumber: 'AKT-2026-011', request: 'MR-2026-005', recipient: 'Aziz Toshmatov', itemCount: 3, amount: '650,000 so\'m', date: '2 kun oldin', eriSigned: true },
  { id: 'is3', actNumber: 'AKT-2026-010', request: 'MR-2026-004', recipient: 'Sardor Yusupov', itemCount: 8, amount: '3,200,000 so\'m', date: '3 kun oldin', eriSigned: false },
  { id: 'is4', actNumber: 'AKT-2026-009', request: 'MR-2026-003', recipient: 'Aziz Toshmatov', itemCount: 2, amount: '450,000 so\'m', date: '5 kun oldin', eriSigned: true },
])
</script>
