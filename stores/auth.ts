import { defineStore } from 'pinia'
import type { AuthUser, UserRole } from '~/types'

export interface PendingRegistration {
  phone: string
  phoneVerified: boolean
  otpCode: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  // OTP / Registration state
  const pendingRegistration = ref<PendingRegistration | null>(null)
  const otpSent = ref(false)
  const otpVerified = ref(false)
  const registeredUsers = ref<{ login: string; password: string; fullName: string; phone: string; email?: string; accountType?: string; inn?: string }[]>([])

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
      const savedUsers = localStorage.getItem('makon-registered-users')
      if (savedUsers) registeredUsers.value = JSON.parse(savedUsers)
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

  // --- Phone OTP flow ---
  function sendOtp(phone: string) {
    const code = String(Math.floor(100000 + Math.random() * 900000))
    pendingRegistration.value = {
      phone,
      phoneVerified: false,
      otpCode: code,
    }
    otpSent.value = true
    otpVerified.value = false
    if (import.meta.client) {
      localStorage.setItem('makon-pending-reg', JSON.stringify(pendingRegistration.value))
    }
    return code
  }

  function verifyOtp(code: string): boolean {
    if (!pendingRegistration.value) {
      if (import.meta.client) {
        const saved = localStorage.getItem('makon-pending-reg')
        if (saved) pendingRegistration.value = JSON.parse(saved)
      }
    }
    if (pendingRegistration.value && code === pendingRegistration.value.otpCode) {
      otpVerified.value = true
      pendingRegistration.value.phoneVerified = true
      if (import.meta.client) {
        localStorage.setItem('makon-pending-reg', JSON.stringify(pendingRegistration.value))
      }
      return true
    }
    return false
  }

  function register(data: { login: string; password: string; fullName: string; phone?: string; email?: string; accountType?: string; inn?: string }): boolean {
    if (!pendingRegistration.value?.phoneVerified) return false

    const exists = registeredUsers.value.find(u => u.login === data.login)
    if (exists) return false

    const newUser = {
      login: data.login,
      password: data.password,
      fullName: data.fullName,
      phone: data.phone || pendingRegistration.value.phone,
      email: data.email || '',
      accountType: data.accountType || 'individual',
      inn: data.inn || '',
    }
    registeredUsers.value.push(newUser)
    if (import.meta.client) {
      localStorage.setItem('makon-registered-users', JSON.stringify(registeredUsers.value))
    }

    pendingRegistration.value = null
    otpSent.value = false
    otpVerified.value = false
    if (import.meta.client) {
      localStorage.removeItem('makon-pending-reg')
    }

    return true
  }

  function loginWithCredentials(login: string, password: string): boolean {
    // Check registered users first
    const found = registeredUsers.value.find(u => u.login === login && u.password === password)
    if (found) {
      setAuth({
        token: 'sess_' + Date.now().toString(36),
        user: {
          id: 'reg_' + Date.now().toString(36),
          fullName: found.fullName,
          email: login,
          role: 'TENANT_OWNER' as UserRole,
          phone: found.phone,
        },
      })
      return true
    }

    // Demo/admin credentials
    if (login === 'admin@makon.uz' && password === 'demo1234') {
      setAuth({
        token: 'sess_' + Date.now().toString(36),
        user: { id: '1', fullName: 'Admin User', email: 'admin@makon.uz', role: 'SUPER_HEAD' as UserRole },
      })
      return true
    }

    return false
  }

  function clearOtpState() {
    pendingRegistration.value = null
    otpSent.value = false
    otpVerified.value = false
    if (import.meta.client) {
      localStorage.removeItem('makon-pending-reg')
    }
  }

  return {
    user, token, isAuthenticated,
    pendingRegistration, otpSent, otpVerified, registeredUsers,
    setUser, setToken, setAuth, init, logout, hasRole,
    sendOtp, verifyOtp, register, loginWithCredentials, clearOtpState,
  }
})
