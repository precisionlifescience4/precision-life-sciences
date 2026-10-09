import { SITE_URL } from '@/lib/site';
import Link from 'next/link';

export const metadata = {
  title: 'Product Resources & Safety Data Sheets',
  description: 'Approved Mugen-Plex safety data sheets and product resources from Precision Life Sciences.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'PCR Resources & Safety Data Sheets | Precision Life Sciences',
    description: 'Access approved Mugen-Plex safety data sheets and product resources from Precision Life Sciences.',
    url: `${SITE_URL}/resources`,
  },
};

const RESOURCE_ROUTES = [
  {
    title: 'Product Datasheets',
    text: 'Ask for the current product information available for the Mugen-Plex assay relevant to your work.',
    label: 'Request product information',
    href: '/contact?topic=datasheet',
    icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 13h8M8 17h8',
  },
  {
    title: 'Protocols & Guides',
    text: 'Discuss laboratory set-up, quality control or a research workflow with the PLS team.',
    label: 'Ask a technical question',
    href: '/contact?topic=project',
    icon: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5z',
  },
];

const SAFETY_DATA_SHEETS = [
  {
    assay: 'HBV',
    status: 'Approved SDS · Revision 1.0',
    href: '/sds/Mugen-Plex-HBV-SDS-v1.0.pdf',
  },
  {
    assay: 'HCV',
    status: 'Approved SDS · Revision 1.0',
    href: '/sds/Mugen-Plex-HCV-SDS-v1.0.pdf',
  },
  {
    assay: 'HIV',
    status: 'Approved SDS · Revision 1.0',
    href: '/sds/Mugen-Plex-HIV-SDS-v1.0.pdf',
  },
  {
    assay: 'Dengue / Chikungunya',
    status: 'Approved SDS · Revision 1.0',
    href: '/sds/Mugen-Plex-Dengue-Chikungunya-SDS-v1.0.pdf',
  },
  {
    assay: 'Influenza A/B',
    status: 'Approved SDS · Revision 1.0',
    href: '/sds/Mugen-Plex-Influenza-AB-SDS-v1.0.pdf',
  },
  {
    assay: 'Dengue Serotyping',
    status: 'Approved SDS · Revision 1.0',
    href: '/sds/Mugen-Plex-Dengue-Serotyping-SDS-v1.0.pdf',
  },
  {
    assay: 'CCHF',
    status: 'Approved SDS · Revision 1.0',
    href: '/sds/Mugen-Plex-CCHF-SDS-v1.0.pdf',
  },
];

export default function Resources() {
  return (
    <main id="main-content">
      <section className="bg-graybg px-4 py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyandark">Technical resources</span>
          <h1 className="mt-2 text-4xl font-extrabold text-navy md:text-5xl">Approved product information, ready to use.</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-600">
            Download the current Mugen-Plex Safety Data Sheets or request assay-specific product information and technical guidance.
          </p>
        </div>
      </section>

      <section id="safety-data-sheets" className="scroll-mt-24 border-y border-gray-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-cyandark">Product safety</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy md:text-4xl">Safety Data Sheets</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Download the approved controlled SDS for each Mugen-Plex assay. Revision and approval status are stated inside every document.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SAFETY_DATA_SHEETS.map((sheet) => (
              <article key={sheet.href} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-cyandark">Mugen-Plex</span>
                <h3 className="mt-2 text-xl font-extrabold text-navy">{sheet.assay}</h3>
                <p className="mt-2 text-sm text-gray-500">{sheet.status}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={sheet.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-navy px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-navylight"
                  >
                    View PDF
                  </a>
                  <a
                    href={sheet.href}
                    download
                    className="rounded-full border border-navy/25 px-4 py-2 text-xs font-bold uppercase tracking-wide text-navy transition-colors hover:border-navy"
                  >
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm text-gray-600">
            Need a controlled copy or clarification?{' '}
            <Link href="/contact?topic=sds" className="font-bold text-cyandark hover:text-navy">
              Contact the PLS technical team →
            </Link>
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {RESOURCE_ROUTES.map((section) => (
              <div key={section.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-cyan/10 text-cyandark">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d={section.icon} />
                  </svg>
                </span>
                <h2 className="font-bold text-navy">{section.title}</h2>
                <p className="mb-4 mt-2 text-sm text-gray-600">{section.text}</p>
                <Link href={section.href} className="text-xs font-bold uppercase tracking-wide text-cyandark hover:text-navy">
                  {section.label} →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl bg-graybg p-6 text-center">
            <p className="mb-1 font-semibold text-navy">Looking for something specific?</p>
            <p className="mb-4 text-sm text-gray-600">
              Tell us what material would help your laboratory and we will prioritise it.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navylight"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
