<template>
  <div class="space-y-6 animate-fade-up max-w-4xl mx-auto">
    <!-- ═══ Header ═══ -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">Profil sozlamalari</div>
        <h1 class="page-title">Profil sozlamalari</h1>
        <p class="page-sub">Shaxsiy ma'lumotlaringizni boshqaring</p>
      </div>
      <div class="stat-pill stat-pill--brand">
        <ShieldCheck :size="14" />
        <span>{{ roleLabel }}</span>
      </div>
    </div>

    <!-- ═══ Profile Card ═══ -->
    <div class="card p-6 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent pointer-events-none"></div>
      <div class="flex items-start gap-5 relative">
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-500/20 flex-shrink-0">
          {{ avatarLetter }}
        </div>
        <div class="flex-1">
          <h2 class="text-xl font-bold text-ink-900">{{ displayName }}</h2>
          <p class="page-sub">{{ authStore.user?.email || "user@makon.uz" }}</p>
          <div class="flex items-center gap-2 mt-3">
            <span class="badge badge-brand">{{ authStore.user?.role || 'SUPER_HEAD' }}</span>
            <span class="badge badge-success">Faol</span>
          </div>
        </div>
        <button class="btn btn-secondary btn-md" @click="showAvatarModal = true">
          <Camera :size="16" /> Rasm o'zgartirish
        </button>
      </div>
    </div>

    <!-- ═══ Personal Info ═══ -->
    <div class="card p-6">
      <div class="section-header">
        <div>
          <div class="section-header__title">Shaxsiy ma'lumotlar</div>
          <div class="section-header__sub">Ism va aloqa ma'lumotlari</div>
        </div>
        <button class="btn btn-ghost btn-sm" @click="editingPersonal = !editingPersonal">
          <PencilLine :size="14" /> {{ editingPersonal ? 'Bekor' : 'Tahrir' }}
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="label">To'liq ism</label>
          <input v-model="personalForm.fullName" type="text" class="input" :disabled="!editingPersonal" />
        </div>
        <div>
          <label class="label">Email</label>
          <input v-model="personalForm.email" type="email" class="input" :disabled="!editingPersonal" />
        </div>
        <div>
          <label class="label">Telefon</label>
          <input v-model="personalForm.phone" type="tel" class="input" :disabled="!editingPersonal" />
        </div>
        <div>
          <label class="label">Rol</label>
          <input type="text" :value="roleLabel" class="input" disabled />
        </div>
        <div v-if="authStore.user?.role === 'TENANT_OWNER'">
          <label class="label">Tashkilot</label>
          <input v-model="personalForm.company" type="text" class="input" :disabled="!editingPersonal" />
        </div>
        <div v-if="authStore.user?.role === 'TENANT_OWNER'">
          <label class="label">INN / STIR</label>
          <input v-model="personalForm.inn" type="text" class="input" :disabled="!editingPersonal" />
        </div>
      </div>
    </div>

    <!-- ═══ Security ═══ -->
    <div class="card p-6">
      <div class="section-header">
        <div>
          <div class="section-header__title">Xavfsizlik</div>
          <div class="section-header__sub">Parol va autentifikatsiya</div>
        </div>
      </div>

      <!-- Password change -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="label">Joriy parol</label>
          <div class="relative">
            <input v-model="passwordForm.current" :type="showCurrent ? 'text' : 'password'" placeholder="••••••••" class="input pr-10" />
            <button type="button" @click="showCurrent = !showCurrent" class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700">
              <Eye v-if="!showCurrent" :size="17" />
              <EyeOff v-else :size="17" />
            </button>
          </div>
        </div>
        <div></div>
        <div>
          <label class="label">Yangi parol</label>
          <div class="relative">
            <input v-model="passwordForm.new" :type="showNew ? 'text' : 'password'" placeholder="••••••••" class="input pr-10" @input="checkStrength" />
            <button type="button" @click="showNew = !showNew" class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700">
              <Eye v-if="!showNew" :size="17" />
              <EyeOff v-else :size="17" />
            </button>
          </div>
          <div v-if="passwordForm.new" class="mt-2 flex items-center gap-2">
            <div class="flex-1 h-1.5 rounded-full bg-ink-100 overflow-hidden">
              <div class="h-full transition-all duration-300" :style="{ width: strength.pct + '%', background: strength.color }"></div>
            </div>
            <span class="text-xs font-medium" :style="{ color: strength.color }">{{ strength.label }}</span>
          </div>
        </div>
        <div>
          <label class="label">Parolni tasdiqlang</label>
          <input v-model="passwordForm.confirm" :type="showConfirm ? 'text' : 'password'" placeholder="••••••••" class="input" :class="{ 'border-red-500': passwordForm.confirm && passwordForm.confirm !== passwordForm.new }" />
          <p v-if="passwordForm.confirm && passwordForm.confirm !== passwordForm.new" class="text-xs text-red-500 mt-1">Parollar mos kelmadi</p>
        </div>
      </div>

      <!-- 2FA status -->
      <div class="flex items-center justify-between mt-5 pt-5 border-t border-ink-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl surface-brand flex items-center justify-center">
            <Smartphone :size="18" class="text-brand-500" />
          </div>
          <div>
            <div class="text-sm font-medium text-ink-900">Telefon tasdiqlangan</div>
            <div class="text-xs text-ink-400">{{ maskedPhone }}</div>
          </div>
        </div>
        <button class="btn btn-ghost btn-sm">O'zgartirish</button>
      </div>
    </div>

    <!-- ═══ Notifications Preferences ═══ -->
    <div class="card p-6">
      <div class="section-header">
        <div>
          <div class="section-header__title">Bildirishnoma sozlamalari</div>
          <div class="section-header__sub">Qaysi hodisalar haqida xabar olishni xohlaysiz</div>
        </div>
      </div>
      <div class="space-y-3">
        <label v-for="pref in notifPrefs" :key="pref.key" class="flex items-center justify-between py-2 cursor-pointer">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center" :style="{ background: pref.bg }">
              <component :is="pref.icon" :size="16" :style="{ color: pref.color }" />
            </div>
            <div>
              <div class="text-sm font-medium text-ink-900">{{ pref.label }}</div>
              <div class="text-xs text-ink-400">{{ pref.desc }}</div>
            </div>
          </div>
          <button type="button" @click="pref.enabled = !pref.enabled" class="relative w-11 h-6 rounded-full transition-colors" :class="pref.enabled ? 'bg-brand-500' : 'bg-ink-200'">
            <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm" :class="pref.enabled ? 'translate-x-5' : ''"></span>
          </button>
        </label>
      </div>
    </div>

    <!-- ═══ Save Bar ═══ -->
    <div class="flex justify-end gap-3">
      <button class="btn btn-secondary btn-md" @click="resetForms">Bekor qilish</button>
      <button class="btn btn-primary btn-md" @click="saveProfile" :disabled="!canSave">
        <Check :size="16" /> Saqlash
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, Camera, Smartphone, Check, Eye, EyeOff, PencilLine, Bell, Mail, FileText, Wrench, CreditCard } from 'lucide-vue-next'

