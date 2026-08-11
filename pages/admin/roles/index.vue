<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">ADMIN / ROLES</div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Rollar va huquqlar</h1>
        <p class="text-ink-500 text-sm mt-1">5 ta rol · {{ permissions.length }} ta huquq</p>
      </div>
      <button class="btn btn-primary btn-sm btn-glow" @click="() => {}"><Plus :size="14" /> Yangi rol</button>
    </div>

    <!-- Role cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
      <div v-for="role in roles" :key="role.value" class="role-card" :class="{ 'role-card--active': selectedRole === role.value }" @click="selectedRole = role.value">
        <div class="role-card__icon" :style="{ background: role.color + '15', color: role.color }">
          <component :is="role.icon" :size="20" />
        </div>
        <div class="role-card__name">{{ role.label }}</div>
        <div class="role-card__count">{{ getRolePermissions(role.value) }}/{{ permissions.length }} huquq</div>
        <div class="role-card__users">{{ role.usersCount }} foydalanuvchi</div>
      </div>
    </div>

    <!-- Permission matrix -->
    <div class="card-premium p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">{{ selectedRoleLabel }} — huquqlar matritsasi</h3>
        <button class="btn btn-secondary btn-sm" @click="() => {}"><Save :size="14" /> Saqlash</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-3 py-3">Modul / Amal</th>
              <th class="text-center font-medium px-3 py-3 w-20">Ko'rish</th>
              <th class="text-center font-medium px-3 py-3 w-20">Yaratish</th>
              <th class="text-center font-medium px-3 py-3 w-20">Tahrir</th>
              <th class="text-center font-medium px-3 py-3 w-20">O'chirish</th>
              <th class="text-center font-medium px-3 py-3 w-20">Tasdiqlash</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="perm in permissions" :key="perm.module" class="border-b border-black/5 dark:border-white/5">
              <td class="px-3 py-3 font-medium text-ink-900 dark:text-white">
                <div class="flex items-center gap-2">
                  <component :is="perm.icon" :size="15" class="text-ink-400 flex-shrink-0" />
                  {{ perm.label }}
                </div>
              </td>
              <td v-for="action in ['view', 'create', 'edit', 'delete', 'approve']" :key="action" class="text-center px-3 py-3">
                <div class="flex items-center justify-center">
                  <span v-if="perm.permissions[action]" class="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Check :size="14" class="text-emerald-500" />
                  </span>
                  <span v-else class="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center">
                    <X :size="14" class="text-ink-300" />
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Save, Check, X, Building2, FileText, Receipt, Wallet, ClipboardList, Package, Gauge, BarChart3, Users, ShieldCheck, Wrench, Database } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const selectedRole = ref('SUPER_HEAD')

const roles = [
  { value: 'SUPER_HEAD', label: 'Super Rahbar', color: 'var(--accent)', icon: ShieldCheck, usersCount: 2 },
  { value: 'BUILDING_MANAGER', label: 'Bino Rahbari', color: 'var(--accent)', icon: Building2, usersCount: 3 },
  { value: 'ACCOUNTANT', label: 'Buxgalter', color: '#10b981', icon: Receipt, usersCount: 2 },
  { value: 'FACILITY', label: 'Pudratchi', color: '#f59e0b', icon: Wrench, usersCount: 3 },
  { value: 'TENANT_OWNER', label: 'Ijarachi', color: '#3b82f6', icon: Users, usersCount: 12 },
]

const permissionMatrix: Record<string, any> = {
  SUPER_HEAD: { view: true, create: true, edit: true, delete: true, approve: true },
  BUILDING_MANAGER: { view: true, create: true, edit: true, delete: false, approve: true },
  ACCOUNTANT: { view: true, create: true, edit: false, delete: false, approve: true },
  FACILITY: { view: true, create: true, edit: true, delete: false, approve: false },
  TENANT_OWNER: { view: true, create: false, edit: false, delete: false, approve: false },
}

const permissions = [
  { module: 'buildings', label: 'Binolar', icon: Building2, permissions: { view: true, create: true, edit: true, delete: true, approve: true } },
  { module: 'units', label: 'Unitlar', icon: Building2, permissions: { view: true, create: true, edit: true, delete: false, approve: true } },
  { module: 'listings', label: 'Listinglar', icon: FileText, permissions: { view: true, create: true, edit: true, delete: false, approve: true } },
  { module: 'applications', label: 'Arizalar', icon: FileText, permissions: { view: true, create: true, edit: true, delete: false, approve: true } },
  { module: 'contracts', label: 'Shartnomalar', icon: FileText, permissions: { view: true, create: true, edit: true, delete: false, approve: true } },
  { module: 'invoices', label: 'Invoyslar', icon: Receipt, permissions: { view: true, create: true, edit: true, delete: false, approve: true } },
  { module: 'finance', label: 'Moliya', icon: Wallet, permissions: { view: true, create: true, edit: false, delete: false, approve: true } },
  { module: 'work_orders', label: 'Work orderlar', icon: ClipboardList, permissions: { view: true, create: true, edit: true, delete: false, approve: false } },
  { module: 'inventory', label: 'Ombor', icon: Package, permissions: { view: true, create: true, edit: true, delete: false, approve: false } },
  { module: 'meters', label: 'Hisoblagichlar', icon: Gauge, permissions: { view: true, create: true, edit: true, delete: false, approve: false } },
  { module: 'reports', label: 'Hisobotlar', icon: BarChart3, permissions: { view: true, create: false, edit: false, delete: false, approve: false } },
  { module: 'users', label: 'Foydalanuvchilar', icon: Users, permissions: { view: true, create: true, edit: true, delete: true, approve: true } },
]

const selectedRoleLabel = computed(() => roles.find(r => r.value === selectedRole.value)?.label || '')

function getRolePermissions(role: string) {
  const perm = permissionMatrix[role]
  return Object.values(perm).filter(Boolean).length * permissions.length
}
</script>

<style scoped>
.role-card {
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.06);
  background: #ffffff;
  cursor: pointer;
  transition: all 0.15s;
}
.dark .role-card { background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.06); }
.role-card:hover { border-color: rgba(15,118,110,0.2); }
.role-card--active { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(15,118,110,0.15); }
.role-card__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
.role-card__name { font-size: 13px; font-weight: 700; color: #18181b; }
.dark .role-card__name { color: #fafafa; }
.role-card__count { font-size: 11px; color: #71717a; margin-top: 4px; }
.role-card__users { font-size: 11px; color: #a1a1aa; margin-top: 2px; }
</style>
