export type BuildingType = 'BUSINESS_CENTER' | 'OFFICE' | 'SHOPPING' | 'WAREHOUSE' | 'RESIDENTIAL' | 'MIXED'
export type OfferType = 'RENT' | 'SALE'
export type ListingStatus = 'DRAFT' | 'PUBLISHED' | 'HIDDEN' | 'ARCHIVED'

// All 8 roles per technical specification
export type UserRole =
  | 'SUPER_HEAD'
  | 'ADMIN'
  | 'BUILDING_MANAGER'
  | 'ACCOUNTANT'
  | 'FACILITY'
  | 'WAREHOUSE_OPERATOR'
  | 'CONTENT_OPERATOR'
  | 'TENANT_OWNER'

// Application statuses
export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'OFFER_SENT'
  | 'OFFER_ACCEPTED'
  | 'OFFER_REJECTED'
  | 'APPROVED'
  | 'REJECTED'
  | 'CONTRACT_PENDING'
  | 'COMPLETED'
  | 'CANCELLED'

// Contract statuses
export type ContractStatus =
  | 'DRAFT'
  | 'PENDING_SIGNATURE'
  | 'SIGNED_TENANT'
  | 'SIGNED_ALL'
  | 'ACTIVE'
  | 'EXPIRED'
  | 'TERMINATED'
  | 'CANCELLED'

// Invoice statuses
export type InvoiceStatus = 'UNPAID' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE' | 'CANCELLED'

// Service request statuses
export type ServiceRequestStatus = 'NEW' | 'ASSIGNED' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED' | 'OVERDUE'

// Service request priorities
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

// Service request categories
export type ServiceCategory = 'ELECTRICAL' | 'PLUMBING' | 'HVAC' | 'STRUCTURAL' | 'CLEANING' | 'SECURITY' | 'OTHER'

// Finance period statuses
export type PeriodStatus = 'OPEN' | 'CLOSED' | 'LOCKED'

// ERI document statuses
export type EriStatus = 'PENDING' | 'SIGNED' | 'REJECTED' | 'EXPIRED'

// Meter types
export type MeterType = 'ELECTRICITY' | 'WATER' | 'GAS' | 'HEAT'

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
  managedBy?: string
  isPublished: boolean
  isArchived: boolean
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

export interface Application {
  id: string
  number: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  applicantPinfl: string
  listingId: string
  unitId: string
  offeredPrice: number
  currency: string
  desiredStartDate: string
  durationMonths: number
  status: ApplicationStatus
  notes: string
  rejectionReason: string
  type: OfferType
}

export interface Contract {
  id: string
  number: string
  applicationId: string
  unitId: string
  tenantName: string
  tenantTin: string
  type: OfferType
  monthlyRent: number
  deposit: number
  currency: string
  startDate: string
  endDate: string
  status: ContractStatus
  version: number
  documentHash: string
  eriDocumentId: string
  pdfUrl: string
}

export interface Invoice {
  id: string
  number: string
  contractId: string
  amount: number
  paidAmount: number
  balance: number
  currency: string
  period: string
  dueDate: string
  status: InvoiceStatus
}

export interface ServiceRequest {
  id: string
  number: string
  buildingId: string
  unitId: string
  category: ServiceCategory
  priority: Priority
  status: ServiceRequestStatus
  description: string
  assignedTo: string
  createdBy: string
  photos: string[]
  slaDueAt: string
  rating: number
  workOrderId: string
}

export interface AuthUser {
  id: string
  fullName: string
  email: string
  role: UserRole
  organizationId?: string
  organizationName?: string
  phone?: string
  pinfl?: string
  tin?: string
}

// --- Labels ---

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

