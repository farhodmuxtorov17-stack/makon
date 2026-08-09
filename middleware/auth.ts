// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
