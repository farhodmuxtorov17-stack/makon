<template>
  <div class="fp3d" :class="{ 'fp3d--dark': dark }">
    <div class="fp3d__controls">
      <button @click="rotateLeft" class="fp3d__btn" title="Chapga">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 14L4 9l5-5M4 9h11a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5h-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button @click="rotateRight" class="fp3d__btn" title="O'ngga">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 14l5-5-5-5M20 9H9a5 5 0 0 0-5 5v0a5 5 0 0 0 5 5h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="fp3d__spacer"></div>
      <button @click="zoomIn" class="fp3d__btn" title="+">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/><path d="M11 8v6M8 11h6M20 20l-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
      <button @click="zoomOut" class="fp3d__btn" title="-">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/><path d="M8 11h6M20 20l-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
      <div class="fp3d__spacer"></div>
      <button @click="resetView" class="fp3d__btn" title="Reset">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button @click="toggleFurniture" class="fp3d__btn" :class="{ 'fp3d__btn--active': showFurniture }" title="Mebel">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 14v6h18v-6M3 10h18l-2 4H5l-2-4zM7 10V6h10v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>

    <div class="fp3d__scene" @mousedown="startDrag" @touchstart="startDragTouch">
      <div class="fp3d__stage" :style="stageStyle">
        <div class="fp3d__floor" :style="floorStyle"></div>
        <div class="fp3d__grid" :style="floorStyle">
          <div v-for="i in gridLinesX" :key="'gx'+i" class="fp3d__grid-line fp3d__grid-line--x" :style="{ left: (i * gridSize) + 'px' }"></div>
          <div v-for="i in gridLinesY" :key="'gy'+i" class="fp3d__grid-line fp3d__grid-line--y" :style="{ top: (i * gridSize) + 'px' }"></div>
        </div>

        <div v-for="(wall, i) in walls3D" :key="'w'+i" class="fp3d__wall" :style="wall.style"></div>
        <div v-for="(win, i) in windows3D" :key="'win'+i" class="fp3d__window" :style="win.style"></div>

        <div v-for="(room, i) in rooms" :key="'r'+i" class="fp3d__room-label" :style="roomLabelStyle(room)">
          <span class="fp3d__room-name">{{ room.name }}</span>
          <span class="fp3d__room-area">{{ roomArea(room) }}m²</span>
        </div>

        <template v-if="showFurniture">
          <div v-for="(f, i) in furniture3D" :key="'f'+i" class="fp3d__furniture" :style="f.style">
            <div class="fp3d__furn-top" :style="f.topStyle"></div>
          </div>
        </template>

        <div class="fp3d__compass" :style="compassStyle">
          <div class="fp3d__compass-arrow"></div>
          <span class="fp3d__compass-label">N</span>
        </div>
      </div>
    </div>

    <div class="fp3d__footer">
      <div class="fp3d__legend">
        <div v-for="(room, i) in rooms" :key="'lg'+i" class="fp3d__legend-item">
          <div class="fp3d__legend-dot" :style="{ background: roomColors[room.type] || '#6366f1' }"></div>
          <span>{{ room.name }}</span>
        </div>
        <div class="fp3d__legend-item">
          <div class="fp3d__legend-dot fp3d__legend-dot--window"></div>
          <span>Deraza</span>
        </div>
      </div>
      <div class="fp3d__stats">
        <div class="fp3d__stat"><b>{{ totalArea }}</b> m²</div>
        <div class="fp3d__stat-sep">·</div>
        <div class="fp3d__stat"><b>{{ rooms.length }}</b> xona</div>
        <div class="fp3d__stat-sep">·</div>
        <div class="fp3d__stat"><b>{{ workSpaces }}</b> ish o'rni</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

interface Room {
  name: string; type: string; x: number; y: number; w: number; h: number
}

const props = withDefaults(defineProps<{
  rooms?: Room[]; area?: number; dark?: boolean; width?: number; height?: number
}>(), {
  rooms: () => [
    { name: 'Ofis', type: 'office', x: 5, y: 5, w: 50, h: 30 },
    { name: 'Konferensiya', type: 'meeting', x: 5, y: 38, w: 35, h: 22 },
    { name: 'Qabul', type: 'reception', x: 43, y: 38, w: 24, h: 14 },
    { name: 'Oshxona', type: 'kitchen', x: 43, y: 55, w: 24, h: 8 },
  ],
  area: 85, dark: true, width: 68, height: 65,
})

