// stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserRole } from '~/types'

const mockUser: User = {
  id: 'u1',
  login: 'admin',
  fullName: 'Farhod Muxtorov',
  email: 'farhod@makon.uz',
  phone: '+998 90 123 45 67',
  role: 'SUPER_HEAD',
  organizationId: 'org-1',
  buildingScopes: ['b1', 'b2', 'b3'],
  isActive: true,
  createdAt: '2024-01-01T00:00:00',
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const role = computed(() => user.value?.role || null)
  const isAuthenticated = computed(() => !!user.value)
  const initials = computed(() => {
    const name = user.value?.fullName || ''
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  })

  const roleLabel = computed(() => {
    const labels: Record<UserRole, string> = {
      SUPER_HEAD: 'Super rahbar',
      BUILDING_MANAGER: 'Bino rahbari',
      ACCOUNTANT: 'Buxgalter',
      FACILITY: 'Pudratchi',
      TENANT_OWNER: 'Ijarachi',
    }
    return labels[user.value?.role as UserRole] || ''
  })

  function login(loginVal: string, password: string) {
    if (loginVal === 'admin' && password === 'admin123') {
      user.value = mockUser
      return true
    }
    return false
  }

  function loginErI(pin: string) {
    if (pin.length === 14) {
      user.value = mockUser
      return true
    }
    return false
  }

  function logout() {
    user.value = null
  }

  return { user, role, isAuthenticated, initials, roleLabel, login, loginErI, logout }
})
