<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3">
        <button @click="navigateTo('/management/buildings')" class="btn btn-ghost btn-sm p-2"><ArrowLeft :size="18" /></button>
        <div>
          <h1 class="text-2xl font-bold text-ink-900 dark:text-white">{{ building.name }}</h1>
          <p class="text-ink-500 text-sm mt-0.5">{{ building.address }} · {{ building.floorsCount }} qavat · {{ building.totalUnits }} unit</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <NuxtLink :to="`/buildings/${building.slug}`" class="btn btn-secondary btn-sm"><Eye :size="14" /> Public</NuxtLink>
        <NuxtLink :to="`/buildings/${building.id}/3d`" class="btn btn-secondary btn-sm"><Box :size="14" /> 3D</NuxtLink>
        <button class="btn btn-primary btn-sm"><Edit3 :size="14" /> Tahrir</button>
      </div>
    </div>

    <!-- KPI mini -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="icon-3d icon-3d-indigo"><Layers :size="20" /></div>
          <span class="text-xs text-ink-500">Jami unitlar</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ building.totalUnits }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="icon-3d icon-3d-green"><CheckCircle2 :size="20" /></div>
          <span class="text-xs text-ink-500">Band</span>
        </div>
        <div class="text-xl font-bold text-emerald-500">{{ building.occupiedUnits }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="icon-3d icon-3d-amber"><AlertCircle :size="20" /></div>
          <span class="text-xs text-ink-500">Bo'sh</span>
        </div>
        <div class="text-xl font-bold text-amber-500">{{ building.vacantUnits }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="icon-3d icon-3d-blue"><Ruler :size="20" /></div>
          <span class="text-xs text-ink-500">Maydon</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ building.totalArea }} <span class="text-xs font-normal text-ink-500">m²</span></div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 w-fit overflow-x-auto">
      <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
        class="px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all font-medium"
        :class="activeTab === tab.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500'">
        {{ tab.label }}
      </button>
    </div>

    <!-- Passport tab -->
    <div v-if="activeTab === 'passport'" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card p-5 lg:col-span-2">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Bino pasporti</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div class="passport-field">
            <div class="text-xs text-ink-500">Nomi</div>
            <div class="font-medium text-ink-900 dark:text-white mt-1">{{ building.name }}</div>
          </div>
          <div class="passport-field">
            <div class="text-xs text-ink-500">Manzil</div>
            <div class="font-medium text-ink-900 dark:text-white mt-1">{{ building.address }}</div>
          </div>
          <div class="passport-field">
            <div class="text-xs text-ink-500">Tuman</div>
            <div class="font-medium text-ink-900 dark:text-white mt-1">{{ building.district }}</div>
          </div>
          <div class="passport-field">
            <div class="text-xs text-ink-500">Turi</div>
            <span class="badge badge-brand mt-1 text-xs">{{ building.typeLabel }}</span>
          </div>
          <div class="passport-field">
            <div class="text-xs text-ink-500">Qavatlar</div>
            <div class="font-medium text-ink-900 dark:text-white mt-1">{{ building.floorsCount }}</div>
          </div>
          <div class="passport-field">
            <div class="text-xs text-ink-500">Maydon</div>
            <div class="font-medium text-ink-900 dark:text-white mt-1">{{ building.totalArea }} m²</div>
          </div>
        </div>

        <!-- Occupancy chart -->
        <div class="mt-6">
          <h4 class="text-sm font-semibold text-ink-900 dark:text-white mb-3">Bandlik bo'yicha qavatlar</h4>
          <div class="space-y-2">
            <div v-for="floor in floors" :key="floor.id" class="flex items-center gap-3">
              <span class="text-xs text-ink-500 w-8">{{ floor.num }}-q</span>
              <div class="flex-1 h-6 rounded-lg bg-black/5 dark:bg-white/5 overflow-hidden">
                <div class="h-full rounded-lg flex items-center px-2 text-[10px] font-medium text-white transition-all"
                  :style="{ width: (floor.occupied / floor.total * 100) + '%', background: floor.occupied / floor.total > 0.85 ? '#10b981' : floor.occupied / floor.total > 0.6 ? '#f59e0b' : '#ef4444' }">
                  {{ floor.occupied }}/{{ floor.total }}
                </div>
              </div>
              <span class="text-xs font-medium w-12 text-right" :class="floor.vacant > 0 ? 'text-amber-500' : 'text-ink-400'">{{ floor.vacant }} bo'sh</span>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <!-- Status -->
        <div class="card p-5">
          <h3 class="font-semibold text-ink-900 dark:text-white mb-3">Holat</h3>
          <div class="space-y-2.5 text-sm">
            <div class="flex items-center justify-between">
              <span class="text-ink-500">3D model</span>
              <span class="badge badge-success text-xs">Tayyor</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-ink-500">2D plan</span>
              <span class="badge badge-success text-xs">Tayyor</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-ink-500">Public</span>
              <span class="badge badge-success text-xs">Nashr etilgan</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-ink-500">Galereya</span>
              <span class="badge badge-brand text-xs">{{ gallery.length }} rasm</span>
            </div>
          </div>
        </div>

        <!-- Quick actions -->
        <div class="card p-5">
          <h3 class="font-semibold text-ink-900 dark:text-white mb-3">Tezkor amallar</h3>
          <div class="space-y-2">
            <NuxtLink :to="`/management/buildings/${building.id}/units`" class="btn btn-secondary btn-sm w-full justify-start"><Layers :size="14" /> Unitlar boshqaruvi</NuxtLink>
            <NuxtLink :to="`/floors/${floors[0].id}/plan`" class="btn btn-secondary btn-sm w-full justify-start"><Map :size="14" /> 2D reja importi</NuxtLink>
            <button class="btn btn-secondary btn-sm w-full justify-start"><Image :size="14" /> Galereya boshqaruvi</button>
            <button class="btn btn-secondary btn-sm w-full justify-start"><FileText :size="14" /> Hujjatlar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Floors tab -->
    <div v-if="activeTab === 'floors'" class="card p-5">
      <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Qavatlar ro'yxati</h3>
      <div class="space-y-2">
        <div v-for="floor in floors" :key="floor.id" class="floor-row">
          <div class="floor-row__num">{{ floor.num }}</div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-ink-900 dark:text-white">{{ floor.num }}-qavat</div>
            <div class="text-xs text-ink-500">
              {{ floor.total }} unit · {{ floor.vacant }} bo'sh · 2D: {{ floor.hasPlan ? 'tayyor' : "yo'q" }}
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <div class="hidden sm:flex items-center gap-2">
              <div class="w-20 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <div class="h-full rounded-full" :style="{ width: (floor.occupied / floor.total * 100) + '%', background: '#6366f1' }"></div>
              </div>
              <span class="text-xs text-ink-500">{{ Math.round(floor.occupied / floor.total * 100) }}%</span>
            </div>
            <NuxtLink :to="`/floors/${floor.id}/plan`" class="btn btn-ghost btn-sm"><Map :size="14" /></NuxtLink>
            <NuxtLink :to="`/management/buildings/${building.id}/units`" class="btn btn-ghost btn-sm"><Layers :size="14" /></NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery tab -->
    <div v-if="activeTab === 'gallery'" class="card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">Fotogalereya</h3>
        <button class="btn btn-primary btn-sm"><Plus :size="14" /> Rasm qo'shish</button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div v-for="(photo, i) in gallery" :key="i" class="gallery-item">
          <img :src="photo.url" :alt="photo.alt" loading="lazy" />
          <span class="gallery-item__overlay">{{ photo.label }}</span>
        </div>
      </div>
    </div>

    <!-- Docs tab -->
    <div v-if="activeTab === 'docs'" class="card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">Hujjatlar</h3>
        <button class="btn btn-primary btn-sm"><Plus :size="14" /> Yuklash</button>
      </div>
      <div class="space-y-2">
        <div v-for="doc in docs" :key="doc.name" class="doc-row">
          <div class="doc-row__icon"><FileText :size="18" class="text-brand-500" /></div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-ink-900 dark:text-white">{{ doc.name }}</div>
            <div class="text-xs text-ink-500">{{ doc.type }} · {{ doc.size }} · {{ doc.date }}</div>
          </div>
          <button class="btn btn-ghost btn-sm"><Download :size="14" /></button>
        </div>
      </div>
    </div>

    <!-- Analytics tab -->
    <div v-if="activeTab === 'analytics'" class="space-y-4">
      <div class="card p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Tushum dinamikasi</h3>
        <MakonChart type="area" :series="revenueSeries" :categories="months" :height="240" :colors="['#6366f1']" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card p-5">
          <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Unit turlari</h3>
          <MakonChart type="donut" :series="[180, 120, 80, 40]" :donutLabels="['Ofis', 'Savdo', 'Ombor', 'Boshqa']" :height="240" :colors="['#6366f1', '#3b82f6', '#10b981', '#f59e0b']" />
        </div>
        <div class="card p-5">
          <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Servis so'rovlari</h3>
          <MakonChart type="bar" :series="serviceSeries" :categories="serviceCats" :height="240" :colors="['#f59e0b']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeft, Eye, Box, Edit3, Layers, Map, Plus, FileText, Download,
  CheckCircle2, AlertCircle, Ruler, Image,
} from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const route = useRoute()
const activeTab = ref('passport')
const tabs = [
  { value: 'passport', label: 'Pasport' },
  { value: 'floors', label: 'Qavatlar' },
  { value: 'gallery', label: 'Galereya' },
  { value: 'docs', label: 'Hujjatlar' },
  { value: 'analytics', label: 'Analitika' },
]

