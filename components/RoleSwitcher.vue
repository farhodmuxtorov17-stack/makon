<template>
  <div class="relative">
    <button
      @click="open = !open"
      class="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all text-sm"
    >
      <div class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" :class="currentRole.color">
        {{ currentRole.short }}
      </div>
      <span class="font-medium text-ink-900 dark:text-white">{{ currentRole.label }}</span>
      <ChevronDown :size="14" class="text-ink-500 transition-transform" :class="{ 'rotate-180': open }" />
    </button>

    <transition name="dropdown">
      <div v-if="open" class="absolute right-0 top-full mt-2 w-80 card p-2 z-50 shadow-xl">
        <div class="px-3 py-2 text-xs text-ink-500 font-medium uppercase tracking-wide">Rolni tanlang</div>
        <button
          v-for="role in roles"
          :key="role.value"
          @click="selectRole(role)"
          class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all text-left"
          :class="{ 'bg-brand-500/10': currentRoleValue === role.value }"
        >
          <div class="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" :class="role.color">
            {{ role.short }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-ink-900 dark:text-white">{{ role.label }}</div>
            <div class="text-xs text-ink-500 truncate">{{ role.desc }}</div>
          </div>
          <Check v-if="currentRoleValue === role.value" :size="16" class="text-brand-500 flex-shrink-0" />
        </button>
      </div>
    </transition>

    <div v-if="open" class="fixed inset-0 z-40" @click="open = false" />
  </div>
</template>

<script setup lang="ts">
import { ChevronDown, Check } from 'lucide-vue-next'

const currentRoleValue = useState('currentRole', () => 'SUPER_HEAD')
const open = ref(false)

const roles = [
  { value: 'ADMIN', short: 'AD', label: 'Administrator', desc: 'Texnik boshqaruv, sozlamalar', color: 'bg-zinc-500/10 text-zinc-500' },
  { value: 'SUPER_HEAD', short: 'SR', label: 'Super rahbar', desc: 'Strategik nazorat, KPI', color: 'bg-purple-500/10 text-purple-500' },
  { value: 'BUILDING_MANAGER', short: 'BR', label: 'Bino rahbari', desc: 'Operatsion boshqaruv', color: 'bg-blue-500/10 text-blue-500' },
  { value: 'ACCOUNTANT', short: 'BX', label: 'Buxgalter', desc: 'Moliyaviy nazorat', color: 'bg-emerald-500/10 text-emerald-500' },
  { value: 'FACILITY', short: 'PU', label: 'Pudratchi', desc: 'Texnik xizmat, work order', color: 'bg-amber-500/10 text-amber-500' },
  { value: 'WAREHOUSE_OPERATOR', short: 'OM', label: 'Omborchi', desc: 'Material, inventar', color: 'bg-orange-500/10 text-orange-500' },
  { value: 'CONTENT_OPERATOR', short: 'CO', label: 'Kontent operator', desc: '2D reja, poligonlar', color: 'bg-pink-500/10 text-pink-500' },
  { value: 'TENANT_OWNER', short: 'IJ', label: 'Ijarachi / mulkdor', desc: 'Kabinet, ariza, shartnoma', color: 'bg-indigo-500/10 text-indigo-500' },
]

const currentRole = computed(() => roles.find(r => r.value === currentRoleValue.value) || roles[1])

function selectRole(role: any) {
  currentRoleValue.value = role.value
  open.value = false
}
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.2s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
