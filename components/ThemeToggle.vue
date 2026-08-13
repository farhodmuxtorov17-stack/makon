<template>
  <button class="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-black/5">
    <Moon :size="18" class="text-ink-500" />
  </button>
</template>
<script setup lang="ts">
import { Moon } from 'lucide-vue-next'
</script>
