<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Foydalanuvchilar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ users.length }} foydalanuvchi · {{ activeCount }} faol</p>
      </div>
      <button @click="showInvite = true" class="btn btn-primary btn-sm"><UserPlus :size="14" /> Taklif yuborish</button>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><Users :size="16" class="text-blue-500" /></div>
          <span class="text-xs text-ink-500">Jami</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ users.length }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><UserCheck :size="16" class="text-emerald-500" /></div>
          <span class="text-xs text-ink-500">Faol</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ activeCount }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><Clock :size="16" class="text-amber-500" /></div>
          <span class="text-xs text-ink-500">Taklif kutilmoqda</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ pendingCount }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><ShieldCheck :size="16" class="text-purple-500" /></div>
          <span class="text-xs text-ink-500">Adminlar</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ adminCount }}</div>
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
            <tr v-for="u in filteredUsers" :key="u.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
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
                <button class="btn btn-ghost btn-sm px-2"><MoreHorizontal :size="16" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserPlus, Users, UserCheck, Clock, ShieldCheck, Search, MoreHorizontal } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const showInvite = ref(false)
const search = ref('')
const roleFilter = ref('all')

const roleTabs = [
  { value: 'all', label: 'Barchasi' },
  { value: 'SUPER_HEAD', label: 'Rahbar' },
  { value: 'BUILDING_MANAGER', label: 'Bino rahbari' },
  { value: 'ACCOUNTANT', label: 'Buxgalter' },
  { value: 'FACILITY', label: 'Pudratchi' },
]

const users = [
  { id: '1', name: 'Alisher Qodirov', email: 'a.qodirov@makon.uz', role: 'SUPER_HEAD', org: 'MAKON Management', lastLogin: '5 daq oldin', status: 'ACTIVE' },
  { id: '2', name: 'Sardor Yusupov', email: 's.yusupov@abc.uz', role: 'BUILDING_MANAGER', org: 'ABC Logistics MChJ', lastLogin: '1 soat oldin', status: 'ACTIVE' },
  { id: '3', name: 'Dilnoza Karimova', email: 'd.karimova@makon.uz', role: 'ACCOUNTANT', org: 'MAKON Management', lastLogin: '2 soat oldin', status: 'ACTIVE' },
  { id: '4', name: 'Ravshan Keldiyev', email: 'r.keldiyev@makon.uz', role: 'FACILITY', org: 'MAKON Management', lastLogin: '30 daq oldin', status: 'ACTIVE' },
  { id: '5', name: 'Jasur Tursunov', email: 'j.tursunov@makon.uz', role: 'FACILITY', org: 'MAKON Management', lastLogin: '3 soat oldin', status: 'ACTIVE' },
  { id: '6', name: 'Bekzod Mahmudov', email: 'b.mahmudov@makon.uz', role: 'FACILITY', org: 'MAKON Management', lastLogin: '1 kun oldin', status: 'ACTIVE' },
  { id: '7', name: 'Nodira Azizova', email: 'n.azizova@global.uz', role: 'BUILDING_MANAGER', org: 'Global Trade MChJ', lastLogin: 'Taklif yuborildi', status: 'PENDING' },
  { id: '8', name: 'Otabek Yo\'ldoshev', email: 'o.yuldoshev@smart.uz', role: 'BUILDING_MANAGER', org: 'Smart Solutions MChJ', lastLogin: '2 kun oldin', status: 'ACTIVE' },
  { id: '9', name: 'Kamola Rashidova', email: 'k.rashidova@makon.uz', role: 'SUPER_HEAD', org: 'MAKON Management', lastLogin: '5 soat oldin', status: 'ACTIVE' },
  { id: '10', name: 'Shoxrux Aliyev', email: 's.aliyev@logistics.uz', role: 'ACCOUNTANT', org: 'Logistics Plus', lastLogin: 'Nofaol', status: 'INACTIVE' },
]

const activeCount = computed(() => users.filter(u => u.status === 'ACTIVE').length)
const pendingCount = computed(() => users.filter(u => u.status === 'PENDING').length)
const adminCount = computed(() => users.filter(u => u.role === 'SUPER_HEAD').length)

const filteredUsers = computed(() => {
  let result = [...users]
  if (roleFilter.value !== 'all') result = result.filter(u => u.role === roleFilter.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
  }
  return result
})

function roleColor(r: string) {
  return { SUPER_HEAD: '#8b5cf6', BUILDING_MANAGER: '#6366f1', ACCOUNTANT: '#10b981', FACILITY: '#f59e0b' }[r] || '#71717a'
}
function roleLabel(r: string) {
  return { SUPER_HEAD: 'Rahbar', BUILDING_MANAGER: 'Bino rahbari', ACCOUNTANT: 'Buxgalter', FACILITY: 'Pudratchi' }[r] || r
}
</script>
