'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import InfectiousRange from '@/components/InfectiousRange';
import InstitutionalStrip from '@/components/InstitutionalStrip';
import { RegistrationBar } from '@/components/CompanyInformation';

const ASSAY_MARKERS = [
  { name: 'HBV', color: 'bg-hbv' },
  { name: 'HCV', color: 'bg-hcv' },
  { name: 'HIV', color: 'bg-hiv' },
  { name: 'Dengue / Chikungunya', color: 'bg-dengue' },
  { name: 'Influenza A & B', color: 'bg-flu' },
  { name: 'CCHF', color: 'bg-cchf' },
];

const PROOF_POINTS = [
  { value: '24/48/96', label: 'tests per kit' },
  { value: '2–8 °C', label: 'storage' },
  { value: '6', label: 'infectious assays' },
  { value: '1', label: 'consistent family' },
];

export default function Home() {
  return (
    <main id="main-content" className="overflow-hidden">
      <section className="relative bg-navy px-4 py-12 text-white md:py-20 lg:py-24">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-[3px] bg-cyan" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-cyan sm:text-sm">
              Mugen-Plex<sup className="ml-0.5 text-[0.55em] align-super">™</sup> real-time PCR portfolio
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              One family. Many assays. Total consistency.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg lg:mx-0">
              A unified RUO assay family in 24-, 48-, and 96-test formats, with clear colour-coding and responsive local support.
            </p>

            <div className="mx-auto mt-7 max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-white lg:hidden">
              <div className="relative aspect-[2.2/1]">
                <Image
                  src="/images/infectious/mugen-plex-hcv.png"
                  alt="Mugen-Plex HCV RUO assay carton"
                  fill
                  className="object-contain p-1"
                  sizes="(max-width: 1023px) 384px, 0px"
                  priority
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <Link
                href="/services#infectious"
                className="rounded-full bg-cyan px-7 py-3.5 font-bold text-navy transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View the assay range
              </Link>
              <Link
                href="/contact?topic=enquire"
                className="rounded-full border border-white/50 px-7 py-3.5 font-bold text-white transition hover:bg-white hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Request information
              </Link>
            </div>

            <div className="mt-8 hidden flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-wide text-slate-300 sm:flex lg:justify-start">
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
            <div className="grid grid-cols-2 gap-3 rounded-[2rem] border border-white/20 bg-white/10 p-3">
              <div className="col-span-2 overflow-hidden rounded-2xl bg-white">
                <div className="relative aspect-[2.5/1]">
                  <Image src="/images/infectious/mugen-plex-hcv.png" alt="Mugen-Plex HCV RUO assay carton" fill className="object-contain p-1" sizes="560px" priority />
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-white">
                <div className="relative aspect-[3/2]">
                  <Image src="/images/infectious/mugen-plex-hbv.png" alt="Mugen-Plex HBV RUO assay carton" fill className="object-contain p-1" sizes="280px" />
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-white">
                <div className="relative aspect-[3/2]">
                  <Image src="/images/infectious/mugen-plex-hiv.png" alt="Mugen-Plex HIV RUO assay carton" fill className="object-contain p-1" sizes="280px" />
                </div>
              </div>
            </div>
            <span className="absolute -bottom-4 right-7 rounded-full border border-white/20 bg-navy px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan">
              24/48/96-test RUO formats
            </span>
          </motion.div>
        </div>
      </section>

      <section aria-label="Portfolio facts" className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 md:grid-cols-4">
          {PROOF_POINTS.map((point) => (
            <div key={point.label} className="border-slate-100 px-4 py-6 text-center md:border-l md:first:border-l-0">
              <p className="text-2xl font-extrabold text-navy md:text-3xl">{point.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <RegistrationBar />

      <InfectiousRange />

      <section className="bg-graybg px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-navy/10 bg-white p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyandark">Laboratory services</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy">Need a defined molecular workflow?</h2>
            <p className="mt-3 leading-relaxed text-slate-600">Explore DNA extraction, quantification, PCR, electrophoresis and Sanger sequencing services.</p>
            <Link href="/molecular-services" className="mt-6 inline-block font-bold text-cyandark hover:text-navy">Choose a service →</Link>
          </article>
          <article className="rounded-2xl border border-navy/10 bg-navy p-7 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan">Mugen-Plex Myeloid</p>
            <h2 className="mt-3 text-2xl font-extrabold">Follow the assay pipeline.</h2>
            <p className="mt-3 leading-relaxed text-slate-300">See the BCR-ABL1, JAK2, MPL, CALR, PML-RARA and MPN-panel concepts currently in development.</p>
            <Link href="/services#myeloid" className="mt-6 inline-block font-bold text-cyan hover:text-white">View the pipeline →</Link>
          </article>
        </div>
      </section>

      <InstitutionalStrip compact />

      <section className="bg-navy px-4 py-14 text-center text-white md:py-16">
        <div className="mx-auto max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">Start a conversation</span>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Is Mugen-Plex right for your laboratory?</h2>
          <p className="mx-auto mb-7 mt-4 max-w-xl leading-relaxed text-slate-300">
            Request product information, a laboratory-service quote or a technical discussion.
          </p>
          <Link
            href="/contact?topic=enquire"
            className="inline-block rounded-full bg-cyan px-8 py-4 font-bold text-navy transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Contact the team
          </Link>
        </div>
      </section>
    </main>
  );
}
