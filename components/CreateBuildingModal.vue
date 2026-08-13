<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" @click.self="$emit('close')">
    <div class="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-black/5  sticky top-0 bg-inherit z-10">
        <h3 class="text-lg font-semibold">Yangi bino qo'shish</h3>
        <button @click="$emit('close')" class="btn btn-ghost btn-sm"><X :size="18" /></button>
      </div>

      <div class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label">Nomi (UZ)</label>
            <input v-model="form.nameUz" class="input" placeholder="Tashkent City" />
          </div>
          <div>
            <label class="label">Ном (RU)</label>
            <input v-model="form.nameRu" class="input" placeholder="Ташкент Сити" />
          </div>
          <div>
            <label class="label">Turi</label>
            <select v-model="form.type" class="input">
              <option value="BUSINESS_CENTER">Biznes markaz</option>
              <option value="OFFICE">Ofis binosi</option>
              <option value="SHOPPING">Savdo markaz</option>
              <option value="WAREHOUSE">Ombor</option>
              <option value="RESIDENTIAL">Turar joy</option>
              <option value="MIXED">Aralash</option>
            </select>
          </div>
          <div>
            <label class="label">Tuman</label>
            <input v-model="form.district" class="input" placeholder="Mirzo Ulug'bek" />
          </div>
          <div>
            <label class="label">Manzil</label>
            <input v-model="form.address" class="input" placeholder="Mirzo Ulug'bek tumani, Tashkent" />
          </div>
          <div>
            <label class="label">Shahar</label>
            <input v-model="form.city" class="input" placeholder="Tashkent" />
          </div>
          <div>
            <label class="label">Qavatlar soni</label>
            <input v-model="form.floorsCount" type="number" class="input" placeholder="12" />
          </div>
          <div>
            <label class="label">Jami unitlar</label>
            <input v-model="form.totalUnits" type="number" class="input" placeholder="420" />
          </div>
          <div>
            <label class="label">Umumiy maydon (m²)</label>
            <input v-model="form.totalArea" type="number" class="input" placeholder="45000" />
          </div>
          <div>
            <label class="label">Boshqaruvchi</label>
            <select v-model="form.managedBy" class="input">
              <option value="">Tanlang...</option>
              <option value="u1">Sardor Yusupov</option>
              <option value="u2">Dilnoza Karimova</option>
              <option value="u3">Aziz Toshmatov</option>
            </select>
          </div>
        </div>

        <div>
          <label class="label">Tavsif (UZ)</label>
          <textarea v-model="form.descriptionUz" class="input min-h-[80px]" placeholder="Bino tavsifi..."></textarea>
        </div>

        <div>
          <label class="label">Galereya rasmlari (URL)</label>
          <div class="space-y-2">
            <div v-for="(url, i) in form.gallery" :key="i" class="flex gap-2">
              <input v-model="form.gallery[i]" class="input flex-1" placeholder="https://..." />
              <button @click="form.gallery.splice(i, 1)" class="btn btn-ghost btn-sm"><Trash2 :size="14" /></button>
            </div>
            <button @click="form.gallery.push('')" class="btn btn-secondary btn-sm w-full"><Plus :size="14" /> Rasm qo'shish</button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="form.isPublished" class="toggle" /> E'lon qilish
          </label>
        </div>
      </div>

      <div class="flex gap-3 p-6 border-t border-black/5  sticky bottom-0 bg-inherit">
        <button @click="$emit('close')" class="btn btn-secondary flex-1">Bekor qilish</button>
        <button @click="submit" class="btn btn-primary flex-1"><Check :size="16" /> Yaratish</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, Plus, Trash2, Check } from 'lucide-vue-next'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ close: []; created: [building: any] }>()

const form = reactive({
  nameUz: '', nameRu: '', type: 'BUSINESS_CENTER', district: '', address: '', city: 'Tashkent',
  floorsCount: 1, totalUnits: 1, totalArea: 0, managedBy: '', descriptionUz: '',
  gallery: [''], isPublished: false,
})

function submit() {
  const building = {
    id: 'b' + Date.now(),
    name: form.nameUz || form.nameRu || 'Yangi bino',
    slug: (form.nameUz || form.nameRu || 'bino').toLowerCase().replace(/\s+/g, '-'),
    type: form.type, address: form.address, city: form.city, district: form.district,
    floorsCount: Number(form.floorsCount), totalUnits: Number(form.totalUnits),
    occupiedUnits: 0, vacantUnits: Number(form.totalUnits), totalArea: Number(form.totalArea),
    managedBy: form.managedBy, gallery: form.gallery.filter(Boolean), isPublished: form.isPublished,
  }
  emit('created', building)
  emit('close')
  Object.assign(form, { nameUz: '', nameRu: '', type: 'BUSINESS_CENTER', district: '', address: '', city: 'Tashkent', floorsCount: 1, totalUnits: 1, totalArea: 0, managedBy: '', descriptionUz: '', gallery: [''], isPublished: false })
}
</script>
