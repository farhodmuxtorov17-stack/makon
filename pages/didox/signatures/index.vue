<template>
  <div class='space-y-5'>
    <div class='flex items-center justify-between flex-wrap gap-4'>
      <div>
        <div class='eyebrow'>Raqamli imzolar</div>
      <h1 class='page-title'>Raqamli imzo navbati</h1>
        <p class='text-ink-500 text-sm mt-1'>{{ signatures.length }} ta so'rov · {{ pendingCount }} kutilmoqda</p>
      </div>
      <button class="btn btn-secondary btn-sm" @click="showToast('Yangilanmoqda...', 'info')"><RefreshCw :size='14' /> Yangilash</button>
    </div>

    <div class='grid grid-cols-2 md:grid-cols-4 gap-4 stagger'>
      <div class='dash-kpi dash-kpi--amber'>
        <div class='kpi-strip__icon'><Clock :size='18' /></div>
        <div class='dash-kpi__body'>
          <div class='dash-kpi__value'>{{ pendingCount }}</div>
          <div class='dash-kpi__label'>Kutilmoqda</div>
        </div>
      </div>
      <div class='dash-kpi dash-kpi--emerald'>
        <div class='kpi-strip__icon'><FileSignature :size='18' /></div>
        <div class='dash-kpi__body'>
          <div class='dash-kpi__value'>{{ signedCount }}</div>
          <div class='dash-kpi__label'>Imzolangan</div>
        </div>
      </div>
      <div class='dash-kpi dash-kpi--rose'>
        <div class='kpi-strip__icon'><AlertCircle :size='18' /></div>
        <div class='dash-kpi__body'>
          <div class='dash-kpi__value'>{{ failedCount }}</div>
          <div class='dash-kpi__label'>Xatolik</div>
        </div>
      </div>
      <div class='dash-kpi dash-kpi--violet'>
        <div class='kpi-strip__icon'><ShieldCheck :size='18' /></div>
        <div class='dash-kpi__body'>
          <div class='dash-kpi__value'>{{ signatures.length }}</div>
          <div class='dash-kpi__label'>Jami so'rov</div>
        </div>
      </div>
    </div>

    <!-- Filter -->
    <div class='flex items-center gap-1 p-1 rounded-xl bg-black/5  w-fit'>
      <button v-for='tab in tabs' :key='tab.value' @click='statusFilter = tab.value'
        class='px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all font-medium'
        :class="statusFilter === tab.value ? 'bg-white  text-ink-900  shadow-sm' : 'text-ink-500'">
        {{ tab.label }}
        <span v-if='tab.count > 0' class='ml-1 text-xs opacity-60'>{{ tab.count }}</span>
      </button>
    </div>

    <!-- Signature cards -->
    <div class='space-y-3'>
      <div
        v-for='sig in filteredSignatures' :key='sig.id'
        class='sig-card'
        :class="`sig-card--${sig.status.toLowerCase()}`"
      >
        <!-- Top -->
        <div class='sig-card__top'>
          <div class='sig-card__left'>
            <div class='sig-card__icon' :class="`sig-card__icon--${sig.status.toLowerCase()}`">
              <ShieldCheck :size='18' />
            </div>
            <div>
              <div class='sig-card__num'>{{ sig.documentNumber }}</div>
              <div class='sig-card__title'>{{ sig.contractTitle }}</div>
            </div>
          </div>
          <div class='sig-card__right'>
            <span class='sig-badge' :class="`sig-badge--${sig.status.toLowerCase()}`">{{ statusLabel(sig.status) }}</span>
            <div class='sig-card__date'>{{ sig.sentDate }}</div>
          </div>
        </div>

        <!-- Signer grid -->
        <div class='sig-grid'>
          <div class='sig-field'>
            <div class='sig-field__label'>Imzolovchi</div>
            <div class='sig-field__value'>{{ sig.signerName }}</div>
            <div class='sig-field__sub'>{{ sig.signerRole }}</div>
          </div>
          <div class='sig-field'>
            <div class='sig-field__label'>STIR / PINFL</div>
            <div class='sig-field__value sig-field__mono'>{{ sig.signerTin }}</div>
          </div>
          <div class='sig-field'>
            <div class='sig-field__label'>Provayder</div>
            <div class='sig-field__value'>{{ sig.provider }}</div>
          </div>
          <div class='sig-field'>
            <div class='sig-field__label'>Muddat</div>
            <div class='sig-field__value' :class="{ 'text-rose-500 font-bold': sig.expiresIn < 24, 'text-amber-500 font-bold': sig.expiresIn >= 24 && sig.expiresIn < 72 }">
              <span v-if="sig.status === 'PENDING'">{{ sig.expiresIn }} soat</span>
              <span v-else-if="sig.status === 'SIGNED'" class='text-emerald-500'>✓ {{ sig.signedDate }}</span>
              <span v-else class='text-rose-500'>{{ sig.failReason }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class='sig-card__foot'>
          <button v-if="sig.status === 'PENDING'" @click="showToast('So\'rov yuborildi', 'success')" class='btn btn-primary btn-sm btn-glow'><Send :size='13' /> Imzo so'rov yuborish</button>
          <button v-if="sig.status === 'FAILED'" @click="showToast('Qayta urinish...', 'info')" class='btn btn-secondary btn-sm'><RotateCw :size='13' /> Qayta urinish</button>
          <a href='https://didox.uz' target='_blank' class='btn btn-ghost btn-sm ml-auto'><ExternalLink :size='13' /> Imzo platformasi</a>
        </div>
      </div>
    </div>

    <div v-if='filteredSignatures.length === 0' class='card p-12 text-center'>
      <ShieldCheck :size='32' class='text-ink-300 mx-auto mb-2' />
      <p class='text-ink-500 text-sm'>Bu statusda so'rovlar yo'q</p>
    </div>
  </div>
</template>

<script setup lang='ts'>

const { show: showToast } = useToast()
import { Clock, ShieldCheck, RefreshCw, Send, RotateCw, ExternalLink, AlertCircle, FileSignature } from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT'],  layout: 'admin', middleware: 'role' })

const makonStore = useMakonStore()
const statusFilter = ref('')

const signatures = computed(() => makonStore.didoxSignatures)

const pendingCount = computed(() => signatures.value.filter(s => s.status === 'PENDING').length)
const signedCount = computed(() => signatures.value.filter(s => s.status === 'SIGNED').length)
const failedCount = computed(() => signatures.value.filter(s => s.status === 'FAILED').length)

const tabs = computed(() => [
  { value: '', label: 'Hammasi', count: signatures.length },
  { value: 'PENDING', label: 'Kutilmoqda', count: pendingCount.value },
  { value: 'SIGNED', label: 'Imzolangan', count: signedCount.value },
  { value: 'FAILED', label: 'Xatolik', count: failedCount.value },
])

const filteredSignatures = computed(() => statusFilter.value ? signatures.value.filter(s => s.status === statusFilter.value) : signatures.value)

function statusLabel(s: string) { return { PENDING: 'Kutilmoqda', SIGNED: 'Imzolangan', FAILED: 'Xatolik' }[s] || s }
</script>

<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 12px; padding: 14px 16px;
  background: var(--card-bg, #fff); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px; position: relative; overflow: hidden;
}
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--rose::before { background: #f43f5e; }
.kpi-strip--violet::before { background: #8b5cf6; }
.kpi-strip__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); color: #f59e0b; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); color: #10b981; }
.kpi-strip--rose .kpi-strip__icon { background: rgba(244,63,94,0.1); color: #f43f5e; }
.kpi-strip--violet .kpi-strip__icon { background: rgba(139,92,246,0.1); color: #8b5cf6; }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; }
.dash-kpi__label { font-size: 11px; color: var(--ink-500); margin-top: 3px; font-weight: 500; }

.sig-card {
  background: var(--card-bg, #fff); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px; padding: 16px 18px; transition: all 0.2s ease; position: relative; overflow: hidden;
}
.sig-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
.sig-card--pending { border-left: 3px solid #f59e0b; }
.sig-card--signed { border-left: 3px solid #10b981; }
.sig-card--failed { border-left: 3px solid #f43f5e; }
.sig-card__top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.sig-card__left { display: flex; align-items: center; gap: 12px; }
.sig-card__icon { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sig-card__icon--pending { background: rgba(245,158,11,0.1); color: #f59e0b; }
.sig-card__icon--signed { background: rgba(16,185,129,0.1); color: #10b981; }
.sig-card__icon--failed { background: rgba(244,63,94,0.1); color: #f43f5e; }
.sig-card__num { font-size: 14px; font-weight: 700; font-family: 'SF Mono', monospace; }
.sig-card__title { font-size: 12px; color: var(--ink-500); margin-top: 2px; }
.sig-card__right { text-align: right; }
.sig-card__date { font-size: 11px; color: var(--ink-400); margin-top: 4px; }
.sig-badge { font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 5px; text-transform: uppercase; }
.sig-badge--pending { background: rgba(245,158,11,0.12); color: #f59e0b; }
.sig-badge--signed { background: rgba(16,185,129,0.12); color: #10b981; }
.sig-badge--failed { background: rgba(244,63,94,0.12); color: #f43f5e; }

.sig-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 12px; margin-top: 14px; padding: 12px 0;
  border-top: 1px solid rgba(0,0,0,0.04); border-bottom: 1px solid rgba(0,0,0,0.04);
}
@media (min-width: 768px) { .sig-grid { grid-template-columns: repeat(4, 1fr); } }
.sig-field__label { font-size: 10px; color: var(--ink-400); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
.sig-field__value { font-size: 13px; font-weight: 600; margin-top: 3px; }
.sig-field__mono { font-family: 'SF Mono', monospace; }
.sig-field__sub { font-size: 11px; color: var(--ink-400); margin-top: 1px; }

.sig-card__foot { display: flex; align-items: center; gap: 8px; margin-top: 12px; }
:deep(.dark) .sig-card { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .sig-grid { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .kpi-strip { border-color: rgba(255,255,255,0.06); }
</style>