const roomColors: Record<string, string> = {
  office: '#6366f1', meeting: '#8b5cf6', reception: '#06b6d4',
  kitchen: '#f59e0b', storage: '#10b981', restroom: '#ec4899',
}

const rotX = ref(55), rotZ = ref(0), scale = ref(1), showFurniture = ref(true)
let isDragging = false, dragStartX = 0, dragStartY = 0, dragStartRotZ = 0, dragStartRotX = 0

const PS = 5, WH = 14, gridSize = 10

const stageStyle = computed(() => ({
  transform: `rotateX(${rotX.value}deg) rotateZ(${rotZ.value}deg) scale(${scale.value})`,
  transformStyle: 'preserve-3d' as const,
  width: props.width * PS + 'px', height: props.height * PS + 'px',
}))

const floorStyle = computed(() => ({
  width: props.width * PS + 'px', height: props.height * PS + 'px',
  transform: 'rotateX(90deg) translateZ(-1px)',
  background: props.dark ? 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.04))' : 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
  borderRadius: '4px',
}))

const gridLinesX = computed(() => Array.from({ length: Math.floor(props.width / gridSize) - 1 }, (_, i) => i + 1))
const gridLinesY = computed(() => Array.from({ length: Math.floor(props.height / gridSize) - 1 }, (_, i) => i + 1))

const walls3D = computed(() => {
  const s = PS, h = WH
  const walls: any[] = []
  walls.push(makeWall(0, 0, props.width * s, h, 'top'))
  walls.push(makeWall(0, props.height * s, props.width * s, h, 'bottom'))
  walls.push(makeWall(0, 0, props.height * s, h, 'left'))
  walls.push(makeWall(props.width * s, 0, props.height * s, h, 'right'))
  for (const room of props.rooms) {
    const x = room.x * s, y = room.y * s, w = room.w * s, hh = room.h * s
    if (room.x > 5 && room.x + room.w < props.width - 3) walls.push(makeWall(x, y, hh, h, 'left'))
    if (room.y > 5 && room.y + room.h < props.height - 3) walls.push(makeWall(x, y, w, h, 'top'))
  }
  return walls
})

function makeWall(x: number, y: number, length: number, height: number, side: string) {
  let transform: string, w: number, hh: number
  if (side === 'top' || side === 'bottom') {
    w = length; hh = height
    transform = `translate3d(${x}px, ${y}px, 0px) rotateX(-90deg)`
  } else {
    w = height; hh = length
    transform = `translate3d(${x}px, ${y}px, 0px) rotateY(90deg)`
  }
  return { style: { width: w + 'px', height: hh + 'px', transform, transformStyle: 'preserve-3d' as const } }
}

const windows3D = computed(() => {
  const s = PS, h = WH
  return [
    { style: { width: 12 * s + 'px', height: (h - 4) + 'px', transform: `translate3d(${10 * s}px, 0px, 2px) rotateX(-90deg)`, transformStyle: 'preserve-3d' as const } },
    { style: { width: 14 * s + 'px', height: (h - 4) + 'px', transform: `translate3d(${30 * s}px, 0px, 2px) rotateX(-90deg)`, transformStyle: 'preserve-3d' as const } },
    { style: { width: 10 * s + 'px', height: (h - 4) + 'px', transform: `translate3d(${50 * s}px, 0px, 2px) rotateX(-90deg)`, transformStyle: 'preserve-3d' as const } },
  ]
})

