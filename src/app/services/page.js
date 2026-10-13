import { SITE_URL } from '@/lib/site';
import ServicesContent from '@/components/ServicesContent';

export const metadata = {
  title: 'PCR Assays, Sanger Sequencing & Molecular Services',
  description: 'Explore Mugen-Plex RUO PCR assays, Mugen-Prep extraction kit concepts, emergency panel concepts and molecular research services.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'PCR Assays, Sanger Sequencing & Molecular Services',
    description: 'Explore Mugen-Plex RUO assays, Mugen-Prep extraction kit concepts and molecular research services.',
    url: `${SITE_URL}/services`,
  },
};

export default function Services() {
  return <ServicesContent />;
}
