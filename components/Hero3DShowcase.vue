<template>
  <section class="h3d-section" ref="sectionEl">
    <ClientOnly>
      <div
        class="h3d-canvas-wrap"
        ref="containerEl"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointerleave="onPointerUp"
      >
        <!-- Giant faded wordmark behind the model -->
        <div class="h3d-wordmark">MAKON</div>

        <!-- Top badge -->
        <div class="h3d-badge">
          <span class="h3d-badge__dot"></span>
          Interaktiv 3D — jonli model
        </div>

        <!-- Canvas mounts here -->
        <canvas ref="canvasEl" class="h3d-canvas"></canvas>

        <!-- Bottom-left caption, much.ai style -->
        <div class="h3d-caption">
          <div class="h3d-caption__num">12</div>
          <div class="h3d-caption__text">
            premium bino MAKON tizimida raqamlashtirilgan.<br>
            Har biri — real vaqt monitoring va boshqaruv bilan.
          </div>
        </div>

        <!-- Drag hint -->
        <div class="h3d-hint" :class="{ 'h3d-hint--faded': interacted }">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v18M3 12h18M7 7l-4 5 4 5M17 7l4 5-4 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Torting va aylantiring
        </div>

        <!-- Bottom-right CTA -->
        <NuxtLink to="/catalog" class="h3d-cta">
          Katalogni ko'rish
          <ArrowRight :size="15" />
        </NuxtLink>
      </div>

      <template #fallback>
        <div class="h3d-fallback">
          <div class="h3d-fallback__wordmark">MAKON</div>
        </div>
      </template>
    </ClientOnly>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { ArrowRight } from 'lucide-vue-next'

const sectionEl = ref(null)
const containerEl = ref(null)
const canvasEl = ref(null)
const interacted = ref(false)

let THREE, renderer, scene, camera, animationId, resizeObserver
let rigGroup, ground
let dragging = false
let lastX = 0, lastY = 0
let targetRotY = 0.4, targetRotX = -0.12
let currentRotY = 0.4, currentRotX = -0.12
let idleTimer = null
let autoRotate = true

function createWindowTexture(cols, rows, warmRatio = 0.35) {
  const cw = cols * 24
  const ch = rows * 24
  const c = document.createElement('canvas')
  c.width = cw
  c.height = ch
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#0b1120'
  ctx.fillRect(0, 0, cw, ch)
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const lit = Math.random() < warmRatio
      const x = col * 24 + 4
      const y = r * 24 + 4
      const w = 16
      const h = 16
      if (lit) {
        const warm = Math.random() > 0.3
        ctx.fillStyle = warm ? 'rgba(251,191,36,0.9)' : 'rgba(165,180,252,0.85)'
      } else {
        ctx.fillStyle = 'rgba(30,41,59,0.9)'
      }
      ctx.fillRect(x, y, w, h)
    }
  }
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.anisotropy = 4
  return tex
}

function createTower(x, z, w, d, h, cols, rows, warmRatio) {
  const tex = createWindowTexture(cols, rows, warmRatio)
  const sideMat = new THREE.MeshStandardMaterial({
    map: tex,
    emissiveMap: tex,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.55,
    roughness: 0.35,
    metalness: 0.55,
    color: 0x8890a8,
  })
  const capMat = new THREE.MeshStandardMaterial({ color: 0x11141f, roughness: 0.6, metalness: 0.4 })
  const geo = new THREE.BoxGeometry(w, h, d)
  // materials order: +x, -x, +y, -y, +z, -z
  const mesh = new THREE.Mesh(geo, [sideMat, sideMat, capMat, capMat, sideMat, sideMat])
  mesh.position.set(x, h / 2, z)
  mesh.castShadow = true
  mesh.receiveShadow = true

  // thin roof cap highlight
  const roofGeo = new THREE.BoxGeometry(w * 0.98, 0.15, d * 0.98)
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, emissive: 0x4338ca, emissiveIntensity: 0.6, metalness: 0.7, roughness: 0.3 })
  const roof = new THREE.Mesh(roofGeo, roofMat)
  roof.position.set(x, h + 0.08, z)

  const group = new THREE.Group()
  group.add(mesh)
  group.add(roof)
  return group
}

