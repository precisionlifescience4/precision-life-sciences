import { SITE_URL } from '@/lib/site';
import ServicesContent from '@/components/ServicesContent';

export const metadata = {
  title: 'PCR Assays, Primer Design & Molecular Biology Services',
  description: 'Explore Mugen-Plex RUO PCR assays and research services including NGS, Sanger sequencing, primer design and oligonucleotide synthesis, cloning, PCR cleanup and biobanking.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'PCR Assays, NGS & Molecular Biology Services',
    description: 'Explore Mugen-Plex RUO assays plus sequencing, primer design and oligonucleotide synthesis, cloning and sample-preparation services.',
    url: `${SITE_URL}/services`,
  },
};

export default function Services() {
  return <ServicesContent />;
}
