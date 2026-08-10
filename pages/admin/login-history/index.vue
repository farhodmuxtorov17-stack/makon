<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Kirish-chiqish tarixi</h1>
      <p class="text-ink-500 text-sm mt-1">Faqat ko\'rish uchun — yozuvlar tahrirlanmaydi</p>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-3">
      <input v-model="search" type="text" placeholder="Foydalanuvchi qidirish..." class="input w-auto flex-1 min-w-[200px]" />
      <select v-model="eventFilter" class="input w-auto">
        <option value="">Barcha hodisalar</option>
        <option value="LOGIN">Kirish</option>
        <option value="LOGOUT">Chiqish</option>
        <option value="ERI_LOGIN">ERI kirish</option>
        <option value="BLOCK">Blok</option>
        <option value="FAILED">Muvaffaqiyatsiz</option>
      </select>
      <input type="date" v-model="dateFilter" class="input w-auto" />
      <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
    </div>

    <!-- History table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">Vaqt</th>
              <th class="px-4 py-3">Foydalanuvchi</th>
              <th class="px-4 py-3">Hodisa</th>
              <th class="px-4 py-3">IP manzil</th>
              <th class="px-4 py-3">Qurilma</th>
              <th class="px-4 py-3">Brauzer</th>
              <th class="px-4 py-3">Natija</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in filteredLogs" :key="log.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3">
              <td class="px-4 py-3 text-ink-500 text-xs whitespace-nowrap">{{ formatDateTime(log.time) }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full bg-brand-500/10 flex items-center justify-center text-xs font-bold text-brand-500">{{ log.user.charAt(0) }}</div>
                  <span class="text-ink-900 dark:text-white">{{ log.user }}</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <span class="badge text-xs" :class="eventBadge(log.event)">{{ eventLabel(log.event) }}</span>
              </td>
              <td class="px-4 py-3 text-ink-500 font-mono text-xs">{{ log.ip }}</td>
              <td class="px-4 py-3 text-ink-500 text-xs">{{ log.device }}</td>
              <td class="px-4 py-3 text-ink-500 text-xs">{{ log.browser }}</td>
              <td class="px-4 py-3">
                <span class="text-xs font-medium" :class="log.success ? 'text-emerald-500' : 'text-red-500'">
                  {{ log.success ? 'Muvaffaqiyatli' : 'Rad etilgan' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 flex items-center justify-between text-xs text-ink-500">
        <span>{{ filteredLogs.length }} yozuv</span>
        <div class="flex items-center gap-2">
          <button class="btn btn-ghost btn-sm" disabled>Oldingi</button>
          <span>1 / 1</span>
          <button class="btn btn-ghost btn-sm" disabled>Keyingi</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const search = ref('')
const eventFilter = ref('')
const dateFilter = ref('')

const logs = ref([
  { id: '1', time: new Date(Date.now() - 1800000), user: 'Bosh Admin', event: 'LOGIN', ip: '213.230.99.12', device: 'Desktop', browser: 'Chrome 127', success: true },
  { id: '2', time: new Date(Date.now() - 5400000), user: 'Dilnoza Karimova', event: 'LOGIN', ip: '213.230.99.45', device: 'Laptop', browser: 'Firefox 129', success: true },
  { id: '3', time: new Date(Date.now() - 9000000), user: 'Aziz Toshmatov', event: 'ERI_LOGIN', ip: '91.212.89.34', device: 'Desktop', browser: 'Chrome 127', success: true },
  { id: '4', time: new Date(Date.now() - 12600000), user: 'unknown', event: 'FAILED', ip: '45.12.33.88', device: 'Mobile', browser: 'Safari 17', success: false },
  { id: '5', time: new Date(Date.now() - 16200000), user: 'Sardor Yusupov', event: 'LOGIN', ip: '84.54.74.10', device: 'Desktop', browser: 'Edge 127', success: true },
  { id: '6', time: new Date(Date.now() - 19800000), user: 'Dilnoza Karimova', event: 'LOGOUT', ip: '213.230.99.45', device: 'Laptop', browser: 'Firefox 129', success: true },
  { id: '7', time: new Date(Date.now() - 23400000), user: 'unregistered', event: 'BLOCK', ip: '45.12.33.88', device: 'Mobile', browser: 'Safari 17', success: false },
  { id: '8', time: new Date(Date.now() - 27000000), user: 'Bosh Admin', event: 'LOGIN', ip: '213.230.99.12', device: 'Desktop', browser: 'Chrome 127', success: true },
  { id: '9', time: new Date(Date.now() - 86400000), user: 'Aziz Toshmatov', event: 'LOGIN', ip: '91.212.89.34', device: 'Desktop', browser: 'Chrome 127', success: true },
  { id: '10', time: new Date(Date.now() - 172800000), user: 'Sardor Yusupov', event: 'ERI_LOGIN', ip: '84.54.74.10', device: 'Tablet', browser: 'Chrome 127', success: true },
])

const filteredLogs = computed(() => {
  let result = logs.value
  if (search.value) result = result.filter(l => l.user.toLowerCase().includes(search.value.toLowerCase()))
  if (eventFilter.value) result = result.filter(l => l.event === eventFilter.value)
  return result
})

function eventBadge(e: string) { return { LOGIN: 'badge-success', LOGOUT: 'badge-neutral', ERI_LOGIN: 'badge-brand', BLOCK: 'badge-danger', FAILED: 'badge-danger' }[e] || 'badge-neutral' }
function eventLabel(e: string) { return { LOGIN: 'Kirish', LOGOUT: 'Chiqish', ERI_LOGIN: 'ERI kirish', BLOCK: 'Bloklandi', FAILED: 'Muvaffaqiyatsiz' }[e] || e }
function formatDateTime(d: Date) { return new Date(d).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }
</script>
