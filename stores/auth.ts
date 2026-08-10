import { defineStore } from 'pinia'
import type { User, UserRole } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  // Mock users for all 5 roles
  const mockUsers: Record<string, User> = {
    admin: {
      id: 'u1',
      login: 'admin',
      fullName: 'Dilshod Rahimov',
      email: 'd.rahimov@makon.uz',
      phone: '+998 71 200 30 40',
      role: 'SUPER_HEAD',
      organizationId: 'org1',
      buildingScopes: [],
      isActive: true,
      lastLoginAt: new Date().toISOString(),
      createdAt: '2025-01-01T00:00:00Z',
    },
    manager: {
      id: 'u2',
      login: 'manager',
      fullName: 'Sardor Karimov',
      email: 's.karimov@makon.uz',
      phone: '+998 90 123 45 67',
      role: 'BUILDING_MANAGER',
      organizationId: 'org1',
      buildingScopes: ['b1', 'b2'],
      isActive: true,
      lastLoginAt: new Date().toISOString(),
      createdAt: '2025-01-15T00:00:00Z',
    },
    accountant: {
      id: 'u3',
      login: 'accountant',
      fullName: 'Nodira Yusupova',
      email: 'n.yusupova@makon.uz',
      phone: '+998 90 234 56 78',
      role: 'ACCOUNTANT',
      organizationId: 'org1',
      buildingScopes: [],
      isActive: true,
      lastLoginAt: new Date().toISOString(),
      createdAt: '2025-02-01T00:00:00Z',
    },
    facility: {
      id: 'u4',
      login: 'facility',
      fullName: 'Bekzod Aliyev',
      email: 'b.aliyev@makon.uz',
      phone: '+998 90 345 67 89',
      role: 'FACILITY',
      organizationId: 'org1',
      buildingScopes: ['b1'],
      isActive: true,
      lastLoginAt: new Date().toISOString(),
      createdAt: '2025-02-15T00:00:00Z',
    },
    tenant: {
      id: 'u5',
      login: 'tenant',
      fullName: 'Aziz Toshmatov',
      email: 'a.toshmatov@toshkent-invest.uz',
      phone: '+998 90 456 78 90',
      role: 'TENANT_OWNER',
      organizationId: 'org2',
      buildingScopes: [],
      isActive: true,
      lastLoginAt: new Date().toISOString(),
      createdAt: '2025-03-01T00:00:00Z',
    },
  }

  function login(login: string, _password: string) {
    const u = mockUsers[login] || mockUsers['admin']
    user.value = u
    isAuthenticated.value = true
    if (import.meta.client) {
      localStorage.setItem('makon_user', JSON.stringify(u))
    }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    if (import.meta.client) {
      localStorage.removeItem('makon_user')
    }
  }

  function restore() {
    if (import.meta.client) {
      const saved = localStorage.getItem('makon_user')
      if (saved) {
        try {
          user.value = JSON.parse(saved)
          isAuthenticated.value = true
        } catch {}
      }
    }
  }

  function switchRole(role: UserRole) {
    const entries = Object.entries(mockUsers)
    for (const [login, u] of entries) {
      if (u.role === role) {
        login(login, '')
        break
      }
    }
  }

  return { user, isAuthenticated, login, logout, restore, switchRole }
})
