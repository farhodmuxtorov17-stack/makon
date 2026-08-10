<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Hisobotlar</h1>
      <p class="text-ink-500 text-sm mt-1">Tizim ko'rsatkichlari va analitika</p>
    </div>
    <div class="card p-12 text-center">
      <BarChart3 :size="48" class="mx-auto text-ink-600 mb-4" />
      <h3 class="font-semibold mb-2">Modul ishlab chiqilmoqda</h3>
      <p class="text-sm text-ink-500 max-w-md mx-auto">Hisobotlar moduli tez orada tayyor bo'ladi. Bandlik dinamikasi, daromad, qarzdorlik, xizmat ko'rsatish sifati bo'yicha avtomatik hisobotlar.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BarChart3 } from 'lucide-vue-next'
definePageMeta({ layout: 'admin', middleware: 'auth' })
</script>
