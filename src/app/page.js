import Image from 'next/image';
import Link from 'next/link';
import InfectiousRange from '@/components/InfectiousRange';
import EmergencyPanels from '@/components/EmergencyPanels';
import InstitutionalStrip from '@/components/InstitutionalStrip';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'PCR Kits, Sequencing & Molecular Biology Services in Pakistan',
  description: 'Explore Mugen-Plex RUO PCR assays, Mugen-Prep extraction kits, NGS and Sanger sequencing, primer design and synthesis, cloning, PCR cleanup and biobanking services from Precision Life Sciences in Peshawar, Pakistan.',
  alternates: { canonical: '/' },
  openGraph: {
    title: `PCR Kits, Sequencing & Molecular Biology Services in Pakistan | ${SITE_NAME}`,
    description: 'Mugen-Plex PCR assays, extraction kit concepts, NGS, Sanger sequencing and molecular biology research services from Peshawar, Pakistan.',
    url: SITE_URL,
  },
};

const ROUTES = [
  {
    number: '01',
    label: 'Mugen-Plex™',
    title: 'Explore the assays',
    description: 'Discover the infectious disease portfolio and the research assay pipeline.',
    href: '/services',
  },
  {
    number: '02',
    label: 'Mugen-Prep · In development',
    title: 'Prepare DNA or RNA',
    description: 'Explore column-based extraction kits for nucleic acid preparation.',
    href: '/extraction-kits',
  },
  {
    number: '03',
    label: 'Laboratory services',
    title: 'Plan your workflow',
    description: 'Explore sequencing, primer design, cloning, PCR cleanup and sample preparation services.',
    href: '/molecular-services',
  },
];

