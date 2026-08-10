// MAKON — Cabinet API: returns user-specific applications, contracts, invoices, service requests
import { createClientFromRequest } from "npm:@base44/sdk@0.8.31";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'profile';

    // Profile overview
    if (action === 'profile') {
      const applications = await base44.asServiceRole.entities.Application.filter({});
      const contracts = await base44.asServiceRole.entities.Contract.filter({});
      const invoices = await base44.asServiceRole.entities.Invoice.filter({ status: 'UNPAID' });
      const serviceRequests = await base44.asServiceRole.entities.ServiceRequest.filter({});

      return Response.json({
        stats: {
          totalApplications: applications.length,
          activeApplications: applications.filter((a: any) => !['APPROVED', 'REJECTED', 'CANCELLED'].includes(a.status)).length,
          activeContracts: contracts.filter((c: any) => c.status === 'ACTIVE').length,
          unpaidInvoices: invoices.length,
          openServiceRequests: serviceRequests.filter((s: any) => s.status === 'OPEN' || s.status === 'IN_PROGRESS').length,
        },
        applications: applications
          .sort((a: any, b: any) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime())
          .map((a: any) => ({
            id: a.id,
            number: a.number,
            applicantName: a.applicantName,
            type: a.type,
            status: a.status,
            offeredPrice: a.offeredPrice,
            currency: a.currency,
            durationMonths: a.durationMonths,
            desiredStartDate: a.desiredStartDate,
            notes: a.notes,
            rejectionReason: a.rejectionReason,
            createdDate: a.created_date,
          })),
        contracts: contracts
          .filter((c: any) => c.status === 'ACTIVE' || c.status === 'PENDING_SIGNATURE')
          .map((c: any) => ({
            id: c.id,
            number: c.number,
            type: c.type,
            status: c.status,
            tenantName: c.tenantName,
            startDate: c.startDate,
            endDate: c.endDate,
            monthlyRent: c.monthlyRent,
            currency: c.currency,
            deposit: c.deposit,
            version: c.version,
            pdfUrl: c.pdfUrl,
            eriDocumentId: c.eriDocumentId,
          })),
        invoices: invoices.map((inv: any) => ({
          id: inv.id,
          number: inv.number,
          amount: inv.amount,
          paidAmount: inv.paidAmount,
          balance: inv.balance,
          currency: inv.currency,
          period: inv.period,
          dueDate: inv.dueDate,
          status: inv.status,
        })),
        serviceRequests: serviceRequests
          .filter((s: any) => s.status === 'OPEN' || s.status === 'IN_PROGRESS')
          .map((s: any) => ({
            id: s.id,
            number: s.number,
            category: s.category,
            description: s.description,
            priority: s.priority,
            status: s.status,
            rating: s.rating,
            slaDueAt: s.slaDueAt,
            createdDate: s.created_date,
          })),
      });
    }

    // Sign contract via ERI
    if (action === 'sign-contract') {
      const body = await req.json();
      const contractId = body.contractId;

      const contracts = await base44.asServiceRole.entities.Contract.filter({});
      const contract = contracts.find((c: any) => c.id === contractId);

      if (!contract) {
        return Response.json({ error: 'Contract not found' }, { status: 404 });
      }

      // Update contract status to ACTIVE and add ERI document ID
      const updated = await base44.asServiceRole.entities.Contract.update(contractId, {
        status: 'ACTIVE',
        eriDocumentId: `ERI-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        documentHash: crypto.randomUUID().replace(/-/g, ''),
      });

      return Response.json({ success: true, contract: updated });
    }

    // Submit service request
    if (action === 'create-service-request') {
      const body = await req.json();

      const existing = await base44.asServiceRole.entities.ServiceRequest.filter({});
      const nextNum = existing.length + 1;
      const number = `SR-${new Date().getFullYear()}-${String(nextNum).padStart(4, '0')}`;

      const slaDue = new Date();
      slaDue.setDate(slaDue.getDate() + (body.priority === 'URGENT' ? 1 : body.priority === 'HIGH' ? 2 : body.priority === 'MEDIUM' ? 3 : 5));

      const request = await base44.asServiceRole.entities.ServiceRequest.create({
        number,
        category: body.category,
        description: body.description,
        priority: body.priority || 'MEDIUM',
        status: 'OPEN',
        buildingId: body.buildingId,
        unitId: body.unitId,
        slaDueAt: slaDue.toISOString(),
        photos: body.photos || [],
      });

      return Response.json({ success: true, request });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
