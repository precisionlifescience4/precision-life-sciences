'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FALLBACK_BADGES = [
  { id: 'ruo', title: 'Clear RUO positioning', description: 'Product status is stated consistently across the portfolio and customer journey.' },
  { id: 'format', title: 'Consistent 48-test format', description: 'A shared presentation helps laboratories move between assays with less friction.' },
  { id: 'storage', title: '2–8 °C storage', description: 'The stated storage range is surfaced clearly where customers compare products.' },
  { id: 'support', title: 'Pakistan-based support', description: 'A local team is available for product information, research discussion and follow-up.' },
];

export default function TrustBadges() {
  const [badges, setBadges] = useState(FALLBACK_BADGES);

  useEffect(() => {
    fetch('/api/trust-badges')
      .then((response) => response.json())
      .then((data) => setBadges(Array.isArray(data) && data.length ? data : FALLBACK_BADGES))
      .catch(() => setBadges(FALLBACK_BADGES));
  }, []);

  const accents = ['bg-hbv', 'bg-hcv', 'bg-hiv', 'bg-flu', 'bg-cchf'];

  return (
    <section className="bg-navy py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-end justify-between flex-wrap gap-4 mb-14 border-b border-white/10 pb-6"
        >
          <div>
            <span className="text-cyan font-semibold text-xs tracking-[0.2em] uppercase">What stays consistent</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
              A clearer experience from carton to enquiry.
            </h2>
          </div>
          <span className="text-gray-500 text-sm hidden md:block">
            {String(badges.length).padStart(2, '0')} credentials
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {badges.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
              className="relative px-6 py-2 md:border-l first:border-l-0 border-white/10"
            >
              <span className={`absolute top-0 left-6 md:left-6 w-8 h-[3px] ${accents[i % accents.length]}`} />
              <p className="text-white/20 font-extrabold text-4xl mb-4 mt-4 font-[family-name:var(--font-sora)]">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="text-white font-bold mb-2 text-base leading-snug">{b.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
