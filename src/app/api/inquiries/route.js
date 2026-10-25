import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';
import { rateLimited, clientIp } from '@/lib/rateLimit';
import { Resend } from 'resend';
import { INFECTIOUS_ASSAYS } from '@/lib/assays';

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clip = (s, n) => String(s ?? '').trim().slice(0, n);

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { data, error } = await supabaseAdmin.from('inquiries').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  if (rateLimited(`enq:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const parsedBody = await request.json().catch(() => ({}));
  const body = parsedBody && typeof parsedBody === 'object' && !Array.isArray(parsedBody) ? parsedBody : {};
  // Hidden "website" field: real visitors leave it empty, bots fill it. Pretend success.
  if (body.website) return NextResponse.json({ success: true });

  const name = clip(body.name, 120);
  const organization = clip(body.organization, 200);
  const email = clip(body.email, 200);
  const phone = clip(body.phone, 40);
  const isSampleRequest = body.request_kind === 'sample-evaluation';
  const inquiry_type = isSampleRequest ? 'General' : clip(body.inquiry_type, 60) || 'General';
  let message = clip(body.message, 4000);

  if (isSampleRequest) {
    const sample = body.sample_request && typeof body.sample_request === 'object' && !Array.isArray(body.sample_request) ? body.sample_request : {};
    const assay = INFECTIOUS_ASSAYS.find((item) => item.slug === sample.assay);
    const formats = { advise: 'Please advise', '24': '24 tests', '48': '48 tests', '96': '96 tests' };
    const fields = {};
    if (!assay && sample.assay !== 'help-me-choose') fields.assay = 'Choose one of the listed assays or select “Help me choose”.';
    if (typeof sample.format !== 'string' || !Object.hasOwn(formats, sample.format)) fields.format = 'Choose one of the listed kit formats.';
    for (const [field, value, max] of [
      ['name', body.name, 120], ['organization', body.organization, 200], ['email', body.email, 200],
      ['location', sample.location, 160], ['research_use', sample.research_use, 800],
    ]) {
      if (typeof value !== 'string' || !value.trim()) fields[field] = 'Please complete this field.';
      else if (value.trim().length > max) fields[field] = `Please use ${max} characters or fewer.`;
    }
    if (!fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = 'Please enter a valid email address.';
    const additionalDetails = typeof body.message === 'string' ? body.message.trim() : '';
    if ((body.message != null && typeof body.message !== 'string') || additionalDetails.length > 1800) fields.message = 'Please use 1800 characters or fewer for additional details.';
    if (sample.research_only !== true) fields.research_only = 'Please confirm the research-use-only acknowledgement.';
    if (Object.keys(fields).length) return NextResponse.json({ error: 'Please check the highlighted request details.', fields }, { status: 400 });

    // Keep the existing inquiry schema and routing; store validated evaluation details in the message.
    message = [
      'SAMPLE / EVALUATION REQUEST — INTEREST ONLY',
      `Assay: ${assay ? `Mugen-Plex ${assay.shortName}` : 'Help me choose'}`,
      `Preferred format: ${formats[sample.format]}`,
      `Location: ${sample.location.trim()}`,
      '', 'Intended research use:', sample.research_use.trim(),
      '', 'Additional details:', additionalDetails || 'None provided.',
      '', 'Research-use-only acknowledgement: Confirmed.',
      'Evaluation is subject to availability and PLS confirmation; no order or shipment is confirmed.',
    ].join('\n');
  }

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please provide your name, a valid email and a message.' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('inquiries').insert({ name, organization, email, phone, inquiry_type, message });
  if (error) return NextResponse.json({ error: 'Could not save your enquiry. Please try again.' }, { status: 500 });

  try {
    if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL) throw new Error('Email notifications are not configured');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const notificationType = isSampleRequest ? 'Sample kit evaluation' : inquiry_type;
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Precision Life Sciences Website <onboarding@resend.dev>',
      to: process.env.NOTIFY_EMAIL,
      replyTo: email,
      subject: `New Enquiry: ${notificationType} — ${name}`.replace(/[\r\n]+/g, ' '),
      html: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Organization:</strong> ${esc(organization) || '—'}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone) || '—'}</p>
        <p><strong>Type:</strong> ${esc(notificationType)}</p>
        <p><strong>Message:</strong></p>
        <p>${esc(message).replace(/\n/g, '<br>')}</p>
      `,
    });
  } catch (emailError) {
    console.error('Email notification failed:', emailError);
  }

  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id, status } = await request.json();
  const { error } = await supabaseAdmin.from('inquiries').update({ status }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await request.json();
  const { error } = await supabaseAdmin.from('inquiries').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
