import Link from 'next/link';
import { EXTRACTION_KITS } from '@/lib/extractionKits';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Mugen-Prep DNA & RNA Extraction Kits',
  description: 'Explore Mugen-Prep column-based DNA and RNA extraction kit concepts for molecular research. Unopened kits are room-temperature stable. In development; RUO.',
  alternates: { canonical: '/extraction-kits' },
  openGraph: {
    title: 'Mugen-Prep DNA & RNA Extraction Kits | Precision Life Sciences',
    description: 'Column-based DNA and RNA extraction kit concepts for research workflows. Unopened kits are room-temperature stable. In development; RUO.',
    url: `${SITE_URL}/extraction-kits`,
  },
};

export default function ExtractionKitsPage() {
  return (
    <main id="main-content">
      <section className="border-b border-slate-100 bg-graybg px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-7 text-sm text-slate-500">
            <Link href="/" className="hover:text-navy">Home</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page" className="font-semibold text-navy">Extraction kits</span>
          </nav>
          <p className="memory-cue text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Precision Life Sciences · research pipeline</p>
          <h1 className="memory-cue mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-navy md:text-5xl" style={{ '--memory-index': 1 }}>Mugen-Prep</h1>
          <p className="memory-cue mt-5 max-w-3xl text-lg leading-relaxed text-slate-600" style={{ '--memory-index': 2 }}>
            Column-based DNA and RNA extraction kits for molecular research—room-temperature stable when unopened, and an upstream companion to the Mugen-Plex real-time PCR portfolio.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
            <span className="memory-cue rounded-full border border-navy/15 bg-white px-4 py-2 text-navy" style={{ '--memory-index': 3 }}>In development</span>
            <span className="memory-cue rounded-full border border-navy/15 bg-white px-4 py-2 text-navy" style={{ '--memory-index': 4 }}>Research use only</span>
            <span className="memory-cue rounded-full border border-cyan/40 bg-white px-4 py-2 text-navy" style={{ '--memory-index': 5 }}>Room-temperature stable · unopened</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="mugen-prep-kits" className="bg-white px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 id="mugen-prep-kits" className="text-2xl font-extrabold text-navy md:text-3xl">Two preparation paths. One clear family.</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
            DNA and RNA are planned as separate kits within the Mugen-Prep line. We are defining their sample scope, components and specifications before release.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {EXTRACTION_KITS.map((kit, index) => (
              <article key={kit.id} className="memory-cue prep-card flex flex-col rounded-2xl border border-slate-200 bg-graybg p-7" style={{ '--memory-index': index + 1 }}>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span aria-hidden="true" className="prep-accent block h-1 w-14 rounded-full" style={{ backgroundColor: kit.accent }} />
                  <span className="text-xs font-bold tabular-nums text-slate-400">0{index + 1}</span>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">In development · RUO</p>
                <h3 className="mt-2 text-2xl font-extrabold text-navy">{kit.molecule} Extraction Kit</h3>
                <p className="mt-4 leading-relaxed text-slate-600">{kit.description}</p>
                <p className="mt-4 text-sm font-bold text-navy">Catalogue No.: {kit.catalogueNumbers}</p>
                <p className="mt-4 text-sm font-bold text-navy">Storage: {kit.storage}</p>
                <Link
                  href={`/contact?topic=interest&product=${encodeURIComponent(kit.name)}`}
                  className="mt-7 inline-flex self-start rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-navylight"
                >
                  Register interest
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-slate-500">
            Intended sample types, preparation capacity, kit contents and performance have not yet been established. Follow the product-specific storage and handling instructions supplied with each kit. These concepts are not for use in diagnostic procedures.
          </p>
        </div>
      </section>
    </main>
  );
}
