'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ settings }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="Precision Life Sciences" width={200} height={50} priority />
        </Link>
        <nav className="hidden md:flex gap-8 font-medium text-navy">
          <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
          <Link href="/about" className="hover:text-cyan transition-colors">About Us</Link>
          <Link href="/services" className="hover:text-cyan transition-colors">Services</Link>
          <Link href="/resources" className="hover:text-cyan transition-colors">Resources</Link>
          <Link href="/contact" className="hover:text-cyan transition-colors">Contact</Link>
        </nav>
        <div className="hidden md:flex gap-3">
          {settings?.whatsapp && (
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">WhatsApp</a>
          )}
          {settings?.phone && (
            <a href={`tel:${settings.phone}`} className="bg-cyan text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">Call</a>
          )}
        </div>
        <button className="md:hidden text-navy text-2xl" onClick={() => setOpen(!open)}>☰</button>
      </div>
      {open && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="md:hidden flex flex-col gap-4 px-4 pb-4 text-navy font-medium overflow-hidden"
        >
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About Us</Link>
          <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </motion.nav>
      )}
    </motion.header>
  );
}