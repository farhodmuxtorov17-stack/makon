<template>
  <div class="building-page">
    <!-- ════════ HERO ════════ -->
    <div class="b-hero">
      <div class="b-hero__bg">
        <img :src="building.image" :alt="building.name" class="b-hero__img" />
        <div class="b-hero__grad"></div>
      </div>
      <nav class="b-nav">
        <NuxtLink to="/" class="b-nav__logo">
          <div class="b-nav__icon">M</div>
          <span>MAKON</span>
        </NuxtLink>
        <div class="b-nav__links">
          <NuxtLink to="/catalog" class="b-nav__link">Katalog</NuxtLink>
          <NuxtLink to="/" class="b-nav__link">Bosh sahifa</NuxtLink>
        </div>
        <div class="b-nav__right">
          <ThemeToggle />
          <NuxtLink to="/login" class="b-nav__link">Kirish</NuxtLink>
          <NuxtLink to="/register/eri" class="b-nav__btn">Ro'yxatdan o'tish <ArrowRight :size="14" /></NuxtLink>
        </div>
      </nav>
      <div class="b-hero__content">
        <div class="b-hero__tag">PREMIUM BIZNES MARKAZ</div>
        <h1 class="b-hero__title">{{ building.name }}</h1>
        <p class="b-hero__addr"><MapPin :size="16" /> {{ building.district }}, Toshkent</p>
        <div class="b-hero__specs">
          <div class="b-hero__spec"><span class="b-hero__spec-n">{{ building.floors }}</span><span class="b-hero__spec-l">Qavat</span></div>
          <div class="b-hero__spec-divider"></div>
          <div class="b-hero__spec"><span class="b-hero__spec-n">{{ building.units }}</span><span class="b-hero__spec-l">Unit</span></div>
          <div class="b-hero__spec-divider"></div>
          <div class="b-hero__spec"><span class="b-hero__spec-n">{{ building.area }}</span><span class="b-hero__spec-l">m² maydon</span></div>
          <div class="b-hero__spec-divider"></div>
          <div class="b-hero__spec"><span class="b-hero__spec-n">{{ building.vacant }}</span><span class="b-hero__spec-l">Bo'sh unit</span></div>
        </div>
      </div>
    </div>

    <!-- ════════ INTERACTIVE FLOOR PICKER ════════ -->
    <section class="picker">
      <div class="picker__head">
        <div>
          <div class="eyebrow">BINONI O'RGANING</div>
          <h2 class="picker__title">Qavatni tanlang</h2>
          <p class="picker__sub">Har bir qavatdagi bo'sh maydonlarni ko'ring va tanlang</p>
        </div>
        <div class="picker__legend">
          <div class="legend-item"><span class="legend-dot legend-dot--occupied"></span> Band</div>
          <div class="legend-item"><span class="legend-dot legend-dot--vacant"></span> Bo'sh</div>
          <div class="legend-item"><span class="legend-dot legend-dot--tech"></span> Texnik</div>
        </div>
      </div>

      <div class="picker__body">
        <!-- ═══ Left: Isometric Building ═══ -->
        <div class="iso-section">
          <div class="iso-building">
            <div
              v-for="f in building.floorsData"
              :key="f.num"
              class="iso-floor"
              :class="{
                'iso-floor--active': activeFloor === f.num,
                'iso-floor--hover': hoveredFloor === f.num,
              }"
              @click="activeFloor = f.num"
              @mouseenter="hoveredFloor = f.num"
              @mouseleave="hoveredFloor = null"
            >
              <div class="iso-floor__num">{{ f.num }}</div>
              <div class="iso-floor__bars">
                <div
                  v-for="u in f.units"
                  :key="u.id"
                  class="iso-bar"
                  :class="`iso-bar--${u.status.toLowerCase()}`"
                  :style="{ width: u.width + '%' }"
                  :title="`${u.name} — ${u.status === 'OCCUPIED' ? 'Band' : u.status === 'VACANT' ? 'Bo\'sh' : 'Texnik'} (${u.area} m²)`"
                ></div>
              </div>
              <div class="iso-floor__count" v-if="f.vacantCount > 0">
                <span class="iso-vacant-badge">{{ f.vacantCount }}</span>
              </div>
            </div>
          </div>

          <!-- Occupancy donut -->
          <div class="iso-donut">
            <svg viewBox="0 0 120 120" class="donut-svg">
              <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="10" />
              <circle
                cx="60" cy="60" r="48" fill="none"
                :stroke="occupiedColor"
                stroke-width="10"
                stroke-linecap="round"
                :stroke-dasharray="occupiedDash"
                :stroke-dashoffset="0"
                transform="rotate(-90 60 60)"
                class="donut-fill"
              />
            </svg>
            <div class="donut-center">
              <div class="donut-pct">{{ occupancyPct }}%</div>
              <div class="donut-label">Bandlik</div>
            </div>
          </div>
        </div>

        <!-- ═══ Right: Floor Detail Panel ═══ -->
        <div class="floor-detail">
          <div class="floor-detail__head">
            <div>
              <div class="floor-detail__label">{{ activeFloorData.num }}-QAVAT</div>
              <h3 class="floor-detail__title">{{ activeFloorData.units.length }} unit · {{ activeFloorData.totalArea }} m²</h3>
            </div>
            <div class="floor-detail__stats">
              <div class="fd-stat">
                <span class="fd-stat-n">{{ activeFloorData.vacantCount }}</span>
                <span class="fd-stat-l">Bo'sh</span>
              </div>
              <div class="fd-stat-sep"></div>
              <div class="fd-stat">
                <span class="fd-stat-n">{{ activeFloorData.occupiedCount }}</span>
                <span class="fd-stat-l">Band</span>
              </div>
              <div class="fd-stat-sep"></div>
              <div class="fd-stat">
                <span class="fd-stat-n">{{ activeFloorData.techCount }}</span>
                <span class="fd-stat-l">Texnik</span>
              </div>
            </div>
          </div>

          <!-- Mini 2D plan -->
          <div class="mini-plan">
            <div class="mini-plan__canvas">
              <div
                v-for="u in activeFloorData.units"
                :key="u.id"
                class="mini-unit"
                :class="{
                  'mini-unit--occupied': u.status === 'OCCUPIED',
                  'mini-unit--vacant': u.status === 'VACANT',
                  'mini-unit--tech': u.status === 'TECHNICAL',
                  'mini-unit--selected': selectedUnit === u.id,
                }"
                :style="{ left: u.posX + '%', top: u.posY + '%', width: u.posW + '%', height: u.posH + '%' }"
                @click="u.status === 'VACANT' ? (selectedUnit = selectedUnit === u.id ? null : u.id) : null"
              >
                <span class="mini-unit__name">{{ u.name }}</span>
                <span class="mini-unit__area">{{ u.area }}m²</span>
              </div>
            </div>
          </div>

          <!-- Unit list -->
          <div class="unit-list">
            <div
              v-for="u in activeFloorData.units"
              :key="u.id"
              class="ul-row"
              :class="{ 'ul-row--selected': selectedUnit === u.id, 'ul-row--disabled': u.status !== 'VACANT' }"
              @click="u.status === 'VACANT' ? (selectedUnit = selectedUnit === u.id ? null : u.id) : null"
            >
              <div class="ul-row__status" :class="`ul-row__status--${u.status.toLowerCase()}`"></div>
              <div class="ul-row__info">
                <div class="ul-row__name">{{ u.name }}</div>
                <div class="ul-row__meta">{{ u.area }} m² · {{ u.type }}</div>
              </div>
              <div class="ul-row__price" v-if="u.status === 'VACANT'">
                <span class="ul-row__price-v">{{ formatNum(u.price) }}</span>
                <span class="ul-row__price-u">UZS/oy</span>
              </div>
              <div class="ul-row__status-text" v-else>
                <span v-if="u.status === 'OCCUPIED'">Band</span>
                <span v-if="u.status === 'TECHNICAL'">Texnik</span>
              </div>
              <ChevronRight v-if="u.status === 'VACANT'" :size="16" class="ul-row__chevron" />
            </div>
          </div>

          <!-- Selected unit action bar -->
          <transition name="slide-up">
            <div v-if="selectedUnitData" class="action-bar">
              <div class="action-bar__info">
                <div class="action-bar__name">{{ selectedUnitData.name }} · {{ selectedUnitData.area }} m²</div>
                <div class="action-bar__price">{{ formatNum(selectedUnitData.price) }} UZS/oy</div>
              </div>
              <NuxtLink :to="`/units/${selectedUnitData.slug}`" class="action-bar__btn">
                Batafsil <ArrowRight :size="16" />
              </NuxtLink>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- ════════ AVAILABLE UNITS GRID ════════ -->
    <section class="b-units">
      <div class="b-units__head">
        <div>
          <div class="eyebrow">BO'SH MAYDONLAR</div>
          <h2 class="b-units__title">Mavjud maydonlar</h2>
        </div>
        <div class="b-units__filters">
          <button :class="{ active: unitFilter === 'ALL' }" @click="unitFilter = 'ALL'">Barchasi</button>
          <button :class="{ active: unitFilter === 'OFFICE' }" @click="unitFilter = 'OFFICE'">Ofis</button>
          <button :class="{ active: unitFilter === 'RETAIL' }" @click="unitFilter = 'RETAIL'">Savdo</button>
          <button :class="{ active: unitFilter === 'WAREHOUSE' }" @click="unitFilter = 'WAREHOUSE'">Ombor</button>
        </div>
      </div>

      <div class="b-units__grid">
        <div v-for="unit in filteredUnits" :key="unit.id" class="unit-card" @click="navigateTo(`/units/${unit.slug}`)">
          <div class="unit-card__img">
            <img :src="unit.image" :alt="unit.name" />
            <div class="unit-card__badge">{{ unit.type }}</div>
          </div>
          <div class="unit-card__info">
            <div class="unit-card__top">
              <h3 class="unit-card__name">{{ unit.name }}</h3>
              <span class="unit-card__floor">{{ unit.floor }}-qavat</span>
            </div>
            <p class="unit-card__area">{{ unit.area }} m²</p>
            <div class="unit-card__foot">
              <div class="unit-card__price">
                <span class="unit-card__price-l">Oylik</span>
                <span class="unit-card__price-v">{{ unit.price }} UZS</span>
              </div>
              <span class="unit-card__btn">Batafsil <ArrowRight :size="14" /></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════ CTA ════════ -->
    <section class="b-cta">
      <div class="b-cta__card">
        <h2 class="b-cta__title">Bu binoda ofis kerakmi?</h2>
        <p class="b-cta__text">Ariza qoldiring — operatorimiz siz bilan bog'lanadi</p>
        <NuxtLink to="/applications/new" class="b-cta__btn">Ariza qoldirish <ArrowRight :size="16" /></NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer__top">
        <div class="footer__brand">
          <div class="b-nav__logo"><div class="b-nav__icon">M</div><span>MAKON</span></div>
          <p class="footer__desc">Toshkentdagi premium ko'chmas mulk obyektlarini boshqarish platformasi.</p>
        </div>
        <div class="footer__cols">
          <div class="footer__col"><h5 class="footer__h">PLATFORMA</h5><NuxtLink to="/catalog" class="footer__link">Katalog</NuxtLink><NuxtLink to="/login" class="footer__link">Kirish</NuxtLink><NuxtLink to="/register/eri" class="footer__link">Ro'yxatdan o'tish</NuxtLink></div>
          <div class="footer__col"><h5 class="footer__h">BOG'LANISH</h5><p class="footer__text">Toshkent, O'zbekiston</p><p class="footer__text">+998 71 200 00 00</p><p class="footer__text">info@makon.uz</p></div>
        </div>
      </div>
      <div class="footer__bottom">© 2026 MAKON — ERI orqali xavfsiz platforma</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, MapPin, ChevronRight } from 'lucide-vue-next'

