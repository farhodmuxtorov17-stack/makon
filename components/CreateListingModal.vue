<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" @click.self="$emit('close')">
    <div class="card w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5 sticky top-0 bg-inherit z-10">
        <h3 class="text-lg font-semibold">Yangi listing</h3>
        <button @click="$emit('close')" class="btn btn-ghost btn-sm"><X :size="18" /></button>
      </div>

      <div class="p-6 space-y-4">
        <div>
          <label class="label">Bino</label>
          <select v-model="form.buildingId" class="input">
            <option value="">Tanlang...</option>
            <option v-for="b in buildings" :key="b.id" :value="b.id">{{ b.name }}</option>
          </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label">Sarlavha (UZ)</label>
            <input v-model="form.titleUz" class="input" placeholder="A-301 · 85 m² ofis" />
          </div>
          <div>
            <label class="label">Sarlavha (RU)</label>
            <input v-model="form.titleRu" class="input" placeholder="A-301 · 85 м² офис" />
          </div>
          <div>
            <label class="label">Taklif turi</label>
            <select v-model="form.offerType" class="input">
              <option value="RENT">Ijaraga</option>
              <option value="SALE">Sotuvga</option>
            </select>
          </div>
          <div>
            <label class="label">Narx (UZS)</label>
            <input v-model="form.price" type="number" class="input" placeholder="25000000" />
          </div>
        </div>

        <div>
          <label class="label">Tavsif (UZ)</label>
          <textarea v-model="form.descriptionUz" class="input min-h-[80px]" placeholder="Maydon tavsifi..."></textarea>
        </div>

        <div>
          <label class="label">Rasmlar (URL)</label>
          <div class="space-y-2">
            <div v-for="(url, i) in form.photos" :key="i" class="flex gap-2">
              <input v-model="form.photos[i]" class="input flex-1" placeholder="https://..." />
              <button @click="form.photos.splice(i, 1)" class="btn btn-ghost btn-sm"><Trash2 :size="14" /></button>
            </div>
            <button @click="form.photos.push('')" class="btn btn-secondary btn-sm w-full"><Plus :size="14" /> Rasm qo'shish</button>
          </div>
        </div>

        <div>
          <label class="label">Virtual tur URL</label>
          <input v-model="form.virtualTourUrl" class="input" placeholder="https://..." />
        </div>

        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="form.status" true-value="PUBLISHED" false-value="DRAFT" class="toggle" /> E'lon qilish
        </label>
      </div>

      <div class="flex gap-3 p-6 border-t border-black/5 dark:border-white/5 sticky bottom-0 bg-inherit">
        <button @click="$emit('close')" class="btn btn-secondary flex-1">Bekor qilish</button>
        <button @click="submit" class="btn btn-primary flex-1"><Check :size="16" /> Yaratish</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, Plus, Trash2, Check } from 'lucide-vue-next'

const props = defineProps<{ show: boolean; buildings: any[] }>()
const emit = defineEmits<{ close: []; created: [listing: any] }>()

const form = reactive({
  buildingId: '', titleUz: '', titleRu: '', offerType: 'RENT', price: 0,
  descriptionUz: '', photos: [''], virtualTourUrl: '', status: 'DRAFT',
})

function submit() {
  emit('created', {
    id: 'l' + Date.now(),
    buildingId: form.buildingId,
    titleUz: form.titleUz, titleRu: form.titleRu,
    offerType: form.offerType, price: Number(form.price), currency: 'UZS',
    descriptionUz: form.descriptionUz, descriptionRu: '',
    photos: form.photos.filter(Boolean), virtualTourUrl: form.virtualTourUrl,
    status: form.status, viewsCount: 0,
  })
  emit('close')
  Object.assign(form, { buildingId: '', titleUz: '', titleRu: '', offerType: 'RENT', price: 0, descriptionUz: '', photos: [''], virtualTourUrl: '', status: 'DRAFT' })
}
</script>
