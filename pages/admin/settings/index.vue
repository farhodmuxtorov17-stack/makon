<template>
  <div class="space-y-6 max-w-2xl">
    <div>
      <h1 class="font-display text-2xl font-bold tracking-tight">Sozlamalar</h1>
      <p class="text-ink-500 text-sm mt-0.5">Tizim konfiguratsiyasi</p>
    </div>

    <div class="card p-6 space-y-4">
      <h3 class="font-semibold">Umumiy</h3>
      <div>
        <label class="label">Tashkilot nomi</label>
        <input class="input" value="MAKON Real Estate" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="label">Valyuta</label><select class="input"><option>UZS — so'm</option><option>USD — dollar</option></select></div>
        <div><label class="label">Til</label><select class="input"><option>O'zbekcha</option><option>Русский</option><option>English</option></select></div>
      </div>
      <div>
        <label class="label">Vaqt zonasi</label>
        <select class="input"><option>Asia/Tashkent (UTC+5)</option></select>
      </div>
    </div>

    <div class="card p-6 space-y-4">
      <h3 class="font-semibold">ERI imzo</h3>
      <div>
        <label class="label">ERI provider</label>
        <select class="input"><option>UZ Digital</option><option>E-Imzo</option></select>
      </div>
      <div>
        <label class="label">API kalit</label>
        <input class="input font-mono" type="password" value="eri-api-key-xxxxx" />
      </div>
    </div>

    <div class="flex justify-end">
      <button class="btn btn-primary btn-lg">Saqlash</button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
