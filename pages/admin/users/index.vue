<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Foydalanuvchilar</h1>
        <p class="text-ink-500 text-sm mt-0.5">Tizim foydalanuvchilari va rollari</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="16" /> Foydalanuvchi qo'shish</button>
    </div>

    <div class="card overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr><th>F.I.O</th><th>Login</th><th>Email</th><th>Rol</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.id">
              <td class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-xs font-bold text-white">{{ u.initials }}</div>
                <span class="font-medium">{{ u.name }}</span>
              </td>
              <td class="font-mono text-sm text-ink-500">{{ u.login }}</td>
              <td class="text-ink-500">{{ u.email }}</td>
              <td><span class="badge" :class="roleClass(u.role)">{{ roleLabel(u.role) }}</span></td>
              <td><span class="badge" :class="u.active ? 'badge-success' : 'badge-neutral'">{{ u.active ? 'Aktiv' : 'Nofaol' }}</span></td>
              <td><button class="btn-ghost btn-icon btn-sm"><MoreHorizontal :size="16" /></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, MoreHorizontal } from 'lucide-vue-next'

const users = [
  { id: 'u1', name: 'Farhod Muxtorov', login: 'admin', email: 'farhod@makon.uz', role: 'SUPER_HEAD', initials: 'FM', active: true },
  { id: 'u2', name: 'Aziz Karimov', login: 'tenant', email: 'aziz@makon.uz', role: 'TENANT_OWNER', initials: 'AK', active: true },
  { id: 'u3', name: 'Dilnoza Yusupova', login: 'dilnoza', email: 'dilnoza@makon.uz', role: 'ACCOUNTANT', initials: 'DY', active: true },
  { id: 'u4', name: 'Sardor Rahimov', login: 'sardor', email: 'sardor@makon.uz', role: 'BUILDING_MANAGER', initials: 'SR', active: true },
  { id: 'u5', name: 'Bekzod Toshmatov', login: 'bekzod', email: 'bekzod@makon.uz', role: 'FACILITY', initials: 'BT', active: false },
]

function roleLabel(r: string) {
  const m: Record<string,string> = { SUPER_HEAD: 'Super rahbar', BUILDING_MANAGER: 'Bino rahbari', ACCOUNTANT: 'Buxgalter', FACILITY: 'Pudratchi', TENANT_OWNER: 'Ijarachi' }
  return m[r] || r
}
function roleClass(r: string) {
  const m: Record<string,string> = { SUPER_HEAD: 'badge-info', BUILDING_MANAGER: 'badge-warning', ACCOUNTANT: 'badge-success', FACILITY: 'badge-neutral', TENANT_OWNER: 'badge-neutral' }
  return m[r] || 'badge-neutral'
}
</script>
