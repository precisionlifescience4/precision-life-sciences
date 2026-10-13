import { SITE_URL } from '@/lib/site';
import ServicesContent from '@/components/ServicesContent';

export const metadata = {
  title: 'PCR Assays, Sanger Sequencing & Molecular Services',
  description: 'Explore Mugen-Plex RUO PCR assays, respiratory and meningitis panel concepts in development, and commercial molecular research services.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'PCR Assays, Sanger Sequencing & Molecular Services',
    description: 'Explore Mugen-Plex RUO assays, respiratory and meningitis panel concepts in development, and molecular research services.',
    url: `${SITE_URL}/services`,
  },
};

export default function Services() {
  return <ServicesContent />;
}
