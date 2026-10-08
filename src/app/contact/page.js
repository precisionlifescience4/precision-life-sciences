import { SITE_URL } from '@/lib/site';
import ContactContent from '@/components/ContactContent';

export const metadata = {
  title: 'Contact & Enquiries – Peshawar',
  description: 'Contact Precision Life Sciences in Peshawar for product information, commercial molecular-service quotations, technical support or research collaboration.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Precision Life Sciences, Peshawar',
    description: 'Product enquiries, commercial molecular-service quotations and technical support from Precision Life Sciences.',
    url: `${SITE_URL}/contact`,
  },
};

export default function Contact() {
  return <ContactContent />;
}
