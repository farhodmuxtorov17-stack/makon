<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">SYSTEM / NOTIFICATIONS</div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Bildirishnomalar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ unreadCount }} o'qilmagan · {{ notifications.length }} jami</p>
      </div>
      <div class="flex items-center gap-2">
        <select v-model="typeFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
          <option value="">Barcha turlari</option>
          <option value="application">Arizalar</option>
          <option value="eri">ERI imzo</option>
          <option value="invoice">To'lovlar</option>
          <option value="service">Servis</option>
          <option value="contract">Shartnoma</option>
        </select>
        <button @click="markAllRead" v-if="unreadCount > 0" class="btn btn-secondary btn-sm">
          <CheckCheck :size="14" /> Hammasini o'qildi
        </button>
      </div>
    </div>

    <!-- KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="kpi-strip kpi-strip--teal">
        <div class="kpi-strip__icon"><KpiScene3D type="applications" :size="38" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ notifications.length }}</div>
          <div class="kpi-strip__label">Jami bildirishnomalar</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--amber">
        <div class="kpi-strip__icon"><KpiScene3D type="overdue" :size="38" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ unreadCount }}</div>
          <div class="kpi-strip__label">O'qilmagan</div>
        </div>
        <div v-if="notifications.length" class="kpi-strip__pct">{{ Math.round(unreadCount / notifications.length * 100) }}%</div>
      </div>
      <div class="kpi-strip kpi-strip--emerald">
        <div class="kpi-strip__icon"><KpiScene3D type="paid" :size="38" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ readCount }}</div>
          <div class="kpi-strip__label">O'qilgan</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--blue">
        <div class="kpi-strip__icon"><KpiScene3D type="service" :size="38" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ serviceCount }}</div>
          <div class="kpi-strip__label">Servis bildirishnomalari</div>
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <div class="card-premium p-5">
      <div class="space-y-2">
        <div v-for="n in filteredNotifications" :key="n.id"
          class="notif-row"
          :class="{ 'notif-row--unread': !n.read }"
          @click="n.read = true"
        >
          <div class="notif-row__icon" :class="iconBg(n.type)">
            <component :is="iconComp(n.type)" :size="16" :class="iconColor(n.type)" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="text-sm font-medium" :class="!n.read ? 'text-ink-900 dark:text-white' : 'text-ink-500'">{{ n.title }}</div>
                <div class="text-xs text-ink-400 mt-0.5">{{ n.desc }}</div>
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                <span class="text-xs text-ink-400">{{ n.time }}</span>
                <span v-if="!n.read" class="w-2 h-2 rounded-full bg-brand-500"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredNotifications.length === 0" class="py-12 text-center">
        <BellOff :size="32" class="text-ink-300 mx-auto mb-2" />
        <p class="text-ink-500 text-sm">Bildirishnomalar yo'q</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCheck, BellOff, Receipt, AlertCircle, CheckCircle2, Wrench, FileText, ShieldCheck } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const makonStore = useMakonStore()
const typeFilter = ref('')

const notifications = computed(() => makonStore.notifications)
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)
const readCount = computed(() => notifications.value.filter(n => n.read).length)
const serviceCount = computed(() => notifications.value.filter(n => n.type === 'service').length)

const filteredNotifications = computed(() => {
  if (!typeFilter.value) return notifications.value
  return notifications.value.filter(n => n.type === typeFilter.value)
})

function markAllRead() {
  notifications.value.forEach(n => n.read = true)
}

function iconBg(type: string) {
  return {
    application: 'bg-blue-500/10',
    eri: 'bg-purple-500/10',
    invoice: 'bg-amber-500/10',
    service: 'bg-emerald-500/10',
    contract: 'bg-brand-500/10',
  }[type] || 'bg-ink-500/10'
}
function iconColor(type: string) {
  return {
    application: 'text-blue-500',
    eri: 'text-purple-500',
    invoice: 'text-amber-500',
    service: 'text-emerald-500',
    contract: 'text-brand-500',
  }[type] || 'text-ink-500'
}
function iconComp(type: string) {
  return {
    application: FileText,
    eri: ShieldCheck,
    invoice: Receipt,
    service: Wrench,
    contract: FileText,
  }[type] || AlertCircle
}
</script>
<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--card-bg, rgba(255,255,255,0.9));
  border: 1px solid rgba(0,0,0,0.06);
  position: relative; overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.kpi-strip:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--blue::before { background: #3b82f6; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); }
.kpi-strip--blue .kpi-strip__icon { background: rgba(59,130,246,0.1); }
.kpi-strip__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip__body { flex: 1; min-width: 0; }
.kpi-strip__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.kpi-strip__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }
.kpi-strip__pct { font-size: 12px; font-weight: 700; color: var(--accent, #2563EB); padding: 2px 8px; border-radius: 8px; background: rgba(37,99,235,0.1); }
</style>
