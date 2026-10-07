'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [settings, setSettings] = useState(null);
  const [content, setContent] = useState({});

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings);
    fetch('/api/content').then(r => r.json()).then(setContent);
  }, []);

  return (
    <footer className="bg-navy text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <Image src="/images/logo-dark.svg" alt="Precision Life Sciences" width={180} height={45} className="mb-4" />
          <p className="text-gray-300 text-sm">
            {content.footer_about || 'Peshawar-based developer of Mugen-Plex real-time PCR assays for laboratory use. Research Use Only.'}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/about" className="hover:text-cyan transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-cyan transition-colors">Services</Link></li>
            <li><Link href="/resources" className="hover:text-cyan transition-colors">Resources</Link></li>
            <li><Link href="/contact" className="hover:text-cyan transition-colors">Contact</Link></li>
          </ul>
        </div>
             <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              {settings?.email ? (
                <a href={`mailto:${settings.email}`} className="hover:text-cyan transition-colors">{settings.email}</a>
              ) : 'Email coming soon'}
            </li>
            <li>
              {settings?.phone ? (
                <a href={`tel:${settings.phone}`} className="hover:text-cyan transition-colors">{settings.phone}</a>
              ) : 'Phone coming soon'}
            </li>
            <li>
              {settings?.address ? (
                settings?.maps_link ? (
                  <a href={settings.maps_link} target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">{settings.address}</a>
                ) : settings.address
              ) : 'Address coming soon'}
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
          <p>
            © {new Date().getFullYear()} {content.company_legal_name || 'Precision Life Sciences'}.
            {content.company_reg_number ? ` SECP Company Registration No. ${content.company_reg_number}.` : ''} For Research Use Only.
            {' '}Mugen-Plex™ — trademark application in progress.
          </p>
          <p>
            Developed by{' '}
            <a
              href="https://share.google/XP6L5VgALEooH6F9v"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline font-medium"
            >
              Ibadullah
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}