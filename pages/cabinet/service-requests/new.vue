<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <div>
      <div class="eyebrow">Servis so'rovi</div>
      <h1 class="page-title">Yangi servis so\'rovi</h1>
      <p class="text-ink-500 text-sm mt-1">Muammo yoki jihoz zarurati haqida murojaat yuborish</p>
    </div>

    <!-- Form -->
    <div class="card p-6 space-y-5">
      <!-- Unit selection -->
      <div>
        <label class="label">Unit tanlang <span class="text-red-500">*</span></label>
        <select v-model="form.unitId" class="input">
          <option value="">Tanlang...</option>
          <option value="u1">A-301 · Tashkent City</option>
          <option value="u2">B-205 · Trillent Tower</option>
          <option value="u3">C-101 · IT Park</option>
        </select>
      </div>

      <!-- Category -->
      <div>
        <label class="label">Kategoriya <span class="text-red-500">*</span></label>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button v-for="cat in categories" :key="cat.value" @click="form.category = cat.value"
            class="p-3 rounded-xl border-2 transition-all text-sm text-left"
            :class="form.category === cat.value ? 'border-brand-500 bg-brand-500/5' : 'border-black/5 dark:border-white/5'">
            <component :is="cat.icon" :size="18" class="mb-1" :class="form.category === cat.value ? 'text-brand-500' : 'text-ink-500'" />
            <div class="font-medium">{{ cat.label }}</div>
          </button>
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="label">Muammo tavsifi <span class="text-red-500">*</span></label>
        <textarea v-model="form.description" rows="4" class="input resize-none" placeholder="Muammoni batafsil tasvirlang..."></textarea>
      </div>

      <!-- Photo upload -->
      <div>
        <label class="label">Foto biriktirish</label>
        <div class="border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:border-brand-500/30 transition-all"
          @click="triggerUpload" @dragover.prevent @drop.prevent="handleDrop">
          <input ref="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handleFileSelect" />
          <Camera :size="24" class="text-ink-500 mx-auto mb-2" />
          <div class="text-sm text-ink-500">Foto suratni yuklang yoki sudrab tashlang</div>
          <div class="text-xs text-ink-500 mt-1">JPG, PNG · maks 5 MB</div>
        </div>
        <div v-if="uploadedFiles.length" class="mt-3 flex flex-wrap gap-2">
          <div v-for="(f, i) in uploadedFiles" :key="i" class="relative w-20 h-20 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5">
            <img :src="f.preview" class="w-full h-full object-cover" />
            <button @click="uploadedFiles.splice(i, 1)" class="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center">
              <X :size="12" />
            </button>
          </div>
        </div>
      </div>

      <!-- Priority -->
      <div>
        <label class="label">Ustuvorlik <span class="text-red-500">*</span></label>
        <div class="grid grid-cols-4 gap-2">
          <button v-for="p in priorities" :key="p.value" @click="form.priority = p.value"
            class="p-3 rounded-xl border-2 transition-all text-sm text-center"
            :class="form.priority === p.value ? 'border-brand-500 bg-brand-500/5' : 'border-black/5 dark:border-white/5'">
            <div class="w-3 h-3 rounded-full mx-auto mb-1" :class="p.dot"></div>
            <div class="text-xs font-medium">{{ p.label }}</div>
          </button>
        </div>
      </div>

      <!-- SLA preview -->
      <div v-if="form.priority" class="p-4 rounded-xl bg-brand-500/5 border border-brand-500/10">
        <div class="flex items-center gap-2">
          <Clock :size="16" class="text-brand-500" />
          <span class="text-sm font-medium">SLA muddati: {{ slaHours }} soat</span>
          <span class="text-xs text-ink-500 ml-auto">Taxminiy tugash vaqti: {{ slaDeadline }}</span>
        </div>
      </div>

      <!-- Submit -->
      <div class="flex items-center gap-3 pt-3">
        <button @click="submitForm" class="btn btn-primary flex-1" :disabled="submitting">
          <Send :size="16" /> {{ submitting ? 'Yuborilmoqda...' : 'So\'rov yuborish' }}
        </button>
        <NuxtLink to="/cabinet" class="btn btn-secondary">Bekor qilish</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Camera, X, Clock, Send, Zap, Droplet, Flame, Thermometer, Wrench, Wind, Wifi } from 'lucide-vue-next'

definePageMeta({ roles: ['TENANT_OWNER'],  layout: 'admin', middleware: 'role' })

const form = reactive({
  unitId: '', category: '', description: '', priority: '',
})
const uploadedFiles = ref<any[]>([])
const fileInput = ref<HTMLInputElement>()
const submitting = ref(false)

const categories = [
  { value: 'ELECTRICAL', label: 'Elektr', icon: Zap },
  { value: 'PLUMBING', label: 'Sanitariya', icon: Droplet },
  { value: 'HVAC', label: 'Konditsioner', icon: Wind },
  { value: 'HEATING', label: 'Isitish', icon: Flame },
  { value: 'STRUCTURAL', label: 'Konstruktsiya', icon: Wrench },
  { value: 'OTHER', label: 'Boshqa', icon: Thermometer },
]

const priorities = [
  { value: 'LOW', label: 'Past', dot: 'bg-zinc-500' },
  { value: 'MEDIUM', label: 'O\'rta', dot: 'bg-blue-500' },
  { value: 'HIGH', label: 'Yuqori', dot: 'bg-amber-500' },
  { value: 'URGENT', label: 'Shoshilinch', dot: 'bg-red-500' },
]

const slaHours = computed(() => ({ LOW: 72, MEDIUM: 24, HIGH: 4, URGENT: 1 }[form.priority] || 0))
const slaDeadline = computed(() => {
  if (!form.priority) return ''
  const d = new Date(Date.now() + slaHours.value * 3600000)
  return d.toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
})

function triggerUpload() { fileInput.value?.click() }
function handleFileSelect(e: any) {
  Array.from(e.target.files).forEach(file => {
    const reader = new FileReader()
    reader.onload = (ev) => uploadedFiles.value.push({ preview: ev.target?.result, name: file.name })
    reader.readAsDataURL(file)
  })
}
function handleDrop(e: any) {
  Array.from(e.dataTransfer.files).forEach((file: any) => {
    const reader = new FileReader()
    reader.onload = (ev) => uploadedFiles.value.push({ preview: ev.target?.result, name: file.name })
    reader.readAsDataURL(file)
  })
}

function submitForm() {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    navigateTo('/cabinet/services')
  }, 1500)
}
</script>
