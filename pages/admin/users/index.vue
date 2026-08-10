<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Foydalanuvchilar</h1>
      <p class="text-ink-500 text-sm mt-1">Tizim foydalanuvchilari va rollari</p>
    </div>
    <div class="card p-12 text-center">
      <ShieldCheck :size="48" class="mx-auto text-ink-600 mb-4" />
      <h3 class="font-semibold mb-2">Modul ishlab chiqilmoqda</h3>
      <p class="text-sm text-ink-500 max-w-md mx-auto">Foydalanuvchilar moduli tez orada tayyor bo'ladi. 5 rol: SUPER_HEAD, BUILDING_MANAGER, ACCOUNTANT, FACILITY, TENANT_OWNER. Rolga qarab huquqlar boshqaruvi.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next'
definePageMeta({ layout: 'admin', middleware: 'auth' })
</script>
