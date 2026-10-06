import ServicesContent from '@/components/ServicesContent';

export const metadata = {
  title: 'Mugen-Plex Real-Time PCR Assays',
  description: 'Mugen-Plex real-time PCR assays for HBV, HCV, HIV-1, Influenza A&B, CCHF and Dengue/Chikungunya, with target genes, sample types, turnaround times and storage conditions. For research use only.',
  alternates: { canonical: 'https://precisionlifesciences.com.pk/services' },
  openGraph: {
    title: 'Mugen-Plex Real-Time PCR Assay Portfolio',
    description: 'HBV, HCV, HIV, Influenza A&B and CCHF — five real-time PCR assays, one coherent product family.',
    url: 'https://precisionlifesciences.com.pk/services',
  },
};

export default function Services() {
  return <ServicesContent />;
}