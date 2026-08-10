<template>
  <div class="space-y-6">
    <PageHeader title="Foydalanuvchilar" subtitle="Tizim foydalanuvchilari va rollar">
      <template #actions>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Yangi foydalanuvchi</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon="Users" :value="String(users.length)" label="Jami foydalanuvchilar" iconBg="bg-brand-50" iconColor="text-brand-600" />
      <StatCard icon="Shield" :value="String(users.filter(u => u.role === 'ADMIN').length)" label="Adminlar" iconBg="bg-amber-50" iconColor="text-amber-600" />
      <StatCard icon="UserCheck" :value="String(users.filter(u => u.status === 'ACTIVE').length)" label="Faol" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
      <StatCard icon="Clock" :value="String(users.filter(u => u.status === 'PENDING').length)" label="Kutilmoqda" iconBg="bg-rose-50" iconColor="text-rose-600" />
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>F.I.O</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Rol</th>
              <th>Bino</th>
              <th>Status</th>
              <th>Oxirgi kirish</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.id" class="table-row-hover">
              <td>
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-br" :class="[u.avatarBg, u.avatarText]">
                    <span class="text-xs font-bold flex items-center justify-center w-full h-full text-white">{{ initials(u.name) }}</span>
                  </div>
                  <span class="font-medium">{{ u.name }}</span>
                </div>
              </td>
              <td class="text-ink-500 text-sm">{{ u.email }}</td>
              <td class="text-ink-500 text-sm font-mono">{{ u.phone }}</td>
              <td><span class="badge" :class="roleBadge(u.role)">{{ roleLabel(u.role) }}</span></td>
              <td class="text-sm">{{ u.building || '—' }}</td>
              <td><StatusBadge :status="u.status" :variant="u.status === 'ACTIVE' ? 'success' : u.status === 'PENDING' ? 'warning' : 'neutral'" :label="u.status === 'ACTIVE' ? 'Faol' : u.status === 'PENDING' ? 'Kutilmoqda' : 'Bloklangan'" dot /></td>
              <td class="text-sm text-ink-400">{{ formatDate(u.lastLogin, 'relative') }}</td>
              <td><button class="btn-ghost btn-icon btn-sm" @click.stop><MoreHorizontal :size="16" /></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <BaseModal v-model="showNew" title="Yangi foydalanuvchi">
      <div class="space-y-4">
        <div><label class="label">F.I.O</label><input v-model="newUser.name" class="input" placeholder="Familiya Ism Sharif" /></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="label">Email</label><input v-model="newUser.email" class="input" type="email" placeholder="email@makon.uz" /></div>
          <div><label class="label">Telefon</label><input v-model="newUser.phone" class="input" placeholder="+998 90 123 45 67" /></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="label">Rol</label><select v-model="newUser.role" class="input"><option value="ADMIN">Admin</option><option value="MANAGER">Boshqaruvchi</option><option value="FINANCE">Moliya</option><option value="ENGINEER">Muhandis</option><option value="TENANT_OWNER">Ijarachi</option></select></div>
          <div><label class="label">Bino</label><select v-model="newUser.building" class="input"><option value="">—</option><option>Trilliant Tower</option><option>Tashkent City IBC</option><option>IT Park</option><option>Crystal Plaza</option></select></div>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-lg" @click="showNew = false">Bekor</button>
        <button class="btn btn-primary btn-lg" @click="createUser">Yaratish</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { Plus, Users, Shield, UserCheck, Clock, MoreHorizontal } from 'lucide-vue-next'

const toast = useToast()
const { formatDate, initials } = useFormat()

const showNew = ref(false)
const newUser = reactive({ name: '', email: '', phone: '', role: 'MANAGER', building: '' })