definePageMeta({ layout: 'blank' })

const building = reactive({
  name: 'Tashkent City',
  district: 'Mirzo Ulug\'bek tumani',
  floors: 12, units: 240, area: '32 000', vacant: 47,
  image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3b441d5a2_generated_image.png'
})

const activeFloor = ref(3)
const hoveredFloor = ref<number | null>(null)
const selectedUnit = ref<string | null>(null)

// Floor data with units
const building_floors = [
  { num: 12, units: [
    { id: 'f12u1', name: 'A-1201', area: 85, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 3, posY: 8, posW: 44, posH: 84, width: 44, slug: 'tc-a-1201' },
    { id: 'f12u2', name: 'A-1202', area: 72, status: 'VACANT', type: 'Ofis', price: 5800000, posX: 50, posY: 8, posW: 47, posH: 38, width: 30, slug: 'tc-a-1202' },
    { id: 'f12u3', name: 'A-1203', area: 60, status: 'VACANT', type: 'Ofis', price: 4200000, posX: 50, posY: 54, posW: 47, posH: 38, width: 26, slug: 'tc-a-1203' },
  ]},
  { num: 11, units: [
    { id: 'f11u1', name: 'A-1101', area: 90, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 3, posY: 8, posW: 44, posH: 84, width: 42, slug: 'tc-a-1101' },
    { id: 'f11u2', name: 'A-1102', area: 78, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 50, posY: 8, posW: 47, posH: 84, width: 38, slug: 'tc-a-1102' },
  ]},
  { num: 10, units: [
    { id: 'f10u1', name: 'A-1001', area: 95, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 3, posY: 8, posW: 44, posH: 84, width: 44, slug: 'tc-a-1001' },
    { id: 'f10u2', name: 'A-1002', area: 68, status: 'VACANT', type: 'Ofis', price: 5200000, posX: 50, posY: 8, posW: 22, posH: 38, width: 22, slug: 'tc-a-1002' },
    { id: 'f10u3', name: 'A-1003', area: 55, status: 'VACANT', type: 'Ofis', price: 3800000, posX: 75, posY: 8, posW: 22, posH: 38, width: 18, slug: 'tc-a-1003' },
    { id: 'f10u4', name: 'A-1004', area: 40, status: 'TECHNICAL', type: 'Texnik', price: 0, posX: 50, posY: 54, posW: 47, posH: 38, width: 16, slug: 'tc-a-1004' },
  ]},
  { num: 9, units: [
    { id: 'f9u1', name: 'A-901', area: 82, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 3, posY: 8, posW: 44, posH: 84, width: 44, slug: 'tc-a-901' },
    { id: 'f9u2', name: 'A-902', area: 88, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 50, posY: 8, posW: 47, posH: 84, width: 36, slug: 'tc-a-902' },
  ]},
  { num: 8, units: [
    { id: 'f8u1', name: 'A-801', area: 75, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 3, posY: 8, posW: 30, posH: 84, width: 30, slug: 'tc-a-801' },
    { id: 'f8u2', name: 'A-802', area: 60, status: 'VACANT', type: 'Ofis', price: 4500000, posX: 37, posY: 8, posW: 28, posH: 84, width: 26, slug: 'tc-a-802' },
    { id: 'f8u3', name: 'A-803', area: 70, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 69, posY: 8, posW: 28, posH: 84, width: 28, slug: 'tc-a-803' },
  ]},
  { num: 7, units: [
    { id: 'f7u1', name: 'A-701', area: 92, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 3, posY: 8, posW: 44, posH: 84, width: 44, slug: 'tc-a-701' },
    { id: 'f7u2', name: 'A-702', area: 80, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 50, posY: 8, posW: 47, posH: 84, width: 38, slug: 'tc-a-702' },
  ]},
  { num: 6, units: [
    { id: 'f6u1', name: 'A-601', area: 85, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 3, posY: 8, posW: 30, posH: 84, width: 28, slug: 'tc-a-601' },
    { id: 'f6u2', name: 'A-602', area: 65, status: 'VACANT', type: 'Ofis', price: 4800000, posX: 37, posY: 8, posW: 28, posH: 38, width: 24, slug: 'tc-a-602' },
    { id: 'f6u3', name: 'A-603', area: 55, status: 'VACANT', type: 'Ofis', price: 3900000, posX: 37, posY: 54, posW: 28, posH: 38, width: 20, slug: 'tc-a-603' },
    { id: 'f6u4', name: 'A-604', area: 78, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 69, posY: 8, posW: 28, posH: 84, width: 28, slug: 'tc-a-604' },
  ]},
  { num: 5, units: [
    { id: 'f5u1', name: 'A-501', area: 88, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 3, posY: 8, posW: 44, posH: 84, width: 42, slug: 'tc-a-501' },
    { id: 'f5u2', name: 'A-502', area: 72, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 50, posY: 8, posW: 47, posH: 84, width: 36, slug: 'tc-a-502' },
  ]},
  { num: 4, units: [
    { id: 'f4u1', name: 'A-401', area: 95, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 3, posY: 8, posW: 30, posH: 84, width: 32, slug: 'tc-a-401' },
    { id: 'f4u2', name: 'A-402', area: 68, status: 'VACANT', type: 'Ofis', price: 5100000, posX: 37, posY: 8, posW: 28, posH: 84, width: 26, slug: 'tc-a-402' },
    { id: 'f4u3', name: 'A-403', area: 80, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 69, posY: 8, posW: 28, posH: 84, width: 28, slug: 'tc-a-403' },
  ]},
  { num: 3, units: [
    { id: 'f3u1', name: 'A-301', area: 85, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 3, posY: 8, posW: 22, posH: 84, width: 22, slug: 'tc-a-301' },
    { id: 'f3u2', name: 'A-302', area: 72, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 28, posY: 8, posW: 18, posH: 84, width: 18, slug: 'tc-a-302' },
    { id: 'f3u3', name: 'A-303', area: 95, status: 'VACANT', type: 'Ofis', price: 7200000, posX: 50, posY: 8, posW: 22, posH: 84, width: 22, slug: 'tc-a-303' },
    { id: 'f3u4', name: 'A-304', area: 60, status: 'TECHNICAL', type: 'Texnik', price: 0, posX: 76, posY: 8, posW: 20, posH: 84, width: 16, slug: 'tc-a-304' },
  ]},
  { num: 2, units: [
    { id: 'f2u1', name: 'A-201', area: 78, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 3, posY: 8, posW: 44, posH: 84, width: 42, slug: 'tc-a-201' },
    { id: 'f2u2', name: 'A-202', area: 90, status: 'OCCUPIED', type: 'Ofis', price: 0, posX: 50, posY: 8, posW: 47, posH: 84, width: 38, slug: 'tc-a-202' },
  ]},
  { num: 1, units: [
    { id: 'f1u1', name: 'GF-01', area: 120, status: 'OCCUPIED', type: 'Savdo', price: 0, posX: 3, posY: 8, posW: 30, posH: 84, width: 32, slug: 'tc-gf-01' },
    { id: 'f1u2', name: 'GF-02', area: 85, status: 'VACANT', type: 'Savdo', price: 9800000, posX: 37, posY: 8, posW: 28, posH: 84, width: 26, slug: 'tc-gf-02' },
    { id: 'f1u3', name: 'GF-03', area: 110, status: 'OCCUPIED', type: 'Savdo', price: 0, posX: 69, posY: 8, posW: 28, posH: 84, width: 28, slug: 'tc-gf-03' },
  ]},
]

