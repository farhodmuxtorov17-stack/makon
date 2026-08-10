<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-[80] flex items-center justify-center p-4" @click.self="$emit('update:modelValue', false)">
        <div class="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" />
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
          <div class="px-6 py-4 border-b border-ink-100 flex items-center justify-between flex-shrink-0">
            <h3 class="font-display font-bold text-lg text-ink-900">{{ title }}</h3>
            <button class="btn-ghost btn-icon" @click="$emit('update:modelValue', false)"><X :size="18" /></button>
          </div>
          <div class="flex-1 overflow-y-auto p-6">
            <slot />
          </div>
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-ink-100 flex justify-end gap-2 flex-shrink-0 bg-ink-50/50">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
defineProps<{ modelValue: boolean; title: string }>()
defineEmits<{ 'update:modelValue': [boolean] }>()
</script>
