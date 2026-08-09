// stores/finance.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Application,
  Contract,
  Invoice,
  Payment,
  BillingPeriod,
  AppNotification,
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

    applications.value = [
      {
        id: 'a1',
        number: 'APP-2025-001',
        listingId: 'l1',
        applicantName: 'Aziz Karimov',
        applicantPinfl: '12345678901234',
        applicantPhone: '+998 90 111 22 33',
        applicantEmail: 'aziz@example.uz',
        type: 'RENT',
        offeredPrice: 8200000,
        currency: 'UZS',
        notes: 'Mebel bilan',
        status: 'FINANCE_REVIEW',
        submittedAt: '2025-06-05T10:00:00',
        createdAt: '2025-06-05T10:00:00',
        updatedAt: '2025-06-05T10:00:00',
      },
      {
        id: 'a2',
        number: 'APP-2025-002',
        listingId: 'l2',
        applicantName: 'Dilnoza Yusupova',
        applicantPinfl: '98765432109876',
        applicantPhone: '+998 91 222 33 44',
        applicantEmail: 'dilnoza@example.uz',
        type: 'RENT',
        offeredPrice: 11500000,
        currency: 'UZS',
        notes: '',
        status: 'OFFER_SENT',
        submittedAt: '2025-06-04T14:00:00',
        createdAt: '2025-06-04T14:00:00',
        updatedAt: '2025-06-04T14:00:00',
      },
      {
        id: 'a3',
        number: 'APP-2025-003',
        listingId: 'l3',
        applicantName: 'Sardor Rahimov',
        applicantPinfl: '45678912345678',
        applicantPhone: '+998 93 333 44 55',
        applicantEmail: 'sardor@example.uz',
        type: 'SALE',
        offeredPrice: 1820000000,
        currency: 'UZS',
        notes: 'Ipoteka',
        status: 'SUBMITTED',
        submittedAt: '2025-06-06T09:00:00',
        createdAt: '2025-06-06T09:00:00',
        updatedAt: '2025-06-06T09:00:00',
      },
      {
        id: 'a4',
        number: 'APP-2025-004',
        listingId: 'l4',
        applicantName: 'Bekzod Toshmatov',
        applicantPinfl: '32109876543210',
        applicantPhone: '+998 94 444 55 66',
        applicantEmail: 'bekzod@example.uz',
        type: 'RENT',
        offeredPrice: 4500000,
        currency: 'UZS',
        notes: 'Uzoq muddat',
        status: 'CONTRACT_SIGNING',
        submittedAt: '2025-06-03T11:00:00',
        createdAt: '2025-06-03T11:00:00',
        updatedAt: '2025-06-03T11:00:00',
      },
    ]

    contracts.value = [
      {
        id: 'c1',
        number: 'CTR-2025-001',
        applicationId: 'a2',
        type: 'RENT',
        unitId: 'un2',
        tenantName: 'Dilnoza Yusupova',
        tenantPinfl: '98765432109876',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        monthlyRent: 12000000,
        currency: 'UZS',
        deposit: 12000000,
        status: 'ACTIVE',
        signedByErI: true,
        eriDocumentId: 'eri-doc-001',
        pdfUrl: 'contract-c1.pdf',
        createdAt: '2025-01-05',
      },
      {
        id: 'c2',
        number: 'CTR-2025-002',
        applicationId: 'a1',
        type: 'RENT',
        unitId: 'un1',
        tenantName: 'Aziz Karimov',
        tenantPinfl: '12345678901234',
        startDate: '2025-03-01',
        endDate: '2026-02-28',
        monthlyRent: 8500000,
        currency: 'UZS',
        deposit: 8500000,
        status: 'PENDING_SIGN',
        signedByErI: false,
        eriDocumentId: null,
        pdfUrl: null,
        createdAt: '2025-02-28',
      },
      {
        id: 'c3',
        number: 'CTR-2025-003',
        applicationId: 'a4',
        type: 'RENT',
        unitId: 'un4',
        tenantName: 'Bekzod Toshmatov',
        tenantPinfl: '32109876543210',
        startDate: '2025-05-01',
        endDate: '2027-04-30',
        monthlyRent: 4500000,
        currency: 'UZS',
        deposit: 9000000,
        status: 'SIGNED',
        signedByErI: true,
        eriDocumentId: 'eri-doc-003',
        pdfUrl: 'contract-c3.pdf',
        createdAt: '2025-04-25',
      },
      {
        id: 'c4',
        number: 'CTR-2024-098',
        applicationId: '',
        type: 'RENT',
        unitId: 'un7',
        tenantName: 'Old Contract',
        tenantPinfl: '',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        monthlyRent: 7000000,
        currency: 'UZS',
        deposit: 7000000,
        status: 'EXPIRED',
        signedByErI: true,
        eriDocumentId: 'eri-doc-098',
        pdfUrl: 'contract-c4.pdf',
        createdAt: '2023-12-20',
      },
    ]

    invoices.value = [
      {
        id: 'inv1',
        number: 'INV-2025-06-001',
        contractId: 'c1',
        period: '2025-06',
        amount: 12000000,
        paidAmount: 12000000,
        currency: 'UZS',
        dueDate: '2025-06-10',
        status: 'PAID',
        pdfUrl: 'inv1.pdf',
        createdAt: '2025-06-01',
      },
      {
        id: 'inv2',
        number: 'INV-2025-06-002',
        contractId: 'c3',
        period: '2025-06',
        amount: 4500000,
        paidAmount: 0,
        currency: 'UZS',
        dueDate: '2025-06-10',
        status: 'PENDING',
        pdfUrl: null,
        createdAt: '2025-06-01',
      },
      {
        id: 'inv3',
        number: 'INV-2025-05-003',
        contractId: 'c1',
        period: '2025-05',
        amount: 12000000,
        paidAmount: 12000000,
        currency: 'UZS',
        dueDate: '2025-05-10',
        status: 'PAID',
        pdfUrl: 'inv3.pdf',
        createdAt: '2025-05-01',
      },
      {
        id: 'inv4',
        number: 'INV-2025-04-004',
        contractId: 'c4',
        period: '2025-04',
        amount: 7000000,
        paidAmount: 3500000,
        currency: 'UZS',
        dueDate: '2025-04-10',
        status: 'OVERDUE',
        pdfUrl: null,
        createdAt: '2025-04-01',
      },
      {
        id: 'inv5',
        number: 'INV-2025-06-005',
        contractId: 'c1',
        period: '2025-07',
        amount: 12000000,
        paidAmount: 6000000,
        currency: 'UZS',
        dueDate: '2025-07-10',
        status: 'PARTIAL',
        pdfUrl: null,
        createdAt: '2025-07-01',
      },
    ]

    payments.value = [
      {
        id: 'p1',
        invoiceId: 'inv1',
        amount: 12000000,
        currency: 'UZS',
        method: 'Bank transfer',
        status: 'COMPLETED',
        transactionId: 'txn-001',
        paidAt: '2025-06-05',
      },
      {
        id: 'p2',
        invoiceId: 'inv3',
        amount: 12000000,
        currency: 'UZS',
        method: 'Click',
        status: 'COMPLETED',
        transactionId: 'txn-002',
        paidAt: '2025-05-08',
      },
      {
        id: 'p3',
        invoiceId: 'inv4',
        amount: 3500000,
        currency: 'UZS',
        method: 'Payme',
        status: 'COMPLETED',
        transactionId: 'txn-003',
        paidAt: '2025-04-05',
      },
      {
        id: 'p4',
        invoiceId: 'inv5',
        amount: 6000000,
        currency: 'UZS',
        method: 'Bank transfer',
        status: 'COMPLETED',
        transactionId: 'txn-004',
        paidAt: '2025-07-03',
      },
    ]

    billingPeriods.value = [
      {
        id: 'bp1',
        year: 2025,
        month: 7,
        status: 'OPEN',
        invoiceCount: 3,
        totalAmount: 28500000,
        generatedAt: '2025-07-01T00:00:00',
        createdAt: '2025-07-01T00:00:00',
        closedAt: null,
      },
      {
        id: 'bp2',
        year: 2025,
        month: 6,
        status: 'CLOSED',
        invoiceCount: 4,
        totalAmount: 35500000,
        generatedAt: '2025-06-01T00:00:00',
        createdAt: '2025-06-01T00:00:00',
        closedAt: '2025-07-01T00:00:00',
      },
      {
        id: 'bp3',
        year: 2025,
        month: 5,
        status: 'CLOSED',
        invoiceCount: 4,
        totalAmount: 38500000,
        generatedAt: '2025-05-01T00:00:00',
        createdAt: '2025-05-01T00:00:00',
        closedAt: '2025-06-01T00:00:00',
      },
      {
        id: 'bp4',
        year: 2025,
        month: 4,
        status: 'CLOSED',
        invoiceCount: 5,
        totalAmount: 42500000,
        generatedAt: '2025-04-01T00:00:00',
        createdAt: '2025-04-01T00:00:00',
        closedAt: '2025-05-01T00:00:00',
      },
    ]

    notifications.value = [
      {
        id: 'n1',
        type: 'APPLICATION',
        title: 'Yangi ariza qabul qilindi',
        body: 'APP-2025-003 — Sardor Rahimov (Sotuv)',
        isRead: false,
        linkUrl: '/applications',
        createdAt: '2025-06-06T09:05:00',
      },
      {
        id: 'n2',
        type: 'INVOICE',
        title: "Invoys muddati o'tdi",
        body: "INV-2025-04-004 — 7 000 000 so'm",
        isRead: false,
        linkUrl: '/finance/invoices',
        createdAt: '2025-06-04T08:00:00',
      },
      {
        id: 'n3',
        type: 'ERI',
        title: 'ERI imzolash kerak',
        body: 'CTR-2025-002 — Aziz Karimov shartnomasi',
        isRead: true,
        linkUrl: '/finance/contracts',
        createdAt: '2025-06-03T14:00:00',
      },
      {
        id: 'n4',
        type: 'SERVICE',
        title: "Servis so'rovi yaratildi",
        body: 'SR-005 — Crystal Plaza, santexnika',
        isRead: true,
        linkUrl: '/service',
        createdAt: '2025-06-02T10:30:00',
      },
      {
        id: 'n5',
        type: 'MATERIAL',
        title: "Material so'rovi tasdiqlashni kutmoqda",
        body: 'WO-003 — 5 ta item',
        isRead: false,
        linkUrl: '/service/work-orders',
        createdAt: '2025-06-01T15:00:00',
      },
      {
        id: 'n6',
        type: 'SYSTEM',
        title: 'Tizim yangilandi',
        body: 'MAKON v1.2.0 yangi imkoniyatlar',
        isRead: true,
        linkUrl: null,
        createdAt: '2025-05-30T09:00:00',
      },
    ]
  }

  const unreadNotifications = computed(() => notifications.value.filter((n) => !n.isRead))
  const pendingApplications = computed(() =>
    applications.value.filter((a) => a.status === 'FINANCE_REVIEW')
  )
  const activeContracts = computed(() => contracts.value.filter((c) => c.status === 'ACTIVE'))
  const overdueInvoices = computed(() => invoices.value.filter((i) => i.status === 'OVERDUE'))
  const totalRevenue = computed(() =>
    invoices.value.filter((i) => i.status === 'PAID').reduce((sum, i) => sum + i.paidAmount, 0)
  )

  function markNotificationRead(id: string) {
    const n = notifications.value.find((n) => n.id === id)
    if (n) n.isRead = true
  }

  function markAllNotificationsRead() {
    notifications.value.forEach((n) => (n.isRead = true))
  }

  return {
    applications,
    contracts,
    invoices,
    payments,
    billingPeriods,
    notifications,
    initialized,
    unreadNotifications,
    pendingApplications,
    activeContracts,
    overdueInvoices,
    totalRevenue,
    initMockData,
    markNotificationRead,
    markAllNotificationsRead,
  }
})
