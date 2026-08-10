<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold font-display">Hisobotlar</h1>
        <p class="text-sm text-ink-500 mt-1">Avtomatik hisobotlar va eksport</p>
      </div>
      <button class="btn btn-secondary btn-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3M4 20h16"
          />
        </svg>
        Eksport
      </button>
    </div>

    <!-- Report types -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="r in reportTypes"
        :key="r.title"
        class="card p-5 hover:shadow-md transition-all duration-200 cursor-pointer group"
      >
        <div
          :class="[
            'w-11 h-11 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform',
            r.color,
          ]"
        >
          <svg
            class="w-5 h-5"
            :class="r.iconColor"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="r.icon" />
          </svg>
        </div>
        <h3 class="font-semibold text-ink-900 group-hover:text-brand-600 transition-colors">
          {{ r.title }}
        </h3>
        <p class="text-sm text-ink-500 mt-1">{{ r.description }}</p>
        <div class="flex items-center gap-2 mt-4">
          <button class="btn btn-secondary btn-sm">PDF</button>
          <button class="btn btn-secondary btn-sm">XLSX</button>
          <button class="btn btn-secondary btn-sm">CSV</button>
        </div>
      </div>
    </div>

    <!-- Recent exports -->
    <div class="card">
      <div class="px-5 py-4 border-b border-ink-100">
        <h3 class="font-semibold">So'nggi eksportlar</h3>
      </div>
      <!-- Desktop -->
      <div class="table-wrapper hidden md:block">
        <table class="table">
          <thead>
            <tr>
              <th>Turi</th>
              <th>Format</th>
              <th>Holat</th>
              <th>Sana</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in exports" :key="e.id">
              <td class="font-medium">{{ e.type }}</td>
              <td>
                <span class="badge badge-neutral">{{ e.format }}</span>
              </td>
              <td><StatusBadge :status="e.status" :dot="true" /></td>
              <td class="text-ink-500 text-xs">{{ formatDate(e.createdAt) }}</td>
              <td>
                <button v-if="e.fileUrl" class="btn btn-ghost btn-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Yuklab olish
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Mobile -->
      <div class="md:hidden divide-y divide-ink-50">
        <div v-for="e in exports" :key="e.id" class="p-4 flex items-center justify-between">
          <div>
            <p class="font-medium text-sm">{{ e.type }}</p>
            <p class="text-xs text-ink-400 mt-0.5">{{ formatDate(e.createdAt) }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="badge badge-neutral">{{ e.format }}</span><StatusBadge :status="e.status" :dot="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ middleware: 'auth' })
const reportTypes = [
  {
    title: 'Daromad hisoboti',
    description: 'Oylik/kvartal/yillik daromad',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2',
    color: 'bg-success-50',
    iconColor: 'text-success-600',
  },
  {
    title: 'Bandlik hisoboti',
    description: 'Bino va unit bandligi',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z',
    color: 'bg-brand-50',
    iconColor: 'text-brand-600',
  },
  {
    title: 'Shartnoma hisoboti',
    description: "Faol va muddati o'tgan shartnomalar",
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586',
    color: 'bg-info-50',
    iconColor: 'text-info-600',
  },
  {
    title: 'Servis hisoboti',
    description: 'Ish buyruqlari va xarajatlar',
    icon: 'M11.42 7.83a6 6 0 015.68 1.78l2.12 2.12a6 6 0 11-8.49 8.49l-1.5-1.5',
    color: 'bg-warning-50',
    iconColor: 'text-warning-600',
  },
  {
    title: 'Ombor hisoboti',
    description: 'Zaxira va harakatlar',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2',
    color: 'bg-accent-50',
    iconColor: 'text-accent-600',
  },
  {
    title: 'Hisoblagich hisoboti',
    description: 'Energiya sarfini hisoboti',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: 'bg-danger-50',
    iconColor: 'text-danger-600',
  },
]
const exports = ref([
  {
    id: '1',
    type: 'Daromad (Iyun 2025)',
    format: 'PDF',
    status: 'READY',
    fileUrl: 'report1.pdf',
    createdAt: '2025-07-01',
  },
  {
    id: '2',
    type: 'Bandlik (Q2 2025)',
    format: 'XLSX',
    status: 'READY',
    fileUrl: 'report2.xlsx',
    createdAt: '2025-07-02',
  },
  {
    id: '3',
    type: 'Servis xarajat',
    format: 'CSV',
    status: 'PENDING',
    fileUrl: null,
    createdAt: '2025-07-03',
  },
])
</script>
