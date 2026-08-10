<template>
  <div
    class="tg-app"
    :class="{ 'tg-app--dark': isDark }"
    :style="cssVars"
  >
    <!-- Telegram Mini App container -->
    <div class="tg-app__container">
      <!-- Content area -->
      <div class="tg-app__content">
        <slot />
      </div>

      <!-- Bottom navigation -->
      <TgNavBar
        :dark="isDark"
        :show-back="showBack"
        :role="currentRole"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const route = useRoute()
const isDark = computed(() => colorMode.value === 'dark')
const currentRole = useState('currentRole', () => 'TENANT_OWNER')

const showBack = computed(() => {
  // Show back button on non-root pages
  return route.path !== '/dashboard/executive' &&
         route.path !== '/dashboard' &&
         route.path !== '/cabinet'
})

const cssVars = computed(() => ({
  '--tg-safe-top': 'env(safe-area-inset-top, 0px)',
  '--tg-safe-bottom': 'env(safe-area-inset-bottom, 0px)',
  '--tg-viewport-height': '100vh',
}))
</script>

<style scoped>
.tg-app {
  min-height: 100vh;
  background: #f4f4f5;
  display: flex;
  flex-direction: column;
}
.tg-app--dark {
  background: #09090b;
}
.tg-app__container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;
  overflow-x: hidden;
}
.tg-app__content {
  flex: 1;
  overflow-y: auto;
  padding-top: var(--tg-safe-top, 0px);
  -webkit-overflow-scrolling: touch;
}
</style>
