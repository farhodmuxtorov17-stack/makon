<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink to="/catalog" class="btn btn-ghost btn-sm"><ArrowLeft :size="16" /> Katalogga</NuxtLink>
    </div>

    <div>
      <div class="eyebrow">Arizalar</div>
      <h1 class="page-title">Ijara / sotib olish arizasi</h1>
      <p class="text-ink-500 text-sm mt-1">Tanlangan unit bo\'yicha ariza yuborish</p>
    </div>

    <!-- Pre-filled listing info -->
    <div class="card-premium p-5">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-xl bg-brand-500/10 flex items-center justify-center">
          <Building2 :size="24" class="text-brand-500" />
        </div>
        <div class="flex-1">
          <div class="font-medium">{{ listing.unit }}</div>
          <div class="text-sm text-ink-500">{{ listing.building }} · {{ listing.area }} m² · {{ listing.floor }}-qavat</div>
        </div>
        <div class="text-right">
          <div class="font-medium">{{ formatUZS(listing.price) }}</div>
          <span class="badge badge-brand text-xs">{{ listing.offerType === 'RENT' ? 'Ijara' : 'Sotuv' }}</span>
        </div>
      </div>
    </div>

    <!-- Form steps -->
    <div class="flex items-center gap-2 mb-4">
      <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-2 flex-1">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all"
          :class="currentStep >= i ? 'bg-brand-500 text-white' : 'bg-black/5  text-ink-500'">
          {{ i + 1 }}
        </div>
        <span class="text-xs hidden md:block" :class="currentStep >= i ? 'text-ink-900 ' : 'text-ink-500'">{{ step }}</span>
        <div v-if="i < steps.length - 1" class="flex-1 h-px mx-1" :class="currentStep > i ? 'bg-brand-500' : 'bg-black/10 '"></div>
      </div>
    </div>

    
    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ availableUnits }}</div>
          <div class="dash-kpi__label">Mavjud unitlar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ avgPrice }}<span class="text-sm">mln</span></div>
          <div class="dash-kpi__label">O'rtacha narx</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><PenTool :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ pendingApps }}</div>
          <div class="dash-kpi__label">Jarayondagi ariza</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileSignature :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">2-3</div>
          <div class="dash-kpi__label">Kun ichida</div>
        </div>
      </div>
    </div>

