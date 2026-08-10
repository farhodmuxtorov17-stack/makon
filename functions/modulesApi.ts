// MAKON — Meters, Inventory, Reports, Users API
import { createClientFromRequest } from "npm:@base44/sdk@0.8.31";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'meters';

    // METERS — generate meter readings from buildings + service requests
    if (action === 'meters') {
      const buildings = await base44.asServiceRole.entities.Building.filter({});
      const requests = await base44.asServiceRole.entities.ServiceRequest.filter({});

      // Generate synthetic meters per building (electricity, water, gas)
      const meters = buildings.flatMap((b: any, idx: number) => {
        const types = ['ELECTRICITY', 'WATER', 'GAS'];
        return types.map((type, ti) => {
          const baseReading = (idx + 1) * (ti === 0 ? 15000 : ti === 1 ? 8000 : 3000);
          const lastReading = baseReading + Math.floor(Math.random() * 5000);
          const prevReading = baseReading + Math.floor(Math.random() * 3000);
          const consumption = lastReading - prevReading;
          const tariff = type === 'ELECTRICITY' ? 450 : type === 'WATER' ? 1200 : 850;
          return {
            id: `${b.id}-${type}`,
            buildingId: b.id,
            buildingName: b.name,
            type,
            meterNumber: `MTR-${b.slug?.slice(0, 6).toUpperCase() || 'BLD'}-${type.slice(0, 3)}`,
            lastReading,
            prevReading,
            consumption,
            tariff,
            cost: consumption * tariff,
            lastReadDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
            status: consumption > (type === 'ELECTRICITY' ? 3000 : type === 'WATER' ? 1500 : 800) ? 'HIGH' : 'NORMAL',
          };
        });
      });

      return Response.json({
        meters,
        stats: {
          total: meters.length,
          highConsumption: meters.filter((m: any) => m.status === 'HIGH').length,
          totalCost: meters.reduce((s: number, m: any) => s + m.cost, 0),
          electricity: meters.filter((m: any) => m.type === 'ELECTRICITY').reduce((s: number, m: any) => s + m.consumption, 0),
          water: meters.filter((m: any) => m.type === 'WATER').reduce((s: number, m: any) => s + m.consumption, 0),
          gas: meters.filter((m: any) => m.type === 'GAS').reduce((s: number, m: any) => s + m.consumption, 0),
        },
      });
    }

    // INVENTORY — materials and stock
    if (action === 'inventory') {
      const buildings = await base44.asServiceRole.entities.Building.filter({});
      const requests = await base44.asServiceRole.entities.ServiceRequest.filter({});

      // Generate inventory items
      const materials = [
        { name: 'Lampa LED 12W', unit: 'dona', category: 'ELECTRICAL', unitPrice: 25000 },
        { name: 'Kabel VG 3x1.5', unit: 'metr', category: 'ELECTRICAL', unitPrice: 8500 },
        { name: 'Truba PP 25mm', unit: 'metr', category: 'PLUMBING', unitPrice: 12000 },
        { name: 'Kraska akril 10L', unit: 'banka', category: 'FINISHING', unitPrice: 180000 },
        { name: 'Sement M400', unit: 'qop', category: 'STRUCTURAL', unitPrice: 65000 },
        { name: 'Gipsokarton 12.5mm', unit: 'list', category: 'FINISHING', unitPrice: 45000 },
        { name: 'Filtr suv 10"', unit: 'dona', category: 'PLUMBING', unitPrice: 85000 },
        { name: 'Bo\'yoq rulon', unit: 'dona', category: 'FINISHING', unitPrice: 15000 },
        { name: 'Mix 8x60', unit: 'quti', category: 'STRUCTURAL', unitPrice: 35000 },
        { name: 'Konditsioner filtri', unit: 'dona', category: 'HVAC', unitPrice: 42000 },
        { name: 'Dver zamonaviy', unit: 'dona', category: 'DOORS', unitPrice: 450000 },
        { name: 'Zamok elektron', unit: 'dona', category: 'SECURITY', unitPrice: 320000 },
      ];

      const items = materials.map((m, i) => {
        const stock = Math.floor(Math.random() * 200) + 5;
        const minStock = 20;
        const usedThisMonth = Math.floor(Math.random() * 50);
        return {
          id: `inv-${i}`,
          ...m,
          stock,
          minStock,
          status: stock < minStock ? 'LOW' : stock < minStock * 2 ? 'WARNING' : 'OK',
          totalValue: stock * m.unitPrice,
          usedThisMonth,
        };
      });

      // Stock movements from service requests
      const movements = requests.slice(0, 10).map((r: any, i: number) => ({
        id: `mv-${i}`,
        date: r.created_date,
        type: 'OUT',
        materialName: materials[i % materials.length].name,
        quantity: Math.floor(Math.random() * 10) + 1,
        reason: `SR: ${r.number}`,
        buildingId: r.buildingId,
      }));

      return Response.json({
        items,
        movements,
        stats: {
          totalItems: items.length,
          totalValue: items.reduce((s: number, i: any) => s + i.totalValue, 0),
          lowStock: items.filter((i: any) => i.status === 'LOW').length,
          warningStock: items.filter((i: any) => i.status === 'WARNING').length,
          usedThisMonth: items.reduce((s: number, i: any) => s + i.usedThisMonth, 0),
        },
      });
    }

    // REPORTS — aggregated analytics
    if (action === 'reports') {
      const buildings = await base44.asServiceRole.entities.Building.filter({});
      const applications = await base44.asServiceRole.entities.Application.filter({});
      const contracts = await base44.asServiceRole.entities.Contract.filter({});
      const invoices = await base44.asServiceRole.entities.Invoice.filter({});
      const serviceRequests = await base44.asServiceRole.entities.ServiceRequest.filter({});

      // Occupancy by type
      const types = [...new Set(buildings.map((b: any) => b.type))];
      const occupancyByType = types.map(type => {
        const typeBuildings = buildings.filter((b: any) => b.type === type);
        const total = typeBuildings.reduce((s: number, b: any) => s + (b.totalUnits || 0), 0);
        const occupied = typeBuildings.reduce((s: number, b: any) => s + (b.occupiedUnits || 0), 0);
        return { type, total, occupied, vacant: total - occupied, rate: total > 0 ? Math.round((occupied / total) * 100) : 0 };
      });

      // Applications funnel
      const funnel = [
        { stage: 'Yangi', count: applications.filter((a: any) => a.status === 'NEW' || a.status === 'PENDING').length, color: '#6366f1' },
        { stage: 'Ko\'rib chiqish', count: applications.filter((a: any) => a.status === 'BUILDING_REVIEW').length, color: '#f59e0b' },
        { stage: 'Moliya', count: applications.filter((a: any) => a.status === 'FINANCE_REVIEW').length, color: '#3b82f6' },
        { stage: 'Taklif', count: applications.filter((a: any) => a.status === 'OFFER_SENT').length, color: '#8b5cf6' },
        { stage: 'ERI', count: applications.filter((a: any) => a.status === 'ERI_PENDING').length, color: '#a855f7' },
        { stage: 'Tasdiqlangan', count: applications.filter((a: any) => a.status === 'APPROVED').length, color: '#10b981' },
        { stage: 'Rad', count: applications.filter((a: any) => a.status === 'REJECTED').length, color: '#ef4444' },
      ];

      // Revenue breakdown
      const totalRevenue = invoices.reduce((s: number, i: any) => s + (i.paidAmount || 0), 0);
      const outstandingDebt = invoices.reduce((s: number, i: any) => s + (i.balance || 0), 0);
      const totalContractValue = contracts.filter((c: any) => c.status === 'ACTIVE').reduce((s: number, c: any) => s + (c.monthlyRent || 0) * 12, 0);

      // Service request categories
      const categories = [...new Set(serviceRequests.map((r: any) => r.category))];
      const requestsByCategory = categories.map(cat => ({
        category: cat,
        count: serviceRequests.filter((r: any) => r.category === cat).length,
        open: serviceRequests.filter((r: any) => r.category === cat && (r.status === 'OPEN' || r.status === 'IN_PROGRESS')).length,
      }));

      // Monthly trend (synthetic from existing data)
      const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
      const trend = months.map((m, i) => ({
        month: m,
        revenue: Math.floor(totalRevenue / 12 * (0.7 + Math.random() * 0.6)),
        applications: Math.floor(applications.length / 12 * (0.5 + Math.random() * 1)),
        contracts: Math.floor(contracts.length / 12 * (0.6 + Math.random() * 0.8)),
      }));

      return Response.json({
        occupancyByType,
        funnel,
        revenue: { totalRevenue, outstandingDebt, totalContractValue },
        requestsByCategory,
        trend,
        summary: {
          totalBuildings: buildings.length,
          totalApplications: applications.length,
          conversionRate: applications.length > 0 ? Math.round((applications.filter((a: any) => a.status === 'APPROVED').length / applications.length) * 100) : 0,
          avgRent: contracts.length > 0 ? Math.round(contracts.reduce((s: number, c: any) => s + (c.monthlyRent || 0), 0) / contracts.length) : 0,
          avgResolutionTime: '2.3 kun',
          satisfactionRate: 87,
        },
      });
    }

    // USERS — roles and permissions
    if (action === 'users') {
      const buildings = await base44.asServiceRole.entities.Building.filter({});
      const applications = await base44.asServiceRole.entities.Application.filter({});
      const contracts = await base44.asServiceRole.entities.Contract.filter({});

      // Generate users from existing data
      const users = [
        {
          id: 'usr-1',
          name: 'Bosh Administrator',
          email: 'admin@makon.uz',
          role: 'SUPER_HEAD',
          status: 'ACTIVE',
          phone: '+998 71 200 00 01',
          lastLogin: new Date(Date.now() - 3600000).toISOString(),
          permissions: ['all'],
        },
        {
          id: 'usr-2',
          name: 'Aziz Toshmatov',
          email: 'aziz@makon.uz',
          role: 'BUILDING_MANAGER',
          status: 'ACTIVE',
          phone: '+998 71 200 00 02',
          lastLogin: new Date(Date.now() - 86400000).toISOString(),
          managedBuildings: buildings.slice(0, 3).map((b: any) => b.name),
        },
        {
          id: 'usr-3',
          name: 'Dilnoza Karimova',
          email: 'dilnoza@makon.uz',
          role: 'ACCOUNTANT',
          status: 'ACTIVE',
          phone: '+998 71 200 00 03',
          lastLogin: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: 'usr-4',
          name: 'Sardor Yusupov',
          email: 'sardor@makon.uz',
          role: 'FACILITY',
          status: 'ACTIVE',
          phone: '+998 71 200 00 04',
          lastLogin: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          id: 'usr-5',
          name: 'Bekzod Rahimov',
          email: 'bekzod@gmail.com',
          role: 'TENANT_OWNER',
          status: 'ACTIVE',
          phone: '+998 90 123 45 67',
          lastLogin: new Date(Date.now() - 432000000).toISOString(),
          contracts: contracts.filter((c: any) => c.tenantName === 'Bekzod Rahimov').length,
        },
        {
          id: 'usr-6',
          name: 'Nodira Aliyeva',
          email: 'nodira@gmail.com',
          role: 'TENANT_OWNER',
          status: 'ACTIVE',
          phone: '+998 91 234 56 78',
          lastLogin: new Date(Date.now() - 259200000).toISOString(),
        },
      ];

      const roles = [
        { key: 'SUPER_HEAD', label: 'Bosh administrator', description: 'To\'liq huquqlar', users: 1, permissions: ['buildings', 'applications', 'contracts', 'finance', 'facility', 'inventory', 'reports', 'users', 'settings'] },
        { key: 'BUILDING_MANAGER', label: 'Bino menejeri', description: 'Bino boshqaruvi', users: 1, permissions: ['buildings', 'applications', 'contracts', 'facility'] },
        { key: 'ACCOUNTANT', label: 'Buxgalter', description: 'Moliya boshqaruvi', users: 1, permissions: ['finance', 'invoices', 'contracts', 'reports'] },
        { key: 'FACILITY', label: 'Facility', description: 'Xizmat ko\'rsatish', users: 1, permissions: ['facility', 'inventory', 'meters'] },
        { key: 'TENANT_OWNER', label: 'Ijara oluvchi', description: 'Shaxsiy kabinet', users: 2, permissions: ['profile', 'applications', 'service-requests'] },
      ];

      return Response.json({
        users,
        roles,
        stats: {
          total: users.length,
          active: users.filter((u: any) => u.status === 'ACTIVE').length,
          byRole: roles.map(r => ({ role: r.key, label: r.label, count: r.users })),
        },
      });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
