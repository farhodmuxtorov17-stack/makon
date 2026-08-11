<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">FACILITY / MATERIALS</div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Material so'rovlari</h1>
        <p class="text-ink-500 text-sm mt-1">Work orderlar uchun materiallar zaruriyati</p>
      </div>
      <button class="btn btn-primary btn-sm btn-glow" @click="showNew = !showNew">
        <Plus :size="14" /> Yangi so'rov
      </button>
    </div>

    <!-- New request form -->
    <div v-if="showNew" class="card p-6 space-y-4">
      <h3 class="font-semibold dark:text-white">Yangi material so'rovi</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="label">Work order</label>
          <select v-model="newReq.workOrderId" class="input">
            <option value="">Tanlang...</option>
            <option v-for="w in workOrders" :key="w.id" :value="w.id">{{ w.number }}</option>
          </select>
        </div>
        <div>
          <label class="label">Material</label>
          <select v-model="newReq.materialId" class="input">
            <option value="">Tanlang...</option>
            <option v-for="m in materials" :key="m.id" :value="m.id">{{ m.name }} (qoldiq: {{ m.stock }} {{ m.unit }})</option>
          </select>
        </div>
        <div>
          <label class="label">Miqdori</label>
          <input v-model.number="newReq.quantity" type="number" min="1" class="input" placeholder="0" />
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-primary btn-sm btn-glow" @click="createReq">Yuborish</button>
        <button class="btn btn-secondary btn-sm" @click="showNew = false">Bekor qilish</button>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="kpi-strip kpi-strip--teal">
        <div class="kpi-strip__icon"><KpiScene3D type="inventory" :size="34" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ requests.length }}</div>
          <div class="kpi-strip__label">Jami so'rov</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--emerald">
        <div class="kpi-strip__icon"><KpiScene3D type="paid" :size="34" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ requests.filter(r => r.status === 'APPROVED').length }}</div>
          <div class="kpi-strip__label">Tasdiqlangan</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--amber">
        <div class="kpi-strip__icon"><KpiScene3D type="applications" :size="34" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ requests.filter(r => r.status === 'PENDING').length }}</div>
          <div class="kpi-strip__label">Kutilmoqda</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--rose">
        <div class="kpi-strip__icon"><KpiScene3D type="overdue" :size="34" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ requests.filter(r => r.status === 'REJECTED').length }}</div>
          <div class="kpi-strip__label">Rad etilgan</div>
        </div>
      </div>
    </div>

    <!-- Request cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        v-for="r in requests" :key="r.id"
        class="mr-card"
        :class="`mr-card--${r.status.toLowerCase()}`"
      >
        <div class="mr-card__top">
          <div class="mr-card__left">
            <div class="mr-card__icon">
              <Package :size="16" />
            </div>
            <div>
              <div class="mr-card__num">{{ r.number }}</div>
              <div class="mr-card__wo">{{ r.number }}</div>
            </div>
          </div>
          <span class="mr-badge" :class="`mr-badge--${r.status.toLowerCase()}`">{{ statusLabel(r.status) }}</span>
        </div>

        <div class="mr-card__body">
          <div class="mr-material">{{ r.materialName }}</div>
          <div class="mr-qty">
            <span class="mr-qty__num">{{ r.quantity }}</span>
            <span class="mr-qty__unit">{{ r.unit }}</span>
          </div>
        </div>

        <div class="mr-card__foot">
          <div class="mr-requester">
            <div class="mr-requester__avatar">{{ r.requestedBy.charAt(0) }}</div>
            <span>{{ r.requestedBy }}</span>
          </div>
          <span class="mr-date">{{ formatDate(r.createdAt) }}</span>
          <div v-if="r.status === 'PENDING'" class="mr-actions">
            <button class="mr-btn mr-btn--approve" @click="approveReq(r.id)"><Check :size="12" /> Tasdiqlash</button>
            <button class="mr-btn mr-btn--reject" @click="rejectReq(r.id)"><X :size="12" /> Rad</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Package, CheckCircle2, Clock, XCircle, Check, X } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const store = useMakonStore()

const showNew = ref(false)
const newReq = reactive({ materialName: '', category: 'ELECTRICAL', quantity: 0, unit: 'dona', unitPrice: 0, urgency: 'NORMAL', buildingId: 'b1', note: '' })

const materials = computed(() => store.materials)
const requests = computed(() => store.materialRequests)

