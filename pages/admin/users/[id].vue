<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink to="/admin/users" class="btn btn-ghost btn-sm"><ArrowLeft :size="16" /> Foydalanuvchilar</NuxtLink>
    </div>

    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold" :class="avatarBg">
          {{ user.name.charAt(0) }}
        </div>
        <div>
          <h1 class="text-2xl font-bold text-ink-900 dark:text-white">{{ user.name }}</h1>
          <p class="text-ink-500 text-sm">{{ user.email }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button @click="saveUser" class="btn btn-primary btn-sm"><Save :size="14" /> Saqlash</button>
        <button @click="showDelete = true" class="btn btn-ghost btn-sm text-red-500"><Trash2 :size="14" /> O'chirish</button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 border-b border-black/5 dark:border-white/5">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
        :class="activeTab === tab.id ? 'border-brand-500 text-brand-500' : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-white'">
        {{ tab.label }}
      </button>
    </div>

    <!-- Profile tab -->
    <div v-if="activeTab === 'profile'" class="card p-6 space-y-4">
      <h3 class="font-semibold dark:text-white">Asosiy ma'lumotlar</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label class="label">To'liq ism</label><input v-model="user.name" class="input" /></div>
        <div><label class="label">Email</label><input v-model="user.email" type="email" class="input" /></div>
        <div><label class="label">Telefon</label><input v-model="user.phone" class="input" placeholder="+998 90 123 45 67" /></div>
        <div><label class="label">PINFL</label><input v-model="user.pinfl" class="input" placeholder="14 raqam" /></div>
        <div><label class="label">Tashkilot</label><input v-model="user.organization" class="input" /></div>
        <div><label class="label">Lavozim</label><input v-model="user.position" class="input" /></div>
      </div>

      <h3 class="font-semibold dark:text-white pt-4">Rol va huquqlar</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="label">Rol</label>
          <select v-model="user.role" class="input">
            <option v-for="r in roles" :key="r.value" :value="r.value">{{ r.label }}</option>
          </select>
        </div>
        <div>
          <label class="label">Holat</label>
          <select v-model="user.status" class="input">
            <option value="ACTIVE">Faol</option>
            <option value="SUSPENDED">To'xtatilgan</option>
            <option value="PENDING_ERI">ERI kutilmoqda</option>
          </select>
        </div>
      </div>

      <div class="flex items-center gap-3 pt-2">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="user.canExport" class="toggle" /> Eksport huquqi
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="user.canApprove" class="toggle" /> Tasdiqlash huquqi
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="user.twoFactor" class="toggle" /> 2FA
        </label>
      </div>
    </div>

    <!-- Activity tab -->
    <div v-if="activeTab === 'activity'" class="space-y-4">
      <div class="card p-6">
        <h3 class="font-semibold dark:text-white mb-4">Tizimga kirish tarixi</h3>
        <div class="space-y-2">
          <div v-for="login in logins" :key="login.id" class="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="login.success ? 'bg-emerald-500/10' : 'bg-red-500/10'">
                <CheckCircle2 v-if="login.success" :size="14" class="text-emerald-500" />
                <XCircle v-else :size="14" class="text-red-500" />
              </div>
              <div>
                <div class="text-sm font-medium">{{ login.device }}</div>
                <div class="text-xs text-ink-500">{{ login.ip }} · {{ formatDateTime(login.time) }}</div>
              </div>
            </div>
            <span class="text-xs text-ink-500">{{ login.location }}</span>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <h3 class="font-semibold dark:text-white mb-4">So'nggi amallar</h3>
        <div class="space-y-2">
          <div v-for="act in activities" :key="act.id" class="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 text-sm">
            <component :is="act.icon" :size="14" class="text-brand-500" />
            <span class="flex-1">{{ act.action }}</span>
            <span class="text-xs text-ink-500">{{ formatDateTime(act.time) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contracts tab -->
    <div v-if="activeTab === 'contracts'" class="card p-6">
      <h3 class="font-semibold dark:text-white mb-4">Bog'liq shartnomalar</h3>
      <div class="space-y-2">
        <div v-for="c in userContracts" :key="c.id" class="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5">
          <div class="flex items-center gap-3">
            <ScrollText :size="18" class="text-brand-500" />
            <div>
              <div class="text-sm font-medium">{{ c.number }}</div>
              <div class="text-xs text-ink-500">{{ c.unitName }} · {{ c.buildingName }}</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm">{{ formatUZS(c.monthlyRent) }}</span>
            <span class="badge text-xs" :class="c.status === 'ACTIVE' ? 'badge-success' : 'badge-neutral'">{{ c.status === 'ACTIVE' ? 'Faol' : 'Tugagan' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete confirmation -->
    <div v-if="showDelete" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" @click.self="showDelete = false">
      <div class="card p-6 w-full max-w-sm text-center space-y-4">
        <div class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
          <AlertTriangle :size="24" class="text-red-500" />
        </div>
        <div>
          <h3 class="font-semibold dark:text-white">Foydalanuvchini o'chirish</h3>
          <p class="text-sm text-ink-500 mt-1">{{ user.name }} ni tizimdan o'chirish tasdiqlansinmi?</p>
        </div>
        <div class="flex gap-3">
          <button @click="showDelete = false" class="btn btn-secondary flex-1">Bekor qilish</button>
          <button @click="deleteUser" class="btn btn-danger flex-1">O'chirish</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <transition name="toast">
      <div v-if="showSaved" class="fixed bottom-6 right-6 card px-4 py-3 flex items-center gap-2 z-50">
        <CheckCircle2 :size="18" class="text-emerald-500" />
        <span class="text-sm">Saqlandi</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Save, Trash2, CheckCircle2, XCircle, ScrollText, AlertTriangle, FileText, Settings, LogIn, Download, PenLine } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const route = useRoute()
const userId = route.params.id

const activeTab = ref('profile')
const showDelete = ref(false)
const showSaved = ref(false)

const tabs = [
  { id: 'profile', label: 'Profil' },
  { id: 'activity', label: 'Faollik' },
  { id: 'contracts', label: 'Shartnomalar' },
]

const roles = [
  { value: 'SUPER_HEAD', label: 'Super rahbar' },
  { value: 'BUILDING_MANAGER', label: 'Bino rahbari' },
  { value: 'ACCOUNTANT', label: 'Buxgalter' },
  { value: 'FACILITY', label: 'Pudratchi' },
  { value: 'WAREHOUSE_OPERATOR', label: 'Omborchi' },
  { value: 'CONTENT_OPERATOR', label: 'Kontent operator' },
  { value: 'TENANT_OWNER', label: 'Ijarachi / mulkdor' },
  { value: 'ADMIN', label: 'Administrator' },
]

const user = reactive({
  id: userId,
  name: 'Farhod Muxtorov',
  email: 'farhod@makon.uz',
  phone: '+998 90 123 45 67',
  pinfl: '31234567890123',
  organization: 'Makon Real Estate MChJ',
  position: 'Super rahbar',
  role: 'SUPER_HEAD',
  status: 'ACTIVE',
  canExport: true,
  canApprove: true,
  twoFactor: true,
})

const avatarBg = computed(() => {
  const colors = ['bg-brand-500/10 text-brand-500', 'bg-emerald-500/10 text-emerald-500', 'bg-amber-500/10 text-amber-500', 'bg-purple-500/10 text-purple-500']
  return colors[Number(userId) % colors.length] || colors[0]
})

const logins = [
  { id: 'l1', device: 'Chrome · macOS', ip: '94.158.52.100', location: 'Tashkent', time: '2026-08-10T12:30:00', success: true },
  { id: 'l2', device: 'Safari · iPhone 17', ip: '94.158.52.100', location: 'Tashkent', time: '2026-08-09T18:45:00', success: true },
  { id: 'l3', device: 'Chrome · Windows', ip: '84.54.82.45', location: 'Samarqand', time: '2026-08-08T09:15:00', success: false },
  { id: 'l4', device: 'Chrome · macOS', ip: '94.158.52.100', location: 'Tashkent', time: '2026-08-07T14:20:00', success: true },
]

const activities = [
  { id: 'a1', icon: FileText, action: 'Ariza tasdiqlandi: APP-2026-012', time: '2026-08-10T11:00:00' },
  { id: 'a2', icon: PenLine, action: 'Shartnoma imzolandi: CTR-2026-003', time: '2026-08-09T16:30:00' },
  { id: 'a3', icon: Download, action: 'Hisobot eksport qilindi: Moliya 2026-IYUL', time: '2026-08-08T10:45:00' },
  { id: 'a4', icon: Settings, action: 'Sozlamalar yangilandi', time: '2026-08-07T14:00:00' },
  { id: 'a5', icon: LogIn, action: 'Tizimga kirish', time: '2026-08-07T13:55:00' },
]

const userContracts = [
  { id: 'c1', number: 'CTR-2026-001', unitName: 'A-301', buildingName: 'Tashkent City', monthlyRent: 25000000, status: 'ACTIVE' },
  { id: 'c2', number: 'CTR-2025-098', unitName: 'B-303', buildingName: 'Tashkent City', monthlyRent: 22000000, status: 'EXPIRED' },
]

function saveUser() {
  showSaved.value = true
  setTimeout(() => showSaved.value = false, 2000)
}

function deleteUser() {
  showDelete.value = false
  navigateTo('/admin/users')
}


</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px); }
</style>
