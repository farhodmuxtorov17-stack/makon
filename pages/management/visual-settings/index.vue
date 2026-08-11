<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Vizual sozlamalar</h1>
    <div class="card-premium p-6 max-w-lg">
      <div class="space-y-4">
        <div>
          <label class="text-xs text-ink-400 block mb-1">Logo</label>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-[#0066FF] flex items-center justify-center font-bold text-white">M</div>
            <button class="btn-primary">Almashtirish</button>
          </div>
        </div>
        <div>
          <label class="text-xs text-ink-400 block mb-1">Asosiy rang</label>
          <input class="input w-full" value="#0066FF" />
        </div>
      </div>
      <button class="btn-primary mt-6">Saqlash</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
</script>
