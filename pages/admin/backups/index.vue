<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Backup</h1>
        <p class="text-sm text-ink-500 mt-1">{{ backups.length }} backup</p>
      </div>
      <button class="btn btn-primary btn-sm">+ Yangi backup</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
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
            <tr v-for="b in backups" :key="b.id">
              <td>
                <span :class="b.type === 'Full' ? 'badge badge-info' : 'badge badge-neutral'">{{
                  b.type
                }}</span>
              </td>
              <td class="font-mono">{{ b.size }}</td>
              <td><StatusBadge :status="b.status" :dot="true" /></td>
              <td class="text-ink-500 text-xs">{{ formatDate(b.createdAt) }}</td>
              <td>
                <button v-if="b.status === 'READY'" class="btn btn-ghost btn-sm">
                  Yuklab olish
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
import { ref } from 'vue'
import { formatDate } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ middleware: 'auth' })
const backups = ref([
  { id: '1', type: 'Full', size: '2.4 GB', status: 'READY', createdAt: '2025-08-03T00:00:00' },
  {
    id: '2',
    type: 'Incremental',
    size: '145 MB',
    status: 'READY',
    createdAt: '2025-08-04T00:00:00',
  },
  {
    id: '3',
    type: 'Incremental',
    size: '89 MB',
    status: 'READY',
    createdAt: '2025-08-05T00:00:00',
  },
  {
    id: '4',
    type: 'Incremental',
    size: '210 MB',
    status: 'VERIFIED',
    createdAt: '2025-08-06T00:00:00',
  },
  { id: '5', type: 'Full', size: '2.5 GB', status: 'FAILED', createdAt: '2025-08-07T00:00:00' },
])
</script>
