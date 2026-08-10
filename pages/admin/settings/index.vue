<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold font-display">Sozlamalar</h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Tashkilot</h3>
        <div class="space-y-4">
          <div><label class="label">Nomi</label><input class="input" value="MAKON MChJ" /></div>
          <div><label class="label">INN</label><input class="input" value="123456789" /></div>
          <div>
            <label class="label">Telefon</label><input class="input" value="+998 71 123 45 67" />
          </div>
        </div>
      </div>
      <div class="card p-6">
        <h3 class="font-semibold mb-4">ERI sozlamalari</h3>
        <div class="space-y-4">
          <div>
            <label class="label">ERI endpoint</label><input class="input" value="https://eri.gov.uz/api" />
          </div>
          <div>
            <label class="label">ERI key</label><input class="input font-mono" value="eri-prod-key-xxxxx" disabled />
          </div>
          <div class="flex items-center justify-between p-3 rounded-xl bg-neutral-50">
            <span class="text-sm text-neutral-500">ERI integratsiya</span><span class="badge-success">Faol</span>
          </div>
        </div>
      </div>
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Bildirishnomalar</h3>
        <div class="space-y-3">
          <label
            class="flex items-center justify-between p-3 rounded-xl bg-neutral-50 cursor-pointer"
          ><span class="text-sm">Email bildirishnomalar</span><input type="checkbox" checked class="rounded text-primary-600" /></label>
          <label
            class="flex items-center justify-between p-3 rounded-xl bg-neutral-50 cursor-pointer"
          ><span class="text-sm">Telegram bot</span><input type="checkbox" checked class="rounded text-primary-600" /></label>
          <label
            class="flex items-center justify-between p-3 rounded-xl bg-neutral-50 cursor-pointer"
          ><span class="text-sm">SMS bildirishnomalar</span><input type="checkbox" class="rounded text-primary-600" /></label>
        </div>
      </div>
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Valyuta va til</h3>
        <div class="space-y-4">
          <div>
            <label class="label">Standart valyuta</label><select class="input cursor-pointer">
              <option>UZS</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
          <div>
            <label class="label">Til</label><select class="input cursor-pointer">
              <option>O'zbekcha</option>
              <option>Русский</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end"><button class="btn btn-primary">Saqlash</button></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>
