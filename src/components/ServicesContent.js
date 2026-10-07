'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import TM from '@/components/TM';

function SpecChip({ label, value }) {
  return (
    <div className="bg-graybg rounded-lg px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="text-xs font-medium text-navy leading-snug">{value}</p>
    </div>
  );
}

// Which request buttons a card gets, and what they pre-fill on the Contact form.
function actionsFor(s) {
  const inDevelopment = /development/i.test(`${s.price} ${s.description}`);
  const link = (topic) => `/contact?topic=${topic}&product=${encodeURIComponent(s.name)}`;
  if (s.slug === 'support') return [{ label: 'Discuss your project', href: link('project'), primary: true }];
  if (inDevelopment) return [{ label: 'Register interest', href: link('interest'), primary: true }];
  return [
    { label: 'Request datasheet', href: link('datasheet'), primary: false },
    { label: 'Enquire', href: link('enquire'), primary: true },
  ];
}

export default function ServicesContent() {
  const [services, setServices] = useState([]);
  const [content, setContent] = useState({});

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(setServices);
    fetch('/api/content').then(r => r.json()).then(setContent);
  }, []);

  const colorMap = {
    hbv: { border: 'border-hbv', text: 'text-cyandark', bg: 'bg-hbv' },
    hcv: { border: 'border-hcv', text: 'text-hcvdark', bg: 'bg-hcv' },
    hiv: { border: 'border-hiv', text: 'text-hiv', bg: 'bg-hiv' },
    dengue: { border: 'border-dengue', text: 'text-denguedark', bg: 'bg-dengue' },
    denv: { border: 'border-dengue', text: 'text-denguedark', bg: 'bg-dengue' },
    chikv: { border: 'border-dengue', text: 'text-denguedark', bg: 'bg-dengue' },
    flu: { border: 'border-flu', text: 'text-flu', bg: 'bg-flu' },
    cchf: { border: 'border-cchf', text: 'text-cchf', bg: 'bg-cchf' },
    navy: { border: 'border-navy', text: 'text-navy', bg: 'bg-navy' },
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-4xl font-bold text-navy mb-2 text-center"
      >
        <TM text={content.services_title || 'Mugen-Plex Portfolio & Services'} />
      </motion.h1>
      <p className="text-center text-gray-500 mb-12">{content.services_subtitle || 'For Research Use Only'}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {services?.map((s, i) => {
          const c = colorMap[s.color] || colorMap.navy;
          // General, public-facing specs only. Gene regions and reaction details stay in the datasheet.
          const chips = [
            ['Sample type', s.sample_type],
            ['Turnaround', s.turnaround_time],
            ['Storage', s.storage_condition],
            ['Shelf life', s.shelf_life],
          ].filter(([, v]) => v);
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

              {chips.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {chips.map(([label, value]) => (
                    <SpecChip key={label} label={label} value={value} />
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
                <span className={`text-sm font-bold ${c.text}`}>{s.price}</span>
                <div className="flex flex-wrap gap-2">
                  {actionsFor(s).map((act) => (
                    <Link
                      key={act.label}
                      href={act.href}
                      className={`text-xs font-semibold px-3.5 py-2 rounded-full transition-colors ${
                        act.primary
                          ? 'bg-navy text-white hover:bg-navylight'
                          : 'border border-navy/25 text-navy hover:border-navy'
                      }`}
                    >
                      {act.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-xs text-gray-500 mt-12">
        All Mugen-Plex products are supplied for Research Use Only (RUO) and are not intended for use in
        diagnostic procedures. Specifications may change as products are developed; contact us to confirm
        current details before ordering.
      </p>

      <FAQ />
    </main>
  );
}
