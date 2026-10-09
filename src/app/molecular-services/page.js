import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { LAB_SERVICES } from '@/lib/labServices';

export const metadata = {
  title: 'Molecular Biology Laboratory Services in Peshawar',
  description: 'Research molecular biology services in Peshawar, Pakistan: DNA extraction, DNA/RNA quantification, PCR amplification, gel electrophoresis and Sanger sequencing support.',
  alternates: { canonical: '/molecular-services' },
  openGraph: {
    title: `Molecular Biology Laboratory Services in Peshawar | ${SITE_NAME}`,
    description: 'Request individual molecular laboratory services or discuss an integrated research workflow with Precision Life Sciences.',
    url: `${SITE_URL}/molecular-services`,
  },
};

export default function MolecularServicesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Molecular Biology Laboratory Services',
    description: metadata.description,
    url: `${SITE_URL}/molecular-services`,
    provider: {
      '@type': 'Organization',
      name: 'Precision Life Sciences (Private) Limited',
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Peshawar',
        addressRegion: 'Khyber Pakhtunkhwa',
        addressCountry: 'PK',
      },
    },
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    audience: { '@type': 'Audience', audienceType: 'Research laboratories and scientific institutions' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Research molecular services',
      itemListElement: LAB_SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.shortDescription,
          url: `${SITE_URL}/molecular-services/${service.slug}`,
        },
      })),
    },
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />

      <section className="bg-navy px-4 py-14 text-white md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">Commercial research services · Peshawar</p>
          <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-extrabold tracking-tight md:text-5xl">
            Molecular biology laboratory services for defined research workflows.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Request one service or discuss an integrated workflow from nucleic-acid preparation through Sanger sequencing.
          </p>
          <Link href="/contact?topic=service" className="mt-8 inline-block rounded-full bg-cyan px-7 py-3.5 font-bold text-navy hover:bg-white">
            Request a quotation
          </Link>
        </div>
      </section>

      <section className="bg-graybg px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Choose a service</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy">Start with the step your project needs.</h2>
            <p className="mt-3 leading-relaxed text-slate-600">Scope, sample requirements, pricing and turnaround time are confirmed before samples are submitted.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {LAB_SERVICES.map((service, index) => (
              <article key={service.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
                <span className="text-sm font-extrabold text-cyandark">0{index + 1}</span>
                <h3 className="mt-4 text-xl font-extrabold text-navy">{service.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{service.shortDescription}</p>
                <Link
                  href={`/molecular-services/${service.slug}`}
                  className="mt-6 font-bold text-cyandark hover:text-navy"
                >
                  View service details →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            ['Define the requirement', 'Tell us the sample type, project objective and service or workflow you need.'],
            ['Confirm the scope', 'The team confirms sample requirements, pricing, turnaround time and deliverables.'],
            ['Submit after confirmation', 'Send samples only after the technical and logistical details have been agreed.'],
          ].map(([title, description], index) => (
            <div key={title} className="rounded-xl border border-navy/10 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyandark">Step {index + 1}</p>
              <h2 className="mt-3 text-xl font-extrabold text-navy">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
          Laboratory services are offered for research projects. Scope and acceptance are confirmed before sample submission.
        </p>
      </section>
    </main>
  );
}
