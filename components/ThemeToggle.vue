<template>
  <button
    class="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-black/5 dark:hover:bg-white/10"
    @click="toggleTheme"
    :title="isDark ? 'Yorug\' rejim' : 'Qorong\'i rejim'"
  >
    <Moon v-if="!isDark" :size="18" class="text-ink-500" />
    <Sun v-else :size="18" class="text-amber-400" />
  </button>
</template>

<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

const isDark = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('makon-theme')
  if (stored) {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
})

function applyTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('makon-theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}
</script>
