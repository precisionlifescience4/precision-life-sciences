'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FAQ from '@/components/FAQ';

export default function Services() {
  const [services, setServices] = useState([]);
  const [content, setContent] = useState({});

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(setServices);
    fetch('/api/content').then(r => r.json()).then(setContent);
  }, []);

  const colorMap = {
    hbv: 'border-hbv', hcv: 'border-hcv', hiv: 'border-hiv', flu: 'border-flu', cchf: 'border-cchf', navy: 'border-navy',
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-4xl font-bold text-navy mb-2 text-center"
      >
        {content.services_title || 'Mugen-Plex Portfolio & Services'}
      </motion.h1>
      <p className="text-center text-gray-500 mb-12">{content.services_subtitle || 'For Research Use Only'}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {services?.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
            className={`border-t-4 ${colorMap[s.color]} bg-graybg rounded-xl p-6 shadow-sm`}
          >
            <h3 className="font-bold text-navy text-lg mb-2">{s.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{s.description}</p>
            <span className="text-sm font-semibold text-cyan">{s.price}</span>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-12">
        Product images and specifications are currently presented for research use only.
        Final regulatory wording must be confirmed before publication.
      </p>

      <FAQ />
    </main>
  );
}