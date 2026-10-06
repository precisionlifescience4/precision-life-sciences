import AboutContent from '@/components/AboutContent';

export const metadata = {
  title: 'About Us',
  description: 'Precision Life Sciences is a Peshawar-based molecular diagnostics company developing Mugen-Plex real-time PCR assays with Khyber Medical University, BQ Pharma and DGST.',
  alternates: { canonical: 'https://precisionlifesciences.com.pk/about' },
  openGraph: {
    title: 'About Precision Life Sciences',
    description: 'A Pakistan-based molecular diagnostics company behind the Mugen-Plex real-time PCR assay portfolio.',
    url: 'https://precisionlifesciences.com.pk/about',
  },
};

export default function About() {
  return <AboutContent />;
}