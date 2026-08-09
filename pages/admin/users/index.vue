<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Foydalanuvchilar</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ users.length }} foydalanuvchi</p>
      </div>
      <button class="btn-primary btn-sm">+ Yangi</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Foydalanuvchi</th>
              <th>Login</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Holat</th>
              <th>Yaratilgan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.id">
              <td>
                <div class="flex items-center gap-3">
                  <div
                    class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
                  >
                    <span class="text-xs font-bold text-white">{{ u.initials }}</span>
                  </div>
                  <span class="font-medium">{{ u.name }}</span>
                </div>
              </td>
              <td class="font-mono text-xs">{{ u.login }}</td>
              <td class="text-neutral-500">{{ u.email }}</td>
              <td>
                <span :class="roleClass(u.role)">{{ roleLabel(u.role) }}</span>
              </td>
              <td>
                <span :class="u.active ? 'badge-success' : 'badge-neutral'">{{
                  u.active ? 'Faol' : 'Nofaol'
                }}</span>
              </td>
              <td class="text-neutral-500 text-xs">{{ formatDate(u.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from '~/utils'

definePageMeta({ middleware: 'auth' })
const users = ref([
  {
    id: '1',
    name: 'Farhod Muxtorov',
    login: 'admin',
    email: 'farhod@makon.uz',
    role: 'SUPER_HEAD',
    active: true,
    createdAt: '2024-01-01',
    initials: 'FM',
  },
  {
    id: '2',
    name: 'Aziz Karimov',
    login: 'aziz',
    email: 'aziz@makon.uz',
    role: 'BUILDING_MANAGER',
    active: true,
    createdAt: '2024-03-15',
    initials: 'AK',
  },
  {
    id: '3',
    name: 'Dilnoza Yusupova',
    login: 'dilnoza',
    email: 'dilnoza@makon.uz',
    role: 'ACCOUNTANT',
    active: true,
    createdAt: '2024-05-10',
    initials: 'DY',
  },
  {
    id: '4',
    name: 'Bekzod Toshmatov',
    login: 'bekzod',
    email: 'bekzod@makon.uz',
    role: 'FACILITY',
    active: false,
    createdAt: '2024-07-20',
    initials: 'BT',
  },
  {
    id: '5',
    name: 'Sardor Rahimov',
    login: 'sardor',
    email: 'sardor@makon.uz',
    role: 'TENANT_OWNER',
    active: true,
    createdAt: '2025-01-15',
    initials: 'SR',
  },
])
const roleLabel = (r: string) =>
  ({
    SUPER_HEAD: 'Super rahbar',
    BUILDING_MANAGER: 'Bino rahbari',
    ACCOUNTANT: 'Buxgalter',
    FACILITY: 'Pudratchi',
    TENANT_OWNER: 'Ijarachi',
  })[r] || r
const roleClass = (r: string) =>
  ({
    SUPER_HEAD: 'badge-info',
    BUILDING_MANAGER: 'badge-success',
    ACCOUNTANT: 'badge-warning',
    FACILITY: 'badge-neutral',
    TENANT_OWNER: 'badge-neutral',
  })[r] || 'badge-neutral'
</script>
