'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/services', label: 'Assays', description: 'Explore the Mugen-Plex portfolio' },
  { href: '/extraction-kits', label: 'Extraction kits', description: 'Meet Mugen-Prep' },
  { href: '/molecular-services', label: 'Lab services', description: 'Build your research workflow' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About PLS' },
  { href: '/contact', label: 'Contact' },
];

function Navigation({ pathname }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const header = useRef(null);

  const isActive = (href) => href === '/services'
    ? pathname === '/services' || pathname.startsWith('/assays/')
    : href === '/molecular-services'
      ? pathname === '/sample-transport' || pathname === href || pathname.startsWith(`${href}/`)
    : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!open) return;

    const dismissOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const dismissOutside = (event) => {
      if (!header.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const dismissOnDesktop = (event) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener('keydown', dismissOnEscape);
    document.addEventListener('pointerdown', dismissOutside);
    desktop.addEventListener('change', dismissOnDesktop);
    return () => {
      document.removeEventListener('keydown', dismissOnEscape);
      document.removeEventListener('pointerdown', dismissOutside);
      desktop.removeEventListener('change', dismissOnDesktop);
    };
  }, [open]);

  return (
    <header ref={header} className="sticky top-0 z-50 border-b border-navy/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-6 lg:h-[88px]">
        <Link href="/" onClick={() => setOpen(false)} className="shrink-0 rounded-sm" aria-label="Precision Life Sciences home">
          <Image src="/images/logo.svg" alt="Precision Life Sciences" width={210} height={54} className="h-auto w-[180px] sm:w-[200px] lg:w-[180px] xl:w-[200px]" priority />
        </Link>

        <nav className="hidden items-center gap-4 text-[13px] font-semibold lg:flex xl:gap-6 xl:text-sm" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`whitespace-nowrap border-b-2 py-3 transition-colors ${isActive(item.href) ? 'border-cyandark text-navy' : 'border-transparent text-slate-600 hover:border-cyan hover:text-navy'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/request-sample" aria-current={pathname === '/request-sample' ? 'page' : undefined} className="hidden shrink-0 items-center gap-3 rounded-lg bg-navy px-4 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-navylight lg:inline-flex xl:px-5 xl:text-sm">
          Request a sample kit <span aria-hidden="true">↗</span>
        </Link>

        <button
          ref={menuButton}
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-navy/15 text-navy transition-colors hover:bg-graybg lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="max-h-[calc(100dvh-160px)] overflow-y-auto overscroll-contain border-t border-slate-100 bg-white px-5 pb-6 pt-5 shadow-xl shadow-navy/5 lg:hidden"
          aria-label="Mobile navigation"
        >
          <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Products & services</p>
          <div className="space-y-1">
            {NAV_ITEMS.slice(0, 3).map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={isActive(item.href) ? 'page' : undefined} className={`flex items-center justify-between gap-3 rounded-lg px-3 py-3 ${isActive(item.href) ? 'bg-graybg text-navy' : 'text-navy hover:bg-slate-50'}`}>
                <span><span className="block text-base font-semibold">{item.label}</span><span className="mt-1 block text-xs text-slate-500">{item.description}</span></span>
                <span aria-hidden="true" className="text-cyandark">↗</span>
              </Link>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-1 border-t border-slate-100 pt-3">
            {[{ href: '/', label: 'Home' }, ...NAV_ITEMS.slice(3)].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={(item.href === '/' ? pathname === '/' : isActive(item.href)) ? 'page' : undefined} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-graybg hover:text-navy">
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/request-sample" onClick={() => setOpen(false)} className="mt-4 flex items-center justify-between rounded-lg bg-navy px-5 py-3.5 font-semibold text-white">
            Request a sample kit <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      )}
    </header>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  // A new route resets disclosure state, including browser back/forward navigation.
  return <Navigation key={pathname} pathname={pathname} />;
}
