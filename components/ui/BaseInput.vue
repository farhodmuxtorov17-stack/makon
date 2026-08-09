<template>
  <div>
    <label v-if="label" class="label">{{ label }}<span v-if="required" class="text-danger-500 ml-0.5">*</span></label>
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'input',
        size === 'sm' ? '!py-2 !text-xs' : '',
        error ? '!border-danger-400 !ring-4 !ring-danger-100' : '',
      ]"
    />
    <p v-if="hint && !error" class="hint">{{ hint }}</p>
    <p v-if="error" class="text-xs text-danger-600 mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string | number
    label?: string
    type?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    hint?: string
    error?: string
    size?: 'sm' | 'md'
  }>(),
  {
    type: 'text',
    size: 'md',
  }
)

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>
