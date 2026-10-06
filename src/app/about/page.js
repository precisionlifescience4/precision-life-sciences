import { SITE_URL } from '@/lib/site';
import AboutContent from '@/components/AboutContent';

export const metadata = {
  title: 'About Us – Molecular Diagnostics',
  description: 'Peshawar-based molecular diagnostics company developing Mugen-Plex real-time PCR assays with Khyber Medical University, BQ Pharma and DGST.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Precision Life Sciences, Peshawar',
    description: 'A Peshawar-based molecular diagnostics company behind the Mugen-Plex real-time PCR assay portfolio.',
    url: `${SITE_URL}/about`,
  },
};

export default function About() {
  return <AboutContent />;
}