function buildScene() {
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x05050c, 0.045)

  const width = containerEl.value.clientWidth
  const height = containerEl.value.clientHeight
  camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
  camera.position.set(0, 5.2, 15)
  camera.lookAt(0, 3, 0)

  renderer = new THREE.WebGLRenderer({ canvas: canvasEl.value, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Lights
  const ambient = new THREE.AmbientLight(0x8888ff, 0.35)
  scene.add(ambient)

  const key = new THREE.DirectionalLight(0xffffff, 1.1)
  key.position.set(6, 10, 6)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  scene.add(key)

  const rim = new THREE.PointLight(0x8b5cf6, 6, 30)
  rim.position.set(-8, 6, -6)
  scene.add(rim)

  const rim2 = new THREE.PointLight(0x6366f1, 4, 25)
  rim2.position.set(6, 3, -8)
  scene.add(rim2)

  // Rig group holds all towers — this is what gets rotated by drag
  rigGroup = new THREE.Group()

  // Central tallest tower (Tashkent City hero)
  rigGroup.add(createTower(0, 0, 2.2, 2.2, 8.5, 9, 34, 0.4))
  // Surrounding cluster
  rigGroup.add(createTower(-3.1, -1.4, 1.5, 1.5, 5.6, 6, 22, 0.32))
  rigGroup.add(createTower(2.8, -0.8, 1.7, 1.7, 6.8, 7, 27, 0.36))
  rigGroup.add(createTower(-2.2, 1.8, 1.3, 1.3, 4.2, 5, 17, 0.3))
  rigGroup.add(createTower(3.0, 2.0, 1.4, 1.4, 3.4, 5, 14, 0.28))
  rigGroup.add(createTower(0.6, -3.0, 1.2, 1.2, 3.0, 5, 12, 0.3))

  rigGroup.rotation.x = currentRotX
  rigGroup.rotation.y = currentRotY
  scene.add(rigGroup)

  // Reflective-ish ground
  const groundGeo = new THREE.CircleGeometry(14, 48)
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x0a0a14, roughness: 0.85, metalness: 0.2 })
  ground = new THREE.Mesh(groundGeo, groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = 0
  ground.receiveShadow = true
  scene.add(ground)

  // Subtle grid ring accents
  const grid = new THREE.GridHelper(28, 28, 0x312e81, 0x1a1a2e)
  grid.position.y = 0.01
  grid.material.opacity = 0.18
  grid.material.transparent = true
  scene.add(grid)
}

function animate() {
  animationId = requestAnimationFrame(animate)
  if (autoRotate && !dragging) {
    targetRotY += 0.0022
  }
  currentRotY += (targetRotY - currentRotY) * 0.08
  currentRotX += (targetRotX - currentRotX) * 0.08
  if (rigGroup) {
    rigGroup.rotation.y = currentRotY
    rigGroup.rotation.x = currentRotX
  }
  renderer.render(scene, camera)
}

function onPointerDown(e) {
  dragging = true
  autoRotate = false
  interacted.value = true
  lastX = e.clientX
  lastY = e.clientY
  clearTimeout(idleTimer)
}
function onPointerMove(e) {
  if (!dragging) return
  const dx = e.clientX - lastX
  const dy = e.clientY - lastY
  lastX = e.clientX
  lastY = e.clientY
  targetRotY += dx * 0.006
  targetRotX = Math.max(-0.5, Math.min(0.35, targetRotX + dy * 0.004))
}
function onPointerUp() {
  dragging = false
  clearTimeout(idleTimer)
  idleTimer = setTimeout(() => { autoRotate = true }, 2200)
}

function handleResize() {
  if (!renderer || !containerEl.value) return
  const w = containerEl.value.clientWidth
  const h = containerEl.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

onMounted(async () => {
  THREE = await import('three')
  await nextTick()
  buildScene()
  animate()
  resizeObserver = new ResizeObserver(handleResize)
  if (containerEl.value) resizeObserver.observe(containerEl.value)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (resizeObserver) resizeObserver.disconnect()
  clearTimeout(idleTimer)
  if (renderer) renderer.dispose()
})
</script>

<style scoped>
.h3d-section {
  position: relative;
  background: #05050c;
  overflow: hidden;
}
.h3d-canvas-wrap {
  position: relative;
  width: 100%;
  height: 82vh;
  min-height: 520px;
  max-height: 780px;
  cursor: grab;
  touch-action: none;
  overflow: hidden;
}
.h3d-canvas-wrap:active { cursor: grabbing; }
.h3d-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.h3d-wordmark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(90px, 18vw, 260px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: rgba(255,255,255,0.045);
  pointer-events: none;
  user-select: none;
  z-index: 0;
  white-space: nowrap;
}
.h3d-badge {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 100px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  color: rgba(255,255,255,0.75);
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.02em;
  z-index: 3;
  pointer-events: none;
}
.h3d-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 8px #4ade80;
}
.h3d-caption {
  position: absolute;
  bottom: 32px;
  left: 32px;
  z-index: 3;
  max-width: 260px;
  pointer-events: none;
}
.h3d-caption__num {
  font-size: 42px;
  font-weight: 800;
  color: #fff;
  line-height: 1;
  background: linear-gradient(135deg, #fff, #a5b4fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.h3d-caption__text {
  font-size: 12.5px;
  color: rgba(255,255,255,0.55);
  margin-top: 6px;
  line-height: 1.5;
}
.h3d-hint {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.6);
  font-size: 12.5px;
  z-index: 3;
  pointer-events: none;
  transition: opacity 0.6s ease;
  animation: h3d-hint-bob 2.4s ease-in-out infinite;
}
.h3d-hint--faded { opacity: 0; }
@keyframes h3d-hint-bob {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-4px); }
}
.h3d-cta {
  position: absolute;
  bottom: 32px;
  right: 32px;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  border-radius: 100px;
  background: rgba(255,255,255,0.95);
  color: #0a0a12;
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}
.h3d-cta:hover {
  background: #fff;
  transform: translateX(2px);
}
.h3d-fallback {
  height: 82vh;
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #05050c;
}
.h3d-fallback__wordmark {
  font-size: clamp(60px, 14vw, 180px);
  font-weight: 800;
  color: rgba(255,255,255,0.08);
}
@media (max-width: 768px) {
  .h3d-caption { display: none; }
  .h3d-badge { top: 18px; font-size: 11px; padding: 6px 12px; }
  .h3d-cta { bottom: 20px; right: 20px; padding: 9px 16px; font-size: 12.5px; }
  .h3d-hint { bottom: 20px; font-size: 11.5px; }
}
</style>