const users = ref([
  { id: 'u1', name: 'Farhod Muxtorov', email: 'fmuxtorov@makon.uz', phone: '+998 90 123 45 67', role: 'ADMIN', building: '', status: 'ACTIVE', lastLogin: '2025-07-08T14:00:00', avatarBg: 'from-brand-400 to-brand-600', avatarText: '' },
  { id: 'u2', name: 'Dilnoza Yusupova', email: 'dyusupova@makon.uz', phone: '+998 91 222 33 44', role: 'MANAGER', building: 'Trilliant Tower', status: 'ACTIVE', lastLogin: '2025-07-08T09:00:00', avatarBg: 'from-emerald-400 to-emerald-600', avatarText: '' },
  { id: 'u3', name: 'Aziz Karimov', email: 'akarimov@makon.uz', phone: '+998 90 111 22 33', role: 'FINANCE', building: 'Tashkent City IBC', status: 'ACTIVE', lastLogin: '2025-07-07T16:00:00', avatarBg: 'from-amber-400 to-amber-600', avatarText: '' },
  { id: 'u4', name: 'Bekzod Toshmatov', email: 'btoshmatov@makon.uz', phone: '+998 94 444 55 66', role: 'ENGINEER', building: 'IT Park', status: 'ACTIVE', lastLogin: '2025-07-08T08:00:00', avatarBg: 'from-sky-400 to-sky-600', avatarText: '' },
  { id: 'u5', name: 'Malika Saidova', email: 'msaidova@makon.uz', phone: '+998 95 555 66 77', role: 'MANAGER', building: 'Crystal Plaza', status: 'ACTIVE', lastLogin: '2025-07-06T11:00:00', avatarBg: 'from-rose-400 to-rose-600', avatarText: '' },
  { id: 'u6', name: 'Rustam Nazarov', email: 'rnazarov@makon.uz', phone: '+998 96 666 77 88', role: 'TENANT_OWNER', building: 'Trilliant Tower', status: 'ACTIVE', lastLogin: '2025-07-05T10:00:00', avatarBg: 'from-brand-400 to-brand-600', avatarText: '' },
  { id: 'u7', name: 'Feruza Karimova', email: 'fkarimova@makon.uz', phone: '+998 97 777 88 99', role: 'TENANT_OWNER', building: 'IT Park', status: 'PENDING', lastLogin: '', avatarBg: 'from-amber-400 to-amber-600', avatarText: '' },
  { id: 'u8', name: 'Sherzod Yuldashev', email: 'syuldashev@makon.uz', phone: '+998 88 888 99 00', role: 'FINANCE', building: 'Piramit Tower', status: 'ACTIVE', lastLogin: '2025-07-08T13:00:00', avatarBg: 'from-emerald-400 to-emerald-600', avatarText: '' },
  { id: 'u9', name: 'Zarina Tursunova', email: 'ztursunova@makon.uz', phone: '+998 99 999 00 11', role: 'MANAGER', building: '', status: 'SUSPENDED', lastLogin: '2025-06-15T14:00:00', avatarBg: 'from-ink-400 to-ink-600', avatarText: '' },
  { id: 'u10', name: 'Davron Qodirov', email: 'dqodirov@makon.uz', phone: '+998 90 000 11 22', role: 'ENGINEER', building: 'Crystal Plaza', status: 'ACTIVE', lastLogin: '2025-07-07T15:00:00', avatarBg: 'from-sky-400 to-sky-600', avatarText: '' },
])

function createUser() {
  if (!newUser.name || !newUser.email) {
    toast.error("Ma'lumot to'liq emas", 'F.I.O va email kerak')
    return
  }
  users.value.unshift({ id: `u${users.value.length + 1}`, ...newUser, status: 'PENDING', lastLogin: '', avatarBg: 'from-brand-400 to-brand-600', avatarText: '' })
  toast.success('Foydalanuvchi yaratildi', newUser.name)
  showNew.value = false
  Object.assign(newUser, { name: '', email: '', phone: '', role: 'MANAGER', building: '' })
}

function roleLabel(r: string) { return { ADMIN: 'Admin', MANAGER: 'Boshqaruvchi', FINANCE: 'Moliyachi', ENGINEER: 'Muhandis', TENANT_OWNER: 'Ijarachi' }[r] || r }
function roleBadge(r: string) { return { ADMIN: 'badge-danger', MANAGER: 'badge-info', FINANCE: 'badge-success', ENGINEER: 'badge-warning', TENANT_OWNER: 'badge-neutral' }[r] || 'badge-neutral' }
</script>
