<template>
  <div />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  authStore.restore()
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  }
})
</script>
