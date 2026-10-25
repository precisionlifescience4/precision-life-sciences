import Image from 'next/image';
import Link from 'next/link';
import { INFECTIOUS_ASSAYS } from '@/lib/assays';

function AssayCarton({ assay }) {
  return (
    <article className="h-full">
      <Link href={`/assays/${assay.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-navy/10 bg-white transition-colors hover:border-cyandark/50">
        <div className="relative aspect-[8/5] border-b border-slate-100 bg-white">
          <Image
            src={assay.image}
            alt={`Mugen-Plex ${assay.shortName} real-time PCR assay carton`}
            fill
            sizes="(min-width: 1280px) 370px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.025]"
          />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px]" style={{ backgroundColor: assay.color }} />
        </div>
        <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 text-lg font-bold leading-snug text-navy sm:text-xl">{assay.shortName}</h3>
            <span aria-hidden="true" className="pt-1 text-cyandark">↗</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 first-letter:uppercase">{assay.organism}</p>
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 text-xs text-slate-500">
            <span>24 / 48 / 96 tests</span><span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-300" /><span>Research use only</span>
          </div>
          <span className="mt-4 text-sm font-semibold text-cyandark group-hover:text-navy">View assay details</span>
        </div>
      </Link>
    </article>
  );
}

export default function InfectiousRange() {
  return (
    <section id="infectious-range" aria-labelledby="infectious-range-heading" className="border-y border-navy/10 bg-graybg px-5 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-5 md:mb-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyandark">Mugen-Plex™ Infectious Disease</p>
            <h2 id="infectious-range-heading" className="mt-3 text-3xl font-bold leading-tight text-navy md:text-4xl">Find your research assay.</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">Six infectious disease assays in one colour-coded portfolio. Explore the product information and discuss your requirements with PLS.</p>
          </div>
          <Link href="/services#infectious" className="inline-flex min-h-11 shrink-0 items-center gap-3 self-start text-sm font-semibold text-cyandark hover:text-navy md:self-auto">All assays & services <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INFECTIOUS_ASSAYS.map((assay) => <AssayCarton key={assay.slug} assay={assay} />)}
        </div>

        <div className="mt-7 flex flex-col justify-between gap-4 border-t border-navy/10 pt-6 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-xs leading-relaxed text-slate-600"><strong className="font-semibold text-navy">Research use only.</strong> Products are in development or validation; not currently available for order and not intended for use in diagnostic procedures.</p>
          <Link href="/request-sample" className="inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-semibold text-cyandark hover:text-navy">Request a sample kit <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
