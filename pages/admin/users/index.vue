<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Foydalanuvchilar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ data?.stats.total || 0 }} foydalanuvchi · {{ data?.stats.active || 0 }} faol</p>
      </div>
      <button class="btn btn-primary btn-sm"><UserPlus :size="16" /> Yangi foydalanuvchi</button>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <template v-else-if="data">
      <!-- Tabs -->
      <div class="flex items-center gap-1 p-1 rounded-xl bg-white/5 w-fit">
        <button @click="tab = 'users'" class="px-3 py-1.5 rounded-lg text-sm" :class="tab === 'users' ? 'bg-brand-500/10 text-brand-400' : 'text-ink-500'">Foydalanuvchilar</button>
        <button @click="tab = 'roles'" class="px-3 py-1.5 rounded-lg text-sm" :class="tab === 'roles' ? 'bg-brand-500/10 text-brand-400' : 'text-ink-500'">Rollar va huquqlar</button>
      </div>

      <!-- Users tab -->
      <div v-if="tab === 'users'">
        <div class="relative mb-4">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input v-model="search" type="text" placeholder="Ism, email yoki telefon..." class="input pl-9" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="u in filteredUsers" :key="u.id" class="card p-4">
            <div class="flex items-start gap-3 mb-3">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center font-bold flex-shrink-0" :class="roleBg(u.role)">
                {{ u.name.charAt(0) }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-medium truncate">{{ u.name }}</div>
                <div class="text-xs text-ink-500 truncate">{{ u.email }}</div>
                <div class="text-xs text-ink-600 mt-0.5">{{ u.phone }}</div>
              </div>
              <span class="badge text-xs flex-shrink-0" :class="roleBadge(u.role)">{{ roleLabel(u.role) }}</span>
            </div>
            <div class="flex items-center justify-between pt-3 border-t border-white/5">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span class="text-xs text-ink-500">Faol</span>
              </div>
              <span class="text-xs text-ink-600">{{ timeAgo(u.lastLogin) }}</span>
            </div>
            <div v-if="u.managedBuildings" class="mt-2 flex flex-wrap gap-1">
              <span v-for="b in u.managedBuildings" :key="b" class="text-xs px-2 py-0.5 rounded-md bg-white/5 text-ink-400">{{ b }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Roles tab -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="r in data.roles" :key="r.key" class="card p-5">
          <div class="flex items-start justify-between mb-3">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <component :is="roleIcon(r.key)" :size="18" :class="roleColor(r.key)" />
                <h3 class="font-semibold">{{ r.label }}</h3>
              </div>
              <p class="text-xs text-ink-500">{{ r.description }}</p>
            </div>
            <span class="badge badge-brand text-xs">{{ r.users }} ta</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="p in r.permissions" :key="p" class="text-xs px-2 py-1 rounded-md bg-white/5 text-ink-400">{{ permLabel(p) }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { UserPlus, Search, ShieldCheck, Building2, Calculator, Wrench, User } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const config = useRuntimeConfig()
const { data, pending } = await useAsyncData('users', () =>
  $fetch<any>(`${config.public.apiBase}/modulesApi?action=users`)
)

const tab = ref('users')
const search = ref('')

const filteredUsers = computed(() => {
  if (!data.value?.users) return []
  if (!search.value) return data.value.users
  const q = search.value.toLowerCase()
  return data.value.users.filter((u: any) => u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.phone?.includes(q))
})

function roleLabel(r: string) {
  return { SUPER_HEAD: 'Bosh admin', BUILDING_MANAGER: 'Menejer', ACCOUNTANT: 'Buxgalter', FACILITY: 'Facility', TENANT_OWNER: 'Ijara oluvchi' }[r] || r
}
function roleBadge(r: string) {
  return { SUPER_HEAD: 'badge-brand', BUILDING_MANAGER: 'badge-warning', ACCOUNTANT: 'badge-success', FACILITY: 'badge-neutral', TENANT_OWNER: 'badge-neutral' }[r] || 'badge-neutral'
}
function roleBg(r: string) {
  return { SUPER_HEAD: 'bg-brand-500/10 text-brand-400', BUILDING_MANAGER: 'bg-amber-500/10 text-amber-400', ACCOUNTANT: 'bg-emerald-500/10 text-emerald-400', FACILITY: 'bg-orange-500/10 text-orange-400', TENANT_OWNER: 'bg-ink-500/10 text-ink-400' }[r] || 'bg-ink-500/10 text-ink-400'
}
function roleIcon(r: string) {
  return { SUPER_HEAD: ShieldCheck, BUILDING_MANAGER: Building2, ACCOUNTANT: Calculator, FACILITY: Wrench, TENANT_OWNER: User }[r] || User
}
function roleColor(r: string) {
  return { SUPER_HEAD: 'text-brand-400', BUILDING_MANAGER: 'text-amber-400', ACCOUNTANT: 'text-emerald-400', FACILITY: 'text-orange-400', TENANT_OWNER: 'text-ink-400' }[r] || 'text-ink-400'
}
function permLabel(p: string) {
  return { buildings: 'Binolar', applications: 'Arizalar', contracts: 'Shartnomalar', finance: 'Moliya', invoices: 'Invoyslar', facility: 'Xizmatlar', inventory: 'Ombor', meters: 'Hisoblagichlar', reports: 'Hisobotlar', users: 'Foydalanuvchilar', settings: 'Sozlamalar', profile: 'Kabinet', 'service-requests': 'So\'rovlar', all: 'Hammasi' }[p] || p
}
function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins} daqiqa oldin`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} soat oldin`
  const days = Math.floor(hours / 24)
  return `${days} kun oldin`
}
</script>
