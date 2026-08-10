<template>
  <div class="bg-white rounded-2xl border border-ink-200/60 shadow-card overflow-hidden" :class="$attrs.class">
    <div v-if="title || $slots.header || $slots.action" class="px-5 py-4 border-b border-ink-100 flex items-center justify-between">
      <div>
        <h3 v-if="title" class="font-semibold text-ink-900">{{ title }}</h3>
        <p v-if="subtitle" class="text-sm text-ink-400 mt-0.5">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.action" class="flex items-center gap-2">
        <slot name="action" />
      </div>
    </div>
    <div :class="bodyClass">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  bodyClass?: string
}>()
</script>