const furniture3D = computed(() => {
  if (!showFurniture.value) return []
  const s = PS
  const items = [
    { x: 8, y: 8, w: 8, h: 4, ht: 5, color: '#7c6f5c' },
    { x: 8, y: 14, w: 8, h: 4, ht: 5, color: '#7c6f5c' },
    { x: 8, y: 20, w: 8, h: 4, ht: 5, color: '#7c6f5c' },
    { x: 22, y: 8, w: 8, h: 4, ht: 5, color: '#7c6f5c' },
    { x: 22, y: 14, w: 8, h: 4, ht: 5, color: '#7c6f5c' },
    { x: 22, y: 20, w: 8, h: 4, ht: 5, color: '#7c6f5c' },
    { x: 38, y: 8, w: 12, h: 4, ht: 5, color: '#7c6f5c' },
    { x: 10, y: 12.5, w: 3, h: 3, ht: 4, color: '#3b82f6' },
    { x: 10, y: 18.5, w: 3, h: 3, ht: 4, color: '#3b82f6' },
    { x: 10, y: 24.5, w: 3, h: 3, ht: 4, color: '#3b82f6' },
    { x: 24, y: 12.5, w: 3, h: 3, ht: 4, color: '#3b82f6' },
    { x: 24, y: 18.5, w: 3, h: 3, ht: 4, color: '#3b82f6' },
    { x: 24, y: 24.5, w: 3, h: 3, ht: 4, color: '#3b82f6' },
    { x: 12, y: 44, w: 16, h: 8, ht: 4, color: '#8b6f47' },
    { x: 46, y: 42, w: 14, h: 3, ht: 5, color: '#06b6d4' },
    { x: 45, y: 57, w: 18, h: 2, ht: 5, color: '#f59e0b' },
    { x: 47, y: 47, w: 6, h: 3, ht: 3, color: '#ec4899' },
    { x: 52, y: 8, w: 3, h: 3, ht: 8, color: '#10b981' },
    { x: 2, y: 40, w: 2.5, h: 2.5, ht: 8, color: '#10b981' },
  ]
  return items.map(item => ({
    style: { width: item.w * s + 'px', height: item.h * s + 'px', transform: `translate3d(${item.x * s}px, ${item.y * s}px, 0px)` },
    topStyle: { width: item.w * s + 'px', height: item.h * s + 'px', background: item.color, transform: `translateZ(${item.ht}px)`, boxShadow: '0 2px 6px rgba(0,0,0,0.3)' },
  }))
})

function roomLabelStyle(room: Room) {
  return { left: (room.x + room.w / 2) * PS + 'px', top: (room.y + room.h / 2) * PS + 'px', transform: 'translate(-50%, -50%) rotateX(90deg) translateZ(1px)' }
}

const compassStyle = computed(() => ({ transform: `translate3d(${(props.width - 4) * PS}px, ${4 * PS}px, 0px) rotateX(90deg) translateZ(2px)` }))
const totalArea = computed(() => props.area || 85)
const workSpaces = computed(() => Math.ceil((props.area || 85) / 8))
function roomArea(room: Room) { return Math.round(room.w * room.h * 0.3) }
function rotateLeft() { rotZ.value -= 15 }
function rotateRight() { rotZ.value += 15 }
function zoomIn() { scale.value = Math.min(scale.value * 1.2, 2.5) }
function zoomOut() { scale.value = Math.max(scale.value / 1.2, 0.4) }
function resetView() { rotX.value = 55; rotZ.value = 0; scale.value = 1 }
function toggleFurniture() { showFurniture.value = !showFurniture.value }

function startDrag(e: MouseEvent) {
  isDragging = true; dragStartX = e.clientX; dragStartY = e.clientY; dragStartRotZ = rotZ.value; dragStartRotX = rotX.value
  document.addEventListener('mousemove', onDrag); document.addEventListener('mouseup', stopDrag)
}
function startDragTouch(e: TouchEvent) {
  isDragging = true; dragStartX = e.touches[0].clientX; dragStartY = e.touches[0].clientY; dragStartRotZ = rotZ.value; dragStartRotX = rotX.value
  document.addEventListener('touchmove', onDragTouch); document.addEventListener('touchend', stopDrag)
}
function onDrag(e: MouseEvent) {
  if (!isDragging) return
  rotZ.value = dragStartRotZ + (e.clientX - dragStartX) * 0.4
  rotX.value = Math.max(20, Math.min(85, dragStartRotX - (e.clientY - dragStartY) * 0.3))
}
function onDragTouch(e: TouchEvent) {
  if (!isDragging) return
  rotZ.value = dragStartRotZ + (e.touches[0].clientX - dragStartX) * 0.4
  rotX.value = Math.max(20, Math.min(85, dragStartRotX - (e.touches[0].clientY - dragStartY) * 0.3))
}
function stopDrag() {
  isDragging = false
  document.removeEventListener('mousemove', onDrag); document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDragTouch); document.removeEventListener('touchend', stopDrag)
}
onUnmounted(() => stopDrag())
</script>

