<template>
  <div class="space-y-6 max-w-4xl">
    <PageHeader title="Sozlamalar" subtitle="Tizim konfiguratsiyasi" />

    <div class="card p-6">
      <h3 class="font-semibold mb-4">Umumiy</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label class="label">Tashkilot nomi</label><input class="input" value="MAKON Real Estate" /></div>
        <div><label class="label">INN</label><input class="input font-mono" value="305847921" /></div>
        <div><label class="label">Asosiy valyuta</label><select class="input"><option>UZS — O'zbek so'mi</option><option>USD — AQSh dollari</option></select></div>
        <div><label class="label">Til</label><select class="input"><option>O'zbekcha</option><option>Русский</option><option>English</option></select></div>
        <div><label class="label">Vaqt zonasi</label><select class="input"><option>UTC+5 (Toshkent)</option></select></div>
        <div><label class="label">Kun tartibi</label><select class="input"><option>Du-Ju, 09:00-18:00</option></select></div>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="font-semibold mb-4">ERI imzo</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between py-3 border-b border-ink-100">
          <div><p class="font-medium text-sm">ERI provayder</p><p class="text-xs text-ink-400">Imzo.uz — integratsiya faol</p></div>
          <span class="badge badge-success">Ulangan</span>
        </div>
        <div class="flex items-center justify-between py-3 border-b border-ink-100">
          <div><p class="font-medium text-sm">Avtomatik imzo so'rovi</p><p class="text-xs text-ink-400">Shartnoma yaratilganda ERI yuborish</p></div>
          <input type="checkbox" checked class="toggle" />
        </div>
        <div class="flex items-center justify-between py-3">
          <div><p class="font-medium text-sm">Imzo muddati</p><p class="text-xs text-ink-400">Javob kutish kuni soni</p></div>
          <input type="number" value="7" class="input w-20 text-center" />
        </div>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="font-semibold mb-4">To'lov tizimlari</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between py-3 border-b border-ink-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center"><span class="text-sky-600 font-bold text-sm">C</span></div>
            <div><p class="font-medium text-sm">Click</p><p class="text-xs text-ink-400">Integratsiya faol</p></div>
          </div>
          <span class="badge badge-success">Faol</span>
        </div>
        <div class="flex items-center justify-between py-3 border-b border-ink-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><span class="text-emerald-600 font-bold text-sm">P</span></div>
            <div><p class="font-medium text-sm">Payme</p><p class="text-xs text-ink-400">Integratsiya faol</p></div>
          </div>
          <span class="badge badge-success">Faol</span>
        </div>
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center"><span class="text-brand-600 font-bold text-sm">B</span></div>
            <div><p class="font-medium text-sm">Bank o'tkazma</p><p class="text-xs text-ink-400">Manual tasdiq</p></div>
          </div>
          <span class="badge badge-info">Manual</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button class="btn btn-primary btn-lg" @click="toast.success('Saqlandi', 'Sozlamalar yangilandi')"><Save :size="18" /> Saqlash</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Save } from 'lucide-vue-next'
const toast = useToast()
</script>
