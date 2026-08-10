<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Ombor</h1>
      <p class="text-ink-500 text-sm mt-1">Materiallar va zaxiralar</p>
    </div>
    <div class="card p-12 text-center">
      <Package :size="48" class="mx-auto text-ink-600 mb-4" />
      <h3 class="font-semibold mb-2">Modul ishlab chiqilmoqda</h3>
      <p class="text-sm text-ink-500 max-w-md mx-auto">Ombor moduli tez orada tayyor bo'ladi. Materiallar ro'yxati, qoldiqlar, ishga sarflash va yetkazib berishlar.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Package } from 'lucide-vue-next'
definePageMeta({ layout: 'admin', middleware: 'auth' })
</script>
