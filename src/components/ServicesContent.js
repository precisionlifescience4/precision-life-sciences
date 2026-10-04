'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FAQ from '@/components/FAQ';

export default function ServicesContent() {
  const [services, setServices] = useState([]);
  const [content, setContent] = useState({});

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(setServices);
    fetch('/api/content').then(r => r.json()).then(setContent);
  }, []);

  const colorMap = {
    hbv: { border: 'border-hbv', text: 'text-hbv', bg: 'bg-hbv' },
    hcv: { border: 'border-hcv', text: 'text-hcv', bg: 'bg-hcv' },
    hiv: { border: 'border-hiv', text: 'text-hiv', bg: 'bg-hiv' },
    flu: { border: 'border-flu', text: 'text-flu', bg: 'bg-flu' },
    cchf: { border: 'border-cchf', text: 'text-cchf', bg: 'bg-cchf' },
    navy: { border: 'border-navy', text: 'text-navy', bg: 'bg-navy' },
  };

  const specRow = (label, value) =>
    value ? (
      <div className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
        <span className="text-gray-400">{label}</span>
        <span className="text-navy font-medium text-right">{value}</span>
      </div>
    ) : null;

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
        {services?.map((s, i) => {
          const c = colorMap[s.color] || colorMap.navy;
          const hasSpecs = s.target_gene || s.sample_type || s.turnaround_time;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
              className={`border-t-4 ${c.border} bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <h3 className="font-bold text-navy text-lg mb-2">{s.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{s.description}</p>

              {hasSpecs && (
                <div className="bg-graybg rounded-lg px-4 py-3 text-xs mb-4">
                  {specRow('Target', s.target_gene)}
                  {specRow('Sample Type', s.sample_type)}
                  {specRow('Turnaround Time', s.turnaround_time)}
                  {specRow('Reaction Volume', s.reaction_volume)}
                  {specRow('Storage', s.storage_condition)}
                  {specRow('Shelf Life', s.shelf_life)}
                </div>
              )}

              <span className={`text-sm font-bold ${c.text}`}>{s.price}</span>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-xs text-gray-400 mt-12">
        Product images and specifications are currently presented for research use only.
        Final regulatory wording must be confirmed before publication.
      </p>

      <FAQ />
    </main>
  );
}