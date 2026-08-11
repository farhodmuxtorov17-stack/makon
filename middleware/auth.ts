export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  // Only check auth on client side — SSR/prerender should render the page
  // and let client-side hydration handle the redirect
  if (import.meta.client) {
    authStore.init()
    if (!authStore.isAuthenticated) {
      return navigateTo('/login')
    }
  }
})
