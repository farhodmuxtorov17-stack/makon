<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Ta'minotchilar</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ suppliers.length }} ta'minotchi</p>
      </div>
      <button class="btn btn-primary btn-sm">+ Yangi</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="s in suppliers" :key="s.id" class="card p-5">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
            <svg
              class="w-5 h-5 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-neutral-900">{{ s.name }}</h3>
            <p class="text-xs text-neutral-500">{{ s.address }}</p>
          </div>
        </div>
        <div class="space-y-1 text-sm">
          <p class="text-neutral-500">{{ s.phone }}</p>
          <p class="text-neutral-500">{{ s.email }}</p>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span v-if="s.contractUrl" class="badge-success">Shartnoma mavjud</span><span v-else class="badge-neutral">Shartnoma yo'q</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useServiceStore } from '~/stores/service'

definePageMeta({ middleware: 'auth' })
const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())
const suppliers = computed(() => serviceStore.suppliers)
</script>
