<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Sozlamalar</h1>
    <div class="card-premium p-6 max-w-lg">
      <div class="space-y-4">
        <div>
          <label class="text-xs text-ink-400 block mb-1">Tashkilot nomi</label>
          <input class="input w-full" value="MAKON" />
        </div>
        <div>
          <label class="text-xs text-ink-400 block mb-1">Email</label>
          <input class="input w-full" value="info@makon.uz" />
        </div>
        <div>
          <label class="text-xs text-ink-400 block mb-1">Telefon</label>
          <input class="input w-full" value="+998 71 200 80 90" />
        </div>
        <div>
          <label class="text-xs text-ink-400 block mb-1">Til</label>
          <select class="input w-full"><option>O'zbekcha</option><option>Русский</option></select>
        </div>
      </div>
      <button class="btn-primary mt-6">Saqlash</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
</script>
