import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';
import { rateLimited, clientIp } from '@/lib/rateLimit';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
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

  const body = await request.json().catch(() => ({}));
  // Hidden "website" field: real visitors leave it empty, bots fill it. Pretend success.
  if (body.website) return NextResponse.json({ success: true });

  const name = clip(body.name, 120);
  const organization = clip(body.organization, 200);
  const email = clip(body.email, 200);
  const phone = clip(body.phone, 40);
  const inquiry_type = clip(body.inquiry_type, 60) || 'General';
  const message = clip(body.message, 4000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please provide your name, a valid email and a message.' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('inquiries').insert({ name, organization, email, phone, inquiry_type, message });
  if (error) return NextResponse.json({ error: 'Could not save your enquiry. Please try again.' }, { status: 500 });

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Precision Life Sciences Website <onboarding@resend.dev>',
      to: process.env.NOTIFY_EMAIL,
      replyTo: email,
      subject: `New Enquiry: ${inquiry_type} — ${name}`.replace(/[\r\n]+/g, ' '),
      html: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Organization:</strong> ${esc(organization) || '—'}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone) || '—'}</p>
        <p><strong>Type:</strong> ${esc(inquiry_type)}</p>
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
