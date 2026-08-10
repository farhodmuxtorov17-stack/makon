<template>
  <div ref="mapEl" class="catalog-map"></div>
</template>

<script setup lang="ts">
/**
 * CatalogMap — Leaflet-based interactive map with price bubble markers.
 * Uses free OpenStreetMap tiles (no API key required).
 */

interface MapListing {
  id: string
  lat: number
  lng: number
  priceLabel: string
  title: string
  href: string
  active?: boolean
}

const props = defineProps<{
  listings: MapListing[]
  center?: [number, number]
  zoom?: number
}>()

const emit = defineEmits<{ (e: 'select', id: string): void }>()

const mapEl = ref<HTMLElement | null>(null)
let mapInstance: any = null
let markers: any[] = []
let L: any = null

async function initMap() {
  if (!import.meta.client || !mapEl.value) return

  L = await import('leaflet')

  mapInstance = L.map(mapEl.value, {
    center: props.center || [41.2995, 69.2401],
    zoom: props.zoom || 11,
    zoomControl: true,
    attributionControl: true,
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 19,
  }).addTo(mapInstance)

  renderMarkers()
}

function renderMarkers() {
  if (!L || !mapInstance) return

  markers.forEach(m => mapInstance.removeLayer(m))
  markers = []

  props.listings.forEach(item => {
    const icon = L.divIcon({
      className: 'price-bubble-wrapper',
      html: `<div class="price-bubble ${item.active ? 'price-bubble--active' : ''}">${item.priceLabel}</div>`,
      iconSize: [0, 0],
    })

    const marker = L.marker([item.lat, item.lng], { icon }).addTo(mapInstance)
    marker.on('click', () => emit('select', item.id))
    markers.push(marker)
  })
}

watch(() => props.listings, () => {
  renderMarkers()
})

onMounted(() => {
  initMap()
})

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
})
</script>

<style>
.catalog-map {
  width: 100%;
  height: 100%;
  background: #eef0f4;
}
.leaflet-container {
  font-family: 'Inter', system-ui, sans-serif;
  background: #eef0f4;
}
.leaflet-control-attribution {
  font-size: 9px;
  opacity: 0.6;
}

/* Price bubble marker */
.price-bubble-wrapper {
  background: transparent;
  border: none;
}
.price-bubble {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  background: #ffffff;
  color: #18181b;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06);
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.15s ease;
  letter-spacing: -0.01em;
}
.price-bubble:hover {
  transform: translate(-50%, -50%) scale(1.08);
  box-shadow: 0 4px 14px rgba(99,102,241,0.35), 0 0 0 1px rgba(99,102,241,0.3);
  z-index: 1000;
}
.price-bubble--active {
  background: #4f46e5;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(79,70,229,0.45), 0 0 0 1px rgba(79,70,229,0.3);
  transform: translate(-50%, -50%) scale(1.1);
}
</style>
