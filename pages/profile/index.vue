<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold font-display">Profil</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile card -->
      <div class="card p-6 text-center">
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl font-bold text-white">{{ authStore.initials }}</span>
        </div>
        <h2 class="text-lg font-bold">{{ authStore.user?.fullName }}</h2>
        <p class="text-sm text-neutral-500">{{ authStore.roleLabel }}</p>
        <div class="mt-4 flex flex-col gap-2 text-sm text-left">
          <div class="flex justify-between p-2.5 rounded-xl bg-neutral-50"><span class="text-neutral-500">Login</span><span class="font-mono font-medium">{{ authStore.user?.login }}</span></div>
          <div class="flex justify-between p-2.5 rounded-xl bg-neutral-50"><span class="text-neutral-500">Email</span><span class="font-medium">{{ authStore.user?.email || '—' }}</span></div>
          <div class="flex justify-between p-2.5 rounded-xl bg-neutral-50"><span class="text-neutral-500">Telefon</span><span class="font-medium">{{ authStore.user?.phone || '—' }}</span></div>
        </div>
        <div class="mt-4 pt-4 border-t border-neutral-100">
          <div class="flex items-center justify-between text-sm">
            <span class="text-neutral-500">ERI holati</span>
            <span class="badge badge-success"><CheckCircle2 :size="12" :stroke-width="2.5" /> Faol</span>
          </div>
        </div>
      </div>

      <!-- Edit form -->
      <div class="lg:col-span-2 space-y-6">
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Ma'lumotlarni tahrirlash</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label class="label">Ism familiya</label><input class="input" :value="authStore.user?.fullName" /></div>
            <div><label class="label">Email</label><input class="input" :value="authStore.user?.email" /></div>
            <div><label class="label">Telefon</label><input class="input" :value="authStore.user?.phone" /></div>
            <div><label class="label">Login</label><input class="input" :value="authStore.user?.login" disabled /></div>
          </div>
          <div class="mt-6 flex flex-col sm:flex-row gap-2">
            <button class="btn btn-primary">Saqlash</button>
            <button class="btn btn-secondary">Bekor</button>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="font-semibold mb-4">Parolni o'zgartirish</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label class="label">Joriy parol</label><input type="password" class="input" placeholder="••••••••" /></div>
            <div><label class="label">Yangi parol</label><input type="password" class="input" placeholder="••••••••" /></div>
          </div>
          <div class="mt-6 flex flex-col sm:flex-row gap-2">
            <button class="btn btn-primary">Yangilash</button>
            <button class="btn btn-secondary">Bekor</button>
          </div>
        </div>

        <!-- Notification preferences -->
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Bildirishnoma sozlamalari</h3>
          <div class="space-y-3">
            <label v-for="pref in notifPrefs" :key="pref.key" class="flex items-center justify-between p-3 rounded-xl bg-neutral-50 cursor-pointer">
              <div><p class="text-sm font-medium text-neutral-900">{{ pref.label }}</p><p class="text-xs text-neutral-400">{{ pref.desc }}</p></div>
              <input type="checkbox" :checked="pref.enabled" class="rounded border-neutral-300 text-primary-600 focus:ring-primary-200 w-5 h-5" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ middleware: 'auth' })
const authStore = useAuthStore()

const notifPrefs = ref([
  { key: 'email', label: 'Email bildirishnomalar', desc: 'Invoyslar va arizalar haqida xabar', enabled: true },
  { key: 'push', label: 'Push bildirishnomalar', desc: 'Brauzer va mobil push', enabled: true },
  { key: 'telegram', label: 'Telegram bot', desc: 'Telegram orqali xabarlar', enabled: false },
  { key: 'sms', label: 'SMS bildirishnomalar', desc: 'Muhli holatlar uchun SMS', enabled: false },
])
</script>
