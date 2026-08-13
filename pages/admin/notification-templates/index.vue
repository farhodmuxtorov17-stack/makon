<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">Bildirishnoma shablonlari</div>
      <h1 class="page-title">Bildirishnoma shablonlari</h1>
        <p class="text-ink-500 text-sm mt-1">{{ templates.length }} ta shablon · {{ activeCount }} faol</p>
      </div>
      <button class="btn btn-primary btn-sm btn-glow" @click="() => {}"><Plus :size="14" /> Yangi shablon</button>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ templates.length }}</div>
          <div class="dash-kpi__label">Jami shablonlar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ activeCount }}</div>
          <div class="dash-kpi__label">Faol</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><AlertCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ inactiveCount }}</div>
          <div class="dash-kpi__label">Faol emas</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileSignature :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ channels }}</div>
          <div class="dash-kpi__label">Kanallar</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="tpl in templates" :key="tpl.id" class="card-premium p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="tpl.active ? 'bg-emerald-500/10' : 'bg-ink-500/10'">
              <component :is="tpl.icon" :size="18" :class="tpl.active ? 'text-emerald-500' : 'text-ink-400'" />
            </div>
            <div>
              <div class="font-semibold text-sm text-ink-900 ">{{ tpl.event }}</div>
              <div class="text-xs text-ink-500">{{ tpl.channel }}</div>
            </div>
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="tpl.active" />
            <span class="toggle__slider"></span>
          </label>
        </div>

        <div class="space-y-2 mt-4">
          <div class="template-lang">
            <span class="badge badge-brand text-[10px]">UZ</span>
            <p class="text-sm text-ink-700  mt-1">{{ tpl.textUz }}</p>
          </div>
          <div class="template-lang">
            <span class="badge badge-neutral text-[10px]">RU</span>
            <p class="text-sm text-ink-700  mt-1">{{ tpl.textRu }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between mt-4 pt-3 border-t border-black/5 ">
          <span class="text-xs text-ink-400">{{ tpl.variables.length }} ta o'zgaruvchi</span>
          <button class="btn btn-ghost btn-sm text-xs" @click="() => {}"><Edit3 :size="12" /> Tahrir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, FileText, Receipt, ShieldCheck, Wrench, FileSignature, Bell , AlertCircle, CheckCircle} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'ADMIN'],  layout: 'admin', middleware: 'role' })

const makonStore = useMakonStore()

const iconMap: Record<string, any> = { FileText, Receipt, ShieldCheck, Wrench, FileSignature, Bell }

const templates = computed(() =>
  makonStore.notificationTemplates.map(t => ({ ...t, icon: iconMap[t.iconName] || FileText }))
)

const activeCount = computed(() => templates.value.filter(t => t.active).length)
const inactiveCount = computed(() => templates.value.filter(t => !t.active).length)
const channels = computed(() => 3)

</script>
<style scoped>
.toggle { position: relative; display: inline-block; width: 40px; height: 22px; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle__slider {
  position: absolute; cursor: pointer; inset: 0;
  background: rgba(0,0,0,0.1); border-radius: 22px; transition: 0.2s;
}
.dark .toggle__slider { background: rgba(255,255,255,0.1); }
.toggle__slider::before {
  position: absolute; content: ''; height: 16px; width: 16px;
  left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.2s;
}
.toggle input:checked + .toggle__slider { background: var(--accent); }
.toggle input:checked + .toggle__slider::before { transform: translateX(18px); }
.template-lang { padding: 8px; border-radius: 10px; background: rgba(0,0,0,0.02); }
.dark .template-lang { background: rgba(255,255,255,0.02); }
</style>

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
