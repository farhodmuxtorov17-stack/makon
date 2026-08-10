<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div>
        <h1 class="text-3xl font-bold text-ink-900 font-display tracking-tight">Binolar</h1>
        <p class="text-sm text-ink-400 mt-1.5">{{ filtered.length }} ta bino ro'yxatda</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex p-1 rounded-xl bg-ink-100">
          <button
            :class="[
              'btn-icon !rounded-lg !p-2 transition-all',
              view === 'grid' ? 'bg-white shadow-sm text-brand-600' : 'text-ink-400',
            ]"
            @click="view = 'grid'"
          >
            <LayoutGrid :size="16" :stroke-width="1.8" />
          </button>
          <button
            :class="[
              'btn-icon !rounded-lg !p-2 transition-all',
              view === 'table' ? 'bg-white shadow-sm text-brand-600' : 'text-ink-400',
            ]"
            @click="view = 'table'"
          >
            <List :size="16" :stroke-width="1.8" />
          </button>
        </div>
        <button class="btn btn-primary btn-sm shadow-lg shadow-brand-600/20">
          <Plus :size="16" :stroke-width="2" />
          Yangi bino
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1">
        <SearchInput v-model="search" placeholder="Bino nomi bo'yicha qidirish..." />
      </div>
      <select v-model="statusFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha holatlar</option>
        <option value="ACTIVE">Faol</option>
        <option value="MAINTENANCE">Ta'mirda</option>
        <option value="INACTIVE">Nofaol</option>
      </select>
    </div>

    <!-- Grid view with 3D building icons -->
    <div v-if="view === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="(b, i) in pagedBuildings"
        :key="b.id"
        class="card-hover overflow-hidden cursor-pointer group animate-fade-in-up"
        :style="{ animationDelay: i * 50 + 'ms' }"
        @click="navigateTo(`/management/buildings/${b.id}`)"
      >
        <!-- 3D Building visual -->
        <div class="relative h-44 flex items-center justify-center overflow-hidden">
          <!-- Background gradient -->
          <div class="absolute inset-0" :class="buildingBgClass(b)" />
          <!-- Grid pattern overlay -->
          <div class="absolute inset-0 bg-grid-pattern opacity-30" />
          <!-- Glow -->
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-20 blur-2xl"
            :style="{ background: buildingColor(b) }"
          />
          <!-- 3D Building -->
          <div class="relative w-28 h-28 group-hover:scale-110 transition-transform duration-300">
            <Building3DIcon :type="buildingType(b)" :color="buildingColor(b)" :size="120" />
          </div>
          <!-- Status badge -->
          <div class="absolute top-3 right-3"><StatusBadge :status="b.status" :dot="true" /></div>
          <!-- Floor indicator -->
          <div
            class="absolute top-3 left-3 px-2 py-1 rounded-lg bg-white/80 backdrop-blur-sm text-xs font-bold text-ink-600"
          >
            {{ b.floors }} qavat
          </div>
        </div>

        <!-- Info -->
        <div class="p-5">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <p class="font-semibold text-ink-900 truncate">{{ b.name }}</p>
              <p class="text-xs text-ink-400 mt-0.5 truncate flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {{ b.address }}
              </p>
            </div>
          </div>

          <!-- Stats row -->
          <div class="flex items-center gap-3 mt-3.5">
            <div class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-ink-50">
              <svg
                class="w-3.5 h-3.5 text-ink-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span class="text-xs font-semibold text-ink-600">{{ b.unitCount || '—' }} unit</span>
            </div>
            <div class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-ink-50">
              <svg
                class="w-3.5 h-3.5 text-ink-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
              </svg>
              <span class="text-xs font-semibold text-ink-600">{{ listingsCount(b) }} listing</span>
            </div>
          </div>

          <!-- Occupancy bar -->
          <div class="mt-4">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs text-ink-400 font-medium">Bandlik darajasi</span>
              <span class="text-xs font-bold text-ink-900">{{ occupancyPercent(b) }}%</span>
            </div>
            <div class="h-2 rounded-full bg-ink-100 overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                :style="{
                  width: occupancyPercent(b) + '%',
                  background: `linear-gradient(to right, ${buildingColor(b)}, ${buildingColor(b)}dd)`,
                }"
              />
            </div>
          </div>
        </div>
      </div>

      <EmptyState
        v-if="!filtered.length"
        title="Binolar topilmadi"
        description="Filtrlarni o'zgartirib ko'ring"
        icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z"
        class="sm:col-span-2 lg:col-span-3"
      />
      <Pagination
        v-if="filtered.length > perPage"
        :page="page"
        :per-page="perPage"
        :total="filtered.length"
        class="sm:col-span-2 lg:col-span-3"
        @update:page="page = $event"
      />
    </div>

    <!-- Table view -->
    <div v-else class="card hidden md:block">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Bino</th>
              <th>Nomi</th>
              <th>Manzil</th>
              <th>Qavat</th>
              <th>Unit</th>
              <th>Bandlik</th>
              <th>Holat</th>
              <th class="text-right">Amal</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="b in pagedBuildings"
              :key="b.id"
              class="cursor-pointer"
              @click="navigateTo(`/management/buildings/${b.id}`)"
            >
              <td>
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
                  :class="buildingBgClass(b)"
                >
                  <Building3DIcon :type="buildingType(b)" :color="buildingColor(b)" :size="40" />
                </div>
              </td>
              <td class="font-semibold text-ink-900">{{ b.name }}</td>
              <td class="text-ink-400">{{ b.address }}</td>
              <td class="text-ink-400">{{ b.floors }}</td>
              <td class="text-ink-400">{{ b.unitCount || '—' }}</td>
              <td>
                <div class="flex items-center gap-2">
                  <div class="w-20 h-2 rounded-full bg-ink-100 overflow-hidden">
                    <div
                      class="h-full rounded-full"
                      :style="{ width: occupancyPercent(b) + '%', background: buildingColor(b) }"
                    />
                  </div>
                  <span class="text-xs font-semibold text-ink-600">{{ occupancyPercent(b) }}%</span>
                </div>
              </td>
              <td><StatusBadge :status="b.status" :dot="true" /></td>
              <td class="text-right">
                <button
                  class="btn btn-ghost btn-icon"
                  @click.stop="navigateTo(`/management/buildings/${b.id}`)"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        v-if="filtered.length > perPage"
        :page="page"
        :per-page="perPage"
        :total="filtered.length"
        @update:page="page = $event"
      />
      <EmptyState
        v-if="!filtered.length"
        title="Binolar topilmadi"
        description="Filtrlarni o'zgartirib ko'ring"
        icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z"
      />
    </div>

    <!-- Mobile cards -->
    <div v-if="view === 'table'" class="md:hidden space-y-3">
      <div
        v-for="b in pagedBuildings"
        :key="b.id"
        class="card p-4"
        @click="navigateTo(`/management/buildings/${b.id}`)"
      >
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
            :class="buildingBgClass(b)"
          >
            <Building3DIcon :type="buildingType(b)" :color="buildingColor(b)" :size="48" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-ink-900 truncate">{{ b.name }}</p>
            <p class="text-sm text-ink-400 truncate">{{ b.address }}</p>
          </div>
          <StatusBadge :status="b.status" :dot="true" />
        </div>
        <div class="flex items-center gap-4 text-xs text-ink-400">
          <span>{{ b.floors }} qavat</span>
          <span>{{ b.unitCount || '—' }} unit</span>
          <div class="flex items-center gap-1.5">
            <div class="w-14 h-1.5 rounded-full bg-ink-100 overflow-hidden">
              <div
                class="h-full rounded-full"
                :style="{ width: occupancyPercent(b) + '%', background: buildingColor(b) }"
              />
            </div>
            <span class="font-semibold text-ink-600">{{ occupancyPercent(b) }}%</span>
          </div>
        </div>
      </div>
      <EmptyState
        v-if="!filtered.length"
        title="Binolar topilmadi"
        icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, LayoutGrid, List } from 'lucide-vue-next'
