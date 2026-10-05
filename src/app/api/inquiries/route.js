import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const { name, organization, email, phone, inquiry_type, message } = body;

  const { error } = await supabase.from('inquiries').insert({ name, organization, email, phone, inquiry_type, message });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  try {
    await resend.emails.send({
      from: 'Precision Life Sciences Website <onboarding@resend.dev>',
      to: process.env.NOTIFY_EMAIL,
      subject: `New Enquiry: ${inquiry_type} — ${name}`,
      html: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Organization:</strong> ${organization || '—'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '—'}</p>
        <p><strong>Type:</strong> ${inquiry_type}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
  } catch (emailError) {
    console.error('Email notification failed:', emailError);
  }

  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  const { id, status } = await request.json();
  const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  const { id } = await request.json();
  const { error } = await supabase.from('inquiries').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}