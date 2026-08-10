import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Application, Contract, Invoice, Payment, BillingPeriod, AppNotification,
} from '~/types'

export const useFinanceStore = defineStore('finance', () => {
  const applications = ref<Application[]>([])
  const contracts = ref<Contract[]>([])
  const invoices = ref<Invoice[]>([])
  const payments = ref<Payment[]>([])
  const billingPeriods = ref<BillingPeriod[]>([])
  const notifications = ref<AppNotification[]>([])
  const initialized = ref(false)

  function initMockData() {
    if (initialized.value) return
    initialized.value = true

    // 8 applications
    applications.value = [
      { id: 'a1', number: 'APP-2025-001', listingId: 'l1', applicantName: 'Aziz Karimov', applicantPinfl: '12345678901234', applicantPhone: '+998 90 111 22 33', applicantEmail: 'aziz@gmail.com', type: 'RENT', offeredPrice: 8200000, currency: 'UZS', notes: 'Mebel bilan keladi', status: 'FINANCE_REVIEW', submittedAt: '2025-06-05T10:00:00', createdAt: '2025-06-05T10:00:00', updatedAt: '2025-06-05T10:00:00' },
      { id: 'a2', number: 'APP-2025-002', listingId: 'l2', applicantName: 'Dilnoza Yusupova', applicantPinfl: '98765432109876', applicantPhone: '+998 91 222 33 44', applicantEmail: 'dilnoza@gmail.com', type: 'RENT', offeredPrice: 11500000, currency: 'UZS', notes: '', status: 'OFFER_SENT', submittedAt: '2025-06-04T14:00:00', createdAt: '2025-06-04T14:00:00', updatedAt: '2025-06-04T14:00:00' },
      { id: 'a3', number: 'APP-2025-003', listingId: 'l3', applicantName: 'Sardor Rahimov', applicantPinfl: '45678912345678', applicantPhone: '+998 93 333 44 55', applicantEmail: 'sardor@gmail.com', type: 'SALE', offeredPrice: 1820000000, currency: 'UZS', notes: 'Ipoteka orqali', status: 'SUBMITTED', submittedAt: '2025-06-06T09:00:00', createdAt: '2025-06-06T09:00:00', updatedAt: '2025-06-06T09:00:00' },
      { id: 'a4', number: 'APP-2025-004', listingId: 'l4', applicantName: 'Bekzod Toshmatov', applicantPinfl: '32109876543210', applicantPhone: '+998 94 444 55 66', applicantEmail: 'bekzod@gmail.com', type: 'RENT', offeredPrice: 4500000, currency: 'UZS', notes: 'Uzoq muddatga', status: 'CONTRACT_SIGNING', submittedAt: '2025-06-03T11:00:00', createdAt: '2025-06-03T11:00:00', updatedAt: '2025-06-03T11:00:00' },
      { id: 'a5', number: 'APP-2025-005', listingId: 'l5', applicantName: 'Malika Saidova', applicantPinfl: '56789012345678', applicantPhone: '+998 95 555 66 77', applicantEmail: 'malika@gmail.com', type: 'RENT', offeredPrice: 6800000, currency: 'UZS', notes: '', status: 'APPROVED', submittedAt: '2025-06-01T15:00:00', createdAt: '2025-06-01T15:00:00', updatedAt: '2025-06-01T15:00:00' },
      { id: 'a6', number: 'APP-2025-006', listingId: 'l6', applicantName: 'Jasur Ergashev', applicantPinfl: '67890123456789', applicantPhone: '+998 96 666 77 88', applicantEmail: 'jasur@gmail.com', type: 'RENT', offeredPrice: 5200000, currency: 'UZS', notes: 'Korporativ ijara', status: 'SUBMITTED', submittedAt: '2025-06-07T08:00:00', createdAt: '2025-06-07T08:00:00', updatedAt: '2025-06-07T08:00:00' },
      { id: 'a7', number: 'APP-2025-007', listingId: 'l2', applicantName: 'Nodira Abdullaeva', applicantPinfl: '78901234567890', applicantPhone: '+998 97 777 88 99', applicantEmail: 'nodira@gmail.com', type: 'SALE', offeredPrice: 2100000000, currency: 'UZS', notes: 'Naqd to\'lov', status: 'FINANCE_REVIEW', submittedAt: '2025-06-07T12:00:00', createdAt: '2025-06-07T12:00:00', updatedAt: '2025-06-07T12:00:00' },
      { id: 'a8', number: 'APP-2025-008', listingId: 'l1', applicantName: 'Temur Aliev', applicantPinfl: '89012345678901', applicantPhone: '+998 88 888 99 00', applicantEmail: 'temur@gmail.com', type: 'RENT', offeredPrice: 9000000, currency: 'UZS', notes: '', status: 'REJECTED', submittedAt: '2025-05-28T10:00:00', createdAt: '2025-05-28T10:00:00', updatedAt: '2025-05-30T14:00:00' },
    ]

    // 15 contracts
    const tenants = [
      { name: 'Dilnoza Yusupova', rent: 12000000, start: '2025-01-01', end: '2025-12-31', signed: true, status: 'ACTIVE' as const },
      { name: 'Aziz Karimov', rent: 8500000, start: '2025-03-01', end: '2026-02-28', signed: false, status: 'PENDING_SIGN' as const },
      { name: 'Bekzod Toshmatov', rent: 4500000, start: '2025-05-01', end: '2027-04-30', signed: true, status: 'SIGNED' as const },
      { name: 'Old Contract Tenant', rent: 7000000, start: '2024-01-01', end: '2024-12-31', signed: true, status: 'EXPIRED' as const },
      { name: 'Malika Saidova', rent: 6800000, start: '2025-06-01', end: '2026-05-31', signed: true, status: 'ACTIVE' as const },
      { name: 'Rustam Nazarov', rent: 9500000, start: '2025-02-01', end: '2026-01-31', signed: true, status: 'ACTIVE' as const },
      { name: 'Feruza Karimova', rent: 5200000, start: '2025-04-01', end: '2026-03-31', signed: true, status: 'ACTIVE' as const },
      { name: 'Sherzod Yuldashev', rent: 11000000, start: '2025-01-15', end: '2026-01-14', signed: false, status: 'PENDING_SIGN' as const },
      { name: 'Zarina Tursunova', rent: 7800000, start: '2025-03-15', end: '2026-03-14', signed: true, status: 'ACTIVE' as const },
      { name: 'Davron Qodirov', rent: 3200000, start: '2024-06-01', end: '2025-05-31', signed: true, status: 'EXPIRED' as const },
      { name: 'Kamola Rashidova', rent: 6500000, start: '2025-05-01', end: '2026-04-30', signed: true, status: 'ACTIVE' as const },
      { name: 'Anvar Sodiqov', rent: 8900000, start: '2025-02-15', end: '2026-02-14', signed: true, status: 'ACTIVE' as const },
      { name: 'Lola Ahmadova', rent: 4500000, start: '2025-04-01', end: '2025-10-31', signed: false, status: 'PENDING_SIGN' as const },
      { name: 'Bobur Tashkentov', rent: 12000000, start: '2025-01-01', end: '2025-12-31', signed: true, status: 'ACTIVE' as const },
      { name: 'Sevara Nazarova', rent: 5800000, start: '2025-03-01', end: '2026-02-28', signed: true, status: 'ACTIVE' as const },
    ]

    contracts.value = tenants.map((t, i) => ({
      id: `c${i + 1}`,
      number: `CTR-2025-${String(i + 1).padStart(3, '0')}`,
      buildingId: `b${(i % 5) + 1}`,
      unitId: `u${i + 1}`,
      tenantId: `t${i + 1}`,
      tenantName: t.name,
      type: 'RENT' as const,
      monthlyRent: t.rent,
      currency: 'UZS',
      startDate: t.start,
      endDate: t.end,
      depositAmount: t.rent * 2,
      signedByErI: t.signed,
      eriSigningDate: t.signed ? t.start : null,
      eriSigningUrl: t.signed ? `https://eri.uz/contracts/CTR-2025-${String(i+1).padStart(3,'0')}` : null,
      status: t.status,
      createdAt: `${t.start}T00:00:00`,
      updatedAt: `${t.start}T00:00:00`,
    }))

    // 20 invoices
    const invoiceStatuses = ['PAID', 'PAID', 'PAID', 'PAID', 'PENDING', 'PAID', 'PENDING', 'PAID', 'OVERDUE', 'PAID', 'PARTIAL', 'PAID', 'PENDING', 'PAID', 'OVERDUE', 'PAID', 'PENDING', 'PAID', 'PAID', 'PARTIAL'] as const
    invoices.value = Array.from({ length: 20 }, (_, i) => {
      const contract = contracts.value[i % contracts.value.length]
      const status = invoiceStatuses[i]
      const amount = contract.monthlyRent
      const paidAmount = status === 'PAID' ? amount : status === 'PARTIAL' ? Math.floor(amount * 0.5) : 0
      const month = String((i % 12) + 1).padStart(2, '0')
      return {
        id: `inv${i + 1}`,
        number: `INV-2025-${month}-${String(i + 1).padStart(3, '0')}`,
        contractId: contract.id,
        period: `2025-${month}`,
        amount,
        paidAmount,
        currency: 'UZS',
        dueDate: `2025-${month}-15`,
        status,
        createdAt: `2025-${month}-01T00:00:00`,
        updatedAt: `2025-${month}-01T00:00:00`,
      }
    })

    // 18 payments
    const paymentMethods = ['Bank transfer', 'Click', 'Payme', 'Bank transfer', 'Click', 'Payme', 'Bank transfer', 'Click', 'Bank transfer', 'Payme', 'Click', 'Bank transfer', 'Payme', 'Click', 'Bank transfer', 'Payme', 'Click', 'Bank transfer']
    payments.value = Array.from({ length: 18 }, (_, i) => {
      const inv = invoices.value[i % invoices.value.length]
      const amount = inv.paidAmount > 0 ? inv.paidAmount : inv.amount
      const month = String((i % 12) + 1).padStart(2, '0')
      return {
        id: `p${i + 1}`,
        invoiceId: inv.id,
        amount,
        currency: 'UZS',
        method: paymentMethods[i % paymentMethods.length],
        transactionId: `TXN-${Date.now()}-${i}`,
        status: i === 17 ? 'PENDING' : 'COMPLETED' as const,
        paidAt: `2025-${month}-1${i % 9}T12:00:00`,
        createdAt: `2025-${month}-1${i % 9}T12:00:00`,
      }
    })

    // 6 billing periods
    billingPeriods.value = [
      { id: 'bp1', month: 2, year: 2025, status: 'CLOSED', invoiceCount: 12, totalAmount: 89500000, generatedAt: '2025-02-01T00:00:00', closedAt: '2025-02-28T23:59:59', createdAt: '2025-02-01T00:00:00' },
      { id: 'bp2', month: 3, year: 2025, status: 'CLOSED', invoiceCount: 14, totalAmount: 94500000, generatedAt: '2025-03-01T00:00:00', closedAt: '2025-03-31T23:59:59', createdAt: '2025-03-01T00:00:00' },
      { id: 'bp3', month: 4, year: 2025, status: 'CLOSED', invoiceCount: 14, totalAmount: 98200000, generatedAt: '2025-04-01T00:00:00', closedAt: '2025-04-30T23:59:59', createdAt: '2025-04-01T00:00:00' },
      { id: 'bp4', month: 5, year: 2025, status: 'CLOSED', invoiceCount: 15, totalAmount: 103500000, generatedAt: '2025-05-01T00:00:00', closedAt: '2025-05-31T23:59:59', createdAt: '2025-05-01T00:00:00' },
      { id: 'bp5', month: 6, year: 2025, status: 'CLOSED', invoiceCount: 15, totalAmount: 112800000, generatedAt: '2025-06-01T00:00:00', closedAt: '2025-06-30T23:59:59', createdAt: '2025-06-01T00:00:00' },
      { id: 'bp6', month: 7, year: 2025, status: 'OPEN', invoiceCount: 0, totalAmount: 0, generatedAt: '2025-07-01T00:00:00', closedAt: null, createdAt: '2025-07-01T00:00:00' },
    ]

    // 8 notifications
    notifications.value = [
      { id: 'n1', type: 'APPLICATION' as const, title: 'Yangi ariza qabul qilindi', body: 'APP-2025-006 — Jasur Ergashev, ijara', isRead: false, createdAt: '2025-06-07T08:00:00' },
      { id: 'n2', type: 'ERI' as const, title: 'ERI imzo kutilmoqda', body: 'CTR-2025-002 — Aziz Karimov hali imzolamadi', isRead: false, createdAt: '2025-06-06T14:00:00' },
      { id: 'n3', type: 'INVOICE' as const, title: 'Invoys muddati o\'tdi', body: 'INV-2025-05-009 — 4.5 mln so\'m to\'lanmagan', isRead: false, createdAt: '2025-06-05T09:00:00' },
      { id: 'n4', type: 'CONTRACT' as const, title: 'Shartnoma imzolandi', body: 'CTR-2025-003 — Bekzod Toshmatov ERI orqali imzoladi', isRead: true, createdAt: '2025-06-04T16:00:00' },
      { id: 'n5', type: 'APPLICATION' as const, title: 'Ariza tasdiqlandi', body: 'APP-2025-005 — Malika Saidova, ijara', isRead: true, createdAt: '2025-06-01T15:00:00' },
      { id: 'n6', type: 'INVOICE' as const, title: 'To\'lov qabul qilindi', body: 'INV-2025-04-001 — 12 mln so\'m to\'landi', isRead: true, createdAt: '2025-05-15T11:00:00' },
      { id: 'n7', type: 'SYSTEM' as const, title: 'Hisob davri yopildi', body: 'Iyun 2025 davri yakunlandi, 15 invoys', isRead: true, createdAt: '2025-06-30T23:59:00' },
      { id: 'n8', type: 'ERI' as const, title: 'Shartnoma imzolanmagan', body: 'CTR-2025-008 — Lola Ahmadova, 3 kun qoldi', isRead: false, createdAt: '2025-06-07T10:00:00' },
    ]
  }

  const unreadNotifications = computed(() => notifications.value.filter(n => !n.isRead))

  // CRUD methods
  function addContract(data: Partial<Contract>) {
    const id = `c${contracts.value.length + 1}`
    const number = `CTR-2025-${String(contracts.value.length + 1).padStart(3, '0')}`
    contracts.value.unshift({
      id, number,
      buildingId: data.buildingId || 'b1',
      unitId: data.unitId || 'u1',
      tenantId: `t${contracts.value.length + 1}`,
      tenantName: data.tenantName || '',
      type: data.type || 'RENT',
      monthlyRent: data.monthlyRent || 0,
      currency: 'UZS',
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      endDate: data.endDate || '',
      depositAmount: (data.monthlyRent || 0) * 2,
      signedByErI: false,
      eriSigningDate: null,
      eriSigningUrl: null,
      status: 'PENDING_SIGN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  function markNotificationRead(id: string) {
    const n = notifications.value.find(n => n.id === id)
    if (n) n.isRead = true
  }

  function markAllNotificationsRead() {
    notifications.value.forEach(n => n.isRead = true)
  }

  return {
    applications, contracts, invoices, payments, billingPeriods,
    notifications, unreadNotifications, initialized,
    initMockData, addContract, markNotificationRead, markAllNotificationsRead,
  }
})
