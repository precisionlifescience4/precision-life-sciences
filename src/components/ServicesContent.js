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
    description: 'Available in 24-, 48-, and 96-test RUO kit formats for hepatitis B virus research workflows.',
    sample_type: 'Plasma',
    storage_condition: '2–8 °C',
    price: '24/48/96 Tests · RUO',
    color: 'hbv',
  },
  {
    id: 'hcv',
    slug: 'hcv',
    name: 'Mugen-Plex HCV Real-Time PCR Assay',
    description: 'Available in 24-, 48-, and 96-test RUO kit formats for hepatitis C virus research workflows.',
    sample_type: 'Plasma',
    storage_condition: '2–8 °C',
    price: '24/48/96 Tests · RUO',
    color: 'hcv',
  },
  {
    id: 'hiv',
    slug: 'hiv',
    name: 'Mugen-Plex HIV Real-Time PCR Assay',
    description: 'Available in 24-, 48-, and 96-test RUO kit formats for human immunodeficiency virus research workflows.',
    sample_type: 'Plasma',
    storage_condition: '2–8 °C',
    price: '24/48/96 Tests · RUO',
    color: 'hiv',
  },
  {
    id: 'dengue-chikungunya',
    slug: 'dengue / chikungunya',
    name: 'Mugen-Plex Dengue / Chikungunya Real-Time PCR Assay',
    description: 'A combined RUO arbovirus assay available in 24-, 48-, and 96-test kit formats.',
    sample_type: 'Plasma',
    storage_condition: '2–8 °C',
    price: '24/48/96 Tests · RUO',
    color: 'dengue',
  },
  {
    id: 'influenza',
    slug: 'influenza a & b',
    name: 'Mugen-Plex Influenza A & B Real-Time PCR Assay',
    description: 'An RUO assay available in 24-, 48-, and 96-test kit formats for influenza A and B research workflows.',
    sample_type: 'Nasopharyngeal swab',
    storage_condition: '2–8 °C',
    price: '24/48/96 Tests · RUO',
    color: 'flu',
  },
  {
    id: 'cchf',
    slug: 'cchf',
    name: 'Mugen-Plex CCHF Real-Time PCR Assay',
    description: 'Available in 24-, 48-, and 96-test RUO kit formats for Crimean-Congo haemorrhagic fever virus research.',
    sample_type: 'Plasma',
    storage_condition: '2–8 °C',
    price: '24/48/96 Tests · RUO',
    color: 'cchf',
  },
  {
    id: 'bcr-abl1',
    slug: 'bcr-abl1',
    name: 'Mugen-Plex Myeloid BCR-ABL1',
    description: 'BCR-ABL1 fusion transcript assay concept for chronic myeloid leukaemia research.',
    price: 'In development · 24/48/96 Tests · RUO',
    color: 'dengue',
  },
  {
    id: 'jak2',
    slug: 'jak2',
    name: 'Mugen-Plex Myeloid JAK2',
    description: 'JAK2 mutation assay concept for myeloproliferative neoplasm research.',
    price: 'In development · 24/48/96 Tests · RUO',
    color: 'flu',
  },
  {
    id: 'mpl',
    slug: 'mpl',
    name: 'Mugen-Plex Myeloid MPL',
    description: 'MPL mutation assay concept for myeloproliferative neoplasm research.',
    price: 'In development · 24/48/96 Tests · RUO',
    color: 'hiv',
  },
  {
    id: 'calr',
    slug: 'calr',
    name: 'Mugen-Plex Myeloid CALR',
    description: 'CALR mutation assay concept for myeloproliferative neoplasm research.',
    price: 'In development · 24/48/96 Tests · RUO',
    color: 'cchf',
  },
  {
    id: 'pml-rara',
    slug: 'pml-rara',
    name: 'Mugen-Plex Myeloid PML-RARA',
    description: 'PML-RARA fusion transcript assay concept for acute promyelocytic leukaemia research.',
    price: 'In development · 24/48/96 Tests · RUO',
    color: 'dengue',
  },
  {
    id: 'mpn-panel',
    slug: 'mpn panel',
    name: 'Mugen-Plex Myeloid MPN Panel',
    description: 'JAK2, CALR and MPL assay panel concept for myeloproliferative neoplasm research.',
    price: 'In development · 24/48/96 Tests · RUO',
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

const COMMERCIAL_SERVICES = [
  {
    id: 'dna-extraction',
    slug: 'dna-extraction',
    kind: 'laboratory-service',
    name: 'DNA Extraction',
    description: 'DNA extraction for sequencing and other molecular research workflows.',
    price: 'Pricing on request',
    color: 'navy',
  },
  {
    id: 'nucleic-acid-quantification',
    slug: 'dna-rna-quantification',
    kind: 'laboratory-service',
    name: 'DNA/RNA Quantification',
    description: 'DNA/RNA quantification for molecular research workflows.',
    price: 'Pricing on request',
    color: 'navy',
  },
  {
    id: 'pcr-amplification',
    slug: 'pcr-amplification',
    kind: 'laboratory-service',
    name: 'PCR Amplification',
    description: 'Target amplification for defined molecular research projects.',
    price: 'Pricing on request',
    color: 'navy',
  },
  {
    id: 'gel-electrophoresis',
    slug: 'gel-electrophoresis',
    kind: 'laboratory-service',
    name: 'Gel Electrophoresis',
    description: 'Gel electrophoresis for molecular research workflows.',
    price: 'Pricing on request',
    color: 'navy',
  },
  {
    id: 'sanger-sequencing',
    slug: 'sanger-sequencing',
    kind: 'laboratory-service',
    name: 'Sanger Sequencing',
    description: 'Sanger sequencing for submitted PCR products and integrated molecular workflows.',
    price: 'Pricing on request',
    color: 'navy',
  },
];

const JOURNEY_IDS = new Set(['infectious', 'myeloid', 'laboratory-services', 'collaboration']);

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
  if (s.kind === 'laboratory-service') return [{ label: 'Request a quote', href: link('service'), primary: true }];
  if (s.slug === 'support') return [{ label: 'Discuss your project', href: link('project'), primary: true }];
  if (inDevelopment) return [{ label: 'Register interest', href: link('interest'), primary: true }];
  return [
    { label: 'Request datasheet', href: link('datasheet'), primary: false },
    { label: 'Enquire', href: link('enquire'), primary: true },
  ];
}

