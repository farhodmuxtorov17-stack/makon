<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3">
        <button @click="navigateTo('/management/buildings')" class="btn btn-ghost btn-sm p-2"><ArrowLeft :size="18" /></button>
        <div>
          <div class="eyebrow">Binolar</div>
      <h1 class="page-title">{{ building?.name || 'Bino' }}</h1>
          <p class="page-sub">{{ building?.address }} · {{ building?.floorsCount }} qavat · {{ building?.totalUnits }} unit</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <NuxtLink :to="`/management/buildings/${route.params.id}/units`" class="btn btn-secondary btn-sm"><Layers :size="14" /> Unitlar</NuxtLink>
        <NuxtLink :to="`/buildings/${building?.slug || ''}`" class="btn btn-secondary btn-sm"><Eye :size="14" /> Public</NuxtLink>
      </div>
    </div>

    <!-- KPI -->
    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Grid3x3 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ building?.totalUnits || 0 }}</div>
          <div class="dash-kpi__label">Jami unitlar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ building?.occupiedUnits || 0 }}</div>
          <div class="dash-kpi__label">Band</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ building?.vacantUnits || 0 }}</div>
          <div class="dash-kpi__label">Bo'sh</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Building2 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ building?.totalArea?.toLocaleString('ru-RU') || 0 }}<span class="text-sm">m²</span></div>
          <div class="dash-kpi__label">Maydon</div>
        </div>
      </div>
    </div>

    <!-- 3D Digital Twin -->
    <div class="card overflow-hidden twin-card">
      <div class="twin-card__head">
        <div>
          <h3 class="font-semibold text-ink-900 ">Raqamli ikiz (3D model)</h3>
          <p class="text-ink-500 text-xs mt-0.5">Binoning ichki tuzilishi va qavatlar joylashuvi</p>
        </div>
        <span class="badge badge-success text-xs">Faol</span>
      </div>
      <div class="twin-card__body">
        <img src="/buildings/render_3d-exterior.png" alt="3D bino modeli" class="twin-card__img" />
      </div>
    </div>

    <!-- Building units -->
    <div class="card overflow-hidden">
      <div class="px-4 py-3 border-b border-ink-100 ">
        <h3 class="text-sm font-semibold text-ink-900 ">Unitlar ({{ buildingUnits.length }})</h3>
      </div>
      <table class="w-full" v-if="buildingUnits.length">
        <thead>
          <tr class="border-b border-ink-100 ">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Qavat</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Maydon</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Status</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Ijara</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in buildingUnits" :key="u.id" class="border-b border-ink-50  hover:bg-ink-50 ">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 ">{{ u.unitNumber }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ u.floor }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ u.area }} m²</td>
            <td class="px-4 py-3">
              <span class="text-xs px-2 py-1 rounded-full" :class="u.status === 'OCCUPIED' ? 'bg-emerald-500/10 text-emerald-500' : u.status === 'RESERVED' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'">
                {{ statusLabel(u.status) }}
              </span>
            </td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 ">{{ u.monthlyRent?.toLocaleString('ru-RU') || '—' }} {{ u.currency }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="px-4 py-8 text-center text-sm text-ink-400">Unitlar topilmadi</div>
    </div>

    <!-- Building info -->
    <div class="card p-5" v-if="building">
      <h3 class="font-semibold text-ink-900  mb-4">Bino pasporti</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div><div class="text-xs text-ink-500">Tuman</div><div class="font-medium text-ink-900  mt-1">{{ building.district }}</div></div>
        <div><div class="text-xs text-ink-500">Qurilish yili</div><div class="font-medium text-ink-900  mt-1">{{ building.buildYear }}</div></div>
        <div><div class="text-xs text-ink-500">Kadastr</div><div class="font-medium text-ink-900  mt-1">{{ building.cadastralNumber }}</div></div>
        <div><div class="text-xs text-ink-500">Status</div>
          <span class="badge mt-1 text-xs" :class="building.isPublished ? 'badge-success' : 'badge-warning'">{{ building.isPublished ? 'Faol' : 'Qoralama' }}</span>
        </div>
        <div><div class="text-xs text-ink-500">3D model</div><div class="font-medium text-ink-900  mt-1">{{ building.has3dModel ? 'Bor' : 'Yo\'q' }}</div></div>
        <div><div class="text-xs text-ink-500">Qulayliklar</div><div class="font-medium text-ink-900  mt-1">{{ building.amenities?.length || 0 }} ta</div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Layers, Eye , Building2, CheckCircle, FileText, Grid3x3} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'CONTENT_OPERATOR'],  layout: 'admin', middleware: 'role' })

const route = useRoute()
const store = useMakonStore()

const building = computed(() => store.buildings.find(b => b.id === route.params.id))
const buildingUnits = computed(() => store.units.filter(u => u.buildingId === route.params.id))

function statusLabel(s: string) {
  return { OCCUPIED: 'Band', RESERVED: 'Reserv', VACANT: 'Bo\'sh' }[s] || s
}

</script>

<style scoped>
.twin-card__head { display: flex; align-items: flex-start; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border, rgba(0,0,0,0.06)); }
.dark .twin-card__head { border-color: rgba(255,255,255,0.08); }
.twin-card__body { padding: 28px; display: flex; align-items: center; justify-content: center; background: radial-gradient(ellipse at 50% 20%, rgba(37,99,235,0.06), transparent 60%); }
.dark .twin-card__body { background: radial-gradient(ellipse at 50% 20%, rgba(37,99,235,0.1), transparent 60%); }
.twin-card__img { max-width: 340px; width: 100%; height: auto; filter: drop-shadow(0 24px 32px rgba(0,0,0,0.12)); }

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
