<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Bildirishnoma shablonlari</h1>
        <p class="text-ink-500 text-sm mt-1">Hodisa bo\'yicha UZ/RU matnlarni boshqarish</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi shablon</button>
    </div>

    <!-- Template list -->
    <div class="space-y-3">
      <div v-for="tpl in templates" :key="tpl.id" class="card p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="tpl.active ? 'bg-emerald-500/10' : 'bg-zinc-500/10'">
              <Bell :size="18" :class="tpl.active ? 'text-emerald-500' : 'text-zinc-500'" />
            </div>
            <div>
              <div class="font-medium text-sm">{{ tpl.event }}</div>
              <div class="text-xs text-ink-500">{{ tpl.trigger }}</div>
            </div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="tpl.active" class="sr-only peer">
            <div class="w-11 h-6 bg-black/10 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
          </label>
        </div>

        <!-- Tabs for UZ/RU -->
        <div class="flex items-center gap-1 p-1 rounded-lg bg-black/5 dark:bg-white/5 w-fit mb-3">
          <button @click="tpl.lang = 'uz'" class="px-3 py-1 rounded text-xs transition-all" :class="tpl.lang === 'uz' ? 'bg-brand-500/10 text-brand-500' : 'text-ink-500'">UZ</button>
          <button @click="tpl.lang = 'ru'" class="px-3 py-1 rounded text-xs transition-all" :class="tpl.lang === 'ru' ? 'bg-brand-500/10 text-brand-500' : 'text-ink-500'">RU</button>
        </div>

        <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 text-sm">
          {{ tpl.lang === 'uz' ? tpl.textUz : tpl.textRu }}
        </div>

        <!-- Parameters -->
        <div class="mt-3 flex items-center gap-2 flex-wrap">
          <span class="text-xs text-ink-500">Parametrlar:</span>
          <code v-for="p in tpl.params" :key="p" class="text-xs px-2 py-0.5 rounded bg-brand-500/10 text-brand-500">{{ paramDisplay(p) }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Bell } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const templates = reactive([
  {
    id: '1', event: 'Ariza yuborildi', trigger: 'Application created', active: true, lang: 'uz',
    textUz: 'Hurmatli {{tenant_name}}, sizning {{unit_name}} uchun arizangiz qabul qilindi. Ariza raqami: {{app_number}}.',
    textRu: 'Уважаемый {{tenant_name}}, ваша заявка на {{unit_name}} принята. Номер заявки: {{app_number}}.',
    params: ['tenant_name', 'unit_name', 'app_number']
  },
  {
    id: '2', event: 'Ariza tasdiqlandi', trigger: 'Application approved', active: true, lang: 'uz',
    textUz: 'Ariza {{app_number}} tasdiqlandi. Tijoriy taklif tayyorlanmoqda.',
    textRu: 'Заявка {{app_number}} одобрена. Подготавливается коммерческое предложение.',
    params: ['app_number']
  },
  {
    id: '3', event: 'Shartnoma imzolash kutilmoqda', trigger: 'Contract draft ready', active: true, lang: 'uz',
    textUz: 'Shartnoma {{contract_number}} ERI imzolashga tayyor. Iltimos, kabinetda imzolang.',
    textRu: 'Договор {{contract_number}} готов к подписанию через ЭРИ. Пожалуйста, подпишите в кабинете.',
    params: ['contract_number']
  },
  {
    id: '4', event: 'Invoys yaratildi', trigger: 'Invoice issued', active: true, lang: 'uz',
    textUz: 'Invoys {{invoice_number}} {{period}} uchun yaratildi. Summa: {{amount}}. Muddat: {{due_date}}.',
    textRu: 'Создан счёт {{invoice_number}} за {{period}}. Сумма: {{amount}}. Срок: {{due_date}}.',
    params: ['invoice_number', 'period', 'amount', 'due_date']
  },
  {
    id: '5', event: 'Qarzdorlik ogohlantirish', trigger: 'Invoice overdue', active: false, lang: 'uz',
    textUz: 'Diqqat! Invoys {{invoice_number}} muddati o\'tdi. Qoldiq: {{balance}}.',
    textRu: 'Внимание! Срок оплаты счёта {{invoice_number}} истёк. Остаток: {{balance}}.',
    params: ['invoice_number', 'balance']
  },
  {
    id: '6', event: 'Servis so\'rov qabul qilindi', trigger: 'Service request created', active: true, lang: 'uz',
    textUz: 'Servis so\'rovi {{sr_number}} qabul qilindi. Kategoriya: {{category}}. SLA: {{sla_hours}} soat.',
    textRu: 'Сервисная заявка {{sr_number}} принята. Категория: {{category}}. SLA: {{sla_hours}} ч.',
    params: ['sr_number', 'category', 'sla_hours']
  },
  {
    id: '7', event: 'Work order tayinlandi', trigger: 'Work order assigned', active: true, lang: 'uz',
    textUz: 'Sizga work order {{wo_number}} biriktirildi. Unit: {{unit_name}}. SLA: {{sla_date}}.',
    textRu: 'Вам назначена рабочая заявка {{wo_number}}. Помещение: {{unit_name}}. SLA: {{sla_date}}.',
    params: ['wo_number', 'unit_name', 'sla_date']
  },
  {
    id: '8', event: 'Material so\'rov tasdiqlandi', trigger: 'Material request approved', active: true, lang: 'uz',
    textUz: 'Material so\'rovi {{mr_number}} tasdiqlandi. Omborga yuborildi.',
    textRu: 'Заявка на материалы {{mr_number}} одобрена. Отправлена на склад.',
    params: ['mr_number']
  },
])
function paramDisplay(p: string) { return "{{" + p + "}}" }
</script>
