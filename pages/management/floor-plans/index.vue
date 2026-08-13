<template>
  <div class="space-y-6">
    <div>
      <div class="eyebrow">Qavat rejalar</div>
      <h1 class="page-title">2D reja importi</h1>
      <p class="text-ink-500 text-sm mt-1">DWG/DXF fayllarini yuklash, poligon biriktirish va unit mapping</p>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Building2 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ totalPlans }}</div>
          <div class="dash-kpi__label">Yuklangan reja</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Grid3x3 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ mappedUnits }}</div>
          <div class="dash-kpi__label">Biriktirilgan unit</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ pendingPlans }}</div>
          <div class="dash-kpi__label">Jarayonda</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ completedPlans }}</div>
          <div class="dash-kpi__label">Tugatilgan</div>
        </div>
      </div>
    </div>

    <!-- Step indicator -->
    <div class="flex items-center gap-2">
      <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-2 flex-1">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all"
          :class="currentStep >= i ? 'bg-brand-500 text-white' : 'bg-black/5  text-ink-500'">
          {{ i + 1 }}
        </div>
        <span class="text-xs hidden md:block" :class="currentStep >= i ? 'text-ink-900 ' : 'text-ink-500'">{{ step }}</span>
        <div v-if="i < steps.length - 1" class="flex-1 h-px mx-1" :class="currentStep > i ? 'bg-brand-500' : 'bg-black/10 '"></div>
      </div>
    </div>

    <!-- Step 1: Upload -->
    <div v-if="currentStep === 0" class="card p-6 space-y-4">
      <h3 class="font-semibold ">Fayl yuklash</h3>
      <div class="border-2 border-dashed border-black/10  rounded-2xl p-12 text-center cursor-pointer hover:border-brand-500/30 transition-all" @click="fileInput?.click()">
        <input ref="fileInput" type="file" accept=".dwg,.dxf,.pdf,.png,.jpg" class="hidden" @change="handleFile" />
        <Upload :size="32" class="text-ink-500 mx-auto mb-3" />
        <div class="text-sm font-medium">{{ uploadedFile ? uploadedFile.name : 'DWG / DXF / PDF / PNG faylni yuklang' }}</div>
        <div class="text-xs text-ink-500 mt-1">Maks 50 MB · AutoCAD 2018+</div>
      </div>
      <div v-if="uploadedFile" class="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5">
        <CheckCircle2 :size="18" class="text-emerald-500" />
        <div class="flex-1">
          <div class="text-sm font-medium">{{ uploadedFile.name }}</div>
          <div class="text-xs text-ink-500">{{ formatSize(uploadedFile.size) }} · Yuklandi</div>
        </div>
        <button @click="currentStep++" class="btn btn-primary btn-sm btn-glow">Davom etish</button>
      </div>
    </div>

    <!-- Step 2: Configure floor -->
    <div v-if="currentStep === 1" class="card p-6 space-y-4">
      <h3 class="font-semibold ">Qavat konfiguratsiyasi</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label class="label">Bino</label>
          <select class="input"><option>Tashkent City</option><option>Trillent Tower</option><option>IT Park</option></select>
        </div>
        <div>
          <label class="label">Qavat raqami</label>
          <input type="number" class="input" value="3" />
        </div>
        <div>
          <label class="label">Masshtab</label>
          <select class="input"><option>1:100</option><option>1:50</option><option>1:200</option></select>
        </div>
        <div>
          <label class="label">Shimol yo'nalishi</label>
          <select class="input"><option>Yuqori</option><option>O'ng</option><option>Past</option><option>Chap</option></select>
        </div>
        <div>
          <label class="label">Avtomatik aniqlik</label>
          <select class="input"><option>0.1m</option><option>0.05m</option><option>0.5m</option></select>
        </div>
        <div>
          <label class="label">Poligon minimal maydon</label>
          <input type="number" class="input" value="10" />
        </div>
      </div>
      <div class="flex gap-3">
        <button @click="currentStep--" class="btn btn-secondary">Orqaga</button>
        <button @click="currentStep++" class="btn btn-primary flex-1">Avtomatik aniqlashni boshlash</button>
      </div>
    </div>

    <!-- Step 3: Polygon detection -->
    <div v-if="currentStep === 2" class="card p-6 space-y-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-semibold ">Poligonlarni aniqlash va tahrir</h3>
        <span class="badge badge-success">{{ detectedPolygons.length }} poligon topildi</span>
      </div>

      <!-- Canvas preview -->
      <div class="rounded-2xl overflow-hidden bg-black/5  p-4" style="height: 400px;">
        <svg viewBox="0 0 800 350" class="w-full h-full">
          <rect x="40" y="40" width="720" height="270" fill="none" stroke="rgba(37,99,235,0.2)" stroke-width="1" stroke-dasharray="4 4" />
          <polygon v-for="(poly, i) in detectedPolygons" :key="i"
            :points="poly.points"
            :fill="poly.assigned ? 'rgba(16,185,129,0.1)' : 'rgba(37,99,235,0.08)'"
            :stroke="poly.assigned ? '#10b981' : 'var(--accent)'"
            stroke-width="1.5" class="cursor-pointer transition-all"
            @click="selectPolygon(i)"
          />
          <text v-for="(poly, i) in detectedPolygons" :key="`t-${i}`" :x="poly.labelX" :y="poly.labelY" text-anchor="middle" class="text-xs fill-current" :class="poly.assigned ? 'text-emerald-500' : 'text-brand-500'">
            {{ poly.assigned ? poly.unitName : `?${i + 1}` }}
          </text>
        </svg>
      </div>

      <!-- Detected polygons table -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 ">
              <th class="px-3 py-2">#</th>
              <th class="px-3 py-2">Maydon</th>
              <th class="px-3 py-2">Turi (avtomatik)</th>
              <th class="px-3 py-2">Biriktirilgan unit</th>
              <th class="px-3 py-2">Holat</th>
              <th class="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(poly, i) in detectedPolygons" :key="i" class="border-b border-black/5  hover:bg-black/3 ">
              <td class="px-3 py-2 font-medium">{{ i + 1 }}</td>
              <td class="px-3 py-2">{{ poly.area }} m²</td>
              <td class="px-3 py-2 text-ink-500">{{ poly.autoType }}</td>
              <td class="px-3 py-2">
                <select v-if="!poly.assigned" class="input input-sm" @change="assignUnit($event, i)">
                  <option value="">Biriktirish...</option>
                  <option v-for="u in unassignedUnits" :key="u.id" :value="u.id">{{ u.name }}</option>
                </select>
                <span v-else class="text-emerald-500 font-medium">{{ poly.unitName }}</span>
              </td>
              <td class="px-3 py-2">
                <span class="badge text-xs" :class="poly.assigned ? 'badge-success' : 'badge-warning'">
                  {{ poly.assigned ? 'Biriktirilgan' : 'Kutilmoqda' }}
                </span>
              </td>
              <td class="px-3 py-2 text-right">
                <button v-if="poly.assigned" @click="polygons[i].assigned = false; polygons[i].unitName = ''" class="btn btn-ghost btn-sm text-red-500"><Unlink :size="14" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex gap-3">
        <button @click="currentStep--" class="btn btn-secondary">Orqaga</button>
        <button @click="currentStep++" :disabled="!allAssigned" class="btn btn-primary flex-1" :class="!allAssigned ? 'opacity-50 cursor-not-allowed' : ''">
          Saqlash va yakunlash
        </button>
      </div>
    </div>

    <!-- Step 4: Success -->
    <div v-if="currentStep === 3" class="card p-12 text-center space-y-4">
      <div class="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
        <CheckCircle2 :size="32" class="text-emerald-500" />
      </div>
      <h3 class="text-lg font-semibold ">Reja muvaffaqiyatli import qilindi!</h3>
      <p class="text-sm text-ink-500">{{ assignedCount }} ta unit poligon bilan biriktirildi. Endi 2D rejani ko'rishingiz mumkin.</p>
      <div class="flex justify-center gap-3 pt-2">
        <NuxtLink to="/floors/f3/plan" class="btn btn-primary"><Eye :size="16" /> 2D reja</NuxtLink>
        <NuxtLink to="/management/floor-plans" class="btn btn-secondary">Boshqa reja yuklash</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Upload, CheckCircle2, Eye, Unlink , Building2, CheckCircle, FileText, Grid3x3} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'CONTENT_OPERATOR'],  layout: 'admin', middleware: 'role' })

