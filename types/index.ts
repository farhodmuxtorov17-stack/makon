// types/index.ts — MAKON Functional Technical Specification v2

// === ROLES ===
export type UserRole =
  | 'SUPER_HEAD'
  | 'BUILDING_MANAGER'
  | 'ACCOUNTANT'
  | 'FACILITY'
  | 'TENANT_OWNER'

// === BUILDING / PROPERTY ===
export type BuildingType =
  | 'BUSINESS_CENTER'
  | 'OFFICE'
  | 'SHOPPING'
  | 'WAREHOUSE'
  | 'RESIDENTIAL'
  | 'MIXED'

export type UsageType =
  | 'OFFICE'
  | 'RETAIL'
  | 'WAREHOUSE'
  | 'RESIDENTIAL'
  | 'PARKING'
  | 'MIXED'

export type OfferType = 'RENT' | 'SALE' | 'BOTH'

// === UNIT STATUS (Spec Table 5) ===
export type UnitStatus =
  | 'DRAFT'
  | 'VACANT'
  | 'APPLICATION_IN_REVIEW'
  | 'RESERVED'
  | 'RENTED'
  | 'SOLD'
  | 'MAINTENANCE'
  | 'HIDDEN'
  | 'ARCHIVED'

// === LISTING STATUS (Spec Table 5) ===
export type ListingStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'PAUSED'
  | 'ARCHIVED'

// === APPLICATION STATUS (Spec Table 5) ===
export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'BUILDING_REVIEW'
  | 'FINANCE_REVIEW'
  | 'OFFER_SENT'
  | 'OFFER_ACCEPTED'
  | 'DOCUMENTS'
  | 'ERI_PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'COMPLETED'

export type ApplicationType = 'RENT' | 'SALE'

// === CONTRACT STATUS (Spec Table 5) ===
export type ContractStatus =
  | 'DRAFT'
  | 'REVIEW'
  | 'ERI_PENDING'
  | 'SIGNED'
  | 'ACTIVE'
  | 'EXPIRED'
  | 'TERMINATED'
  | 'COMPLETED'

// === INVOICE STATUS (Spec Table 5) ===
export type InvoiceStatus =
  | 'DRAFT'
  | 'ISSUED'
  | 'PARTIALLY_PAID'
  | 'PAID'
  | 'OVERDUE'
  | 'CANCELLED'

// === SERVICE REQUEST STATUS (Spec Table 5) ===
export type ServiceRequestStatus =
  | 'NEW'
  | 'TRIAGE'
  | 'ASSIGNED'
  | 'INSPECTION'
  | 'MATERIAL_PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'TENANT_CONFIRMATION'
  | 'CLOSED'
  | 'RETURNED'
  | 'REJECTED'

export type ServiceRequestPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

// === MATERIAL REQUEST STATUS (Spec Table 5) ===
export type MaterialRequestStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'APPROVED'
  | 'REJECTED'
  | 'ISSUED'
  | 'CANCELLED'

// === ERI STATUS (Spec Table 5) ===
export type EriStatus =
  | 'CREATED'
  | 'SENT'
  | 'PENDING'
  | 'SIGNED'
  | 'REJECTED'
  | 'ERROR'

// === WORK ORDER STATUS ===
export type WorkOrderStatus =
  | 'CREATED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'INSPECTION'
  | 'COMPLETED'
  | 'CANCELLED'

// === MISC ===
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
export type BillingPeriodStatus = 'OPEN' | 'CLOSED'
export type MeterType = 'ELECTRICITY' | 'WATER' | 'GAS' | 'HEAT'
export type MeterReadingStatus = 'SUBMITTED' | 'VERIFIED' | 'REJECTED'
export type WarehouseTxType = 'IN' | 'OUT' | 'ADJUSTMENT'
export type NotificationType =
  | 'APPLICATION'
  | 'ERI'
  | 'CONTRACT'
  | 'INVOICE'
  | 'SERVICE'
  | 'MATERIAL'
  | 'SYSTEM'
export type ExportFormat = 'PDF' | 'XLSX' | 'CSV'
export type BackupStatus = 'READY' | 'VERIFIED' | 'FAILED'

// === INTERFACES ===
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
  lastLoginAt: string | null
  createdAt: string
}

