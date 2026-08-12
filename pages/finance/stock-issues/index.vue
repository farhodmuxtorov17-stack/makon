<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">FINANCE / STOCK ISSUES</div>
        <div class="eyebrow">FINANCE / STOCK-ISSUES</div>
      <h1 class="page-title">Ombordan chiqarish</h1>
        <p class="text-ink-500 text-sm mt-1">Materiallarni ombordan chiqarish hujjatlari</p>
      </div>
      <button class="btn btn-primary btn-sm btn-glow" @click="showNew = !showNew"><Plus :size="14" /> Yangi chiqarish</button>
    </div>

    <!-- New form -->
    <div v-if="showNew" class="card p-6 space-y-4">
      <h3 class="font-semibold dark:text-white">Ombordan material chiqarish</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="label">Material</label>
          <select v-model="newIssue.materialId" class="input">
            <option value="">Tanlang...</option>
            <option v-for="m in materials" :key="m.id" :value="m.id">{{ m.name }} (qoldiq: {{ m.quantity }} {{ m.unit }})</option>
          </select>
        </div>
        <div>
          <label class="label">Miqdori</label>
          <input v-model.number="newIssue.quantity" type="number" min="1" class="input" placeholder="0" />
        </div>
        <div>
          <label class="label">Izoh</label>
          <input v-model="newIssue.note" type="text" class="input" placeholder="Sabab..." />
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-primary btn-sm btn-glow" @click="createIssue">Chiqarish</button>
        <button class="btn btn-secondary btn-sm" @click="showNew = false">Bekor</button>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="dash-kpi dash-kpi--blue">
        <div class="kpi-strip__icon"><Package :size="34" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ issues.length }}</div>
          <div class="dash-kpi__label">Jami chiqarish</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="kpi-strip__icon"><CheckCircle :size="34" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ issues.filter(i => i.status === 'COMPLETED').length }}</div>
          <div class="dash-kpi__label">Berilgan</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="kpi-strip__icon"><FileText :size="34" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ issues.filter(i => i.status === 'PENDING').length }}</div>
          <div class="dash-kpi__label">Kutilmoqda</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--violet">
        <div class="kpi-strip__icon"><CreditCard :size="34" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ formatUZSShort(totalValue) }}</div>
          <div class="dash-kpi__label">Jami qiymat</div>
        </div>
      </div>
    </div>

    <!-- Issue cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        v-for="iss in issues" :key="iss.id"
        class="si-card"
        :class="`si-card--${iss.status.toLowerCase()}`"
      >
        <div class="si-card__top">
          <div class="si-card__left">
            <div class="si-card__icon" :style="{ background: categoryColor(materialCategory(iss.materialId)) + '15', color: categoryColor(materialCategory(iss.materialId)) }">
              <component :is="categoryIcon(materialCategory(iss.materialId))" :size="16" />
            </div>
            <div>
              <div class="si-card__num">{{ iss.number }}</div>
              <div class="si-card__date">{{ formatDate(iss.createdAt) }}</div>
            </div>
          </div>
          <span class="si-badge" :class="`si-badge--${iss.status.toLowerCase()}`">{{ statusLabel(iss.status) }}</span>
        </div>

        <div class="si-card__body">
          <div class="si-material">{{ iss.materialName }}</div>
          <div class="si-qty">
            <span class="si-qty__num">{{ iss.quantity }}</span>
            <span class="si-qty__unit">{{ iss.unit }}</span>
          </div>
        </div>

        <div class="si-card__foot">
          <div class="si-value">{{ formatUZSShort(iss.totalAmount) }}</div>
          <div class="si-recipient">
            <div class="si-recipient__avatar">{{ iss.issuedTo.charAt(0) }}</div>
            <span>{{ iss.issuedTo }}</span>
          </div>
          <span class="si-note" v-if="iss.note">{{ iss.note }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, ArrowDownToLine, CheckCircle2, Clock, Wallet, Lightbulb, Droplet, PaintRoller, Boxes, Wrench , CheckCircle, CreditCard, FileText, Package} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'WAREHOUSE_OPERATOR'],  layout: 'admin', middleware: 'role' })

const { formatUZS, formatUZSShort } = useFormat()
const store = useMakonStore()

const showNew = ref(false)
const newIssue = reactive({ materialId: '', quantity: 0, note: '' })

const materials = computed(() => store.materials)
const issues = computed(() => store.stockIssues)

const totalValue = computed(() => issues.value.reduce((s, i) => s + i.totalAmount, 0))