const currentStep = ref(0)
const totalPlans = computed(() => 3)
const mappedUnits = computed(() => 47)
const pendingPlans = computed(() => 1)
const completedPlans = computed(() => 2)

const steps = ['Yuklash', 'Konfiguratsiya', 'Poligonlar', 'Yakun']
const fileInput = ref<HTMLInputElement>()
const uploadedFile = ref<File | null>(null)

const detectedPolygons = ref([
  { points: '50,50 230,50 230,170 50,170', labelX: 140, labelY: 110, area: 85, autoType: 'Ofis', assigned: false, unitName: '' },
  { points: '230,50 400,50 400,170 230,170', labelX: 315, labelY: 110, area: 72, autoType: 'Ofis', assigned: false, unitName: '' },
  { points: '400,50 580,50 580,170 400,170', labelX: 490, labelY: 110, area: 95, autoType: 'Ofis', assigned: false, unitName: '' },
  { points: '580,50 760,50 760,170 580,170', labelX: 670, labelY: 110, area: 60, autoType: 'Texnik', assigned: false, unitName: '' },
  { points: '50,190 220,190 220,310 50,310', labelX: 135, labelY: 250, area: 80, autoType: 'Ofis', assigned: false, unitName: '' },
  { points: '220,190 390,190 390,310 220,310', labelX: 305, labelY: 250, area: 68, autoType: 'Ofis', assigned: false, unitName: '' },
  { points: '390,190 570,190 570,310 390,310', labelX: 480, labelY: 250, area: 92, autoType: 'Ofis', assigned: false, unitName: '' },
  { points: '570,190 760,190 760,310 570,310', labelX: 665, labelY: 250, area: 55, autoType: 'Texnik', assigned: false, unitName: '' },
])