const floorsData = computed(() => building_floors.map(f => ({
  ...f,
  totalArea: f.units.reduce((s, u) => s + u.area, 0),
  vacantCount: f.units.filter(u => u.status === 'VACANT').length,
  occupiedCount: f.units.filter(u => u.status === 'OCCUPIED').length,
  techCount: f.units.filter(u => u.status === 'TECHNICAL').length,
})))

building.floorsData = floorsData

const activeFloorData = computed(() => floorsData.value.find(f => f.num === activeFloor.value) || floorsData.value[0])

const selectedUnitData = computed(() => {
  if (!selectedUnit.value) return null
  return activeFloorData.value.units.find(u => u.id === selectedUnit.value)
})

// Occupancy donut
const totalUnits = computed(() => building_floors.reduce((s, f) => s + f.units.length, 0))
const occupiedUnits = computed(() => building_floors.reduce((s, f) => s + f.units.filter(u => u.status === 'OCCUPIED').length, 0))
const occupancyPct = computed(() => Math.round((occupiedUnits.value / totalUnits.value) * 100))
const occupiedColor = 'var(--accent)'
const occupiedDash = computed(() => {
  const circ = 2 * Math.PI * 48
  const fill = (occupancyPct.value / 100) * circ
  return `${fill} ${circ}`
})

