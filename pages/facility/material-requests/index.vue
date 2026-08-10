<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Material so'rovlari</h1>
        <p class="text-ink-500 text-sm mt-1">{{ requests.length }} ta so'rov · {{ pendingCount }} kutilmoqda · {{ approvedCount }} tasdiqlangan</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi so'rov</button>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center"><ClipboardList :size="16" class="text-indigo-500" /></div>
          <span class="text-xs text-ink-500">Jami</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ requests.length }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><Clock :size="16" class="text-amber-500" /></div>
          <span class="text-xs text-ink-500">Kutilmoqda</span>
        </div>
        <div class="text-xl font-bold text-amber-500">{{ pendingCount }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><CheckCircle2 :size="16" class="text-emerald-500" /></div>
          <span class="text-xs text-ink-500">Tasdiqlangan</span>
        </div>
        <div class="text-xl font-bold text-emerald-500">{{ approvedCount }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><Package :size="16" class="text-blue-500" /></div>
          <span class="text-xs text-ink-500">Yetkazilgan</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ deliveredCount }}</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-2">
      <div class="relative flex-1 min-w-[200px]">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input v-model="search" type="text" placeholder="So'rov nomi, work order..." class="w-full text-sm border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
      </div>
      <select v-model="statusFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
        <option value="">Barcha statuslar</option>
        <option value="PENDING">Kutilmoqda</option>
        <option value="APPROVED">Tasdiqlangan</option>
        <option value="DELIVERED">Yetkazilgan</option>
        <option value="REJECTED">Rad etilgan</option>
      </select>
    </div>

    <!-- Requests -->
    <div class="space-y-3">
      <div v-for="r in filteredRequests" :key="r.id" class="card p-5 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between flex-wrap gap-3 mb-3">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" :class="statusIcon(r.status)">
              <ClipboardList :size="18" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-ink-900 dark:text-white text-sm font-mono">{{ r.number }}</span>
                <span class="badge text-[10px]" :class="statusBadge(r.status)">{{ statusLabel(r.status) }}</span>
              </div>
              <div class="text-xs text-ink-500 mt-0.5">{{ r.workOrder }} · {{ r.buildingName }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-ink-900 dark:text-white">{{ formatMoney(r.totalCost) }}</div>
            <div class="text-xs text-ink-500">{{ r.date }}</div>
          </div>
        </div>

        <!-- Materials list -->
        <div class="rounded-xl bg-black/5 dark:bg-white/5 p-3 mb-3">
          <div class="space-y-1.5">
            <div v-for="m in r.materials" :key="m.name" class="flex items-center justify-between text-xs">
              <span class="text-ink-700 dark:text-ink-300">{{ m.name }}</span>
              <span class="text-ink-500 font-mono">{{ m.qty }} {{ m.unit }} × {{ formatShort(m.price) }} = <span class="font-medium text-ink-900 dark:text-white">{{ formatShort(m.qty * m.price) }}</span></span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5">
          <div class="flex items-center gap-2 text-xs text-ink-500">
            <Wrench :size="12" /> {{ r.category }}
            <span class="text-ink-300">·</span>
            <User :size="12" /> {{ r.requestedBy }}
          </div>
          <div class="flex items-center gap-1">
            <button v-if="r.status === 'PENDING'" class="btn btn-primary btn-sm text-xs"><Check :size="12" /> Tasdiqlash</button>
            <button v-if="r.status === 'PENDING'" class="btn btn-ghost btn-sm text-xs text-red-500"><X :size="12" /> Rad</button>
            <button v-if="r.status === 'APPROVED'" class="btn btn-secondary btn-sm text-xs"><Package :size="12" /> Yetkazish</button>
            <button class="btn btn-ghost btn-sm text-xs"><Eye :size="12" /></button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredRequests.length === 0" class="card p-12 text-center">
      <ClipboardList :size="32" class="text-ink-300 mx-auto mb-2" />
      <p class="text-ink-500 text-sm">So'rovlar topilmadi</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, ClipboardList, Clock, CheckCircle2, Package, Check, X, Eye, Wrench, User } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const search = ref('')
const statusFilter = ref('')

const requests = [
  { id: '1', number: 'MR-2026-001', workOrder: 'WO-2026-038', buildingName: 'Tashkent City', category: 'Elektr', requestedBy: 'Ravshan K.', date: '10 Avg', status: 'PENDING', totalCost: 1850000,
    materials: [{ name: 'Kabel VGng 3×1.5', qty: 50, unit: 'm', price: 18000 }, { name: 'Avtomat 16A', qty: 4, unit: 'dona', price: 35000 }, { name: 'Rozetka', qty: 6, unit: 'dona', price: 25000 }] },
  { id: '2', number: 'MR-2026-002', workOrder: 'WO-2026-035', buildingName: 'Trillant Tower', category: 'Santexnika', requestedBy: 'Jasur T.', date: '09 Avg', status: 'APPROVED', totalCost: 4200000,
    materials: [{ name: 'Truba PP 25mm', qty: 30, unit: 'm', price: 35000 }, { name: 'Valve 25mm', qty: 4, unit: 'dona', price: 45000 }, { name: 'Fiting to\'plam', qty: 1, unit: 'kompl', price: 2850000 }] },
  { id: '3', number: 'MR-2026-003', workOrder: 'WO-2026-031', buildingName: 'IT Park', category: 'Konditsioner', requestedBy: 'Kamola R.', date: '08 Avg', status: 'DELIVERED', totalCost: 8900000,
    materials: [{ name: 'Konditsioner 24000 BTU', qty: 2, unit: 'dona', price: 4200000 }, { name: 'Freon R410A', qty: 2, unit: 'kg', price: 250000 }] },
  { id: '4', number: 'MR-2026-004', workOrder: 'WO-2026-029', buildingName: 'Piramit', category: 'Elektr', requestedBy: 'Sardor Y.', date: '07 Avg', status: 'PENDING', totalCost: 1200000,
    materials: [{ name: 'Lampa LED 36W', qty: 10, unit: 'dona', price: 85000 }, { name: 'Datchik harakat', qty: 5, unit: 'dona', price: 70000 }] },
  { id: '5', number: 'MR-2026-005', workOrder: 'WO-2026-026', buildingName: 'Tashkent City', category: 'Eshik', requestedBy: 'Ravshan K.', date: '05 Avg', status: 'REJECTED', totalCost: 3200000,
    materials: [{ name: 'Eshik metall 900mm', qty: 2, unit: 'dona', price: 1600000 }] },
  { id: '6', number: 'MR-2026-006', workOrder: 'WO-2026-040', buildingName: 'Trillant Tower', category: 'Lift', requestedBy: 'Jasur T.', date: '10 Avg', status: 'APPROVED', totalCost: 5500000,
    materials: [{ name: 'Kabel 4×16', qty: 40, unit: 'm', price: 45000 }, { name: 'Tormoz kolodka', qty: 8, unit: 'dona', price: 85000 }, { name: 'Lift panel', qty: 1, unit: 'dona', price: 2380000 }] },
]

const pendingCount = computed(() => requests.filter(r => r.status === 'PENDING').length)
const approvedCount = computed(() => requests.filter(r => r.status === 'APPROVED').length)
const deliveredCount = computed(() => requests.filter(r => r.status === 'DELIVERED').length)

const filteredRequests = computed(() => {
  let r = [...requests]
  if (search.value) {
    const q = search.value.toLowerCase()
    r = r.filter(x => x.number.toLowerCase().includes(q) || x.workOrder.toLowerCase().includes(q) || x.buildingName.toLowerCase().includes(q))
  }
  if (statusFilter.value) r = r.filter(x => x.status === statusFilter.value)
  return r
})

function formatMoney(v: number) { return new Intl.NumberFormat('ru-RU').format(v) }
function formatShort(v: number) { if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M'; if (v >= 1_000) return (v / 1_000).toFixed(0) + 'K'; return String(v) }
function statusLabel(s: string) { return { PENDING: 'Kutilmoqda', APPROVED: 'Tasdiqlangan', DELIVERED: 'Yetkazilgan', REJECTED: 'Rad etilgan' }[s] || s }
function statusBadge(s: string) { return { PENDING: 'badge-warning', APPROVED: 'badge-success', DELIVERED: 'badge-brand', REJECTED: 'badge-danger' }[s] || 'badge-neutral' }
function statusIcon(s: string) { return { PENDING: 'bg-amber-500/10 text-amber-500', APPROVED: 'bg-emerald-500/10 text-emerald-500', DELIVERED: 'bg-blue-500/10 text-blue-500', REJECTED: 'bg-red-500/10 text-red-500' }[s] || 'bg-ink-500/10 text-ink-500' }
</script>
