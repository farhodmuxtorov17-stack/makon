<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Rezerv nusxalar</h1>
        <p class="text-ink-500 text-sm mt-1">Tizim ma'lumotlari zaxira nusxalari</p>
      </div>
      <button @click="createBackup" class="btn btn-primary btn-sm" :disabled="creating">
        <Plus :size="16" /> {{ creating ? 'Yaratilmoqda...' : 'Yangi nusxa' }}
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card p-4 flex items-center gap-3">
        <Database :size="18" class="text-brand-500" />
        <div><div class="text-sm font-semibold">{{ backups.length }}</div><div class="text-xs text-ink-500">Jami nusxalar</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <HardDrive :size="18" class="text-brand-500" />
        <div><div class="text-sm font-semibold">{{ totalSize }}</div><div class="text-xs text-ink-500">Hajm</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <CheckCircle2 :size="18" class="text-emerald-500" />
        <div><div class="text-sm font-semibold text-emerald-500">{{ lastBackup }}</div><div class="text-xs text-ink-500">Oxirgi nusxa</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <RefreshCw :size="18" class="text-amber-500" />
        <div><div class="text-sm font-semibold text-amber-500">Har kuni 03:00</div><div class="text-xs text-ink-500">Avtomatik</div></div>
      </div>
    </div>

    <!-- Backups list -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">Nomi</th>
              <th class="px-4 py-3">Vaqt</th>
              <th class="px-4 py-3 text-right">Hajm</th>
              <th class="px-4 py-3 text-center">Turi</th>
              <th class="px-4 py-3 text-center">Status</th>
              <th class="px-4 py-3 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in backups" :key="b.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3">
              <td class="px-4 py-3 font-mono text-xs text-ink-900 dark:text-white">{{ b.name }}</td>
              <td class="px-4 py-3 text-ink-500">{{ formatDateTime(b.time) }}</td>
              <td class="px-4 py-3 text-right">{{ b.size }}</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-xs" :class="b.type === 'AUTO' ? 'badge-neutral' : 'badge-brand'">{{ b.type === 'AUTO' ? 'Avtomatik' : 'Qo\'lda' }}</span>
              </td>
              <td class="px-4 py-3 text-center">
                <span class="badge badge-success text-xs">Tayyor</span>
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button class="btn btn-ghost btn-sm" title="Yuklab olish"><Download :size="14" /></button>
                  <button class="btn btn-ghost btn-sm" title="Tiklash"><RotateCcw :size="14" /></button>
                  <button class="btn btn-ghost btn-sm text-red-500" title="O'chirish"><Trash2 :size="14" /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Auto backup settings -->
    <div class="card p-6">
      <h3 class="font-semibold mb-4 text-ink-900 dark:text-white">Avtomatik nusxa sozlamalari</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-ink-900 dark:text-white">Avtomatik nusxa olish</div>
            <div class="text-xs text-ink-500">Har kuni 03:00 da avtomatik nusxa yaratiladi</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="autoBackup" class="sr-only peer">
            <div class="w-11 h-6 bg-black/10 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-ink-900 dark:text-white">Saqlash muddati</div>
            <div class="text-xs text-ink-500">Eski nusxalar avtomatik o'chiriladi</div>
          </div>
          <select class="input w-auto">
            <option>30 kun</option>
            <option>90 kun</option>
            <option>1 yil</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Download, RotateCcw, Trash2, Database, HardDrive, CheckCircle2, RefreshCw } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const creating = ref(false)
const autoBackup = ref(true)

const backups = ref([
  { id: 'bk-1', name: 'backup_2026-08-10_03-00', time: new Date(Date.now() - 36000000), size: '248 MB', type: 'AUTO' },
  { id: 'bk-2', name: 'backup_2026-08-09_03-00', time: new Date(Date.now() - 122400000), size: '246 MB', type: 'AUTO' },
  { id: 'bk-3', name: 'backup_manual_2026-08-08', time: new Date(Date.now() - 208800000), size: '244 MB', type: 'MANUAL' },
  { id: 'bk-4', name: 'backup_2026-08-08_03-00', time: new Date(Date.now() - 295200000), size: '242 MB', type: 'AUTO' },
  { id: 'bk-5', name: 'backup_2026-08-07_03-00', time: new Date(Date.now() - 381600000), size: '240 MB', type: 'AUTO' },
])

const totalSize = computed(() => {
  const sizes = backups.value.map(b => parseInt(b.size))
  const total = sizes.reduce((a, b) => a + b, 0)
  return (total / 1024).toFixed(1) + ' GB'
})

const lastBackup = computed(() => {
  const diff = Date.now() - new Date(backups.value[0].time).getTime()
  const hours = Math.floor(diff / 3600000)
  return hours < 24 ? `${hours} soat oldin` : `${Math.floor(hours / 24)} kun oldin`
})

function createBackup() {
  creating.value = true
  setTimeout(() => {
    backups.value.unshift({
      id: `bk-${Date.now()}`,
      name: `backup_manual_${new Date().toISOString().slice(0, 10)}`,
      time: new Date(),
      size: '250 MB',
      type: 'MANUAL',
    })
    creating.value = false
  }, 1500)
}

function formatDateTime(d: Date) { return new Date(d).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }
</script>
