import { SITE_URL } from '@/lib/site';
import AboutContent from '@/components/AboutContent';

export const metadata = {
  title: 'About Us – Molecular Diagnostics',
  description: 'SECP-registered Peshawar company (CUIN 0348054) developing Mugen-Plex real-time PCR assays with Khyber Medical University, BQ Pharma and DGST.',
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