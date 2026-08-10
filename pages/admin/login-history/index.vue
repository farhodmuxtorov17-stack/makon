<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Kirish-chiqish tarixi</h1>
        <p class="text-ink-500 text-sm mt-1">Faqat ko'rish uchun — yozuvlar tahrirlanmaydi</p>
      </div>
      <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><LogIn :size="16" class="text-emerald-500" /></div>
          <span class="text-xs text-ink-500">Muvaffaqiyatli</span>
        </div>
        <div class="text-xl font-bold text-emerald-500">{{ successCount }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"><XCircle :size="16" class="text-red-500" /></div>
          <span class="text-xs text-ink-500">Muvaffaqiyatsiz</span>
        </div>
        <div class="text-xl font-bold text-red-500">{{ failedCount }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><ShieldCheck :size="16" class="text-purple-500" /></div>
          <span class="text-xs text-ink-500">ERI kirish</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ eriCount }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><Ban :size="16" class="text-amber-500" /></div>
          <span class="text-xs text-ink-500">Bloklangan</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ blockedCount }}</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-2">
      <div class="relative flex-1 min-w-[200px]">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input v-model="search" type="text" placeholder="Foydalanuvchi qidirish..." class="w-full text-sm border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
      </div>
      <select v-model="eventFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
        <option value="">Barcha hodisalar</option>
        <option value="LOGIN">Kirish</option>
        <option value="LOGOUT">Chiqish</option>
        <option value="ERI_LOGIN">ERI kirish</option>
        <option value="FAILED">Muvaffaqiyatsiz</option>
        <option value="BLOCK">Blok</option>
      </select>
      <input type="date" v-model="dateFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-4 py-3">Foydalanuvchi</th>
              <th class="text-left font-medium px-4 py-3 hidden sm:table-cell">Hodisa</th>
              <th class="text-left font-medium px-4 py-3 hidden md:table-cell">IP manzil</th>
              <th class="text-left font-medium px-4 py-3 hidden md:table-cell">Device</th>
              <th class="text-left font-medium px-4 py-3 hidden lg:table-cell">Brauzer</th>
              <th class="text-right font-medium px-4 py-3">Vaqt</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in filteredEntries" :key="entry.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full flex-shrink-0" :class="eventDot(entry.event)"></span>
                  <div>
                    <div class="font-medium text-ink-900 dark:text-white text-sm">{{ entry.user }}</div>
                    <div class="text-xs text-ink-500">{{ entry.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 hidden sm:table-cell">
                <span class="badge text-[10px]" :class="eventBadge(entry.event)">{{ eventLabel(entry.event) }}</span>
              </td>
              <td class="px-4 py-3 hidden md:table-cell font-mono text-xs text-ink-500">{{ entry.ip }}</td>
              <td class="px-4 py-3 hidden md:table-cell text-xs text-ink-500">{{ entry.device }}</td>
              <td class="px-4 py-3 hidden lg:table-cell text-xs text-ink-500">{{ entry.browser }}</td>
              <td class="px-4 py-3 text-right text-xs text-ink-500 font-mono">{{ entry.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, Search, LogIn, XCircle, ShieldCheck, Ban } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const search = ref('')
const eventFilter = ref('')
const dateFilter = ref('')

const entries = [
  { id: '1', user: 'Alisher Qodirov', email: 'a.qodirov@makon.uz', event: 'LOGIN', ip: '85.17.12.34', device: 'Desktop', browser: 'Chrome 126', time: '14:32:15' },
  { id: '2', user: 'Dilnoza Karimova', email: 'd.karimova@makon.uz', event: 'LOGIN', ip: '85.17.12.35', device: 'Desktop', browser: 'Firefox 125', time: '14:28:42' },
  { id: '3', user: 'Sardor Yusupov', email: 's.yusupov@abc.uz', event: 'ERI_LOGIN', ip: '94.158.21.10', device: 'Desktop', browser: 'Chrome 126', time: '14:15:08' },
  { id: '4', user: 'Unknown', email: 'admin@makon.uz', event: 'FAILED', ip: '45.12.33.88', device: 'Desktop', browser: 'Chrome 126', time: '13:55:30' },
  { id: '5', user: 'Alisher Qodirov', email: 'a.qodirov@makon.uz', event: 'LOGIN', ip: '85.17.12.34', device: 'Mobile', browser: 'Safari 17', time: '13:30:12' },
  { id: '6', user: 'Ravshan Keldiyev', email: 'r.keldiyev@makon.uz', event: 'LOGIN', ip: '85.17.12.36', device: 'Desktop', browser: 'Chrome 126', time: '12:50:45' },
  { id: '7', user: 'Unknown', email: 'test@test.uz', event: 'BLOCK', ip: '45.12.33.88', device: 'Desktop', browser: 'Chrome 126', time: '12:15:22' },
  { id: '8', user: 'Jasur Tursunov', email: 'j.tursunov@makon.uz', event: 'LOGIN', ip: '85.17.12.37', device: 'Desktop', browser: 'Edge 126', time: '12:00:18' },
  { id: '9', user: 'Kamola Rashidova', email: 'k.rashidova@makon.uz', event: 'ERI_LOGIN', ip: '85.17.12.38', device: 'Desktop', browser: 'Chrome 126', time: '11:30:55' },
  { id: '10', user: 'Alisher Qodirov', email: 'a.qodirov@makon.uz', event: 'LOGOUT', ip: '85.17.12.34', device: 'Desktop', browser: 'Chrome 126', time: '10:45:30' },
  { id: '11', user: 'Otabek Yo\'ldoshev', email: 'o.yuldoshev@smart.uz', event: 'LOGIN', ip: '94.158.21.20', device: 'Mobile', browser: 'Chrome 126', time: '09:15:42' },
  { id: '12', user: 'Unknown', email: 'admin@makon.uz', event: 'FAILED', ip: '45.12.33.88', device: 'Desktop', browser: 'Chrome 126', time: '08:30:12' },
]

const successCount = computed(() => entries.filter(e => e.event === 'LOGIN' || e.event === 'ERI_LOGIN').length)
const failedCount = computed(() => entries.filter(e => e.event === 'FAILED').length)
const eriCount = computed(() => entries.filter(e => e.event === 'ERI_LOGIN').length)
const blockedCount = computed(() => entries.filter(e => e.event === 'BLOCK').length)

const filteredEntries = computed(() => {
  let r = [...entries]
  if (search.value) {
    const q = search.value.toLowerCase()
    r = r.filter(e => e.user.toLowerCase().includes(q) || e.email.toLowerCase().includes(q))
  }
  if (eventFilter.value) r = r.filter(e => e.event === eventFilter.value)
  return r
})

function eventDot(e: string) {
  return { LOGIN: 'bg-emerald-500', ERI_LOGIN: 'bg-purple-500', LOGOUT: 'bg-ink-400', FAILED: 'bg-red-500', BLOCK: 'bg-amber-500' }[e] || 'bg-ink-400'
}
function eventBadge(e: string) {
  return { LOGIN: 'badge-success', ERI_LOGIN: 'badge-brand', LOGOUT: 'badge-neutral', FAILED: 'badge-danger', BLOCK: 'badge-warning' }[e] || 'badge-neutral'
}
function eventLabel(e: string) {
  return { LOGIN: 'Kirish', ERI_LOGIN: 'ERI', LOGOUT: 'Chiqish', FAILED: 'Muvaffaqiyatsiz', BLOCK: 'Blok' }[e] || e
}
</script>
