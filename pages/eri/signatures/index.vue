<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">ERI imzo navbati</h1>
      <p class="text-ink-500 text-sm mt-1">Elektron raqamli imzo so\'rovlari va statuslari</p>
    </div>

    <!-- Status summary -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card p-4"><div class="text-2xl font-bold text-amber-500">{{ pendingCount }}</div><div class="text-xs text-ink-500">Kutilmoqda</div></div>
      <div class="card p-4"><div class="text-2xl font-bold text-emerald-500">{{ signedCount }}</div><div class="text-xs text-ink-500">Imzolangan</div></div>
      <div class="card p-4"><div class="text-2xl font-bold text-red-500">{{ failedCount }}</div><div class="text-xs text-ink-500">Xatolik</div></div>
      <div class="card p-4"><div class="text-2xl font-bold text-brand-500">{{ total }}</div><div class="text-xs text-ink-500">Jami</div></div>
    </div>

    <!-- Queue -->
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
        <h3 class="font-semibold">Imzo so\'rovlari</h3>
        <select class="input w-auto">
          <option>Barcha statuslar</option>
          <option value="PENDING">Kutilmoqda</option>
          <option value="SIGNED">Imzolangan</option>
          <option value="FAILED">Xatolik</option>
        </select>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">Hujjat</th>
              <th class="px-4 py-3">Tomon</th>
              <th class="px-4 py-3 text-center">Navbat</th>
              <th class="px-4 py-3 text-center">Status</th>
              <th class="px-4 py-3">Sertifikat</th>
              <th class="px-4 py-3">Vaqt</th>
              <th class="px-4 py-3 text-right">Amal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sig in signatures" :key="sig.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3">
              <td class="px-4 py-3 font-medium">{{ sig.document }}</td>
              <td class="px-4 py-3">{{ sig.party }}</td>
              <td class="px-4 py-3 text-center text-xs">{{ sig.order }}/2</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-xs" :class="statusBadge(sig.status)">{{ statusLabel(sig.status) }}</span>
              </td>
              <td class="px-4 py-3 text-xs font-mono text-ink-500">{{ sig.cert || '-' }}</td>
              <td class="px-4 py-3 text-xs text-ink-500">{{ sig.time }}</td>
              <td class="px-4 py-3 text-right">
                <button v-if="sig.status === 'FAILED'" class="btn btn-ghost btn-sm text-amber-500" @click="retry(sig)">
                  <RotateCw :size="14" /> Qayta
                </button>
                <button v-if="sig.status === 'PENDING'" class="btn btn-primary btn-sm">
                  <FileSignature :size="14" /> Imzolash
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileSignature, RotateCw } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const signatures = ref([
  { id: 's1', document: 'CTR-2026-003', party: 'Techno Hub MChJ', order: 1, status: 'PENDING', cert: '', time: '2 soat oldin' },
  { id: 's2', document: 'CTR-2026-003', party: 'MAKON Real Estate', order: 2, status: 'WAITING', cert: '', time: '-' },
  { id: 's3', document: 'CTR-2026-005', party: 'ABC Logistics MChJ', order: 1, status: 'SIGNED', cert: 'CN=ABC_LOG', time: '5 soat oldin' },
  { id: 's4', document: 'CTR-2026-005', party: 'MAKON Real Estate', order: 2, status: 'PENDING', cert: '', time: '3 soat oldin' },
  { id: 's5', document: 'CTR-2026-006', party: 'Global Trade MChJ', order: 1, status: 'FAILED', cert: '', time: '1 kun oldin' },
  { id: 's6', document: 'CTR-2026-001', party: 'ABC Logistics MChJ', order: 1, status: 'SIGNED', cert: 'CN=ABC_LOG', time: '2 kun oldin' },
  { id: 's7', document: 'CTR-2026-001', party: 'MAKON Real Estate', order: 2, status: 'SIGNED', cert: 'CN=MAKON_RE', time: '2 kun oldin' },
])

const pendingCount = computed(() => signatures.value.filter(s => s.status === 'PENDING' || s.status === 'WAITING').length)
const signedCount = computed(() => signatures.value.filter(s => s.status === 'SIGNED').length)
const failedCount = computed(() => signatures.value.filter(s => s.status === 'FAILED').length)
const total = computed(() => signatures.value.length)

function statusLabel(s: string) { return { PENDING: 'Kutilmoqda', WAITING: 'Navbatda', SIGNED: 'Imzolangan', FAILED: 'Xatolik' }[s] || s }
function statusBadge(s: string) { return { PENDING: 'badge-warning', WAITING: 'badge-neutral', SIGNED: 'badge-success', FAILED: 'badge-danger' }[s] || 'badge-neutral' }
function retry(sig: any) { sig.status = 'PENDING'; sig.time = 'yangidan yuborildi' }
</script>
