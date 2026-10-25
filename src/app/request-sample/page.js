import { Suspense } from 'react';
import Link from 'next/link';
import SampleRequestForm from '@/components/SampleRequestForm';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Request a Sample Kit',
  description: 'Register your laboratory’s interest in evaluating a Mugen-Plex research-use-only assay. Discuss your research needs, kit formats and future availability with PLS.',
  alternates: { canonical: '/request-sample' },
  openGraph: {
    title: 'Request a Sample Kit | Precision Life Sciences',
    description: 'Start a conversation about Mugen-Plex kit evaluation for your research laboratory.',
    url: `${SITE_URL}/request-sample`,
  },
};

export default function RequestSamplePage() {
  return (
    <main id="main-content" className="bg-graybg">
      <section className="bg-navy px-5 pb-14 pt-10 text-white md:px-8 md:pb-20 md:pt-14">
        <div className="mx-auto max-w-7xl">
          <Link href="/services#infectious" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan">
            <span aria-hidden="true">←</span> Back to the assay range
          </Link>
          <p className="mt-9 text-xs font-bold uppercase tracking-[0.2em] text-cyan">Sample & evaluation enquiries</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Request a sample kit.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            Tell us about your laboratory and the assay you are exploring. We will discuss suitability, evaluation options and availability with you.
          </p>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-14" aria-label="Sample kit request">
        <div className="mx-auto grid max-w-7xl items-start gap-9 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <aside className="order-2 lg:order-1 lg:pt-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyandark">A conversation, then a plan</p>
            <h2 className="mt-3 text-2xl font-bold text-navy">What happens next</h2>
            <ol className="mt-7 space-y-6">
              {[
                ['Share your research needs', 'Choose an assay or ask our team to help you find a suitable starting point.'],
                ['Discuss the details', 'PLS reviews your enquiry and contacts you about the intended workflow and product status.'],
                ['Confirm evaluation options', 'Availability, any costs and next steps are agreed with you before an evaluation is arranged.'],
              ].map(([title, description], index) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy/15 bg-white text-xs font-bold text-navy" aria-hidden="true">0{index + 1}</span>
                  <div>
                    <h3 className="text-sm font-bold text-navy">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 border-l-2 border-cyan pl-5 text-sm leading-relaxed text-slate-600">
              <p className="font-bold text-navy">Research use only · Pre-launch</p>
              <p className="mt-2">Mugen-Plex products are in development or validation and are not currently available for order. This form registers interest; it does not confirm a sample allocation or shipment.</p>
            </div>
            <p className="mt-7 text-sm text-slate-600">
              Need something else?{' '}
              <Link href="/contact" className="font-semibold text-cyandark underline decoration-cyandark/30 underline-offset-4 hover:text-navy">Contact the PLS team</Link>.
            </p>
          </aside>

          <div className="order-1 lg:order-2">
            <Suspense fallback={<div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-600" role="status">Loading the request form…</div>}>
              <SampleRequestForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
