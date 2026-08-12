import { defineStore } from 'pinia'

export interface BuildingItem {
  id: string
  name: string
  slug: string
  type: string
  address: string
  city: string
  district: string
  floorsCount: number
  totalUnits: number
  occupiedUnits: number
  reservedUnits: number
  vacantUnits: number
  totalArea: number
  gallery: string[]
  publicDescription: string
  publicDescriptionRu: string
  isPublished: boolean
  cadastralNumber: string
  buildYear: number
  has3dModel: boolean
  model3dUrl?: string
  has2dPlan: boolean
  documents: { id: string; title: string; type: string; date: string; url: string; size: string }[]
  lat: number
  lng: number
  amenities: string[]
}

export interface UnitItem {
  id: string
  buildingId: string
  buildingName: string
  unitNumber: string
  floor: number
  area: number
  status: 'VACANT' | 'RESERVED' | 'OCCUPIED'
  monthlyRent: number
  currency: 'USD' | 'UZS'
  roomId?: string
  category: string
  rentalHistory: { contractId: string; tenantName: string; startDate: string; endDate: string; monthlyRent: number }[]
}

export interface ListingItem {
  id: string
  buildingId: string
  unitId?: string
  titleUz: string
  titleRu: string
  descriptionUz: string
  descriptionRu: string
  offerType: 'RENT' | 'SALE'
  price: number
  currency: 'USD' | 'UZS'
  photos: string[]
  viewsCount: number
  status: 'DRAFT' | 'PUBLISHED' | 'HIDDEN' | 'ARCHIVED'
  virtualTourUrl: string
  createdAt: string
}

export interface ApplicationItem {
  id: string
  number: string
  buildingId: string
  buildingName: string
  unitId: string
  unitNumber: string
  applicantName: string
  applicantPhone: string
  applicantEmail: string
  applicantType: 'LEGAL' | 'PHYSICAL'
  tin?: string
  type: 'RENT' | 'SALE'
  offeredPrice: number
  depositAmount: number
  currency: 'USD' | 'UZS'
  durationMonths: number
  startDate: string
  createdDate: string
  status: 'SUBMITTED' | 'OPERATION_APPROVED' | 'FINANCE_APPROVED' | 'DRAFT_READY' | 'PARTIALLY_SIGNED' | 'SIGNED' | 'ACTIVE' | 'REJECTED' | 'NEED_INFO'
  rejectionReason?: string
  notes?: string
  documents: { title: string; fileUrl: string; uploadedAt: string }[]
}

export interface OfferItem {
  id: string
  applicationId: string
  version: string
  monthlyRent: number
  depositAmount: number
  serviceChargePerSqM: number
  durationMonths: number
  paymentFrequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
  createdAt: string
  status: 'PENDING_TENANT' | 'ACCEPTED' | 'REJECTED' | 'REVISED'
  comments: string
}

export interface ServiceRequestItem {
  id: string
  number: string
  buildingId: string
  buildingName: string
  unitNumber: string
  category: 'HVAC' | 'Plumbing' | 'Electrical' | 'Cleaning' | 'Security' | 'General'
  priority: 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW'
  status: 'NEW' | 'TRIAGED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED'
  title: string
  description: string
  assignedTo?: string
  slaDeadline: string
  createdAt: string
}

export interface ContractItem {
  id: string
  number: string
  applicationId?: string
  buildingId: string
  buildingName: string
  unitId: string
  unitNumber: string
  tenantName: string
  tenantTin: string
  tenantDirector: string
  type: 'RENT' | 'SALE'
  monthlyRent: number
  depositAmount: number
  currency: 'USD' | 'UZS'
  startDate: string
  endDate: string
  status: 'DRAFT' | 'DRAFT_READY' | 'PARTIALLY_SIGNED' | 'SIGNED' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED'
  sha256Hash: string
  eriLandlordSigned: boolean
  eriTenantSigned: boolean
  signedDate?: string
  version: string
  documentUrl: string
  schedule: { date: string; amount: number; status: 'PAID' | 'PENDING' | 'OVERDUE' }[]
}

export interface EriSignatureItem {
  id: string
  documentId: string
  documentType: 'CONTRACT' | 'APPLICATION' | 'ACT'
  documentTitle: string
  partyName: string
  partyRole: 'TENANT' | 'BUILDING_MANAGER' | 'GENERAL_DIRECTOR'
  signingOrder: number
  status: 'PENDING' | 'SIGNING' | 'SIGNED' | 'FAILED'
  certIssuer: string
  certSerial: string
  subjectInn: string
  validFrom: string
  validTo: string
  signedAt?: string
  errorMessage?: string
}

export interface InvoiceItem {
  id: string
  number: string
  contractId: string
  contractNumber: string
  tenantName: string
  buildingId: string
  buildingName: string
  unitNumber: string
  period: string
  amount: number
  paidAmount: number
  balance: number
  currency: 'UZS' | 'USD'
  status: 'PENDING' | 'PAID' | 'PARTIAL' | 'OVERDUE'
  dueDate: string
  issuedDate: string
}

export interface PeriodItem {
  id: string
  label: string
  year: number
  month: number
  status: 'OPEN' | 'CLOSED'
  revenue: number
  collected: number
  debt: number
  invoiceCount: number
  collectedPct: number
}

export interface WorkOrderItem {
  id: number
  number: string
  category: string
  buildingId: string
  buildingName: string
  unitCode: string
  assignedToName: string | null
  priority: 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW'
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  slaDueAt: string
  slaBreached: boolean
  description: string
  createdAt: string
}
// ---------------- New interfaces ----------------
export interface MaterialItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  minStock: number
  unitPrice: number
  buildingId?: string
  lastRestocked?: string
}

export interface StockIssueItem {
  id: string
  number: string
  materialId: string
  materialName: string
  quantity: number
  unit: string
  unitPrice: number
  totalAmount: number
  buildingId: string
  buildingName: string
  workOrderId?: number
  issuedTo: string
  note: string
  status: "PENDING" | "APPROVED" | "COMPLETED" | "REJECTED"
  createdAt: string
}

export interface MaterialRequestItem {
  id: string
  number: string
  materialName: string
  category: string
  quantity: number
  unit: string
  unitPrice: number
  totalAmount: number
  buildingId: string
  buildingName: string
  requestedBy: string
  urgency: "LOW" | "NORMAL" | "HIGH" | "URGENT"
  status: "PENDING" | "APPROVED" | "FULFILLED" | "REJECTED"
  note: string
  createdAt: string
}

export interface AdminUserItem {
  id: string
  fullName: string
  email: string
  phone: string
  role: string
  organization: string
  status: "ACTIVE" | "SUSPENDED" | "INVITED"
  lastLogin: string | null
  createdAt: string
}




export interface TenantCabinetItem {
  id: string
  tenantName: string
  tenantTin: string
  tenantPhone: string
  tenantEmail: string
  contractId: string
  unitId: string
  buildingId: string
  createdAt: string
  status: 'ACTIVE' | 'SUSPENDED' | 'CLOSED'
}

interface MeterItem {
  id: string
  buildingName: string
  unitCode: string
  type: 'ELECTRICITY' | 'WATER_COLD' | 'WATER_HOT' | 'GAS'
  serialNumber: string
  currentReading: number
  previousReading: number
  tariff: number
  lastReadingDate: string
}

interface ReadingItem {
  id: number
  date: string
  serialNumber: string
  unitCode: string
  type: string
  value: number
  consumption: number
  readBy: string
  note: string
}

interface NotificationItem {
  id: string
  type: 'invoice' | 'eri' | 'service' | 'contract' | 'application'
  title: string
  desc: string
  time: string
  read: boolean
}

interface ApprovalItem {
  id: string
  title: string
  submitter: string
  date: string
  contract: string
  amount: number
  type: string
  currentStep: number
}

interface ApprovalHistoryItem {
  id: string
  title: string
  submitter: string
  amount: number
  date: string
  status: 'APPROVED' | 'REJECTED'
}

interface BackupItem {
  id: string
  name: string
  type: 'MANUAL' | 'AUTO'
  size: string
  time: string
  status: 'SUCCESS' | 'FAILED'
}

