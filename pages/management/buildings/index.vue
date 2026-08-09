<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 font-display">Binolar reyestri</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ buildingStore.buildings.length }} bino</p>
      </div>
      <button class="btn-primary btn-sm" @click="showCreate = true">+ Yangi bino</button>
    </div>

    <div class="card">
      <div class="card-body flex flex-wrap gap-3">
        <input
          v-model="filters.search"
          class="input flex-1 min-w-[200px]"
          placeholder="Qidiruv..."
        />
        <select v-model="filters.type" class="input w-44 cursor-pointer">
          <option value="">Barcha turlar</option>
          <option v-for="t in types" :key="t.value" :value="t.value">{{ t.label }}</option>
        </select>
      </div>
    </div>

    <div class="card">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Nomi</th>
              <th>Turi</th>
              <th>Manzil</th>
              <th>Maydon</th>
              <th>Qavat</th>
              <th>Holat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="b in filtered"
              :key="b.id"
              class="cursor-pointer"
              @click="navigateTo(`/management/buildings/${b.id}`)"
            >
              <td class="font-medium text-neutral-900">{{ b.name }}</td>
              <td class="text-neutral-500">{{ typeLabel(b.type) }}</td>
              <td class="text-neutral-500">{{ b.address }}, {{ b.city }}</td>
              <td class="font-mono">{{ formatNumber(b.totalArea) }} m²</td>
              <td class="text-neutral-500">{{ b.floorsCount }}</td>
              <td><StatusBadge :status="b.isPublished ? 'PUBLISHED' : 'DRAFT'" :dot="true" /></td>
              <td class="text-right">
                <svg
                  class="w-4 h-4 text-neutral-400 inline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Modal v-model="showCreate" title="Yangi bino" size="lg" @close="showCreate = false">
      <div class="space-y-4">
        <div><label class="label">Nomi</label><input v-model="form.name" class="input" /></div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">Turi</label><select v-model="form.type" class="input cursor-pointer">
              <option v-for="t in types" :key="t.value" :value="t.value">{{ t.label }}</option>
            </select>
          </div>
          <div>
            <label class="label">Tuman</label><input v-model="form.district" class="input" />
          </div>
        </div>
        <div><label class="label">Manzil</label><input v-model="form.address" class="input" /></div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">Maydon (m²)</label><input v-model="form.totalArea" type="number" class="input" />
          </div>
          <div>
            <label class="label">Qavatlar</label><input v-model="form.floorsCount" type="number" class="input" />
          </div>
        </div>
      </div>
      <template #footer>
        <button class="btn-secondary" @click="showCreate = false">Bekor</button>
        <button class="btn-primary" @click="handleCreate">Saqlash</button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useBuildingStore } from '~/stores/building'
import { formatNumber } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import Modal from '~/components/ui/Modal.vue'

definePageMeta({ middleware: 'auth' })
const buildingStore = useBuildingStore()
onMounted(() => buildingStore.initMockData())
const showCreate = ref(false)
const filters = reactive({ search: '', type: '' })
const form = reactive({
  name: '',
  type: 'BUSINESS_CENTER',
  address: '',
  district: '',
  totalArea: 0,
  floorsCount: 1,
})
const types = [
  { label: 'Biznes markaz', value: 'BUSINESS_CENTER' },
  { label: 'Ofis', value: 'OFFICE' },
  { label: 'Savdo', value: 'SHOPPING' },
  { label: 'Ombor', value: 'WAREHOUSE' },
  { label: 'Turar joy', value: 'RESIDENTIAL' },
  { label: 'Aralash', value: 'MIXED' },
]
const filtered = computed(() => {
  let r = buildingStore.buildings
  if (filters.search) {
    const q = filters.search.toLowerCase()
    r = r.filter((b) => b.name.toLowerCase().includes(q) || b.address.toLowerCase().includes(q))
  }
  if (filters.type) r = r.filter((b) => b.type === filters.type)
  return r
})
const typeLabel = (t: string) =>
  ({
    BUSINESS_CENTER: 'Biznes markaz',
    OFFICE: 'Ofis',
    SHOPPING: 'Savdo',
    WAREHOUSE: 'Ombor',
    RESIDENTIAL: 'Turar joy',
    MIXED: 'Aralash',
  })[t] || t
function handleCreate() {
  buildingStore.addBuilding({
    ...form,
    totalArea: Number(form.totalArea),
    floorsCount: Number(form.floorsCount),
  })
  showCreate.value = false
  Object.assign(form, { name: '', address: '', totalArea: 0, floorsCount: 1 })
}
</script>