function formatNum(n: number) {
  return n.toLocaleString('ru-RU')
}

const unitFilter = ref('ALL')
const units = [
  { id: 1, slug: 'tashkent-city-office-101', name: 'Ofis 101', floor: 1, area: 45, type: 'OFFICE', price: '3 500 000', image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/0d7f1ae52_generated_image.png' },
  { id: 2, slug: 'tashkent-city-office-205', name: 'Ofis 205', floor: 2, area: 78, type: 'OFFICE', price: '6 200 000', image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/0d7f1ae52_generated_image.png' },
  { id: 3, slug: 'tashkent-city-retail-gf', name: 'Savdo maydoni GF', floor: 1, area: 120, type: 'RETAIL', price: '9 800 000', image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/22d244e7f_generated_image.png' },
  { id: 4, slug: 'tashkent-city-office-312', name: 'Ofis 312', floor: 3, area: 55, type: 'OFFICE', price: '4 300 000', image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/0d7f1ae52_generated_image.png' },
  { id: 5, slug: 'tashkent-city-office-408', name: 'Ofis 408', floor: 4, area: 92, type: 'OFFICE', price: '7 400 000', image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/0d7f1ae52_generated_image.png' },
  { id: 6, slug: 'tashkent-city-retail-1f', name: 'Savdo maydoni 1F', floor: 2, area: 85, type: 'RETAIL', price: '6 800 000', image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/22d244e7f_generated_image.png' },
]
const filteredUnits = computed(() => unitFilter.value === 'ALL' ? units : units.filter(u => u.type === unitFilter.value))
</script>

<style scoped>
.building-page { overflow-x: hidden; }
.eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.18em; color: var(--accent); text-transform: uppercase; margin-bottom: 8px; }

/* ════════ HERO ════════ */
.b-hero { position: relative; height: 520px; overflow: hidden; }
.b-hero__bg { position: absolute; inset: 0; }
.b-hero__img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.b-hero__grad {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(9,9,11,0.3) 0%, rgba(9,9,11,0.2) 40%, rgba(9,9,11,0.85) 100%),
              radial-gradient(ellipse at 50% 100%, rgba(15,118,110,0.1), transparent 60%);
}
.b-nav { position: relative; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 24px 48px; max-width: 1400px; margin: 0 auto; width: 100%; }
.b-nav__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.b-nav__icon { width: 38px; height: 38px; border-radius: 11px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 17px; color: white; }
.b-nav__logo span { font-weight: 800; font-size: 17px; color: white; letter-spacing: -0.02em; }
.b-nav__links { display: flex; gap: 32px; }
.b-nav__link { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.3s; }
.b-nav__link:hover { color: white; }
.b-nav__right { display: flex; align-items: center; gap: 16px; }
.b-nav__btn { display: inline-flex; align-items: center; gap: 5px; background: white; color: #09090b; padding: 10px 18px; border-radius: 11px; font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.3s; }
.b-nav__btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,255,255,0.15); }
.b-hero__content { position: relative; z-index: 5; max-width: 1400px; margin: 0 auto; padding: 80px 48px 0; }
.b-hero__tag { display: inline-block; background: rgba(15,118,110,0.9); color: white; padding: 6px 14px; border-radius: 8px; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; margin-bottom: 16px; backdrop-filter: blur(10px); }
.b-hero__title { font-size: clamp(36px, 5vw, 56px); font-weight: 800; color: white; letter-spacing: -0.04em; margin: 0 0 10px; }
.b-hero__addr { display: flex; align-items: center; gap: 6px; font-size: 16px; color: rgba(255,255,255,0.6); margin: 0 0 28px; }
.b-hero__specs { display: flex; align-items: center; gap: 24px; }
.b-hero__spec { display: flex; flex-direction: column; gap: 2px; }
.b-hero__spec-n { font-size: 28px; font-weight: 800; color: white; letter-spacing: -0.02em; }
.b-hero__spec-l { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 500; }
.b-hero__spec-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.12); }

/* ════════ FLOOR PICKER ════════ */
.picker { max-width: 1400px; margin: 0 auto; padding: 80px 48px; }
.picker__head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
.picker__title { font-size: 32px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0; }
.dark .picker__title { color: white; }
.picker__sub { font-size: 15px; color: #71717a; margin: 6px 0 0; }
.dark .picker__sub { color: #a1a1aa; }
.picker__legend { display: flex; gap: 16px; align-items: center; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #71717a; font-weight: 500; }
.dark .legend-item { color: #a1a1aa; }
.legend-dot { width: 10px; height: 10px; border-radius: 3px; }
.legend-dot--occupied { background: #18181b; }
.dark .legend-dot--occupied { background: #52525b; }
.legend-dot--vacant { background: var(--accent); }
.legend-dot--tech { background: #d4d4d8; }
.dark .legend-dot--tech { background: #3f3f46; }

.picker__body { display: grid; grid-template-columns: 340px 1fr; gap: 32px; }

/* ═══ Isometric Building ═══ */
.iso-section { display: flex; flex-direction: column; gap: 20px; }
.iso-building {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px;
  padding: 16px; box-shadow: var(--shadow-sm);
  display: flex; flex-direction: column; gap: 3px;
  max-height: 520px; overflow-y: auto;
}
.iso-building::-webkit-scrollbar { width: 4px; }
.iso-building::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 2px; }
.dark .iso-building::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); }

.iso-floor {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 10px; cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4,0,0.2,1); position: relative;
  border: 1px solid transparent;
}
.iso-floor:hover { background: var(--bg-subtle); }
.iso-floor--active { background: var(--accent-subtle); border-color: var(--accent-border); }
.iso-floor--hover { background: var(--bg-subtle); }

.iso-floor__num {
  width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: var(--text-muted);
  background: var(--bg-subtle); transition: all 0.25s;
}
.iso-floor--active .iso-floor__num { background: var(--accent); color: white; }

.iso-floor__bars { flex: 1; display: flex; gap: 3px; height: 24px; align-items: flex-end; }
.iso-bar { height: 100%; border-radius: 3px; transition: all 0.3s; opacity: 0.7; }
.iso-bar--occupied { background: #d4d4d8; }
.dark .iso-bar--occupied { background: #3f3f46; }
.iso-bar--vacant { background: var(--accent); opacity: 1; }
.iso-bar--technical { background: #e4e4e7; }
.dark .iso-bar--technical { background: #27272a; }
.iso-floor--active .iso-bar { opacity: 1; }

.iso-floor__count { position: absolute; top: -2px; right: -2px; }
.iso-vacant-badge {
  font-size: 10px; font-weight: 700; color: white;
  background: var(--accent); padding: 2px 6px; border-radius: 10px;
  box-shadow: 0 2px 6px var(--accent-glow);
}

/* ═══ Donut ═══ */
.iso-donut { position: relative; width: 140px; height: 140px; margin: 0 auto; }
.donut-svg { width: 100%; height: 100%; }
.donut-fill { transition: stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1); }
.donut-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.donut-pct { font-size: 28px; font-weight: 800; color: var(--text); letter-spacing: -0.02em; }
.donut-label { font-size: 11px; color: var(--text-muted); font-weight: 500; }

/* ═══ Floor Detail Panel ═══ */
.floor-detail {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px;
  box-shadow: var(--shadow-sm); overflow: hidden; display: flex; flex-direction: column;
}
.floor-detail__head { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid var(--border); }
.floor-detail__label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: var(--accent); }
.floor-detail__title { font-size: 18px; font-weight: 700; color: var(--text); margin: 4px 0 0; letter-spacing: -0.02em; }
.floor-detail__stats { display: flex; align-items: center; gap: 16px; }
.fd-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.fd-stat-n { font-size: 18px; font-weight: 800; color: var(--text); letter-spacing: -0.01em; }
.fd-stat-l { font-size: 10px; color: var(--text-muted); font-weight: 500; }
.fd-stat-sep { width: 1px; height: 24px; background: var(--border); }

/* Mini 2D plan */
.mini-plan { padding: 20px 24px; }
.mini-plan__canvas {
  position: relative; width: 100%; aspect-ratio: 2.2; border-radius: 12px;
  background: var(--bg-subtle); border: 1px solid var(--border); overflow: hidden;
}
.mini-unit {
  position: absolute; border-radius: 6px; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 1px; transition: all 0.25s; border: 1px solid transparent;
}
.mini-unit--occupied { background: rgba(82,82,91,0.12); }
.dark .mini-unit--occupied { background: rgba(63,63,70,0.4); }
.mini-unit--vacant { background: var(--accent-subtle); border-color: var(--accent-border); }
.mini-unit--vacant:hover { background: rgba(15,118,110,0.15); transform: scale(1.03); }
.dark .mini-unit--vacant:hover { background: rgba(45,212,191,0.15); }
.mini-unit--tech { background: rgba(0,0,0,0.03); opacity: 0.5; }
.dark .mini-unit--tech { background: rgba(255,255,255,0.03); }
.mini-unit--selected { background: var(--accent) !important; border-color: var(--accent) !important; box-shadow: 0 0 0 3px var(--accent-glow); }
.mini-unit--selected .mini-unit__name, .mini-unit--selected .mini-unit__area { color: white !important; }
.mini-unit__name { font-size: 10px; font-weight: 600; color: var(--text); line-height: 1; }
.mini-unit__area { font-size: 8px; color: var(--text-muted); line-height: 1; }

/* Unit list */
.unit-list { flex: 1; overflow-y: auto; max-height: 240px; padding: 0 12px 12px; }
.unit-list::-webkit-scrollbar { width: 4px; }
.unit-list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 2px; }
.ul-row {
  display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 10px;
  cursor: pointer; transition: all 0.2s; border: 1px solid transparent;
}
.ul-row:hover { background: var(--bg-subtle); }
.ul-row--selected { background: var(--accent-subtle); border-color: var(--accent-border); }
.ul-row--disabled { cursor: default; opacity: 0.6; }
.ul-row--disabled:hover { background: transparent; }
.ul-row__status { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.ul-row__status--occupied { background: #71717a; }
.ul-row__status--vacant { background: var(--accent); }
.ul-row__status--technical { background: #d4d4d8; }
.ul-row__info { flex: 1; }
.ul-row__name { font-size: 14px; font-weight: 600; color: var(--text); }
.ul-row__meta { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.ul-row__price { text-align: right; }
.ul-row__price-v { font-size: 14px; font-weight: 700; color: var(--text); display: block; }
.ul-row__price-u { font-size: 10px; color: var(--text-muted); }
.ul-row__status-text { font-size: 12px; color: var(--text-muted); font-weight: 500; }
.ul-row__chevron { color: var(--text-muted); flex-shrink: 0; }

/* Action bar */
.action-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px; background: var(--accent-subtle);
  border-top: 1px solid var(--accent-border);
}
.action-bar__info { display: flex; flex-direction: column; gap: 2px; }
.action-bar__name { font-size: 14px; font-weight: 600; color: var(--text); }
.action-bar__price { font-size: 13px; color: var(--accent); font-weight: 600; }
.action-bar__btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--accent); color: white; padding: 10px 20px;
  border-radius: 10px; font-size: 13px; font-weight: 600; text-decoration: none;
  transition: all 0.25s;
}
.action-bar__btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px var(--accent-glow); }

.slide-up-enter-active { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
.slide-up-enter-from { opacity: 0; transform: translateY(20px); }
.slide-up-leave-active { transition: all 0.2s; }
.slide-up-leave-to { opacity: 0; transform: translateY(20px); }

/* ════════ UNITS GRID ════════ */
.b-units { max-width: 1400px; margin: 0 auto; padding: 0 48px 80px; }
.b-units__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
.b-units__title { font-size: 28px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0; }
.dark .b-units__title { color: white; }
.b-units__filters { display: flex; gap: 6px; background: rgba(0,0,0,0.04); padding: 4px; border-radius: 12px; }
.dark .b-units__filters { background: rgba(255,255,255,0.04); }
.b-units__filters button { padding: 8px 16px; border-radius: 9px; font-size: 13px; font-weight: 500; color: #71717a; background: none; border: none; cursor: pointer; transition: all 0.25s; }
.dark .b-units__filters button { color: #a1a1aa; }
.b-units__filters button.active { background: white; color: #18181b; box-shadow: 0 1px 3px rgba(0,0,0,0.08); font-weight: 600; }
.dark .b-units__filters button.active { background: rgba(255,255,255,0.08); color: white; }
.b-units__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.unit-card { border-radius: 18px; overflow: hidden; background: white; cursor: pointer; box-shadow: 0 2px 16px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04); transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
.dark .unit-card { background: #18181b; box-shadow: 0 2px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06); }
.unit-card:hover { box-shadow: 0 24px 56px rgba(0,0,0,0.1), 0 0 0 1px rgba(15,118,110,0.1); transform: translateY(-4px); }
.dark .unit-card:hover { box-shadow: 0 24px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(15,118,110,0.15); }
.unit-card__img { position: relative; aspect-ratio: 16/10; overflow: hidden; }
.unit-card__img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.unit-card:hover .unit-card__img img { transform: scale(1.05); }
.unit-card__badge { position: absolute; top: 14px; right: 14px; background: rgba(15,118,110,0.9); color: white; padding: 5px 12px; border-radius: 7px; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; backdrop-filter: blur(10px); }
.unit-card__info { padding: 20px; }
.unit-card__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.unit-card__name { font-size: 17px; font-weight: 700; color: #18181b; letter-spacing: -0.02em; margin: 0; }
.dark .unit-card__name { color: white; }
.unit-card__floor { font-size: 12px; color: #a1a1aa; font-weight: 500; }
.unit-card__area { font-size: 13px; color: #71717a; margin: 0 0 16px; }
.dark .unit-card__area { color: #a1a1aa; }
.unit-card__foot { display: flex; align-items: center; justify-content: space-between; }
.unit-card__price-l { font-size: 11px; color: #a1a1aa; display: block; margin-bottom: 1px; }
.unit-card__price-v { font-size: 16px; font-weight: 800; color: #18181b; letter-spacing: -0.01em; }
.dark .unit-card__price-v { color: white; }
.unit-card__btn { display: inline-flex; align-items: center; gap: 5px; padding: 10px 18px; border-radius: 10px; background: #18181b; color: white; font-size: 12px; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s; }
.unit-card__btn:hover { background: var(--accent); }
.dark .unit-card__btn { background: var(--accent); }
.dark .unit-card__btn:hover { background: var(--accent-hover); }

/* ════════ CTA ════════ */
.b-cta { padding: 0 48px 80px; max-width: 1400px; margin: 0 auto; }
.b-cta__card { position: relative; background: linear-gradient(135deg, #09090b 0%, #18181b 50%, #1c1c1f 100%); border-radius: 28px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.2); }
.b-cta__glow { display: none; }
.b-cta__inner { position: relative; z-index: 1; padding: 64px 48px; text-align: center; }
.b-cta__title { font-size: clamp(28px, 4vw, 40px); font-weight: 800; color: white; letter-spacing: -0.035em; margin: 0 0 14px; }
.b-cta__text { font-size: 16px; color: rgba(255,255,255,0.5); line-height: 1.6; max-width: 480px; margin: 0 auto 32px; }
.b-cta__btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 12px; background: var(--accent); color: white; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.3s; box-shadow: 0 4px 20px rgba(15,118,110,0.35); }
.b-cta__btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(15,118,110,0.45); }

/* ════════ FOOTER ════════ */
.footer { background: #09090b; padding: 64px 48px 28px; }
.footer__top { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1.5fr; gap: 48px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.footer__desc { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-top: 16px; max-width: 360px; }
.footer__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.footer__col { display: flex; flex-direction: column; gap: 12px; }
.footer__h { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.3); margin: 0 0 4px; }
.footer__link { font-size: 14px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.25s; }
.footer__link:hover { color: white; }
.footer__text { font-size: 14px; color: rgba(255,255,255,0.45); margin: 0; }
.footer__bottom { max-width: 1400px; margin: 0 auto; padding-top: 24px; font-size: 13px; color: rgba(255,255,255,0.3); }

/* ════════ RESPONSIVE ════════ */
@media (max-width: 1024px) {
  .picker__body { grid-template-columns: 1fr; }
  .iso-building { max-height: 320px; }
  .b-units__grid { grid-template-columns: 1fr 1fr; }
  .nav__links { display: none; }
  .b-nav__links { display: none; }
}
@media (max-width: 768px) {
  .b-nav { padding: 16px 20px; }
  .b-hero__content { padding: 60px 20px 0; }
  .b-hero__specs { flex-wrap: wrap; gap: 16px; }
  .b-hero__spec-divider { display: none; }
  .picker { padding: 48px 20px; }
  .picker__head { flex-direction: column; }
  .picker__body { grid-template-columns: 1fr; }
  .iso-building { max-height: 280px; }
  .floor-detail__head { flex-direction: column; align-items: flex-start; gap: 12px; }
  .b-units { padding: 0 20px 60px; }
  .b-units__grid { grid-template-columns: 1fr; }
  .b-cta { padding: 0 20px 60px; }
  .b-cta__inner { padding: 48px 24px; }
  .footer { padding: 48px 20px 24px; }
  .footer__top { grid-template-columns: 1fr; gap: 32px; }
  .footer__cols { grid-template-columns: 1fr 1fr; }
}
</style>