<style scoped>
.fp3d { --label-color: rgba(255,255,255,0.6); --bg: #0a0a0b; --card-bg: rgba(255,255,255,0.03); --border: rgba(255,255,255,0.06); }
.fp3d:not(.fp3d--dark) { --label-color: rgba(0,0,0,0.5); --bg: #f8fafc; --card-bg: #fff; --border: rgba(0,0,0,0.06); }
.fp3d { border-radius: 16px; overflow: hidden; background: var(--bg); border: 1px solid var(--border); }
.fp3d__controls { display: flex; align-items: center; gap: 6px; padding: 10px 14px; background: var(--card-bg); border-bottom: 1px solid var(--border); }
.fp3d__btn { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: var(--label-color); background: transparent; border: 1px solid var(--border); cursor: pointer; transition: all 0.15s; }
.fp3d__btn:hover { color: #6366f1; border-color: rgba(99,102,241,0.4); background: rgba(99,102,241,0.08); }
.fp3d__btn--active { color: #6366f1; border-color: rgba(99,102,241,0.4); background: rgba(99,102,241,0.1); }
.fp3d__spacer { flex: 1; }
.fp3d__scene { height: 420px; display: flex; align-items: center; justify-content: center; perspective: 1200px; perspective-origin: center 40%; cursor: grab; user-select: none; overflow: hidden; }
.fp3d__scene:active { cursor: grabbing; }
.fp3d__stage { position: relative; transform-style: preserve-3d; transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
.fp3d__floor { position: absolute; top: 0; left: 0; transform-style: preserve-3d; border: 2px solid rgba(99,102,241,0.15); border-radius: 4px; }
.fp3d__grid { position: absolute; top: 0; left: 0; transform-style: preserve-3d; pointer-events: none; overflow: hidden; border-radius: 4px; }
.fp3d__grid-line { position: absolute; background: rgba(99,102,241,0.06); }
.fp3d__grid-line--x { width: 1px; height: 100%; }
.fp3d__grid-line--y { height: 1px; width: 100%; }
.fp3d__wall { position: absolute; background: linear-gradient(180deg, #6366f1, #4f46e5); border: 1px solid rgba(99,102,241,0.8); box-shadow: 0 2px 8px rgba(99,102,241,0.15); transform-style: preserve-3d; }
.fp3d__window { position: absolute; background: linear-gradient(180deg, rgba(96,165,250,0.15), rgba(96,165,250,0.3)); border: 1px solid rgba(96,165,250,0.4); box-shadow: inset 0 0 8px rgba(96,165,250,0.2); transform-style: preserve-3d; }
.fp3d__room-label { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 2px; pointer-events: none; z-index: 10; }
.fp3d__room-name { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.7); white-space: nowrap; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
.fp3d__room-area { font-size: 9px; color: rgba(255,255,255,0.4); text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
.fp3d__furniture { position: absolute; transform-style: preserve-3d; }
.fp3d__furn-top { position: absolute; top: 0; left: 0; border-radius: 3px; transform-style: preserve-3d; }
.fp3d__compass { position: absolute; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; z-index: 20; }
.fp3d__compass-arrow { width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 16px solid #6366f1; filter: drop-shadow(0 0 4px rgba(99,102,241,0.5)); }
.fp3d__compass-label { position: absolute; top: -16px; font-size: 10px; font-weight: 700; color: rgba(99,102,241,0.7); }
.fp3d__footer { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--card-bg); border-top: 1px solid var(--border); flex-wrap: wrap; gap: 8px; }
.fp3d__legend { display: flex; flex-wrap: wrap; gap: 10px; }
.fp3d__legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--label-color); }
.fp3d__legend-dot { width: 10px; height: 10px; border-radius: 3px; }
.fp3d__legend-dot--window { background: linear-gradient(180deg, rgba(96,165,250,0.15), rgba(96,165,250,0.3)); border: 1px solid rgba(96,165,250,0.4); }
.fp3d__stats { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--label-color); }
.fp3d__stats b { color: #6366f1; font-weight: 700; }
.fp3d__stat-sep { opacity: 0.3; }
@media (max-width: 640px) { .fp3d__scene { height: 320px; } .fp3d__footer { flex-direction: column; align-items: flex-start; } }
</style>
