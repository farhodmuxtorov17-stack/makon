export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const authStore = useAuthStore()
    authStore.init()
    
    if (!authStore.isAuthenticated) {
      return navigateTo('/login')
    }
    
    // Get allowed roles from page meta
    const allowedRoles = to.meta?.roles as string[] | undefined
    
    if (allowedRoles && allowedRoles.length > 0) {
      const currentRole = useState('currentRole').value as string
      
      // SUPER_HEAD and ADMIN can access everything
      if (currentRole === 'SUPER_HEAD' || currentRole === 'ADMIN') {
        return
      }
      
      if (!allowedRoles.includes(currentRole)) {
        // Redirect to their dashboard
        return navigateTo('/dashboard')
      }
    }
  }
})