<!-- Step 1: Application type -->
    <div v-if="currentStep === 0" class="card p-6 space-y-4">
      <h3 class="font-semibold ">Ariza turi va tijoriy parametrlar</h3>
      <div class="grid grid-cols-2 gap-3">
        <button @click="form.type = 'RENT'" class="p-4 rounded-xl border-2 transition-all text-left" :class="form.type === 'RENT' ? 'border-brand-500 bg-brand-500/5' : 'border-black/5 '">
          <Building2 :size="20" class="mb-2" :class="form.type === 'RENT' ? 'text-brand-500' : 'text-ink-500'" />
          <div class="font-medium text-sm">Ijara</div>
          <div class="text-xs text-ink-500">Doimiy oylik to\'lov</div>
        </button>
        <button @click="form.type = 'SALE'" class="p-4 rounded-xl border-2 transition-all text-left" :class="form.type === 'SALE' ? 'border-brand-500 bg-brand-500/5' : 'border-black/5 '">
          <ShoppingBag :size="20" class="mb-2" :class="form.type === 'SALE' ? 'text-brand-500' : 'text-ink-500'" />
          <div class="font-medium text-sm">Sotib olish</div>
          <div class="text-xs text-ink-500">To\'liq mulk huquqi</div>
        </button>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label">Taklif qilingan narx</label>
          <input v-model="form.offeredPrice" type="number" class="input" placeholder="so\'m" />
        </div>
        <div>
          <label class="label">Boshlash sanasi</label>
          <input v-model="form.startDate" type="date" class="input" />
        </div>
        <div v-if="form.type === 'RENT'">
          <label class="label">Muddat (oy)</label>
          <input v-model="form.duration" type="number" class="input" placeholder="12" />
        </div>
      </div>
      <button @click="currentStep++" class="btn btn-primary w-full">Davom etish</button>
    </div>

    <!-- Step 2: Organization info -->
    <div v-if="currentStep === 1" class="card p-6 space-y-4">
      <h3 class="font-semibold ">Tashkilot ma\'lumotlari (profile dan olindi)</h3>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="label">Tashkilot nomi</label><input type="text" class="input" value="Orient Logistika MChJ" disabled /></div>
        <div><label class="label">STIR</label><input type="text" class="input" value="308745612" disabled /></div>
        <div><label class="label">Vakil</label><input type="text" class="input" value="Dilshod Ahmedov" disabled /></div>
        <div><label class="label">Email</label><input type="email" class="input" value="info@abclogistics.uz" disabled /></div>
        <div><label class="label">Telefon</label><input type="text" class="input" value="+998 71 200 80 90" /></div>
      </div>
      <div class="flex gap-3">
        <button @click="currentStep--" class="btn btn-secondary">Orqaga</button>
        <button @click="currentStep++" class="btn btn-primary flex-1">Davom etish</button>
      </div>
    </div>

    <!-- Step 3: Documents -->
    <div v-if="currentStep === 2" class="card p-6 space-y-4">
      <h3 class="font-semibold ">Hujjatlar yuklash</h3>
      <div class="border-2 border-dashed border-black/10  rounded-2xl p-8 text-center cursor-pointer hover:border-brand-500/30 transition-all">
        <Upload :size="24" class="text-ink-500 mx-auto mb-2" />
        <div class="text-sm text-ink-500">Hujjatlarni yuklang (pasport, guvohnoma, hujjatlar)</div>
        <div class="text-xs text-ink-500 mt-1">PDF, JPG, PNG · maks 10 MB</div>
      </div>
      <div class="flex gap-3">
        <button @click="currentStep--" class="btn btn-secondary">Orqaga</button>
        <button @click="currentStep++" class="btn btn-primary flex-1">Davom etish</button>
      </div>
    </div>

    <!-- Step 4: Raqamli imzo confirm -->
    <div v-if="currentStep === 3" class="card p-6 space-y-4">
      <h3 class="font-semibold ">Raqamli imzo orqali tasdiqlash</h3>
      <div class="p-4 rounded-xl bg-brand-500/5 border border-brand-500/10 flex items-start gap-3">
        <FileSignature :size="20" class="text-brand-500 flex-shrink-0" />
        <div class="text-sm text-ink-500">
          Ariza yuborish uchun Raqamli imzo orqali tasdiqlash talab qilinadi.
          Sertifikatingizni tanlang va imzolashni tasdiqlang.
        </div>
      </div>
      <button class="btn btn-primary w-full" @click="() => {}"><FileSignature :size="16" /> Raqamli imzo sertifikatini tanlash</button>
      <div class="flex gap-3">
        <button @click="currentStep--" class="btn btn-secondary">Orqaga</button>
        <button @click="submit" class="btn btn-success flex-1" :disabled="submitting">
          {{ submitting ? 'Yuborilmoqda...' : 'Arizani yuborish' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMakonStore } from '~/stores/makon'
const store = useMakonStore()
import { ArrowLeft, Building2, ShoppingBag, Upload, FileSignature , CheckCircle, FileText, PenTool} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT', 'CONTENT_OPERATOR'],  layout: 'public' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const currentStep = ref(0)
const submitting = ref(false)
const steps = ['Ariza turi', 'Tashkilot', 'Hujjatlar', 'Raqamli imzo tasdiq']

const form = reactive({
  type: 'RENT',
  offeredPrice: '',
  startDate: '',
  duration: '',
})

const listing = {
  unit: 'A-301', building: 'Tashkent City', area: 85, floor: 3, price: 25000000, offerType: 'RENT'
}

function submit() {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    navigateTo('/cabinet/applications')
  }, 1500)
}


const availableUnits = computed(() => store.units.filter((u: any) => u.status === "VACANT").length)
const avgPrice = computed(() => { const p = store.listings.map((l: any) => l.price || 0).filter(Boolean); return p.length ? Math.round(p.reduce((a: number, b: number) => a + b, 0) / p.length / 1000000) : 0 })
const pendingApps = computed(() => store.applications.filter((a: any) => a.status === "PENDING").length)


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
.dash-kpi__body { flex: 1; min-width: 0; }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.dash-kpi__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }
</style>
