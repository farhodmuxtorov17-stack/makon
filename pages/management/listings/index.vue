<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Listinglar</h1>
        <p class="text-ink-500 text-sm mt-1">Ijara va sotuv takliflari</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="16" /> Yangi listing</button>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <div class="relative flex-1 min-w-[200px]">
        <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
        <input v-model="search" type="text" placeholder="Sarlavha bo'yicha qidirish..." class="input pl-9" />
      </div>
      <select v-model="typeFilter" class="input w-auto">
        <option value="">Hammasi</option>
        <option value="RENT">Ijaraga</option>
        <option value="SALE">Sotuvga</option>
      </select>
      <select v-model="statusFilter" class="input w-auto">
        <option value="">Hammasi</option>
        <option value="PUBLISHED">Faol</option>
        <option value="DRAFT">Qoralama</option>
        <option value="CLOSED">Yopilgan</option>
      </select>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <div v-else-if="data" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="l in filteredListings" :key="l.id" class="card overflow-hidden">
        <div class="h-40 overflow-hidden bg-ink-100 dark:bg-ink-900 relative">
          <img v-if="l.photos && l.photos[0]" :src="l.photos[0]" class="w-full h-full object-cover" loading="lazy" />
          <div class="absolute top-2 right-2 flex gap-1">
            <span class="badge text-xs" :class="l.offerType === 'RENT' ? 'badge-brand' : 'badge-success'">{{ l.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvga' }}</span>
            <span class="badge text-xs" :class="l.status === 'PUBLISHED' ? 'badge-success' : 'badge-neutral'">{{ l.status === 'PUBLISHED' ? 'Faol' : 'Qoralama' }}</span>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-medium text-sm mb-1 text-ink-900 dark:text-white line-clamp-1">{{ l.titleUz }}</h3>
          <p class="text-xs text-ink-500 mb-3 line-clamp-2">{{ l.descriptionUz }}</p>
          <div class="flex items-center justify-between">
            <div class="text-lg font-bold text-brand-500">{{ formatPrice(l.price, l.currency) }}</div>
            <div class="flex items-center gap-1 text-xs text-ink-500"><Eye :size="14" /> {{ l.viewsCount || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, Eye } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const config = useRuntimeConfig()
const { data, pending } = await useAsyncData('listings', () =>
  $fetch<any>(`${config.public.apiBase}/getPublicCatalog`, { method: 'POST', body: {} })
)

const search = ref('')
const typeFilter = ref('')
const statusFilter = ref('')

const filteredListings = computed(() => {
  if (!data.value?.listings) return []
  let result = [...data.value.listings]
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(l => l.titleUz?.toLowerCase().includes(q))
  }
  if (typeFilter.value) result = result.filter(l => l.offerType === typeFilter.value)
  if (statusFilter.value) result = result.filter(l => l.status === statusFilter.value)
  return result
})

function formatPrice(price: number, currency: string) {
  if (!price) return '—'
  return currency === 'USD' ? `$${price.toLocaleString('ru-RU')}` : `${(price / 1000000).toFixed(1)}M so'm`
}
</script>
