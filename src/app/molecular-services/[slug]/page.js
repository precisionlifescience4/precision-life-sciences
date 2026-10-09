import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LAB_SERVICES, getLabService } from '@/lib/labServices';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return LAB_SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getLabService(slug);
  if (!service) return {};

  const description = `${service.shortDescription} Available for defined research projects through Precision Life Sciences in Peshawar, Pakistan.`;
  return {
    title: service.pageTitle,
    description,
    alternates: { canonical: `/molecular-services/${service.slug}` },
    openGraph: {
      title: `${service.pageTitle} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/molecular-services/${service.slug}`,
    },
  };
}

export default async function LabServicePage({ params }) {
  const { slug } = await params;
  const service = getLabService(slug);
  if (!service) notFound();

  const pageUrl = `${SITE_URL}/molecular-services/${service.slug}`;
  const relatedServices = LAB_SERVICES.filter((item) => item.slug !== service.slug).slice(0, 3);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: service.name,
        serviceType: `${service.name} for research projects`,
        description: service.shortDescription,
        url: pageUrl,
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
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Molecular services', item: `${SITE_URL}/molecular-services` },
          { '@type': 'ListItem', position: 3, name: service.name, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />

      <section className="border-b border-slate-100 bg-graybg px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-7 text-sm text-slate-500">
            <Link href="/" className="hover:text-navy">Home</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link href="/molecular-services" className="hover:text-navy">Molecular services</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page" className="font-semibold text-navy">{service.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Research laboratory service · Peshawar</p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy md:text-5xl">{service.pageTitle}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">{service.intro}</p>
            </div>
            <div className="rounded-2xl border border-navy/15 bg-white p-6">
              <p className="text-sm font-extrabold text-navy">Before samples are submitted</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">The team confirms feasibility, sample requirements, pricing, turnaround time and deliverables for the specific research request.</p>
              <Link href={`/contact?topic=service&product=${encodeURIComponent(service.name)}`} className="mt-5 inline-block rounded-full bg-navy px-6 py-3 text-sm font-bold text-white hover:bg-navylight">
                Request a quotation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <article>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Where it fits</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy">A defined step in your research workflow.</h2>
            <ul className="mt-6 space-y-4">
              {service.supports.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl bg-navy p-7 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">Information to prepare</p>
            <h2 className="mt-2 text-2xl font-extrabold">Help the team assess the request efficiently.</h2>
            <ul className="mt-6 space-y-4">
              {service.planning.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <span aria-hidden="true" className="font-extrabold text-cyan">0{service.planning.indexOf(item) + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-graybg px-4 py-14 md:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Common questions</p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy">Plan before you dispatch material.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {service.faqs.map(([question, answer]) => (
              <article key={question} className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="font-extrabold text-navy">{question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Related services</p>
              <h2 className="mt-2 text-2xl font-extrabold text-navy">Build an integrated research workflow.</h2>
            </div>
            <Link href="/molecular-services" className="font-bold text-cyandark hover:text-navy">View all services →</Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {relatedServices.map((related) => (
              <Link key={related.slug} href={`/molecular-services/${related.slug}`} className="rounded-xl border border-slate-200 bg-graybg p-5 hover:border-navy/30">
                <h3 className="font-extrabold text-navy">{related.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{related.shortDescription}</p>
              </Link>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
            Services are offered for defined research projects. They are not presented as clinical diagnostic services.
          </p>
        </div>
      </section>
    </main>
  );
}
