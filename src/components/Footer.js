'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { LEGAL_NAME, SECP_CUIN } from '@/lib/site';

const LINK_GROUPS = [
  {
    title: 'Products',
    links: [
      ['Infectious disease assays', '/services#infectious'],
      ['Mugen-Prep extraction kits', '/extraction-kits'],
      ['Myeloid assay pipeline', '/services#myeloid'],
      ['Emergency research panels', '/services#emergency-panels'],
      ['All assays & services', '/services'],
      ['Request a sample kit', '/request-sample'],
    ],
  },
  {
    title: 'Laboratory services',
    links: [
      ['DNA extraction', '/molecular-services/dna-extraction'],
      ['DNA/RNA quantification', '/molecular-services/dna-rna-quantification'],
      ['PCR amplification', '/molecular-services/pcr-amplification'],
      ['Gel electrophoresis', '/molecular-services/gel-electrophoresis'],
      ['Sanger sequencing', '/molecular-services/sanger-sequencing'],
      ['All laboratory services', '/molecular-services'],
      ['Sample transport guidance', '/sample-transport'],
    ],
  },
  {
    title: 'Precision Life Sciences',
    links: [
      ['Home', '/'],
      ['About PLS', '/about'],
      ['Resources & safety data', '/resources'],
      ['Corporate credentials', '/resources#corporate-credentials'],
      ['Contact', '/contact'],
    ],
  },
];

const linkClass = 'inline-block py-1 transition-colors hover:text-white hover:underline underline-offset-4';

export default function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings).catch(() => setSettings({}));
  }, []);

  const publicDomainEmail = settings?.email?.toLowerCase().endsWith('@precisionlifesciences.com.pk')
    ? settings.email
    : null;

  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-6 md:pt-16">
        <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-9 md:flex-row md:items-center">
          <div>
            <Link href="/" className="inline-block rounded-sm" aria-label="Precision Life Sciences home">
              <Image src="/images/logo-dark.svg" alt="Precision Life Sciences" width={210} height={54} className="mb-4 h-auto w-[210px]" />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-slate-300">Molecular assay development and the Mugen-Plex RUO real-time PCR portfolio, based in Peshawar, Pakistan.</p>
          </div>
          <Link href="/contact?topic=enquire" className="inline-flex min-h-12 items-center justify-center gap-6 self-start rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:self-center">
            Request product information <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-9 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {LINK_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-4 text-sm font-semibold text-white">{group.title}</h2>
              <ul className="space-y-1 text-sm leading-relaxed text-slate-300">
                {group.links.map(([label, href]) => (
                  <li key={href}><Link href={href} className={linkClass}>{label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="mb-4 text-sm font-semibold text-white">Get in touch</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
              <li className="break-words">
                {publicDomainEmail ? <a href={`mailto:${publicDomainEmail}`} className={linkClass}>{publicDomainEmail}</a> : <Link href="/contact" className={linkClass}>Use the enquiry form ↗</Link>}
              </li>
              <li>
                {settings?.phone ? <a href={`tel:${settings.phone}`} className={linkClass}>{settings.phone}</a> : <Link href="/contact" className={linkClass}>Request a call ↗</Link>}
              </li>
              <li>
                {settings?.address ? (
                  settings?.maps_link ? <a href={settings.maps_link} target="_blank" rel="noopener noreferrer" className={linkClass}>{settings.address}</a> : settings.address
                ) : 'Peshawar, Khyber Pakhtunkhwa, Pakistan'}
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-300">
              {settings?.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className={linkClass}>Facebook</a>}
              {settings?.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a>}
              {settings?.youtube && <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className={linkClass}>YouTube</a>}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-xs leading-relaxed text-slate-300 md:flex-row md:items-start">
          <div className="max-w-3xl">
            <p>© {new Date().getFullYear()} {LEGAL_NAME}. <Link href="/resources#corporate-credentials" className="underline decoration-white/40 underline-offset-4 hover:text-white">SECP CUIN {SECP_CUIN}</Link>.</p>
            <p className="mt-2">RUO. Mugen-Plex™ — trademark application in progress.</p>
          </div>
          <p className="shrink-0">Developed by <a href="https://share.google/AkFM4pQJHLmPGV1o4" target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 underline-offset-4 hover:text-white">Ibadullah</a></p>
        </div>
      </div>
    </footer>
  );
}
