<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Binolar</h1>
        <p class="text-ink-500 text-sm mt-0.5">Boshqariladigan ob'ektlar ro'yxati</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" />
        Bino qo'shish
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="b in buildings" :key="b.id" class="card-hover overflow-hidden cursor-pointer">
        <NuxtLink :to="`/management/buildings/${b.id}`">
          <div class="aspect-[16/10] overflow-hidden bg-ink-100 relative">
            <img :src="b.image" :alt="b.name" class="w-full h-full object-cover" />
            <div class="absolute top-3 left-3">
              <span class="badge" :class="b.published ? 'badge-success' : 'badge-neutral'">
                {{ b.published ? 'Nashr qilingan' : 'Qoralama' }}
              </span>
            </div>
          </div>
          <div class="p-5">
            <h3 class="font-semibold text-ink-900 mb-1">{{ b.name }}</h3>
            <p class="text-sm text-ink-400 mb-3 flex items-center gap-1.5">
              <MapPin :size="14" /> {{ b.district }}, {{ b.city }}
            </p>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p class="text-ink-400 text-xs">Qavatlar</p>
                <p class="font-semibold">{{ b.floorsCount }}</p>
              </div>
              <div>
                <p class="text-ink-400 text-xs">Maydon</p>
                <p class="font-semibold">{{ b.totalArea }} m²</p>
              </div>
              <div>
                <p class="text-ink-400 text-xs">Bandlik</p>
                <p class="font-semibold text-emerald-600">{{ b.occupancy }}%</p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, MapPin } from 'lucide-vue-next'

const buildings = [
  { id: 'b1', name: 'Trillant Tower', district: 'Yashnobod', city: 'Toshkent', floorsCount: 12, totalArea: 8500, occupancy: 92, published: true, image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { id: 'b2', name: 'Tashkent City Complex', district: 'Yashnobod', city: 'Toshkent', floorsCount: 18, totalArea: 22000, occupancy: 87, published: true, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { id: 'b3', name: 'Nest One Business', district: 'Sergeli', city: 'Toshkent', floorsCount: 9, totalArea: 6800, occupancy: 95, published: true, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { id: 'b4', name: 'IT Park Tashkent', district: 'Mirzo Ulug\'bek', city: 'Toshkent', floorsCount: 6, totalArea: 4200, occupancy: 88, published: true, image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80' },
  { id: 'b5', name: 'Piramit Center', district: 'Yakkasaroy', city: 'Toshkent', floorsCount: 16, totalArea: 11500, occupancy: 78, published: false, image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800&q=80' },
  { id: 'b6', name: 'Crystal Plaza', district: 'Chilonzor', city: 'Toshkent', floorsCount: 8, totalArea: 5600, occupancy: 84, published: true, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
]
</script>
