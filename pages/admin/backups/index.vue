<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">ADMIN / BACKUPS</div>
        <div class="eyebrow">ADMIN / BACKUPS</div>
      <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Rezerv nusxalar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ backups.length }} nusxa · Oxirgi: {{ backups[0]?.time }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-secondary btn-sm" @click="() => {}"><RotateCcw :size="14" /> Avtomatik: Har 6 soat</button>
        <button @click="createBackup" class="btn btn-primary btn-sm btn-glow"><Plus :size="14" /> Nusxa olish</button>
      </div>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="kpi-strip kpi-strip--blue">
        <div class="kpi-strip__icon"><Package :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">1.2<span class="text-sm">GB</span></div>
          <div class="kpi-strip__label">Jami hajm</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--emerald">
        <div class="kpi-strip__icon"><CheckCircle :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ successCount }}</div>
          <div class="kpi-strip__label">Muvaffaqiyatli</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--teal">
        <div class="kpi-strip__icon"><PenTool :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">18:00</div>
          <div class="kpi-strip__label">Keyingi nusxa</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--amber">
        <div class="kpi-strip__icon"><AlertCircle :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">12<span class="text-sm">%</span></div>
          <div class="kpi-strip__label">Disk ishlatish</div>
        </div>
      </div>
    </div>

    <!-- Backups table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-4 py-3">Nusxa</th>
              <th class="text-left font-medium px-4 py-3 hidden sm:table-cell">Tur</th>
              <th class="text-right font-medium px-4 py-3 hidden md:table-cell">Hajm</th>
              <th class="text-left font-medium px-4 py-3 hidden md:table-cell">Vaqt</th>
              <th class="text-center font-medium px-4 py-3">Status</th>
              <th class="text-right font-medium px-4 py-3">Amal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in backups" :key="b.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td class="px-4 py-3 font-mono text-xs text-ink-900 dark:text-white">{{ b.name }}</td>
              <td class="px-4 py-3 hidden sm:table-cell">
                <span class="badge text-[10px]" :class="b.type === 'AUTO' ? 'badge-brand' : 'badge-neutral'">{{ b.type === 'AUTO' ? 'Avtomatik' : 'Qo\'lda' }}</span>
              </td>
              <td class="px-4 py-3 text-right hidden md:table-cell text-ink-500">{{ b.size }}</td>
              <td class="px-4 py-3 hidden md:table-cell text-xs text-ink-500 font-mono">{{ b.time }}</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-[10px]" :class="b.status === 'SUCCESS' ? 'badge-success' : 'badge-danger'">
                  {{ b.status === 'SUCCESS' ? 'Tayyor' : 'Xato' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right space-x-1">
                <button class="btn btn-ghost btn-sm px-2" @click="() => {}"><Download :size="14" /></button>
                <button class="btn btn-ghost btn-sm px-2" @click="() => {}"><RotateCcw :size="14" /></button>
                <button class="btn btn-ghost btn-sm px-2 text-red-500" @click="() => {}"><Trash2 :size="14" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Download, RotateCcw, Trash2, Database, CheckCircle2, Clock, HardDrive , AlertCircle, CheckCircle, Package, PenTool} from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const store = useMakonStore()
const backups = computed(() => store.backups)

const successCount = computed(() => backups.value.filter(b => b.status === 'SUCCESS').length)

function createBackup() { store.createBackup() }

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
.kpi-strip__body { flex: 1; min-width: 0; }
.kpi-strip__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.kpi-strip__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }

</style>
