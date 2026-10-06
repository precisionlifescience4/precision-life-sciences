import { Inter, Sora } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { supabase } from '@/lib/supabase';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sora = Sora({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-sora' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mugen-Plex Real-Time PCR Kits | Precision Life Sciences',
    template: '%s | Precision Life Sciences',
  },
  description: 'Mugen-Plex real-time PCR assays for HBV, HCV, HIV, Influenza A&B, CCHF and Dengue/Chikungunya, developed in Peshawar, Pakistan. For research use only.',
  keywords: ['Mugen-Plex', 'real-time PCR kits Pakistan', 'molecular diagnostics Peshawar', 'HBV PCR kit', 'HCV PCR kit', 'HIV PCR kit', 'CCHF PCR kit', 'Dengue PCR kit', 'Chikungunya PCR kit', 'Precision Life Sciences'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Mugen-Plex Real-Time PCR Kits | Precision Life Sciences',
    description: 'Real-time PCR assays for HBV, HCV, HIV, Influenza A&B, CCHF and Dengue/Chikungunya, developed in Peshawar, Pakistan.',
    url: SITE_URL,
    siteName: 'Precision Life Sciences',
    locale: 'en_PK',
    type: 'website',
  },
};
export default async function RootLayout({ children }) {
  const { data: settings } = await supabase.from('settings').select('*').eq('id', 1).single();

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Precision Life Sciences (Private) Limited',
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    description: 'Peshawar-based developer of Mugen-Plex real-time PCR assays for laboratory use.',
    ...(settings?.email && { email: settings.email }),
    ...(settings?.phone && { telephone: settings.phone }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office#09, Police Colony, Nasir Bagh Road',
      addressLocality: 'Peshawar',
      addressRegion: 'Khyber Pakhtunkhwa',
      addressCountry: 'PK',
    },
    ...([settings?.facebook, settings?.instagram, settings?.youtube].some(Boolean) && {
      sameAs: [settings?.facebook, settings?.instagram, settings?.youtube].filter(Boolean),
    }),
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }}
        />
        <Navbar settings={settings} />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}