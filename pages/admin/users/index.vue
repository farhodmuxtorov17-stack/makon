<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">ADMIN / USERS</div>
        <div class="eyebrow">ADMIN / USERS</div>
      <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Foydalanuvchilar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ filteredUsers.length }} foydalanuvchi · {{ activeCount }} faol</p>
      </div>
      <button @click="showInvite = true" class="btn btn-primary btn-sm btn-glow"><UserPlus :size="14" /> Taklif yuborish</button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="kpi-strip kpi-strip--blue">
        <div class="kpi-strip__icon"><KpiScene3D type="buildings" :size="34" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ users.length }}</div>
          <div class="kpi-strip__label">Jami foydalanuvchi</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--emerald">
        <div class="kpi-strip__icon"><KpiScene3D type="occupancy" :size="34" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ activeCount }}</div>
          <div class="kpi-strip__label">Faol</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--amber">
        <div class="kpi-strip__icon"><KpiScene3D type="applications" :size="34" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ pendingCount }}</div>
          <div class="kpi-strip__label">Taklif kutilmoqda</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--violet">
        <div class="kpi-strip__icon"><KpiScene3D type="contract" :size="34" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ adminCount }}</div>
          <div class="kpi-strip__label">Adminlar</div>
        </div>
      </div>
    </div>

    <!-- Search + role filter -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="relative">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input v-model="search" type="text" placeholder="Ism, email yoki telefon..." class="w-64 text-sm border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
      </div>
      <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5">
        <button v-for="r in roleTabs" :key="r.value" @click="roleFilter = r.value" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all" :class="roleFilter === r.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500'">
          {{ r.label }}
        </button>
      </div>
    </div>

    <!-- Users table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-widest">
              <th class="text-left font-medium px-4 py-3">Foydalanuvchi</th>
              <th class="text-left font-medium px-4 py-3 hidden sm:table-cell">Rol</th>
              <th class="text-left font-medium px-4 py-3 hidden md:table-cell">Tashkilot</th>
              <th class="text-left font-medium px-4 py-3 hidden lg:table-cell">Kirish</th>
              <th class="text-center font-medium px-4 py-3">Status</th>
              <th class="text-center font-medium px-4 py-3">Amal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in filteredUsers" :key="u.id" class="border-b border-black/5 dark:border-white/5 hover:bg-brand-500/5 transition-colors cursor-pointer" @click="openUser(u)">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0" :style="{ background: roleColor(u.role) }">
                    {{ u.name.charAt(0) }}
                  </div>
                  <div>
                    <div class="font-medium text-ink-900 dark:text-white text-sm">{{ u.name }}</div>
                    <div class="text-xs text-ink-500">{{ u.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 hidden sm:table-cell">
                <span class="badge text-[10px]" :style="{ background: roleColor(u.role) + '15', color: roleColor(u.role) }">{{ roleLabel(u.role) }}</span>
              </td>
              <td class="px-4 py-3 hidden md:table-cell text-ink-500 text-xs">{{ u.org }}</td>
              <td class="px-4 py-3 hidden lg:table-cell text-ink-500 text-xs">{{ u.lastLogin }}</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-[10px]" :class="u.status === 'ACTIVE' ? 'badge-success' : u.status === 'PENDING' ? 'badge-warning' : 'badge-neutral'">
                  {{ u.status === 'ACTIVE' ? 'Faol' : u.status === 'PENDING' ? 'Taklif' : 'Nofaol' }}
                </span>
              </td>
              <td class="px-4 py-3 text-center">
                <button class="btn btn-ghost btn-sm px-2" @click="() => {}"><MoreHorizontal :size="16" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- User Detail Drawer -->
    <DrawerModal :open="!!selectedUser" :title="selectedUser?.name || ''" width="440px" @close="selectedUser = null">
      <div v-if="selectedUser" class="space-y-5">
        <div class="flex items-center gap-3">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0" :style="{ background: roleColor(selectedUser.role) }">
            {{ selectedUser.name.charAt(0) }}
          </div>
          <div>
            <div class="font-bold text-lg text-ink-900 dark:text-white">{{ selectedUser.name }}</div>
            <div class="text-sm text-ink-500">{{ selectedUser.email }}</div>
            <span class="badge text-[10px] mt-1" :style="{ background: roleColor(selectedUser.role) + '15', color: roleColor(selectedUser.role) }">{{ roleLabel(selectedUser.role) }}</span>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between items-center p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <span class="text-sm text-ink-500">Tashkilot</span>
            <span class="text-sm font-medium text-ink-900 dark:text-white">{{ selectedUser.org }}</span>
          </div>
          <div class="flex justify-between items-center p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <span class="text-sm text-ink-500">Oxirgi kirish</span>
            <span class="text-sm font-medium text-ink-900 dark:text-white">{{ selectedUser.lastLogin }}</span>
          </div>
          <div class="flex justify-between items-center p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <span class="text-sm text-ink-500">Status</span>
            <span class="badge" :class="selectedUser.status === 'ACTIVE' ? 'badge-success' : selectedUser.status === 'PENDING' ? 'badge-warning' : 'badge-neutral'">
              {{ selectedUser.status === 'ACTIVE' ? 'Faol' : selectedUser.status === 'PENDING' ? 'Taklif' : 'Nofaol' }}
            </span>
          </div>
        </div>
      </div>
      <template #footer>
        <button @click="selectedUser = null" class="btn btn-ghost btn-sm">Yopish</button>
        <button @click="toggleUserStatus(selectedUser)" class="btn btn-secondary btn-sm">
          <Power :size="14" /> {{ selectedUser?.status === 'ACTIVE' ? 'Bloklash' : 'Faollashtirish' }}
        </button>
      </template>
    </DrawerModal>

    <!-- Invite Modal -->
    <DrawerModal :open="showInvite" title="Foydalanuvchini taklif qilish" width="440px" @close="showInvite = false">
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Ism familiya</label>
          <input v-model="inviteForm.name" type="text" class="input w-full" placeholder="Alisher Qodirov" />
        </div>
        <div>
          <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Email</label>
          <input v-model="inviteForm.email" type="email" class="input w-full" placeholder="user@example.com" />
        </div>
        <div>
          <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Rol</label>
          <select v-model="inviteForm.role" class="input w-full">
            <option value="SUPER_HEAD">Super Rahbar</option>
            <option value="BUILDING_MANAGER">Bino Rahbari</option>
            <option value="ACCOUNTANT">Buxgalter</option>
            <option value="FACILITY">Pudratchi</option>
            <option value="WAREHOUSE_OPERATOR">Omborchi</option>
            <option value="CONTENT_OPERATOR">Kontent Operator</option>
            <option value="TENANT_OWNER">Ijarachi</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Tashkilot</label>
          <input v-model="inviteForm.org" type="text" class="input w-full" placeholder="MAKON Management" />
        </div>
      </div>
      <template #footer>
        <button @click="showInvite = false" class="btn btn-ghost btn-sm">Bekor qilish</button>
        <button @click="sendInvite" class="btn btn-primary btn-sm btn-glow"><Send :size="14" /> Taklif yuborish</button>
      </template>
    </DrawerModal>
  </div>
</template>

<script setup lang="ts">
import KpiCard from '~/components/KpiCard.vue'
import { UserPlus, Users, UserCheck, Clock, ShieldCheck, Search, MoreHorizontal, Send, Power } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const showInvite = ref(false)
const selectedUser = ref<any>(null)
const search = ref('')
const roleFilter = ref('all')

const inviteForm = ref({ name: '', email: '', role: 'BUILDING_MANAGER', org: 'MAKON Management' })

const roleTabs = [
  { value: 'all', label: 'Barchasi' },
  { value: 'SUPER_HEAD', label: 'Rahbar' },
  { value: 'BUILDING_MANAGER', label: 'Bino rahbari' },
  { value: 'ACCOUNTANT', label: 'Buxgalter' },
  { value: 'FACILITY', label: 'Pudratchi' },
  { value: 'WAREHOUSE_OPERATOR', label: 'Omborchi' },
  { value: 'CONTENT_OPERATOR', label: 'Kontent' },
]

const store = useMakonStore()
function formatLastLogin(iso: string): string {
  const d = new Date(iso)
  const diffMs = Date.now() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return 'hozir'
  if (diffMin < 60) return diffMin + ' daq oldin'
  const diffHrs = Math.floor(diffMin / 60)
  if (diffHrs < 24) return diffHrs + ' soat oldin'
  const diffDays = Math.floor(diffHrs / 24)
  return diffDays + ' kun oldin'
}
const users = computed(() => store.adminUsers.map(u => ({
  ...u,
  name: u.fullName,
  org: u.organization,
  lastLogin: u.lastLogin ? formatLastLogin(u.lastLogin) : (u.status === 'INVITED' ? 'Taklif yuborildi' : 'Nofaol'),
  status: u.status === 'INVITED' ? 'PENDING' : u.status === 'SUSPENDED' ? 'INACTIVE' : 'ACTIVE',
})))

const activeCount = computed(() => users.value.filter(u => u.status === 'ACTIVE').length)
const pendingCount = computed(() => users.value.filter(u => u.status === 'PENDING').length)
const adminCount = computed(() => users.value.filter(u => u.role === 'SUPER_HEAD').length)

const filteredUsers = computed(() => {
  let result = [...users.value]
  if (roleFilter.value !== 'all') result = result.filter(u => u.role === roleFilter.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
  }
  return result
})

function openUser(u: any) {
  selectedUser.value = u
}

function toggleUserStatus(u: any) {
  const storeUser = store.adminUsers.find(su => su.id === u.id)
  if (storeUser) {
    storeUser.status = storeUser.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
  }
  selectedUser.value = null
}

function sendInvite() {
  users.value.unshift({
    id: 'u' + Date.now(),
    name: inviteForm.value.name,
    email: inviteForm.value.email,
    role: inviteForm.value.role,
    org: inviteForm.value.org,
    lastLogin: 'Taklif yuborildi',
    status: 'PENDING'
  })
  showInvite.value = false
  inviteForm.value = { name: '', email: '', role: 'BUILDING_MANAGER', org: 'MAKON Management' }
}

function roleColor(r: string) {
  return { SUPER_HEAD: 'var(--accent)', BUILDING_MANAGER: 'var(--accent)', ACCOUNTANT: '#10b981', FACILITY: '#f59e0b', WAREHOUSE_OPERATOR: '#8b5cf6', CONTENT_OPERATOR: '#ec4899' }[r] || '#71717a'
}
function roleLabel(r: string) {
  return { SUPER_HEAD: 'Rahbar', BUILDING_MANAGER: 'Bino rahbari', ACCOUNTANT: 'Buxgalter', FACILITY: 'Pudratchi', WAREHOUSE_OPERATOR: 'Omborchi', CONTENT_OPERATOR: 'Kontent' }[r] || r
}
</script>
