<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">ADMIN / BACKUPS</div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Rezerv nusxalar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ backups.length }} nusxa · Oxirgi: {{ backups[0]?.time }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-secondary btn-sm" @click="() => {}"><RotateCcw :size="14" /> Avtomatik: Har 6 soat</button>
        <button @click="createBackup" class="btn btn-primary btn-sm btn-glow"><Plus :size="14" /> Nusxa olish</button>
      </div>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card-premium p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><Database :size="16" class="text-blue-500" /></div>
          <span class="text-xs text-ink-500">Jami hajm</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">1.2<span class="text-xs text-ink-500 font-normal"> GB</span></div>
      </div>
      <div class="card-premium p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><CheckCircle2 :size="16" class="text-emerald-500" /></div>
          <span class="text-xs text-ink-500">Muvaffaqiyatli</span>
        </div>
        <div class="text-xl font-bold text-emerald-500">{{ successCount }}</div>
      </div>
      <div class="card-premium p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><Clock :size="16" class="text-purple-500" /></div>
          <span class="text-xs text-ink-500">Keyingi</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">18:00</div>
      </div>
      <div class="card-premium p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><HardDrive :size="16" class="text-amber-500" /></div>
          <span class="text-xs text-ink-500">Disk</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">12<span class="text-xs text-ink-500 font-normal">%</span></div>
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
import { Plus, Download, RotateCcw, Trash2, Database, CheckCircle2, Clock, HardDrive } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const backups = ref([
  { id: '1', name: 'backup_20260810_1600', type: 'MANUAL', size: '1.2 GB', time: '10 Avg 16:00', status: 'SUCCESS' },
  { id: '2', name: 'backup_20260810_1200', type: 'AUTO', size: '1.2 GB', time: '10 Avg 12:00', status: 'SUCCESS' },
  { id: '3', name: 'backup_20260810_0600', type: 'AUTO', size: '1.2 GB', time: '10 Avg 06:00', status: 'SUCCESS' },
  { id: '4', name: 'backup_20260810_0000', type: 'AUTO', size: '1.1 GB', time: '10 Avg 00:00', status: 'SUCCESS' },
  { id: '5', name: 'backup_20260809_1800', type: 'AUTO', size: '1.1 GB', time: '09 Avg 18:00', status: 'SUCCESS' },
  { id: '6', name: 'backup_20260809_1200', type: 'AUTO', size: '1.1 GB', time: '09 Avg 12:00', status: 'SUCCESS' },
  { id: '7', name: 'backup_20260809_0600', type: 'AUTO', size: '1.1 GB', time: '09 Avg 06:00', status: 'FAILED' },
  { id: '8', name: 'backup_20260809_0000', type: 'AUTO', size: '1.0 GB', time: '09 Avg 00:00', status: 'SUCCESS' },
])

const successCount = computed(() => backups.value.filter(b => b.status === 'SUCCESS').length)

function createBackup() {
  backups.value.unshift({ id: Date.now().toString(), name: 'backup_20260810_1610', type: 'MANUAL', size: '1.2 GB', time: '10 Avg 16:10', status: 'SUCCESS' })
}
</script>
