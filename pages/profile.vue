<template>
  <div class="space-y-6 max-w-4xl">
    <PageHeader title="Profil" subtitle="Shaxsiy ma'lumotlar va sozlamalar" />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile card -->
      <div class="card p-6 text-center">
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl font-bold text-white">{{ authStore.initials }}</span>
        </div>
        <h3 class="font-display text-xl font-bold">{{ authStore.user?.fullName }}</h3>
        <p class="text-sm text-ink-400 mt-0.5">{{ authStore.roleLabel }}</p>
        <div class="mt-4 flex items-center justify-center gap-2">
          <span class="badge badge-success">Faol</span>
          <span class="badge badge-info">ERI bog'langan</span>
        </div>
        <div class="mt-6 pt-6 border-t border-ink-100 space-y-3 text-sm text-left">
          <div class="flex items-center gap-3">
            <Mail :size="16" class="text-ink-400" />
            <span>{{ authStore.user?.email || 'admin@makon.uz' }}</span>
          </div>
          <div class="flex items-center gap-3">
            <Phone :size="16" class="text-ink-400" />
            <span>+998 90 123 45 67</span>
          </div>
          <div class="flex items-center gap-3">
            <ShieldCheck :size="16" class="text-ink-400" />
            <span class="font-mono">PINFL: 12345678901234</span>
          </div>
        </div>
      </div>

      <!-- Settings -->
      <div class="lg:col-span-2 space-y-4">
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Shaxsiy ma'lumotlar</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label">F.I.O</label>
              <input class="input" :value="authStore.user?.fullName" />
            </div>
            <div>
              <label class="label">Email</label>
              <input class="input" :value="authStore.user?.email || 'admin@makon.uz'" />
            </div>
            <div>
              <label class="label">Telefon</label>
              <input class="input" value="+998 90 123 45 67" />
            </div>
            <div>
              <label class="label">Lavozim</label>
              <input class="input" :value="authStore.roleLabel" disabled />
            </div>
          </div>
          <button class="btn btn-primary btn-sm mt-4" @click="toast.success('Saqlandi', 'Ma\'lumotlar yangilandi')">
            <Save :size="16" /> Saqlash
          </button>
        </div>

        <div class="card p-6">
          <h3 class="font-semibold mb-4">Xavfsizlik</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between py-3 border-b border-ink-100">
              <div>
                <p class="font-medium text-sm">Ikki bosqichli autentifikatsiya</p>
                <p class="text-xs text-ink-400">Telegram orqali tasdiqlash</p>
              </div>
              <button class="btn btn-outline btn-sm" @click="toast.info('2FA', 'Sozlash forma tez orada')">Sozlash</button>
            </div>
            <div class="flex items-center justify-between py-3 border-b border-ink-100">
              <div>
                <p class="font-medium text-sm">Parolni o'zgartirish</p>
                <p class="text-xs text-ink-400">Har 90 kunda yangilash tavsiya etiladi</p>
              </div>
              <button class="btn btn-outline btn-sm" @click="toast.info('Parol', 'O\'zgartirish forma tez orada')">O'zgartirish</button>
            </div>
            <div class="flex items-center justify-between py-3">
              <div>
                <p class="font-medium text-sm">Faol sessiyalar</p>
                <p class="text-xs text-ink-400">2 qurilma ulangan</p>
              </div>
              <button class="btn btn-outline btn-sm" @click="toast.info('Sessiyalar', 'Ro\'yxat tez orada')">Boshqarish</button>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="font-semibold mb-4">Bildirishnoma sozlamalari</h3>
          <div class="space-y-3">
            <label v-for="s in notifSettings" :key="s.label" class="flex items-center justify-between py-2 cursor-pointer">
              <div>
                <p class="font-medium text-sm">{{ s.label }}</p>
                <p class="text-xs text-ink-400">{{ s.desc }}</p>
              </div>
              <input type="checkbox" v-model="s.enabled" class="toggle" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Mail, Phone, ShieldCheck, Save } from 'lucide-vue-next'

const authStore = useAuthStore()
const toast = useToast()

const notifSettings = reactive([
  { label: 'Email bildirishnomalar', desc: 'Yangi ariza, to\'lov, shartnoma', enabled: true },
  { label: 'Telegram bildirishnomalar', desc: 'Tezkor xabarlar Telegram orqali', enabled: true },
  { label: 'Muddati o\'tgan to\'lovlar', desc: 'Invoys muddati o\'tganda ogohlantirish', enabled: true },
  { label: 'ERI imzo hodisalari', desc: 'Imzo kutilmoqda / imzolandi', enabled: true },
])
</script>
