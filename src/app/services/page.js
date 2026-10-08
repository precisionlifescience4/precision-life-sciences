import { SITE_URL } from '@/lib/site';
import ServicesContent from '@/components/ServicesContent';

export const metadata = {
  title: 'PCR Assays, Sanger Sequencing & Molecular Services',
  description: 'Explore Mugen-Plex RUO PCR assays and commercial research services including DNA extraction, DNA/RNA quantification, PCR amplification, gel electrophoresis and Sanger sequencing.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'PCR Assays, Sanger Sequencing & Molecular Services',
    description: 'Explore Mugen-Plex RUO assays and commercial molecular research services from Precision Life Sciences.',
    url: `${SITE_URL}/services`,
  },
};

export default function Services() {
  return <ServicesContent />;
}
