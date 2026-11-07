import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { LAB_SERVICES, SERVICE_PACKAGES } from '@/lib/labServices';

export const metadata = {
  title: 'NGS, Sequencing & Molecular Biology Services in Peshawar',
  description: 'Research services in Peshawar: NGS, Sanger sequencing, primer design, cloning, PCR cleanup, molecular biology workflows, sample preparation and storage.',
  alternates: { canonical: '/molecular-services' },
  openGraph: {
    title: `NGS, Sequencing & Molecular Biology Services in Peshawar | ${SITE_NAME}`,
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
            Sequencing, design and molecular biology services for research.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Choose a defined service or bring us a project that needs several laboratory steps. Each request is reviewed for feasibility, sample requirements and deliverables.
          </p>
          <Link href="/contact?topic=service" className="mt-8 inline-block rounded-full bg-cyan px-7 py-3.5 font-bold text-navy hover:bg-white">
            Request a quotation
          </Link>
          <Link href="/sample-transport" className="mx-auto mt-4 flex min-h-11 w-fit items-center text-sm font-semibold text-white underline underline-offset-4 hover:text-sky-200">Read sample transport guidance →</Link>
        </div>
      </section>

      <section className="bg-graybg px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Service packages</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy">Three clear routes into the lab.</h2>
            <p className="mt-3 leading-relaxed text-slate-600">Start with the outcome you need. Services can be quoted individually or combined into a project.</p>
          </div>

          <div className="space-y-12">
            {SERVICE_PACKAGES.map((servicePackage, packageIndex) => (
              <section key={servicePackage.id} id={servicePackage.id} aria-labelledby={`${servicePackage.id}-heading`} className={`scroll-mt-24 border-t-4 ${servicePackage.accent} bg-white px-5 py-8 sm:px-8`}>
                <div className="mb-7 max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Package 0{packageIndex + 1}</p>
                  <h3 id={`${servicePackage.id}-heading`} className="mt-2 text-2xl font-extrabold text-navy md:text-3xl">{servicePackage.name}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{servicePackage.description}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {servicePackage.slugs.map((slug) => {
                    const service = LAB_SERVICES.find((item) => item.slug === slug);
                    return (
                      <article key={service.slug} className="flex flex-col rounded-xl border border-slate-200 bg-graybg p-5">
                        <h4 className="text-lg font-extrabold text-navy">{service.name}</h4>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{service.shortDescription}</p>
                        <Link href={`/molecular-services/${service.slug}`} className="mt-6 inline-flex min-h-11 items-center font-bold text-cyandark hover:text-navy">
                          View service details →
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </section>
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