export default function ServicesContent() {
  // Keep approved product facts authoritative. Stale CMS records previously
  // overrode the RUO, specimen and storage information shown to customers.
  const services = FALLBACK_SERVICES;

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
      tabLabel: 'I need an infectious assay',
      eyebrow: 'Mugen-Plex Infectious',
      title: 'Choose an infectious-disease assay',
      description: 'Six clearly differentiated assays presented in one consistent RUO kit family.',
      items: services.filter((service) => service.slug !== 'support' && !isInDevelopment(service)),
    },
    {
      id: 'myeloid',
      tabLabel: 'I am exploring myeloid assays',
      eyebrow: 'Mugen-Plex Myeloid',
      title: 'Explore the myeloid assay pipeline',
      description: 'A focused molecular-haematology line currently in development.',
      items: services.filter((service) => service.slug !== 'support' && isInDevelopment(service)),
    },
    {
      id: 'laboratory-services',
      tabLabel: 'I need a laboratory service',
      eyebrow: 'Commercial molecular services',
      title: 'Build a defined research workflow',
      description: 'Access individual services or discuss an integrated workflow from sample preparation through Sanger sequencing.',
      items: COMMERCIAL_SERVICES,
    },
    {
      id: 'collaboration',
      tabLabel: 'I want to collaborate',
      eyebrow: 'Work with PLS',
      title: 'Development and technical collaboration',
      description: 'Start with a defined assay requirement, implementation question or research objective.',
      items: services.filter((service) => service.slug === 'support'),
    },
  ].filter((group) => group.items.length);

  const [activeJourney, setActiveJourney] = useState('infectious');

  useEffect(() => {
    const selectFromHash = () => {
      const requested = window.location.hash.replace('#', '');
      if (JOURNEY_IDS.has(requested)) setActiveJourney(requested);
    };
    selectFromHash();
    window.addEventListener('hashchange', selectFromHash);
    return () => window.removeEventListener('hashchange', selectFromHash);
  }, []);

  const activeGroup = serviceGroups.find((group) => group.id === activeJourney) || serviceGroups[0];

  const chooseJourney = (id) => {
    setActiveJourney(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-4 py-14 md:py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-4xl font-bold text-navy mb-2 text-center"
      >
        <TM text="Choose your route into Mugen-Plex" />
      </motion.h1>
      <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">
        Start with the outcome you need. Each route shows only the relevant assays, services and next step.
      </p>

      <nav aria-label="Customer journeys" className="mx-auto mb-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {serviceGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            aria-pressed={activeGroup.id === group.id}
            onClick={() => chooseJourney(group.id)}
            className={`min-h-16 rounded-xl border px-4 py-3 text-left text-sm font-bold leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
              activeGroup.id === group.id
                ? 'border-navy bg-navy text-white'
                : 'border-navy/15 bg-graybg text-navy hover:border-cyan'
            }`}
          >
            {group.tabLabel}
          </button>
        ))}
      </nav>

      <div>
        {[activeGroup].map((group) => (
          <motion.section
            id={`${group.id}-panel`}
            key={group.id}
            aria-live="polite"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">{group.eyebrow}</p>
              <h2 className="mt-2 text-2xl font-extrabold text-navy md:text-3xl">{group.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{group.description}</p>
            </div>

            <div className={`grid gap-6 ${
              group.id === 'collaboration'
                ? 'md:grid-cols-1'
                : group.id === 'laboratory-services'
                  ? 'md:grid-cols-2 lg:grid-cols-3'
                  : 'md:grid-cols-2'
            }`}>
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
                    className={`flex h-full flex-col border-t-4 ${c.border} rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md`}
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

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
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

            {group.id === 'laboratory-services' && (
              <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-navy/10 bg-graybg p-5 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-bold text-navy">Related project support</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">Primer design, sequence data analysis, and training or workshops can be scoped separately.</p>
                </div>
                <Link href="/contact?topic=project" className="shrink-0 text-sm font-bold text-cyandark hover:text-navy">
                  Discuss a project →
                </Link>
              </div>
            )}
          </motion.section>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-2 text-center text-xs leading-relaxed text-gray-500">
        <p>
          Mugen-Plex products are RUO and are not intended for use in diagnostic procedures. Specifications may
          change during development; contact us to confirm current details before ordering.
        </p>
        <p>
          Commercial laboratory services are offered for research projects. Contact us to confirm scope, sample
          requirements, pricing and turnaround time before sending samples.
        </p>
      </div>

      <FAQ />
    </main>
  );
}
