<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Mening unitlarim</h1>
        <p class="text-ink-500 text-sm mt-1">{{ units.length }} ta unit · {{ totalArea }} m² jami maydon</p>
      </div>
      <NuxtLink to="/catalog" class="btn btn-primary btn-sm btn-glow"><Plus :size="14" /> Yangi ariza</NuxtLink>
    </div>

    <!-- Unit cards grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="unit in units" :key="unit.id" class="unit-detail-card">
        <!-- Photo -->
        <div class="unit-detail-card__photo">
          <img :src="unit.photo" :alt="unit.name" loading="lazy" />
          <span class="unit-detail-card__badge" :class="unit.type === 'RENT' ? 'unit-detail-card__badge--rent' : 'unit-detail-card__badge--owned'">
            {{ unit.type === 'RENT' ? 'Ijara' : 'Mulk' }}
          </span>
        </div>

        <!-- Body -->
        <div class="unit-detail-card__body">
          <div class="flex items-start justify-between mb-2">
            <div>
              <div class="font-semibold text-ink-900 dark:text-white">{{ unit.name }}</div>
              <div class="text-xs text-ink-500">{{ unit.building }} · {{ unit.floor }}-qavat</div>
            </div>
            <span class="badge text-[10px]" :class="unit.statusBadge">{{ unit.statusLabel }}</span>
          </div>

          <!-- Specs -->
          <div class="grid grid-cols-3 gap-2 my-4">
            <div class="text-center p-2 rounded-lg bg-black/5 dark:bg-white/5">
              <div class="text-sm font-bold text-ink-900 dark:text-white">{{ unit.area }}</div>
              <div class="text-[10px] text-ink-500">m²</div>
            </div>
            <div class="text-center p-2 rounded-lg bg-black/5 dark:bg-white/5">
              <div class="text-sm font-bold text-ink-900 dark:text-white">{{ unit.rooms }}</div>
              <div class="text-[10px] text-ink-500">xona</div>
            </div>
            <div class="text-center p-2 rounded-lg bg-black/5 dark:bg-white/5">
              <div class="text-sm font-bold text-ink-900 dark:text-white">{{ unit.rent || '—' }}</div>
              <div class="text-[10px] text-ink-500">UZS/oy</div>
            </div>
          </div>

          <!-- Contract info -->
          <div class="space-y-1.5 text-xs mb-4">
            <div class="flex items-center justify-between">
              <span class="text-ink-500">Shartnoma:</span>
              <span class="font-mono font-medium text-ink-900 dark:text-white">{{ unit.contractNumber || '—' }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-ink-500">Muddat:</span>
              <span class="font-medium text-ink-900 dark:text-white">{{ unit.contractEnd || '—' }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-ink-500">Qarzdorlik:</span>
              <span :class="unit.debt > 0 ? 'text-red-500 font-bold' : 'text-emerald-500 font-medium'">
                {{ unit.debt > 0 ? formatUZSShort(unit.debt) + ' so\'m' : 'Yo\'q' }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <NuxtLink to="/cabinet/services" class="btn btn-secondary btn-sm flex-1 text-xs">Hisob</NuxtLink>
            <NuxtLink to="/cabinet/contracts" class="btn btn-ghost btn-sm flex-1 text-xs">Shartnoma</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const units = [
  {
    id: 'u1', name: 'A-301', building: 'Tashkent City', floor: 3, area: 85, rooms: 3,
    type: 'RENT', rent: '25.0M', photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png',
    contractNumber: 'CTR-2026-001', contractEnd: '15 Mar 2027', debt: 0,
    statusBadge: 'badge-success', statusLabel: 'Faol',
  },
  {
    id: 'u2', name: 'B-205', building: 'Trillant Tower', floor: 2, area: 120, rooms: 4,
    type: 'RENT', rent: '35.0M', photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/6daa9acc3_generated_image.png',
    contractNumber: 'CTR-2026-002', contractEnd: '01 Dek 2026', debt: 4200000,
    statusBadge: 'badge-warning', statusLabel: 'Qarz bor',
  },
  {
    id: 'u3', name: 'C-101', building: 'IT Park', floor: 1, area: 45, rooms: 2,
    type: 'OWNED', rent: null, photo: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png',
    contractNumber: null, contractEnd: '—', debt: 0,
    statusBadge: 'badge-success', statusLabel: 'Mulk',
  },
]

const totalArea = computed(() => units.reduce((s, u) => s + u.area, 0))


</script>

<style scoped>
.unit-detail-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.06);
  background: #ffffff;
  transition: all 0.2s;
}
.dark .unit-detail-card {
  background: rgba(255,255,255,0.02);
  border-color: rgba(255,255,255,0.06);
}
.unit-detail-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}
.dark .unit-detail-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
.unit-detail-card__photo {
  position: relative;
  height: 160px;
  overflow: hidden;
}
.unit-detail-card__photo img {
  width: 100%; height: 100%; object-fit: cover;
}
.unit-detail-card__badge {
  position: absolute; top: 10px; left: 10px;
  font-size: 10px; font-weight: 700;
  padding: 3px 10px; border-radius: 6px; color: white;
}
.unit-detail-card__badge--rent { background: #6366f1; }
.unit-detail-card__badge--owned { background: #10b981; }
.unit-detail-card__body { padding: 16px; }
</style>
