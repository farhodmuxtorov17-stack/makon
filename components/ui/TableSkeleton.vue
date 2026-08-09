<template>
  <div class="space-y-3">
    <div v-for="i in rows" :key="i" class="flex items-center gap-4 px-5 py-3.5">
      <div class="shimmer-bg h-4 rounded flex-1" :style="{ maxWidth: `${60 + Math.random() * 30}%` }" />
      <div class="shimmer-bg h-6 w-20 rounded-lg" />
      <div class="shimmer-bg h-4 w-24 rounded hidden md:block" />
      <div class="shimmer-bg h-6 w-16 rounded-lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ rows?: number }>(), { rows: 5 })
</script>
