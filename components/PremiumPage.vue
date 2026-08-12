<template>
  <div class="premium-page fade-in-up">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Premium page wrapper - adds fade-in animation and consistent spacing
</script>

<style scoped>
.premium-page {
  animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
}
</style>