function createReq() {
  if (!newReq.materialName || !newReq.quantity) return
  store.addMaterialRequest({
    materialName: newReq.materialName,
    category: newReq.category,
    quantity: newReq.quantity,
    unit: newReq.unit,
    unitPrice: newReq.unitPrice,
    totalAmount: newReq.unitPrice * newReq.quantity,
    buildingId: newReq.buildingId,
    buildingName: store.buildings.find(b => b.id === newReq.buildingId)?.name || 'Bino',
    requestedBy: 'Tizim',
    urgency: newReq.urgency,
    status: 'PENDING',
    note: newReq.note,
  })
  showNew.value = false
  newReq.materialName = ''; newReq.category = 'ELECTRICAL'; newReq.quantity = 0; newReq.unitPrice = 0; newReq.note = ''
}

function approveReq(id: string) {
  store.updateMaterialRequestStatus(id, 'APPROVED')
}

function rejectReq(id: string) {
  store.updateMaterialRequestStatus(id, 'REJECTED')
}

function statusLabel(s: string) {
  return { PENDING: 'Kutilmoqda', APPROVED: 'Tasdiqlangan', REJECTED: 'Rad etilgan', FULFILLED: 'Berilgan' }[s] || s
}

function formatDate(d: string) {
  const parts = d.split('-')
  return parts.length === 3 ? `${parts[2]}.${parts[1]}.${parts[0].slice(2)}` : d
}
</script>

<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 12px; padding: 14px 16px;
  background: var(--card-bg, #fff); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px; position: relative; overflow: hidden;
}
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--rose::before { background: #f43f5e; }
.kpi-strip__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); color: var(--accent, #2563EB); }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); color: #10b981; }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); color: #f59e0b; }
.kpi-strip--rose .kpi-strip__icon { background: rgba(244,63,94,0.1); color: #f43f5e; }
.kpi-strip__value { font-size: 22px; font-weight: 800; line-height: 1; }
.kpi-strip__label { font-size: 11px; color: var(--ink-500); margin-top: 3px; font-weight: 500; }

.mr-card {
  background: var(--card-bg, #fff); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px; padding: 16px 18px; transition: all 0.2s ease; position: relative; overflow: hidden;
}
.mr-card:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.mr-card--approved { border-left: 3px solid #10b981; }
.mr-card--pending { border-left: 3px solid #f59e0b; }
.mr-card--rejected { border-left: 3px solid #f43f5e; opacity: 0.7; }
.mr-card__top { display: flex; align-items: flex-start; justify-content: space-between; }
.mr-card__left { display: flex; align-items: center; gap: 10px; }
.mr-card__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(37,99,235,0.08); color: var(--accent, #2563EB); }
.mr-card--pending .mr-card__icon { background: rgba(245,158,11,0.1); color: #f59e0b; }
.mr-card--rejected .mr-card__icon { background: rgba(244,63,94,0.1); color: #f43f5e; }
.mr-card__num { font-size: 13px; font-weight: 700; font-family: 'SF Mono', monospace; }
.mr-card__wo { font-size: 11px; color: var(--ink-400); margin-top: 1px; }
.mr-badge { font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 5px; text-transform: uppercase; }
.mr-badge--approved { background: rgba(16,185,129,0.12); color: #10b981; }
.mr-badge--pending { background: rgba(245,158,11,0.12); color: #f59e0b; }
.mr-badge--rejected { background: rgba(244,63,94,0.12); color: #f43f5e; }
.mr-card__body { margin-top: 12px; display: flex; align-items: center; justify-content: space-between; }
.mr-material { font-size: 14px; font-weight: 600; }
.mr-qty { display: flex; align-items: baseline; gap: 3px; }
.mr-qty__num { font-size: 18px; font-weight: 800; color: var(--accent, #2563EB); }
.mr-qty__unit { font-size: 12px; color: var(--ink-400); }
.mr-card__foot { margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.04); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.mr-requester { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--ink-500); }
.mr-requester__avatar { width: 22px; height: 22px; border-radius: 50%; background: var(--accent, #2563EB); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; }
.mr-date { font-size: 11px; color: var(--ink-400); margin-left: auto; }
.mr-actions { display: flex; gap: 4px; margin-left: auto; }
.mr-btn { display: flex; align-items: center; gap: 3px; font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 6px; border: none; cursor: pointer; }
.mr-btn--approve { background: rgba(16,185,129,0.12); color: #10b981; }
.mr-btn--approve:hover { background: rgba(16,185,129,0.2); }
.mr-btn--reject { background: rgba(244,63,94,0.12); color: #f43f5e; }
.mr-btn--reject:hover { background: rgba(244,63,94,0.2); }
:deep(.dark) .mr-card { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .mr-card__foot { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .kpi-strip { border-color: rgba(255,255,255,0.06); }
</style>
