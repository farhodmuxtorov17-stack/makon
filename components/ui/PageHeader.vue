<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-slide-up">
    <div>
      <h1 class="font-display text-2xl font-extrabold tracking-tight text-ink-900">{{ title }}</h1>
      <p v-if="subtitle" class="text-sm text-ink-400 mt-0.5">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="flex items-center gap-2 flex-wrap">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>
