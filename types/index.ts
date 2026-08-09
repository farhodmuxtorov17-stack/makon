// types/index.ts

export type UserRole =
  'SUPER_HEAD' | 'BUILDING_MANAGER' | 'ACCOUNTANT' | 'FACILITY' | 'TENANT_OWNER'

export type BuildingType =
  'BUSINESS_CENTER' | 'OFFICE' | 'SHOPPING' | 'WAREHOUSE' | 'RESIDENTIAL' | 'MIXED'
export type UnitStatus = 'DRAFT' | 'VACANT' | 'RENTED' | 'SOLD' | 'MAINTENANCE' | 'RESERVED'
export type OfferType = 'RENT' | 'SALE' | 'BOTH'
export type UsageType = 'OFFICE' | 'RETAIL' | 'WAREHOUSE' | 'RESIDENTIAL' | 'PARKING' | 'MIXED'
export type ListingStatus = 'DRAFT' | 'PUBLISHED' | 'PAUSED' | 'ARCHIVED'
export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'FINANCE_REVIEW'
  | 'OFFER_SENT'
  | 'CONTRACT_SIGNING'
  | 'ERI_SIGNING'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED'
export type ApplicationType = 'RENT' | 'SALE'
export type ContractStatus =
  'DRAFT' | 'PENDING_SIGN' | 'SIGNED' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED'
export type InvoiceStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'OVERDUE' | 'CANCELLED'
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
export type BillingPeriodStatus = 'OPEN' | 'CLOSED'
export type WorkOrderStatus =
  'CREATED' | 'ASSIGNED' | 'IN_PROGRESS' | 'INSPECTION' | 'COMPLETED' | 'CANCELLED'
export type ServiceRequestStatus =
  'CREATED' | 'APPROVED' | 'ASSIGNED' | 'IN_PROGRESS' | 'DONE' | 'CLOSED'
export type ServiceRequestPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
export type MaterialApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type WarehouseTxType = 'IN' | 'OUT' | 'ADJUSTMENT'
export type MeterType = 'ELECTRICITY' | 'WATER' | 'GAS' | 'HEAT'
export type MeterReadingStatus = 'SUBMITTED' | 'VERIFIED' | 'REJECTED'
export type NotificationType =
  'APPLICATION' | 'ERI' | 'CONTRACT' | 'INVOICE' | 'SERVICE' | 'MATERIAL' | 'SYSTEM'
export type ExportFormat = 'PDF' | 'XLSX' | 'CSV'
export type BackupStatus = 'READY' | 'VERIFIED' | 'FAILED'

export interface User {
  id: string
  login: string
  fullName: string
  email: string
  phone: string
  role: UserRole
  organizationId: string
  buildingScopes: string[]
  isActive: boolean
  createdAt: string
}

export interface Building {
  id: string
  name: string
  slug: string
  type: BuildingType
  address: string
  district: string
  city: string
  totalArea: number
  floorsCount: number
  publicDescription: string
  gallery: string[]
  isPublished: boolean
  isArchived: boolean
  managedBy: string[]
  createdAt: string
  updatedAt: string
}

export interface Floor {
  id: string
  buildingId: string
  number: number
  area: number
  planFileUrl: string | null
  createdAt: string
}

export interface Unit {
  id: string
  buildingId: string
  floorId: string
  number: string
  roomIds: string[]
  area: number
  usageType: UsageType
  offerType: OfferType
  basePrice: number
  currency: string
  status: UnitStatus
  createdAt: string
  updatedAt: string
}

export interface Room {
  id: string
  unitId: string
  number: string
  area: number
  type: string
}

export interface Listing {
  id: string
  buildingId: string
  unitId: string
  titleUz: string
  titleRu: string
  descriptionUz: string
  descriptionRu: string
  offerType: OfferType
  price: number
  currency: string
  photos: string[]
  virtualTourUrl: string | null
  status: ListingStatus
  viewsCount: number
  createdAt: string
  updatedAt: string
}

