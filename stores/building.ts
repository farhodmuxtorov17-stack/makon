// stores/building.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Building, Floor, Unit, Listing } from '~/types'

export const useBuildingStore = defineStore('building', () => {
  const buildings = ref<Building[]>([])
  const floors = ref<Floor[]>([])
  const units = ref<Unit[]>([])
  const listings = ref<Listing[]>([])
  const initialized = ref(false)

  function initMockData() {
    if (initialized.value) return
    initialized.value = true

    buildings.value = [
      {
        id: 'b1',
        name: 'Toshkent City Tower',
        slug: 'toshkent-city-tower',
        type: 'BUSINESS_CENTER',
        address: "Mirzo Ulug'bek, 12",
        district: "Mirzo Ulug'bek",
        city: 'Toshkent',
        totalArea: 28500,
        floorsCount: 22,
        publicDescription: 'A sigimidagi biznes markaz, premium ofis xonalar.',
        gallery: [],
        isPublished: true,
        isArchived: false,
        managedBy: ['u1'],
        createdAt: '2024-06-01',
        updatedAt: '2025-06-01',
      },
      {
        id: 'b2',
        name: 'Crystal Plaza',
        slug: 'crystal-plaza',
        type: 'SHOPPING',
        address: 'Yunusobod, 45',
        district: 'Yunusobod',
        city: 'Toshkent',
        totalArea: 15300,
        floorsCount: 5,
        publicDescription: "Savdo markazi, 120+ do'kon.",
        gallery: [],
        isPublished: true,
        isArchived: false,
        managedBy: ['u1'],
        createdAt: '2024-03-15',
        updatedAt: '2025-05-20',
      },
      {
        id: 'b3',
        name: 'Industrial Park Phase 2',
        slug: 'industrial-park-phase-2',
        type: 'WAREHOUSE',
        address: 'Sergeli, 178',
        district: 'Sergeli',
        city: 'Toshkent',
        totalArea: 42000,
        floorsCount: 2,
        publicDescription: 'Logistika va ombor kompleksi.',
        gallery: [],
        isPublished: false,
        isArchived: false,
        managedBy: ['u1'],
        createdAt: '2024-09-10',
        updatedAt: '2025-04-15',
      },
      {
        id: 'b4',
        name: 'Skyline Residence',
        slug: 'skyline-residence',
        type: 'RESIDENTIAL',
        address: 'Chilonzor, 89',
        district: 'Chilonzor',
        city: 'Toshkent',
        totalArea: 18900,
        floorsCount: 18,
        publicDescription: 'Premium turar joy majmuasi.',
        gallery: [],
        isPublished: true,
        isArchived: false,
        managedBy: ['u1'],
        createdAt: '2024-11-20',
        updatedAt: '2025-06-05',
      },
      {
        id: 'b5',
        name: 'Innovation Hub',
        slug: 'innovation-hub',
        type: 'OFFICE',
        address: 'Yashnobod, 7',
        district: 'Yashnobod',
        city: 'Toshkent',
        totalArea: 8700,
        floorsCount: 8,
        publicDescription: 'IT va startup ofis markazi.',
        gallery: [],
        isPublished: false,
        isArchived: false,
        managedBy: ['u1'],
        createdAt: '2025-01-15',
        updatedAt: '2025-06-10',
      },
    ]

    floors.value = Array.from({ length: 22 * 5 }, (_, i) => {
      const bIdx = Math.floor(i / 22)
      const fIdx = i % 22
      return {
        id: `f${i + 1}`,
        buildingId: `b${bIdx + 1}`,
        number: fIdx + 1,
        area: Math.round(800 + Math.random() * 400),
        planFileUrl: fIdx < 3 ? `plan-b${bIdx + 1}-f${fIdx + 1}.pdf` : null,
        createdAt: '2024-06-01',
      }
    })

    const usageTypes = ['OFFICE', 'RETAIL', 'WAREHOUSE', 'RESIDENTIAL', 'PARKING']
    const offerTypes = ['RENT', 'SALE', 'BOTH']
    const statuses = ['VACANT', 'RENTED', 'SOLD', 'MAINTENANCE', 'RESERVED']

    units.value = Array.from({ length: 60 }, (_, i) => {
      const bIdx = i % 5
      const fIdx = (i % 22) + 1
      return {
        id: `un${i + 1}`,
        buildingId: `b${bIdx + 1}`,
        floorId: `f${bIdx * 22 + fIdx}`,
        number: `${bIdx + 1}-${String(i + 1).padStart(3, '0')}`,
        roomIds: [],
        area: Math.round(35 + Math.random() * 165),
        usageType: usageTypes[i % 5] as any,
        offerType: offerTypes[i % 3] as any,
        basePrice: Math.round((500000 + Math.random() * 5000000) / 1000) * 1000,
        currency: 'UZS',
        status: statuses[i % 5] as any,
        createdAt: '2024-06-01',
        updatedAt: '2025-06-01',
      }
    })

    listings.value = [
      {
        id: 'l1',
        buildingId: 'b1',
        unitId: 'un1',
        titleUz: 'Premium ofis — 12-qavat, 120 m²',
        titleRu: 'Премиум офис — 12 этаж, 120 м²',
        descriptionUz: "Yangi ta'mirda, panorama manzara, mebel bilan.",
        descriptionRu: 'Новый ремонт, панорамный вид, с мебелью.',
        offerType: 'RENT',
        price: 8500000,
        currency: 'UZS',
        photos: [],
        virtualTourUrl: null,
        status: 'PUBLISHED',
        viewsCount: 234,
        createdAt: '2025-05-01',
        updatedAt: '2025-06-01',
      },
      {
        id: 'l2',
        buildingId: 'b2',
        unitId: 'un2',
        titleUz: 'Savdo maydoni — 1-qavat, 85 m²',
        titleRu: 'Торговая площадь — 1 этаж, 85 м²',
        descriptionUz: 'Yuqori oqimli joy, ikkita vitrina.',
        descriptionRu: 'Высокий трафик, две витрины.',
        offerType: 'RENT',
        price: 12000000,
        currency: 'UZS',
        photos: [],
        virtualTourUrl: null,
        status: 'PUBLISHED',
        viewsCount: 512,
        createdAt: '2025-04-20',
        updatedAt: '2025-06-02',
      },
      {
        id: 'l3',
        buildingId: 'b4',
        unitId: 'un3',
        titleUz: '3-xonali kvartira — 15-qavat, 95 m²',
        titleRu: '3-комнатная квартира — 15 этаж, 95 м²',
        descriptionUz: 'Premium turar joy, 2 balcon.',
        descriptionRu: 'Премиум жилье, 2 балкона.',
        offerType: 'SALE',
        price: 1850000000,
        currency: 'UZS',
        photos: [],
        virtualTourUrl: 'https://tour.makon.uz/l3',
        status: 'PUBLISHED',
        viewsCount: 1023,
        createdAt: '2025-03-15',
        updatedAt: '2025-06-05',
      },
      {
        id: 'l4',
        buildingId: 'b3',
        unitId: 'un4',
        titleUz: 'Ombor maydoni — 500 m²',
        titleRu: 'Склад — 500 м²',
        descriptionUz: 'Logistika uchun, yuk platformasi.',
        descriptionRu: 'Для логистики, грузовая платформа.',
        offerType: 'RENT',
        price: 4500000,
        currency: 'UZS',
        photos: [],
        virtualTourUrl: null,
        status: 'DRAFT',
        viewsCount: 0,
        createdAt: '2025-06-01',
        updatedAt: '2025-06-01',
      },
      {
        id: 'l5',
        buildingId: 'b1',
        unitId: 'un5',
        titleUz: 'Coworking joyi — 24/7',
        titleRu: 'Коворкинг — 24/7',
        descriptionUz: 'Shaxsiy va jamoaviy joylar.',
        descriptionRu: 'Индивидуальные и командные места.',
        offerType: 'RENT',
        price: 2200000,
        currency: 'UZS',
        photos: [],
        virtualTourUrl: null,
        status: 'PAUSED',
        viewsCount: 87,
        createdAt: '2025-04-10',
        updatedAt: '2025-05-15',
      },
    ]
  }

  // Getters
  const buildingById = (id: string) => buildings.value.find((b) => b.id === id)
  const floorsByBuilding = (id: string) => floors.value.filter((f) => f.buildingId === id)
  const unitsByBuilding = (id: string) => units.value.filter((u) => u.buildingId === id)
  const unitsByFloor = (id: string) => units.value.filter((u) => u.floorId === id)
  const listingsByBuilding = (id: string) => listings.value.filter((l) => l.buildingId === id)

  const publishedListings = computed(() => listings.value.filter((l) => l.status === 'PUBLISHED'))

  function addBuilding(data: Partial<Building>) {
    const now = new Date().toISOString()
    buildings.value.push({
      id: `b${Date.now()}`,
      name: data.name || '',
      slug: data.name || '',
      type: data.type || 'BUSINESS_CENTER',
      address: data.address || '',
      district: data.district || '',
      city: data.city || 'Toshkent',
      totalArea: data.totalArea || 0,
      floorsCount: data.floorsCount || 1,
      publicDescription: data.publicDescription || '',
      gallery: [],
      isPublished: false,
      isArchived: false,
      managedBy: [],
      createdAt: now,
      updatedAt: now,
    })
  }

  return {
    buildings,
    floors,
    units,
    listings,
    initialized,
    initMockData,
    buildingById,
    floorsByBuilding,
    unitsByBuilding,
    unitsByFloor,
    listingsByBuilding,
    publishedListings,
    addBuilding,
  }
})
