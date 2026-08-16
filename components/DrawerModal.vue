<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="open" class="drawer-overlay" @click.self="$emit('close')">
        <div class="drawer-panel" :style="{ width: width }">
          <div class="drawer-header">
            <h3 class="drawer-title">{{ title }}</h3>
            <button @click="$emit('close')" class="drawer-close">
              <X :size="18" />
            </button>
          </div>
          <div class="drawer-body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="drawer-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{
  open: boolean
  title: string
  width?: string
}>()

defineEmits(['close'])
</script>

<style scoped>
.drawer-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
  display: flex; justify-content: flex-end;
}
.drawer-panel {
  background: var(--bg-card); height: 100%; overflow-y: auto;
  display: flex; flex-direction: column;
  box-shadow: -20px 0 60px rgba(0,0,0,0.15);
}
:deep(.dark) .drawer-panel { background: #18181b; }
.drawer-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px; border-bottom: 1px solid rgba(0,0,0,0.06);
  position: sticky; top: 0; background: inherit; z-index: 1;
}
:deep(.dark) .drawer-header { border-color: rgba(255,255,255,0.06); }
.drawer-title { font-size: 18px; font-weight: 700; color: #18181b; }
:deep(.dark) .drawer-title { color: white; }
.drawer-close {
  width: 36px; height: 36px; border-radius: 10px; border: none;
  background: rgba(0,0,0,0.05); color: #71717a; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: all 0.2s;
}
:deep(.dark) .drawer-close { background: rgba(255,255,255,0.05); }
.drawer-close:hover { background: rgba(0,0,0,0.1); color: #18181b; }
:deep(.dark) .drawer-close:hover { background: rgba(255,255,255,0.1); color: white; }
.drawer-body { flex: 1; padding: 24px; }
.drawer-footer {
  padding: 16px 24px; border-top: 1px solid rgba(0,0,0,0.06);
  display: flex; gap: 10px; justify-content: flex-end;
  position: sticky; bottom: 0; background: inherit;
}
:deep(.dark) .drawer-footer { border-color: rgba(255,255,255,0.06); }

.drawer-enter-active, .drawer-leave-active { transition: opacity 0.3s; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; }
.drawer-enter-active .drawer-panel { animation: slideIn 0.3s ease; }
.drawer-leave-active .drawer-panel { animation: slideIn 0.3s ease reverse; }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
</style>
