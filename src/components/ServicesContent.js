'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import { EMERGENCY_PANELS } from '@/lib/emergencyPanels';
import { JANZY_KIT_CATEGORIES, JANZY_KITS } from '@/lib/janzyKits';
import { LAB_SERVICES, SERVICE_PACKAGES } from '@/lib/labServices';

const FALLBACK_SERVICES = [
  {
    id: 'hbv',
    slug: 'hbv',
    name: 'Mugen-Plex HBV Real-Time PCR Assay',
    description: 'Available in 24-, 48-, and 96-test RUO kit formats for hepatitis B virus research workflows.',
    sample_type: 'Plasma',
    storage_condition: 'Room-temperature stable (unopened, dry)',
    price: '24/48/96 Tests · RUO',
    color: 'hbv',
  },
  {
    id: 'hcv',
    slug: 'hcv',
    name: 'Mugen-Plex HCV Real-Time PCR Assay',
    description: 'Available in 24-, 48-, and 96-test RUO kit formats for hepatitis C virus research workflows.',
    sample_type: 'Plasma',
    storage_condition: 'Room-temperature stable (unopened, dry)',
    price: '24/48/96 Tests · RUO',
    color: 'hcv',
  },
  {
    id: 'hiv',
    slug: 'hiv',
    name: 'Mugen-Plex HIV Real-Time PCR Assay',
    description: 'Available in 24-, 48-, and 96-test RUO kit formats for human immunodeficiency virus research workflows.',
    sample_type: 'Plasma',
    storage_condition: 'Room-temperature stable (unopened, dry)',
    price: '24/48/96 Tests · RUO',
    color: 'hiv',
  },
  {
    id: 'dengue-chikungunya',
    slug: 'dengue / chikungunya',
    name: 'Mugen-Plex Dengue / Chikungunya Real-Time PCR Assay',
    description: 'A combined RUO arbovirus assay available in 24-, 48-, and 96-test kit formats.',
    sample_type: 'Plasma',
    storage_condition: 'Room-temperature stable (unopened, dry)',
    price: '24/48/96 Tests · RUO',
    color: 'dengue',
  },
  {
    id: 'influenza',
    slug: 'influenza a & b',
    name: 'Mugen-Plex Influenza A & B Real-Time PCR Assay',
    description: 'An RUO assay available in 24-, 48-, and 96-test kit formats for influenza A and B research workflows.',
    sample_type: 'Nasopharyngeal swab',
    storage_condition: 'Room-temperature stable (unopened, dry)',
    price: '24/48/96 Tests · RUO',
    color: 'flu',
  },
  {
    id: 'cchf',
    slug: 'cchf',
    name: 'Mugen-Plex CCHF Real-Time PCR Assay',
    description: 'Available in 24-, 48-, and 96-test RUO kit formats for Crimean-Congo haemorrhagic fever virus research.',
    sample_type: 'Plasma',
    storage_condition: 'Confirm with PLS',
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

const COMMERCIAL_SERVICES = LAB_SERVICES.map((service) => ({
  id: service.slug,
  slug: service.slug,
  kind: 'laboratory-service',
  name: service.name,
  description: service.shortDescription,
  price: 'Project quote',
  color: 'navy',
}));
const CORE_SERVICE_SLUGS = new Set(SERVICE_PACKAGES.find((servicePackage) => servicePackage.id === 'sample-preparation').slugs);

const JOURNEY_IDS = new Set(['infectious', 'janzy-kits', 'emergency-panels', 'myeloid', 'laboratory-services', 'advanced-services', 'collaboration']);
const EMERGENCY_PANEL_SERVICES = EMERGENCY_PANELS.map((panel) => ({
  id: panel.id,
  slug: panel.id,
  name: panel.name,
  description: panel.description,
  price: 'In development · RUO concept',
  color: panel.color,
}));
const ASSAY_DETAIL_PATHS = {
  hbv: '/assays/hbv',
  hcv: '/assays/hcv',
  hiv: '/assays/hiv',
  'dengue / chikungunya': '/assays/dengue-chikungunya',
  'influenza a & b': '/assays/influenza-a-b',
  cchf: '/assays/cchf',
};

const JANZY_CLINICAL_AREAS = {
  all: { label: 'All targets', matches: () => true },
  human: { label: 'Human health', matches: (kit) => kit.category === 'Human health' },
  gastro: { label: 'Gastro & enteric', matches: (kit) => /Clostridioides|Shigella|Campylobacter|Escherichia coli|Listeria|Vibrio|Bacteroides|Entamoeba|Giardia|Cryptosporidium|Salmonella|Norovirus|Rotavirus|Adenovirus/i.test(kit.name) },
  livestock: { label: 'Livestock & ruminant', matches: (kit) => kit.category === 'Ruminant health' },
};

const PORTFOLIO_PATHS = [
  {
    id: 'infectious',
    eyebrow: 'PLS products',
    title: 'PCR & extraction kits',
    description: 'Explore the Mugen-Plex infectious and pipeline assays, plus Mugen-Prep extraction kits.',
    action: 'Explore PLS kits',
    icon: 'kit',
  },
  {
    id: 'laboratory-services',
    eyebrow: 'PLS services',
    title: 'Send samples or start a project',
    description: 'Request extraction, PCR, sequencing, primer design, cloning, cleanup or biobanking support.',
    action: 'Explore laboratory services',
    icon: 'service',
  },
  {
    id: 'janzy-kits',
    eyebrow: 'Extended PCR kit catalogue',
    title: 'Find a kit by disease area',
    description: 'Explore human, gastrointestinal, bacterial and livestock molecular detection kits supplied through PLS.',
    action: 'Explore disease areas',
    icon: 'kit',
  },
];

function PathIcon({ type }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.7', className: 'h-6 w-6', 'aria-hidden': true };
  if (type === 'service') return <svg {...common}><path d="M4 7.5h16M7 4v7m10-7v7M5.5 11.5h13v8.5h-13z" /><path d="M9 15.75h6" /></svg>;
  if (type === 'partner') return <svg {...common}><circle cx="8" cy="12" r="3.25" /><circle cx="16" cy="7.5" r="2.25" /><circle cx="16" cy="16.5" r="2.25" /><path d="m10.8 10.5 3.1-1.8m-3.1 4.8 3.1 1.8" /></svg>;
  return <svg {...common}><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 9h8M8 13h5M8 16h3" /></svg>;
}

function SpecChip({ label, value }) {
  return (
    <div className="bg-graybg rounded-lg px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-navy leading-snug">{value}</p>
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
  if (s.kind === 'janzy-kit') return [{ label: 'Request availability', href: link('enquire'), primary: true }];
  if (s.slug === 'support') return [{ label: 'Discuss your project', href: link('project'), primary: true }];
  if (inDevelopment) return [{ label: 'Register interest', href: link('interest'), primary: true }];
  if (ASSAY_DETAIL_PATHS[s.slug]) {
    return [
      { label: 'View assay', href: ASSAY_DETAIL_PATHS[s.slug], primary: false },
      { label: 'Enquire', href: link('enquire'), primary: true },
    ];
  }
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
    janzy: { border: 'border-[#F58A07]', text: 'text-[#B85F00]', bg: 'bg-[#F58A07]' },
    denv: { border: 'border-dengue', text: 'text-denguedark', bg: 'bg-dengue' },
    chikv: { border: 'border-dengue', text: 'text-denguedark', bg: 'bg-dengue' },
    flu: { border: 'border-flu', text: 'text-cyandark', bg: 'bg-flu' },
    cchf: { border: 'border-cchf', text: 'text-[#9f4718]', bg: 'bg-cchf' },
    navy: { border: 'border-navy', text: 'text-navy', bg: 'bg-navy' },
  };

  const serviceGroups = [
    {
      id: 'infectious',
      tabLabel: 'Infectious assays',
      eyebrow: 'Mugen-Plex Infectious',
      title: 'Choose an infectious-disease assay',
      description: 'Six clearly differentiated assays presented in one consistent RUO kit family.',
      items: services.filter((service) => service.slug !== 'support' && !isInDevelopment(service)),
    },
    {
      id: 'janzy-kits',
      tabLabel: 'Extended PCR kits',
      eyebrow: 'Human, gastrointestinal & livestock targets',
      title: 'Browse PCR kits by disease area',
      description: 'A supplied catalogue of 97 molecular detection kits across human-health, gastrointestinal, bacterial and ruminant targets. These authorised Janzy products are supplied through PLS; confirm availability, intended use and documentation for a specific product.',
      items: JANZY_KITS,
    },
    {
      id: 'emergency-panels',
      tabLabel: 'Emergency panels',
      eyebrow: 'Emergency medicine research pipeline',
      title: 'Explore the respiratory and meningitis panel concepts',
      description: 'Both multiplex real-time PCR panels are in development. Target coverage, specimen requirements, format and performance have not been established; neither is intended for clinical decision-making.',
      items: EMERGENCY_PANEL_SERVICES,
    },
    {
      id: 'myeloid',
      tabLabel: 'Myeloid assays',
      eyebrow: 'Mugen-Plex Myeloid',
      title: 'Explore the myeloid assay pipeline',
      description: 'A focused molecular-haematology line currently in development.',
      items: services.filter((service) => service.slug !== 'support' && isInDevelopment(service)),
    },
    {
      id: 'laboratory-services',
      tabLabel: 'Lab essentials',
      eyebrow: 'Sample preparation & storage',
      title: 'Choose a practical laboratory step',
      description: 'Extraction, PCR, cleanup, quality checks and sample storage can be requested individually or scoped together.',
      items: COMMERCIAL_SERVICES.filter((service) => CORE_SERVICE_SLUGS.has(service.slug)),
    },
    {
      id: 'advanced-services',
      tabLabel: 'Advanced services',
      eyebrow: 'Sequencing, design & build',
      title: 'Take your research project further',
      description: 'Explore Sanger and NGS sequencing, primer and probe design, cloning and custom molecular biology projects.',
      items: COMMERCIAL_SERVICES.filter((service) => !CORE_SERVICE_SLUGS.has(service.slug)),
    },
    {
      id: 'collaboration',
      tabLabel: 'Collaboration',
      eyebrow: 'Work with PLS',
      title: 'Development and technical collaboration',
      description: 'Start with a defined assay requirement, implementation question or research objective.',
      items: services.filter((service) => service.slug === 'support'),
    },
  ].filter((group) => group.items.length);

  const [activeJourney, setActiveJourney] = useState('infectious');
  const [activeJanzyCategory, setActiveJanzyCategory] = useState('All targets');
  const [activeClinicalArea, setActiveClinicalArea] = useState('all');
  const [query, setQuery] = useState('');
  const searchInput = useRef(null);
  const quickSearchInput = useRef(null);

  useEffect(() => {
    const selectFromHash = () => {
      const requested = window.location.hash.replace('#', '');
      const requestedArea = new URLSearchParams(window.location.search).get('area');
      setActiveJourney(JOURNEY_IDS.has(requested) ? requested : 'infectious');
      setActiveJanzyCategory('All targets');
      setActiveClinicalArea(Object.hasOwn(JANZY_CLINICAL_AREAS, requestedArea) ? requestedArea : 'all');
      setQuery('');
    };
    selectFromHash();
    window.addEventListener('hashchange', selectFromHash);
    window.addEventListener('popstate', selectFromHash);
    return () => {
      window.removeEventListener('hashchange', selectFromHash);
      window.removeEventListener('popstate', selectFromHash);
    };
  }, []);

  const activeGroup = serviceGroups.find((group) => group.id === activeJourney) || serviceGroups[0];
  const searchTerms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const visibleItems = activeGroup.items.filter((service) => {
    const searchable = [service.name, service.description, service.category, service.format, service.sample_type, service.storage_condition, service.price]
      .filter(Boolean).join(' ').toLowerCase();
    const matchesSearch = searchTerms.every((term) => searchable.includes(term));
    const matchesJanzyCategory = activeGroup.id !== 'janzy-kits'
      || activeJanzyCategory === 'All targets'
      || service.category === activeJanzyCategory;
    const matchesClinicalArea = activeGroup.id !== 'janzy-kits'
      || JANZY_CLINICAL_AREAS[activeClinicalArea].matches(service);
    return matchesSearch && matchesJanzyCategory && matchesClinicalArea;
  });

  const chooseJourney = (id) => {
    if (id === activeJourney) return;
    setActiveJourney(id);
    setActiveJanzyCategory('All targets');
    setActiveClinicalArea('all');
    setQuery('');
    window.history.pushState(null, '', `#${id}`);
  };

  const chooseClinicalArea = (area) => {
    setActiveJourney('janzy-kits');
    setActiveJanzyCategory('All targets');
    setActiveClinicalArea(area);
    setQuery('');
    window.history.pushState(null, '', `/services?area=${area}#janzy-kits`);
  };

  const clearSearch = () => {
    setQuery('');
    searchInput.current?.focus();
  };

  const searchPortfolio = (event) => {
    event.preventDefault();
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      quickSearchInput.current?.focus();
      return;
    }
    const matchedGroup = serviceGroups.find((group) => group.items.some((service) => {
      const searchable = [service.name, service.description, service.category, service.format, service.sample_type, service.storage_condition, service.price]
        .filter(Boolean).join(' ').toLowerCase();
      return terms.every((term) => searchable.includes(term));
    }));
    if (matchedGroup) {
      setActiveJourney(matchedGroup.id);
      setActiveJanzyCategory('All targets');
      setActiveClinicalArea('all');
      window.history.pushState(null, '', `#${matchedGroup.id}`);
    }
    requestAnimationFrame(() => document.getElementById('catalogue-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-5 py-12 sm:px-6 md:py-16">
      <div className="mb-9 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Explore the PLS portfolio</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-navy sm:text-4xl md:text-5xl">Assays &amp; laboratory services</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
          Find a research assay, explore our development pipeline, or choose a service for your laboratory workflow.
        </p>
      </div>

      <section aria-label="Find a kit or service" className="portfolio-enter mb-8 rounded-2xl border border-navy/10 bg-graybg p-5 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <form onSubmit={searchPortfolio}>
            <label htmlFor="portfolio-search" className="text-base font-extrabold text-navy">Find a kit or service</label>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">Search a pathogen, kit, product family or service.</p>
            <div className="mt-3 flex gap-2">
              <div className="relative min-w-0 flex-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
                <input
                  ref={quickSearchInput}
                  id="portfolio-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="e.g. HBV, meningitis, sequencing"
                  className="min-h-12 w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-navy placeholder:text-slate-500 focus:border-cyandark focus:outline-none focus:ring-2 focus:ring-cyan/20"
                />
              </div>
              <button type="submit" className="min-h-12 shrink-0 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-navylight">Search</button>
            </div>
          </form>
          <div>
            <p className="text-sm font-extrabold text-navy">Explore by area</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                ['infectious', 'Infectious disease'],
                ['emergency-panels', 'Emergency medicine'],
                ['myeloid', 'Haematology'],
                ['advanced-services', 'Sequencing & design'],
                ['gastro', 'Gastro & enteric kits'],
                ['livestock', 'Livestock kits'],
              ].map(([id, label]) => (
                <button key={id} type="button" onClick={() => Object.hasOwn(JANZY_CLINICAL_AREAS, id) && id !== 'all' ? chooseClinicalArea(id) : chooseJourney(id)} className="min-h-10 rounded-full border border-navy/15 bg-white px-3 py-2 text-sm font-semibold text-navy hover:border-cyan hover:text-cyandark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="portfolio-route-heading" className="portfolio-enter portfolio-enter-delay-1 mb-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Start here</p>
            <h2 id="portfolio-route-heading" className="mt-2 text-2xl font-extrabold text-navy">What do you need today?</h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-slate-600">Choose a route first. You can then narrow by clinical area, workflow or product family.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PORTFOLIO_PATHS.map((path) => (
            <button
              key={path.id}
              type="button"
              onClick={() => chooseJourney(path.id)}
              className="memory-cue group flex min-h-56 flex-col rounded-2xl border border-navy/10 bg-white p-6 text-left transition-all hover:-translate-y-0.5 hover:border-cyan hover:shadow-[0_12px_30px_rgba(0,32,91,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              style={{ '--memory-index': PORTFOLIO_PATHS.indexOf(path) }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyandark"><PathIcon type={path.icon} /></span>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-cyandark">{path.eyebrow}</p>
              <h3 className="mt-2 text-xl font-extrabold text-navy">{path.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{path.description}</p>
              <span className="mt-auto pt-5 text-sm font-bold text-navy group-hover:text-cyandark">{path.action}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="mb-8 flex flex-col items-start justify-between gap-3 rounded-lg border border-cyan/20 bg-graybg px-5 py-4 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-600"><span className="font-semibold text-navy">Planning to send samples?</span> Confirm acceptance and transport requirements first.</p>
        <Link href="/sample-transport" className="inline-flex min-h-11 shrink-0 items-center text-sm font-bold text-cyandark hover:text-navy">Sample transport guide →</Link>
      </div>

      <nav aria-label="Portfolio categories" className="portfolio-enter portfolio-enter-delay-2 mb-8 border-b border-slate-200 pb-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr_0.82fr]">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">PLS product families</p>
            <div className="flex flex-wrap gap-2">
              {serviceGroups.filter((group) => ['infectious', 'emergency-panels', 'myeloid'].includes(group.id)).map((group) => (
                <button
                  key={group.id}
                  type="button"
                  aria-pressed={activeGroup.id === group.id}
                  aria-controls="catalogue-results"
                  onClick={() => chooseJourney(group.id)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-semibold leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                    activeGroup.id === group.id ? 'border-navy bg-navy text-white' : 'border-navy/15 bg-graybg text-navy hover:border-cyan'
                  }`}
                >
                  {group.tabLabel}<span aria-hidden="true" className={`rounded px-1.5 py-0.5 text-[11px] ${activeGroup.id === group.id ? 'bg-white/15 text-white' : 'bg-white text-slate-500'}`}>{group.items.length}</span>
                </button>
              ))}
              <Link href="/extraction-kits" className="inline-flex min-h-11 items-center rounded-lg border border-navy/15 bg-graybg px-3 py-2 text-sm font-semibold text-navy hover:border-cyan">Mugen-Prep extraction kits</Link>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">PLS laboratory services</p>
            <div className="flex flex-wrap gap-2">
              {serviceGroups.filter((group) => ['laboratory-services', 'advanced-services', 'collaboration'].includes(group.id)).map((group) => (
                <button
                  key={group.id}
                  type="button"
                  aria-pressed={activeGroup.id === group.id}
                  aria-controls="catalogue-results"
                  onClick={() => chooseJourney(group.id)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-semibold leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                    activeGroup.id === group.id ? 'border-navy bg-navy text-white' : 'border-navy/15 bg-graybg text-navy hover:border-cyan'
                  }`}
                >
                  {group.tabLabel}<span aria-hidden="true" className={`rounded px-1.5 py-0.5 text-[11px] ${activeGroup.id === group.id ? 'bg-white/15 text-white' : 'bg-white text-slate-500'}`}>{group.items.length}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Extended PCR kit catalogue</p>
            {serviceGroups.filter((group) => group.id === 'janzy-kits').map((group) => (
          <button
            key={group.id}
            type="button"
            aria-pressed={activeGroup.id === group.id}
            aria-controls="catalogue-results"
            onClick={() => chooseJourney(group.id)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-semibold leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
              activeGroup.id === group.id
                ? 'border-navy bg-navy text-white'
                : 'border-navy/15 bg-graybg text-navy hover:border-cyan'
            }`}
          >
            {group.tabLabel}
            <span aria-hidden="true" className={`rounded px-1.5 py-0.5 text-[11px] ${activeGroup.id === group.id ? 'bg-white/15 text-white' : 'bg-white text-slate-500'}`}>{group.items.length}</span>
          </button>
            ))}
            <p className="mt-2 text-xs leading-relaxed text-slate-500">Human, gastrointestinal, bacterial and livestock PCR kits. Authorised Janzy products; manufacturer documentation and availability are confirmed by PLS.</p>
          </div>
        </div>
      </nav>

      {activeGroup.id === 'janzy-kits' && (
        <fieldset className="mb-8">
          <legend className="text-sm font-semibold text-navy">Refine PCR kits by target group</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(JANZY_CLINICAL_AREAS).map(([id, area]) => (
              <button key={id} type="button" aria-pressed={activeClinicalArea === id} onClick={() => setActiveClinicalArea(id)} className={`min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${activeClinicalArea === id ? 'border-navy bg-navy text-white' : 'border-navy/15 bg-graybg text-navy hover:border-cyan'}`}>
                {area.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {JANZY_KIT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeJanzyCategory === category}
                onClick={() => setActiveJanzyCategory(category)}
                className={`min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                  activeJanzyCategory === category
                    ? 'border-navy bg-navy text-white'
                    : 'border-navy/15 bg-graybg text-navy hover:border-cyan'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-md">
          <label htmlFor="catalogue-search" className="text-sm font-semibold text-navy">Search {activeGroup.tabLabel.toLowerCase()}</label>
          <div className="relative mt-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
            <input
              ref={searchInput}
              id="catalogue-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={activeGroup.id === 'janzy-kits' ? 'Search a pathogen or kit name' : 'Search by name, target or sample type'}
              aria-controls="catalogue-results"
              className="min-h-12 w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-navy placeholder:text-slate-500 focus:border-cyandark focus:outline-none focus:ring-2 focus:ring-cyan/20"
            />
          </div>
        </div>
        <div className="flex min-h-8 items-center gap-4 text-sm">
          <p role="status" aria-atomic="true" className="text-slate-600">Showing <span className="font-semibold text-navy">{visibleItems.length}</span> of {activeGroup.items.length} in {activeGroup.tabLabel.toLowerCase()}</p>
          {query && <button type="button" onClick={clearSearch} className="min-h-11 shrink-0 font-semibold text-cyandark underline underline-offset-4 hover:text-navy">Clear search</button>}
        </div>
      </div>

      <div id="catalogue-results">
        {[activeGroup].map((group) => (
          <section
            id={`${group.id}-panel`}
            key={group.id}
            aria-labelledby={`${group.id}-heading`}
          >
            <div className="mb-8 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">{group.eyebrow}</p>
              <h2 id={`${group.id}-heading`} className="mt-2 text-2xl font-extrabold text-navy md:text-3xl">{group.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{group.description}</p>
            </div>

            {visibleItems.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-graybg px-6 py-10 text-center">
                <h3 className="text-xl font-bold text-navy">No matching results</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">Try a shorter name or a different search term, or choose another category above.</p>
                <button type="button" onClick={clearSearch} className="mt-5 min-h-11 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-navylight">Show all {group.tabLabel.toLowerCase()}</button>
              </div>
            )}

            <div className={`grid gap-5 ${
              group.id === 'collaboration'
                ? 'md:grid-cols-1'
                : group.id === 'janzy-kits' || group.id === 'laboratory-services' || group.id === 'advanced-services'
                  ? 'md:grid-cols-2 lg:grid-cols-3'
                  : 'md:grid-cols-2'
            }`}>
              {visibleItems.map((s, index) => {
                const c = colorMap[s.color] || colorMap.navy;
                // General, public-facing specs only. Gene regions and reaction details stay in the datasheet.
                const chips = [
                  ['Category', s.category],
                  ['Pack size', s.format],
                  ['Sample type', s.sample_type],
                  ['Turnaround', s.turnaround_time],
                  ['Storage', s.storage_condition],
                  ['Shelf life', s.shelf_life],
                ].filter(([, v]) => v);
                return (
                  <article
                    key={s.id}
                    style={{ '--motion-index': index }}
                    className={`portfolio-card-enter flex h-full flex-col rounded-xl border border-slate-200 border-t-4 ${c.border} bg-white p-5 transition-shadow hover:shadow-[0_8px_30px_rgba(0,32,91,0.06)] sm:p-6`}
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
                            aria-label={`${act.label}: ${s.name}`}
                            className={`inline-flex min-h-11 items-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
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
                  </article>
                );
              })}
            </div>

            {(group.id === 'laboratory-services' || group.id === 'advanced-services') && (
              <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-navy/10 bg-graybg p-5 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-bold text-navy">Explore the service packages</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">Compare sequencing, design and sample preparation routes before submitting a project request.</p>
                </div>
                <Link href="/molecular-services" className="shrink-0 text-sm font-bold text-cyandark hover:text-navy">
                  View service details →
                </Link>
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-col justify-between gap-4 rounded-2xl border border-navy/10 bg-graybg p-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyandark">Mugen-Prep · in development</p>
          <h2 className="mt-2 text-xl font-extrabold text-navy">Column-based DNA and RNA extraction kits</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">RUO extraction kits that are room-temperature stable when unopened, planned alongside Mugen-Plex PCR assays.</p>
        </div>
        <Link href="/extraction-kits" className="shrink-0 text-sm font-bold text-cyandark hover:text-navy">Explore extraction kits →</Link>
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
