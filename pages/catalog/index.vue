<template>
  <div class="min-h-screen bg-neutral-50">
    <nav
      class="h-16 bg-white border-b border-neutral-200 px-6 flex items-center justify-between sticky top-0 z-30"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z"
            />
          </svg>
        </div>
        <span class="text-lg font-bold font-display">MAKON</span>
      </div>
      <NuxtLink to="/login" class="btn-primary btn-sm">Kirish</NuxtLink>
    </nav>
    <div class="max-w-7xl mx-auto p-6 space-y-6">
      <div class="text-center py-10">
        <h1 class="text-4xl font-bold font-display text-neutral-900">Ko'chmulk katalogi</h1>
        <p class="text-neutral-500 mt-2">Mavjud binolar va ijara/sotuv takliflari</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="l in published"
          :key="l.id"
          class="card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div
            class="h-44 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center"
          >
            <svg
              class="w-10 h-10 text-primary-300"
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
            <h3 class="font-semibold text-neutral-900">{{ l.titleUz }}</h3>
            <p class="text-sm text-neutral-500 mt-1">{{ l.descriptionUz }}</p>
            <div class="flex items-center justify-between mt-3">
              <span class="text-xl font-bold font-display text-primary-600">{{ formatNumber(l.price) }} so'm</span><span class="badge-info">{{ l.offerType === 'RENT' ? 'Ijara' : 'Sotuv' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useBuildingStore } from '~/stores/building'
import { formatNumber } from '~/utils'

definePageMeta({ layout: 'public' })
const buildingStore = useBuildingStore()
onMounted(() => buildingStore.initMockData())
const published = computed(() => buildingStore.publishedListings)
</script>
