<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Zaxira nusxalar</h1>
        <p class="text-ink-500 text-sm mt-0.5">Tizim zaxira va tiklash</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="16" /> Yangi zaxira</button>
    </div>

    <div class="card overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr><th>ID</th><th>Turi</th><th>Hajm</th><th>Status</th><th>Sana</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-for="b in backups" :key="b.id">
              <td class="font-mono text-sm">{{ b.id }}</td>
              <td><span class="badge badge-neutral">{{ b.type }}</span></td>
              <td class="font-medium">{{ b.size }}</td>
              <td><span class="badge" :class="b.status === 'VERIFIED' ? 'badge-success' : b.status === 'READY' ? 'badge-info' : 'badge-danger'">{{ statusLabel(b.status) }}</span></td>
              <td class="text-ink-500 text-sm">{{ b.createdAt }}</td>
              <td><button class="btn btn-ghost btn-sm"><Download :size="14" /></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Download } from 'lucide-vue-next'

const backups = [
  { id: 'bkp-2026-0810', type: 'Full', size: '2.4 GB', status: 'VERIFIED', createdAt: '2026-08-10 03:00' },
  { id: 'bkp-2026-0809', type: 'Incremental', size: '128 MB', status: 'VERIFIED', createdAt: '2026-08-09 03:00' },
  { id: 'bkp-2026-0808', type: 'Incremental', size: '95 MB', status: 'VERIFIED', createdAt: '2026-08-08 03:00' },
  { id: 'bkp-2026-0807', type: 'Full', size: '2.3 GB', status: 'FAILED', createdAt: '2026-08-07 03:00' },
  { id: 'bkp-2026-0806', type: 'Incremental', size: '112 MB', status: 'READY', createdAt: '2026-08-06 03:00' },
]

function statusLabel(s: string) {
  return { READY: 'Tayyor', VERIFIED: 'Tasdiqlangan', FAILED: 'Xato' }[s] || s
}
</script>
