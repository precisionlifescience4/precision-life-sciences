'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const LAB_SERVICE_LINKS = [
  ['DNA Extraction', '/molecular-services/dna-extraction'],
  ['DNA/RNA Quantification', '/molecular-services/dna-rna-quantification'],
  ['PCR Amplification', '/molecular-services/pcr-amplification'],
  ['Gel Electrophoresis', '/molecular-services/gel-electrophoresis'],
  ['Sanger Sequencing', '/molecular-services/sanger-sequencing'],
];

export default function Footer() {
  const [settings, setSettings] = useState(null);
  const [content, setContent] = useState({});

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings).catch(() => setSettings({}));
    fetch('/api/content').then(r => r.json()).then(setContent).catch(() => setContent({}));
  }, []);

  const publicDomainEmail = settings?.email?.toLowerCase().endsWith('@precisionlifesciences.com.pk')
    ? settings.email
    : null;

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Image src="/images/logo-dark.svg" alt="Precision Life Sciences" width={180} height={45} className="mb-4" />
          <p className="text-gray-300 text-sm">
            Molecular assay development and the Mugen-Plex RUO real-time PCR portfolio, based in Peshawar, Pakistan.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-3">Laboratory Services</p>
          <ul className="space-y-2 text-sm text-gray-300">
            {LAB_SERVICE_LINKS.map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:text-cyan transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Quick Links</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-cyan transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-cyan transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-cyan transition-colors">Assays &amp; Services</Link></li>
            <li><Link href="/molecular-services" className="hover:text-cyan transition-colors">Laboratory Services</Link></li>
            <li><Link href="/resources" className="hover:text-cyan transition-colors">Resources</Link></li>
            <li><Link href="/contact" className="hover:text-cyan transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              {publicDomainEmail ? (
                <a href={`mailto:${publicDomainEmail}`} className="hover:text-cyan transition-colors">{publicDomainEmail}</a>
              ) : <Link href="/contact" className="hover:text-cyan transition-colors">Use the enquiry form →</Link>}
            </li>
            <li>
              {settings?.phone ? (
                <a href={`tel:${settings.phone}`} className="hover:text-cyan transition-colors">{settings.phone}</a>
              ) : <Link href="/contact" className="hover:text-cyan transition-colors">Request a call →</Link>}
            </li>
            <li>
              {settings?.address ? (
                settings?.maps_link ? (
                  <a href={settings.maps_link} target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">{settings.address}</a>
                ) : settings.address
              ) : 'Peshawar, Khyber Pakhtunkhwa, Pakistan'}
            </li>
          </ul>
          <div className="flex gap-4 mt-4 text-sm">
            {settings?.facebook && <a href={settings.facebook} target="_blank" className="hover:text-cyan">Facebook</a>}
            {settings?.instagram && <a href={settings.instagram} target="_blank" className="hover:text-cyan">Instagram</a>}
            {settings?.youtube && <a href={settings.youtube} target="_blank" className="hover:text-cyan">YouTube</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {content.company_legal_name || 'Precision Life Sciences'}.
            {content.company_reg_number ? ` SECP Company Registration No. ${content.company_reg_number}.` : ''} RUO.
            {' '}Mugen-Plex™ — trademark application in progress.
          </p>
          <Link href="/contact?topic=enquire" className="font-semibold text-cyan transition hover:text-white">Request product information →</Link>
        </div>
      </div>
    </footer>
  );
}
