<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display text-ink-900">Ta'minotchilar</h1>
        <p class="text-sm text-ink-500 mt-1">{{ suppliers.length }} ta'minotchi</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" :stroke-width="2" />
        Yangi
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="s in suppliers" :key="s.id" class="card p-5">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
            <Truck :size="18" :stroke-width="2" class="text-brand-600" />
          </div>
          <div>
            <h3 class="font-semibold text-ink-900">{{ s.name }}</h3>
            <p class="text-xs text-ink-500">{{ s.address }}</p>
          </div>
        </div>
        <div class="space-y-1 text-sm">
          <p class="text-ink-500 flex items-center gap-1.5">
            <Phone :size="13" :stroke-width="2" /> {{ s.phone }}
          </p>
          <p class="text-ink-500 flex items-center gap-1.5">
            <Mail :size="13" :stroke-width="2" /> {{ s.email }}
          </p>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span v-if="s.contractUrl" class="badge badge-success">
            <FileCheck2 :size="12" :stroke-width="2" />
            Shartnoma mavjud
          </span>
          <span v-else class="badge badge-neutral">Shartnoma yo'q</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Plus, Truck, Phone, Mail, FileCheck2 } from 'lucide-vue-next'
import { useServiceStore } from '~/stores/service'

definePageMeta({ middleware: 'auth' })
const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())
const suppliers = computed(() => serviceStore.suppliers)
</script>