export interface Application {
  id: string
  number: string
  listingId: string
  applicantName: string
  applicantPinfl: string
  applicantPhone: string
  applicantEmail: string
  type: ApplicationType
  offeredPrice: number
  currency: string
  notes: string
  status: ApplicationStatus
  submittedAt: string
  createdAt: string
  updatedAt: string
}

export interface Contract {
  id: string
  number: string
  applicationId: string
  type: ApplicationType
  unitId: string
  tenantName: string
  tenantPinfl: string
  startDate: string
  endDate: string
  monthlyRent: number
  currency: string
  deposit: number
  status: ContractStatus
  signedByErI: boolean
  eriDocumentId: string | null
  pdfUrl: string | null
  createdAt: string
}

export interface Invoice {
  id: string
  number: string
  contractId: string
  period: string
  amount: number
  paidAmount: number
  currency: string
  dueDate: string
  status: InvoiceStatus
  pdfUrl: string | null
  createdAt: string
}

export interface Payment {
  id: string
  invoiceId: string
  amount: number
  currency: string
  method: string
  status: PaymentStatus
  transactionId: string
  paidAt: string
}

export interface BillingPeriod {
  id: string
  year: number
  month: number
  status: BillingPeriodStatus
  invoiceCount: number
  totalAmount: number
  generatedAt: string | null
  createdAt: string
  closedAt: string | null
}

export interface ServiceRequest {
  id: string
  number: string
  buildingId: string
  unitId: string | null
  category: string
  description: string
  priority: ServiceRequestPriority
  status: ServiceRequestStatus
  createdBy: string
  assignedTo: string | null
  workOrderId: string | null
  createdAt: string
  updatedAt: string
}

export interface WorkOrder {
  id: string
  number: string
  serviceRequestId: string
  buildingId: string
  unitId: string | null
  contractorId: string
  description: string
  estimatedCost: number
  actualCost: number
  status: WorkOrderStatus
  scheduledDate: string
  completedAt: string | null
  inspectionNotes: string
  photos: string[]
  createdAt: string
  updatedAt: string
}

export interface MaterialRequest {
  id: string
  workOrderId: string
  items: MaterialRequestItem[]
  status: MaterialApprovalStatus
  requestedBy: string
  approvedBy: string | null
  approvedAt: string | null
  rejectedReason: string | null
  createdAt: string
}

export interface MaterialRequestItem {
  id: string
  warehouseItemId: string
  name: string
  quantity: number
  unit: string
  unitPrice: number
}

export interface WarehouseItem {
  id: string
  sku: string
  name: string
  category: string
  unit: string
  stock: number
  minStock: number
  unitPrice: number
  supplierId: string
  createdAt: string
}

export interface WarehouseTransaction {
  id: string
  itemId: string
  type: WarehouseTxType
  quantity: number
  unitPrice: number
  reason: string
  createdBy: string
  createdAt: string
}

export interface Supplier {
  id: string
  name: string
  phone: string
  email: string
  address: string
  contractUrl: string | null
  createdAt: string
}

export interface Meter {
  id: string
  code: string
  type: MeterType
  serialNumber: string
  buildingId: string
  unitId: string | null
  isActive: boolean
  installedAt: string
}

export interface MeterReading {
  id: string
  meterId: string
  readingAt: string
  value: number
  status: MeterReadingStatus
  photoUrl: string | null
  submittedBy: string
  note: string
  createdAt: string
}

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  body: string
  isRead: boolean
  linkUrl: string | null
  createdAt: string
}

export interface ExportRecord {
  id: string
  type: string
  format: ExportFormat
  status: 'PENDING' | 'READY' | 'FAILED'
  fileUrl: string | null
  createdAt: string
}

export interface Backup {
  id: string
  type: 'Full' | 'Incremental'
  size: string
  status: BackupStatus
  createdAt: string
}

export interface ServiceHealth {
  name: string
  status: 'healthy' | 'degraded' | 'down'
  responseTime: number
  uptime: number
}