function createIssue() {
  const mat = materials.value.find(m => m.id === newIssue.materialId)
  if (!mat || !newIssue.quantity) return
  store.addStockIssue({
    materialId: mat.id,
    materialName: mat.name,
    quantity: newIssue.quantity,
    unit: mat.unit,
    unitPrice: mat.unitPrice,
    totalAmount: mat.unitPrice * newIssue.quantity,
    buildingId: mat.buildingId || 'b1',
    buildingName: store.buildings.find(b => b.id === mat.buildingId)?.name || 'Bino',
    issuedTo: 'Tizim',
    note: newIssue.note,
    status: 'PENDING',
  })
  showNew.value = false
  newIssue.materialId = ''; newIssue.quantity = 0; newIssue.note = ''
}

function statusLabel(s: string) {
  return { PENDING: 'Kutilmoqda', APPROVED: 'Tasdiqlangan', COMPLETED: 'Berilgan', REJECTED: 'Bekor' }[s] || s
}

function materialCategory(materialId: string): string {
  const mat = materials.value.find(m => m.id === materialId)
  return mat?.category || 'OTHER'
}

function categoryColor(cat: string) {
  return { ELECTRICAL: '#f59e0b', PLUMBING: '#3b82f6', PAINT: '#ec4899', CONSTRUCTION: '#6b7280', HARDWARE: 'var(--accent)' }[cat] || '#71717a'
}
function categoryIcon(cat: string) {
  return { ELECTRICAL: Lightbulb, PLUMBING: Droplet, PAINT: PaintRoller, CONSTRUCTION: Boxes, HARDWARE: Wrench }[cat] || Boxes
}

function formatDate(d: string) {
  const parts = d.split('-')
  return parts.length === 3 ? `${parts[2]}.${parts[1]}.${parts[0].slice(2)}` : d
}
</script>

<style scoped>
.kpi-strip { position: relative; overflow: hidden;
  display: flex; align-items: center; gap: 12px; padding: 14px 16px;
  background: var(--card-bg, #fff); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px; position: relative; overflow: hidden;
}
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--violet::before { background: #8b5cf6; }
.kpi-strip__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); color: var(--accent, #2563EB); }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); color: #10b981; }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); color: #f59e0b; }
.kpi-strip--violet .kpi-strip__icon { background: rgba(139,92,246,0.1); color: #8b5cf6; }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; }
.dash-kpi__label { font-size: 11px; color: var(--ink-500); margin-top: 3px; font-weight: 500; }

.si-card {
  background: var(--card-bg, #fff); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px; padding: 16px 18px; transition: all 0.2s ease; position: relative; overflow: hidden;
}
.si-card:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.si-card--completed { border-left: 3px solid #10b981; }
.si-card--pending { border-left: 3px solid #f59e0b; }
.si-card--cancelled { border-left: 3px solid #71717a; opacity: 0.65; }
.si-card__top { display: flex; align-items: flex-start; justify-content: space-between; }
.si-card__left { display: flex; align-items: center; gap: 10px; }
.si-card__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.si-card__num { font-size: 13px; font-weight: 700; font-family: 'SF Mono', monospace; }
.si-card__date { font-size: 11px; color: var(--ink-400); margin-top: 1px; }
.si-badge { font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 5px; text-transform: uppercase; }
.si-badge--completed { background: rgba(16,185,129,0.12); color: #10b981; }
.si-badge--pending { background: rgba(245,158,11,0.12); color: #f59e0b; }
.si-badge--cancelled { background: rgba(113,113,122,0.12); color: #71717a; }
.si-card__body { margin-top: 12px; display: flex; align-items: center; justify-content: space-between; }
.si-material { font-size: 14px; font-weight: 600; }
.si-qty { display: flex; align-items: baseline; gap: 3px; }
.si-qty__num { font-size: 18px; font-weight: 800; color: var(--accent, #2563EB); }
.si-qty__unit { font-size: 12px; color: var(--ink-400); }
.si-card__foot { margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.04); display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.si-value { font-size: 13px; font-weight: 700; color: var(--accent, #2563EB); }
.si-recipient { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--ink-500); }
.si-recipient__avatar { width: 20px; height: 20px; border-radius: 50%; background: var(--accent, #2563EB); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; }
.si-note { font-size: 11px; color: var(--ink-400); margin-left: auto; }
:deep(.dark) .si-card { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .si-card__foot { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .kpi-strip { position: relative; overflow: hidden; border-color: rgba(255,255,255,0.06); }
</style>
