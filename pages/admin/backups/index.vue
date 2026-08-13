<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">Rezerv nusxa</div>
      <h1 class="page-title">Rezerv nusxalar</h1>
        <p class="page-sub">{{ backups.length }} nusxa · Oxirgi: {{ backups[0]?.time }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-secondary btn-sm" @click="() => {}"><RotateCcw :size="14" /> Avtomatik: Har 6 soat</button>
        <button @click="createBackup" class="btn btn-primary btn-sm btn-glow"><Plus :size="14" /> Nusxa olish</button>
      </div>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Package :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">1.2<span class="text-sm">GB</span></div>
          <div class="dash-kpi__label">Jami hajm</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ successCount }}</div>
          <div class="dash-kpi__label">Muvaffaqiyatli</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><PenTool :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">18:00</div>
          <div class="dash-kpi__label">Keyingi nusxa</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><AlertCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">12<span class="text-sm">%</span></div>
          <div class="dash-kpi__label">Disk ishlatish</div>
        </div>
      </div>
    </div>

    <!-- Backups table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5  text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-4 py-3">Nusxa</th>
              <th class="text-left font-medium px-4 py-3 hidden sm:table-cell">Tur</th>
              <th class="text-right font-medium px-4 py-3 hidden md:table-cell">Hajm</th>
              <th class="text-left font-medium px-4 py-3 hidden md:table-cell">Vaqt</th>
              <th class="text-center font-medium px-4 py-3">Status</th>
              <th class="text-right font-medium px-4 py-3">Amal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in backups" :key="b.id" class="border-b border-black/5  hover:bg-black/5  transition-colors">
              <td class="px-4 py-3 font-mono text-xs text-ink-900 ">{{ b.name }}</td>
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

definePageMeta({ roles: ['SUPER_HEAD', 'ADMIN'],  layout: 'admin', middleware: 'role' })

const store = useMakonStore()
const backups = computed(() => store.backups)

const successCount = computed(() => backups.value.filter(b => b.status === 'SUCCESS').length)

function createBackup() { store.createBackup() }

</script>


