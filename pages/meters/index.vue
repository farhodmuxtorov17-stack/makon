<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Hisoblagichlar</h1>
      <p class="text-ink-500 text-sm mt-1">Elektr, suv va gaz hisoblagichlari</p>
    </div>
    <div class="card p-12 text-center">
      <Gauge :size="48" class="mx-auto text-ink-600 mb-4" />
      <h3 class="font-semibold mb-2">Modul ishlab chiqilmoqda</h3>
      <p class="text-sm text-ink-500 max-w-md mx-auto">Hisoblagichlar va ko'rsatkichlar moduli tez orada tayyor bo'ladi. Bu yerda har bir binodagi hisoblagichlar, ularning oxirgi ko'rsatkichlari va tariflar bo'yicha hisob-kitob ko'rsatiladi.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Gauge } from 'lucide-vue-next'
definePageMeta({ layout: 'admin', middleware: 'auth' })
</script>
