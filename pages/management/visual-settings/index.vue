<template>
  <div class="space-y-6">
    <div>
      <div class="eyebrow">Vizual sozlamalar</div>
      <h1 class="page-title">Vizual sozlamalar</h1>
      <p class="page-sub">Bino sahifalari, katalog va listing ko'rinishi</p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 border-b border-black/5 ">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="px-4 py-2 text-sm font-medium transition-colors border-b-2"
        :class="activeTab === tab.id ? 'border-brand-500 text-brand-500' : 'border-transparent text-ink-500 hover:text-ink-900 '">
        {{ tab.label }}
      </button>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Building2 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ activeBuildings }}</div>
          <div class="dash-kpi__label">Aktiv binolar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Grid3x3 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ publishedListings }}</div>
          <div class="dash-kpi__label">Nashr listinglar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ totalViews }}</div>
          <div class="dash-kpi__label">Jami ko'rishlar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileSignature :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ activeContracts }}</div>
          <div class="dash-kpi__label">Aktiv shartnomalar</div>
        </div>
      </div>
    </div>

    <!-- Catalog settings -->
    <div v-if="activeTab === 'catalog'" class="space-y-4">
      <div class="card p-6 space-y-4">
        <h3 class="font-semibold ">Katalog sahifasi</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label">Katalog sarlavhasi (UZ)</label>
            <input class="input" value="Katalog" />
          </div>
          <div>
            <label class="label">Katalog sarlavhasi (RU)</label>
            <input class="input" value="Каталог" />
          </div>
          <div>
            <label class="label">Sarlavha matni (UZ)</label>
            <input class="input" value="Bo'sh ofis, savdo va ombor maydonlari" />
          </div>
          <div>
            <label class="label">Sarlavha matni (RU)</label>
            <input class="input" value="Свободные офисные, торговые и складские площади" />
          </div>
        </div>
        <div class="flex items-center gap-3">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked class="toggle" /> Filtrlarni ko'rsatish
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked class="toggle" /> Xarita ko'rinishi
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="toggle" /> Virtual tur tugmasi
          </label>
        </div>
      </div>

      <div class="card p-6 space-y-4">
        <h3 class="font-semibold ">Katalog kartochkasi</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="label">Kartochka uslubi</label>
            <select class="input"><option>Minimalist (ranglar)</option><option>Hero photo</option><option>Split layout</option></select>
          </div>
          <div>
            <label class="label">Ko'rsatiladigan maydonlar</label>
            <select class="input" multiple>
              <option selected>Nom</option>
              <option selected>Manzil</option>
              <option selected>Bo'sh unitlar</option>
              <option selected>Turi</option>
              <option>Maydon</option>
              <option>Narx</option>
            </select>
          </div>
          <div>
            <label class="label">Sahifada ko'rsatish</label>
            <select class="input"><option>12</option><option selected>9</option><option>6</option></select>
          </div>
        </div>
      </div>
    </div>

    <!-- Building page settings -->
    <div v-if="activeTab === 'building'" class="space-y-4">
      <div class="card p-6 space-y-4">
        <h3 class="font-semibold ">Bino sahifasi tuzilishi</h3>
        <div class="space-y-3">
          <div v-for="(section, i) in buildingSections" :key="i" class="flex items-center gap-3 p-3 rounded-xl bg-black/5 ">
            <input type="checkbox" v-model="section.enabled" class="toggle" />
            <component :is="section.icon" :size="18" class="text-brand-500" />
            <div class="flex-1">
              <div class="text-sm font-medium">{{ section.label }}</div>
              <div class="text-xs text-ink-500">{{ section.desc }}</div>
            </div>
            <div class="flex items-center gap-1">
              <button @click="moveSection(i, -1)" :disabled="i === 0" class="btn btn-ghost btn-sm"><ChevronUp :size="14" /></button>
              <button @click="moveSection(i, 1)" :disabled="i === buildingSections.length - 1" class="btn btn-ghost btn-sm"><ChevronDown :size="14" /></button>
            </div>
          </div>
        </div>
      </div>

      <div class="card p-6 space-y-4">
        <h3 class="font-semibold ">Galereya sozlamalari</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label">Galereya uslubi</label>
            <select class="input"><option>Grid</option><option selected>Carousel</option><option>Masonry</option></select>
          </div>
          <div>
            <label class="label">Asosiy rasm nisbati</label>
            <select class="input"><option selected>16:9</option><option>4:3</option><option>21:9</option></select>
          </div>
          <div>
            <label class="label">Maks rasm soni</label>
            <input type="number" class="input" value="20" />
          </div>
          <div>
            <label class="label">Miniatura o'lchami</label>
            <select class="input"><option selected>Kichik (80px)</option><option>O'rta (120px)</option><option>Katta (160px)</option></select>
          </div>
        </div>
      </div>
    </div>

    <!-- Listing settings -->
    <div v-if="activeTab === 'listing'" class="space-y-4">
      <div class="card p-6 space-y-4">
        <h3 class="font-semibold ">Listing kartochkasi</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label">Sarlavha formati</label>
            <select class="input"><option selected>Bino · Unit nomi</option><option>Unit nomi · Bino</option><option>Faqat unit nomi</option></select>
          </div>
          <div>
            <label class="label">Narx formati</label>
            <select class="input"><option selected>UZS/oy</option><option>$/m²/oy</option><option>UZS/m²/oy</option></select>
          </div>
        </div>
        <div class="space-y-2">
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked class="toggle" /> Maydon maydoni</label>
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked class="toggle" /> Qavat ma'lumoti</label>
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked class="toggle" /> Tashqi devor (da/yoq)</label>
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked class="toggle" /> Virtual tur link</label>
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="toggle" /> Ko'rishlar soni</label>
        </div>
      </div>

      <div class="card p-6 space-y-4">
        <h3 class="font-semibold ">Listing sahifasi</h3>
        <div class="space-y-2">
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked class="toggle" /> Galereya</label>
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked class="toggle" /> Xarita (joylashuv)</label>
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked class="toggle" /> "Ariza topshirish" tugmasi</label>
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked class="toggle" /> "Virtual tur" tugmasi</label>
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="toggle" /> O'xshash listinglar</label>
        </div>
      </div>
    </div>

    <!-- Theme -->
    <div v-if="activeTab === 'theme'" class="space-y-4">
      <div class="card p-6 space-y-4">
        <h3 class="font-semibold ">Rang sxemasi</h3>
        <div class="grid grid-cols-4 md:grid-cols-6 gap-3">
          <div v-for="color in colors" :key="color.name" @click="selectedColor = color.name"
            class="p-3 rounded-xl border-2 cursor-pointer transition-all"
            :class="selectedColor === color.name ? 'border-brand-500' : 'border-transparent hover:border-black/10 '">
            <div class="w-full h-12 rounded-lg mb-2" :style="{ background: color.value }"></div>
            <div class="text-xs text-center">{{ color.label }}</div>
          </div>
        </div>
      </div>

      <div class="card p-6 space-y-4">
        <h3 class="font-semibold ">Shrift</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label">Asosiy shrift</label>
            <select class="input"><option selected>Inter</option><option>Plus Jakarta Sans</option><option>Manrope</option></select>
          </div>
          <div>
            <label class="label">Sarlavha shrifti</label>
            <select class="input"><option selected>Clash Display</option><option>Inter (bold)</option><option>Satoshi</option></select>
          </div>
          <div>
            <label class="label">Asosiy o'lcham</label>
            <select class="input"><option>14px</option><option selected>16px</option><option>18px</option></select>
          </div>
          <div>
            <label class="label">Sarlavha o'lchami</label>
            <select class="input"><option selected>36px</option><option>48px</option><option>64px</option></select>
          </div>
        </div>
      </div>

      <div class="card p-6 space-y-4">
        <h3 class="font-semibold ">Tungi rejim</h3>
        <div class="space-y-3">
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked class="toggle" />
            <div><div class="text-sm font-medium">Avtomatik (tizim)</div><div class="text-xs text-ink-500">Foydalanuvchi tizim sozlamasiga qarab</div></div>
          </label>
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" class="toggle" />
            <div><div class="text-sm font-medium">Majbur qilish</div><div class="text-xs text-ink-500">Hamisha tungi rejim</div></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Save bar -->
    <div class="flex justify-end gap-3 pb-4">
      <button class="btn btn-secondary" @click="() => {}">Bekor qilish</button>
      <button @click="showSaved = true; setTimeout(() => showSaved = false, 2000)" class="btn btn-primary">
        <Save :size="16" /> Saqlash
      </button>
    </div>

    <transition name="toast">
      <div v-if="showSaved" class="fixed bottom-6 right-6 card px-4 py-3 flex items-center gap-2 z-50">
        <CheckCircle2 :size="18" class="text-emerald-500" />
        <span class="text-sm">Sozlamalar saqlandi</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ChevronUp, ChevronDown, Image, Building2, Layers, Map, FileText, Boxes, Settings as SettingsIcon, Palette, Save, CheckCircle2 , FileSignature, Grid3x3} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'CONTENT_OPERATOR'],  layout: 'admin', middleware: 'role' })
