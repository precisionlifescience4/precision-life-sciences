'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EnquiryForm() {
  const [form, setForm] = useState({ name: '', organization: '', email: '', phone: '', inquiry_type: 'General', message: '' });
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
      setForm({ name: '', organization: '', email: '', phone: '', inquiry_type: 'General', message: '' });
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
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Full Name *</label>
          <input required value={form.name} onChange={(e) => set('name', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Organization</label>
          <input value={form.organization} onChange={(e) => set('organization', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Email *</label>
          <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Phone</label>
          <input value={form.phone} onChange={(e) => set('phone', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-gray-400 uppercase">Enquiry Type</label>
        <select value={form.inquiry_type} onChange={(e) => set('inquiry_type', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 bg-white">
          <option>General</option>
          <option>Bulk Order / Pricing</option>
          <option>Distributorship</option>
          <option>Technical Support</option>
          <option>Collaboration / Research</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-bold text-gray-400 uppercase">Message *</label>
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