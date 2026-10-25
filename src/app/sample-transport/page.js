import Link from 'next/link';
import { SITE_URL } from '@/lib/site';
import {
  SAMPLE_TRANSPORT_ACCEPTANCE,
  SAMPLE_TRANSPORT_CLASSIFICATION,
  SAMPLE_TRANSPORT_CONTACT,
  SAMPLE_TRANSPORT_INTRO,
  SAMPLE_TRANSPORT_MATERIALS,
  SAMPLE_TRANSPORT_PACKAGING,
  SAMPLE_TRANSPORT_REVIEW_DATE,
  SAMPLE_TRANSPORT_REVIEW_LABEL,
  SAMPLE_TRANSPORT_SCOPE,
  SAMPLE_TRANSPORT_SOURCES,
  SAMPLE_TRANSPORT_STEPS,
} from '@/lib/sampleTransport';

export const metadata = {
  title: 'Sample Transport & Submission Guidance',
  description: 'Basic planning, labelling and packaging guidance for agreed PLS research samples. Confirm sample-specific acceptance and transport requirements before dispatch.',
  alternates: { canonical: '/sample-transport' },
  openGraph: {
    title: 'Sample Transport & Submission Guidance | Precision Life Sciences',
    description: 'Prepare for an agreed research sample submission with the PLS technical team.',
    url: `${SITE_URL}/sample-transport`,
  },
};

function SourceLink({ id, children }) {
  const source = SAMPLE_TRANSPORT_SOURCES.find((item) => item.id === id);
  return <a href={source.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyandark underline underline-offset-4 hover:text-navy">{children}</a>;
}

export default function SampleTransportPage() {
  return (
    <main id="main-content">
      <section className="border-b border-slate-200 bg-graybg px-5 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Link href="/services" className="inline-flex min-h-11 items-center text-sm font-semibold text-cyandark hover:text-navy">← Assays &amp; laboratory services</Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Before you send a sample</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-navy sm:text-4xl md:text-5xl">Sample transport guidance</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{SAMPLE_TRANSPORT_INTRO}</p>
          <p className="mt-5 text-sm text-slate-500">Last reviewed <time dateTime={SAMPLE_TRANSPORT_REVIEW_DATE}>{SAMPLE_TRANSPORT_REVIEW_LABEL}</time> · Research submissions</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">
        <section aria-labelledby="acceptance-heading" className="grid gap-6 rounded-xl border border-navy/15 bg-navy p-6 text-white md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <h2 id="acceptance-heading" className="text-2xl font-bold">First, confirm acceptance.</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-slate-200">{SAMPLE_TRANSPORT_ACCEPTANCE}</p>
          </div>
          <Link href={SAMPLE_TRANSPORT_CONTACT} className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-bold text-navy hover:bg-graybg">Ask about sample requirements →</Link>
        </section>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">{SAMPLE_TRANSPORT_SCOPE}</p>

        <section aria-labelledby="preparation-heading" className="mt-14">
          <h2 id="preparation-heading" className="text-2xl font-bold text-navy md:text-3xl">Prepare for an agreed submission</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {SAMPLE_TRANSPORT_STEPS.map((step, index) => (
              <article key={step.title} className="border-t-2 border-cyan pt-5">
                <span className="text-xs font-bold tracking-[0.16em] text-cyandark">0{index + 1}</span>
                <h3 className="mt-3 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="packaging-heading" className="mt-14 rounded-xl border border-slate-200 bg-graybg p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyandark">The basic packaging principle</p>
          <h2 id="packaging-heading" className="mt-3 text-2xl font-bold text-navy md:text-3xl">Three protective layers</h2>
          <ol className="mt-7 grid gap-4 md:grid-cols-3">
            {SAMPLE_TRANSPORT_PACKAGING.map((layer, index) => (
              <li key={layer.title} className="rounded-lg border border-slate-200 bg-white p-5">
                <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">{index + 1}</span>
                <h3 className="mt-4 text-lg font-bold text-navy">{layer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{layer.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-relaxed text-slate-600">{SAMPLE_TRANSPORT_CLASSIFICATION}</p>
          <p className="mt-4 text-sm text-slate-600">See the <SourceLink id="who">WHO transport guide</SourceLink> and <SourceLink id="iata">IATA dangerous-goods requirements</SourceLink>.</p>
        </section>

        <section aria-labelledby="material-heading" className="mt-14">
          <h2 id="material-heading" className="text-2xl font-bold text-navy md:text-3xl">What to confirm for your material</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">Storage temperature and transit limits must come from the agreed, sample-specific instructions. <SourceLink id="cdc">CDC shipping guidance</SourceLink> likewise directs submitters to test-specific requirements.</p>
          <dl className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
            {SAMPLE_TRANSPORT_MATERIALS.map((item) => (
              <div key={item.material} className="grid gap-3 py-6 md:grid-cols-[0.75fr_1.5fr] md:gap-8">
                <dt className="font-bold text-navy">{item.material}</dt>
                <dd className="text-sm leading-relaxed text-slate-600">{item.guidance}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="sources-heading" className="mt-12">
          <h2 id="sources-heading" className="text-xl font-bold text-navy">Reference guidance</h2>
          <ul className="mt-4 space-y-4">
            {SAMPLE_TRANSPORT_SOURCES.map((source) => (
              <li key={source.id}>
                <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-cyandark underline underline-offset-4 hover:text-navy">{source.title} ↗</a>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{source.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-navy">Ready to discuss your submission?</h2>
            <p className="mt-2 text-sm text-slate-600">Share the service, material type and sample count. Keep patient details out of the enquiry.</p>
          </div>
          <Link href={SAMPLE_TRANSPORT_CONTACT} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white hover:bg-navylight">Contact the technical team →</Link>
        </div>
      </div>
    </main>
  );
}
