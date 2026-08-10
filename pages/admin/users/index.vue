
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Foydalanuvchilar</h1>
        <p class="text-ink-400 text-sm mt-1">{{ users.length }} ta foydalanuvchi</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="14" /> Foydalanuvchi qo'shish</button>
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Foydalanuvchi</th>
              <th>Rol</th>
              <th>Tashkilot</th>
              <th>Scope</th>
              <th>Holat</th>
              <th>Kirish</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.id" class="table-row-hover">
              <td>
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-xs font-bold text-white">
                    {{ u.fullName.split(' ').map((w: string) => w[0]).slice(0, 2).join('') }}
                  </div>
                  <div>
                    <div class="text-white font-medium text-sm">{{ u.fullName }}</div>
                    <div class="text-xs text-ink-500">{{ u.email }}</div>
                  </div>
                </div>
              </td>
              <td><span class="badge" :class="roleClass(u.role)">{{ roleLabel(u.role) }}</span></td>
              <td class="text-ink-400 text-sm">{{ u.organizationId }}</td>
              <td class="text-ink-400 text-sm">{{ u.buildingScopes.length }} bino</td>
              <td><span class="badge" :class="u.isActive ? 'badge-success' : 'badge-neutral'">{{ u.isActive ? 'Faol' : 'Nofaol' }}</span></td>
              <td class="text-ink-400 text-sm">{{ u.lastLoginAt ? formatDateTime(u.lastLoginAt) : '—' }}</td>
              <td><button class="text-ink-400 hover:text-white"><Settings :size="16" /></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Plus, Settings } from 'lucide-vue-next'
import { users } from '~/utils/mockData'
import type { UserRole } from '~/types'

const { formatDateTime } = useFormat()

function roleLabel(r: UserRole) {
  return { SUPER_HEAD: 'Super rahbar', BUILDING_MANAGER: 'Bino rahbari', ACCOUNTANT: 'Buxgalter', FACILITY: 'Pudratchi', TENANT_OWNER: 'Ijarachi' }[r]
}
function roleClass(r: UserRole) {
  return { SUPER_HEAD: 'badge-brand', BUILDING_MANAGER: 'badge-info', ACCOUNTANT: 'badge-success', FACILITY: 'badge-warning', TENANT_OWNER: 'badge-neutral' }[r]
}
</script>
