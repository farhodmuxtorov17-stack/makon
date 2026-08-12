<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">Shartnomalar</div>
      <h1 class="page-title">Mening shartnomalarim</h1>
        <p class="text-ink-500 text-sm mt-1">{{ contracts.length }} ta shartnoma · {{ activeCount }} faol · {{ signingCount }} imzolanmoqda</p>
      </div>
      <NuxtLink to="/catalog" class="btn btn-primary btn-sm btn-glow"><Plus :size="14" /> Yangi ariza</NuxtLink>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--emerald">
        <div class="kpi-strip__icon"><CheckCircle2 :size="18" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ activeCount }}</div>
          <div class="dash-kpi__label">Faol shartnoma</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="kpi-strip__icon"><Clock :size="18" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ signingCount }}</div>
          <div class="dash-kpi__label">Imzolanmoqda</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--violet">
        <div class="kpi-strip__icon"><ShieldCheck :size="18" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ eriCount }}</div>
          <div class="dash-kpi__label">Raqamli imzolangan</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--rose">
        <div class="kpi-strip__icon"><AlertCircle :size="18" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ expiredCount }}</div>
          <div class="dash-kpi__label">Muddati o'tgan</div>
        </div>
      </div>
    </div>

    <!-- Contract cards -->
    <div class="space-y-3">
      <div
        v-for="c in contracts"
        :key="c.id"
        class="con-card"
        :class="`con-card--${c.status.toLowerCase()}`"
        @click="navigateTo(`/contracts/${c.id}`)"
      >
        <!-- Top row -->
        <div class="con-card__top">
          <div class="con-card__left">
            <div class="con-card__icon">
              <FileText :size="18" />
            </div>
            <div>
              <div class="con-card__num">{{ c.number }}</div>
              <div class="con-card__meta">{{ c.unit }} · {{ c.buildingName }}</div>
            </div>
          </div>
          <div class="con-card__right">
            <span class="con-badge" :class="`con-badge--${c.status.toLowerCase()}`">{{ statusLabel(c.status) }}</span>
          </div>
        </div>

        <!-- Middle: rent + dates -->
        <div class="con-card__mid">
          <div class="con-rent">
            <div class="con-rent__amount">{{ formatUZS(c.monthlyRent) }}</div>
            <div class="con-rent__period">/ oy</div>
          </div>
          <div class="con-dates">
            <div class="con-date">
              <CalendarDays :size="13" class="con-date__icon" />
              <span>{{ c.startDate }}</span>
            </div>
            <div class="con-date-arrow">→</div>
            <div class="con-date">
              <CalendarX2 :size="13" class="con-date__icon" />
              <span>{{ c.endDate }}</span>
            </div>
          </div>
        </div>

        <!-- Duration progress bar -->
        <div v-if="c.status === 'ACTIVE'" class="con-progress">
          <div class="con-progress__track">
            <div class="con-progress__fill" :style="{ width: c.progressPct + '%' }"></div>
          </div>
          <div class="con-progress__info">
            <span class="con-progress__label">{{ c.daysLeft }} kun qoldi</span>
            <span class="con-progress__pct">{{ c.progressPct }}%</span>
          </div>
        </div>

        <!-- Raqamli imzo signing flow -->
        <div class="con-eri">
          <div class="con-eri__title">
            <ShieldCheck :size="13" />
            <span>Raqamli imzolar</span>
          </div>
          <div class="con-eri__flow">
            <div class="eri-step" :class="{ 'eri-step--done': c.eriTenantSigned }">
              <div class="eri-step__dot"></div>
              <span>Ijarachi</span>
            </div>
            <div class="eri-line" :class="{ 'eri-line--done': c.eriTenantSigned && c.eriLandlordSigned }"></div>
            <div class="eri-step" :class="{ 'eri-step--done': c.eriLandlordSigned }">
              <div class="eri-step__dot"></div>
              <span>Sub'ekt</span>
            </div>
          </div>
          <div v-if="c.status === 'PARTIALLY_SIGNED'" class="con-eri__pending">
            <Clock :size="11" /> Sub'ekt imzosi kutilmoqda
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, FileText, CheckCircle2, Clock, ShieldCheck, AlertCircle, CalendarDays, CalendarX2 } from 'lucide-vue-next'

definePageMeta({ roles: ['TENANT_OWNER'],  layout: 'admin', middleware: 'role' })

const makonStore = useMakonStore()
const { formatUZS } = useFormat()

const contracts = computed(() => makonStore.tenantContracts)

const activeCount = computed(() => contracts.value.filter(c => c.status === 'ACTIVE').length)
const signingCount = computed(() => contracts.value.filter(c => c.status === 'PARTIALLY_SIGNED').length)
const eriCount = computed(() => contracts.value.filter(c => c.eriTenantSigned && c.eriLandlordSigned).length)
const expiredCount = computed(() => contracts.value.filter(c => c.status === 'EXPIRED').length)

