'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const KITS = [
  { slug: 'BCR-ABL1', title: 'BCR-ABL1', color: '#C52B3F', line: 'BCR-ABL1 fusion transcript · chronic myeloid leukaemia' },
  { slug: 'JAK2', title: 'JAK2', color: '#159AA3', line: 'JAK2 mutation · myeloproliferative neoplasms' },
  { slug: 'MPL', title: 'MPL', color: '#6154C7', line: 'MPL mutations · myeloproliferative neoplasms' },
  { slug: 'CALR', title: 'CALR', color: '#E5A100', line: 'CALR mutations · myeloproliferative neoplasms' },
  { slug: 'PML-RARA', title: 'PML-RARA', color: '#E0525D', line: 'PML-RARA fusion transcript · acute promyelocytic leukaemia' },
  { slug: 'MPN-Panel', title: 'MPN PANEL', color: '#159AA3', line: 'JAK2 · CALR · MPL in one panel · myeloproliferative neoplasms' },
];

export default function MyeloidRange() {
  return (
    <section className="bg-navy text-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-cyan font-semibold text-sm tracking-widest uppercase">In development</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            Mugen-Plex<sup className="text-[0.45em] font-semibold ml-0.5 align-super">™</sup> Myeloid
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Real-time PCR assays for key molecular markers of haematological malignancies, in the same
            family and format as our infectious-disease kits. Planned in 24-, 48-, and 96-test RUO formats.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {KITS.map((k, i) => (
            <motion.div
              key={k.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.12, ease: 'easeOut' }}
              className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 transition-colors"
            >
              <div className="relative bg-white aspect-[3/2]">
                <Image
                  src={`/images/myeloid/Mugen-Plex_Myeloid_${k.slug}.jpg`}
                  alt={`Mugen-Plex Myeloid ${k.title} 24/48/96-test real-time PCR assay kit by Precision Life Sciences.`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                  className="object-contain p-5"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: k.color }} />
                  <h3 className="font-bold text-lg">{k.title}</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">{k.line}</p>
                <Link
                  href={`/contact?topic=interest&product=${encodeURIComponent(`Mugen-Plex Myeloid ${k.title}`)}`}
                  className="inline-block text-xs font-semibold px-4 py-2 rounded-full border border-white/30 hover:bg-white hover:text-navy transition-colors"
                >
                  Register interest
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
