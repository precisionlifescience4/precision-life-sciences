'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import TM from '@/components/TM';

const FALLBACK_SERVICES = [
  {
    id: 'hbv',
    slug: 'hbv',
    name: 'Mugen-Plex HBV Real-Time PCR Assay',
    description: 'A consistent 48-test RUO kit format for hepatitis B virus research workflows.',
    sample_type: 'Plasma',
    storage_condition: '2–8 °C',
    price: '48 tests · RUO',
    color: 'hbv',
  },
  {
    id: 'hcv',
    slug: 'hcv',
    name: 'Mugen-Plex HCV Real-Time PCR Assay',
    description: 'A consistent 48-test RUO kit format for hepatitis C virus research workflows.',
    sample_type: 'Plasma',
    storage_condition: '2–8 °C',
    price: '48 tests · RUO',
    color: 'hcv',
  },
  {
    id: 'hiv',
    slug: 'hiv',
    name: 'Mugen-Plex HIV Real-Time PCR Assay',
    description: 'A consistent 48-test RUO kit format for human immunodeficiency virus research workflows.',
    sample_type: 'Plasma',
    storage_condition: '2–8 °C',
    price: '48 tests · RUO',
    color: 'hiv',
  },
  {
    id: 'dengue-chikungunya',
    slug: 'dengue / chikungunya',
    name: 'Mugen-Plex Dengue / Chikungunya Real-Time PCR Assay',
    description: 'A combined 48-test RUO arbovirus assay in the shared Mugen-Plex format.',
    sample_type: 'Plasma',
    storage_condition: '2–8 °C',
    price: '48 tests · RUO',
    color: 'dengue',
  },
  {
    id: 'influenza',
    slug: 'influenza a & b',
    name: 'Mugen-Plex Influenza A & B Real-Time PCR Assay',
    description: 'A 48-test RUO assay for influenza A and B research workflows.',
    sample_type: 'Nasopharyngeal swab',
    storage_condition: '2–8 °C',
    price: '48 tests · RUO',
    color: 'flu',
  },
  {
    id: 'cchf',
    slug: 'cchf',
    name: 'Mugen-Plex CCHF Real-Time PCR Assay',
    description: 'A consistent 48-test RUO kit format for Crimean-Congo haemorrhagic fever virus research.',
    sample_type: 'Plasma',
    storage_condition: '2–8 °C',
    price: '48 tests · RUO',
    color: 'cchf',
  },
  {
    id: 'bcr-abl1',
    slug: 'bcr-abl1',
    name: 'Mugen-Plex Myeloid BCR-ABL1',
    description: 'BCR-ABL1 fusion transcript assay concept for chronic myeloid leukaemia research.',
    price: 'In development · 48 tests · RUO',
    color: 'dengue',
  },
  {
    id: 'jak2',
    slug: 'jak2',
    name: 'Mugen-Plex Myeloid JAK2',
    description: 'JAK2 mutation assay concept for myeloproliferative neoplasm research.',
    price: 'In development · 48 tests · RUO',
    color: 'flu',
  },
  {
    id: 'mpl',
    slug: 'mpl',
    name: 'Mugen-Plex Myeloid MPL',
    description: 'MPL mutation assay concept for myeloproliferative neoplasm research.',
    price: 'In development · 48 tests · RUO',
    color: 'hiv',
  },
  {
    id: 'calr',
    slug: 'calr',
    name: 'Mugen-Plex Myeloid CALR',
    description: 'CALR mutation assay concept for myeloproliferative neoplasm research.',
    price: 'In development · 48 tests · RUO',
    color: 'cchf',
  },
  {
    id: 'pml-rara',
    slug: 'pml-rara',
    name: 'Mugen-Plex Myeloid PML-RARA',
    description: 'PML-RARA fusion transcript assay concept for acute promyelocytic leukaemia research.',
    price: 'In development · 48 tests · RUO',
    color: 'dengue',
  },
  {
    id: 'mpn-panel',
    slug: 'mpn panel',
    name: 'Mugen-Plex Myeloid MPN Panel',
    description: 'JAK2, CALR and MPL assay panel concept for myeloproliferative neoplasm research.',
    price: 'In development · 48 tests · RUO',
    color: 'flu',
  },
  {
    id: 'support',
    slug: 'support',
    name: 'Assay Development & Technical Collaboration',
    description: 'Discuss molecular assay development, laboratory implementation or a research collaboration with the PLS team.',
    price: 'Project-based',
    color: 'navy',
  },
];

function SpecChip({ label, value }) {
  return (
    <div className="bg-graybg rounded-lg px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="text-xs font-medium text-navy leading-snug">{value}</p>
    </div>
  );
}

