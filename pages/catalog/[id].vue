<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Nav -->
    <nav class="h-16 bg-white border-b border-neutral-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div class="flex items-center gap-3">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" /></svg>
          </div>
          <span class="text-lg font-bold font-display">MAKON</span>
        </NuxtLink>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/catalog" class="text-sm text-neutral-500 hover:text-neutral-900 hidden md:block">Katalog</NuxtLink>
        <NuxtLink to="/login" class="btn-primary btn-sm">Kirish</NuxtLink>
      </div>
    </nav>

    <div v-if="listing && building" class="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-neutral-400">
        <NuxtLink to="/catalog" class="hover:text-neutral-700">Katalog</NuxtLink>
        <span>/</span>
        <span class="text-neutral-700 truncate">{{ listing.titleUz }}</span>
      </div>

      <!-- Photo + 3D render -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 rounded-2xl overflow-hidden relative h-64 md:h-80">
          <img src="/images/building-photo.jpg" alt="" class="w-full h-full object-cover" />
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="badge" :class="listing.offerType === 'RENT' ? 'badge-info' : 'badge-success'">
              {{ listing.offerType === 'RENT' ? 'Ijara' : 'Sotuv' }}
            </span>
            <span class="badge bg-white/90 text-neutral-700">{{ building.name }}</span>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden h-64 md:h-80 bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
          <img src="/images/room-render.jpg" alt="" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Main content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Title block -->
          <div class="card p-5">
            <h1 class="text-2xl font-bold font-display text-neutral-900">{{ listing.titleUz }}</h1>
            <p class="text-sm text-neutral-500 mt-1 flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {{ building.address }}, {{ building.district }}, {{ building.city }}
            </p>
            <div class="flex flex-wrap gap-2 mt-4">
              <span class="px-3 py-1.5 rounded-full bg-neutral-100 text-xs font-medium text-neutral-600">{{ typeLabel(building.type) }}</span>
              <span class="px-3 py-1.5 rounded-full bg-neutral-100 text-xs font-medium text-neutral-600">{{ building.floorsCount }} qavat</span>
              <span class="px-3 py-1.5 rounded-full bg-neutral-100 text-xs font-medium text-neutral-600">{{ formatNumber(building.totalArea) }} m² maydon</span>
              <span class="px-3 py-1.5 rounded-full bg-neutral-100 text-xs font-medium text-neutral-600">{{ listing.viewsCount }} ko'rilgan</span>
            </div>
          </div>

          <!-- Description -->
          <div class="card p-5">
            <h3 class="font-semibold mb-3">Tavsif</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">{{ listing.descriptionUz }}</p>
            <div class="mt-4 pt-4 border-t border-neutral-100">
              <h4 class="text-sm font-semibold mb-2">Binoyning umumiy ma'lumotlari</h4>
              <p class="text-sm text-neutral-500">{{ building.publicDescription }}</p>
            </div>
          </div>

          <!-- Available units -->
          <div class="card">
            <div class="card-header flex items-center justify-between">
              <h3 class="font-semibold">Bo'sh unitlar</h3>
              <span class="text-xs text-neutral-400">{{ availableUnits.length }} ta mavjud</span>
            </div>
            <div class="card-body grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="u in availableUnits"
                :key="u.id"
                :class="['p-4 rounded-xl border-2 cursor-pointer transition-all', selectedUnit === u.id ? 'border-primary-400 bg-primary-50' : 'border-neutral-200 hover:border-primary-300']"
                @click="selectUnit(u.id)"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono font-semibold text-neutral-900">{{ u.number }}</span>
                  <StatusBadge :status="u.status" :dot="true" />
                </div>
                <div class="flex items-center gap-4 text-xs text-neutral-500">
                  <span class="flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 0a4 4 0 00-4 4v0a4 4 0 004 4h0M20 8V4m0 0h-4M20 0a4 4 0 014 4v0a4 4 0 01-4 4h0M4 16v4m0 0h4M4 20a4 4 0 01-4-4v0a4 4 0 014-4h0M20 16v4m0 0h-4M20 20a4 4 0 004-4v0a4 4 0 00-4 4h0" /></svg>
                    {{ u.area }} m²
                  </span>
                  <span>{{ usageLabel(u.usageType) }}</span>
                  <span class="font-medium text-neutral-700">{{ formatNumber(u.basePrice) }} so'm</span>
                </div>
              </div>
              <div v-if="!availableUnits.length" class="md:col-span-2 text-center py-8 text-neutral-400 text-sm">
                Bo'sh unitlar yo'q
              </div>
            </div>
          </div>

          <!-- Floor plan sketch -->
          <div class="card">
            <div class="card-header"><h3 class="font-semibold">Qavat rejasi</h3></div>
            <div class="card-body">
              <svg viewBox="0 0 400 260" class="w-full h-auto rounded-xl bg-neutral-50 border border-neutral-100">
                <rect x="10" y="10" width="380" height="240" fill="none" stroke="#cbd5e1" stroke-width="2" />
                <rect
                  v-for="(room, i) in planRooms"
                  :key="i"
                  :x="room.x" :y="room.y" :width="room.w" :height="room.h"
                  :fill="room.color" fill-opacity="0.12" :stroke="room.color" stroke-width="1.5" rx="4"
                  class="cursor-pointer transition-all"
                />
                <text
                  v-for="(room, i) in planRooms"
                  :key="'t' + i"
                  :x="room.x + room.w / 2" :y="room.y + room.h / 2 - 2"
                  text-anchor="middle" font-size="11" font-weight="600" fill="#334155"
                >{{ room.label }}</text>
                <text
                  v-for="(room, i) in planRooms"
                  :key="'a' + i"
                  :x="room.x + room.w / 2" :y="room.y + room.h / 2 + 14"
                  text-anchor="middle" font-size="9" fill="#94a3b8"
                >{{ room.area }} m²</text>
              </svg>
            </div>
          </div>
        </div>

        <!-- Right: Application form -->
        <div class="space-y-4">
          <div class="card p-5 sticky top-20">
            <h3 class="font-semibold mb-1">Ariza yuborish</h3>
            <p class="text-xs text-neutral-400 mb-4">Quyidagi ma'lumotlarni to'ldiring va ariza yuboring</p>

            <!-- Selected unit summary -->
            <div v-if="selectedUnitData" class="p-3 rounded-xl bg-primary-50 border border-primary-100 mb-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs text-primary-600 font-medium">Tanlangan unit</p>
                  <p class="font-mono font-semibold text-neutral-900">{{ selectedUnitData.number }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-neutral-400">Narx</p>
                  <p class="font-bold text-primary-600">{{ formatNumber(selectedUnitData.basePrice) }}</p>
                </div>
              </div>
            </div>

            <form class="space-y-3" @submit.prevent="submitApplication">
              <div>
                <label class="label">F.I.O *</label>
                <input v-model="appForm.name" class="input" placeholder="Ism Familiya" />
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="label">Telefon *</label>
                  <input v-model="appForm.phone" class="input font-mono text-sm" placeholder="+998 90 123 45 67" />
                </div>
                <div>
                  <label class="label">PINFL *</label>
                  <input v-model="appForm.pinfl" class="input font-mono text-sm" placeholder="14 xona" maxlength="14" />
                </div>
              </div>
              <div>
                <label class="label">Taklif etilgan narx (so'm)</label>
                <input v-model="appForm.price" class="input font-mono" type="number" :placeholder="selectedUnitData ? String(selectedUnitData.basePrice) : ''" />
              </div>
              <div>
                <label class="label">Izoh</label>
                <textarea v-model="appForm.notes" class="input" rows="2" placeholder="Qo'shimcha ma'lumot..."></textarea>
              </div>

              <button type="submit" class="btn-primary w-full" :disabled="!selectedUnitData || submitting">
                <svg v-if="submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                {{ submitting ? "Yuborilmoqda..." : "Ariza yuborish" }}
              </button>
            </form>

            <div v-if="submitResult" class="mt-3 p-3 rounded-xl" :class="submitResult === 'ok' ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'">
              <p class="text-sm flex items-center gap-2">
                <svg v-if="submitResult === 'ok'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {{ submitResult === 'ok' ? "Ariza yuborildi! Tez orada bog'lanamiz." : "Xatolik. Qaytadan urinib ko'ring." }}
              </p>
            </div>

            <div class="mt-4 pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-400">
              <p class="flex items-center gap-2">
                <svg class="w-3.5 h-3.5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                ERI orqali tasdiqlash bilan
              </p>
              <p class="flex items-center gap-2">
                <svg class="w-3.5 h-3.5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Xavfsiz va himoyalangan
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Back -->
      <div class="text-center py-4">
        <NuxtLink to="/catalog" class="text-sm text-neutral-500 hover:text-neutral-900 inline-flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          Katalogga qaytish
        </NuxtLink>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">
      <p class="text-neutral-400 mb-4">Bunday taklif topilmadi</p>
      <NuxtLink to="/catalog" class="btn-primary btn-sm">Katalogga qaytish</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useBuildingStore } from '~/stores/building'
import { formatNumber } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ layout: 'public' })
const route = useRoute()
const buildingStore = useBuildingStore()
onMounted(() => buildingStore.initMockData())

