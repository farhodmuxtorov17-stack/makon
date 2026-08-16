<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">Rollar</div>
      <h1 class="page-title">Rollar va huquqlar</h1>
        <p class="page-sub">5 ta rol · {{ permissions.length }} ta huquq</p>
      </div>
      <button class="btn btn-primary btn-sm btn-glow" @click="() => {}"><Plus :size="14" /> Yangi rol</button>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Building2 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ roles.length }}</div>
          <div class="dash-kpi__label">Rollar soni</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ permissions.length }}</div>
          <div class="dash-kpi__label">Huquqlar soni</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Grid3x3 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ totalUsers }}</div>
          <div class="dash-kpi__label">Foydalanuvchilar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileSignature :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ activeRoles }}</div>
          <div class="dash-kpi__label">Aktiv rollar</div>
        </div>
      </div>
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
        <h3 class="font-semibold text-ink-900 ">{{ selectedRoleLabel }} — huquqlar matritsasi</h3>
        <button class="btn btn-secondary btn-sm" @click="() => {}"><Save :size="14" /> Saqlash</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5  text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-3 py-3">Modul / Amal</th>
              <th class="text-center font-medium px-3 py-3 w-20">Ko'rish</th>
              <th class="text-center font-medium px-3 py-3 w-20">Yaratish</th>
              <th class="text-center font-medium px-3 py-3 w-20">Tahrir</th>
              <th class="text-center font-medium px-3 py-3 w-20">O'chirish</th>
              <th class="text-center font-medium px-3 py-3 w-20">Tasdiqlash</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="perm in permissions" :key="perm.module" class="border-b border-black/5 ">
              <td class="px-3 py-3 font-medium text-ink-900 ">
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
                  <span v-else class="w-6 h-6 rounded-lg bg-black/5  flex items-center justify-center">
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
import { Plus, Save, Check, X, Building2, FileText, Receipt, Wallet, ClipboardList, Package, Gauge, BarChart3, Users, ShieldCheck, Wrench, Database , FileSignature, Grid3x3} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'ADMIN'],  layout: 'admin', middleware: 'role' })

const selectedRole = ref('SUPER_HEAD')

const totalUsers = computed(() => roles.reduce((s, r) => s + (r.usersCount || 0), 0))
const activeRoles = computed(() => roles.filter(r => r.usersCount > 0).length)

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
  border: 1px solid var(--border);
  background: #ffffff;
  cursor: pointer;
  transition: all 0.15s;
}
.dark .role-card { background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.06); }
.role-card:hover { border-color: rgba(37,99,235,0.2); }
.role-card--active { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }
.role-card__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
.role-card__name { font-size: 13px; font-weight: 700; color: #18181b; }
.dark .role-card__name { color: #fafafa; }
.role-card__count { font-size: 11px; color: #71717a; margin-top: 4px; }
.role-card__users { font-size: 11px; color: #a1a1aa; margin-top: 2px; }

.kpi-strip {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--card-bg, rgba(255,255,255,0.9));
  border: 1px solid var(--border);
  position: relative; overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.kpi-strip:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--blue::before { background: #3b82f6; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); }
.kpi-strip--blue .kpi-strip__icon { background: rgba(59,130,246,0.1); }
.kpi-strip__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.dash-kpi__body { flex: 1; min-width: 0; }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.dash-kpi__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }
</style>
