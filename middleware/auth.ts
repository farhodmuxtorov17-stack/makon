export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  
  if (import.meta.client) {
    authStore.init()
  }

  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
