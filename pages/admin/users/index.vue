<template>
  <div class="space-y-6">
    <PageHeader title="Foydalanuvchilar" subtitle="Tizim foydalanuvchilari va ularning rollari">
      <template #actions>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Qo'shish</button>
      </template>
    </PageHeader>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr><th>F.I.O</th><th>Login</th><th>Email</th><th>Rol</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.id" class="hover:bg-ink-50/50">
              <td>
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-sm font-bold text-white">{{ u.initials }}</div>
                  <span class="font-medium">{{ u.name }}</span>
                </div>
              </td>
              <td class="font-mono text-sm text-ink-500">{{ u.login }}</td>
              <td class="text-ink-500">{{ u.email }}</td>
              <td><StatusBadge :status="u.role" :variant="roleVariant(u.role)" :label="roleLabel(u.role)" /></td>
              <td><StatusBadge :status="u.active ? 'active' : 'inactive'" :variant="u.active ? 'success' : 'neutral'" :label="u.active ? 'Aktiv' : 'Nofaol'" dot /></td>
              <td><button class="btn-ghost btn-icon btn-sm"><MoreHorizontal :size="16" /></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <BaseModal v-model="showNew" title="Yangi foydalanuvchi">
      <div class="space-y-4">
        <div><label class="label">F.I.O</label><input class="input" /></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="label">Login</label><input class="input" /></div>
          <div><label class="label">Email</label><input class="input" /></div>
        </div>
        <div>
          <label class="label">Rol</label>
          <select class="input">
            <option>SUPER_HEAD — Super rahbar</option>
            <option>BUILDING_MANAGER — Bino rahbari</option>
            <option>ACCOUNTANT — Buxgalter</option>
            <option>FACILITY — Pudratchi</option>
            <option>TENANT_OWNER — Ijarachi</option>
          </select>
        </div>
        <div><label class="label">Telefon</label><input class="input" placeholder="+998 90 ..." /></div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-lg" @click="showNew = false">Bekor</button>
        <button class="btn btn-primary btn-lg" @click="showNew = false">Qo'shish</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { Plus, MoreHorizontal } from 'lucide-vue-next'

const showNew = ref(false)

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
function roleVariant(r: string) {
  const m: Record<string,string> = { SUPER_HEAD: 'info', BUILDING_MANAGER: 'warning', ACCOUNTANT: 'success', FACILITY: 'neutral', TENANT_OWNER: 'neutral' }
  return m[r] || 'neutral'
}
</script>
