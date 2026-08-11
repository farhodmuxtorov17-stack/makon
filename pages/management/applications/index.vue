<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Arizalar oqimi (Kanban)</h1>
        <p class="text-ink-500 text-sm mt-1">SUBMITTED → OPERATION → FINANCE → DRAFT_READY → SIGNED → ACTIVE</p>
      </div>

      <!-- Building Scope Filter -->
      <div class="flex items-center gap-3">
        <label class="text-xs text-ink-500 font-medium">Bino bo'yicha filter:</label>
        <select v-model="buildingFilter" class="input w-auto text-xs font-semibold">
          <option value="">Barcha binolar</option>
          <option v-for="b in makonStore.buildings" :key="b.id" :value="b.id">{{ b.name }}</option>
        </select>
      </div>
    </div>

    <!-- Kanban -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
      <div v-for="col in kanbanColumns" :key="col.status" class="bg-black/5 dark:bg-white/5 p-3 rounded-2xl border border-black/5 dark:border-white/5 space-y-3 min-w-[240px]">
        <div class="flex items-center justify-between px-1">
          <span class="text-xs font-bold text-ink-900 dark:text-white flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" :class="col.color"></span>
            {{ col.label }}
          </span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/10 dark:bg-white/10 text-ink-500">
            {{ getColumnApps(col.status).length }}
          </span>
        </div>

        <!-- Cards List -->
        <div class="space-y-3">
          <div
            v-for="app in getColumnApps(col.status)" :key="app.id"
            class="card p-3 space-y-2.5 hover:border-brand-500/50 transition-all cursor-pointer group bg-white dark:bg-ink-900"
            @click="selectedApp = app"
          >
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono font-bold text-brand-500">{{ app.number }}</span>
              <span class="text-[10px] text-ink-500">{{ app.createdDate }}</span>
            </div>

            <!-- Applicant Info -->
            <div>
              <div class="font-bold text-xs text-ink-900 dark:text-white group-hover:text-brand-500 transition-colors line-clamp-1">
                {{ app.applicantName }}
              </div>
              <div class="text-[11px] text-ink-500 flex items-center justify-between mt-0.5">
                <span>{{ app.buildingName }}</span>
                <span class="font-mono text-ink-900 dark:text-white font-medium">Unit {{ app.unitNumber }}</span>
              </div>
            </div>

            <!-- Price & Duration -->
            <div class="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 text-xs">
              <span class="font-bold text-brand-500">{{ formatUZS(app.offeredPrice) }}</span>
              <span class="text-ink-500 text-[10px]">{{ app.durationMonths }} oy</span>
            </div>

            <!-- Advance Simulation Actions -->
            <div class="flex items-center justify-between pt-1 border-t border-black/5 dark:border-white/5 gap-1">
              <NuxtLink :to="`/applications/${app.id}/history`" @click.stop class="text-[10px] text-purple-400 hover:underline flex items-center gap-0.5">
                <History :size="10" /> Tarix
              </NuxtLink>

              <div class="flex items-center gap-1" @click.stop>
                <button
                  v-if="col.nextStatus"
                  @click="advanceStatus(app.id, col.nextStatus)"
                  class="btn btn-primary btn-sm py-0.5 px-2 text-[10px] flex items-center gap-1"
                  title="Keyingi bosqichga o'tkazish"
                >
                  Oldinga <ArrowRight :size="10" />
                </button>
              </div>
            </div>
          </div>

          <div v-if="getColumnApps(col.status).length === 0" class="p-6 text-center text-ink-500 text-xs border border-dashed border-black/10 dark:border-white/10 rounded-xl">
            Arizalar yo'q
          </div>
        </div>
      </div>
    </div>

    <!-- Application Detail Drawer / Modal -->
    <Teleport to="body">
      <div v-if="selectedApp" class="fixed inset-0 z-50 flex justify-end" @click.self="selectedApp = null">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="selectedApp = null" />
        <div class="relative w-full max-w-lg bg-white dark:bg-ink-900 border-l border-black/10 dark:border-white/10 h-full overflow-y-auto p-6 space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/5">
            <div>
              <span class="text-xs font-mono font-bold text-brand-500">{{ selectedApp.number }}</span>
              <h3 class="text-xl font-bold text-ink-900 dark:text-white">{{ selectedApp.applicantName }}</h3>
            </div>
            <button @click="selectedApp = null" class="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-ink-400"><X :size="18" /></button>
          </div>

          <!-- Details -->
          <div class="space-y-4 text-sm">
            <div class="grid grid-cols-2 gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
              <div>
                <span class="text-xs text-ink-500 block">Bino va Unit</span>
                <span class="font-bold text-ink-900 dark:text-white">{{ selectedApp.buildingName }} (Unit {{ selectedApp.unitNumber }})</span>
              </div>
              <div>
                <span class="text-xs text-ink-500 block">Arizachi STIR (TIN)</span>
                <span class="font-mono font-medium text-ink-900 dark:text-white">{{ selectedApp.tin || '305987123' }}</span>
              </div>
              <div>
                <span class="text-xs text-ink-500 block">Taklif qilingan ijara</span>
                <span class="font-bold text-brand-500">{{ formatUZS(selectedApp.offeredPrice) }}/oy</span>
              </div>
              <div>
                <span class="text-xs text-ink-500 block">Depozit summasi</span>
                <span class="font-medium text-ink-900 dark:text-white">{{ formatUZS(selectedApp.depositAmount) }}</span>
              </div>
              <div>
                <span class="text-xs text-ink-500 block">Telefon</span>
                <span class="text-ink-900 dark:text-white">{{ selectedApp.applicantPhone }}</span>
              </div>
              <div>
                <span class="text-xs text-ink-500 block">Boshlanish sanasi</span>
                <span class="text-ink-900 dark:text-white">{{ selectedApp.startDate }}</span>
              </div>
            </div>

            <div v-if="selectedApp.notes" class="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-1">
              <span class="text-xs text-ink-500 block font-semibold">Izohlar:</span>
              <p class="text-xs text-ink-700 dark:text-ink-300">{{ selectedApp.notes }}</p>
            </div>

            <!-- Documents -->
            <div class="space-y-2">
              <span class="text-xs text-ink-500 font-semibold block">Biriktirilgan hujjatlar:</span>
              <div v-for="(doc, idx) in selectedApp.documents" :key="idx" class="flex items-center justify-between p-2 rounded-lg bg-black/5 dark:bg-white/5 text-xs">
                <span class="font-medium text-ink-900 dark:text-white flex items-center gap-1.5"><FileText :size="14" class="text-brand-500" /> {{ doc.title }}</span>
                <span class="text-[10px] text-ink-500">{{ doc.uploadedAt }}</span>
              </div>
            </div>

            <!-- Fast Link Navigation -->
            <div class="grid grid-cols-2 gap-2 pt-2">
              <NuxtLink :to="`/applications/${selectedApp.id}/offer`" class="btn btn-secondary text-xs text-center flex items-center justify-center gap-1">
                <FileText :size="14" /> Kommercheskiy Taklif
              </NuxtLink>
              <NuxtLink :to="`/applications/${selectedApp.id}/history`" class="btn btn-secondary text-xs text-center flex items-center justify-center gap-1">
                <History :size="14" /> Tarix & Audit
              </NuxtLink>
            </div>
          </div>

          <!-- Review Decision Actions -->
          <div class="pt-4 border-t border-black/5 dark:border-white/5 space-y-2">
            <div class="flex items-center gap-2">
              <button @click="openReasonModal('APPROVE')" class="btn btn-primary flex-1 text-xs">
                <Check :size="14" /> Tasdiqlash (Approve)
              </button>
              <button @click="openReasonModal('RETURN')" class="btn btn-secondary flex-1 text-xs text-amber-500 border-amber-500/30">
                <RotateCcw :size="14" /> Qaytash (Need Info)
              </button>
            </div>
            <button @click="openReasonModal('REJECT')" class="btn btn-ghost w-full text-xs text-red-500 hover:bg-red-500/10">
              <XCircle :size="14" /> Rad etish (Reject)
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Reason Modal for Decision -->
    <Teleport to="body">
      <div v-if="showReasonModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showReasonModal = false"></div>
        <div class="relative w-full max-w-md bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 z-10 space-y-4">
          <h3 class="text-lg font-bold text-ink-900 dark:text-white">
            {{ actionType === 'APPROVE' ? 'Arizani tasdiqlash' : actionType === 'RETURN' ? 'Qayta ko\'rib chiqishga qaytarish' : 'Arizani rad etish' }}
          </h3>

          <div>
            <label class="label">Xulosa / Sabab (Izoh)</label>
            <textarea v-model="decisionReason" rows="3" placeholder="Izoh yoki sababni yozing..." class="input w-full text-xs"></textarea>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3">
            <button @click="showReasonModal = false" class="btn btn-secondary text-xs">Bekor qilish</button>
            <button @click="confirmDecision" class="btn btn-primary text-xs">Tasdiqlash</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, History, X, FileText, Check, RotateCcw, XCircle } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const makonStore = useMakonStore()

