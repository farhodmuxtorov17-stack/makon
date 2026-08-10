<template>
  <div v-if="totalPages > 1" class="flex items-center justify-between flex-wrap gap-3 mt-4">
    <p class="text-sm text-ink-400">
      {{ (page - 1) * perPage + 1 }}–{{ Math.min(page * perPage, total) }} dan {{ total }}
    </p>
    <div class="flex items-center gap-1">
      <button class="btn btn-ghost btn-sm" :disabled="page === 1" @click="go(page - 1)">
        <ChevronLeft :size="16" />
      </button>
      <button v-for="p in pages" :key="p"
        class="min-w-[32px] h-8 px-2 rounded-lg text-sm font-medium transition-all"
        :class="p === page ? 'bg-ink-900 text-white shadow-sm' : 'text-ink-500 hover:bg-ink-100'"
        @click="go(p)">
        {{ p }}
      </button>
      <button class="btn btn-ghost btn-sm" :disabled="page === totalPages" @click="go(page + 1)">
        <ChevronRight :size="16" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  page: number
  perPage: number
  total: number
}>()
const emit = defineEmits<{ 'update:page': [number] }>()

const totalPages = computed(() => Math.ceil(props.total / props.perPage))
const pages = computed(() => {
  const arr: number[] = []
  const s = Math.max(1, props.page - 2)
  const e = Math.min(totalPages.value, s + 4)
  for (let i = Math.max(1, e - 4); i <= e; i++) arr.push(i)
  return arr
})
function go(p: number) { if (p >= 1 && p <= totalPages.value) emit('update:page', p) }
</script>
