<template>
  <button
    @click="toggleTheme"
    class="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-black/5 dark:hover:bg-white/5"
    :title="isDark ? 'Yorug\'lik rejimiga otish' : 'Qorongi rejimga otish'"
  >
    <transition name="theme-fade" mode="out-in">
      <Sun v-if="isDark" key="sun" :size="18" class="text-amber-400" />
      <Moon v-else key="moon" :size="18" class="text-ink-500" />
    </transition>
  </button>
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.preference === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<style scoped>
.theme-fade-enter-active, .theme-fade-leave-active { transition: all 0.2s ease; }
.theme-fade-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.5); }
.theme-fade-leave-to { opacity: 0; transform: rotate(90deg) scale(0.5); }
</style>
