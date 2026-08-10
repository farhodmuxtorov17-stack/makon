<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Rollar va ruxsatlar</h1>
      <p class="text-ink-500 text-sm mt-1">8 rol bo\'yicha ruxsat matritsasi va konfiguratsiya</p>
    </div>

    <!-- Role cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="role in roles" :key="role.value" class="card p-5 hover:border-brand-500/20 transition-all cursor-pointer" @click="selectedRole = role.value">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold" :class="role.color">
            {{ role.short }}
          </div>
          <div>
            <div class="font-medium text-sm">{{ role.label }}</div>
            <div class="text-xs text-ink-500">{{ role.level }}</div>
          </div>
        </div>
        <p class="text-xs text-ink-500 mb-3">{{ role.desc }}</p>
        <div class="flex flex-wrap gap-1">
          <span v-for="mod in role.modules" :key="mod" class="text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-ink-500">{{ mod }}</span>
        </div>
      </div>
    </div>

    <!-- Permission matrix -->
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-black/5 dark:border-white/5">
        <h3 class="font-semibold">Ruxsatlar matritsasi</h3>
        <p class="text-xs text-ink-500 mt-1">Modul bo\'yicha ruxsatlar: T - to\'liq, C - cheklangan, K - ruxsat yo\'q</p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3 text-left">Modul</th>
              <th class="px-3 py-3 text-center" v-for="role in roles" :key="role.value">{{ role.short }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mod in permissionMatrix" :key="mod.module" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3">
              <td class="px-4 py-3 font-medium">{{ mod.module }}</td>
              <td v-for="role in roles" :key="role.value" class="px-3 py-3 text-center">
                <span class="inline-flex w-6 h-6 rounded-md items-center justify-center text-xs font-bold"
                  :class="permClass(mod[role.value])">
                  {{ mod[role.value] }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 flex items-center gap-4 text-xs text-ink-500 border-t border-black/5 dark:border-white/5">
        <div class="flex items-center gap-1"><span class="w-5 h-5 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">T</span> To\'liq</div>
        <div class="flex items-center gap-1"><span class="w-5 h-5 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs font-bold">C</span> Cheklangan</div>
        <div class="flex items-center gap-1"><span class="w-5 h-5 rounded bg-red-500/10 text-red-500 flex items-center justify-center text-xs font-bold">K</span> Ruxsat yo\'q</div>
      </div>
    </div>

    <!-- ERI permissions -->
    <div class="card p-6">
      <h3 class="font-semibold mb-4">ERI vakolatlari</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div v-for="eri in eriPerms" :key="eri.role" class="flex items-start gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
          <FileSignature :size="18" class="text-brand-500 flex-shrink-0 mt-0.5" />
          <div>
            <div class="text-sm font-medium">{{ eri.role }}</div>
            <div class="text-xs text-ink-500">{{ eri.actions }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileSignature } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const selectedRole = ref('SUPER_HEAD')

const roles = [
  { value: 'ADMIN', short: 'AD', label: 'Administrator', level: 'Texnik', color: 'bg-zinc-500/10 text-zinc-500', desc: 'Global sozlamalar, API/ERI, foydalanuvchilar', modules: ['Settings', 'Users', 'Roles', 'Audit', 'Monitoring'] },
  { value: 'SUPER_HEAD', short: 'SR', label: 'Super rahbar', level: 'Strategik', color: 'bg-purple-500/10 text-purple-500', desc: 'KPI, audit, bino rahbarlarini tayinlash', modules: ['Dashboard', 'Portfolio', 'Reports', 'Audit'] },
  { value: 'BUILDING_MANAGER', short: 'BR', label: 'Bino rahbari', level: 'Operatsion', color: 'bg-blue-500/10 text-blue-500', desc: 'Ariza, servis, shartnoma, listing', modules: ['Buildings', 'Units', 'Applications', 'Service', 'Contracts'] },
  { value: 'ACCOUNTANT', short: 'BX', label: 'Buxgalter', level: 'Moliyaviy', color: 'bg-emerald-500/10 text-emerald-500', desc: 'Invoice, to\'lov, qarzdorlik, ERI', modules: ['Finance', 'Billing', 'Contracts', 'Reports'] },
  { value: 'FACILITY', short: 'PU', label: 'Pudratchi', level: 'Texnik', color: 'bg-amber-500/10 text-amber-500', desc: 'Work order, ta\'mirlash, material', modules: ['Work Orders', 'Materials', 'Photos'] },
  { value: 'WAREHOUSE_OPERATOR', short: 'OM', label: 'Omborchi', level: 'Moddiy', color: 'bg-orange-500/10 text-orange-500', desc: 'Material berish, nakladnoy, qoldiq', modules: ['Inventory', 'Stock Issues', 'Waybills'] },
  { value: 'CONTENT_OPERATOR', short: 'CO', label: 'Kontent operator', level: 'Axborot', color: 'bg-pink-500/10 text-pink-500', desc: '2D reja, poligon, unit mapping', modules: ['Floor Plans', 'Polygons', 'Attributes'] },
  { value: 'TENANT_OWNER', short: 'IJ', label: 'Ijarachi/mulkdor', level: 'Tashqi', color: 'bg-indigo-500/10 text-indigo-500', desc: 'Katalog, ariza, ERI, shartnoma', modules: ['Catalog', 'Applications', 'Cabinet', 'Service'] },
]

const permissionMatrix = [
  { module: 'Obyektlar (read)', ADMIN: 'T', SUPER_HEAD: 'T', BUILDING_MANAGER: 'C', ACCOUNTANT: 'K', FACILITY: 'C', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'C', TENANT_OWNER: 'K' },
  { module: 'Obyektlar (manage)', ADMIN: 'K', SUPER_HEAD: 'K', BUILDING_MANAGER: 'T', ACCOUNTANT: 'K', FACILITY: 'K', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'K' },
  { module: 'Unitlar (read)', ADMIN: 'T', SUPER_HEAD: 'T', BUILDING_MANAGER: 'T', ACCOUNTANT: 'C', FACILITY: 'C', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'T', TENANT_OWNER: 'C' },
  { module: 'Unitlar (manage)', ADMIN: 'K', SUPER_HEAD: 'K', BUILDING_MANAGER: 'T', ACCOUNTANT: 'K', FACILITY: 'K', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'C', TENANT_OWNER: 'K' },
  { module: 'Listinglar', ADMIN: 'K', SUPER_HEAD: 'K', BUILDING_MANAGER: 'T', ACCOUNTANT: 'K', FACILITY: 'K', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'K' },
  { module: 'Arizalar (read)', ADMIN: 'K', SUPER_HEAD: 'T', BUILDING_MANAGER: 'T', ACCOUNTANT: 'T', FACILITY: 'K', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'T' },
  { module: 'Ariza operatsion ko\'rik', ADMIN: 'K', SUPER_HEAD: 'K', BUILDING_MANAGER: 'T', ACCOUNTANT: 'K', FACILITY: 'K', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'K' },
  { module: 'Ariza moliyaviy ko\'rik', ADMIN: 'K', SUPER_HEAD: 'K', BUILDING_MANAGER: 'K', ACCOUNTANT: 'T', FACILITY: 'K', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'K' },
  { module: 'Shartnomalar (read)', ADMIN: 'K', SUPER_HEAD: 'T', BUILDING_MANAGER: 'T', ACCOUNTANT: 'T', FACILITY: 'K', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'T' },
  { module: 'Shartnoma manage', ADMIN: 'K', SUPER_HEAD: 'K', BUILDING_MANAGER: 'T', ACCOUNTANT: 'T', FACILITY: 'K', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'K' },
  { module: 'ERI imzolash', ADMIN: 'K', SUPER_HEAD: 'C', BUILDING_MANAGER: 'C', ACCOUNTANT: 'T', FACILITY: 'K', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'T' },
  { module: 'Invoice/billing', ADMIN: 'K', SUPER_HEAD: 'T', BUILDING_MANAGER: 'C', ACCOUNTANT: 'T', FACILITY: 'K', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'C' },
  { module: 'Servis so\'rovi', ADMIN: 'K', SUPER_HEAD: 'T', BUILDING_MANAGER: 'T', ACCOUNTANT: 'K', FACILITY: 'T', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'C' },
  { module: 'Work order', ADMIN: 'K', SUPER_HEAD: 'T', BUILDING_MANAGER: 'T', ACCOUNTANT: 'K', FACILITY: 'T', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'K' },
  { module: 'Material so\'rov', ADMIN: 'K', SUPER_HEAD: 'T', BUILDING_MANAGER: 'C', ACCOUNTANT: 'T', FACILITY: 'T', WAREHOUSE_OPERATOR: 'C', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'K' },
  { module: 'Ombor/inventar', ADMIN: 'K', SUPER_HEAD: 'T', BUILDING_MANAGER: 'C', ACCOUNTANT: 'T', FACILITY: 'C', WAREHOUSE_OPERATOR: 'T', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'K' },
  { module: 'Hisoblagichlar', ADMIN: 'K', SUPER_HEAD: 'T', BUILDING_MANAGER: 'T', ACCOUNTANT: 'C', FACILITY: 'C', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'C' },
  { module: 'Hisobotlar', ADMIN: 'T', SUPER_HEAD: 'T', BUILDING_MANAGER: 'T', ACCOUNTANT: 'T', FACILITY: 'C', WAREHOUSE_OPERATOR: 'C', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'K' },
  { module: 'Audit', ADMIN: 'T', SUPER_HEAD: 'T', BUILDING_MANAGER: 'K', ACCOUNTANT: 'K', FACILITY: 'K', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'K' },
  { module: 'Foydalanuvchilar', ADMIN: 'T', SUPER_HEAD: 'C', BUILDING_MANAGER: 'K', ACCOUNTANT: 'K', FACILITY: 'K', WAREHOUSE_OPERATOR: 'K', CONTENT_OPERATOR: 'K', TENANT_OWNER: 'K' },
]

const eriPerms = [
  { role: 'Ijarachi / mulkdor', actions: 'Ro\'yxatdan o\'tish, kirish, shartnoma imzolash' },
  { role: 'Buxgalter', actions: 'Moliyaviy hujjatlar, aktlar, tasdiqlashlar' },
  { role: 'Bino rahbari', actions: 'Shartnoma, qo\'shimcha kelishuv, vakolatli hujjatlar' },
  { role: 'Super rahbar', actions: 'Faqat kritik, yuqori darajadagi tasdiqlar' },
]

function permClass(v: string) { return { T: 'bg-emerald-500/10 text-emerald-500', C: 'bg-amber-500/10 text-amber-500', K: 'bg-red-500/10 text-red-500' }[v] || 'bg-zinc-500/10 text-zinc-500' }
</script>
