<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Initialize Telegram Mini App if running inside Telegram
const telegram = useTelegram()

onMounted(() => {
  telegram.init()

  if (telegram.isTelegram.value) {
    // Apply Telegram theme colors
    const themeParams = telegram.themeParams.value
    if (themeParams.bg_color) {
      telegram.setBgColor(themeParams.bg_color)
    }
    if (themeParams.header_bg_color) {
      telegram.setHeaderColor(themeParams.header_bg_color)
    }
  }
})
</script>
