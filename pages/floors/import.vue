<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-white">Plan import qilish</h1>
      <p class="text-ink-400 text-sm mt-1">SVG plan faylini yuklash va biriktirish</p>
    </div>

    <div class="card p-8">
      <div class="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-brand-500/30 transition-colors cursor-pointer">
        <Upload :size="40" class="text-ink-600 mx-auto mb-4" />
        <h3 class="text-white font-semibold mb-1">SVG faylni yuklang</h3>
        <p class="text-ink-500 text-sm mb-4">Maksimal 10MB · .svg format</p>
        <button class="btn btn-primary">Fayl tanlash</button>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="text-white font-semibold mb-4">Import qilish bosqichlari</h3>
      <div class="space-y-3">
        <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="step.done ? 'bg-emerald-500/10' : 'bg-white/5'">
            <CheckCircle2 v-if="step.done" :size="16" class="text-emerald-400" />
            <span v-else class="text-ink-500 text-sm">{{ i + 1 }}</span>
          </div>
          <span class="text-sm" :class="step.done ? 'text-white' : 'text-ink-400'">{{ step.label }}</span>
        </div>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="text-white font-semibold mb-4">Biriktirish</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="label">Bino</label>
          <select class="input"><option>Tashkent City Tower</option><option>Trillant Tower</option></select>
        </div>
        <div>
          <label class="label">Qavat</label>
          <input class="input" type="number" placeholder="1" />
        </div>
        <div>
          <label class="label">Format</label>
          <select class="input"><option>SVG</option><option>PDF</option></select>
        </div>
      </div>
      <button class="btn btn-primary mt-4">Import qilish</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Upload, CheckCircle2 } from 'lucide-vue-next'
definePageMeta({ middleware: 'auth' })

const steps = [
  { label: 'SVG faylni yuklash', done: false },
  { label: 'Layer va poligonlarni aniqlash', done: false },
  { label: 'Unitlarni avtomatik belgilash', done: false },
  { label: 'Bino va qavatga biriktirish', done: false },
  { label: 'Tekshirish va tasdiqlash', done: false },
]
</script>
