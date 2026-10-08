'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Team from '@/components/Team';
import CeoSection, { DEFAULT_CEO } from '@/components/CeoSection';
import InstitutionalStrip from '@/components/InstitutionalStrip';
import TM from '@/components/TM';

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
    <main>
      <section className="bg-graybg px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <motion.div {...fadeUp} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">About PLS</span>
            <h1 className="mt-3 text-4xl font-extrabold text-navy md:text-5xl">Molecular products designed closer to the laboratory.</h1>
          </motion.div>
          <motion.p {...fadeUp} transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }} className="text-base leading-relaxed text-slate-600 md:text-lg">
            <TM text={content.about_intro || 'Precision Life Sciences (Private) Limited is a Peshawar-based life-sciences company developing the Mugen-Plex RUO real-time PCR portfolio. The platform brings a consistent kit format, purposeful colour-coding and accessible local technical discussion to research laboratories in Pakistan.'} />
          </motion.p>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Our focus</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy">Built for practical laboratory adoption.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['A coherent portfolio', 'Each assay belongs to one recognisable Mugen-Plex family, with the same core presentation and 48-test format.'],
              ['Clear product distinction', 'Assay-specific colour and naming help teams identify the right kit without adding visual clutter.'],
              ['Reachable local support', 'Product enquiries, research collaboration and technical follow-up are handled through a Pakistan-based team.'],
            ].map(([title, text], i) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_12px_35px_rgba(0,32,91,0.06)]">
                <span className="text-sm font-extrabold text-cyan">0{i + 1}</span>
                <h3 className="mt-5 text-xl font-extrabold text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-navy px-6 py-8 text-white md:flex md:items-center md:justify-between md:px-10">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">Who we serve</p>
              <p className="mt-3 text-lg leading-relaxed text-slate-200">
                {content.who_serve_text || 'Research laboratories, hospitals, diagnostic centres, universities and research institutes seeking well-presented RUO real-time PCR products and responsive local support.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4">
        <CeoSection content={content} />
        <Team excludeName={content.ceo_name || DEFAULT_CEO.name} />
      </div>

      <InstitutionalStrip compact />
    </main>
  );
}
