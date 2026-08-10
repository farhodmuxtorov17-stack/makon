<template>
  <div class="space-y-6 max-w-3xl">
    <div>
      <h1 class="font-display text-2xl font-bold tracking-tight">Profil</h1>
      <p class="text-ink-500 text-sm mt-0.5">Shaxsiy ma'lumotlar va sozlamalar</p>
    </div>

    <div class="card p-6">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
          <span class="text-2xl font-bold text-white">{{ authStore.initials }}</span>
        </div>
        <div>
          <h2 class="font-semibold text-lg text-ink-900">{{ authStore.user?.fullName }}</h2>
          <p class="text-sm text-ink-400">{{ authStore.roleLabel }} · {{ authStore.user?.email }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div><label class="label">Ism familiya</label><input class="input" :value="authStore.user?.fullName" readonly /></div>
        <div><label class="label">Email</label><input class="input" :value="authStore.user?.email" readonly /></div>
        <div><label class="label">Telefon</label><input class="input" :value="authStore.user?.phone" readonly /></div>
        <div><label class="label">Login</label><input class="input" :value="authStore.user?.login" readonly /></div>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="font-semibold mb-4">Xavfsizlik</h3>
      <div class="space-y-3">
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
      <h3 class="font-semibold mb-4 text-rose-600">Sessiya</h3>
      <button class="btn btn-danger btn-lg w-full" @click="logout">
        <LogOut :size="18" />
        Tizimdan chiqish
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lock, ShieldCheck, ChevronRight, LogOut } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>
