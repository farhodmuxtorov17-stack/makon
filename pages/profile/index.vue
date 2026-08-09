<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold font-display">Profil</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="card p-6 text-center">
        <div
          class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-4"
        >
          <span class="text-2xl font-bold text-white">{{ authStore.initials }}</span>
        </div>
        <h2 class="text-lg font-bold">{{ authStore.user?.fullName }}</h2>
        <p class="text-sm text-neutral-500">{{ authStore.roleLabel }}</p>
        <div class="mt-4 flex flex-col gap-2 text-sm text-left">
          <div class="flex justify-between p-2 rounded-lg bg-neutral-50">
            <span class="text-neutral-500">Login</span><span class="font-mono">{{ authStore.user?.login }}</span>
          </div>
          <div class="flex justify-between p-2 rounded-lg bg-neutral-50">
            <span class="text-neutral-500">Email</span><span>{{ authStore.user?.email }}</span>
          </div>
          <div class="flex justify-between p-2 rounded-lg bg-neutral-50">
            <span class="text-neutral-500">Telefon</span><span>{{ authStore.user?.phone }}</span>
          </div>
        </div>
      </div>
      <div class="lg:col-span-2 card p-6">
        <h3 class="font-semibold mb-4">Ma'lumotlarni tahrirlash</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">Ism familiya</label><input class="input" :value="authStore.user?.fullName" />
          </div>
          <div>
            <label class="label">Email</label><input class="input" :value="authStore.user?.email" />
          </div>
          <div>
            <label class="label">Telefon</label><input class="input" :value="authStore.user?.phone" />
          </div>
          <div>
            <label class="label">Login</label><input class="input" :value="authStore.user?.login" disabled />
          </div>
        </div>
        <h3 class="font-semibold mt-6 mb-4">Parolni o'zgartirish</h3>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="label">Joriy parol</label><input type="password" class="input" /></div>
          <div><label class="label">Yangi parol</label><input type="password" class="input" /></div>
        </div>
        <div class="mt-6 flex gap-2">
          <button class="btn-primary">Saqlash</button><button class="btn-secondary">Bekor</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
definePageMeta({ middleware: 'auth' })
const authStore = useAuthStore()
</script>
