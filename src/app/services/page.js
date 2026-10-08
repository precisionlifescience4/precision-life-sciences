import { SITE_URL } from '@/lib/site';
import ServicesContent from '@/components/ServicesContent';

export const metadata = {
  title: 'Mugen-Plex PCR Assays & Molecular Services',
  description: 'Mugen-Plex RUO real-time PCR assays for HBV, HCV, HIV, Dengue/Chikungunya, Influenza A&B and CCHF, plus molecular-biology services.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Mugen-Plex Real-Time PCR Assays & Molecular Services',
    description: 'Explore the Mugen-Plex RUO infectious-disease and Myeloid portfolios, plus molecular-biology services from Precision Life Sciences.',
    url: `${SITE_URL}/services`,
  },
};

export default function Services() {
  return <ServicesContent />;
}
