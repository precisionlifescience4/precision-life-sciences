import ContactContent from '@/components/ContactContent';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Precision Life Sciences for commercial and research enquiries about the Mugen-Plex real-time PCR assay portfolio. Reach us by phone, WhatsApp or email.',
  alternates: { canonical: 'https://precisionlifesciences.com.pk/contact' },
  openGraph: {
    title: 'Contact Precision Life Sciences',
    description: 'Commercial and research enquiries for the Mugen-Plex real-time PCR assay portfolio.',
    url: 'https://precisionlifesciences.com.pk/contact',
  },
};

export default function Contact() {
  return <ContactContent />;
}