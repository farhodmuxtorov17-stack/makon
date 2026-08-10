<template>
  <div class="min-h-screen flex items-center justify-center bg-ink-950">
    <div class="animate-pulse text-ink-500">Yuklanmoqda...</div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  authStore.restore()
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  } else {
    router.push('/login')
  }
})
</script>
