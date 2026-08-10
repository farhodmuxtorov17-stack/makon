export type BuildingType = 'BUSINESS_CENTER' | 'OFFICE' | 'SHOPPING' | 'WAREHOUSE' | 'RESIDENTIAL' | 'MIXED'
export type OfferType = 'RENT' | 'SALE'
export type ListingStatus = 'DRAFT' | 'PUBLISHED' | 'HIDDEN' | 'ARCHIVED'

export type UserRole = 'SUPER_HEAD' | 'BUILDING_MANAGER' | 'ACCOUNTANT' | 'FACILITY' | 'TENANT_OWNER'

export interface Building {
  id: string
  name: string
  slug: string
  type: BuildingType
  address: string
  city: string
  district: string
  floorsCount: number
  totalUnits: number
  occupiedUnits: number
  vacantUnits: number
  totalArea: number
  gallery: string[]
  publicDescription: string
}

export interface Listing {
  id: string
  buildingId: string
  titleUz: string
  titleRu: string
  descriptionUz: string
  descriptionRu: string
  offerType: OfferType
  price: number
  currency: string
  photos: string[]
  viewsCount: number
  status: ListingStatus
  virtualTourUrl: string
}

export interface CatalogStats {
  totalBuildings: number
  totalUnits: number
  vacantUnits: number
  occupiedUnits: number
  publishedListings: number
}

export interface CatalogResponse {
  buildings: Building[]
  listings: Listing[]
  stats: CatalogStats
}

export interface BuildingDetailResponse {
  building: Building
  listings: Listing[]
}

export interface AuthUser {
  id: string
  fullName: string
  email: string
  role: UserRole
  organizationId?: string
}

export const BUILDING_TYPE_LABELS: Record<BuildingType, { uz: string; ru: string }> = {
  BUSINESS_CENTER: { uz: 'Biznes markaz', ru: 'Бизнес-центр' },
  OFFICE: { uz: 'Ofis binosi', ru: 'Офисное здание' },
  SHOPPING: { uz: 'Savdo markaz', ru: 'Торговый центр' },
  WAREHOUSE: { uz: 'Ombor', ru: 'Склад' },
  RESIDENTIAL: { uz: 'Turar joy', ru: 'Жилое здание' },
  MIXED: { uz: 'Aralash', ru: 'Смешанное' },
}

export const OFFER_TYPE_LABELS: Record<OfferType, { uz: string; ru: string }> = {
  RENT: { uz: 'Ijaraga', ru: 'Аренда' },
  SALE: { uz: 'Sotuvga', ru: 'Продажа' },
}
