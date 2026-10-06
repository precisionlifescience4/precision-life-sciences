import { SITE_URL } from '@/lib/site';
import ContactContent from '@/components/ContactContent';

export const metadata = {
  title: 'Contact & Enquiries – Peshawar',
  description: 'Contact Precision Life Sciences in Peshawar for pricing, bulk orders, distribution, technical support or research collaboration.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Precision Life Sciences, Peshawar',
    description: 'Pricing, bulk orders, distribution and technical support for Mugen-Plex real-time PCR assays.',
    url: `${SITE_URL}/contact`,
  },
};

export default function Contact() {
  return <ContactContent />;
}