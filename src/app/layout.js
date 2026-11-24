import { Inter, Sora } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ChatAssistant from '@/components/ChatAssistant';
import { supabase } from '@/lib/supabase';
import { INCORPORATION_DATE, LEGAL_NAME, SECP_CUIN, SECP_VERIFICATION_URL, SITE_URL, SITE_NAME } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sora = Sora({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-sora' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PCR Kits, NGS & Molecular Biology Services | Precision Life Sciences',
    template: '%s | Precision Life Sciences',
  },
  description: 'Pakistan-based molecular life-science company offering Mugen-Plex RUO PCR assays, NGS and Sanger sequencing, primer design and synthesis, cloning, PCR cleanup, nucleic-acid preparation and biobanking services.',
  keywords: [
    'Precision Life Sciences Pakistan',
    'Mugen-Plex',
    'real-time PCR kits Pakistan',
    'molecular biology services Peshawar',
    'NGS services Pakistan',
    'Sanger sequencing Peshawar',
    'primer design and synthesis Pakistan',
    'cloning services Pakistan',
    'PCR cleanup Pakistan',
    'biobanking and sample storage Pakistan',
    'DNA RNA extraction kits Pakistan',
    'HBV PCR kit',
    'HCV PCR kit',
    'HIV PCR kit',
    'CCHF PCR kit',
    'Dengue PCR kit',
    'Chikungunya PCR kit',
  ],
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
  },
  verification: { google: 'gANPx2fYCeSZmO02W1kig_qUm_prTTRFZeeM8nKwH_w' },
  openGraph: {
    title: 'PCR Kits, NGS & Molecular Biology Services | Precision Life Sciences',
    description: 'Mugen-Plex RUO PCR assays plus molecular biology, sequencing, design and research support services from Peshawar, Pakistan.',
    url: SITE_URL,
    siteName: 'Precision Life Sciences',
    locale: 'en_PK',
    type: 'website',
  },
};
export default async function RootLayout({ children }) {
  const { data: settings } = await supabase.from('settings').select('*').eq('id', 1).single();
  const publicDomainEmail = settings?.email?.toLowerCase().endsWith('@precisionlifesciences.com.pk')
    ? settings.email
    : null;

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: LEGAL_NAME,
    legalName: LEGAL_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    description: 'Pakistan-based developer of Mugen-Plex research-use-only PCR assays and provider of molecular biology, sequencing and research support services.',
    foundingDate: INCORPORATION_DATE,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'SECP Corporate Unique Identification Number',
      value: SECP_CUIN,
    },
    ...(publicDomainEmail && { email: publicDomainEmail }),
    ...(settings?.phone && { telephone: settings.phone }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'R&D Laboratory, Basement, Daud Academic Block, Khyber Medical University, Phase 5, Hayatabad',
      addressLocality: 'Peshawar',
      addressRegion: 'Khyber Pakhtunkhwa',
      addressCountry: 'PK',
    },
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    sameAs: [
      SECP_VERIFICATION_URL,
      'https://www.linkedin.com/company/precision-life-sciences-pk/',
      'https://www.facebook.com/KMUPathLabs',
      settings?.facebook,
      settings?.instagram,
      settings?.youtube,
    ].filter(Boolean),
  };
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: 'PLS Pakistan',
    url: SITE_URL,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: LEGAL_NAME,
      url: SITE_URL,
    },
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable}`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replace(/</g, '\\u003c') }}
        />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
        <ChatAssistant />
      </body>
    </html>
  );
}
