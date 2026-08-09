<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-950 p-6">
    <div class="max-w-md w-full text-center">
      <p class="text-7xl font-bold font-display text-primary-500">{{ error?.statusCode || 500 }}</p>
      <p class="text-lg text-neutral-400 mt-2">
        {{ error?.message || "Nimadir noto'g'ri bo'ldi" }}
      </p>
      <button class="btn-primary mt-6" @click="clearError({ redirect: '/' })">Bosh sahifaga</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clearError } from '#app'
defineProps<{ error: { statusCode: number; message: string } }>()
</script>
