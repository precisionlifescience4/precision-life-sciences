'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Assays & Services' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => (href === '/' ? pathname === href : pathname.startsWith(href));

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-[0_5px_24px_rgba(0,32,91,0.07)] backdrop-blur"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Precision Life Sciences home">
          <Image src="/images/logo.svg" alt="Precision Life Sciences" width={210} height={54} priority />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-navy lg:flex" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`border-b-2 py-2 transition-colors ${
                isActive(item.href)
                  ? 'border-cyan text-navy'
                  : 'border-transparent text-slate-600 hover:border-cyan/40 hover:text-navy'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact?topic=enquire"
          className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-navylight lg:inline-flex"
        >
          Request information
        </Link>
        <button
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:bg-graybg lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>
      {open && (
        <motion.nav
          id="mobile-navigation"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="flex flex-col gap-1 overflow-hidden border-t border-slate-100 px-4 pb-5 pt-3 font-semibold text-navy lg:hidden"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-lg px-3 py-3 ${isActive(item.href) ? 'bg-graybg text-navy' : 'text-slate-600'}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact?topic=enquire"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-navy px-5 py-3 text-center text-sm font-bold text-white"
          >
            Request information
          </Link>
        </motion.nav>
      )}
    </motion.header>
  );
}
