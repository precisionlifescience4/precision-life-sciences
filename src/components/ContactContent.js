'use client';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EnquiryForm from '@/components/EnquiryForm';

export default function ContactContent() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings).catch(() => setSettings({}));
  }, []);

  const embedUrl = settings?.address
    ? `https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`
    : null;

  const publicDomainEmail = settings?.email?.toLowerCase().endsWith('@precisionlifesciences.com.pk')
    ? settings.email
    : null;

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 text-center text-4xl font-extrabold text-navy md:text-5xl"
      >
        Tell us what your laboratory needs.
      </motion.h1>
      <p className="mx-auto mb-7 max-w-2xl text-center leading-relaxed text-gray-600">
        Request product information, ask for a commercial laboratory-service quote or start a research collaboration. We usually reply within one working day.
      </p>
      <div className="mx-auto mb-12 flex max-w-2xl flex-wrap justify-center gap-2 text-xs font-semibold text-navy">
        {['Product information', 'Laboratory-service quotes', 'Technical support', 'Research collaboration'].map((item) => (
          <span key={item} className="rounded-full border border-navy/10 bg-graybg px-4 py-2">{item}</span>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-graybg rounded-xl p-6 space-y-5 mb-6">
            <div>
              <p className="font-semibold text-navy mb-1">Phone</p>
              {settings?.phone ? <a href={`tel:${settings.phone}`} className="text-gray-600 hover:text-cyan">{settings.phone}</a> : <span className="text-gray-500">{settings ? 'Please use the form' : '…'}</span>}
            </div>
            <div>
              <p className="font-semibold text-navy mb-1">WhatsApp</p>
              {settings?.whatsapp ? (
                <a href={`https://wa.me/${settings.whatsapp}`} className="text-cyandark font-medium" target="_blank" rel="noopener noreferrer">Chat on WhatsApp →</a>
              ) : <span className="text-gray-500">{settings ? 'Not available' : '…'}</span>}
            </div>
            <div>
              <p className="font-semibold text-navy mb-1">Email enquiries</p>
              {publicDomainEmail ? (
                <a href={`mailto:${publicDomainEmail}`} className="break-all text-gray-600 hover:text-cyandark">{publicDomainEmail}</a>
              ) : (
                <a href="#enquiry-form" className="font-medium text-cyandark hover:text-navy">Use the enquiry form →</a>
              )}
            </div>
            <div>
              <p className="font-semibold text-navy mb-1">Address</p>
              <p className="text-gray-600">{settings?.address || (settings ? 'Peshawar, Khyber Pakhtunkhwa, Pakistan' : '…')}</p>
              {settings?.maps_link && (
                <a href={settings.maps_link} target="_blank" rel="noopener noreferrer" className="text-cyandark text-sm font-medium inline-block mt-1">
                  Open in Google Maps →
                </a>
              )}
            </div>
          </div>

          {embedUrl ? (
            <div className="h-56 overflow-hidden rounded-xl bg-graybg text-sm text-gray-500 shadow-sm">
              <iframe src={embedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Location Map" />
            </div>
          ) : (
            <div className="rounded-xl border border-navy/10 bg-navy p-6 text-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan">Based in Peshawar</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">Supporting laboratories and research partners from Khyber Pakhtunkhwa, Pakistan.</p>
            </div>
          )}
        </motion.div>

        <motion.div id="enquiry-form" className="scroll-mt-28" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="mb-4 text-xl font-bold text-navy">Send a product, service or project enquiry</h2>
          <Suspense fallback={<div className="h-96 bg-white border border-gray-200 rounded-xl shadow-sm" />}>
            <EnquiryForm />
          </Suspense>
        </motion.div>
      </div>
    </main>
  );
}
