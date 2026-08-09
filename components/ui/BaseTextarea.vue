<template>
  <div>
    <label v-if="label" class="label">{{ label }}<span v-if="required" class="text-danger-500 ml-0.5">*</span></label>
    <textarea
      v-model="model"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input resize-none"
    />
    <p v-if="hint" class="hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    rows?: number
    placeholder?: string
    required?: boolean
    disabled?: boolean
    hint?: string
  }>(),
  {
    rows: 3,
  }
)

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>
