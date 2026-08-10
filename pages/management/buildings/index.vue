<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Binolar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ data?.buildings.length || 0 }} bino ro'yxatdan o'tgan</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" /> Yangi bino
      </button>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <div v-else-if="data" class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-white/5 text-ink-500 text-xs uppercase tracking-widest">
            <th class="text-left font-medium px-4 py-3">Nomi</th>
            <th class="text-left font-medium px-4 py-3 hidden md:table-cell">Turi</th>
            <th class="text-left font-medium px-4 py-3 hidden lg:table-cell">Manzil</th>
            <th class="text-center font-medium px-4 py-3">Bandlik</th>
            <th class="text-center font-medium px-4 py-3 hidden md:table-cell">Unitlar</th>
            <th class="text-center font-medium px-4 py-3 hidden lg:table-cell">Status</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in data.buildings" :key="b.id" class="border-b border-white/5 hover:bg-white/5 transition-colors">
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center">
                  <Building2 :size="16" class="text-brand-400" />
                </div>
                <div>
                  <div class="font-medium">{{ b.name }}</div>
                  <div class="text-xs text-ink-500 md:hidden">{{ b.address }}</div>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 hidden md:table-cell">
              <span class="badge badge-brand">{{ typeLabel(b.type) }}</span>
            </td>
            <td class="px-4 py-3 hidden lg:table-cell text-ink-400">{{ b.address }}</td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <div class="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-brand-500 to-brand-600" :style="{ width: b.occupancyRate + '%' }"></div>
                </div>
                <span class="text-xs font-medium">{{ b.occupancyRate }}%</span>
              </div>
            </td>
            <td class="px-4 py-3 hidden md:table-cell text-center text-ink-400">
              {{ b.occupiedUnits }}/{{ b.totalUnits }}
            </td>
            <td class="px-4 py-3 hidden lg:table-cell text-center">
              <span v-if="b.isPublished" class="badge badge-success">Faol</span>
              <span v-else class="badge badge-neutral">Yashirin</span>
            </td>
            <td class="px-4 py-3 text-right">
              <NuxtLink :to="`/buildings/${b.slug}`" class="btn btn-ghost btn-sm">
                <Eye :size="14" />
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Plus, Eye } from 'lucide-vue-next'
import { BUILDING_TYPE_LABELS } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { fetchAdminData } = useApi()
const { data, pending } = await useAsyncData('admin-buildings', () => fetchAdminData('buildings'))

function typeLabel(type: string) {
  return BUILDING_TYPE_LABELS[type as keyof typeof BUILDING_TYPE_LABELS]?.uz || type
}
</script>
