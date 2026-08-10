
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Zaxira nusxa</h1>
        <p class="text-ink-400 text-sm mt-1">Backup va restore</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="14" /> Qo'lda backup</button>
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Turi</th>
              <th>Hajmi</th>
              <th>Holat</th>
              <th>Sana</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in backups" :key="b.id" class="table-row-hover">
              <td><span class="badge" :class="b.type === 'Full' ? 'badge-brand' : 'badge-neutral'">{{ b.type }}</span></td>
              <td class="text-white">{{ b.size }}</td>
              <td><span class="badge" :class="b.status === 'VERIFIED' ? 'badge-success' : b.status === 'FAILED' ? 'badge-danger' : 'badge-warning'">{{ b.status }}</span></td>
              <td class="text-ink-400">{{ formatDateTime(b.createdAt) }}</td>
              <td>
                <button class="btn btn-secondary btn-sm">Verify</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Plus } from 'lucide-vue-next'
const { formatDateTime } = useFormat()

const backups = [
  { id: '1', type: 'Full', size: '2.4 GB', status: 'VERIFIED', createdAt: '2026-08-09T03:00:00Z' },
  { id: '2', type: 'Incremental', size: '124 MB', status: 'VERIFIED', createdAt: '2026-08-08T03:00:00Z' },
  { id: '3', type: 'Incremental', size: '89 MB', status: 'VERIFIED', createdAt: '2026-08-07T03:00:00Z' },
  { id: '4', type: 'Full', size: '2.3 GB', status: 'VERIFIED', createdAt: '2026-08-06T03:00:00Z' },
  { id: '5', type: 'Incremental', size: '67 MB', status: 'FAILED', createdAt: '2026-08-05T03:00:00Z' },
]
</script>
