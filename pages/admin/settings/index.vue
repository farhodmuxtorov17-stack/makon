<template>
  <div class="space-y-6 animate-fade-up max-w-4xl">
    <!-- ═══ Header ═══ -->
    <div class="flex items-center justify-between">
      <div>
        <div class="eyebrow">Tizim sozlamalari</div>
        <h1 class="page-title">Tizim sozlamalari</h1>
        <p class="page-sub">MAKON platformasi konfiguratsiyasi</p>
      </div>
    </div>

    <!-- ═══ Settings Cards ═══ -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- General -->
      <div class="card p-5">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl surface-brand flex items-center justify-center">
            <Settings :size="18" class="text-blue-500" />
          </div>
          <div>
            <div class="text-sm font-semibold text-ink-900 ">Umumiy sozlamalar</div>
            <div class="text-xs text-ink-400">Asosiy konfiguratsiya</div>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-ink-600 ">Til</span>
            <select class="input w-auto text-sm">
              <option>O'zbekcha</option>
              <option>Русский</option>
              <option>English</option>
            </select>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-ink-600 ">Valyuta</span>
            <select class="input w-auto text-sm">
              <option>UZS</option>
              <option>USD</option>
            </select>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-ink-600 ">Vaqt zonasi</span>
            <select class="input w-auto text-sm">
              <option>UTC+5 (Tashkent)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Security -->
      <div class="card p-5">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl surface-success flex items-center justify-center">
            <Shield :size="18" class="text-emerald-500" />
          </div>
          <div>
            <div class="text-sm font-semibold text-ink-900 ">Xavfsizlik</div>
            <div class="text-xs text-ink-400">Autentifikatsiya</div>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-ink-600 ">OTP orqali kirish</span>
            <div class="relative w-10 h-6 rounded-full bg-emerald-500 cursor-pointer">
              <div class="absolute right-1 top-1 w-4 h-4 rounded-full bg-white transition-all"></div>
            </div>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-ink-600 ">Ikki faktorli autent.</span>
            <div class="relative w-10 h-6 rounded-full bg-ink-200  cursor-pointer">
              <div class="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all"></div>
            </div>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-ink-600 ">Sessiya timeout</span>
            <select class="input w-auto text-sm">
              <option>30 daqiqa</option>
              <option>1 soat</option>
              <option>24 soat</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Integrations -->
      <div class="card p-5">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl surface-warning flex items-center justify-center">
            <Plug :size="18" class="text-amber-500" />
          </div>
          <div>
            <div class="text-sm font-semibold text-ink-900 ">Integratsiyalar</div>
            <div class="text-xs text-ink-400">Tashqi tizimlar</div>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex items-center justify-between py-2 px-3 rounded-xl bg-emerald-500/5">
            <div class="flex items-center gap-2">
              <FileSignature :size="16" class="text-emerald-500" />
              <span class="text-sm font-medium text-ink-900 ">Didox</span>
            </div>
            <span class="badge badge-success">Faol</span>
          </div>
          <div class="flex items-center justify-between py-2 px-3 rounded-xl bg-ink-100 ">
            <div class="flex items-center gap-2">
              <Mail :size="16" class="text-ink-400" />
              <span class="text-sm text-ink-500">Email bildirishnomalar</span>
            </div>
            <span class="badge badge-neutral">O'chirilgan</span>
          </div>
          <div class="flex items-center justify-between py-2 px-3 rounded-xl bg-ink-100 ">
            <div class="flex items-center gap-2">
              <MessageSquare :size="16" class="text-ink-400" />
              <span class="text-sm text-ink-500">SMS gateway</span>
            </div>
            <span class="badge badge-neutral">O'chirilgan</span>
          </div>
        </div>
      </div>

      <!-- Backup -->
      <div class="card p-5">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl surface-brand flex items-center justify-center">
            <Database :size="18" class="text-blue-500" />
          </div>
          <div>
            <div class="text-sm font-semibold text-ink-900 ">Rezerv nusxa</div>
            <div class="text-xs text-ink-400">Ma'lumotlar xavfsizligi</div>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-ink-600 ">Avto rezerv nusxa</span>
            <div class="relative w-10 h-6 rounded-full bg-emerald-500 cursor-pointer">
              <div class="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
            </div>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-ink-600 "> chastotasi</span>
            <select class="input w-auto text-sm">
              <option>Har kuni</option>
              <option>Haftada</option>
              <option>Oyda</option>
            </select>
          </div>
          <div class="text-xs text-ink-400 mt-2">
            Oxirgi rezerv nusxa: 2026-08-12 09:00
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ Save ═══ -->
    <div class="flex justify-end gap-3">
      <button class="btn btn-secondary btn-md" @click="() => {}">Bekor qilish</button>
      <button class="btn btn-primary btn-md" @click="() => {}">
        <Check :size="16" /> Saqlash
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Settings, Shield, Plug, Database, FileSignature, Mail, MessageSquare, Check
} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'ADMIN'],  layout: 'admin', middleware: 'role' })
</script>
