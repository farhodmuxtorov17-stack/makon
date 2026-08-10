<template>
  <div class="min-h-screen flex items-center justify-center bg-ink-50 px-4">
    <div class="text-center">
      <div class="w-20 h-20 rounded-2xl bg-ink-950 flex items-center justify-center mx-auto mb-8">
        <Building2 :size="36" class="text-white" />
      </div>
      <p class="font-display text-7xl font-bold text-ink-900">404</p>
      <p class="text-lg text-ink-500 mt-2">Sahifa topilmadi</p>
      <p class="text-sm text-ink-400 mt-1 mb-8">Sahifa o'chirilgan yoki manzil noto'g'ri bo'lishi mumkin</p>
      <button class="btn btn-primary btn-lg" @click="handleError">Bosh sahifaga qaytish</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2 } from 'lucide-vue-next'
import { clearError } from '#app'
function handleError() { clearError({ redirect: '/' }) }
</script>