const store = useMakonStore()

const activeTab = ref('catalog')
const showSaved = ref(false)
const selectedColor = ref('indigo')

const activeBuildings = computed(() => store.buildings.filter(b => !b.isArchived).length)
const publishedListings = computed(() => store.listings.filter(l => l.status === 'PUBLISHED').length)
const totalViews = computed(() => store.listings.reduce((s, l) => s + (l.viewsCount || 0), 0))
const activeContracts = computed(() => store.contracts.filter(c => c.status === 'ACTIVE').length)

const tabs = [
  { id: 'catalog', label: 'Katalog' },
  { id: 'building', label: 'Bino sahifasi' },
  { id: 'listing', label: 'Listing' },
  { id: 'theme', label: 'Mavzu' },
]

const buildingSections = ref([
  { label: 'Asosiy galereya', desc: 'Hero rasm va bino ma\'lumotlari', icon: Image, enabled: true },
  { label: 'Tavsif', desc: 'Bino tavsifi (UZ/RU)', icon: FileText, enabled: true },
  { label: 'Qavatlar reytingi', desc: 'Qavat bo\'yicha unit holati', icon: Layers, enabled: true },
  { label: 'Xarita va joylashuv', desc: 'Google Maps integratsiyasi', icon: Map, enabled: true },
  { label: 'Hujjatlar', desc: 'Bino bilan bog\'liq hujjatlar', icon: FileText, enabled: false },
  { label: '2D reja', desc: 'Interaktiv 2D bino rejasi', icon: Building2, enabled: true },
])

const colors = [
  { name: 'indigo', label: 'Indigo', value: 'var(--accent)' },
  { name: 'blue', label: 'Blue', value: '#3b82f6' },
  { name: 'emerald', label: 'Emerald', value: '#10b981' },
  { name: 'amber', label: 'Amber', value: '#f59e0b' },
  { name: 'rose', label: 'Rose', value: '#f43f5e' },
  { name: 'violet', label: 'Violet', value: 'var(--accent)' },
]

function moveSection(i: number, dir: number) {
  const j = i + dir
  if (j < 0 || j >= buildingSections.value.length) return
  const tmp = buildingSections.value[i]
  buildingSections.value[i] = buildingSections.value[j]
  buildingSections.value[j] = tmp
}
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px); }

.kpi-strip {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--card-bg, rgba(255,255,255,0.9));
  border: 1px solid var(--border);
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
