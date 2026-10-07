import { SITE_URL } from '@/lib/site';
import ServicesContent from '@/components/ServicesContent';

export const metadata = {
  title: 'Mugen-Plex PCR Assays & Molecular Services',
  description: 'Mugen-Plex real-time PCR assays for HBV, HCV, HIV, Dengue/Chikungunya, Influenza A&B and CCHF, plus molecular-biology services. Research use only.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Mugen-Plex Real-Time PCR Assays & Molecular Services',
    description: 'Explore the Mugen-Plex infectious-disease and Myeloid portfolios, plus molecular-biology services from Precision Life Sciences. Research use only.',
    url: `${SITE_URL}/services`,
  },
};

export default function Services() {
  return <ServicesContent />;
}
