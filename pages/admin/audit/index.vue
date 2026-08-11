<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Audit jurnali</h1>
        <p class="text-ink-500 text-sm mt-1">{{ entries.length }} ta yozuv · So'nggi 24 soat</p>
      </div>
      <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
    </div>

    <!-- Filter -->
    <div class="flex flex-wrap items-center gap-3">
      <div class="relative">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input v-model="search" type="text" placeholder="Amal yoki foydalanuvchi..." class="w-64 text-sm border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
      </div>
      <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5">
        <button v-for="t in typeTabs" :key="t.value" @click="typeFilter = t.value" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all" :class="typeFilter === t.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500'">
          {{ t.label }}
        </button>
      </div>
    </div>

    <!-- Audit timeline -->
    <div class="card-premium p-5">
      <div class="audit-timeline">
        <div v-for="entry in filteredEntries" :key="entry.id" class="audit-timeline__item">
          <div class="audit-timeline__marker" :style="{ background: actionColor(entry.type) + '15', color: actionColor(entry.type) }">
            <component :is="actionIcon(entry.type)" :size="15" />
          </div>
          <div class="audit-timeline__body">
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="text-sm text-ink-900 dark:text-white">
                  <span class="font-medium">{{ entry.user }}</span>
                  <span class="text-ink-500"> · </span>
                  <span class="font-mono text-xs">{{ entry.action }}</span>
                </div>
                <div class="text-xs text-ink-500 mt-0.5">{{ entry.description }}</div>
              </div>
              <div class="text-right flex-shrink-0">
                <div class="text-xs text-ink-400 font-mono">{{ entry.time }}</div>
                <div class="text-[10px] text-ink-400 mt-0.5">{{ entry.ip }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, Search, FileText, Edit3, Trash2, CheckCircle, AlertCircle, LogIn, LogOut, FileSignature, Building2, UserPlus } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const search = ref('')
const typeFilter = ref('all')

const typeTabs = [
  { value: 'all', label: 'Barchasi' },
  { value: 'CREATE', label: 'Yaratish' },
  { value: 'UPDATE', label: "Tahrir" },
  { value: 'DELETE', label: "O'chirish" },
  { value: 'AUTH', label: 'Kirish' },
  { value: 'APPROVE', label: 'Tasdiqlash' },
]

const entries = [
  { id: '1', user: 'Alisher Qodirov', action: 'CONTRACT.SIGN', type: 'APPROVE', description: 'CTR-2026-010 shartnomasini ERI orqali imzoladi', time: '14:32', ip: '85.17.12.34', },
  { id: '2', user: 'Dilnoza Karimova', action: 'INVOICE.CREATE', type: 'CREATE', description: 'INV-2026-052 invoysini yaratdi (25.0M so\'m)', time: '14:28', ip: '85.17.12.35' },
  { id: '3', user: 'Sardor Yusupov', action: 'BUILDING.UPDATE', type: 'UPDATE', description: 'Tashkent City binosi ma\'lumotlarini yangiladi', time: '14:15', ip: '94.158.21.10' },
  { id: '4', user: 'Ravshan Keldiyev', action: 'WORK_ORDER.CREATE', type: 'CREATE', description: 'WO-2026-038 work order yaratdi (A-301 konditsioner)', time: '13:45', ip: '85.17.12.36' },
  { id: '5', user: 'Alisher Qodirov', action: 'USER.LOGIN', type: 'AUTH', description: 'Tizimga kirdi', time: '13:30', ip: '85.17.12.34' },
  { id: '6', user: 'Dilnoza Karimova', action: 'INVOICE.APPROVE', type: 'APPROVE', description: 'INV-2026-051 invoysini tasdiqladi (21.0M so\'m)', time: '12:50', ip: '85.17.12.35' },
  { id: '7', user: 'Jasur Tursunov', action: 'WORK_ORDER.UPDATE', type: 'UPDATE', description: 'WO-2026-035 statusini IN_PROGRESS ga o\'zgartirdi', time: '12:15', ip: '85.17.12.37' },
  { id: '8', user: 'Kamola Rashidova', action: 'USER.INVITE', type: 'CREATE', description: 'Nodira Azizovani BUILDING_MANAGER rolida taklif qildi', time: '11:30', ip: '85.17.12.38' },
  { id: '9', user: 'Alisher Qodirov', action: 'BUILDING.CREATE', type: 'CREATE', description: 'Savdo Markaz binosini qo\'shdi', time: '10:45', ip: '85.17.12.34' },
  { id: '10', user: 'Dilnoza Karimova', action: 'CONTRACT.VIEW', type: 'APPROVE', description: 'CTR-2026-002 shartnomasini ko\'rdi', time: '10:20', ip: '85.17.12.35' },
  { id: '11', user: 'Otabek Yo\'ldoshev', action: 'USER.LOGIN', type: 'AUTH', description: 'Tizimga kirdi', time: '09:15', ip: '94.158.21.20' },
  { id: '12', user: 'Ravshan Keldiyev', action: 'METER.READ', type: 'UPDATE', description: 'EL-001 hisoblagich ko\'rsatkichini kiritdi (15420 kWh)', time: '09:00', ip: '85.17.12.36' },
]

const filteredEntries = computed(() => {
  let result = [...entries]
  if (typeFilter.value !== 'all') result = result.filter(e => e.type === typeFilter.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(e => e.user.toLowerCase().includes(q) || e.action.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
  }
  return result
})

function actionColor(type: string) {
  return { CREATE: '#10b981', UPDATE: '#6366f1', DELETE: '#ef4444', AUTH: '#3b82f6', APPROVE: '#8b5cf6' }[type] || '#71717a'
}
function actionIcon(type: string) {
  return { CREATE: FileText, UPDATE: Edit3, DELETE: Trash2, AUTH: LogIn, APPROVE: CheckCircle }[type] || AlertCircle
}
</script>

<style scoped>
.audit-timeline { display: flex; flex-direction: column; gap: 0; }
.audit-timeline__item { display: flex; gap: 12px; padding-bottom: 16px; position: relative; }
.audit-timeline__item:not(:last-child)::before { content: ''; position: absolute; left: 16px; top: 32px; bottom: 0; width: 2px; background: rgba(0,0,0,0.05); }
.dark .audit-timeline__item:not(:last-child)::before { background: rgba(255,255,255,0.05); }
.audit-timeline__marker { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index: 1; }
.audit-timeline__body { flex: 1; min-width: 0; }
</style>
