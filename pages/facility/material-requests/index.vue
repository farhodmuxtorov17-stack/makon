<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Material so'rovlari</h1>
        <p class="text-sm text-ink-500 mt-1">Work orderlar uchun materiallar zaruriyati</p>
      </div>
      <button class="btn btn-primary btn-sm" @click="showNew = !showNew">
        <Plus :size="16" /> Yangi so'rov
      </button>
    </div>

    <!-- New request form -->
    <div v-if="showNew" class="card p-6 space-y-4">
      <h3 class="font-semibold">Yangi material so'rovi</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="label">Work order</label>
          <select v-model="newReq.workOrderId" class="input">
            <option value="">Tanlang...</option>
            <option v-for="w in workOrders" :key="w.id" :value="w.id">{{ w.number }}</option>
          </select>
        </div>
        <div>
          <label class="label">Material</label>
          <select v-model="newReq.materialId" class="input">
            <option value="">Tanlang...</option>
            <option v-for="m in materials" :key="m.id" :value="m.id">{{ m.name }} (qoldiq: {{ m.stock }} {{ m.unit }})</option>
          </select>
        </div>
        <div>
          <label class="label">Miqdori</label>
          <input v-model.number="newReq.quantity" type="number" min="1" class="input" placeholder="0" />
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-primary btn-sm" @click="createReq">Yuborish</button>
        <button class="btn btn-secondary btn-sm" @click="showNew = false">Bekor qilish</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">Jami so'rovlar</div>
        <div class="text-2xl font-bold">{{ requests.length }}</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">Tasdiqlangan</div>
        <div class="text-2xl font-bold text-emerald-400">{{ requests.filter(r => r.status === 'APPROVED').length }}</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">Kutilmoqda</div>
        <div class="text-2xl font-bold text-amber-400">{{ requests.filter(r => r.status === 'PENDING').length }}</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-500 mb-1">Rad etilgan</div>
        <div class="text-2xl font-bold text-red-400">{{ requests.filter(r => r.status === 'REJECTED').length }}</div>
      </div>
    </div>

    <!-- Requests table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-ink-50 dark:bg-ink-900/50 text-ink-500">
            <tr>
              <th class="text-left px-4 py-3 font-medium">Nomer</th>
              <th class="text-left px-4 py-3 font-medium">Work order</th>
              <th class="text-left px-4 py-3 font-medium">Material</th>
              <th class="text-left px-4 py-3 font-medium">Miqdori</th>
              <th class="text-left px-4 py-3 font-medium">Omborchi</th>
              <th class="text-left px-4 py-3 font-medium">Status</th>
              <th class="text-left px-4 py-3 font-medium">Sana</th>
              <th class="text-left px-4 py-3 font-medium">Amal</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-ink-100 dark:divide-ink-800">
            <tr v-for="r in requests" :key="r.id" class="hover:bg-ink-50 dark:hover:bg-ink-900/30">
              <td class="px-4 py-3 font-mono text-xs">{{ r.number }}</td>
              <td class="px-4 py-3 font-mono text-xs">{{ r.workOrderNumber }}</td>
              <td class="px-4 py-3">{{ r.materialName }}</td>
              <td class="px-4 py-3">{{ r.quantity }} {{ r.unit }}</td>
              <td class="px-4 py-3">{{ r.requestedBy }}</td>
              <td class="px-4 py-3">
                <span class="badge" :class="statusClass(r.status)">{{ statusLabel(r.status) }}</span>
              </td>
              <td class="px-4 py-3 text-ink-500">{{ r.date }}</td>
              <td class="px-4 py-3">
                <button v-if="r.status === 'PENDING'" class="text-emerald-500 hover:text-emerald-600 text-xs font-medium mr-2" @click="r.status = 'APPROVED'">Tasdiqlash</button>
                <button v-if="r.status === 'PENDING'" class="text-red-500 hover:text-red-600 text-xs font-medium" @click="r.status = 'REJECTED'">Rad etish</button>
                <span v-else class="text-ink-400 text-xs">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

definePageMeta({ layout: 'admin' })

const showNew = ref(false)

const newReq = reactive({ workOrderId: '', materialId: '', quantity: 0 })

const workOrders = [
  { id: 1, number: 'WO-2026-001' },
  { id: 2, number: 'WO-2026-002' },
  { id: 5, number: 'WO-2026-005' },
]

const materials = [
  { id: 'm1', name: 'PPR quvur 25mm', stock: 120, unit: 'm' },
  { id: 'm2', name: 'Kabel 3x2.5', stock: 45, unit: 'm' },
  { id: 'm3', name: 'Konditsioner filtri', stock: 8, unit: 'dona' },
  { id: 'm4', name: "Bo'yoq (oq)", stock: 15, unit: 'l' },
  { id: 'm5', name: 'Cement M400', stock: 3, unit: 'qop' },
]

const requests = ref([
  { id: 1, number: 'MR-001', workOrderNumber: 'WO-2026-001', materialName: 'PPR quvur 25mm', quantity: 10, unit: 'm', requestedBy: 'Akmal Sodiqov', status: 'APPROVED', date: '2026-08-08' },
  { id: 2, number: 'MR-002', workOrderNumber: 'WO-2026-002', materialName: 'Kabel 3x2.5', quantity: 15, unit: 'm', requestedBy: 'Bekzod Aliyev', status: 'PENDING', date: '2026-08-09' },
  { id: 3, number: 'MR-003', workOrderNumber: 'WO-2026-005', materialName: 'Konditsioner filtri', quantity: 2, unit: 'dona', requestedBy: 'Dilshod Karimov', status: 'PENDING', date: '2026-08-10' },
  { id: 4, number: 'MR-004', workOrderNumber: 'WO-2026-003', materialName: "Bo'yoq (oq)", quantity: 5, unit: 'l', requestedBy: 'Akmal Sodiqov', status: 'REJECTED', date: '2026-08-06' },
])

function createReq() {
  const wo = workOrders.find(w => w.id == newReq.workOrderId)
  const mat = materials.find(m => m.id === newReq.materialId)
  requests.value.unshift({
    id: Date.now(),
    number: `MR-${String(requests.value.length + 1).padStart(3, '0')}`,
    workOrderNumber: wo?.number || '—',
    materialName: mat?.name || '—',
    quantity: newReq.quantity,
    unit: mat?.unit || '',
    requestedBy: 'Tizim',
    status: 'PENDING',
    date: new Date().toISOString().split('T')[0],
  })
  showNew.value = false
  newReq.workOrderId = ''; newReq.materialId = ''; newReq.quantity = 0
}

function statusLabel(s: string) {
  return { PENDING: 'Kutilmoqda', APPROVED: 'Tasdiqlangan', REJECTED: 'Rad etilgan', FULFILLED: 'Berilgan' }[s] || s
}
function statusClass(s: string) {
  return { PENDING: 'badge-warning', APPROVED: 'badge-success', REJECTED: 'badge-error', FULFILLED: 'badge-info' }[s] || ''
}
</script>