export const useMakonStore = defineStore('makon', () => {
  // Buildings Initial Data
  const buildings = ref<BuildingItem[]>([
    {
      id: 'b1',
      name: 'Trillant Tower A',
      slug: 'trillant-tower-a',
      type: 'BUSINESS_CENTER',
      address: 'Oybek ko\'chasi 14, Mirobod',
      city: 'Toshkent',
      district: 'Mirobod',
      floorsCount: 18,
      totalUnits: 140,
      occupiedUnits: 115,
      reservedUnits: 10,
      vacantUnits: 15,
      totalArea: 28500,
      gallery: ['/buildings/3d-tower-1.png', '/buildings/3d-tower-2.png', '/buildings/3d-tower-3.png'],
      publicDescription: 'A-klassdagi zamonaviy biznes markazi. Markaziy panorama, aqlli binolar boshqaruvi (BMS) va premium ofislar.',
      publicDescriptionRu: 'Современный бизнес-центр класса А. Панорамный вид, умная система управления зданием (BMS) и премиум офисы.',
      isPublished: true,
      cadastralNumber: '10:04:1234567:01',
      buildYear: 2023,
      has3dModel: true,
      model3dUrl: '/models/trillant.gltf',
      has2dPlan: true,
      lat: 41.3168,
      lng: 69.2800,
      documents: [
        { id: 'd1', title: 'Kadastr hujjati', type: 'PDF', date: '2023-05-10', url: '#', size: '4.2 MB' },
        { id: 'd2', title: 'Qurilish ruxsatnomasi', type: 'PDF', date: '2021-11-15', url: '#', size: '2.8 MB' },
        { id: 'd3', title: 'Yong\'in xavfsizligi akti', type: 'PDF', date: '2024-01-20', url: '#', size: '1.5 MB' }
      ],
      amenities: ['24/7 Xavfsizlik', 'Untergrund Parkovka', 'Konnektiviti Fiber-Optic', 'Kafe va Restoran', 'Konferens Zali', 'Zaxira Generatori']
    },
    {
      id: 'b2',
      name: 'Tashkent City Financial Hub',
      slug: 'tashkent-city-financial-hub',
      type: 'OFFICE',
      address: 'Navoiy shoh ko\'chasi 1',
      city: 'Toshkent',
      district: 'Shayxontohur',
      floorsCount: 24,
      totalUnits: 210,
      occupiedUnits: 185,
      reservedUnits: 15,
      vacantUnits: 10,
      totalArea: 42000,
      gallery: ['/buildings/3d-tower-1.png', '/buildings/3d-tower-2.png', '/buildings/3d-tower-3.png'],
      publicDescription: 'Tashkent City parkining qoq markazida joylashgan moliya markazi. Xalqaro banklar va moliyaviy kompaniyalar qarorgohi.',
      publicDescriptionRu: 'Финансовый хаб в самом центре Ташкент Сити. Штаб-квартира международных банков и финансовый институтов.',
      isPublished: true,
      cadastralNumber: '10:01:9876543:02',
      buildYear: 2024,
      has3dModel: true,
      model3dUrl: '/models/tashkent-city.gltf',
      has2dPlan: true,
      lat: 41.3142,
      lng: 69.2786,
      documents: [
        { id: 'd4', title: 'Davlat ekspertizasi xulosasi', type: 'PDF', date: '2023-08-12', url: '#', size: '5.1 MB' }
      ],
      amenities: ['Helipad', 'VIP Elevator', 'BREEAM Sertifikat', 'Bank filiali', 'Co-working space']
    },
    {
      id: 'b3',
      name: 'IT Park Innovation Plaza',
      slug: 'it-park-innovation-plaza',
      type: 'MIXED',
      address: 'Muqimiy ko\'chasi 166',
      city: 'Toshkent',
      district: 'Yakkasaroy',
      floorsCount: 12,
      totalUnits: 95,
      occupiedUnits: 65,
      reservedUnits: 10,
      vacantUnits: 20,
      totalArea: 18000,
      gallery: ['/buildings/3d-tower-1.png', '/buildings/3d-tower-2.png', '/buildings/3d-tower-3.png'],
      publicDescription: 'IT va venchur kompaniyalar uchun maxsus loyihalashtirilgan innovatsion ekotizim.',
      publicDescriptionRu: 'Инновационная экосистема, специально спроектированная для IT и венчурных компаний.',
      isPublished: true,
      cadastralNumber: '10:05:4567890:03',
      buildYear: 2022,
      has3dModel: false,
      has2dPlan: true,
      lat: 41.2840,
      lng: 69.2610,
      documents: [],
      amenities: ['IT Park Rezident Imtiyozlari', 'Data Center', '24/7 Access', 'Game Zone', 'Roof Garden']
    },
    {
      id: 'b4',
      name: 'Silk Road Galleria',
      slug: 'silk-road-galleria',
      type: 'SHOPPING',
      address: 'Amir Temur shoh ko\'chasi 45',
      city: 'Toshkent',
      district: 'Yunusobod',
      floorsCount: 5,
      totalUnits: 80,
      occupiedUnits: 76,
      reservedUnits: 2,
      vacantUnits: 2,
      totalArea: 22000,
      gallery: ['/buildings/3d-tower-1.png', '/buildings/3d-tower-2.png', '/buildings/3d-tower-3.png'],
      publicDescription: 'Premial kiyim brendlari va savdo shoxobchalari uchun 5 qavatli savdo majmuasi.',
      publicDescriptionRu: '5-этажный торговый комплекс для премиальных брендов и ритейла.',
      isPublished: true,
      cadastralNumber: '10:08:1122334:04',
      buildYear: 2021,
      has3dModel: false,
      has2dPlan: true,
      lat: 41.3110,
      lng: 69.2470,
      documents: [],
      amenities: ['Food Court', 'Poytaxt Markazi', 'Eskalatorlar', 'Yuk Lifti', 'Avtoturgoh']
    },
    {
      id: 'b5',
      name: 'Sergeli Logistics Park',
      slug: 'sergeli-logistics-park',
      type: 'WAREHOUSE',
      address: 'Sergeli sanoat zonasi 12',
      city: 'Toshkent',
      district: 'Sergeli',
      floorsCount: 2,
      totalUnits: 30,
      occupiedUnits: 18,
      reservedUnits: 4,
      vacantUnits: 8,
      totalArea: 35000,
      gallery: ['/buildings/3d-tower-1.png', '/buildings/3d-tower-2.png', '/buildings/3d-tower-3.png'],
      publicDescription: 'A-klassdagi quruq va muzlatgichli ombor maydonlari. Temir yo\'l shaxobchasi va fura rampalari mavjud.',
      publicDescriptionRu: 'Складские площади класса А. Сухие и холодильные склады с ж/д веткой и рампой.',
      isPublished: false,
      cadastralNumber: '10:10:9988776:05',
      buildYear: 2023,
      has3dModel: false,
      has2dPlan: false,
      lat: 41.2300,
      lng: 69.2200,
      documents: [],
      amenities: ['Cross-Docking', 'Muzlatgich Kameralar', 'TIR Rampa', 'Xavfsizlik 24/7', 'Bojxona Zonasi']
    }
  ])

  // Units Initial Data
  const units = ref<UnitItem[]>([
    {
      id: 'u101', buildingId: 'b1', buildingName: 'Trillant Tower A', unitNumber: '101', floor: 1, area: 120, status: 'OCCUPIED', monthlyRent: 3600, currency: 'USD', category: 'OFFICE', roomId: 'ROOM-101',
      rentalHistory: [{ contractId: 'c101', tenantName: 'Digital Tashkent LLC', startDate: '2024-01-01', endDate: '2026-01-01', monthlyRent: 3400 }]
    },
    {
      id: 'u102', buildingId: 'b1', buildingName: 'Trillant Tower A', unitNumber: '102', floor: 1, area: 180, status: 'RESERVED', monthlyRent: 5400, currency: 'USD', category: 'OFFICE', roomId: 'ROOM-102',
      rentalHistory: []
    },
    {
      id: 'u103', buildingId: 'b1', buildingName: 'Trillant Tower A', unitNumber: '103', floor: 1, area: 95, status: 'VACANT', monthlyRent: 2850, currency: 'USD', category: 'RETAIL', roomId: 'ROOM-103',
      rentalHistory: []
    },
    {
      id: 'u104', buildingId: 'b1', buildingName: 'Trillant Tower A', unitNumber: '104', floor: 1, area: 210, status: 'VACANT', monthlyRent: 6300, currency: 'USD', category: 'RETAIL', roomId: 'ROOM-104',
      rentalHistory: []
    },
    {
      id: 'u201', buildingId: 'b1', buildingName: 'Trillant Tower A', unitNumber: '201', floor: 2, area: 350, status: 'OCCUPIED', monthlyRent: 10500, currency: 'USD', category: 'OFFICE', roomId: 'ROOM-201',
      rentalHistory: []
    },
    {
      id: 'u202', buildingId: 'b1', buildingName: 'Trillant Tower A', unitNumber: '202', floor: 2, area: 240, status: 'VACANT', monthlyRent: 7200, currency: 'USD', category: 'OFFICE', roomId: 'ROOM-202',
      rentalHistory: []
    },
    {
      id: 'u301', buildingId: 'b2', buildingName: 'Tashkent City Financial Hub', unitNumber: '301', floor: 3, area: 150, status: 'OCCUPIED', monthlyRent: 4500, currency: 'USD', category: 'OFFICE', roomId: 'ROOM-301',
      rentalHistory: []
    },
    {
      id: 'u302', buildingId: 'b2', buildingName: 'Tashkent City Financial Hub', unitNumber: '302', floor: 3, area: 280, status: 'RESERVED', monthlyRent: 8400, currency: 'USD', category: 'OFFICE', roomId: 'ROOM-302',
      rentalHistory: []
    },
    {
      id: 'u401', buildingId: 'b3', buildingName: 'IT Park Innovation Plaza', unitNumber: '401', floor: 4, area: 85, status: 'VACANT', monthlyRent: 1700, currency: 'USD', category: 'COWORKING', roomId: 'ROOM-401',
      rentalHistory: []
    },
    {
      id: 'u501', buildingId: 'b1', buildingName: 'Trillant Tower A', unitNumber: '501', floor: 5, area: 180, status: 'VACANT', monthlyRent: 5400, currency: 'USD', category: 'OFFICE', roomId: 'ROOM-501',
      rentalHistory: []
    },
    {
      id: 'u502', buildingId: 'b1', buildingName: 'Trillant Tower A', unitNumber: '502', floor: 5, area: 120, status: 'VACANT', monthlyRent: 3600, currency: 'USD', category: 'OFFICE', roomId: 'ROOM-502',
      rentalHistory: []
    },
    {
      id: 'u303', buildingId: 'b2', buildingName: 'Tashkent City Financial Hub', unitNumber: '303', floor: 3, area: 95, status: 'VACANT', monthlyRent: 2850, currency: 'USD', category: 'RETAIL', roomId: 'ROOM-303',
      rentalHistory: []
    },
    {
      id: 'u304', buildingId: 'b2', buildingName: 'Tashkent City Financial Hub', unitNumber: '304', floor: 3, area: 65, status: 'VACANT', monthlyRent: 1950, currency: 'USD', category: 'RETAIL', roomId: 'ROOM-304',
      rentalHistory: []
    },
    {
      id: 'u403', buildingId: 'b3', buildingName: 'IT Park Innovation Plaza', unitNumber: '403', floor: 4, area: 60, status: 'VACANT', monthlyRent: 1200, currency: 'USD', category: 'COWORKING', roomId: 'ROOM-403',
      rentalHistory: []
    },
    {
      id: 'u404', buildingId: 'b3', buildingName: 'IT Park Innovation Plaza', unitNumber: '404', floor: 4, area: 200, status: 'VACANT', monthlyRent: 4000, currency: 'USD', category: 'OFFICE', roomId: 'ROOM-404',
      rentalHistory: []
    },
    {
      id: 'u501b', buildingId: 'b4', buildingName: 'Silk Road Galleria', unitNumber: 'G-01', floor: 1, area: 42, status: 'VACANT', monthlyRent: 1500, currency: 'USD', category: 'RETAIL', roomId: 'ROOM-G01',
      rentalHistory: []
    },
    {
      id: 'u502b', buildingId: 'b4', buildingName: 'Silk Road Galleria', unitNumber: 'G-02', floor: 1, area: 85, status: 'OCCUPIED', monthlyRent: 2550, currency: 'USD', category: 'RETAIL', roomId: 'ROOM-G02',
      rentalHistory: []
    },
    {
      id: 'u503b', buildingId: 'b4', buildingName: 'Silk Road Galleria', unitNumber: 'G-12', floor: 1, area: 120, status: 'VACANT', monthlyRent: 3600, currency: 'USD', category: 'RETAIL', roomId: 'ROOM-G12',
      rentalHistory: []
    },
    {
      id: 'u504b', buildingId: 'b4', buildingName: 'Silk Road Galleria', unitNumber: '2-05', floor: 2, area: 65, status: 'VACANT', monthlyRent: 1950, currency: 'USD', category: 'RETAIL', roomId: 'ROOM-205',
      rentalHistory: []
    },
    {
      id: 'u601b', buildingId: 'b5', buildingName: 'Sergeli Logistics Park', unitNumber: 'W-01', floor: 1, area: 560, status: 'VACANT', monthlyRent: 2800, currency: 'USD', category: 'WAREHOUSE', roomId: 'ROOM-W01',
      rentalHistory: []
    },
    {
      id: 'u602b', buildingId: 'b5', buildingName: 'Sergeli Logistics Park', unitNumber: 'W-02', floor: 1, area: 340, status: 'VACANT', monthlyRent: 1700, currency: 'USD', category: 'WAREHOUSE', roomId: 'ROOM-W02',
      rentalHistory: []
    },
    {
      id: 'u603b', buildingId: 'b5', buildingName: 'Sergeli Logistics Park', unitNumber: 'W-03', floor: 1, area: 720, status: 'OCCUPIED', monthlyRent: 3600, currency: 'USD', category: 'WAREHOUSE', roomId: 'ROOM-W03',
      rentalHistory: []
    },
    {
      id: 'u604b', buildingId: 'b5', buildingName: 'Sergeli Logistics Park', unitNumber: 'W-04', floor: 2, area: 450, status: 'VACANT', monthlyRent: 2250, currency: 'USD', category: 'WAREHOUSE', roomId: 'ROOM-W04',
      rentalHistory: []
    }
  ])

  // Listings Initial Data
  const listings = ref<ListingItem[]>([
    {
      id: 'l1',
      buildingId: 'b1',
      unitId: 'u103',
      titleUz: 'Trillant Tower 1-qavatda 95m² tayyor premium ofis',
      titleRu: 'Готовый премиум офис 95м² на 1-м этаже Trillant Tower',
      descriptionUz: 'To\'liq ta\'mirlangan, panoramali derazalar va markaziy havo aylantirish tizimiga ega ofis xonasi.',
      descriptionRu: 'Офисное помещение с полным ремонтом, панорамными окнами и центральной системой вентиляции.',
      offerType: 'RENT',
      price: 2850,
      currency: 'USD',
      photos: ['/buildings/3d-tower-2.png'],
      viewsCount: 342,
      status: 'PUBLISHED',
      virtualTourUrl: 'https://my.matterport.com/show/?m=sample',
      createdAt: '2026-07-01'
    },
    {
      id: 'l2',
      buildingId: 'b1',
      unitId: 'u202',
      titleUz: 'Trillant Tower 2-qavatda 240m² panorama ofis',
      titleRu: 'Панорамный офис 240м² на 2-м этаже Trillant Tower',
      descriptionUz: 'A-klass biznes markazida bepul parkovka va alohida lift tizimi bilan.',
      descriptionRu: 'В бизнес-центре класса А с бесплатной парковкой и отдельной системой лифтов.',
      offerType: 'RENT',
      price: 7200,
      currency: 'USD',
      photos: ['/buildings/3d-tower-2.png'],
      viewsCount: 189,
      status: 'PUBLISHED',
      virtualTourUrl: '',
      createdAt: '2026-07-15'
    },
    {
      id: 'l3',
      buildingId: 'b3',
      unitId: 'u402',
      titleUz: 'IT Park Plaza 140m² zamonaviy IT-ofis',
      titleRu: 'Современный IT-офис 140м² в IT Park Plaza',
      descriptionUz: 'IT Park rezidentlari uchun soliq imtiyozlari bilan qulay sharoitlar.',
      descriptionRu: 'Удобные условия с налоговыми льготами для резидентов IT Park.',
      offerType: 'RENT',
      price: 2800,
      currency: 'USD',
      photos: ['/buildings/3d-tower-2.png'],
      viewsCount: 512,
      status: 'PUBLISHED',
      virtualTourUrl: '',
      createdAt: '2026-08-01'
    },
    {
      id: 'l4',
      buildingId: 'b2',
      unitId: 'u302',
      titleUz: 'Tashkent City 280m² Premium sotiladigan tijorat maydoni',
      titleRu: 'Премиальное коммерческое помещение 280м² на продажу в Ташкент Сити',
      descriptionUz: 'Investitsiya uchun ideal taklif. Yillik rentabellik 14%.',
      descriptionRu: 'Идеальное предложение для инвестиций. Годовая доходность 14%.',
      offerType: 'SALE',
      price: 850000,
      currency: 'USD',
      photos: ['/buildings/3d-tower-2.png'],
      viewsCount: 92,
      status: 'DRAFT',
      virtualTourUrl: '',
      createdAt: '2026-08-05'
    }
  ])

  // Applications Initial Data
  const applications = ref<ApplicationItem[]>([
    {
      id: 'app-001',
      number: 'APP-2026-001',
      buildingId: 'b1',
      buildingName: 'Trillant Tower A',
      unitId: 'u103',
      unitNumber: '103',
      applicantName: 'ООО "Grand Logistics"',
      applicantPhone: '+998 90 123 45 67',
      applicantEmail: 'info@grandlogistics.uz',
      applicantType: 'LEGAL',
      tin: '305987123',
      type: 'RENT',
      offeredPrice: 2850,
      depositAmount: 5700,
      currency: 'USD',
      durationMonths: 12,
      startDate: '2026-09-01',
      createdDate: '2026-08-02',
      status: 'SUBMITTED',
      notes: 'Bino bo\'yicha birinchi marta ariza berildi, hujjatlar to\'liq.',
      documents: [
        { title: 'Guvohnoma.pdf', fileUrl: '#', uploadedAt: '2026-08-02 10:15' },
        { title: 'Pasport_direktor.pdf', fileUrl: '#', uploadedAt: '2026-08-02 10:16' }
      ]
    },
    {
      id: 'app-002',
      number: 'APP-2026-002',
      buildingId: 'b2',
      buildingName: 'Tashkent City Financial Hub',
      unitId: 'u302',
      unitNumber: '302',
      applicantName: 'Chortoq Water LLC',
      applicantPhone: '+998 97 777 88 99',
      applicantEmail: 'office@chortoq.uz',
      applicantType: 'LEGAL',
      tin: '301234567',
      type: 'RENT',
      offeredPrice: 8200,
      depositAmount: 16400,
      currency: 'USD',
      durationMonths: 24,
      startDate: '2026-09-15',
      createdDate: '2026-08-04',
      status: 'OPERATION_APPROVED',
      notes: 'Bino menejeri texnik ko\'rikdan o\'tdi va tasdiqladi.',
      documents: [
        { title: 'Ustav.pdf', fileUrl: '#', uploadedAt: '2026-08-04 14:20' }
      ]
    },
    {
      id: 'app-003',
      number: 'APP-2026-003',
      buildingId: 'b3',
      buildingName: 'IT Park Innovation Plaza',
      unitId: 'u402',
      unitNumber: '402',
      applicantName: 'Silk Road Tech MChJ',
      applicantPhone: '+998 93 555 44 33',
      applicantEmail: 'contact@silkroadtech.uz',
      applicantType: 'LEGAL',
      tin: '309876543',
      type: 'RENT',
      offeredPrice: 2800,
      depositAmount: 2800,
      currency: 'USD',
      durationMonths: 36,
      startDate: '2026-10-01',
      createdDate: '2026-08-05',
      status: 'FINANCE_APPROVED',
      notes: 'Moliya bo\'limi to\'lov qobiliyatini va depozitni ma\'qulladi.',
      documents: []
    },
    {
      id: 'app-004',
      number: 'APP-2026-004',
      buildingId: 'b1',
      buildingName: 'Trillant Tower A',
      unitId: 'u102',
      unitNumber: '102',
      applicantName: 'Orient FinTech LLC',
      applicantPhone: '+998 91 222 33 44',
      applicantEmail: 'ceo@orientfintech.uz',
      applicantType: 'LEGAL',
      tin: '308112233',
      type: 'RENT',
      offeredPrice: 5200,
      depositAmount: 10400,
      currency: 'USD',
      durationMonths: 12,
      startDate: '2026-09-01',
      createdDate: '2026-08-06',
      status: 'DRAFT_READY',
      notes: 'Shartnoma qoralamasi tayyorlandi, ERI imzolash jarayonida.',
      documents: []
    },
    {
      id: 'app-005',
      number: 'APP-2026-005',
      buildingId: 'b2',
      buildingName: 'Tashkent City Financial Hub',
      unitId: 'u301',
      unitNumber: '301',
      applicantName: 'UzAuto Commercial JV',
      applicantPhone: '+998 71 200 00 00',
      applicantEmail: 'legal@uzautocommercial.uz',
      applicantType: 'LEGAL',
      tin: '201998877',
      type: 'RENT',
      offeredPrice: 4500,
      depositAmount: 9000,
      currency: 'USD',
      durationMonths: 24,
      startDate: '2026-08-15',
      createdDate: '2026-08-01',
      status: 'PARTIALLY_SIGNED',
      notes: 'Ijarachi tomonidan ERI kaliti bilan imzolandi.',
      documents: []
    },
    {
      id: 'app-006',
      number: 'APP-2026-006',
      buildingId: 'b1',
      buildingName: 'Trillant Tower A',
      unitId: 'u101',
      unitNumber: '101',
      applicantName: 'Digital Tashkent LLC',
      applicantPhone: '+998 90 999 11 22',
      applicantEmail: 'admin@digitaltashkent.uz',
      applicantType: 'LEGAL',
      tin: '302334455',
      type: 'RENT',
      offeredPrice: 3600,
      depositAmount: 7200,
      currency: 'USD',
      durationMonths: 12,
      startDate: '2026-01-01',
      createdDate: '2025-12-15',
      status: 'ACTIVE',
      notes: 'Aktiv ijara shartnomasi rasmiylashtirilgan.',
      documents: []
    }
  ])

  // Service Requests Initial Data
  const serviceRequests = ref<ServiceRequestItem[]>([
    {
      id: 'sr-1',
      number: 'SR-2026-001',
      buildingId: 'b1',
      buildingName: 'Trillant Tower A',
      unitNumber: '101',
      category: 'HVAC',
      priority: 'URGENT',
      status: 'NEW',
      title: 'Konditsioner sovutmayapti',
      description: '101-ofisdagi VRV tizimi xatolik kodi E4 bermoqda, xona harorati 28C.',
      slaDeadline: '2026-08-10T15:00:00Z',
      createdAt: '2026-08-10T10:00:00Z'
    },
    {
      id: 'sr-2',
      number: 'SR-2026-002',
      buildingId: 'b2',
      buildingName: 'Tashkent City Financial Hub',
      unitNumber: '301',
      category: 'Plumbing',
      priority: 'HIGH',
      status: 'TRIAGED',
      title: 'Sanuzelda suv sizishi',
      description: '3-qavat erkaklar sanuzelidagi jo\'mrak ostida suv sizmoqda.',
      assignedTo: 'Jasur Rahimov',
      slaDeadline: '2026-08-10T18:00:00Z',
      createdAt: '2026-08-10T09:30:00Z'
    },
    {
      id: 'sr-3',
      number: 'SR-2026-003',
      buildingId: 'b3',
      buildingName: 'IT Park Innovation Plaza',
      unitNumber: '401',
      category: 'Security',
      priority: 'NORMAL',
      status: 'ASSIGNED',
      title: 'Yangi prodivel kartalari berish',
      description: 'Xodimlarga 5 dona magnit prodivel kartalarini dasturlash.',
      assignedTo: 'Alisher Qodirov',
      slaDeadline: '2026-08-11T12:00:00Z',
      createdAt: '2026-08-09T14:00:00Z'
    },
    {
      id: 'sr-4',
      number: 'SR-2026-004',
      buildingId: 'b1',
      buildingName: 'Trillant Tower A',
      unitNumber: '201',
      category: 'Electrical',
      priority: 'IN_PROGRESS',
      status: 'IN_PROGRESS',
      title: 'Lobby chiroqlarini almashtirish',
      description: '2-qavat lift oldidagi LED lampochkalarni almashtirish.',
      assignedTo: 'Jasur Rahimov',
      slaDeadline: '2026-08-10T16:00:00Z',
      createdAt: '2026-08-10T08:00:00Z'
    },
    {
      id: 'sr-5',
      number: 'SR-2026-005',
      buildingId: 'b4',
      buildingName: 'Silk Road Galleria',
      unitNumber: '102',
      category: 'Cleaning',
      priority: 'LOW',
      status: 'COMPLETED',
      title: 'Oyna fasadini tozalash',
      description: 'Savdo majmuasi tashqi vitrina oynalarini yuvish.',
      assignedTo: 'Chinor Service MChJ',
      slaDeadline: '2026-08-09T18:00:00Z',
      createdAt: '2026-08-08T11:00:00Z'
    }
  ])

  // Contracts Initial Data
  const contracts = ref<ContractItem[]>([
    {
      id: 'cnt-001',
      number: 'CNT-2026-001',
      applicationId: 'app-006',
      buildingId: 'b1',
      buildingName: 'Trillant Tower A',
      unitId: 'u101',
      unitNumber: '101',
      tenantName: 'Digital Tashkent LLC',
      tenantTin: '302334455',
      tenantDirector: 'Karimov Sanjar Anvarovich',
      type: 'RENT',
      monthlyRent: 3600,
      depositAmount: 7200,
      currency: 'USD',
      startDate: '2026-01-01',
      endDate: '2027-01-01',
      status: 'ACTIVE',
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      eriLandlordSigned: true,
      eriTenantSigned: true,
      signedDate: '2025-12-28',
      version: '1.0',
      documentUrl: '/docs/cnt-2026-001.pdf',
      schedule: [
        { date: '2026-01-01', amount: 3600, status: 'PAID' },
        { date: '2026-02-01', amount: 3600, status: 'PAID' },
        { date: '2026-03-01', amount: 3600, status: 'PAID' },
        { date: '2026-04-01', amount: 3600, status: 'PAID' },
        { date: '2026-05-01', amount: 3600, status: 'PAID' },
        { date: '2026-06-01', amount: 3600, status: 'PAID' },
        { date: '2026-07-01', amount: 3600, status: 'PAID' },
        { date: '2026-08-01', amount: 3600, status: 'PENDING' }
      ]
    },
    {
      id: 'cnt-002',
      number: 'CNT-2026-002',
      applicationId: 'app-005',
      buildingId: 'b2',
      buildingName: 'Tashkent City Financial Hub',
      unitId: 'u301',
      unitNumber: '301',
      tenantName: 'UzAuto Commercial JV',
      tenantTin: '201998877',
      tenantDirector: 'Rustamov Jamshid Botirovich',
      type: 'RENT',
      monthlyRent: 4500,
      depositAmount: 9000,
      currency: 'USD',
      startDate: '2026-09-01',
      endDate: '2028-09-01',
      status: 'PARTIALLY_SIGNED',
      sha256Hash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284ddd200126d9069e',
      eriLandlordSigned: false,
      eriTenantSigned: true,
      signedDate: '2026-08-08',
      version: '1.1',
      documentUrl: '/docs/cnt-2026-002.pdf',
      schedule: []
    },
    {
      id: 'cnt-003',
      number: 'CNT-2026-003',
      applicationId: 'app-004',
      buildingId: 'b1',
      buildingName: 'Trillant Tower A',
      unitId: 'u102',
      unitNumber: '102',
      tenantName: 'Orient FinTech LLC',
      tenantTin: '308112233',
      tenantDirector: 'Tursunov Bobur Shavkatovich',
      type: 'RENT',
      monthlyRent: 5200,
      depositAmount: 10400,
      currency: 'USD',
      startDate: '2026-09-15',
      endDate: '2027-09-15',
      status: 'DRAFT_READY',
      sha256Hash: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
      eriLandlordSigned: false,
      eriTenantSigned: false,
      version: '1.0',
      documentUrl: '/docs/cnt-2026-003.pdf',
      schedule: []
    }
  ])

  // ERI Signatures Initial Queue
  const eriSignatures = ref<EriSignatureItem[]>([
    {
      id: 'eri-001',
      documentId: 'cnt-002',
      documentType: 'CONTRACT',
      documentTitle: 'Ijara shartnomasi CNT-2026-002 (UzAuto Commercial)',
      partyName: 'MAKON Management MChJ (Bino egasi)',
      partyRole: 'BUILDING_MANAGER',
      signingOrder: 2,
      status: 'PENDING',
      certIssuer: 'GNI STC E-IMZO CA',
      certSerial: '71A49B01F223',
      subjectInn: '300112233',
      validFrom: '2025-01-01',
      validTo: '2027-01-01'
    },
    {
      id: 'eri-002',
      documentId: 'cnt-002',
      documentType: 'CONTRACT',
      documentTitle: 'Ijara shartnomasi CNT-2026-002 (UzAuto Commercial)',
      partyName: 'UzAuto Commercial JV (Ijarachi)',
      partyRole: 'TENANT',
      signingOrder: 1,
      status: 'SIGNED',
      certIssuer: 'GNI STC E-IMZO CA',
      certSerial: '88C12A99B001',
      subjectInn: '201998877',
      validFrom: '2024-06-01',
      validTo: '2026-06-01',
      signedAt: '2026-08-08 16:45:12'
    },
    {
      id: 'eri-003',
      documentId: 'cnt-003',
      documentType: 'CONTRACT',
      documentTitle: 'Ijara shartnomasi CNT-2026-003 (Orient FinTech)',
      partyName: 'Orient FinTech LLC',
      partyRole: 'TENANT',
      signingOrder: 1,
      status: 'FAILED',
      certIssuer: 'GNI STC E-IMZO CA',
      certSerial: '55E90F11A442',
      subjectInn: '308112233',
      validFrom: '2024-01-01',
      validTo: '2026-01-01',
      errorMessage: 'Sertifikat amal qilish muddati tugagan yoki PIN kod xato kiritilgan.'
    }
  ])

  // Visual Settings Configuration Initial State
  const visualSettings = ref({
    statusColors: {
      VACANT: '#10B981',
      RESERVED: '#F59E0B',
      OCCUPIED: '#3B82F6',
      MAINTENANCE: '#EF4444',
      SUBMITTED: '#6B7280',
      DRAFT: '#8B5CF6',
      SIGNED: '#059669',
      ACTIVE: '#10B981',
    },
    publicFields: {
      showArea: true,
      showPrice: true,
      showFloorPlan: true,
      showCadastralNumber: false,
      showTenantInfo: false,
      showFinancialHistory: false,
    },
    canvasHoverStyle: {
      strokeColor: '#0B99FF',
      strokeWidth: 3,
      fillOpacity: 0.35,
    },
    legendVisible: true,
    accessibility: {
      highContrast: false,
      usePatternOverlay: true,
      fontSizeModifier: 'NORMAL',
    }
  })

  // Methods
  function updateBuilding(id: string, patch: Partial<BuildingItem>) {
    const b = buildings.value.find(b => b.id === id);
    if (b) Object.assign(b, patch);
  }

  function addBuilding(b: Omit<BuildingItem, 'id' | 'slug' | 'occupiedUnits' | 'reservedUnits' | 'vacantUnits'>) {
    const id = `b-${Date.now()}`
    const slug = b.name.toLowerCase().replace(/[^a-z0-0]/g, '-').replace(/-+/g, '-')
    const newB: BuildingItem = {
      ...b,
      id,
      slug,
      occupiedUnits: 0,
      reservedUnits: 0,
      vacantUnits: b.totalUnits,
    }
    buildings.value.unshift(newB)
    return newB
  }

  function addUnit(u: Omit<UnitItem, 'id' | 'rentalHistory'>) {
    const id = `u-${Date.now()}`
    const newUnit: UnitItem = { ...u, id, rentalHistory: [] }
    units.value.push(newUnit)
    // recalculate building unit stats
    const b = buildings.value.find(item => item.id === u.buildingId)
    if (b) {
      b.totalUnits += 1
      b.vacantUnits += 1
    }
    return newUnit
  }

  function updateUnitStatus(unitId: string, status: 'VACANT' | 'RESERVED' | 'OCCUPIED') {
    const u = units.value.find(item => item.id === unitId)
    if (!u) return

    const oldStatus = u.status
    u.status = status

    // ─── Status sync: internal → public marketplace ───
    // Auto-update the related listing's visibility based on unit status
    const listing = listings.value.find(l => l.unitId === unitId)
    if (listing) {
      if (status === 'OCCUPIED') {
        listing.status = 'HIDDEN'  // Remove from public catalog
      } else if (status === 'VACANT') {
        listing.status = 'PUBLISHED'  // Show on public catalog
      } else if (status === 'RESERVED') {
        listing.status = 'PUBLISHED'  // Still visible but marked as reserved
      }
    }

    // Recalculate building stats
    recalcBuildingStats(u.buildingId)
  }

  // Auto-sync unit status → listing → building stats → public catalog
  function recalcBuildingStats(buildingId: string) {
    const b = buildings.value.find(item => item.id === buildingId)
    if (!b) return
    const bldgUnits = units.value.filter(u => u.buildingId === buildingId)
    b.occupiedUnits = bldgUnits.filter(u => u.status === 'OCCUPIED').length
    b.reservedUnits = bldgUnits.filter(u => u.status === 'RESERVED').length
    b.vacantUnits = bldgUnits.filter(u => u.status === 'VACANT').length
    b.totalUnits = bldgUnits.length
  }

  // Sync listing status to match unit status (called when listing is toggled in management)
  function syncListingStatus(listingId: string) {
    const l = listings.value.find(item => item.id === listingId)
    if (!l || !l.unitId) return
    const u = units.value.find(item => item.id === l.unitId)
    if (!u) return
    // If unit is occupied, listing should be hidden
    if (u.status === 'OCCUPIED') {
      l.status = 'HIDDEN'
    }
  }

  function addListing(l: Omit<ListingItem, 'id' | 'viewsCount' | 'createdAt'>) {
    const id = `l-${Date.now()}`
    const newListing: ListingItem = {
      ...l,
      id,
      viewsCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    listings.value.unshift(newListing)
    return newListing
  }

  function addApplication(app: Omit<ApplicationItem, 'id' | 'number' | 'createdDate' | 'status' | 'documents'>) {
    const num = `APP-${new Date().getFullYear()}-${String(applications.value.length + 1).padStart(3, '0')}`
    const id = `app-${Date.now()}`
    const newApp: ApplicationItem = {
      ...app,
      id,
      number: num,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'SUBMITTED',
      documents: []
    }
    applications.value.unshift(newApp)
    return newApp
  }

  function updateApplicationStatus(appId: string, status: ApplicationItem['status'], reason?: string) {
    const app = applications.value.find(a => a.id === appId)
    if (!app) return
    app.status = status
    if (reason) app.rejectionReason = reason

    // ─── Auto-reserve unit when application reaches operation approval ───
    if (status === 'OPERATION_APPROVED' || status === 'FINANCE_APPROVED' || status === 'DRAFT_READY') {
      const u = units.value.find(item => item.id === app.unitId)
      if (u && u.status === 'VACANT') {
        updateUnitStatus(app.unitId, 'RESERVED')
      }
    }

    // ─── Free unit if application is rejected ───
    if (status === 'REJECTED') {
      const u = units.value.find(item => item.id === app.unitId)
      if (u && u.status === 'RESERVED') {
        updateUnitStatus(app.unitId, 'VACANT')
      }
    }
  }

  function addServiceRequest(sr: Omit<ServiceRequestItem, 'id' | 'number' | 'createdAt'>) {
    const id = `sr-${Date.now()}`
    const num = `SR-${new Date().getFullYear()}-${String(serviceRequests.value.length + 1).padStart(3, '0')}`
    const newSr: ServiceRequestItem = {
      ...sr,
      id,
      number: num,
      createdAt: new Date().toISOString()
    }
    serviceRequests.value.unshift(newSr)
    return newSr
  }

  function activateContract(contractId: string) {
    const cnt = contracts.value.find(c => c.id === contractId)
    if (!cnt) return

    cnt.status = 'ACTIVE'
    cnt.eriLandlordSigned = true
    cnt.eriTenantSigned = true
    cnt.signedDate = new Date().toISOString().split('T')[0]

    // ─── Status sync: unit → OCCUPIED ───
    updateUnitStatus(cnt.unitId, 'OCCUPIED')

    // ─── Auto-create tenant cabinet ───
    // Check if cabinet already exists for this contract
    const existing = tenantCabinets.value.find(tc => tc.contractId === contractId)
    if (!existing) {
      const newCabinet: TenantCabinetItem = {
        id: 'tc-' + Date.now(),
        tenantName: cnt.tenantName,
        tenantTin: cnt.tenantTin,
        tenantPhone: '',
        tenantEmail: '',
        contractId: contractId,
        unitId: cnt.unitId,
        buildingId: cnt.buildingId,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'ACTIVE'
      }
      tenantCabinets.value.unshift(newCabinet)
    }

    // ─── Add to unit rental history ───
    const u = units.value.find(unit => unit.id === cnt.unitId)
    if (u) {
      u.rentalHistory.push({
        contractId: contractId,
        tenantName: cnt.tenantName,
        startDate: cnt.startDate,
        endDate: cnt.endDate,
        monthlyRent: cnt.monthlyRent
      })
    }
  }

  // ---------------- Invoices ----------------
  const invoices = ref<InvoiceItem[]>([
    { id: 'inv-001', number: 'INV-2026-045', contractId: 'c1', contractNumber: 'CTR-2026-001', tenantName: 'Orient Logistika MChJ', buildingId: 'b5', buildingName: 'Sergeli Logistics Park', unitNumber: 'W-03', period: '2026-07', amount: 8500000, paidAmount: 0, balance: 8500000, currency: 'UZS', status: 'OVERDUE', dueDate: '2026-07-01', issuedDate: '2026-06-28' },
    { id: 'inv-002', number: 'INV-2026-046', contractId: 'c2', contractNumber: 'CTR-2026-002', tenantName: 'Ipak Yuli Savdo MChJ', buildingId: 'b4', buildingName: 'Silk Road Galleria', unitNumber: 'G-02', period: '2026-07', amount: 6200000, paidAmount: 3100000, balance: 3100000, currency: 'UZS', status: 'PARTIAL', dueDate: '2026-07-15', issuedDate: '2026-06-30' },
    { id: 'inv-003', number: 'INV-2026-047', contractId: 'c3', contractNumber: 'CTR-2026-005', tenantName: 'Alfa Biznes MChJ', buildingId: 'b2', buildingName: 'Tashkent City Financial Hub', unitNumber: '303', period: '2026-08', amount: 4800000, paidAmount: 0, balance: 4800000, currency: 'UZS', status: 'PENDING', dueDate: '2026-08-01', issuedDate: '2026-07-28' },
    { id: 'inv-004', number: 'INV-2026-048', contractId: 'c1', contractNumber: 'CTR-2025-098', tenantName: 'Markaz Savdo MChJ', buildingId: 'b1', buildingName: 'Trillant Tower A', unitNumber: '103', period: '2026-06', amount: 7200000, paidAmount: 5400000, balance: 1800000, currency: 'UZS', status: 'PARTIAL', dueDate: '2026-06-15', issuedDate: '2026-05-28' },
    { id: 'inv-005', number: 'INV-2026-049', contractId: 'c2', contractNumber: 'CTR-2026-012', tenantName: 'Chorsu Retail MChJ', buildingId: 'b3', buildingName: 'IT Park Innovation Plaza', unitNumber: '404', period: '2026-08', amount: 5500000, paidAmount: 0, balance: 5500000, currency: 'UZS', status: 'PENDING', dueDate: '2026-08-10', issuedDate: '2026-07-30' },
    { id: 'inv-006', number: 'INV-2026-050', contractId: 'c3', contractNumber: 'CTR-2026-018', tenantName: 'Zomin Invest MChJ', buildingId: 'b2', buildingName: 'Tashkent City Financial Hub', unitNumber: '302', period: '2026-07', amount: 3900000, paidAmount: 2920000, balance: 980000, currency: 'UZS', status: 'PARTIAL', dueDate: '2026-07-20', issuedDate: '2026-06-25' },
    { id: 'inv-007', number: 'INV-2026-051', contractId: 'c1', contractNumber: 'CTR-2026-001', tenantName: 'Orient Logistika MChJ', buildingId: 'b5', buildingName: 'Sergeli Logistics Park', unitNumber: 'W-03', period: '2026-08', amount: 8500000, paidAmount: 8500000, balance: 0, currency: 'UZS', status: 'PAID', dueDate: '2026-08-01', issuedDate: '2026-07-28' },
    { id: 'inv-008', number: 'INV-2026-052', contractId: 'c2', contractNumber: 'CTR-2026-002', tenantName: 'Ipak Yuli Savdo MChJ', buildingId: 'b4', buildingName: 'Silk Road Galleria', unitNumber: 'G-02', period: '2026-08', amount: 6200000, paidAmount: 6200000, balance: 0, currency: 'UZS', status: 'PAID', dueDate: '2026-08-01', issuedDate: '2026-07-28' },
  ])

  // ---------------- Periods ----------------
  const periods = ref<PeriodItem[]>([
    { id: 'p1', label: 'Avgust', year: 2026, month: 8, status: 'OPEN', revenue: 42000000, collected: 31500000, debt: 10500000, invoiceCount: 48, collectedPct: 75 },
    { id: 'p2', label: 'Iyul', year: 2026, month: 7, status: 'CLOSED', revenue: 38500000, collected: 36200000, debt: 2300000, invoiceCount: 45, collectedPct: 94 },
    { id: 'p3', label: 'Iyun', year: 2026, month: 6, status: 'CLOSED', revenue: 41000000, collected: 39500000, debt: 1500000, invoiceCount: 47, collectedPct: 96 },
    { id: 'p4', label: 'May', year: 2026, month: 5, status: 'CLOSED', revenue: 37000000, collected: 36800000, debt: 200000, invoiceCount: 43, collectedPct: 99 },
    { id: 'p5', label: 'Aprel', year: 2026, month: 4, status: 'CLOSED', revenue: 35000000, collected: 35000000, debt: 0, invoiceCount: 41, collectedPct: 100 },
    { id: 'p6', label: 'Mart', year: 2026, month: 3, status: 'CLOSED', revenue: 34000000, collected: 33500000, debt: 500000, invoiceCount: 40, collectedPct: 98 },
  ])

  // ---------------- Work Orders ----------------
  const workOrders = ref<WorkOrderItem[]>([
    { id: 1, number: 'WO-2026-001', category: 'Santexnika', buildingId: 'b2', buildingName: 'Tashkent City Financial Hub', unitCode: '303', assignedToName: 'Akmal Sodiqov', priority: 'URGENT', status: 'IN_PROGRESS', slaDueAt: '2026-08-12', slaBreached: false, description: '303-ofisda quvur nuqsoni, suv oqmoqda. Shoshilinch.', createdAt: '2026-08-10' },
    { id: 2, number: 'WO-2026-002', category: 'Elektr', buildingId: 'b1', buildingName: 'Trillant Tower A', unitCode: '501', assignedToName: 'Bekzod Aliyev', priority: 'HIGH', status: 'ASSIGNED', slaDueAt: '2026-08-14', slaBreached: false, description: '501-da elektr rozetkasi ishlamayapti.', createdAt: '2026-08-10' },
    { id: 3, number: 'WO-2026-003', category: 'Konditsioner', buildingId: 'b3', buildingName: 'IT Park Innovation Plaza', unitCode: '402', assignedToName: 'Dilshod Karimov', priority: 'NORMAL', status: 'COMPLETED', slaDueAt: '2026-08-08', slaBreached: false, description: '402-konditsioner filtrlarini almashtirish.', createdAt: '2026-08-07' },
    { id: 4, number: 'WO-2026-004', category: 'Umumiy toza', buildingId: 'b4', buildingName: 'Silk Road Galleria', unitCode: 'G-12', assignedToName: null, priority: 'LOW', status: 'ASSIGNED', slaDueAt: '2026-08-15', slaBreached: false, description: 'G-12 umumiy tozalash ishlari.', createdAt: '2026-08-10' },
    { id: 5, number: 'WO-2026-005', category: 'Santexnika', buildingId: 'b2', buildingName: 'Tashkent City Financial Hub', unitCode: '304', assignedToName: 'Akmal Sodiqov', priority: 'HIGH', status: 'IN_PROGRESS', slaDueAt: '2026-08-09', slaBreached: true, description: '304-dush kabina shikastlangan.', createdAt: '2026-08-08' },
    { id: 6, number: 'WO-2026-006', category: 'Elektr', buildingId: 'b5', buildingName: 'Sergeli Logistics Park', unitCode: 'W-02', assignedToName: 'Bekzod Aliyev', priority: 'NORMAL', status: 'COMPLETED', slaDueAt: '2026-08-07', slaBreached: false, description: 'W-02 yoritish lampalarini almashtirish.', createdAt: '2026-08-06' },
    { id: 7, number: 'WO-2026-007', category: 'Konditsioner', buildingId: 'b1', buildingName: 'Trillant Tower A', unitCode: '502', assignedToName: null, priority: 'URGENT', status: 'ASSIGNED', slaDueAt: '2026-08-11', slaBreached: false, description: '502-konditsioner sovimayapti, tezkor tahlil kerak.', createdAt: '2026-08-10' },
  ])

  // ---------------- Materials (Inventory) ----------------
  const materials = ref<MaterialItem[]>([
    { id: "m1", name: "Lampa LED 12W", category: "ELECTRICAL", quantity: 45, unit: "dona", minStock: 20, unitPrice: 35000, buildingId: "b1", lastRestocked: "2026-07-15" },
    { id: "m2", name: "Kabel VG 3x2.5", category: "ELECTRICAL", quantity: 120, unit: "m", minStock: 50, unitPrice: 12000, buildingId: "b1", lastRestocked: "2026-07-10" },
    { id: "m3", name: "Avtomat 16A", category: "ELECTRICAL", quantity: 8, unit: "dona", minStock: 10, unitPrice: 45000, buildingId: "b2", lastRestocked: "2026-06-20" },
    { id: "m4", name: "Truba PP 50mm", category: "PLUMBING", quantity: 85, unit: "m", minStock: 30, unitPrice: 22000, buildingId: "b2", lastRestocked: "2026-07-05" },
    { id: "m5", name: "Kraska oq 20L", category: "PAINT", quantity: 3, unit: "banka", minStock: 5, unitPrice: 280000, buildingId: "b3", lastRestocked: "2026-06-15" },
    { id: "m6", name: "Gips HP 25kg", category: "PAINT", quantity: 42, unit: "qop", minStock: 15, unitPrice: 95000, buildingId: "b3", lastRestocked: "2026-07-20" },
    { id: "m7", name: "Sement M400 50kg", category: "CONSTRUCTION", quantity: 28, unit: "qop", minStock: 20, unitPrice: 75000, buildingId: "b4", lastRestocked: "2026-07-18" },
    { id: "m8", name: "Eshik qulfi", category: "HARDWARE", quantity: 15, unit: "dona", minStock: 8, unitPrice: 65000, buildingId: "b1", lastRestocked: "2026-07-12" },
    { id: "m9", name: "Pol (linoleum) 3m", category: "PAINT", quantity: 4, unit: "rulon", minStock: 3, unitPrice: 450000, buildingId: "b4", lastRestocked: "2026-06-28" },
    { id: "m10", name: "Shlang AR 15mm 20m", category: "PLUMBING", quantity: 2, unit: "dona", minStock: 5, unitPrice: 120000, buildingId: "b5", lastRestocked: "2026-06-10" },
    { id: "m11", name: "Radiator batareyasi", category: "PLUMBING", quantity: 12, unit: "dona", minStock: 5, unitPrice: 380000, buildingId: "b2", lastRestocked: "2026-07-22" },
    { id: "m12", name: "Beton blok 200x400", category: "CONSTRUCTION", quantity: 6, unit: "dona", minStock: 10, unitPrice: 18000, buildingId: "b5", lastRestocked: "2026-06-05" },
  ])

  // ---------------- Stock Issues ----------------
  const stockIssues = ref<StockIssueItem[]>([
    { id: "si1", number: "SI-2026-001", materialId: "m1", materialName: "Lampa LED 12W", quantity: 5, unit: "dona", unitPrice: 35000, totalAmount: 175000, buildingId: "b2", buildingName: "Tashkent City Financial Hub", workOrderId: 1, issuedTo: "Akmal Sodiqov", note: "303-ofisda lampalar almashtirish", status: "COMPLETED", createdAt: "2026-08-10" },
    { id: "si2", number: "SI-2026-002", materialId: "m4", materialName: "Truba PP 50mm", quantity: 12, unit: "m", unitPrice: 22000, totalAmount: 264000, buildingId: "b2", buildingName: "Tashkent City Financial Hub", workOrderId: 1, issuedTo: "Akmal Sodiqov", note: "Quvur almashtirish uchun", status: "APPROVED", createdAt: "2026-08-10" },
    { id: "si3", number: "SI-2026-003", materialId: "m2", materialName: "Kabel VG 3x2.5", quantity: 30, unit: "m", unitPrice: 12000, totalAmount: 360000, buildingId: "b1", buildingName: "Trillant Tower A", workOrderId: 2, issuedTo: "Bekzod Aliyev", note: "501-rozetka uchun kabel", status: "PENDING", createdAt: "2026-08-11" },
    { id: "si4", number: "SI-2026-004", materialId: "m6", materialName: "Gips HP 25kg", quantity: 8, unit: "qop", unitPrice: 95000, totalAmount: 760000, buildingId: "b3", buildingName: "IT Park Innovation Plaza", issuedTo: "Dilshod Karimov", note: "Devanlarni tekislash", status: "COMPLETED", createdAt: "2026-08-05" },
    { id: "si5", number: "SI-2026-005", materialId: "m5", materialName: "Kraska oq 20L", quantity: 2, unit: "banka", unitPrice: 280000, totalAmount: 560000, buildingId: "b4", buildingName: "Silk Road Galleria", workOrderId: 4, issuedTo: "Temur Yusupov", note: "G-12 devorlarni boyash", status: "PENDING", createdAt: "2026-08-11" },
  ])

  // ---------------- Material Requests ----------------
  const materialRequests = ref<MaterialRequestItem[]>([
    { id: "mr1", number: "MR-2026-001", materialName: "Avtomat 16A", category: "ELECTRICAL", quantity: 10, unit: "dona", unitPrice: 45000, totalAmount: 450000, buildingId: "b2", buildingName: "Tashkent City Financial Hub", requestedBy: "Akmal Sodiqov", urgency: "URGENT", status: "PENDING", note: "Tezkor kerak, 303-ofisda almashtirish", createdAt: "2026-08-10" },
    { id: "mr2", number: "MR-2026-002", materialName: "Kraska oq 20L", category: "PAINT", quantity: 5, unit: "banka", unitPrice: 280000, totalAmount: 1400000, buildingId: "b4", buildingName: "Silk Road Galleria", requestedBy: "Temur Yusupov", urgency: "NORMAL", status: "APPROVED", note: "G-12 boyash ishlari", createdAt: "2026-08-08" },
    { id: "mr3", number: "MR-2026-003", materialName: "Shlang AR 15mm 20m", category: "PLUMBING", quantity: 3, unit: "dona", unitPrice: 120000, totalAmount: 360000, buildingId: "b5", buildingName: "Sergeli Logistics Park", requestedBy: "Rustam Eshmurodov", urgency: "HIGH", status: "PENDING", note: "W-02 suv tizimi uchun", createdAt: "2026-08-09" },
    { id: "mr4", number: "MR-2026-004", materialName: "Beton blok 200x400", category: "CONSTRUCTION", quantity: 20, unit: "dona", unitPrice: 18000, totalAmount: 360000, buildingId: "b5", buildingName: "Sergeli Logistics Park", requestedBy: "Rustam Eshmurodov", urgency: "LOW", status: "FULFILLED", note: "Devor tiklash uchun", createdAt: "2026-07-25" },
    { id: "mr5", number: "MR-2026-005", materialName: "Radiator batareyasi", category: "PLUMBING", quantity: 4, unit: "dona", unitPrice: 380000, totalAmount: 1520000, buildingId: "b2", buildingName: "Tashkent City Financial Hub", requestedBy: "Akmal Sodiqov", urgency: "HIGH", status: "REJECTED", note: "Mavjud radiatorlar yetarli", createdAt: "2026-07-20" },
  ])

  // ---------------- Admin Users ----------------
  const adminUsers = ref<AdminUserItem[]>([
    { id: "u1", fullName: "Admin User", email: "admin@makon.uz", phone: "+998901234567", role: "SUPER_HEAD", organization: "MAKON Management", status: "ACTIVE", lastLogin: "2026-08-11T08:30:00", createdAt: "2026-01-01" },
    { id: "u2", fullName: "Akmal Sodiqov", email: "akmal@makon.uz", phone: "+998901112233", role: "FACILITY", organization: "MAKON Management", status: "ACTIVE", lastLogin: "2026-08-10T14:20:00", createdAt: "2026-02-15" },
    { id: "u3", fullName: "Bekzod Aliyev", email: "bekzod@makon.uz", phone: "+998902223344", role: "FACILITY", organization: "MAKON Management", status: "ACTIVE", lastLogin: "2026-08-11T07:00:00", createdAt: "2026-02-15" },
    { id: "u4", fullName: "Dilshod Karimov", email: "dilshod@makon.uz", phone: "+998903334455", role: "BUILDING_MANAGER", organization: "MAKON Management", status: "ACTIVE", lastLogin: "2026-08-10T16:45:00", createdAt: "2026-03-01" },
    { id: "u5", fullName: "Nodira Yusupova", email: "nodira@makon.uz", phone: "+998905556677", role: "ACCOUNTANT", organization: "MAKON Management", status: "ACTIVE", lastLogin: "2026-08-11T09:15:00", createdAt: "2026-03-10" },
    { id: "u6", fullName: "Temur Yusupov", email: "temur@makon.uz", phone: "+998907778899", role: "FACILITY", organization: "MAKON Management", status: "ACTIVE", lastLogin: "2026-08-09T11:30:00", createdAt: "2026-04-01" },
    { id: "u7", fullName: "Rustam Eshmurodov", email: "rustam@makon.uz", phone: "+998909990011", role: "WAREHOUSE_OPERATOR", organization: "MAKON Management", status: "ACTIVE", lastLogin: "2026-08-10T13:00:00", createdAt: "2026-04-15" },
    { id: "u8", fullName: "Zarina Abdullayeva", email: "zarina@makon.uz", phone: "+998901234599", role: "CONTENT_OPERATOR", organization: "MAKON Management", status: "INVITED", lastLogin: null, createdAt: "2026-08-05" },
  ])


  // ─── Tenant Cabinets (auto-created on contract activation) ───
  const tenantCabinets = ref<TenantCabinetItem[]>([
    {
      id: 'tc1', tenantName: 'Digital Tashkent LLC', tenantTin: '302334455',
      tenantPhone: '+998901234567', tenantEmail: 'info@digital-tashkent.uz',
      contractId: 'c1', unitId: 'u101', buildingId: 'b1',
      createdAt: '2026-01-15', status: 'ACTIVE'
    },
    {
      id: 'tc2', tenantName: 'UzAuto Commercial JV', tenantTin: '201998877',
      tenantPhone: '+998902223344', tenantEmail: 'office@uzauto-jv.uz',
      contractId: 'c2', unitId: 'u201', buildingId: 'b2',
      createdAt: '2026-02-01', status: 'ACTIVE'
    },
  ])

  // ---------------- Inventory helpers ----------------
  function addMaterial(m: Omit<MaterialItem, "id">) {
    const id = "m" + (materials.value.length + 1)
    materials.value.push({ ...m, id })
    return id
  }

  function addStockIssue(s: Omit<StockIssueItem, "id" | "number" | "createdAt">) {
    const id = "si" + (stockIssues.value.length + 1)
    const num = "SI-2026-" + String(stockIssues.value.length + 1).padStart(3, "0")
    stockIssues.value.unshift({ ...s, id, number: num, createdAt: new Date().toISOString().split("T")[0] })
    // Deduct from inventory
    const mat = materials.value.find(m => m.id === s.materialId)
    if (mat) mat.quantity = Math.max(0, mat.quantity - s.quantity)
    return id
  }

  function addMaterialRequest(r: Omit<MaterialRequestItem, "id" | "number" | "createdAt">) {
    const id = "mr" + (materialRequests.value.length + 1)
    const num = "MR-2026-" + String(materialRequests.value.length + 1).padStart(3, "0")
    materialRequests.value.unshift({ ...r, id, number: num, createdAt: new Date().toISOString().split("T")[0] })
    return id
  }

  function updateMaterialRequestStatus(id: string, status: MaterialRequestItem["status"]) {
    const r = materialRequests.value.find(mr => mr.id === id)
    if (r) r.status = status
  }

  function updateStockIssueStatus(id: string, status: StockIssueItem["status"]) {
    const s = stockIssues.value.find(si => si.id === id)
    if (s) s.status = status
  }




  const meters = ref<MeterItem[]>([
    { id: 'mt1', buildingName: 'Tashkent City', unitCode: 'A-301', type: 'ELECTRICITY', serialNumber: 'EL-001', currentReading: 15820, previousReading: 14500, tariff: 450, lastReadingDate: '2026-08-01' },
    { id: 'mt2', buildingName: 'Tashkent City', unitCode: 'A-301', type: 'WATER_COLD', serialNumber: 'WC-001', currentReading: 342, previousReading: 298, tariff: 3500, lastReadingDate: '2026-08-01' },
    { id: 'mt3', buildingName: 'Tashkent City', unitCode: 'A-301', type: 'WATER_HOT', serialNumber: 'WH-001', currentReading: 185, previousReading: 162, tariff: 8500, lastReadingDate: '2026-08-01' },
    { id: 'mt4', buildingName: 'Tashkent City', unitCode: 'A-301', type: 'GAS', serialNumber: 'GS-001', currentReading: 1240, previousReading: 1150, tariff: 1200, lastReadingDate: '2026-08-01' },
    { id: 'mt5', buildingName: 'Trillant Tower', unitCode: 'B-501', type: 'ELECTRICITY', serialNumber: 'EL-002', currentReading: 22450, previousReading: 20100, tariff: 450, lastReadingDate: '2026-08-01' },
    { id: 'mt6', buildingName: 'Trillant Tower', unitCode: 'B-501', type: 'WATER_COLD', serialNumber: 'WC-002', currentReading: 512, previousReading: 478, tariff: 3500, lastReadingDate: '2026-08-01' },
    { id: 'mt7', buildingName: 'IT Park', unitCode: 'C-201', type: 'ELECTRICITY', serialNumber: 'EL-003', currentReading: 8720, previousReading: 8100, tariff: 450, lastReadingDate: '2026-08-01' },
    { id: 'mt8', buildingName: 'IT Park', unitCode: 'C-201', type: 'WATER_COLD', serialNumber: 'WC-003', currentReading: 198, previousReading: 175, tariff: 3500, lastReadingDate: '2026-08-01' },
  ])

  const readings = ref<ReadingItem[]>([
    { id: 1, date: '2026-08-01', serialNumber: 'EL-001', unitCode: 'A-301', type: 'ELECTRICITY', value: 15820, consumption: 1320, readBy: 'Bino menejeri', note: 'Iyul oyi' },
    { id: 2, date: '2026-08-01', serialNumber: 'WC-001', unitCode: 'A-301', type: 'WATER_COLD', value: 342, consumption: 44, readBy: 'Bino menejeri', note: 'Iyul oyi' },
    { id: 3, date: '2026-08-01', serialNumber: 'WH-001', unitCode: 'A-301', type: 'WATER_HOT', value: 185, consumption: 23, readBy: 'Bino menejeri', note: 'Iyul oyi' },
    { id: 4, date: '2026-08-01', serialNumber: 'GS-001', unitCode: 'A-301', type: 'GAS', value: 1240, consumption: 90, readBy: 'Bino menejeri', note: 'Iyul oyi' },
    { id: 5, date: '2026-08-01', serialNumber: 'EL-002', unitCode: 'B-501', type: 'ELECTRICITY', value: 22450, consumption: 2350, readBy: 'Bino menejeri', note: 'Iyul oyi' },
    { id: 6, date: '2026-07-01', serialNumber: 'EL-001', unitCode: 'A-301', type: 'ELECTRICITY', value: 14500, consumption: 1180, readBy: 'Bino menejeri', note: 'Iyun oyi' },
  ])

  const notifications = ref<NotificationItem[]>([
    { id: '1', type: 'invoice', title: 'Invoys INV-2026-052 tasdiqlandi', desc: "25.0M so'm | Unit A-301 Tashkent City", time: '5 daq oldin', read: false },
    { id: '2', type: 'eri', title: "Shartnoma CTR-2026-010 imzolash kutilmoqda", desc: 'Bino egasi ERI imzosi kutilmoqda', time: '20 daq oldin', read: false },
    { id: '3', type: 'service', title: "Servis so'rov SR-2026-004 qabul qilindi", desc: "Elektr ta'miri | A-301", time: '1 soat oldin', read: false },
    { id: '4', type: 'contract', title: "Shartnoma CTR-2026-002 faol holatga o'tdi", desc: 'Ipak Yuli Savdo MChJ | 12 oylik ijara', time: '2 soat oldin', read: false },
    { id: '5', type: 'application', title: 'Yangi ariza APP-2026-003 yuborildi', desc: 'E-102 Trillant Tower | Ijara', time: '3 soat oldin', read: true },
    { id: '6', type: 'invoice', title: "Invoys INV-2026-046 muddati o'tdi", desc: "35.0M so'm | Unit B-205", time: '5 soat oldin', read: true },
    { id: '7', type: 'eri', title: 'ERI sertifikati muddati yaqinlashmoqda', desc: 'Orient Logistika MChJ | 30 kun qoldi', time: '1 kun oldin', read: true },
    { id: '8', type: 'service', title: 'Work order WO-2026-038 yakunlandi', desc: "Konditsioner ta'miri | A-301", time: '1 kun oldin', read: true },
    { id: '9', type: 'contract', title: 'Shartnoma CTR-2025-098 muddati tugadi', desc: 'Sergeli Logistika | A-205 Tashkent City', time: '2 kun oldin', read: true },
    { id: '10', type: 'application', title: "Ariza APP-2026-002 moliyaviy ko'rikdan o'tdi", desc: 'D-401 Piramit | Sotib olish', time: '3 kun oldin', read: true },
  ])

  const pendingApprovals = ref<ApprovalItem[]>([
    { id: 'a1', title: 'Invoys INV-2026-051', submitter: 'Dilshod Karimov (Buxgalter)', date: '11 Avg 2026', contract: 'CTR-2026-001', amount: 8500000, type: 'Invoys', currentStep: 1 },
    { id: 'a2', title: "To'lov TM-2026-089", submitter: 'Aziza Yusupova (Operator)', date: '10 Avg 2026', contract: 'CTR-2026-005', amount: 4800000, type: "To'lov", currentStep: 2 },
    { id: 'a3', title: 'Invoys INV-2026-052', submitter: 'Sardor Rahimov (Buxgalter)', date: '09 Avg 2026', contract: 'CTR-2026-012', amount: 5500000, type: 'Invoys', currentStep: 0 },
    { id: 'a4', title: 'Depozit DP-2026-015', submitter: 'Dilshod Karimov (Buxgalter)', date: '08 Avg 2026', contract: 'CTR-2026-018', amount: 3900000, type: 'Depozit', currentStep: 1 },
  ])

  const approvalHistory = ref<ApprovalHistoryItem[]>([
    { id: 'h1', title: 'Invoys INV-2026-048', submitter: 'Dilshod Karimov', amount: 7200000, date: '05 Avg 2026', status: 'APPROVED' },
    { id: 'h2', title: "To'lov TM-2026-085", submitter: 'Aziza Yusupova', amount: 6200000, date: '03 Avg 2026', status: 'APPROVED' },
    { id: 'h3', title: 'Invoys INV-2026-046', submitter: 'Sardor Rahimov', amount: 5500000, date: '01 Avg 2026', status: 'REJECTED' },
    { id: 'h4', title: 'Invoys INV-2026-044', submitter: 'Dilshod Karimov', amount: 8500000, date: '28 Iyl 2026', status: 'APPROVED' },
  ])

  const backups = ref<BackupItem[]>([
    { id: '1', name: 'backup_20260810_1600', type: 'MANUAL', size: '1.2 GB', time: '10 Avg 16:00', status: 'SUCCESS' },
    { id: '2', name: 'backup_20260810_1200', type: 'AUTO', size: '1.2 GB', time: '10 Avg 12:00', status: 'SUCCESS' },
    { id: '3', name: 'backup_20260810_0600', type: 'AUTO', size: '1.2 GB', time: '10 Avg 06:00', status: 'SUCCESS' },
    { id: '4', name: 'backup_20260810_0000', type: 'AUTO', size: '1.1 GB', time: '10 Avg 00:00', status: 'SUCCESS' },
    { id: '5', name: 'backup_20260809_1800', type: 'AUTO', size: '1.1 GB', time: '09 Avg 18:00', status: 'SUCCESS' },
    { id: '6', name: 'backup_20260809_1200', type: 'AUTO', size: '1.1 GB', time: '09 Avg 12:00', status: 'SUCCESS' },
    { id: '7', name: 'backup_20260809_0600', type: 'AUTO', size: '1.1 GB', time: '09 Avg 06:00', status: 'FAILED' },
    { id: '8', name: 'backup_20260809_0000', type: 'AUTO', size: '1.0 GB', time: '09 Avg 00:00', status: 'SUCCESS' },
  ])

  function addReading(meterId: string, value: number, date: string, note: string) {
    const meter = meters.value.find(m => m.id === meterId)
    if (!meter) return
    const consumption = Math.max(0, value - meter.currentReading)
    readings.value.unshift({
      id: Date.now(),
      date,
      serialNumber: meter.serialNumber,
      unitCode: meter.unitCode,
      type: meter.type,
      value,
      consumption,
      readBy: 'Tizim',
      note,
    })
    meter.previousReading = meter.currentReading
    meter.currentReading = value
    meter.lastReadingDate = date
  }

  function markAllNotificationsRead() {
    notifications.value.forEach(n => n.read = true)
  }

  function approveItem(id: string) {
    const item = pendingApprovals.value.find(a => a.id === id)
    if (!item) return
    pendingApprovals.value = pendingApprovals.value.filter(a => a.id !== id)
    approvalHistory.value.unshift({
      id: 'h' + Date.now(),
      title: item.title,
      submitter: item.submitter.split('(')[0].trim(),
      amount: item.amount,
      date: '11 Avg 2026',
      status: 'APPROVED',
    })
  }

  function rejectItem(id: string) {
    const item = pendingApprovals.value.find(a => a.id === id)
    if (!item) return
    pendingApprovals.value = pendingApprovals.value.filter(a => a.id !== id)
    approvalHistory.value.unshift({
      id: 'h' + Date.now(),
      title: item.title,
      submitter: item.submitter.split('(')[0].trim(),
      amount: item.amount,
      date: '11 Avg 2026',
      status: 'REJECTED',
    })
  }

  function createBackup() {
    const now = new Date()
    const ts = now.toISOString().replace(/[-:T]/g, '').slice(0, 12)
    backups.value.unshift({
      id: Date.now().toString(),
      name: 'backup_' + ts,
      type: 'MANUAL',
      size: '1.2 GB',
      time: '11 Avg ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0'),
      status: 'SUCCESS',
    })
  }


  // ─── Audit Log ───
  const auditLogs = ref([
    { id: '1', user: 'Alisher Qodirov', action: 'CONTRACT.SIGN', type: 'APPROVE', description: 'CTR-2026-010 shartnomasini ERI orqali imzoladi', time: '14:32', ip: '85.17.12.34' },
    { id: '2', user: 'Dilnoza Karimova', action: 'INVOICE.CREATE', type: 'CREATE', description: 'INV-2026-052 invoysini yaratdi (25.0M so\'m)', time: '14:28', ip: '85.17.12.35' },
    { id: '3', user: 'Sardor Yusupov', action: 'BUILDING.UPDATE', type: 'UPDATE', description: 'Tashkent City binosi ma\'lumotlarini yangiladi', time: '14:15', ip: '94.158.21.10' },
    { id: '4', user: 'Ravshan Keldiyev', action: 'WORK_ORDER.CREATE', type: 'CREATE', description: 'WO-2026-038 work order yaratdi (A-301 konditsioner)', time: '13:45', ip: '85.17.12.36' },
    { id: '5', user: 'Alisher Qodirov', action: 'USER.LOGIN', type: 'AUTH', description: 'Tizimga kirdi', time: '13:30', ip: '85.17.12.34' },
    { id: '6', user: 'Dilnoza Karimova', action: 'INVOICE.APPROVE', type: 'APPROVE', description: 'INV-2026-051 invoysini tasdiqladi (21.0M so\'m)', time: '12:50', ip: '85.17.12.35' },
    { id: '7', user: 'Jasur Tursunov', action: 'WORK_ORDER.UPDATE', type: 'UPDATE', description: 'WO-2026-035 statusini IN_PROGRESS ga o\'zgartirdi', time: '12:15', ip: '85.17.12.37' },
    { id: '8', user: 'Kamola Rashidova', action: 'USER.INVITE', type: 'CREATE', description: 'Nodira Azizovani BUILDING_MANAGER rolida taklif qildi', time: '11:30', ip: '85.17.12.38' },
    { id: '9', user: 'Alisher Qodirov', action: 'BUILDING.CREATE', type: 'CREATE', description: 'Savdo Markaz binosini qo\'shdi', time: '10:45', ip: '85.17.12.34' },
    { id: '10', user: 'Dilnoza Karimova', action: 'CONTRACT.VIEW', type: 'APPROVE', description: 'CTR-2026-002 shartnomasini ko\'rdi', time: '10:20', ip: '85.17.12.35' },
    { id: '11', user: 'Otabek Yo\'ldoshev', action: 'USER.LOGIN', type: 'AUTH', description: 'Tizimga kirdi', time: '09:15', ip: '94.158.21.20' },
    { id: '12', user: 'Ravshan Keldiyev', action: 'METER.READ', type: 'UPDATE', description: 'EL-001 hisoblagich ko\'rsatkichini kiritdi (15420 kWh)', time: '09:00', ip: '85.17.12.36' },
  ])

  function addAuditLog(entry: { user: string; action: string; type: string; description: string }) {
    auditLogs.value.unshift({
      id: Date.now().toString(),
      ...entry,
      time: new Date().toLocaleTimeString('uz', { hour: '2-digit', minute: '2-digit' }),
      ip: '85.17.12.34',
    })
  }

  // ─── Monitoring ───
  const monitoringMetrics = ref({
    apiLatency: 142,
    uptime: 99.97,
    activeUsers: 8,
    dbSize: '1.2 GB',
    totalRequests: 48210,
    errorRate: 0.03,
  })

  const onlineUsers = ref([
    { id: '1', name: 'Alisher Qodirov', role: 'Super Rahbar', ip: '85.17.12.34', lastAction: 'Shartnoma imzolash', sessionStart: '13:30' },
    { id: '2', name: 'Dilnoza Karimova', role: 'Bosh Hisobchi', ip: '85.17.12.35', lastAction: 'Invoys yaratish', sessionStart: '09:15' },
    { id: '3', name: 'Ravshan Keldiyev', role: 'Texnik xodim', ip: '85.17.12.36', lastAction: 'Work order yangilash', sessionStart: '08:45' },
    { id: '4', name: 'Jasur Tursunov', role: 'Bino Menejeri', ip: '85.17.12.37', lastAction: 'Servis so\'rov ko\'rish', sessionStart: '08:30' },
    { id: '5', name: 'Kamola Rashidova', role: 'Operator', ip: '85.17.12.38', lastAction: 'Ariza qabul qilish', sessionStart: '09:00' },
    { id: '6', name: 'Otabek Yo\'ldoshev', role: 'Hisobchi', ip: '94.158.21.20', lastAction: 'Hisobot ko\'rish', sessionStart: '09:15' },
    { id: '7', name: 'Sardor Yusupov', role: 'Bino Menejeri', ip: '94.158.21.10', lastAction: 'Bino ma\'lumotlari', sessionStart: '08:50' },
    { id: '8', name: 'Nodira Azizova', role: 'Bino Menejeri', ip: '94.158.21.25', lastAction: 'Listing tahrir', sessionStart: '09:30' },
  ])

  const monitoringErrors = ref([
    { id: '1', time: '14:25', endpoint: '/api/contracts/sign', status: 500, message: 'ERI service timeout', count: 2 },
    { id: '2', time: '13:10', endpoint: '/api/invoices/export', status: 404, message: 'File not found', count: 1 },
    { id: '3', time: '11:45', endpoint: '/api/buildings/3/units', status: 403, message: 'Permission denied', count: 3 },
    { id: '4', time: '10:20', endpoint: '/api/auth/verify', status: 401, message: 'Token expired', count: 5 },
  ])

  // ─── Reports ───
  const reportMonthlyData = ref([
    { month: 'Mart', revenue: 28, debt: 3.2 },
    { month: 'Aprel', revenue: 31, debt: 2.8 },
    { month: 'May', revenue: 29, debt: 4.1 },
    { month: 'Iyun', revenue: 34, debt: 2.5 },
    { month: 'Iyul', revenue: 36, debt: 3.8 },
    { month: 'Avgust', revenue: 38, debt: 2.9 },
    { month: 'Sent', revenue: 33, debt: 4.2 },
    { month: 'Okt', revenue: 38.5, debt: 2.1 },
  ])

  const reportOccupancyData = computed(() =>
    buildings.value.map(b => ({
      name: b.name,
      pct: Math.round((b.occupiedUnits / b.totalUnits) * 100),
      occupied: b.occupiedUnits,
      total: b.totalUnits,
      color: b.color || '#2563EB',
    }))
  )

  const reportBuildingCompare = computed(() =>
    buildings.value.map(b => ({
      name: b.name,
      units: b.totalUnits,
      occ: Math.round((b.occupiedUnits / b.totalUnits) * 100),
      revenue: Math.round(b.totalUnits * b.occupiedUnits * 25000000 / b.totalUnits),
      debt: Math.round(Math.random() * 8000000),
      color: b.color || '#2563EB',
    }))
  )

  const reportKpis = computed(() => {
    const totalUnits = buildings.value.reduce((s, b) => s + b.totalUnits, 0)
    const occupiedUnits = buildings.value.reduce((s, b) => s + b.occupiedUnits, 0)
    const totalRevenue = invoices.value.filter(i => i.status === 'PAID').reduce((s, i) => s + i.amount, 0)
    const totalDebt = invoices.value.filter(i => i.status !== 'PAID').reduce((s, i) => s + (i.balance || 0), 0)
    const activeContracts = contracts.value.filter(c => c.status === 'ACTIVE').length
  
  return {
      totalRevenue,
      occupancyRate: Math.round((occupiedUnits / totalUnits) * 100),
      activeContracts,
      totalDebt,
    }
  })


  // ─── Login History ───
  const loginHistory = ref([
    { id: '1', user: 'Alisher Qodirov', email: 'a.qodirov@makon.uz', event: 'LOGIN', ip: '85.17.12.34', device: 'Desktop', browser: 'Chrome 126', time: '14:32:15' },
    { id: '2', user: 'Dilnoza Karimova', email: 'd.karimova@makon.uz', event: 'LOGIN', ip: '85.17.12.35', device: 'Desktop', browser: 'Firefox 125', time: '14:28:42' },
    { id: '3', user: 'Sardor Yusupov', email: 's.yusupov@abc.uz', event: 'ERI_LOGIN', ip: '94.158.21.10', device: 'Desktop', browser: 'Chrome 126', time: '14:15:08' },
    { id: '4', user: 'Unknown', email: 'admin@makon.uz', event: 'FAILED', ip: '45.12.33.88', device: 'Desktop', browser: 'Chrome 126', time: '13:55:30' },
    { id: '5', user: 'Alisher Qodirov', email: 'a.qodirov@makon.uz', event: 'LOGIN', ip: '85.17.12.34', device: 'Mobile', browser: 'Safari 17', time: '13:30:12' },
    { id: '6', user: 'Ravshan Keldiyev', email: 'r.keldiyev@makon.uz', event: 'LOGIN', ip: '85.17.12.36', device: 'Desktop', browser: 'Chrome 126', time: '12:50:45' },
    { id: '7', user: 'Unknown', email: 'n.umarov@makon.uz', event: 'BLOCK', ip: '45.12.33.88', device: 'Desktop', browser: 'Chrome 126', time: '12:15:22' },
    { id: '8', user: 'Jasur Tursunov', email: 'j.tursunov@makon.uz', event: 'LOGIN', ip: '85.17.12.37', device: 'Desktop', browser: 'Edge 126', time: '12:00:18' },
    { id: '9', user: 'Kamola Rashidova', email: 'k.rashidova@makon.uz', event: 'ERI_LOGIN', ip: '85.17.12.38', device: 'Desktop', browser: 'Chrome 126', time: '11:30:55' },
    { id: '10', user: 'Alisher Qodirov', email: 'a.qodirov@makon.uz', event: 'LOGOUT', ip: '85.17.12.34', device: 'Desktop', browser: 'Chrome 126', time: '10:45:30' },
    { id: "11", user: "Otabek Yo'ldoshev", email: 'o.yuldoshev@smart.uz', event: 'LOGIN', ip: '94.158.21.20', device: 'Mobile', browser: 'Chrome 126', time: '09:15:42' },
    { id: '12', user: 'Unknown', email: 'admin@makon.uz', event: 'FAILED', ip: '45.12.33.88', device: 'Desktop', browser: 'Chrome 126', time: '08:30:12' },
  ])

  // ─── Notification Templates ───
  const notificationTemplates = ref([
    { id: '1', event: 'Yangi ariza yuborildi', channel: 'Email + Push', iconName: 'FileText', active: true,
      textUz: "Yangi ariza {{number}} qabul qilindi. Unit: {{unit}}, summa: {{price}} so'm.",
      textRu: 'Новая заявка {{number}} принята. Юнит: {{unit}}, сумма: {{price}} сум.',
      variables: ['number', 'unit', 'price'] },
    { id: '2', event: 'Invoys yaratildi', channel: 'Email + SMS', iconName: 'Receipt', active: true,
      textUz: "Invoys {{number}} yaratildi. Summa: {{amount}} so'm. Muddat: {{dueDate}}.",
      textRu: 'Счет {{number}} создан. Сумма: {{amount}} сум. Срок: {{dueDate}}.',
      variables: ['number', 'amount', 'dueDate'] },
    { id: '3', event: 'ERI imzo talab qilinadi', channel: 'Email + Push', iconName: 'ShieldCheck', active: true,
      textUz: "Shartnoma {{number}} uchun ERI imzosi kutilmoqda. Iltimos, imzolang.",
      textRu: 'Для договора {{number}} ожидается ЭРИ подпись. Пожалуйста, подпишите.',
      variables: ['number'] },
    { id: '4', event: "Servis so'rov yangilandi", channel: 'Push', iconName: 'Wrench', active: true,
      textUz: "Servis so'rov {{number}} statusi: {{status}}. Unit: {{unit}}.",
      textRu: 'Статус сервисной заявки {{number}}: {{status}}. Юнит: {{unit}}.',
      variables: ['number', 'status', 'unit'] },
    { id: '5', event: 'Shartnoma imzolandi', channel: 'Email + SMS', iconName: 'FileSignature', active: true,
      textUz: "Shartnoma {{number}} tomonlar tomonidan imzolandi. Faol sanasi: {{startDate}}.",
      textRu: 'Договор {{number}} подписан сторонами. Дата активации: {{startDate}}.',
      variables: ['number', 'startDate'] },
    { id: '6', event: "Qarzdorlik eslatmasi", channel: 'SMS', iconName: 'Bell', active: false,
      textUz: "Sizning qarzdorligingiz: {{debt}} so'm. Iltimos, to'lovni amalga oshiring.",
      textRu: 'Ваша задолженность: {{debt}} сум. Пожалуйста, произведите оплату.',
      variables: ['debt'] },
  ])


  // ─── Tenant Cabinet Data ───
  const tenantContracts = computed(() =>
    contracts.value.map(c => ({
      id: c.id,
      number: c.number,
      unit: c.unitNumber,
      buildingName: c.buildingName,
      monthlyRent: c.monthlyRent,
      startDate: c.startDate,
      endDate: c.endDate,
      status: c.status,
      eriTenantSigned: c.status === 'ACTIVE' || c.status === 'EXPIRED',
      eriLandlordSigned: c.status === 'ACTIVE' || c.status === 'EXPIRED',
      daysLeft: c.status === 'ACTIVE' ? Math.max(0, Math.round((new Date(c.endDate).getTime() - Date.now()) / 86400000)) : 0,
      progressPct: c.status === 'EXPIRED' ? 100 : c.status === 'ACTIVE' ? Math.round(Math.random() * 50) : 0,
    }))
  )

  const tenantServiceRequests = computed(() =>
    serviceRequests.value.map(s => ({
      id: s.id,
      number: s.number,
      category: s.category,
      description: s.description,
      date: s.createdAt,
      status: s.status,
      rating: s.rating,
    }))
  )

  const tenantUnits = computed(() => {
    const result: any[] = []
    buildings.value.forEach(b => {
      // Pick a few units per building for the tenant
      if (b.id === 'b1' || b.id === 'b2' || b.id === 'b3') {
        result.push({
          id: b.id + '-u1',
          name: b.id === 'b1' ? 'A-301' : b.id === 'b2' ? 'B-205' : 'C-101',
          building: b.name,
          floor: b.id === 'b1' ? 3 : b.id === 'b2' ? 2 : 1,
          area: b.id === 'b1' ? 85 : b.id === 'b2' ? 120 : 45,
          rooms: b.id === 'b1' ? 3 : b.id === 'b2' ? 4 : 2,
          type: 'RENT',
          rent: b.id === 'b1' ? '25.0M' : b.id === 'b2' ? '35.0M' : '18.0M',
          photo: b.image || '/buildings/hero-tashkent.jpg',
          contractNumber: 'CTR-2026-00' + (b.id === 'b1' ? '1' : b.id === 'b2' ? '2' : '5'),
          contractEnd: b.id === 'b1' ? '15 Mar 2027' : b.id === 'b2' ? '01 Dek 2026' : '31 May 2027',
          debt: b.id === 'b2' ? 4200000 : 0,
          statusBadge: b.id === 'b2' ? 'badge-warning' : 'badge-success',
          statusLabel: b.id === 'b2' ? 'Qarz bor' : 'Faol',
        })
      }
    })
    return result
  })

  const tenantMeterHistory = ref([
    { month: 'Iyul 2026', electricity: 14200, water: 345, gas: 112, total: 637500, status: 'PAID' },
    { month: 'Iyun 2026', electricity: 13500, water: 320, gas: 98, total: 595000, status: 'PAID' },
    { month: 'May 2026', electricity: 12800, water: 305, gas: 85, total: 552000, status: 'PAID' },
    { month: 'Aprel 2026', electricity: 11900, water: 290, gas: 72, total: 508000, status: 'PAID' },
    { month: 'Mart 2026', electricity: 11200, water: 275, gas: 65, total: 471000, status: 'PAID' },
  ])

  const tenantInvoices = computed(() =>
    invoices.value.slice(0, 4).map(inv => ({
      id: inv.id,
      number: inv.number,
      unit: 'A-301',
      period: inv.period,
      amount: inv.amount,
      status: inv.status,
    }))
  )

  const tenantServiceCharges = ref([
    { name: "Ijara to'lovi", iconName: 'Receipt', color: 'var(--accent)', amount: 25000000, details: 'A-301 · 85 m²', unit: 'oylik', percent: 72 },
    { name: 'Elektr energiyasi', iconName: 'Zap', color: '#f59e0b', amount: 1320000, details: "440 kWh × 3000 so'm", unit: 'oylik', percent: 4 },
    { name: "Suv ta'minoti", iconName: 'Droplet', color: '#3b82f6', amount: 182000, details: "130 m³ × 1400 so'm", unit: 'oylik', percent: 1 },
    { name: 'Gaz', iconName: 'Flame', color: '#ef4444', amount: 225000, details: "150 m³ × 1500 so'm", unit: 'oylik', percent: 1 },
    { name: 'Faqat texnik xizmat', iconName: 'Wrench', color: 'var(--accent)', amount: 500000, details: 'A-301 · oylik', unit: 'oylik', percent: 2 },
    { name: 'Axlat olib ketish', iconName: 'Trash2', color: '#10b981', amount: 120000, details: 'A-301 · oylik', unit: 'oylik', percent: 1 },
  ])

  return {
    buildings,
    units,
    listings,
    applications,
    serviceRequests,
    contracts,
    eriSignatures,
    invoices,
    periods,
    workOrders,
    materials,
    stockIssues,
    materialRequests,
    adminUsers,
    visualSettings,
    updateBuilding,

    addBuilding,
    addUnit,
    updateUnitStatus,
    addListing,
    addApplication,
    updateApplicationStatus,
    addServiceRequest,
    activateContract,
    addMaterial,
    addStockIssue,
    addMaterialRequest,
    updateMaterialRequestStatus,
    updateStockIssueStatus,
    meters,
    readings,
    notifications,
    pendingApprovals,
    approvalHistory,
    backups,
    addReading,
    markAllNotificationsRead,
    approveItem,
    rejectItem,
    createBackup,
    auditLogs,
    addAuditLog,
    monitoringMetrics,
    onlineUsers,
    monitoringErrors,
    reportMonthlyData,
    reportOccupancyData,
    reportBuildingCompare,
    reportKpis,
    loginHistory,
    notificationTemplates,
    tenantContracts,
    tenantServiceRequests,
    tenantUnits,
    tenantMeterHistory,
    tenantInvoices,
    tenantServiceCharges,
    tenantCabinets,
    syncListingStatus,
    recalcBuildingStats,
  }
})
