'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const EMPTY_FORM = { name: '', organization: '', email: '', phone: '', inquiry_type: 'General', message: '', website: '' };

// Arriving from a "Request datasheet / quote" button pre-fills the type and message.
function initialForm(params) {
  const product = (params.get('product') || '').slice(0, 160);
  const presets = {
    datasheet: ['Datasheet Request', `I would like to request the datasheet and instructions for use for: ${product}.`],
    enquire: ['General', `I would like to enquire about: ${product}.`],
    interest: ['General', `I would like to register my interest in: ${product}.`],
    service: ['Laboratory Service Quote', `I would like to request a quote for: ${product}. Please advise on sample requirements, pricing and turnaround time.`],
    project: ['Collaboration / Research', 'I would like to discuss a research project with your molecular biology services team.'],
  };
  const preset = presets[params.get('topic')];
  return preset ? { ...EMPTY_FORM, inquiry_type: preset[0], message: preset[1] } : { ...EMPTY_FORM };
}

export default function EnquiryForm() {
  const params = useSearchParams();
  const [form, setForm] = useState(() => initialForm(params));
  const [status, setStatus] = useState('idle');

  const set = (field, value) => setForm({ ...form, [field]: value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus('sent');
      setForm({ ...EMPTY_FORM });
    } else {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-flu/10 border border-flu rounded-xl p-8 text-center"
      >
        <p className="text-flu font-bold text-lg mb-1">Enquiry Sent</p>
        <p className="text-gray-600 text-sm">Thank you — our team will get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.website}
        onChange={(e) => set('website', e.target.value)}
        className="hidden"
      />
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Full Name *</label>
          <input required value={form.name} onChange={(e) => set('name', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Organization</label>
          <input value={form.organization} onChange={(e) => set('organization', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Email *</label>
          <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
          <input value={form.phone} onChange={(e) => set('phone', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-gray-500 uppercase">Enquiry Type</label>
        <select value={form.inquiry_type} onChange={(e) => set('inquiry_type', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 bg-white">
          <option>General</option>
          <option>Bulk Order / Pricing</option>
          <option>Distributorship</option>
          <option>Datasheet Request</option>
          <option>Technical Support</option>
          <option>Laboratory Service Quote</option>
          <option>Collaboration / Research</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-bold text-gray-500 uppercase">Message *</label>
        <textarea required value={form.message} onChange={(e) => set('message', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 min-h-[100px]" />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-cyan text-white px-8 py-3 rounded-full font-bold hover:opacity-90 disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
      </button>
      {status === 'error' && <p className="text-cchf text-sm">Something went wrong — please try again.</p>}
    </form>
  );
}
