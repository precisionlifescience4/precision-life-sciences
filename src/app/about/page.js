import AboutContent from '@/components/AboutContent';

export const metadata = {
  title: 'About Us | Precision Life Sciences',
  description: 'Learn about Precision Life Sciences, a Pakistan-based molecular diagnostics company behind the Mugen-Plex real-time PCR assay portfolio for HBV, HCV, HIV, Influenza A&B and CCHF.',
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