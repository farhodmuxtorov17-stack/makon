<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">Kirish tarixi</div>
      <h1 class="page-title">Kirish-chiqish tarixi</h1>
        <p class="text-ink-500 text-sm mt-1">Faqat ko'rish uchun — yozuvlar tahrirlanmaydi</p>
      </div>
      <button class="btn btn-secondary btn-sm" @click="() => {}"><Download :size="14" /> Eksport</button>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--emerald">
        <div class="kpi-strip__icon"><CheckCircle :size="34" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ successCount }}</div>
          <div class="dash-kpi__label">Muvaffaqiyatli</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--rose">
        <div class="kpi-strip__icon"><CreditCard :size="34" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ failedCount }}</div>
          <div class="dash-kpi__label">Muvaffaqiyatsiz</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--violet">
        <div class="kpi-strip__icon"><FileSignature :size="34" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ eriCount }}</div>
          <div class="dash-kpi__label">Raqamli kirish</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="kpi-strip__icon"><AlertCircle :size="34" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ blockedCount }}</div>
          <div class="dash-kpi__label">Bloklangan</div>
        </div>
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
        <option value="DIGITAL_LOGIN">Raqamli kirish</option>
        <option value="FAILED">Muvaffaqiyatsiz</option>
        <option value="BLOCK">Blok</option>
      </select>
      <input type="date" v-model="dateFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
    </div>

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
import { Download, Search, LogIn, XCircle, ShieldCheck, Ban , AlertCircle, CheckCircle, CreditCard, FileSignature} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'ADMIN'],  layout: 'admin', middleware: 'role' })

const makonStore = useMakonStore()
const search = ref('')
const eventFilter = ref('')
const dateFilter = ref('')

const entries = computed(() => makonStore.loginHistory)

const successCount = computed(() => entries.value.filter(e => e.event === 'LOGIN' || e.event === 'DIGITAL_LOGIN').length)
const failedCount = computed(() => entries.value.filter(e => e.event === 'FAILED').length)
const eriCount = computed(() => entries.value.filter(e => e.event === 'DIGITAL_LOGIN').length)
const blockedCount = computed(() => entries.value.filter(e => e.event === 'BLOCK').length)

const filteredEntries = computed(() => {
  let r = [...entries.value]
  if (search.value) {
    const q = search.value.toLowerCase()
    r = r.filter(e => e.user.toLowerCase().includes(q) || e.email.toLowerCase().includes(q))
  }
  if (eventFilter.value) r = r.filter(e => e.event === eventFilter.value)
  return r
})

function eventDot(e: string) {
  return { LOGIN: 'bg-emerald-500', DIGITAL_LOGIN: 'bg-purple-500', LOGOUT: 'bg-ink-400', FAILED: 'bg-red-500', BLOCK: 'bg-amber-500' }[e] || 'bg-ink-400'
}
function eventBadge(e: string) {
  return { LOGIN: 'badge-success', DIGITAL_LOGIN: 'badge-brand', LOGOUT: 'badge-neutral', FAILED: 'badge-danger', BLOCK: 'badge-warning' }[e] || 'badge-neutral'
}
function eventLabel(e: string) {
  return { LOGIN: 'Kirish', DIGITAL_LOGIN: 'Imzo', LOGOUT: 'Chiqish', FAILED: 'Muvaffaqiyatsiz', BLOCK: 'Blok' }[e] || e
}
</script>
<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 12px; padding: 14px 16px;
  background: var(--card-bg, #fff); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px; position: relative; overflow: hidden; flex-wrap: wrap;
}
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--rose::before { background: #f43f5e; }
.kpi-strip--violet::before { background: #8b5cf6; }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); }
.kpi-strip--rose .kpi-strip__icon { background: rgba(244,63,94,0.1); }
.kpi-strip--violet .kpi-strip__icon { background: rgba(139,92,246,0.1); }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; }
.dash-kpi__label { font-size: 11px; color: var(--ink-500); margin-top: 3px; font-weight: 500; }
</style>