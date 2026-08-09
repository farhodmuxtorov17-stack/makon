<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm" @click="$emit('close')" />
        <div
          :class="[
            'relative w-full bg-white rounded-2xl shadow-xl animate-scale-in max-h-[90vh] flex flex-col',
            sizeClass,
          ]"
        >
          <!-- Header -->
          <div
            class="px-6 py-4 border-b border-neutral-100 flex items-center justify-between flex-shrink-0"
          >
            <h3 class="text-lg font-bold text-neutral-900 font-display">{{ title }}</h3>
            <button class="btn-ghost btn-icon" @click="$emit('close')">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <!-- Body -->
          <div class="p-6 overflow-y-auto">
            <slot />
          </div>
          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="px-6 py-4 border-t border-neutral-100 flex items-center justify-end gap-2 flex-shrink-0"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  {
    size: 'md',
  }
)

defineEmits(['close'])

const sizeClass = computed(
  () =>
    ({
      sm: 'max-w-sm',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
    })[props.size]
)
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