export interface Organization {
  id: string
  name: string
  tin: string  // STIR
  legalAddress: string
  phone: string
  email: string
  eriCertificateId: string | null
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
  totalUnits: number
  vacantUnits: number
  occupiedUnits: number
  publicDescription: string
  gallery: string[]
  model3dUrl: string | null
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
  planVersion: string | null
  planFileUrl: string | null
  planSvgUrl: string | null
  createdAt: string
}

export interface Room {
  id: string
  floorId: string
  number: string
  area: number
  type: string
  unitId: string | null
  polygon: number[][] | null  // normalized 0..1
}

export interface Unit {
  id: string
  buildingId: string
  floorId: string
  roomIds: string[]
  number: string
  area: number
  usageType: UsageType
  offerType: OfferType
  basePrice: number
  monthlyRent: number
  currency: string
  status: UnitStatus
  amenities: string[]
  photos: string[]
  createdAt: string
  updatedAt: string
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
  unitId: string
  organizationId: string
  applicantName: string
  applicantPinfl: string
  applicantPhone: string
  applicantEmail: string
  type: ApplicationType
  offeredPrice: number
  currency: string
  desiredStartDate: string
  durationMonths: number | null
  notes: string
  status: ApplicationStatus
  rejectionReason: string | null
  submittedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface Contract {
  id: string
  number: string
  applicationId: string
  type: ApplicationType
  unitId: string
  organizationId: string
  tenantName: string
  tenantTin: string
  startDate: string
  endDate: string | null
  monthlyRent: number
  currency: string
  deposit: number
  status: ContractStatus
  documentHash: string | null
  eriDocumentId: string | null
  pdfUrl: string | null
  version: number
  createdAt: string
  updatedAt: string
}

export interface EriSignature {
  id: string
  contractId: string
  documentId: string
  signerRole: string
  signerName: string
  status: EriStatus
  certificateInfo: string | null
  signedAt: string | null
  error: string | null
  retryCount: number
  createdAt: string
}

export interface Invoice {
  id: string
  number: string
  contractId: string
  organizationId: string
  period: string
  amount: number
  paidAmount: number
  balance: number
  currency: string
  dueDate: string
  status: InvoiceStatus
  lines: InvoiceLine[]
  pdfUrl: string | null
  createdAt: string
}

export interface InvoiceLine {
  id: string
  description: string
  amount: number
}

export interface Payment {
  id: string
  invoiceId: string
  amount: number
  currency: string
  method: string
  documentUrl: string | null
  status: PaymentStatus
  paidAt: string
  createdBy: string
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

export interface Debt {
  id: string
  invoiceId: string
  organizationName: string
  unitNumber: string
  buildingName: string
  amount: number
  daysOverdue: number
  bucket: '0-30' | '31-60' | '61-90' | '90+'
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
  slaDueAt: string
  photos: string[]
  rating: number | null
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
  beforePhotos: string[]
  afterPhotos: string[]
  createdAt: string
  updatedAt: string
}

export interface MaterialRequest {
  id: string
  number: string
  workOrderId: string
  items: MaterialRequestItem[]
  status: MaterialRequestStatus
  requestedBy: string
  approvedBy: string | null
  approvedAt: string | null
  rejectedReason: string | null
  totalValue: number
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
  buildingId: string
  supplierId: string | null
  createdAt: string
}

export interface StockIssue {
  id: string
  number: string
  materialRequestId: string
  warehouseItemId: string
  quantity: number
  issuedTo: string
  issuedBy: string
  actUrl: string | null
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
  floorId: string | null
  unitId: string | null
  location: string
  isActive: boolean
  installedAt: string
  nextVerificationAt: string | null
}

export interface MeterReading {
  id: string
  meterId: string
  readingAt: string
  value: number
  previousValue: number
  consumption: number
  status: MeterReadingStatus
  photoUrl: string | null
  note: string
  submittedBy: string
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

export interface AuditLog {
  id: string
  action: string
  entity: string
  entityId: string
  userId: string
  userName: string
  details: string
  traceId: string
  ip: string
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

// === API RESPONSE ===
export interface ApiResponse<T> {
  data: T
  meta?: {
    page?: number
    pageSize?: number
    total?: number
    traceId?: string
  }
}

export interface ApiError {
  error: {
    code: string
    message: string
    details?: Record<string, unknown>
    traceId?: string
  }
}
