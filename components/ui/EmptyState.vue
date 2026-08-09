<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
      <svg class="w-8 h-8 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="icon" />
      </svg>
    </div>
    <h3 class="text-base font-semibold text-neutral-700">{{ title }}</h3>
    <p v-if="description" class="text-sm text-neutral-400 mt-1 max-w-sm">{{ description }}</p>
    <button v-if="actionLabel" class="btn-primary btn-sm mt-4" @click="$emit('action')">{{ actionLabel }}</button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description?: string
  actionLabel?: string
  icon?: string
}>(), {
  icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4',
})

defineEmits<{ action: [] }>()
</script>