const buildingFilter = ref('')
const selectedApp = ref<any>(null)
const showReasonModal = ref(false)
const actionType = ref<'APPROVE' | 'RETURN' | 'REJECT'>('APPROVE')
const decisionReason = ref('')

const kanbanColumns = [
  { status: 'SUBMITTED', label: '1. YUBORILGAN', color: 'bg-blue-500', nextStatus: 'OPERATION_APPROVED' },
  { status: 'OPERATION_APPROVED', label: '2. OPERATSIYA TASDIQLADI', color: 'bg-purple-500', nextStatus: 'FINANCE_APPROVED' },
  { status: 'FINANCE_APPROVED', label: '3. MOLIYA TASDIQLADI', color: 'bg-amber-500', nextStatus: 'DRAFT_READY' },
  { status: 'DRAFT_READY', label: '4. QORALAMA TAYYOR', color: 'bg-indigo-500', nextStatus: 'PARTIALLY_SIGNED' },
  { status: 'PARTIALLY_SIGNED', label: '5. IMZOLANMOQDA (ERI)', color: 'bg-emerald-400', nextStatus: 'SIGNED' },
  { status: 'ACTIVE', label: '6. AKTIV', color: 'bg-emerald-600', nextStatus: null }
]

function getColumnApps(status: string) {
  return makonStore.applications.filter(a => {
    const matchesBuilding = !buildingFilter.value || a.buildingId === buildingFilter.value
    if (status === 'PARTIALLY_SIGNED') {
      return matchesBuilding && (a.status === 'PARTIALLY_SIGNED' || a.status === 'SIGNED')
    }
    return matchesBuilding && a.status === status
  })
}


function advanceStatus(appId: string, nextStatus: any) {
  makonStore.updateApplicationStatus(appId, nextStatus)
}

function openReasonModal(type: 'APPROVE' | 'RETURN' | 'REJECT') {
  actionType.value = type
  showReasonModal.value = true
}

function confirmDecision() {
  if (selectedApp.value) {
    if (actionType.value === 'APPROVE') {
      makonStore.updateApplicationStatus(selectedApp.value.id, 'OPERATION_APPROVED', decisionReason.value)
    } else if (actionType.value === 'RETURN') {
      makonStore.updateApplicationStatus(selectedApp.value.id, 'NEED_INFO', decisionReason.value)
    } else {
      makonStore.updateApplicationStatus(selectedApp.value.id, 'REJECTED', decisionReason.value)
    }
  }
  showReasonModal.value = false
  selectedApp.value = null
  decisionReason.value = ''
}
</script>
