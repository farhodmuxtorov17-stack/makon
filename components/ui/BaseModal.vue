<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" @click="$emit('update:modelValue', false)" />
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="px-6 py-4 border-b border-ink-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h3 class="font-semibold text-lg">{{ title }}</h3>
            <button @click="$emit('update:modelValue', false)" class="w-9 h-9 rounded-lg flex items-center justify-center text-ink-400 hover:bg-ink-100 hover:text-ink-700 transition-colors">
              <X :size="18" />
            </button>
          </div>
          <div class="p-6">
            <slot />
          </div>
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-ink-100 flex justify-end gap-2 sticky bottom-0 bg-white">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{ modelValue: boolean; title?: string }>()
defineEmits(['update:modelValue'])
</script>
