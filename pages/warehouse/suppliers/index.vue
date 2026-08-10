<template>
  <div class="space-y-6">
    <PageHeader title="Ta'minchilar" subtitle="Yetkazib beruvchilar va kontraktlar">
      <template #actions>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Qo'shish</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="sup in serviceStore.suppliers" :key="sup.id" class="card p-5 hover:shadow-card-hover transition-all">
        <div class="flex items-start gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
            <Truck :size="22" class="text-brand-600" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-ink-900 truncate">{{ sup.name }}</h3>
            <p class="text-sm text-ink-400 truncate">{{ sup.address }}</p>
          </div>
        </div>
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2 text-ink-600"><Phone :size="14" class="text-ink-400" /> {{ sup.phone }}</div>
          <div class="flex items-center gap-2 text-ink-600"><Mail :size="14" class="text-ink-400" /> {{ sup.email }}</div>
        </div>
        <div class="mt-4 pt-3 border-t border-ink-50 flex items-center justify-between">
          <span v-if="sup.contractUrl" class="badge badge-success"><FileCheck :size="14" /> Kontrakt mavjud</span>
          <span v-else class="badge badge-neutral"><FileX :size="14" /> Kontrakt yo'q</span>
          <span class="text-xs text-ink-400">{{ formatDate(sup.createdAt) }}</span>
        </div>
      </div>
    </div>

    <BaseModal v-model="showNew" title="Yangi ta'minchi">
      <div class="space-y-4">
        <div><label class="label">Nomi</label><input class="input" /></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="label">Telefon</label><input class="input" placeholder="+998 71 ..." /></div>
          <div><label class="label">Email</label><input class="input" /></div>
        </div>
        <div><label class="label">Manzil</label><input class="input" /></div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-lg" @click="showNew = false">Bekor</button>
        <button class="btn btn-primary btn-lg" @click="showNew = false">Qo'shish</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Plus, Truck, Phone, Mail, FileCheck, FileX } from 'lucide-vue-next'

const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())

const showNew = ref(false)
function formatDate(d: string) { return d.split('T')[0] }
</script>
