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
      // Sync currentRole useState for middleware
      const roleState = useState('currentRole')
      if (u && u.role) roleState.value = u.role
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
      if (saved) {
        user.value = JSON.parse(saved)
        // Restore currentRole from saved user
        const roleState = useState('currentRole')
        if (user.value?.role) roleState.value = user.value.role
      }
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
    // Frontend-only: accept any 6-digit code
    if (!code || code.length < 4) return false

    if (!pendingRegistration.value) {
      if (import.meta.client) {
        const saved = localStorage.getItem('makon-pending-reg')
        if (saved) pendingRegistration.value = JSON.parse(saved)
      }
    }
    if (pendingRegistration.value) {
      otpVerified.value = true
      pendingRegistration.value.phoneVerified = true
      if (import.meta.client) {
        localStorage.setItem('makon-pending-reg', JSON.stringify(pendingRegistration.value))
      }
    }
    return true
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
    // Frontend-only: accept any non-empty login + password (>= 3 chars)
    if (!login || !password || login.trim().length < 3 || password.trim().length < 3) return false

    // Known staff accounts get their proper role
    const staffAccounts: Record<string, { name: string; role: UserRole }> = {
      'super@makon.uz': { name: 'Bosh administrator', role: 'SUPER_HEAD' as UserRole },
      'admin@makon.uz': { name: 'Bosh administrator', role: 'SUPER_HEAD' as UserRole },
      'manager@makon.uz': { name: 'Bino menejeri', role: 'BUILDING_MANAGER' as UserRole },
      'accountant@makon.uz': { name: 'Buxgalter', role: 'ACCOUNTANT' as UserRole },
      'facility@makon.uz': { name: 'Texnik xodim', role: 'FACILITY' as UserRole },
      'operator@makon.uz': { name: 'Kontent operator', role: 'CONTENT_OPERATOR' as UserRole },
      'warehouse@makon.uz': { name: 'Omborchi', role: 'WAREHOUSE_OPERATOR' as UserRole },
    }

    if (staffAccounts[login]) {
      const staff = staffAccounts[login]
      setAuth({
        token: 'sess_' + Date.now().toString(36),
        user: { id: login.split('@')[0], fullName: staff.name, email: login, role: staff.role },
      })
      return true
    }

    // Check registered users
    const found = registeredUsers.value.find(u => u.login === login)
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

    // Unknown user — accept anyway as TENANT_OWNER
    setAuth({
      token: 'sess_' + Date.now().toString(36),
      user: {
        id: 'user_' + Date.now().toString(36),
        fullName: login.split('@')[0] || 'Foydalanuvchi',
        email: login,
        role: 'TENANT_OWNER' as UserRole,
      },
    })
    return true
  }


  // --- Phone login (existing users) ---
  function loginWithPhone(phone: string): string | null {
    // Check registered users by phone
    const found = registeredUsers.value.find(u => u.phone === phone)
    if (found) {
      const code = sendOtp(phone)
      // Store that this is a login attempt, not registration
      pendingRegistration.value = {
        phone,
        phoneVerified: false,
        otpCode: code,
      }
      if (import.meta.client) {
        localStorage.setItem('makon-pending-reg', JSON.stringify(pendingRegistration.value))
        localStorage.setItem('makon-login-attempt', JSON.stringify({ phone, login: found.login }))
      }
      return code
    }

    // Check staff accounts by phone (add phone field to staff lookup)
    const staffPhones: Record<string, { name: string; role: UserRole; login: string }> = {
      '+998901234567': { name: 'Bosh administrator', role: 'SUPER_HEAD' as UserRole, login: 'super@makon.uz' },
    }
    const staff = staffPhones[phone]
    if (staff) {
      const code = sendOtp(phone)
      pendingRegistration.value = {
        phone,
        phoneVerified: false,
        otpCode: code,
      }
      if (import.meta.client) {
        localStorage.setItem('makon-pending-reg', JSON.stringify(pendingRegistration.value))
        localStorage.setItem('makon-login-attempt', JSON.stringify({ phone, login: staff.login }))
      }
      return code
    }

    return null
  }

  function loginWithOtpCode(code: string): boolean {
    if (!verifyOtp(code)) return false

    if (import.meta.client) {
      const attempt = localStorage.getItem('makon-login-attempt')
      if (attempt) {
        const { login } = JSON.parse(attempt)
        localStorage.removeItem('makon-login-attempt')

        // Find user by login
        const found = registeredUsers.value.find(u => u.login === login)
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

        // Staff
        const staffAccounts: Record<string, { name: string; role: UserRole; password: string }> = {
          'super@makon.uz': { name: 'Bosh administrator', role: 'SUPER_HEAD' as UserRole, password: 'Makon2026!' },
          'admin@makon.uz': { name: 'Bosh administrator', role: 'SUPER_HEAD' as UserRole, password: 'admin123' },
          'manager@makon.uz': { name: 'Bino menejeri', role: 'BUILDING_MANAGER' as UserRole, password: 'Makon2026!' },
          'accountant@makon.uz': { name: 'Buxgalter', role: 'ACCOUNTANT' as UserRole, password: 'Makon2026!' },
          'facility@makon.uz': { name: 'Texnik xodim', role: 'FACILITY' as UserRole, password: 'Makon2026!' },
          'operator@makon.uz': { name: 'Kontent operator', role: 'CONTENT_OPERATOR' as UserRole, password: 'Makon2026!' },
          'warehouse@makon.uz': { name: 'Omborchi', role: 'WAREHOUSE_OPERATOR' as UserRole, password: 'Makon2026!' },
        }
        if (staffAccounts[login]) {
          const staff = staffAccounts[login]
          setAuth({
            token: 'sess_' + Date.now().toString(36),
            user: { id: login.split('@')[0], fullName: staff.name, email: login, role: staff.role },
          })
          return true
        }
      }
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
    sendOtp, verifyOtp, register, loginWithCredentials, loginWithPhone, loginWithOtpCode, clearOtpState,
  }
})
