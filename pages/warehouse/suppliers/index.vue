<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Ta'minchilar</h1>
        <p class="text-ink-500 text-sm mt-0.5">Yetkazib beruvchilar va kontraktlar</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" />
        Ta'minchi qo'shish
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="sup in serviceStore.suppliers" :key="sup.id" class="card p-5">
        <div class="flex items-start gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
            <Truck :size="22" class="text-brand-600" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-ink-900 truncate">{{ sup.name }}</h3>
            <p class="text-sm text-ink-400 truncate">{{ sup.address }}</p>
          </div>
        </div>
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2 text-ink-600">
            <Phone :size="14" class="text-ink-400" />
            {{ sup.phone }}
          </div>
          <div class="flex items-center gap-2 text-ink-600">
            <Mail :size="14" class="text-ink-400" />
            {{ sup.email }}
          </div>
        </div>
        <div class="mt-4 pt-3 border-t border-ink-50">
          <span v-if="sup.contractUrl" class="badge badge-success">
            <FileCheck :size="14" />
            Kontrakt mavjud
          </span>
          <span v-else class="badge badge-neutral">
            <FileX :size="14" />
            Kontrakt yo'q
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Truck, Phone, Mail, FileCheck, FileX } from 'lucide-vue-next'

const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())
</script>
