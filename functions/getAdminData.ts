// MAKON Admin API — returns all entity data for authenticated admin users
// Supports: action param to get specific entity data

import { createClientFromRequest } from "npm:@base44/sdk@0.8.31";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'dashboard';

    // Dashboard summary
    if (action === 'dashboard') {
      const buildings = await base44.asServiceRole.entities.Building.filter({});
      const listings = await base44.asServiceRole.entities.Listing.filter({});
      const applications = await base44.asServiceRole.entities.Application.filter({});
      const contracts = await base44.asServiceRole.entities.Contract.filter({});
      const invoices = await base44.asServiceRole.entities.Invoice.filter({});
      const serviceRequests = await base44.asServiceRole.entities.ServiceRequest.filter({});

      const totalUnits = buildings.reduce((s: number, b: any) => s + (b.totalUnits || 0), 0);
      const vacantUnits = buildings.reduce((s: number, b: any) => s + (b.vacantUnits || 0), 0);
      const occupiedUnits = buildings.reduce((s: number, b: any) => s + (b.occupiedUnits || 0), 0);

      const pendingApps = applications.filter((a: any) => a.status === 'PENDING' || a.status === 'NEW');
      const unpaidInvoices = invoices.filter((i: any) => i.status === 'UNPAID' || i.status === 'PARTIALLY_PAID');
      const openServiceRequests = serviceRequests.filter((s: any) => s.status === 'OPEN' || s.status === 'IN_PROGRESS');

      return Response.json({
        stats: {
          totalBuildings: buildings.length,
          totalUnits,
          vacantUnits,
          occupiedUnits,
          occupancyRate: totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0,
          activeListings: listings.filter((l: any) => l.status === 'PUBLISHED').length,
          pendingApplications: pendingApps.length,
          totalApplications: applications.length,
          activeContracts: contracts.filter((c: any) => c.status === 'ACTIVE').length,
          totalContracts: contracts.length,
          unpaidInvoices: unpaidInvoices.length,
          totalRevenue: invoices.reduce((s: number, i: any) => s + (i.paidAmount || 0), 0),
          outstandingDebt: invoices.reduce((s: number, i: any) => s + (i.balance || 0), 0),
          openServiceRequests: openServiceRequests.length,
          totalServiceRequests: serviceRequests.length,
        },
        recentApplications: applications
          .sort((a: any, b: any) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime())
          .slice(0, 5)
          .map((a: any) => ({
            id: a.id,
            number: a.number,
            applicantName: a.applicantName,
            type: a.type,
            status: a.status,
            offeredPrice: a.offeredPrice,
            currency: a.currency,
            createdDate: a.created_date,
          })),
        buildings: buildings.map((b: any) => ({
          id: b.id,
          name: b.name,
          type: b.type,
          address: b.address,
          totalUnits: b.totalUnits,
          occupiedUnits: b.occupiedUnits,
          vacantUnits: b.vacantUnits,
          occupancyRate: b.totalUnits > 0 ? Math.round((b.occupiedUnits / b.totalUnits) * 100) : 0,
        })),
      });
    }

    // Buildings list (admin — all buildings including archived)
    if (action === 'buildings') {
      const buildings = await base44.asServiceRole.entities.Building.filter({});
      return Response.json({
        buildings: buildings.map((b: any) => ({
          id: b.id,
          name: b.name,
          slug: b.slug,
          type: b.type,
          address: b.address,
          city: b.city,
          district: b.district,
          floorsCount: b.floorsCount,
          totalUnits: b.totalUnits,
          occupiedUnits: b.occupiedUnits,
          vacantUnits: b.vacantUnits,
          totalArea: b.totalArea,
          isPublished: b.isPublished,
          isArchived: b.isArchived,
          managedBy: b.managedBy,
          createdDate: b.created_date,
          updatedDate: b.updated_date,
        })),
      });
    }

    // Applications list
    if (action === 'applications') {
      const applications = await base44.asServiceRole.entities.Application.filter({});
      return Response.json({
        applications: applications.map((a: any) => ({
          id: a.id,
          number: a.number,
          applicantName: a.applicantName,
          applicantEmail: a.applicantEmail,
          applicantPhone: a.applicantPhone,
          applicantPinfl: a.applicantPinfl,
          type: a.type,
          status: a.status,
          offeredPrice: a.offeredPrice,
          currency: a.currency,
          durationMonths: a.durationMonths,
          desiredStartDate: a.desiredStartDate,
          notes: a.notes,
          rejectionReason: a.rejectionReason,
          listingId: a.listingId,
          unitId: a.unitId,
          organizationId: a.organizationId,
          createdDate: a.created_date,
        })),
      });
    }

    // Invoices list
    if (action === 'invoices') {
      const invoices = await base44.asServiceRole.entities.Invoice.filter({});
      const contracts = await base44.asServiceRole.entities.Contract.filter({});
      return Response.json({
        invoices: invoices.map((inv: any) => {
          const contract = contracts.find((c: any) => c.id === inv.contractId);
          return {
            id: inv.id,
            number: inv.number,
            contractId: inv.contractId,
            contractNumber: contract?.number || '—',
            tenantName: contract?.tenantName || '—',
            amount: inv.amount,
            paidAmount: inv.paidAmount,
            balance: inv.balance,
            currency: inv.currency,
            period: inv.period,
            dueDate: inv.dueDate,
            status: inv.status,
            createdDate: inv.created_date,
          };
        }),
      });
    }

    // Service requests
    if (action === 'service-requests') {
      const requests = await base44.asServiceRole.entities.ServiceRequest.filter({});
      const buildings = await base44.asServiceRole.entities.Building.filter({});
      return Response.json({
        requests: requests.map((r: any) => {
          const building = buildings.find((b: any) => b.id === r.buildingId);
          return {
            id: r.id,
            number: r.number,
            category: r.category,
            description: r.description,
            priority: r.priority,
            status: r.status,
            rating: r.rating,
            assignedTo: r.assignedTo,
            buildingName: building?.name || '—',
            buildingId: r.buildingId,
            unitId: r.unitId,
            slaDueAt: r.slaDueAt,
            workOrderId: r.workOrderId,
            photos: r.photos || [],
            createdDate: r.created_date,
          };
        }),
      });
    }

    // Contracts
    if (action === 'contracts') {
      const contracts = await base44.asServiceRole.entities.Contract.filter({});
      return Response.json({
        contracts: contracts.map((c: any) => ({
          id: c.id,
          number: c.number,
          type: c.type,
          status: c.status,
          tenantName: c.tenantName,
          tenantTin: c.tenantTin,
          unitId: c.unitId,
          startDate: c.startDate,
          endDate: c.endDate,
          monthlyRent: c.monthlyRent,
          currency: c.currency,
          deposit: c.deposit,
          version: c.version,
          pdfUrl: c.pdfUrl,
          applicationId: c.applicationId,
          createdDate: c.created_date,
        })),
      });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