import { ref, computed, onMounted } from 'vue'
import { useBuildingStore } from '~/stores/building'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import Pagination from '~/components/ui/Pagination.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Building3DIcon from '~/components/Building3DIcon.vue'

definePageMeta({ middleware: 'auth' })
const buildingStore = useBuildingStore()
onMounted(() => buildingStore.initMockData())

const search = ref('')
const statusFilter = ref('ALL')
const page = ref(1)
const perPage = 9
const view = ref<'grid' | 'table'>('grid')

const filtered = computed(() => {
  let r = buildingStore.buildings
  if (statusFilter.value !== 'ALL') r = r.filter((b) => b.status === statusFilter.value)
  if (search.value)
    r = r.filter(
      (b) =>
        b.name?.toLowerCase().includes(search.value.toLowerCase()) ||
        b.address?.toLowerCase().includes(search.value.toLowerCase())
    )
  return r
})

const pagedBuildings = computed(() =>
  filtered.value.slice((page.value - 1) * perPage, page.value * perPage)
)

function occupancyPercent(b: any) {
  const units = buildingStore.units.filter((u) => u.buildingId === b.id)
  if (!units.length) return 0
  return Math.round(
    (units.filter((u) => ['RENTED', 'SOLD'].includes(u.status)).length / units.length) * 100
  )
}

function listingsCount(b: any) {
  return buildingStore.units.filter((u) => u.buildingId === b.id).length
}

const buildingColors = ['#6356f7', '#10b981', '#f99007', '#0ea5e9', '#f43f5e', '#8b5cf6']

function buildingColor(b: any) {
  const idx = (b.id?.charCodeAt(0) || 0) % buildingColors.length
  return buildingColors[idx]
}

function buildingType(b: any): 'tower' | 'block' | 'complex' {
  if (b.floors >= 12) return 'tower'
  if (b.floors <= 5) return 'block'
  return 'complex'
}

function buildingBgClass(b: any) {
  const c = buildingColor(b)
  const map: Record<string, string> = {
    '#6356f7': 'bg-gradient-to-br from-brand-50 via-white to-brand-50',
    '#10b981': 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50',
    '#f99007': 'bg-gradient-to-br from-gold-50 via-white to-gold-50',
    '#0ea5e9': 'bg-gradient-to-br from-sky-50 via-white to-sky-50',
    '#f43f5e': 'bg-gradient-to-br from-rose-50 via-white to-rose-50',
    '#8b5cf6': 'bg-gradient-to-br from-purple-50 via-white to-purple-50',
  }
  return map[c] || 'bg-gradient-to-br from-ink-50 via-white to-ink-50'
}
</script>
