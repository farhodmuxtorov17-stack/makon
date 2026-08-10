<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display text-ink-900">Listinglar</h1>
        <p class="text-sm text-ink-500 mt-1">{{ listings.length }} listing</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" :stroke-width="2" />
        Yangi listing
      </button>
    </div>

    <div class="card p-4">
      <div class="flex gap-3">
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
      <div v-for="l in filtered" :key="l.id" class="card-hover cursor-pointer overflow-hidden">
        <div class="h-40 bg-ink-100 flex items-center justify-center relative">
          <img
            v-if="l.images && l.images.length"
            :src="l.images[0]"
            class="w-full h-full object-cover"
            alt=""
          />
          <Image v-else :size="32" :stroke-width="1.5" class="text-ink-300" />
          <span
            class="absolute top-3 right-3 badge"
            :class="
              l.status === 'PUBLISHED'
                ? 'badge-success'
                : l.status === 'DRAFT'
                  ? 'badge-neutral'
                  : 'badge-warning'
            "
          >
            {{
              l.status === 'PUBLISHED'
                ? 'Nashr'
                : l.status === 'DRAFT'
                  ? 'Qoralama'
                  : "To'xtatilgan"
            }}
          </span>
        </div>
        <div class="p-4">
          <div class="flex items-center justify-between mb-2">
            <StatusBadge :status="l.status" :dot="true" />
            <span class="text-xs text-ink-400 flex items-center gap-1">
              <Eye :size="12" :stroke-width="2" /> {{ l.viewsCount }}
            </span>
          </div>
          <h3 class="font-semibold text-sm text-ink-900">{{ l.titleUz }}</h3>
          <p class="text-xs text-ink-500 mt-1 line-clamp-2">{{ l.descriptionUz }}</p>
          <div class="flex items-center justify-between mt-3">
            <span class="text-lg font-bold font-display text-brand-600">{{ formatNumber(l.price) }} so'm</span>
            <span class="badge badge-neutral">{{
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
import { Plus, Eye, Image } from 'lucide-vue-next'
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