export const ROLE_LABELS: Record<UserRole, { uz: string; ru: string }> = {
  SUPER_HEAD: { uz: 'Super Rahbar', ru: 'Супер Руководитель' },
  ADMIN: { uz: 'Administrator', ru: 'Администратор' },
  BUILDING_MANAGER: { uz: 'Bino Rahbari', ru: 'Менеджер здания' },
  ACCOUNTANT: { uz: 'Buxgalter', ru: 'Бухгалтер' },
  FACILITY: { uz: 'Pudratchi', ru: 'Подрядчик' },
  WAREHOUSE_OPERATOR: { uz: 'Omborchi', ru: 'Кладовщик' },
  CONTENT_OPERATOR: { uz: 'Kontent Operator', ru: 'Контент оператор' },
  TENANT_OWNER: { uz: 'Ijarachi', ru: 'Арендатор' },
}

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, { uz: string; ru: string }> = {
  DRAFT: { uz: 'Qoralama', ru: 'Черновик' },
  SUBMITTED: { uz: 'Yuborilgan', ru: 'Отправлено' },
  UNDER_REVIEW: { uz: 'Ko\'rib chiqilmoqda', ru: 'На рассмотрении' },
  OFFER_SENT: { uz: 'Taklif yuborildi', ru: 'Оффер отправлен' },
  OFFER_ACCEPTED: { uz: 'Taklif qabul qilindi', ru: 'Оффер принят' },
  OFFER_REJECTED: { uz: 'Taklif rad etildi', ru: 'Оффер отклонён' },
  APPROVED: { uz: 'Tasdiqlandi', ru: 'Утверждено' },
  REJECTED: { uz: 'Rad etildi', ru: 'Отклонено' },
  CONTRACT_PENDING: { uz: 'Shartnoma kutilmoqda', ru: 'Ожидание договора' },
  COMPLETED: { uz: 'Yakunlandi', ru: 'Завершено' },
  CANCELLED: { uz: 'Bekor qilindi', ru: 'Отменено' },
}

export const CONTRACT_STATUS_LABELS: Record<ContractStatus, { uz: string; ru: string }> = {
  DRAFT: { uz: 'Qoralama', ru: 'Черновик' },
  PENDING_SIGNATURE: { uz: 'Imzo kutilmoqda', ru: 'Ожидает подписи' },
  SIGNED_TENANT: { uz: 'Ijarachi imzoladi', ru: 'Подписан арендатором' },
  SIGNED_ALL: { uz: 'Barcha imzoladi', ru: 'Все подписали' },
  ACTIVE: { uz: 'Faol', ru: 'Активен' },
  EXPIRED: { uz: 'Muddati tugadi', ru: 'Истёк' },
  TERMINATED: { uz: 'Bekor qilindi', ru: 'Расторгнут' },
  CANCELLED: { uz: 'Rad etildi', ru: 'Отменён' },
}

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, { uz: string; ru: string }> = {
  UNPAID: { uz: 'To\'lanmagan', ru: 'Не оплачен' },
  PARTIALLY_PAID: { uz: 'Qisman to\'langan', ru: 'Частично оплачен' },
  PAID: { uz: 'To\'langan', ru: 'Оплачен' },
  OVERDUE: { uz: 'Muddati o\'tgan', ru: 'Просрочен' },
  CANCELLED: { uz: 'Bekor qilingan', ru: 'Отменён' },
}

export const PRIORITY_LABELS: Record<Priority, { uz: string; ru: string }> = {
  LOW: { uz: 'Past', ru: 'Низкий' },
  MEDIUM: { uz: 'O\'rtacha', ru: 'Средний' },
  HIGH: { uz: 'Yuqori', ru: 'Высокий' },
  URGENT: { uz: 'Shoshilinch', ru: 'Срочный' },
}

export const METER_TYPE_LABELS: Record<MeterType, { uz: string; ru: string }> = {
  ELECTRICITY: { uz: 'Elektr', ru: 'Электричество' },
  WATER: { uz: 'Suv', ru: 'Вода' },
  GAS: { uz: 'Gaz', ru: 'Газ' },
  HEAT: { uz: 'Issiqlik', ru: 'Тепло' },
}