const building = {
  id: route.params.id, slug: 'tashkent-city', name: 'Tashkent City',
  address: "Tashkent sh., Mirzo Ulug'bek tumani", district: "Mirzo Ulug'bek",
  typeLabel: 'Biznes markaz', floorsCount: 12, totalArea: 28000,
  totalUnits: 420, occupiedUnits: 378, vacantUnits: 42,
}

const floors = [
  { id: 'f12', num: 12, total: 35, occupied: 33, vacant: 2, hasPlan: true },
  { id: 'f11', num: 11, total: 35, occupied: 31, vacant: 4, hasPlan: true },
  { id: 'f10', num: 10, total: 35, occupied: 32, vacant: 3, hasPlan: true },
  { id: 'f9', num: 9, total: 35, occupied: 30, vacant: 5, hasPlan: true },
  { id: 'f8', num: 8, total: 35, occupied: 31, vacant: 4, hasPlan: false },
  { id: 'f7', num: 7, total: 35, occupied: 27, vacant: 8, hasPlan: true },
  { id: 'f6', num: 6, total: 35, occupied: 33, vacant: 2, hasPlan: true },
  { id: 'f5', num: 5, total: 35, occupied: 32, vacant: 3, hasPlan: true },
]

const gallery = [
  { url: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png', alt: 'Facade', label: 'Fasod' },
  { url: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png', alt: 'Office', label: 'Ofis' },
  { url: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/6daa9acc3_generated_image.png', alt: 'Lobby', label: 'Lobbi' },
  { url: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png', alt: 'Retail', label: 'Savdo' },
  { url: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/41072e285_generated_image.png', alt: 'Corridor', label: 'Koridor' },
  { url: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png', alt: 'Aerial', label: 'Havodan' },
  { url: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3075330ac_generated_image.png', alt: 'Night', label: 'Kechasi' },
  { url: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png', alt: 'Meeting', label: 'Konferensiya' },
]

const docs = [
  { name: 'Texnik pasport.pdf', type: 'PDF', size: '2.4 MB', date: '10 Yan 2026' },
  { name: 'Arxitektura loyihasi.pdf', type: 'PDF', size: '12 MB', date: '5 Yan 2026' },
  { name: '3D model.glb', type: 'GLB', size: '45 MB', date: '15 Dek 2025' },
  { name: 'Foto obeyektga.djvu', type: 'DJVU', size: '5.6 MB', date: '20 Dek 2025' },
]

const months = ['Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg']
const revenueSeries = [{ name: 'Tushum (mln)', data: [380, 390, 400, 410, 415, 420] }]

const serviceCats = ['Elektr', 'Santexnika', 'Lift', 'Kondit.', 'Eshik', 'Boshqa']
const serviceSeries = [{ name: 'So\'rovlar', data: [12, 8, 5, 7, 4, 6] }]
</script>

<style scoped>
.passport-field {
  padding: 10px;
  border-radius: 10px;
  background: rgba(0,0,0,0.02);
}
.dark .passport-field { background: rgba(255,255,255,0.02); }
.floor-row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px;
  border-radius: 12px;
  transition: background 0.15s;
}
.floor-row:hover { background: rgba(0,0,0,0.03); }
.dark .floor-row:hover { background: rgba(255,255,255,0.03); }
.floor-row__num {
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(99,102,241,0.1); color: #6366f1;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; flex-shrink: 0;
}
.gallery-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.gallery-item:hover img { transform: scale(1.05); }
.gallery-item__overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 8px;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white; font-size: 12px; font-weight: 600;
}
.doc-row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px;
  border-radius: 12px;
  transition: background 0.15s;
}
.doc-row:hover { background: rgba(0,0,0,0.03); }
.dark .doc-row:hover { background: rgba(255,255,255,0.03); }
.doc-row__icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(99,102,241,0.08);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
</style>
