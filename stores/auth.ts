import { defineStore } from 'pinia'
import type { AuthUser, UserRole } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  function setUser(u: AuthUser | null) {
    user.value = u
    if (import.meta.client) {
      if (u) localStorage.setItem('makon-user', JSON.stringify(u))
      else localStorage.removeItem('makon-user')
    }
  }

  function init() {
    if (import.meta.client) {
      const saved = localStorage.getItem('makon-user')
      if (saved) user.value = JSON.parse(saved)
    }
  }

  function logout() {
    setUser(null)
    navigateTo('/login')
  }

  function hasRole(...roles: UserRole[]) {
    return user.value ? roles.includes(user.value.role) : false
  }

  return { user, token, isAuthenticated, setUser, init, logout, hasRole }
})