const SUPPORT_LINKS = [
  { title: 'Sample transport', text: 'Review the guidance before arranging a laboratory submission.', href: '/sample-transport' },
  { title: 'Resources & safety data', text: 'Find product safety data sheets and company credentials.', href: '/resources' },
  { title: 'Talk to the team', text: 'Discuss a product, a laboratory service or a research project.', href: '/contact?topic=enquire' },
];

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/#home`,
    name: 'Precision Life Sciences: PCR kits and molecular biology services',
    description: metadata.description,
    url: SITE_URL,
    about: [
      { '@type': 'Thing', name: 'Research-use-only real-time PCR assays' },
      { '@type': 'Thing', name: 'NGS and Sanger sequencing services' },
      { '@type': 'Thing', name: 'Primer design and oligonucleotide synthesis' },
      { '@type': 'Thing', name: 'Molecular biology research services' },
    ],
    provider: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <section aria-labelledby="home-heading" className="relative overflow-hidden border-b border-navy/10 bg-[#F4F8FA] px-5 py-12 sm:px-6 md:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-12">
          <div className="relative z-10">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyandark sm:text-xs">Precision Life Sciences · Peshawar, Pakistan</p>
            <h1 id="home-heading" className="max-w-2xl text-[clamp(2.25rem,4.8vw,4rem)] font-bold leading-[1.12] tracking-[-0.045em] text-navy">
              Molecular research.<br /><span className="text-cyandark">Local expertise.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              Explore the Mugen-Plex™ PCR portfolio, DNA and RNA extraction kits, and molecular laboratory services for your research.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <Link href="/services#infectious" className="inline-flex min-h-12 items-center justify-center gap-7 rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navylight">
                Explore assays <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/request-sample" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-navy/25 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-graybg">
                Request a sample kit
              </Link>
            </div>
            <div className="mt-7 max-w-lg border-l-2 border-cyan/50 pl-4">
              <p className="text-xs font-semibold text-navy">Pre-launch · Research use only (RUO)</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">Products are in development or validation and are not currently available for order. Not for diagnostic use.</p>
            </div>
          </div>

          <figure className="relative min-w-0 overflow-hidden rounded-2xl border border-navy/10 bg-white">
            <div className="relative overflow-hidden bg-[#ECF3F5] px-3 pt-5 sm:px-6 sm:pt-7">
              <div aria-hidden="true" className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(#c9dce2 1px, transparent 1px), linear-gradient(90deg, #c9dce2 1px, transparent 1px)', backgroundSize: '56px 56px' }} />
              <div aria-hidden="true" className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-cyan/15" />
              <div aria-hidden="true" className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border border-cyan/15" />
              <div className="relative flex items-center justify-between gap-4 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                <span>Mugen-Plex™ portfolio</span>
                <span className="flex items-center gap-1.5"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-hcv" />HCV</span>
              </div>
              <div className="relative aspect-[3/2]">
                <Image src="/images/infectious/mugen-plex-hcv.png" alt="Mugen-Plex HCV real-time PCR research assay carton" fill className="object-contain mix-blend-multiply" sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, (min-width: 768px) 720px, 100vw" loading="eager" />
              </div>
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
              <div><p className="text-sm font-semibold text-navy">One family. Six infectious disease assays.</p><p className="mt-1 text-xs text-slate-500">24-, 48-, and 96-test RUO formats</p></div>
              <Link href="/assays/hcv" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-cyandark hover:text-navy">View HCV <span aria-hidden="true">↗</span></Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-label="Explore PLS products and services" className="bg-white px-5 sm:px-6">
        <div className="mx-auto grid max-w-7xl divide-y divide-navy/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {ROUTES.map((route, index) => (
            <Link key={route.href} href={route.href} style={{ '--memory-index': index }} className="memory-cue group relative py-7 md:px-7 md:py-9 md:first:pl-0 md:last:pr-0">
              <div className="flex items-center justify-between gap-4"><p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-500">{route.label}</p><span aria-hidden="true" className="text-xs text-slate-400">{route.number}</span></div>
              <h2 className="mt-3 flex items-center justify-between gap-4 text-xl font-bold text-navy">{route.title}<span aria-hidden="true" className="text-cyandark transition-transform group-hover:translate-x-1">↗</span></h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">{route.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <InfectiousRange />

      <section aria-labelledby="prep-home-title" className="bg-[#eef7fb] px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyandark">Mugen-Prep · In development</p>
            <h2 id="prep-home-title" className="mt-3 text-3xl font-bold text-navy md:text-4xl">A clear start for DNA and RNA.</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">Explore our column-based extraction kit concepts, designed for molecular research workflows and planned for room-temperature storage when unopened.</p>
            <Link href="/extraction-kits" className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white hover:bg-navylight">Explore Mugen-Prep</Link>
            <p className="mt-3 text-xs text-slate-600">In development · Research use only</p>
          </div>
          <Link href="/extraction-kits" className="block overflow-hidden rounded-2xl border border-cyan/20 bg-white"><Image src="/images/mugen-prep-concept.jpg" alt="Mugen-Prep DNA and RNA extraction kit packaging concepts" width={1000} height={667} className="h-auto w-full" /><span className="block px-5 pb-4 text-xs text-slate-500">Packaging concepts · In development</span></Link>
        </div>
      </section>

      <section aria-labelledby="research-workflow-heading" className="bg-white px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyandark">Molecular laboratory services</p>
            <h2 id="research-workflow-heading" className="mt-3 max-w-lg text-3xl font-bold leading-tight text-navy md:text-4xl">From sample preparation to sequence.</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-slate-600">Choose an individual service or discuss a defined workflow with the PLS team. Start with your research objective and the material you plan to submit.</p>
            <Link href="/molecular-services" className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-cyandark hover:text-navy">Explore laboratory services <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {[
              ['01', 'Prepare & quantify', 'DNA extraction and DNA/RNA quantification.', '/molecular-services/dna-extraction'],
              ['02', 'Amplify & assess', 'PCR amplification and gel electrophoresis.', '/molecular-services/pcr-amplification'],
              ['03', 'Sequence', 'Sanger sequencing for your research workflow.', '/molecular-services/sanger-sequencing'],
            ].map(([number, title, description, href], index) => (
              <Link key={number} href={href} style={{ '--memory-index': index }} className="memory-cue group flex items-start gap-5 py-6">
                <span aria-hidden="true" className="pt-1 text-xs font-semibold text-cyandark">{number}</span>
                <div className="flex-1"><h3 className="text-lg font-semibold text-navy">{title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p></div>
                <span aria-hidden="true" className="pt-1 text-cyandark transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EmergencyPanels />

      <section aria-labelledby="myeloid-pipeline-heading" className="bg-graybg px-5 py-12 sm:px-6 md:py-16">
        <div className="memory-cue mx-auto grid max-w-6xl gap-7 rounded-xl bg-navy p-7 text-white sm:p-10 md:grid-cols-[1.2fr_0.8fr] md:items-center" style={{ '--memory-index': 1 }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Mugen-Plex Myeloid · In development</p>
            <h2 id="myeloid-pipeline-heading" className="mt-3 text-2xl font-bold md:text-3xl">Follow the research pipeline.</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">BCR-ABL1, JAK2, MPL, CALR, PML-RARA and MPN-panel concepts for molecular-haematology research. All are currently in development.</p>
          </div>
          <div className="md:justify-self-end">
            <Link href="/services#myeloid" className="inline-flex min-h-12 items-center gap-6 rounded-lg border border-white/35 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">View the myeloid pipeline <span aria-hidden="true">↗</span></Link>
            <p className="mt-3 text-xs text-slate-300">Research use only · Not for diagnostic use</p>
          </div>
        </div>
      </section>

      <InstitutionalStrip compact />

      <section aria-labelledby="support-heading" className="border-t border-navy/10 bg-[#F4F8FA] px-5 py-14 sm:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyandark">Practical support</p><h2 id="support-heading" className="mt-3 text-2xl font-bold text-navy md:text-3xl">A clear next step for your laboratory.</h2></div>
          <div className="grid gap-4 md:grid-cols-3">
            {SUPPORT_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="group rounded-xl border border-navy/10 bg-white p-6 transition-colors hover:border-cyandark/50">
                <h3 className="flex items-center justify-between gap-4 text-base font-semibold text-navy">{link.title}<span aria-hidden="true" className="text-cyandark">↗</span></h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
