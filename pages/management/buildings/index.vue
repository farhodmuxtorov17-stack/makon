<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-ink-900 dark:text-white">Binolar</h1>
      <button class="btn-primary">+ Bino qo'shish</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink v-for="b in buildings" :key="b.id" :to="`/management/buildings/${b.id}`" class="card-premium p-4 hover:shadow-lg transition-shadow">
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="text-sm font-semibold text-ink-900 dark:text-white">{{ b.name }}</h3>
            <p class="text-xs text-ink-400 mt-0.5">{{ b.district }}</p>
          </div>
          <span class="text-xs px-2 py-1 rounded-full" :class="b.isPublished ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'">
            {{ b.isPublished ? 'Faol' : 'Qoralama' }}
          </span>
        </div>
        <div class="flex gap-4 text-xs text-ink-400">
          <span>{{ b.floors }} qavat</span>
          <span>{{ b.totalUnits }} unit</span>
          <span>{{ b.occupancy }}% band</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const buildings = [
  { id: 'f12', name: 'MAKON Business Center', district: "Mirzo Ulug'bek", floors: 12, totalUnits: 240, occupancy: 92, isPublished: true },
  { id: 'f13', name: "Navro'z Business Center", district: 'Yashnabad', floors: 8, totalUnits: 160, occupancy: 85, isPublished: true },
  { id: 'f14', name: 'City Plaza', district: 'Yakkasaray', floors: 6, totalUnits: 120, occupancy: 88, isPublished: true },
  { id: 'f15', name: 'Tashkent Finance Center', district: "Mirzo Ulug'bek", floors: 10, totalUnits: 200, occupancy: 80, isPublished: false },
  { id: 'f16', name: 'Green Park Office', district: 'Sergeli', floors: 5, totalUnits: 80, occupancy: 90, isPublished: true },
]
</script>
