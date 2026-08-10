<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const authStore = useAuthStore()

onMounted(() => {
  authStore.init()
})
</script>
