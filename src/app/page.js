'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import TrustBadges from '@/components/TrustBadges';
import Gallery from '@/components/Gallery';
import MyeloidRange from '@/components/MyeloidRange';
import TM from '@/components/TM';
export default function Home() {
  const [services, setServices] = useState([]);
  const [content, setContent] = useState({});

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(setServices);
    fetch('/api/content').then(r => r.json()).then(setContent);
  }, []);

  const colorMap = {
    hbv: { border: 'border-hbv', text: 'text-hbv', bg: 'bg-hbv' },
    hcv: { border: 'border-hcv', text: 'text-hcv', bg: 'bg-hcv' },
    hiv: { border: 'border-hiv', text: 'text-hiv', bg: 'bg-hiv' },
    flu: { border: 'border-flu', text: 'text-flu', bg: 'bg-flu' },
    cchf: { border: 'border-cchf', text: 'text-cchf', bg: 'bg-cchf' },
    navy: { border: 'border-navy', text: 'text-navy', bg: 'bg-navy' },
  };

  const stats = [
    { value: content.stat1_value || '6+', label: content.stat1_label || 'Molecular Diagnostics' },
    { value: content.stat2_value || '100%', label: content.stat2_label || 'Locally Developed' },
    { value: content.stat3_value || '3+', label: content.stat3_label || 'Institutional Partners' },
    { value: content.stat4_value || '24/7', label: content.stat4_label || 'Technical Support' },
  ];

  const capabilities = [
    { title: content.cap1_title || 'Molecular Assay Development', desc: content.cap1_desc || '' },
    { title: content.cap2_title || 'Diagnostic Product Development', desc: content.cap2_desc || '' },
    { title: content.cap3_title || 'Laboratory Implementation', desc: content.cap3_desc || '' },
    { title: content.cap4_title || 'Local Technical Support', desc: content.cap4_desc || '' },
  ];

  return (
    <main className="overflow-hidden">
      {/* HERO */}
        <section className="relative bg-navy text-white pt-16 pb-32 px-4 text-center">
        <div className="absolute inset-0 bg-navy" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-hbv via-hcv to-cchf" />

               <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="relative z-10"
        >
          <p className="text-cyan text-sm md:text-base font-bold tracking-[0.25em] uppercase mb-5">
            {content.hero_subtitle || 'Real-Time PCR Assay Portfolio'}
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <TM text={content.hero_title || 'Mugen-Plex'} />
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            {content.hero_description || 'Real-time PCR assays developed in Pakistan, built for laboratories that cannot afford to guess.'}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              href="/services"
              className="bg-cyan text-navy px-8 py-4 rounded-full font-bold shadow-lg shadow-cyan/30 hover:shadow-cyan/50 hover:scale-105 transition-all"
            >
              Explore the Portfolio
            </Link>
            <Link
              href="/contact"
              className="border border-white/40 px-8 py-4 rounded-full font-bold hover:bg-white hover:text-navy transition-all"
            >
              Commercial Enquiry
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
          className="relative z-10 flex flex-wrap justify-center gap-x-8 gap-y-3 mt-16 text-sm font-semibold tracking-wide"
        >
          {[
            { n: 'HBV', c: 'bg-hbv' },
            { n: 'HCV', c: 'bg-hcv' },
            { n: 'HIV', c: 'bg-hiv' },
            { n: 'INFLUENZA A&B', c: 'bg-flu' },
            { n: 'CCHF', c: 'bg-cchf' },
          ].map((a) => (
            <span key={a.n} className="flex items-center gap-2 text-gray-200">
              <span className={`w-2.5 h-2.5 rounded-full ${a.c}`} />
              {a.n}
            </span>
          ))}
        </motion.div>
      </section>

      {/* PRODUCT LINEUP IMAGE */}
      <section className="bg-white py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
        >
          <Image
            src={content.img_product_lineup || '/images/product-lineup.png'}
            alt="Mugen-Plex Real-Time PCR Assay Lineup"
            width={1536}
            height={670}
            className="w-full h-auto"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
            >
              <p className="text-4xl font-extrabold text-navy">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1 tracking-wide">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRODUCT PORTFOLIO */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-cyandark font-semibold text-sm tracking-widest uppercase">Product Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-2">
            One Family. Many Assays. Total Consistency.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-4">
            Every Mugen-Plex kit shares the same reagent structure, control sets and packaging —
            distinguished only by its assay-specific colour.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services?.filter(s => s.slug !== 'support' && !/development/i.test(s.price || '')).map((s, i) => {
            const c = colorMap[s.color] || colorMap.navy;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className={`relative bg-white border-2 ${c.border} rounded-2xl p-7 shadow-sm hover:shadow-xl transition-shadow group`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${c.bg}`} />
                <span className={`inline-block text-xs font-bold tracking-widest uppercase ${c.text} mb-3`}>
                  {s.slug}
                </span>
                <h3 className="font-bold text-navy text-lg mb-2 leading-snug">{s.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">{s.price}</span>
                  <Link href="/services" className={`text-xs font-bold ${c.text} group-hover:translate-x-1 transition-transform inline-block`}>
                    Learn more →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
      <MyeloidRange />
      <TrustBadges />

      {/* CAPABILITIES */}
      <section className="bg-graybg py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-cyandark font-semibold text-sm tracking-widest uppercase">Beyond the Kit</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-2">
              Full-Cycle Diagnostic Capability
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: 'easeOut' }}
                className="bg-white rounded-xl p-6 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan/10 text-cyandark font-extrabold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-navy mb-1">{cap.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-5xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-cyandark font-semibold text-sm tracking-widest uppercase">Why Precision Life Sciences</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-2 mb-6">
            Practical Science. Reliable Support.
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {content.why_choose_text || 'A growing portfolio of molecular diagnostics and research services, with accessible technical support.'}
          </p>
          <div className="flex items-center justify-center gap-10 mt-10 flex-wrap opacity-80">
            <Image src={content.img_partner_kmu || '/images/partner-kmu.png'} alt="KMU" width={90} height={45} className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
            <Image src={content.img_partner_bq || '/images/partner-bq.png'} alt="BQ Pharma" width={100} height={45} className="h-9 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
            <Image src={content.img_partner_dgst || '/images/partner-dgst.png'} alt="DGST" width={90} height={90} className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
          </div>
        </motion.div>
      </section>
 
       <Gallery />

      {/* CTA BANNER */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-navy text-white text-center py-20 px-4"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{content.cta_title || 'Ready to bring Mugen-Plex to your lab?'}</h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
          {content.cta_description || 'Get in touch for pricing and technical collaboration.'}
        </p>
        <Link
          href="/contact"
          className="bg-cyan text-navy px-8 py-4 rounded-full font-bold shadow-lg shadow-cyan/30 hover:scale-105 transition-transform inline-block"
        >
          Contact Our Team
        </Link>
      </motion.section>
    </main>
  );
}