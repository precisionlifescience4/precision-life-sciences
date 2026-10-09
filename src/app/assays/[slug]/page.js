import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INFECTIOUS_ASSAYS, getInfectiousAssay } from '@/lib/assays';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return INFECTIOUS_ASSAYS.map((assay) => ({ slug: assay.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const assay = getInfectiousAssay(slug);
  if (!assay) return {};

  const title = `${assay.shortName} Real-Time PCR Assay (RUO)`;
  const description = `${assay.fullName} for ${assay.researchArea}, presented in ${assay.formats} with ${assay.storage} storage.`;

  return {
    title,
    description,
    alternates: { canonical: `/assays/${assay.slug}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/assays/${assay.slug}`,
      images: [{ url: assay.image, alt: `${assay.fullName} carton` }],
    },
  };
}

export default async function AssayPage({ params }) {
  const { slug } = await params;
  const assay = getInfectiousAssay(slug);
  if (!assay) notFound();

  const relatedAssays = INFECTIOUS_ASSAYS.filter((item) => item.slug !== assay.slug).slice(0, 3);
  const pageUrl = `${SITE_URL}/assays/${assay.slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${pageUrl}#product`,
        name: assay.fullName,
        description: `A research-use-only real-time PCR assay for ${assay.researchArea}.`,
        url: pageUrl,
        image: `${SITE_URL}${assay.image}`,
        category: 'Research-use-only real-time PCR assay',
        brand: { '@type': 'Brand', name: 'Mugen-Plex' },
        manufacturer: {
          '@type': 'Organization',
          name: 'Precision Life Sciences (Private) Limited',
          url: SITE_URL,
        },
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Research-use status', value: 'RUO' },
          { '@type': 'PropertyValue', name: 'Kit formats', value: assay.formats },
          { '@type': 'PropertyValue', name: 'Specimen type', value: assay.specimen },
          { '@type': 'PropertyValue', name: 'Storage', value: assay.storage },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Assays & Services', item: `${SITE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: assay.shortName, item: pageUrl },
        ],
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
            <Link href="/services#infectious" className="hover:text-navy">Assays</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page" className="font-semibold text-navy">{assay.shortName}</span>
          </nav>

          <div className="grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Mugen-Plex™ infectious disease</p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy md:text-5xl">
                {assay.shortName} Real-Time PCR Assay
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                A consistent Mugen-Plex RUO kit format for {assay.researchArea}, supported by a Pakistan-based technical team.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/contact?topic=enquire&product=${encodeURIComponent(assay.fullName)}`}
                  className="rounded-full bg-navy px-6 py-3 font-bold text-white transition-colors hover:bg-navylight"
                >
                  Request information
                </Link>
                <a
                  href={assay.sds}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-navy/25 bg-white px-6 py-3 font-bold text-navy transition-colors hover:border-navy"
                >
                  View approved SDS
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[3/2]">
                <Image
                  src={assay.image}
                  alt={`${assay.fullName} carton in ${assay.formats}`}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 540px"
                  className="object-contain p-3"
                />
              </div>
              <div className="h-1.5" style={{ backgroundColor: assay.color }} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Assay summary">
            {[
              ['Intended use', 'Research use only'],
              ['Specimen type', assay.specimen],
              ['Storage', assay.storage],
              ['Kit formats', assay.formats],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-graybg p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
                <p className="mt-2 font-extrabold text-navy">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <article>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Assay overview</p>
              <h2 className="mt-2 text-3xl font-extrabold text-navy">Built to feel familiar across the Mugen-Plex family.</h2>
              <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
                <p>
                  The {assay.fullName} is presented for trained laboratory personnel conducting {assay.researchArea}. Its packaging follows the same core Mugen-Plex system used across the infectious-disease portfolio, while a dedicated assay colour supports quick identification.
                </p>
                <p>
                  The public product information is deliberately focused on practical selection details: intended RUO status, specimen type, storage condition and available kit formats. Reaction conditions, controls and assay-specific handling requirements remain in the current product documentation supplied by Precision Life Sciences.
                </p>
                <p>
                  Contact the technical team before ordering or planning a study to confirm the current configuration, documentation and suitability for the proposed research workflow.
                </p>
              </div>
            </article>

            <aside className="rounded-2xl border border-navy/15 bg-navy p-7 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">Documentation</p>
              <h2 className="mt-3 text-2xl font-extrabold">Start with the approved safety information.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Download the current controlled SDS or ask for the latest assay-specific product information for your research team.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a href={assay.sds} target="_blank" rel="noreferrer" className="rounded-full bg-cyan px-5 py-3 text-center text-sm font-bold text-navy hover:bg-white">
                  Download SDS
                </a>
                <Link href={`/contact?topic=datasheet&product=${encodeURIComponent(assay.fullName)}`} className="rounded-full border border-white/30 px-5 py-3 text-center text-sm font-bold text-white hover:bg-white hover:text-navy">
                  Request product information
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-graybg px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Related assays</p>
              <h2 className="mt-2 text-2xl font-extrabold text-navy">Continue through the infectious portfolio.</h2>
            </div>
            <Link href="/services#infectious" className="font-bold text-cyandark hover:text-navy">View all assays →</Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {relatedAssays.map((related) => (
              <Link key={related.slug} href={`/assays/${related.slug}`} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-navy/30">
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: related.color }} />
                <h3 className="mt-3 font-extrabold text-navy">{related.shortName} Real-Time PCR Assay</h3>
                <p className="mt-2 text-sm text-slate-600">{related.specimen} · {related.storage} · RUO</p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-xs leading-relaxed text-slate-500">
            Mugen-Plex products are for research use only and are not intended for use in diagnostic procedures.
          </p>
        </div>
      </section>
    </main>
  );
}
