<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Listinglar</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ listings.length }} listing</p>
      </div>
      <button class="btn btn-primary btn-sm">+ Yangi listing</button>
    </div>
    <div class="card">
      <div class="card-body flex gap-3">
        <input v-model="search" class="input flex-1" placeholder="Qidiruv..." />
        <select v-model="statusFilter" class="input w-40 cursor-pointer">
          <option value="">Hammasi</option>
          <option value="PUBLISHED">Nashr</option>
          <option value="DRAFT">Qoralama</option>
          <option value="PAUSED">To'xtatilgan</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="l in filtered"
        :key="l.id"
        class="card hover:shadow-md transition-shadow cursor-pointer"
      >
        <div
          class="h-40 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center"
        >
          <svg
            class="w-10 h-10 text-neutral-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div class="p-4">
          <div class="flex items-center justify-between mb-2">
            <StatusBadge :status="l.status" :dot="true" /><span class="text-xs text-neutral-400">{{ l.viewsCount }} ko'rish</span>
          </div>
          <h3 class="font-semibold text-sm text-neutral-900">{{ l.titleUz }}</h3>
          <p class="text-xs text-neutral-500 mt-1 line-clamp-2">{{ l.descriptionUz }}</p>
          <div class="flex items-center justify-between mt-3">
            <span class="text-lg font-bold font-display text-primary-600">{{ formatNumber(l.price) }} so'm</span>
            <span class="badge-neutral">{{
              l.offerType === 'RENT' ? 'Ijara' : l.offerType === 'SALE' ? 'Sotuv' : 'Ijara/Sotuv'
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBuildingStore } from '~/stores/building'
import { formatNumber } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ middleware: 'auth' })
const buildingStore = useBuildingStore()
onMounted(() => buildingStore.initMockData())
const search = ref('')
const statusFilter = ref('')
const listings = computed(() => buildingStore.listings)
const filtered = computed(() => {
  let r = listings.value
  if (search.value) {
    const q = search.value.toLowerCase()
    r = r.filter((l) => l.titleUz.toLowerCase().includes(q))
  }
  if (statusFilter.value) r = r.filter((l) => l.status === statusFilter.value)
  return r
})
</script>
