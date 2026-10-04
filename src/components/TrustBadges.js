'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const icons = {
  flag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="3" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" />
      <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  ),
};

export default function TrustBadges() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    fetch('/api/trust-badges').then(r => r.json()).then(setBadges);
  }, []);

  if (!badges.length) return null;

  return (
    <section className="bg-navy py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-cyan font-semibold text-sm tracking-widest uppercase">Trust & Credibility</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
            Built on Transparency and Collaboration
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {badges.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-cyan/15 text-cyan flex items-center justify-center mb-4">
                {icons[b.icon] || icons.check}
              </div>
              <h3 className="text-white font-bold mb-2 text-sm">{b.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}