import { SITE_URL } from '@/lib/site';
import ServicesContent from '@/components/ServicesContent';

export const metadata = {
  title: 'HBV, HCV, HIV, CCHF PCR Assays',
  description: 'Mugen-Plex real-time PCR assays for HBV, HCV, HIV-1, Influenza A&B, CCHF and Dengue/Chikungunya: targets, samples, storage. Research use only.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Mugen-Plex Real-Time PCR Assays: HBV, HCV, HIV, CCHF, Dengue',
    description: 'Lyophilized real-time PCR kits with controls and an internal control, developed in Peshawar, Pakistan. Research use only.',
    url: `${SITE_URL}/services`,
  },
};

export default function Services() {
  return <ServicesContent />;
}