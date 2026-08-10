<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" @click="$emit('update:modelValue', false)" />
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
          <div class="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4" :class="iconBg">
            <component :is="iconComp" :size="24" :class="iconColor" />
          </div>
          <h3 class="font-semibold text-lg text-center mb-1">{{ title }}</h3>
          <p class="text-sm text-ink-400 text-center mb-6">{{ message }}</p>
          <div class="flex gap-2">
            <button class="btn btn-ghost btn-lg flex-1" @click="$emit('update:modelValue', false)">Bekor</button>
            <button class="btn btn-lg flex-1" :class="confirmClass" @click="$emit('confirm')">{{ confirmText }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { AlertTriangle, X } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  message?: string
  confirmText?: string
  danger?: boolean
}>(), {
  title: 'Tasdiqlang',
  message: 'Bu amalni tasdiqlaysizmi?',
  confirmText: 'Tasdiqlash',
  danger: false,
})

defineEmits(['update:modelValue', 'confirm'])

const iconComp = computed(() => AlertTriangle)
const iconBg = computed(() => props.danger ? 'bg-rose-50' : 'bg-amber-50')
const iconColor = computed(() => props.danger ? 'text-rose-600' : 'text-amber-600')
const confirmClass = computed(() => props.danger ? 'btn-danger' : 'btn-primary')
</script>
