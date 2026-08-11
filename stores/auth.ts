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

  function setToken(t: string | null) {
    token.value = t
    if (import.meta.client) {
      if (t) localStorage.setItem('makon-token', t)
      else localStorage.removeItem('makon-token')
    }
  }

  function setAuth(data: { token: string; user: AuthUser }) {
    setToken(data.token)
    setUser(data.user)
  }

  function init() {
    if (import.meta.client) {
      const saved = localStorage.getItem('makon-user')
      if (saved) user.value = JSON.parse(saved)
      const savedToken = localStorage.getItem('makon-token')
      if (savedToken) token.value = savedToken
    }
  }

  function logout() {
    setUser(null)
    setToken(null)
    navigateTo('/login')
  }

  function hasRole(...roles: UserRole[]) {
    return user.value ? roles.includes(user.value.role) : false
  }

  return { user, token, isAuthenticated, setUser, setToken, setAuth, init, logout, hasRole }
})
