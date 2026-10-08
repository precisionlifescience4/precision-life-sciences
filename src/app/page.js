'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import TrustBadges from '@/components/TrustBadges';
import Gallery from '@/components/Gallery';
import InfectiousRange from '@/components/InfectiousRange';
import InstitutionalStrip from '@/components/InstitutionalStrip';
import MyeloidRange from '@/components/MyeloidRange';

const ASSAY_MARKERS = [
  { name: 'HBV', color: 'bg-hbv' },
  { name: 'HCV', color: 'bg-hcv' },
  { name: 'HIV', color: 'bg-hiv' },
  { name: 'Dengue / Chikungunya', color: 'bg-dengue' },
  { name: 'Influenza A & B', color: 'bg-flu' },
  { name: 'CCHF', color: 'bg-cchf' },
];

const PROOF_POINTS = [
  { value: '48', label: 'tests per kit' },
  { value: '2–8 °C', label: 'storage' },
  { value: '6', label: 'infectious assays' },
  { value: '1', label: 'consistent family' },
];

const VALUE_POINTS = [
  {
    number: '01',
    title: 'A familiar kit every time',
    description: 'A consistent format across the portfolio helps laboratory teams recognise, store and handle each assay quickly.',
  },
  {
    number: '02',
    title: 'Colour that has a job',
    description: 'Assay-specific accents make the range easier to identify without changing the core Mugen-Plex visual system.',
  },
  {
    number: '03',
    title: 'Support within reach',
    description: 'Product information, technical discussion and research collaboration are available through a local team in Pakistan.',
  },
];

export default function Home() {
  const [content, setContent] = useState({});

  useEffect(() => {
    fetch('/api/content').then((response) => response.json()).then(setContent).catch(() => setContent({}));
  }, []);

  const capabilities = [
    {
      title: content.cap1_title || 'Molecular Assay Development',
      desc: content.cap1_desc || 'From assay concept and oligonucleotide design to controls and a practical verification plan.',
    },
    {
      title: content.cap2_title || 'Diagnostic Product Development',
      desc: content.cap2_desc || 'A consistent kit architecture, product presentation and documentation designed for laboratory use.',
    },
    {
      title: content.cap3_title || 'Laboratory Implementation',
      desc: content.cap3_desc || 'Workflow discussion, onboarding and practical support for research laboratories adopting the platform.',
    },
    {
      title: content.cap4_title || 'Local Technical Support',
      desc: content.cap4_desc || 'A reachable Pakistan-based team for product questions, collaboration and technical follow-up.',
    },
  ];

  return (
    <main className="overflow-hidden">
      <section className="relative bg-navy px-4 py-16 text-white md:py-20 lg:py-24">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-hbv via-hcv to-cchf" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-cyan">
              Mugen-Plex<sup className="ml-0.5 text-[0.55em] align-super">™</sup> real-time PCR portfolio
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              One family. Many assays. Total consistency.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg lg:mx-0">
              A unified RUO assay family with a consistent 48-test format, clear colour-coding and responsive local support.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/services"
                className="rounded-full bg-cyan px-7 py-3.5 font-bold text-navy shadow-lg shadow-cyan/25 transition hover:-translate-y-0.5 hover:bg-white"
              >
                View the assay range
              </Link>
              <Link
                href="/contact?topic=enquire"
                className="rounded-full border border-white/35 px-7 py-3.5 font-bold text-white transition hover:border-white hover:bg-white hover:text-navy"
              >
                Request information
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-wide text-slate-300 lg:justify-start">
              {ASSAY_MARKERS.map((assay) => (
                <span key={assay.name} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${assay.color}`} />
                  {assay.name}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: 'easeOut' }}
            className="relative mx-auto hidden w-full max-w-xl lg:block"
            aria-label="Selected Mugen-Plex assay cartons"
          >
            <div className="absolute -inset-5 rounded-[2.2rem] bg-cyan/10 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-3 rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
              <div className="col-span-2 overflow-hidden rounded-2xl bg-white">
                <div className="relative aspect-[2.5/1]">
                  <Image src="/images/infectious/mugen-plex-hcv.png" alt="Mugen-Plex HCV RUO assay carton" fill className="object-contain p-1" sizes="560px" priority />
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-white">
                <div className="relative aspect-[3/2]">
                  <Image src="/images/infectious/mugen-plex-hbv.png" alt="Mugen-Plex HBV RUO assay carton" fill className="object-contain p-1" sizes="280px" priority />
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-white">
                <div className="relative aspect-[3/2]">
                  <Image src="/images/infectious/mugen-plex-hiv.png" alt="Mugen-Plex HIV RUO assay carton" fill className="object-contain p-1" sizes="280px" priority />
                </div>
              </div>
            </div>
            <span className="absolute -bottom-4 right-7 rounded-full border border-white/15 bg-navy px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan shadow-lg">
              48-test RUO format
            </span>
          </motion.div>
        </div>
      </section>

      <section aria-label="Portfolio facts" className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 md:grid-cols-4">
          {PROOF_POINTS.map((point) => (
            <div key={point.label} className="border-slate-100 px-4 py-7 text-center md:border-l md:first:border-l-0">
              <p className="text-2xl font-extrabold text-navy md:text-3xl">{point.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <InfectiousRange />

      <section className="bg-white px-4 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Designed around the laboratory</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">Consistency that reduces friction.</h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-600">
              The family is designed to feel familiar from one assay to the next, while colour keeps each product distinct.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {VALUE_POINTS.map((point) => (
              <article key={point.number} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_12px_35px_rgba(0,32,91,0.06)]">
                <span className="text-sm font-extrabold text-cyan">{point.number}</span>
                <h3 className="mt-5 text-xl font-extrabold text-navy">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InstitutionalStrip />
      <MyeloidRange />
      <TrustBadges />

      <section className="bg-graybg px-4 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Beyond the kit</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">From assay idea to laboratory workflow.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {capabilities.map((capability, index) => (
              <article key={capability.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan/10 font-extrabold text-cyandark">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-bold text-navy">{capability.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{capability.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Gallery />

      <section className="relative bg-navy px-4 py-20 text-center text-white">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
        <div className="relative mx-auto max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">Start a conversation</span>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Is Mugen-Plex right for your laboratory?</h2>
          <p className="mx-auto mb-8 mt-4 max-w-xl leading-relaxed text-slate-300">
            Ask for the relevant product information, discuss a research requirement or explore a technical collaboration.
          </p>
          <Link
            href="/contact?topic=enquire"
            className="inline-block rounded-full bg-cyan px-8 py-4 font-bold text-navy shadow-lg shadow-cyan/25 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Contact the team
          </Link>
        </div>
      </section>
    </main>
  );
}
