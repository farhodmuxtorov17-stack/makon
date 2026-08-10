<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Bino Dashboard</h1>
        <p class="text-ink-500 text-sm mt-1">Tashkent City · 420 unit · 12 qavat</p>
      </div>
      <select class="input w-auto">
        <option>Tashkent City</option>
        <option>Trillent Tower</option>
        <option>IT Park</option>
        <option>Piramit</option>
      </select>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div class="card p-4">
        <div class="flex items-center justify-between mb-1">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><CheckCircle2 :size="16" class="text-emerald-500" /></div>
        </div>
        <div class="text-xl font-bold">378</div>
        <div class="text-xs text-ink-500">Band unitlar</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center justify-between mb-1">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><AlertCircle :size="16" class="text-amber-500" /></div>
        </div>
        <div class="text-xl font-bold text-amber-500">42</div>
        <div class="text-xs text-ink-500">Bo\'sh unitlar</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center justify-between mb-1">
          <div class="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center"><Tag :size="16" class="text-brand-500" /></div>
        </div>
        <div class="text-xl font-bold">28</div>
        <div class="text-xs text-ink-500">Aktiv listinglar</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center justify-between mb-1">
          <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><FileText :size="16" class="text-purple-500" /></div>
        </div>
        <div class="text-xl font-bold">12</div>
        <div class="text-xs text-ink-500">Ariza navbati</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center justify-between mb-1">
          <div class="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"><Wrench :size="16" class="text-red-500" /></div>
        </div>
        <div class="text-xl font-bold">5</div>
        <div class="text-xs text-ink-500">Ochiq servis</div>
      </div>
    </div>

    <!-- Floor heatmap -->
    <div class="card p-6">
      <h3 class="font-semibold mb-4">Qavat bo\'yicha bandlik heatmap</h3>
      <div class="space-y-2">
        <div v-for="floor in floors" :key="floor.num" class="flex items-center gap-3">
          <span class="text-xs text-ink-500 w-16">{{ floor.num }}-qavat</span>
          <div class="flex-1 h-8 rounded-lg overflow-hidden flex">
            <div class="h-full bg-emerald-500/60 flex items-center justify-center text-xs text-white" :style="{ width: floor.occupied + '%' }">
              {{ floor.occupied > 15 ? floor.occupied + '%' : '' }}
            </div>
            <div class="h-full bg-amber-500/30 flex items-center justify-center text-xs" :style="{ width: (100 - floor.occupied) + '%' }">
              {{ (100 - floor.occupied) > 15 ? (100 - floor.occupied) + '%' : '' }}
            </div>
          </div>
          <span class="text-xs text-ink-500 w-24 text-right">{{ floor.vacant }} bo\'sh</span>
        </div>
      </div>
      <div class="flex items-center gap-4 mt-4 pt-4 border-t border-black/5 dark:border-white/5">
        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded bg-emerald-500/60"></span><span class="text-xs text-ink-500">Band</span></div>
        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded bg-amber-500/30"></span><span class="text-xs text-ink-500">Bo\'sh</span></div>
      </div>
    </div>

    <!-- Application queue + Service SLA -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Ariza navbati</h3>
        <div class="space-y-2">
          <div v-for="app in appQueue" :key="app.id" class="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div class="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-xs font-bold text-brand-500">{{ app.number.slice(-3) }}</div>
            <div class="flex-1">
              <div class="text-sm font-medium">{{ app.unit }}</div>
              <div class="text-xs text-ink-500">{{ app.type }} · {{ app.time }}</div>
            </div>
            <span class="badge text-xs" :class="appBadge(app.status)">{{ appLabel(app.status) }}</span>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <h3 class="font-semibold mb-4">Servis SLA</h3>
        <div class="space-y-2">
          <div v-for="sr in slaList" :key="sr.id" class="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="srSlaClass(sr.sla)">
              <Clock :size="16" :class="srSlaColor(sr.sla)" />
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium">{{ sr.number }}</div>
              <div class="text-xs text-ink-500">{{ sr.category }} · {{ sr.unit }}</div>
            </div>
            <span class="text-xs font-medium" :class="srSlaColor(sr.sla)">{{ sr.timeLeft }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2, AlertCircle, Tag, FileText, Wrench, Clock } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const floors = [
  { num: 12, occupied: 95, vacant: 2 },
  { num: 11, occupied: 88, vacant: 4 },
  { num: 10, occupied: 92, vacant: 3 },
  { num: 9, occupied: 85, vacant: 5 },
  { num: 8, occupied: 90, vacant: 4 },
  { num: 7, occupied: 78, vacant: 8 },
  { num: 6, occupied: 82, vacant: 6 },
  { num: 5, occupied: 95, vacant: 2 },
  { num: 4, occupied: 70, vacant: 10 },
  { num: 3, occupied: 88, vacant: 4 },
  { num: 2, occupied: 95, vacant: 2 },
  { num: 1, occupied: 60, vacant: 15 },
]

const appQueue = [
  { id: 'a1', number: 'APP-089', unit: 'A-1201', type: 'Ijara', time: '1 soat oldin', status: 'SUBMITTED' },
  { id: 'a2', number: 'APP-087', unit: 'C-805', type: 'Ijara', time: '3 soat oldin', status: 'OPERATION_REVIEW' },
  { id: 'a3', number: 'APP-085', unit: 'B-402', type: 'Sotib olish', time: '5 soat oldin', status: 'FINANCE_REVIEW' },
  { id: 'a4', number: 'APP-083', unit: 'D-301', type: 'Ijara', time: '1 kun oldin', status: 'DRAFT_READY' },
]

const slaList = [
  { id: 's1', number: 'SR-2026-008', category: 'Elektr', unit: 'A-1201', sla: 'OK', timeLeft: '3h qoldi' },
  { id: 's2', number: 'SR-2026-007', category: 'Sanitariya', unit: 'C-805', sla: 'WARNING', timeLeft: '45m qoldi' },
  { id: 's3', number: 'SR-2026-006', category: 'Konditsioner', unit: 'B-402', sla: 'BREACH', timeLeft: '2h o\'tdi' },
]

function appLabel(s: string) { return { SUBMITTED: 'Yangi', OPERATION_REVIEW: 'Operatsion', FINANCE_REVIEW: 'Moliyaviy', DRAFT_READY: 'Loyiha' }[s] || s }
function appBadge(s: string) { return { SUBMITTED: 'badge-neutral', OPERATION_REVIEW: 'badge-brand', FINANCE_REVIEW: 'badge-brand', DRAFT_READY: 'badge-warning' }[s] || 'badge-neutral' }
function srSlaClass(s: string) { return { OK: 'bg-emerald-500/10', WARNING: 'bg-amber-500/10', BREACH: 'bg-red-500/10' }[s] }
function srSlaColor(s: string) { return { OK: 'text-emerald-500', WARNING: 'text-amber-500', BREACH: 'text-red-500' }[s] }
</script>
