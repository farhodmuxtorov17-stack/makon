<template>
  <div class="space-y-6 max-w-3xl">
    <PageHeader title="Profil" subtitle="Shaxsiy ma'lumotlar va sozlamalar" />

    <div class="card p-6">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
          <span class="text-3xl font-bold text-white">{{ authStore.initials }}</span>
        </div>
        <div>
          <h2 class="font-semibold text-xl text-ink-900">{{ authStore.user?.fullName }}</h2>
          <p class="text-sm text-ink-400">{{ authStore.roleLabel }} · {{ authStore.user?.email }}</p>
          <div class="flex items-center gap-2 mt-2">
            <span class="badge badge-success"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Aktiv</span>
            <span class="text-xs text-ink-400">Qo'shilgan: {{ authStore.user?.createdAt?.split('T')[0] }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div><label class="label">Ism familiya</label><input class="input" :value="authStore.user?.fullName" /></div>
        <div><label class="label">Email</label><input class="input" :value="authStore.user?.email" /></div>
        <div><label class="label">Telefon</label><input class="input" :value="authStore.user?.phone" /></div>
        <div><label class="label">Login</label><input class="input" :value="authStore.user?.login" readonly /></div>
      </div>
      <div class="flex justify-end mt-4">
        <button class="btn btn-primary btn-lg">Saqlash</button>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="font-semibold mb-4">Xavfsizlik</h3>
      <div class="space-y-2">
        <button class="btn btn-outline btn-lg w-full justify-between">
          <span class="flex items-center gap-3"><Lock :size="18" /> Parolni o'zgartirish</span>
          <ChevronRight :size="18" class="text-ink-400" />
        </button>
        <button class="btn btn-outline btn-lg w-full justify-between">
          <span class="flex items-center gap-3"><ShieldCheck :size="18" /> ERI imzo sozlamalari</span>
          <ChevronRight :size="18" class="text-ink-400" />
        </button>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="font-semibold mb-4 text-rose-600">Xavfsiz chiqish</h3>
      <button class="btn btn-danger btn-lg w-full" @click="showLogout = true">
        <LogOut :size="18" /> Tizimdan chiqish
      </button>
    </div>

    <BaseConfirm v-model="showLogout" title="Tizimdan chiqishni tasdiqlang"
      message="Joriy sessiyangiz tugatiladi. Qayta kirishingiz kerak bo'ladi."
      confirmText="Chiqish" :danger="true" @confirm="logout" />
  </div>
</template>

<script setup lang="ts">
import { Lock, ShieldCheck, ChevronRight, LogOut } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()
const showLogout = ref(false)

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>
