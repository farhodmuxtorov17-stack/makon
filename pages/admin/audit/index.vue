<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Audit jurnali</h1>
        <p class="text-ink-500 text-sm mt-1">Tizimdagi barcha amallar tarixi</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
        <button class="btn btn-secondary btn-sm"><Filter :size="14" /> Filtr</button>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-3">
      <select v-model="actionFilter" class="input w-auto">
        <option value="">Barcha amallar</option>
        <option value="CREATE">Yaratish</option>
        <option value="UPDATE">Yangilash</option>
        <option value="DELETE">O'chirish</option>
        <option value="LOGIN">Kirish</option>
        <option value="SIGN">Imzolash</option>
      </select>
      <select v-model="entityFilter" class="input w-auto">
        <option value="">Barcha obyektlar</option>
        <option value="BUILDING">Bino</option>
        <option value="APPLICATION">Ariza</option>
        <option value="CONTRACT">Shartnoma</option>
        <option value="INVOICE">Invoys</option>
        <option value="USER">Foydalanuvchi</option>
      </select>
      <input type="date" v-model="dateFilter" class="input w-auto" />
    </div>

    <!-- Audit log -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">Vaqt</th>
              <th class="px-4 py-3">Foydalanuvchi</th>
              <th class="px-4 py-3">Amal</th>
              <th class="px-4 py-3">Obyekt</th>
              <th class="px-4 py-3">Tafsilot</th>
              <th class="px-4 py-3">IP</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in filteredLogs" :key="log.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3">
              <td class="px-4 py-3 text-ink-500 text-xs">{{ formatDateTime(log.time) }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full bg-brand-500/10 flex items-center justify-center text-xs font-bold text-brand-500">{{ log.user.charAt(0) }}</div>
                  <span class="text-ink-900 dark:text-white">{{ log.user }}</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <span class="badge text-xs" :class="actionBadge(log.action)">{{ actionLabel(log.action) }}</span>
              </td>
              <td class="px-4 py-3 text-ink-500">{{ log.entity }}</td>
              <td class="px-4 py-3 text-ink-500 text-xs">{{ log.detail }}</td>
              <td class="px-4 py-3 text-ink-500 text-xs font-mono">{{ log.ip }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 flex items-center justify-between text-xs text-ink-500">
        <span>{{ filteredLogs.length }} yozuv</span>
        <span>30 kunlik tarix</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, Filter } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const actionFilter = ref('')
const entityFilter = ref('')
const dateFilter = ref('')

const logs = ref([
  { id: 'log-1', time: new Date(Date.now() - 3600000), user: 'Bosh Admin', action: 'LOGIN', entity: 'Tizim', detail: 'Tizimga kirish', ip: '213.230.99.12' },
  { id: 'log-2', time: new Date(Date.now() - 7200000), user: 'Dilnoza Karimova', action: 'CREATE', entity: 'INVOYS', detail: 'INV-2026-001 yaratildi', ip: '213.230.99.45' },
  { id: 'log-3', time: new Date(Date.now() - 10800000), user: 'Aziz Toshmatov', action: 'UPDATE', entity: 'ARIZA', detail: 'APP-2026-002 status yangilandi: FINANCE_REVIEW', ip: '91.212.89.34' },
  { id: 'log-4', time: new Date(Date.now() - 14400000), user: 'Bosh Admin', action: 'SIGN', entity: 'SHARTNOMA', detail: 'CTR-2026-001 ERI orqali imzolandi', ip: '213.230.99.12' },
  { id: 'log-5', time: new Date(Date.now() - 18000000), user: 'Sardor Yusupov', action: 'CREATE', entity: 'SERVICE_REQUEST', detail: 'SR-2026-006 yaratildi', ip: '84.54.74.10' },
  { id: 'log-6', time: new Date(Date.now() - 21600000), user: 'Dilnoza Karimova', action: 'UPDATE', entity: 'INVOYS', detail: 'INV-2025-098 tasdiqlandi', ip: '213.230.99.45' },
  { id: 'log-7', time: new Date(Date.now() - 259200000), user: 'Aziz Toshmatov', action: 'DELETE', entity: 'LISTING', detail: 'Listing ochib qoldirildi', ip: '91.212.89.34' },
  { id: 'log-8', time: new Date(Date.now() - 345600000), user: 'Bosh Admin', action: 'UPDATE', entity: 'FOYDALANUVCHI', detail: 'Foydalanuvchi roli ozgartirildi', ip: '213.230.99.12' },
])

const filteredLogs = computed(() => {
  let result = logs.value
  if (actionFilter.value) result = result.filter(l => l.action === actionFilter.value)
  if (entityFilter.value) result = result.filter(l => l.entity.includes(entityFilter.value))
  return result
})

function actionBadge(a: string) { return { CREATE: 'badge-success', UPDATE: 'badge-brand', DELETE: 'badge-danger', LOGIN: 'badge-neutral', SIGN: 'badge-warning' }[a] || 'badge-neutral' }
function actionLabel(a: string) { return { CREATE: 'Yaratish', UPDATE: 'Yangilash', DELETE: 'O\'chirish', LOGIN: 'Kirish', SIGN: 'Imzolash' }[a] || a }
function formatDateTime(d: Date) { return new Date(d).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }
</script>
