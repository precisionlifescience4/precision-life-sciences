import ServicesContent from '@/components/ServicesContent';

export const metadata = {
  title: 'Mugen-Plex Real-Time PCR Assays | Precision Life Sciences',
  description: 'Explore the Mugen-Plex real-time PCR assay portfolio — HBV, HCV, HIV, Influenza A&B and CCHF — complete with technical specifications, sample requirements and turnaround times.',
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