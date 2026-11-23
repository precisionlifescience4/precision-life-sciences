import { SITE_URL } from '@/lib/site';
import ServicesContent from '@/components/ServicesContent';

export const metadata = {
  title: 'PCR Assays, Primer Design & Molecular Biology Services',
  description: 'Explore Mugen-Plex RUO PCR assays, the authorised Janzy nucleic-acid detection-kit catalogue, and research services including NGS, Sanger sequencing, primer design and oligonucleotide synthesis, cloning, PCR cleanup and biobanking.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'PCR Assays, NGS & Molecular Biology Services',
    description: 'Explore Mugen-Plex RUO assays, the authorised Janzy nucleic-acid detection-kit catalogue, plus sequencing, primer design, cloning and sample-preparation services.',
    url: `${SITE_URL}/services`,
  },
};

export default function Services() {
  return <ServicesContent />;
}
