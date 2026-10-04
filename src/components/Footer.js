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
            {content.footer_about || 'Molecular diagnostic products for laboratory use.'}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/about" className="hover:text-cyan transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-cyan transition-colors">Services</Link></li>
            <li><Link href="/contact" className="hover:text-cyan transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>{settings?.email || 'Email coming soon'}</li>
            <li>{settings?.phone || 'Phone coming soon'}</li>
            <li>{settings?.address || 'Address coming soon'}</li>
          </ul>
          <div className="flex gap-4 mt-4 text-sm">
            {settings?.facebook && <a href={settings.facebook} target="_blank" className="hover:text-cyan">Facebook</a>}
            {settings?.instagram && <a href={settings.instagram} target="_blank" className="hover:text-cyan">Instagram</a>}
            {settings?.youtube && <a href={settings.youtube} target="_blank" className="hover:text-cyan">YouTube</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} {content.company_legal_name || 'Precision Life Sciences'}. For Research Use Only.
      </div>
    </footer>
  );
}