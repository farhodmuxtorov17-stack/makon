<template>
  <div class="space-y-6 animate-fade-up max-w-4xl mx-auto">
    <!-- ═══ Header ═══ -->
    <div class="flex items-center justify-between">
      <div>
        <div class="eyebrow">Profil sozlamalari</div>
        <h1 class="page-title">Profil sozlamalari</h1>
        <p class="page-sub">Shaxsiy ma'lumotlaringizni boshqaring</p>
      </div>
      <div class="stat-pill stat-pill--brand">
        <ShieldCheck :size="14" />
        <span>Super Rahbar</span>
      </div>
    </div>

    <!-- ═══ Profile Card ═══ -->
    <div class="card p-6">
      <div class="flex items-start gap-5">
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-500/20 flex-shrink-0">A</div>
        <div class="flex-1">
          <h2 class="text-xl font-bold text-ink-900 ">Admin User</h2>
          <p class="page-sub">{{ authStore.user?.email || "user@makon.uz" }}</p>
          <div class="flex items-center gap-3 mt-3">
            <span class="badge badge-brand">SUPER_HEAD</span>
            <span class="badge badge-success">Faol</span>
          </div>
        </div>
        <button class="btn btn-secondary btn-md" @click="() => {}">
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
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="label">To'liq ism</label>
          <input type="text" value="Admin User" class="input" />
        </div>
        <div>
          <label class="label">Email</label>
          <input type="email" :value="authStore.user?.email || ''" class="input" />
        </div>
        <div>
          <label class="label">Telefon</label>
          <input type="tel" value="+998 90 123 45 67" class="input" />
        </div>
        <div>
          <label class="label">Rol</label>
          <input type="text" value="Super Rahbar" class="input" disabled />
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="label">Joriy parol</label>
          <input type="password" placeholder="••••••••" class="input" />
        </div>
        <div></div>
        <div>
          <label class="label">Yangi parol</label>
          <input type="password" placeholder="••••••••" class="input" />
        </div>
        <div>
          <label class="label">Parolni tasdiqlang</label>
          <input type="password" placeholder="••••••••" class="input" />
        </div>
      </div>
      <div class="flex items-center justify-between mt-5 pt-5 border-t border-ink-100 ">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl surface-brand flex items-center justify-center">
            <Smartphone :size="18" class="text-blue-500" />
          </div>
          <div>
            <div class="text-sm font-medium text-ink-900 ">Telefon tasdiqlangan</div>
            <div class="text-xs text-ink-400">+998 90 *** ** 67</div>
          </div>
        </div>
        <button class="btn btn-ghost btn-sm" @click="editing = true">O'zgartirish</button>
      </div>
    </div>

    <!-- ═══ Save ═══ -->
    <div class="flex justify-end gap-3">
      <button class="btn btn-secondary btn-md" @click="editing = false">Bekor qilish</button>
      <button class="btn btn-primary btn-md" @click="saveProfile">
        <Check :size="16" /> Saqlash
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, Camera, Smartphone, Check } from 'lucide-vue-next'

const authStore = useAuthStore()
const editing = ref(false)

function saveProfile() {
  editing.value = false
}

definePageMeta({ roles: ['SUPER_HEAD', 'ADMIN', 'BUILDING_MANAGER', 'ACCOUNTANT', 'FACILITY', 'TENANT_OWNER', 'WAREHOUSE_OPERATOR', 'CONTENT_OPERATOR'],  layout: 'admin', middleware: 'role' })
</script>