function statusLabel(s: string) { return { ACTIVE: 'Faol', PARTIALLY_SIGNED: 'Qisman imzo', EXPIRED: "Muddati o'tgan" }[s] || s }
</script>
<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  background: var(--card-bg, #fff);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px; position: relative; overflow: hidden;
}
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--violet::before { background: #8b5cf6; }
.kpi-strip--rose::before { background: #f43f5e; }
.kpi-strip__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); color: #10b981; }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); color: #f59e0b; }
.kpi-strip--violet .kpi-strip__icon { background: rgba(139,92,246,0.1); color: #8b5cf6; }
.kpi-strip--rose .kpi-strip__icon { background: rgba(244,63,94,0.1); color: #f43f5e; }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; }
.dash-kpi__label { font-size: 11px; color: var(--ink-500); margin-top: 3px; font-weight: 500; }

.con-card {
  background: var(--card-bg, #fff);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px; padding: 18px 20px;
  cursor: pointer; transition: all 0.2s ease;
  position: relative; overflow: hidden;
}
.con-card:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); border-color: rgba(37,99,235,0.2); }
.con-card--active { border-left: 3px solid #10b981; }
.con-card--partially_signed { border-left: 3px solid #f59e0b; }
.con-card--expired { border-left: 3px solid #71717a; opacity: 0.75; }
.con-card__top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.con-card__left { display: flex; align-items: center; gap: 12px; }
.con-card__icon { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: rgba(37,99,235,0.08); color: var(--accent, #2563EB); }
.con-card--partially_signed .con-card__icon { background: rgba(245,158,11,0.1); color: #f59e0b; }
.con-card--expired .con-card__icon { background: rgba(113,113,122,0.1); color: #71717a; }
.con-card__num { font-size: 14px; font-weight: 700; font-family: 'SF Mono', 'Fira Code', monospace; letter-spacing: -0.3px; }
.con-card__meta { font-size: 12px; color: var(--ink-500); margin-top: 2px; }
.con-badge { font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
.con-badge--active { background: rgba(16,185,129,0.12); color: #10b981; }
.con-badge--partially_signed { background: rgba(245,158,11,0.12); color: #f59e0b; }
.con-badge--expired { background: rgba(113,113,122,0.12); color: #71717a; }
.con-card__mid { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; padding: 12px 0; border-top: 1px solid rgba(0,0,0,0.04); border-bottom: 1px solid rgba(0,0,0,0.04); }
.con-rent { display: flex; align-items: baseline; gap: 4px; }
.con-rent__amount { font-size: 18px; font-weight: 800; color: var(--accent, #2563EB); }
.con-rent__period { font-size: 11px; color: var(--ink-400); font-weight: 500; }
.con-dates { display: flex; align-items: center; gap: 8px; }
.con-date { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--ink-500); font-family: 'SF Mono', 'Fira Code', monospace; }
.con-date__icon { opacity: 0.6; }
.con-date-arrow { color: var(--ink-300); font-size: 11px; }
.con-progress { margin-top: 12px; }
.con-progress__track { height: 5px; background: rgba(0,0,0,0.06); border-radius: 3px; overflow: hidden; }
.con-progress__fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #10b981, #34d399); transition: width 0.6s ease; }
.con-progress__info { display: flex; justify-content: space-between; margin-top: 5px; }
.con-progress__label { font-size: 11px; color: var(--ink-500); font-weight: 500; }
.con-progress__pct { font-size: 11px; color: #10b981; font-weight: 700; }
.con-eri { margin-top: 12px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.con-eri__title { display: flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; color: #8b5cf6; }
.con-eri__flow { display: flex; align-items: center; gap: 6px; }
.eri-step { display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--ink-400); }
.eri-step__dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(0,0,0,0.15); flex-shrink: 0; }
.eri-step--done .eri-step__dot { background: #10b981; box-shadow: 0 0 0 2px rgba(16,185,129,0.2); }
.eri-step--done { color: #10b981; font-weight: 600; }
.eri-line { width: 20px; height: 2px; background: rgba(0,0,0,0.1); border-radius: 1px; }
.eri-line--done { background: #10b981; }
.con-eri__pending { display: flex; align-items: center; gap: 3px; font-size: 10px; color: #f59e0b; font-weight: 600; margin-left: auto; }
:deep(.dark) .con-card { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .con-card__icon { background: rgba(37,99,235,0.15); }
:deep(.dark) .con-progress__track { background: rgba(255,255,255,0.08); }
:deep(.dark) .con-card__mid { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .kpi-strip { border-color: rgba(255,255,255,0.06); }
</style>
