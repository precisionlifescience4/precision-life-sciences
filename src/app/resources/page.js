import { SITE_URL } from '@/lib/site';
import Link from 'next/link';

export const metadata = {
  title: 'PCR Learning Resources',
  description: 'Educational PCR videos, protocols and product resources from Precision Life Sciences.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'PCR Learning Resources | Precision Life Sciences',
    description: 'Watch clear, concise educational videos about PCR fundamentals, quality and interpretation.',
    url: `${SITE_URL}/resources`,
  },
};

const VIDEOS = [
  {
    title: 'How PCR Copies DNA Using Heat',
    label: 'PCR fundamentals',
    description: 'A concise visual introduction to the heat-driven cycle that enables PCR amplification.',
    src: '/videos/how-pcr-copies-dna-using-heat.mp4',
  },
  {
    title: 'PCR Contamination: A Quality-Control Case Study',
    label: 'Quality & evidence',
    description: 'A case study in contamination control, interpretation and why PCR results need rigorous context.',
    src: '/videos/how-pcr-contamination-fueled-the-mmr-hoax.mp4',
  },
];

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

export default function Resources() {
  return (
    <main>
      <section className="bg-graybg px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-cyandark">Learn</span>
            <h1 className="mt-2 text-4xl font-extrabold text-navy md:text-5xl">PCR, clearly explained.</h1>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-gray-600">
              Short visual lessons for laboratory staff, students and researchers.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-2">
            {VIDEOS.map((video) => (
              <article
                key={video.src}
                className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-[0_18px_55px_rgba(0,32,91,0.10)]"
              >
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full bg-navy object-cover"
                  aria-label={`Watch ${video.title}`}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-cyandark">
                    {video.label}
                  </span>
                  <h2 className="mt-2 text-xl font-extrabold leading-snug text-navy">{video.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{video.description}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Educational content only. Product-specific instructions remain in the applicable kit documentation.
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
