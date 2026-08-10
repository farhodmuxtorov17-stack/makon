<template>
  <div class="card overflow-hidden">
    <div class="space-y-0">
      <div class="flex border-b border-ink-100 px-4 py-3 gap-4">
        <div v-for="i in cols" :key="i" class="skeleton h-4 flex-1" :style="{ maxWidth: `${100/cols}%` }" />
      </div>
      <div v-for="r in rows" :key="r" class="flex border-b border-ink-50 px-4 py-3.5 gap-4">
        <div v-for="i in cols" :key="i" class="skeleton h-4 flex-1" :style="{ maxWidth: `${100/cols}%` }" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ rows?: number; cols?: number }>(), { rows: 8, cols: 6 })
</script>