const unassignedUnits = [
  { id: 'A-301', name: 'A-301' },
  { id: 'A-302', name: 'A-302' },
  { id: 'A-303', name: 'A-303' },
  { id: 'A-304', name: 'A-304 (Texnik)' },
  { id: 'B-301', name: 'B-301' },
  { id: 'B-302', name: 'B-302' },
  { id: 'B-303', name: 'B-303' },
  { id: 'B-304', name: 'B-304 (Texnik)' },
]

const polygons = detectedPolygons
const allAssigned = computed(() => detectedPolygons.value.every(p => p.assigned))
const assignedCount = computed(() => detectedPolygons.value.filter(p => p.assigned).length)

function handleFile(e: any) {
  const file = e.target.files[0]
  if (file) uploadedFile.value = file
}

function formatSize(bytes: number) {
  if (bytes > 1048576) return (bytes / 1048576).toFixed(1) + ' MB'
  return (bytes / 1024).toFixed(0) + ' KB'
}

function assignUnit(e: any, i: number) {
  const unitId = e.target.value
  if (unitId) {
    detectedPolygons.value[i].assigned = true
    detectedPolygons.value[i].unitName = unitId
  }
}

function selectPolygon(i: number) {
  // Highlight on canvas — could scroll to table row
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
.dash-kpi__body { flex: 1; min-width: 0; }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.dash-kpi__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }
</style>
