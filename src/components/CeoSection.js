'use client';
import { motion } from 'framer-motion';

// Fallback text shown until it is edited in Admin > Homepage & About / Images.
export const DEFAULT_CEO = {
  name: 'Prof. Dr. Yasar Mehmood Yousafzai',
  title: 'Founder & Chief Executive Officer',
  credentials: '',
  bio: `Prof. Dr. Yasar Mehmood Yousafzai is the founder and Chief Executive Officer of Precision Life Sciences. He is the Principal Investigator of the project "Import Substitution through Development of In-House Diagnostic Assays", a collaboration between the Directorate General of Science & Technology (DGST), Khyber Medical University and BQ Pharma & Medical Devices, which underpins the Mugen-Plex real-time PCR assay portfolio.

He established Precision Life Sciences to carry these assays from the research laboratory to the laboratories that need them, with a focus on molecular diagnostics that are developed in Pakistan, consistently produced and properly supported.`,
  message: `Laboratories in Pakistan have long relied on imported molecular kits, with the delays and costs that come with them. We set out to change that: to build real-time PCR assays here, together with our university and industry partners, that laboratories can trust and that we are willing to stand behind.

Mugen-Plex kits are currently supplied for research use only, and we say so plainly. As validation and regulatory approval progress, our commitment stays the same: clear information, consistent quality and a team you can reach. I invite laboratories, researchers and partners to work with us.`,
};

const initials = (name) =>
  name
    .replace(/\b(Prof|Dr|Mr|Ms|Mrs)\.?\s/gi, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const paragraphs = (text) => String(text || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export default function CeoSection({ content = {} }) {
  const ceo = {
    name: content.ceo_name || DEFAULT_CEO.name,
    title: content.ceo_title || DEFAULT_CEO.title,
    credentials: content.ceo_credentials ?? DEFAULT_CEO.credentials,
    photo: content.ceo_photo || '',
    bio: content.ceo_bio || DEFAULT_CEO.bio,
    message: content.ceo_message || DEFAULT_CEO.message,
  };

  return (
    <section className="mt-16 pt-10 border-t border-gray-100" aria-labelledby="ceo-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="text-cyandark font-semibold text-sm tracking-widest uppercase">Leadership</span>
        <h2 id="ceo-heading" className="text-2xl font-bold text-navy mt-1 mb-8">Meet Our CEO</h2>

        <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
          <div className="text-center md:text-left">
            {ceo.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={ceo.photo} alt={ceo.name} className="w-44 h-44 md:w-52 md:h-52 rounded-2xl object-cover mx-auto md:mx-0 border-2 border-cyan shadow-md" />
            ) : (
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-2xl bg-navy text-white flex items-center justify-center font-bold text-5xl mx-auto md:mx-0 shadow-md">
                {initials(ceo.name)}
              </div>
            )}
            <h3 className="font-bold text-navy text-lg mt-4">{ceo.name}</h3>
            <p className="text-cyandark text-sm font-semibold">{ceo.title}</p>
            {ceo.credentials && <p className="text-gray-500 text-xs mt-1 leading-relaxed">{ceo.credentials}</p>}
          </div>

          <div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              {paragraphs(ceo.bio).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <blockquote className="mt-6 bg-graybg border-l-4 border-cyan rounded-r-xl p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">A message from the CEO</p>
              <div className="space-y-3 text-navy/90 leading-relaxed italic">
                {paragraphs(ceo.message).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <footer className="mt-3 text-sm font-semibold text-navy not-italic">
                — {ceo.name}, {ceo.title}
              </footer>
            </blockquote>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