const listing = computed(() => buildingStore.listings.find(l => l.id === route.params.id))
const building = computed(() => listing.value ? buildingStore.buildingById(listing.value.buildingId) : null)
const allUnits = computed(() => building.value ? buildingStore.unitsByBuilding(building.value.id) : [])
const availableUnits = computed(() => allUnits.value.filter(u => ['VACANT', 'DRAFT'].includes(u.status)))

const selectedUnit = ref<string | null>(null)
const selectedUnitData = computed(() => availableUnits.value.find(u => u.id === selectedUnit.value))

function selectUnit(id: string) {
  selectedUnit.value = selectedUnit.value === id ? null : id
}

const appForm = reactive({ name: '', phone: '', pinfl: '', price: '', notes: '' })
const submitting = ref(false)
const submitResult = ref<'ok' | 'error' | ''>('')

function submitApplication() {
  if (!selectedUnit.value || !appForm.name || !appForm.phone) {
    submitResult.value = 'error'
    return
  }
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    submitResult.value = 'ok'
    appForm.name = ''
    appForm.phone = ''
    appForm.pinfl = ''
    appForm.price = ''
    appForm.notes = ''
    selectedUnit.value = null
    setTimeout(() => { submitResult.value = '' }, 5000)
  }, 1000)
}

const roomColors = ['#6366f1', '#14b8a6', '#f59e0b', '#ec4899', '#22c55e', '#0ea5e9']
const planRooms = computed(() => {
  const source = availableUnits.value.slice(0, 6)
  const layout = [
    { x: 20, y: 20, w: 160, h: 100 },
    { x: 190, y: 20, w: 190, h: 60 },
    { x: 190, y: 90, w: 90, h: 90 },
    { x: 290, y: 90, w: 90, h: 90 },
    { x: 20, y: 130, w: 160, h: 100 },
  ]
  return source.map((u, i) => ({
    ...layout[i % layout.length],
    label: u.number,
    area: u.area,
    color: roomColors[i % roomColors.length],
  }))
})

const usageLabel = (t: string) => ({ OFFICE: 'Ofis', RETAIL: 'Savdo', WAREHOUSE: 'Ombor', RESIDENTIAL: 'Turar', PARKING: 'Parkovka', MIXED: 'Aralash' } as Record<string, string>)[t] || t
const typeLabel = (t: string) => ({ BUSINESS_CENTER: 'Biznes markaz', OFFICE: 'Ofis', SHOPPING: 'Savdo', WAREHOUSE: 'Ombor', RESIDENTIAL: 'Turar joy', MIXED: 'Aralash' } as Record<string, string>)[t] || t
</script>
