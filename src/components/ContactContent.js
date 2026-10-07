'use client';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EnquiryForm from '@/components/EnquiryForm';

export default function ContactContent() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings);
  }, []);

  const embedUrl = settings?.address
    ? `https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`
    : null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-navy mb-6 text-center"
      >
        Get In Touch
      </motion.h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Questions about pricing, bulk orders, distribution, technical support or research collaboration?
        Send us a message and our team will reply, usually within one working day.
      </p>

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
                <a href={`https://wa.me/${settings.whatsapp}`} className="text-cyandark font-medium" target="_blank">Chat on WhatsApp →</a>
              ) : <span className="text-gray-500">{settings ? 'Not available' : '…'}</span>}
            </div>
            <div>
              <p className="font-semibold text-navy mb-1">Email</p>
              {settings?.email ? <a href={`mailto:${settings.email}`} className="text-gray-600 hover:text-cyan break-all">{settings.email}</a> : <span className="text-gray-500">{settings ? 'Please use the form' : '…'}</span>}
            </div>
            <div>
              <p className="font-semibold text-navy mb-1">Address</p>
              <p className="text-gray-600">{settings?.address || (settings ? 'Peshawar, Khyber Pakhtunkhwa, Pakistan' : '…')}</p>
              {settings?.maps_link && (
                <a href={settings.maps_link} target="_blank" className="text-cyandark text-sm font-medium inline-block mt-1">
                  Open in Google Maps →
                </a>
              )}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden h-56 bg-graybg flex items-center justify-center text-gray-500 text-sm shadow-sm">
            {embedUrl ? (
              <iframe src={embedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Location Map" />
            ) : (
              'Map will appear here once address is added'
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="font-bold text-navy mb-4">Send an Enquiry</h2>
          <Suspense fallback={<div className="h-96 bg-white border border-gray-200 rounded-xl shadow-sm" />}>
            <EnquiryForm />
          </Suspense>
        </motion.div>
      </div>
    </main>
  );
}