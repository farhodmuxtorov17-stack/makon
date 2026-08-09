<template>
  <div class="flex items-center justify-between px-5 py-3 border-t border-neutral-100">
    <p class="text-xs text-neutral-500">
      <span class="font-semibold text-neutral-700">{{ (page - 1) * perPage + 1 }}</span>–<span class="font-semibold text-neutral-700">{{ Math.min(page * perPage, total) }}</span> / <span class="font-semibold text-neutral-700">{{ total }}</span>
    </p>
    <div class="flex items-center gap-1">
      <button :disabled="page <= 1" class="btn-ghost btn-icon" @click="$emit('update:page', page - 1)">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        v-for="p in pageNumbers"
        :key="p"
        :class="['min-w-[32px] h-8 rounded-lg text-xs font-semibold transition-colors', p === page ? 'bg-primary-600 text-white' : 'text-neutral-500 hover:bg-neutral-100']"
        @click="$emit('update:page', p)"
      >
        {{ p }}
      </button>
      <button :disabled="page >= totalPages" class="btn-ghost btn-icon" @click="$emit('update:page', page + 1)">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  page: number
  perPage: number
  total: number
}>()

defineEmits<{ 'update:page': [value: number] }>()

const totalPages = computed(() => Math.ceil(props.total / props.perPage) || 1)

const pageNumbers = computed(() => {
  const pages: number[] = []
  const start = Math.max(1, props.page - 1)
  const end = Math.min(totalPages.value, props.page + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})
</script>
