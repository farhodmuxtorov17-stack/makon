// MAKON — Create application from public form
import { createClientFromRequest } from "npm:@base44/sdk@0.8.31";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    // Generate application number
    const existing = await base44.asServiceRole.entities.Application.filter({});
    const nextNum = existing.length + 1;
    const year = new Date().getFullYear();
    const number = `APP-${year}-${String(nextNum).padStart(3, '0')}`;

    const application = await base44.asServiceRole.entities.Application.create({
      number,
      applicantName: body.applicantName,
      applicantEmail: body.applicantEmail,
      applicantPhone: body.applicantPhone,
      applicantPinfl: body.applicantPinfl || '',
      type: body.type || 'RENT',
      status: 'NEW',
      offeredPrice: body.offeredPrice || 0,
      currency: body.currency || 'UZS',
      durationMonths: body.durationMonths || 12,
      desiredStartDate: body.desiredStartDate || null,
      notes: body.notes || '',
      listingId: body.listingId || null,
      unitId: body.unitId || null,
    });

    return Response.json({ success: true, application });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
