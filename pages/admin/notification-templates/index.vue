<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Bildirishnoma shablonlari</h1>
        <p class="text-ink-500 text-sm mt-1">{{ templates.length }} ta shablon · {{ activeCount }} faol</p>
      </div>
      <button class="btn btn-primary btn-sm btn-glow"><Plus :size="14" /> Yangi shablon</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="tpl in templates" :key="tpl.id" class="card-premium p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="tpl.active ? 'bg-emerald-500/10' : 'bg-ink-500/10'">
              <component :is="tpl.icon" :size="18" :class="tpl.active ? 'text-emerald-500' : 'text-ink-400'" />
            </div>
            <div>
              <div class="font-semibold text-sm text-ink-900 dark:text-white">{{ tpl.event }}</div>
              <div class="text-xs text-ink-500">{{ tpl.channel }}</div>
            </div>
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="tpl.active" />
            <span class="toggle__slider"></span>
          </label>
        </div>

        <div class="space-y-2 mt-4">
          <div class="template-lang">
            <span class="badge badge-brand text-[10px]">UZ</span>
            <p class="text-sm text-ink-700 dark:text-ink-300 mt-1">{{ tpl.textUz }}</p>
          </div>
          <div class="template-lang">
            <span class="badge badge-neutral text-[10px]">RU</span>
            <p class="text-sm text-ink-700 dark:text-ink-300 mt-1">{{ tpl.textRu }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between mt-4 pt-3 border-t border-black/5 dark:border-white/5">
          <span class="text-xs text-ink-400">{{ tpl.variables.length }} ta o'zgaruvchi</span>
          <button class="btn btn-ghost btn-sm text-xs"><Edit3 :size="12" /> Tahrir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit3, Bell, FileText, Receipt, ShieldCheck, Wrench, FileSignature } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const templates = ref([
  { id: '1', event: 'Yangi ariza yuborildi', channel: 'Email + Push', icon: FileText, active: true,
    textUz: 'Yangi ariza {{number}} qabul qilindi. Unit: {{unit}}, summa: {{price}} so\'m.',
    textRu: 'Новая заявка {{number}} принята. Юнит: {{unit}}, сумма: {{price}} сум.',
    variables: ['number', 'unit', 'price'] },
  { id: '2', event: 'Invoys yaratildi', channel: 'Email + SMS', icon: Receipt, active: true,
    textUz: 'Invoys {{number}} yaratildi. Summa: {{amount}} so\'m. Muddat: {{dueDate}}.',
    textRu: 'Счет {{number}} создан. Сумма: {{amount}} сум. Срок: {{dueDate}}.',
    variables: ['number', 'amount', 'dueDate'] },
  { id: '3', event: 'ERI imzo talab qilinadi', channel: 'Email + Push', icon: ShieldCheck, active: true,
    textUz: 'Shartnoma {{number}} uchun ERI imzosi kutilmoqda. Iltimos, imzolang.',
    textRu: 'Для договора {{number}} ожидается ЭРИ подпись. Пожалуйста, подпишите.',
    variables: ['number'] },
  { id: '4', event: 'Servis so\'rov yangilandi', channel: 'Push', icon: Wrench, active: true,
    textUz: 'Servis so\'rov {{number}} statusi: {{status}}. Unit: {{unit}}.',
    textRu: 'Статус сервисной заявки {{number}}: {{status}}. Юнит: {{unit}}.',
    variables: ['number', 'status', 'unit'] },
  { id: '5', event: 'Shartnoma imzolandi', channel: 'Email + SMS', icon: FileSignature, active: true,
    textUz: 'Shartnoma {{number}} tomonlar tomonidan imzolandi. Faol sanasi: {{startDate}}.',
    textRu: 'Договор {{number}} подписан сторонами. Дата активации: {{startDate}}.',
    variables: ['number', 'startDate'] },
  { id: '6', event: 'Qarzdorlik eslatmasi', channel: 'SMS', icon: Bell, active: false,
    textUz: 'Sizning qarzdorligingiz: {{debt}} so\'m. Iltimos, to\'lovni amalga oshiring.',
    textRu: 'Ваша задолженность: {{debt}} сум. Пожалуйста, произведите оплату.',
    variables: ['debt'] },
])

const activeCount = computed(() => templates.value.filter(t => t.active).length)
</script>

<style scoped>
.toggle { position: relative; display: inline-block; width: 40px; height: 22px; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle__slider {
  position: absolute; cursor: pointer; inset: 0;
  background: rgba(0,0,0,0.1); border-radius: 22px; transition: 0.2s;
}
.dark .toggle__slider { background: rgba(255,255,255,0.1); }
.toggle__slider::before {
  position: absolute; content: ''; height: 16px; width: 16px;
  left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.2s;
}
.toggle input:checked + .toggle__slider { background: #6366f1; }
.toggle input:checked + .toggle__slider::before { transform: translateX(18px); }
.template-lang { padding: 8px; border-radius: 10px; background: rgba(0,0,0,0.02); }
.dark .template-lang { background: rgba(255,255,255,0.02); }
</style>