// Which request buttons a card gets, and what they pre-fill on the Contact form.
function isInDevelopment(service) {
  return /development/i.test(`${service.price} ${service.description}`);
}

function actionsFor(s) {
  const inDevelopment = isInDevelopment(s);
  const link = (topic) => `/contact?topic=${topic}&product=${encodeURIComponent(s.name)}`;
  if (s.slug === 'support') return [{ label: 'Discuss your project', href: link('project'), primary: true }];
  if (inDevelopment) return [{ label: 'Register interest', href: link('interest'), primary: true }];
  return [
    { label: 'Request datasheet', href: link('datasheet'), primary: false },
    { label: 'Enquire', href: link('enquire'), primary: true },
  ];
}

export default function ServicesContent() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [content, setContent] = useState({});

  useEffect(() => {
    fetch('/api/services')
      .then((response) => response.json())
      .then((data) => setServices(Array.isArray(data) && data.length ? data : FALLBACK_SERVICES))
      .catch(() => setServices(FALLBACK_SERVICES));
    fetch('/api/content').then((response) => response.json()).then(setContent).catch(() => setContent({}));
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

  const serviceGroups = [
    {
      id: 'infectious',
      eyebrow: 'Mugen-Plex Infectious',
      title: 'Infectious-disease assay range',
      description: 'Six clearly differentiated assays presented in one consistent RUO kit family.',
      items: services.filter((service) => service.slug !== 'support' && !isInDevelopment(service)),
    },
    {
      id: 'myeloid',
      eyebrow: 'Mugen-Plex Myeloid',
      title: 'Myeloid assay concepts',
      description: 'A focused molecular-haematology line currently in development.',
      items: services.filter((service) => service.slug !== 'support' && isInDevelopment(service)),
    },
    {
      id: 'collaboration',
      eyebrow: 'Work with PLS',
      title: 'Development and technical collaboration',
      description: 'Start with a defined assay requirement, implementation question or research objective.',
      items: services.filter((service) => service.slug === 'support'),
    },
  ].filter((group) => group.items.length);

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
      <p className="text-center text-gray-500 mb-12">{content.services_subtitle || 'RUO portfolio and molecular-development services'}</p>

      <div className="mx-auto mb-16 flex max-w-3xl flex-wrap justify-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-navy">
        {['48-test format', 'RUO', '2–8 °C storage', 'Local technical discussion'].map((item) => (
          <span key={item} className="rounded-full border border-navy/10 bg-graybg px-4 py-2.5">{item}</span>
        ))}
      </div>

      <div className="space-y-20">
        {serviceGroups.map((group) => (
          <section key={group.id} aria-labelledby={`${group.id}-heading`}>
            <div className="mb-8 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">{group.eyebrow}</p>
              <h2 id={`${group.id}-heading`} className="mt-2 text-2xl font-extrabold text-navy md:text-3xl">{group.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{group.description}</p>
            </div>

            <div className={`grid gap-6 ${group.id === 'collaboration' ? 'md:grid-cols-1' : 'md:grid-cols-2'}`}>
              {group.items.map((s, i) => {
                const c = colorMap[s.color] || colorMap.navy;
                // General, public-facing specs only. Gene regions and reaction details stay in the datasheet.
                const chips = [
                  ['Sample type', s.sample_type],
                  ['Turnaround', s.turnaround_time],
                  ['Storage', s.storage_condition],
                  ['Shelf life', s.shelf_life],
                ].filter(([, v]) => v);
                return (
                  <motion.article
                    key={s.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 2) * 0.08, duration: 0.5, ease: 'easeOut' }}
                    className={`border-t-4 ${c.border} rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md`}
                  >
                    <h3 className="mb-2 text-lg font-bold text-navy">{s.name}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">{s.description}</p>

                    {chips.length > 0 && (
                      <div className="mb-4 grid grid-cols-2 gap-2">
                        {chips.map(([label, value]) => (
                          <SpecChip key={label} label={label} value={value} />
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                      <span className={`text-sm font-bold ${c.text}`}>{s.price}</span>
                      <div className="flex flex-wrap gap-2">
                        {actionsFor(s).map((act) => (
                          <Link
                            key={act.label}
                            href={act.href}
                            className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
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
                  </motion.article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <p className="text-center text-xs text-gray-500 mt-12">
        Mugen-Plex products are RUO and are not intended for use in diagnostic procedures. Specifications may
        change during development; contact us to confirm current details before ordering.
      </p>

      <FAQ />
    </main>
  );
}
