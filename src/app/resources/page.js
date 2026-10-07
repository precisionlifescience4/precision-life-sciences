import { SITE_URL } from '@/lib/site';
import Link from 'next/link';

export const metadata = {
  title: 'PCR Learning Resources',
  description: 'Educational PCR video tutorials, protocols and product datasheets from Precision Life Sciences. Coming soon.',
  alternates: { canonical: '/resources' },
};

const SECTIONS = [
  {
    title: 'Video Tutorials',
    text: 'Short educational videos on real-time PCR: sample preparation, setting up a run, and interpreting results.',
    icon: 'M8 5v14l11-7z',
  },
  {
    title: 'Product Datasheets',
    text: 'Technical datasheets and instructions for use for each Mugen-Plex assay.',
    icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 13h8M8 17h8',
  },
  {
    title: 'Protocols & Guides',
    text: 'Practical guides for laboratory set-up, quality control and good PCR practice.',
    icon: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5z',
  },
];

export default function Resources() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-cyandark font-semibold text-sm tracking-widest uppercase">Learn</span>
        <h1 className="text-4xl font-bold text-navy mt-2 mb-4">Resources &amp; Education</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We are preparing educational material on real-time PCR and molecular diagnostics, free for laboratory
          staff, students and researchers. It will appear here as it is published.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {SECTIONS.map((s) => (
          <div key={s.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <span className="w-11 h-11 rounded-full bg-cyan/10 text-cyandark flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d={s.icon} />
              </svg>
            </span>
            <h2 className="font-bold text-navy mb-2">{s.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{s.text}</p>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Coming soon</span>
          </div>
        ))}
      </div>

      <div className="bg-graybg rounded-xl p-6 mt-10 text-center">
        <p className="text-navy font-semibold mb-1">Looking for something specific?</p>
        <p className="text-sm text-gray-600 mb-4">Tell us what material would help your laboratory and we will prioritise it.</p>
        <Link href="/contact" className="inline-block bg-navy text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-navylight transition-colors">
          Contact Us
        </Link>
      </div>
    </main>
  );
}
