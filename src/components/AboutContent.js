'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Team from '@/components/Team';
import CeoSection, { DEFAULT_CEO } from '@/components/CeoSection';

export default function AboutContent() {
  const [content, setContent] = useState({});

  useEffect(() => {
    fetch('/api/content').then(r => r.json()).then(setContent);
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <motion.h1 {...fadeUp} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-4xl font-bold text-navy mb-6">
        About Precision Life Sciences
      </motion.h1>
      <motion.p {...fadeUp} transition={{ delay: 0.12, duration: 0.6, ease: 'easeOut' }} className="text-gray-600 mb-6 leading-relaxed">
        {content.about_intro || 'Precision Life Sciences (Private) Limited is a Peshawar-based life-sciences company developing practical molecular diagnostics. Our Mugen-Plex real-time PCR assays were developed in Pakistan in collaboration with Khyber Medical University, BQ Pharma and DGST, and are designed so that laboratories can run reliable viral testing with a consistent kit format, complete controls and local technical support.'}
      </motion.p>

      <motion.h2 {...fadeUp} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-2xl font-bold text-navy mt-10 mb-4">
        Why Choose Us
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-4 text-gray-600">
        {[
          'A growing portfolio of molecular diagnostics',
          'Consistent kit presentation & colour coding',
          'Complete control sets',
          'Locally developed diagnostics and research services',
          'Accessible technical support',
          'Collaboration with KMU, BQ Pharma & DGST',
        ].map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
            className="bg-graybg p-4 rounded-lg"
          >
            {item}
          </motion.div>
        ))}
      </div>

      <motion.h2 {...fadeUp} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-2xl font-bold text-navy mt-10 mb-4">
        Who We Serve
      </motion.h2>
      <motion.p {...fadeUp} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-gray-600 leading-relaxed">
        {content.who_serve_text || 'Clinical and research laboratories, hospitals, diagnostic centres, universities and research institutes that need dependable real-time PCR reagents, supplied and supported locally.'}
      </motion.p>

      <CeoSection content={content} />

      <Team excludeName={content.ceo_name || DEFAULT_CEO.name} />

      <motion.div {...fadeUp} transition={{ duration: 0.6, ease: 'easeOut' }} className="mt-16 pt-10 border-t border-gray-100">
        <p className="text-sm text-gray-500 mb-6 text-center">Developed With & Funded By</p>
        <div className="flex items-center justify-center gap-12 flex-wrap">
          <Image src={content.img_partner_kmu || '/images/partner-kmu.png'} alt="KMU" width={90} height={45} className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
          <Image src={content.img_partner_bq || '/images/partner-bq.png'} alt="BQ Pharma" width={100} height={45} className="h-9 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
          <Image src={content.img_partner_dgst || '/images/partner-dgst.png'} alt="DGST" width={90} height={90} className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
        </div>
      </motion.div>
    </main>
  );
}