const authStore = useAuthStore()

const editingPersonal = ref(false)
const showAvatarModal = ref(false)
const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const roleLabels: Record<string, string> = {
  SUPER_HEAD: 'Super Rahbar',
  ADMIN: 'Administrator',
  BUILDING_MANAGER: 'Bino Menejeri',
  ACCOUNTANT: 'Buxgalter',
  FACILITY: 'Texnik Xodim',
  TENANT_OWNER: 'Ijarachi',
  WAREHOUSE_OPERATOR: 'Ombor Menejeri',
  CONTENT_OPERATOR: 'Kontent Operatori',
}

const roleLabel = computed(() => roleLabels[authStore.user?.role || 'SUPER_HEAD'] || 'Foydalanuvchi')
const displayName = computed(() => authStore.user?.fullName || authStore.user?.name || 'Admin User')
const avatarLetter = computed(() => displayName.value.charAt(0).toUpperCase())
const maskedPhone = computed(() => {
  const p = authStore.user?.phone || '+998 90 123 45 67'
  return p.slice(0, -4).replace(/\d/g, '*') + p.slice(-4)
})

const personalForm = reactive({
  fullName: displayName.value,
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || '+998 90 123 45 67',
  company: authStore.user?.company || '',
  inn: authStore.user?.inn || '',
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: '',
})

const strength = reactive({ pct: 0, label: '', color: '#94a3b8' })

function checkStrength() {
  const v = passwordForm.new
  if (!v) { strength.pct = 0; strength.label = ''; return }
  let score = 0
  if (v.length >= 8) score += 25
  if (/[A-Z]/.test(v)) score += 25
  if (/[0-9]/.test(v)) score += 25
  if (/[^A-Za-z0-9]/.test(v)) score += 25
  strength.pct = score
  if (score <= 25) { strength.label = 'Zaif'; strength.color = '#ef4444' }
  else if (score <= 50) { strength.label = "O'rta"; strength.color = '#f59e0b' }
  else if (score <= 75) { strength.label = 'Yaxshi'; strength.color = '#3b82f6' }
  else { strength.label = 'Kuchli'; strength.color = '#10b981' }
}

const notifPrefs = reactive([
  { key: 'contracts', label: 'Shartnoma hodisalari', desc: 'Yangi shartnoma, imzolash, muddat tugashi', icon: FileText, bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', enabled: true },
  { key: 'invoices', label: 'To\'lov va invoyslar', desc: 'Yangi invoys, to\'lov qabul qilindi, qarz', icon: CreditCard, bg: 'rgba(16,185,129,0.1)', color: '#10b981', enabled: true },
  { key: 'applications', label: 'Arizalar', desc: 'Yangi ariza, tasdiqlash, rad etish', icon: Mail, bg: 'rgba(139,92,246,0.1)', color: '#8b5cf6', enabled: true },
  { key: 'service', label: 'Servis so\'rovlari', desc: 'Yangi so\'rov, status o\'zgarishi', icon: Wrench, bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', enabled: false },
  { key: 'system', label: 'Tizim xabarlari', desc: 'Texnik ishlar, yangilanishlar', icon: Bell, bg: 'rgba(107,114,128,0.1)', color: '#6b7280', enabled: true },
])

const canSave = computed(() => {
  if (editingPersonal.value) return true
  if (passwordForm.current && passwordForm.new && passwordForm.new === passwordForm.confirm) return true
  return false
})

function resetForms() {
  personalForm.fullName = displayName.value
  personalForm.email = authStore.user?.email || ''
  personalForm.phone = authStore.user?.phone || '+998 90 123 45 67'
  passwordForm.current = ''
  passwordForm.new = ''
  passwordForm.confirm = ''
  editingPersonal.value = false
}

function saveProfile() {
  editingPersonal.value = false
  passwordForm.current = ''
  passwordForm.new = ''
  passwordForm.confirm = ''
  // In real app: call API to save
}

definePageMeta({ roles: ['SUPER_HEAD', 'ADMIN', 'BUILDING_MANAGER', 'ACCOUNTANT', 'FACILITY', 'TENANT_OWNER', 'WAREHOUSE_OPERATOR', 'CONTENT_OPERATOR'], layout: 'admin', middleware: 'role' })
</script>
