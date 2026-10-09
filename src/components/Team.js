'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PROJECT_TEAM = [
  {
    id: 'sidra-rahman',
    name: 'Dr. Sidra Rahman',
    role: 'Research Associate',
    bio: 'Supports the end-to-end development of qPCR assays for five viral targets, from project planning and in-silico primer and probe design through laboratory optimization and validation on conventional PCR and real-time qPCR platforms. Her work also includes sample processing, nucleic-acid extraction, reagent preparation, experimental documentation, data review and technical troubleshooting.',
    photo_url: '',
  },
  {
    id: 'shamsullah',
    name: 'Shamsullah',
    role: 'Research Assistant',
    bio: 'An M.Phil. graduate in Biochemistry/Molecular Biology supporting the “Import Substitution through Development of In-House Diagnostic Assays” project. He contributes to in-silico primer and probe analysis, assay optimization and validation for five viral targets, alongside sample processing, nucleic-acid extraction, reagent preparation, routine PCR and qPCR workflows, laboratory records, inventory, data analysis and technical reporting.',
    photo_url: '',
  },
];

export default function Team({ excludeName = '' }) {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch('/api/team').then(r => r.json()).then(d => setTeam(Array.isArray(d) ? d : [])).catch(() => setTeam([]));
  }, []);

  // The CEO has a featured section above, so leave them out of this grid.
  // Two names are the same person when their first and last words match,
  // so a middle name or an honorific (Prof., Dr.) does not matter.
  const words = (s) => String(s || '').toLowerCase().replace(/\b(prof|dr|mr|ms|mrs)\b\.?/g, '').split(/[^a-z]+/).filter(Boolean);
  const samePerson = (a, b) => {
    const x = words(a);
    const y = words(b);
    return x.length > 0 && y.length > 0 && x[0] === y[0] && x[x.length - 1] === y[y.length - 1];
  };
  const correctedTeam = team.map((member) => (
    samePerson(member.name, 'Hazrat Bilal')
      ? { ...member, role: 'Chief Business Officer' }
      : member
  ));
  const completeTeam = [
    ...correctedTeam,
    ...PROJECT_TEAM.filter((profile) => !correctedTeam.some((member) => samePerson(member.name, profile.name))),
  ];
  const others = completeTeam.filter((m) => !excludeName || !samePerson(m.name, excludeName));
  if (!others.length) return null;

  const initials = (name) =>
    name.replace(/\b(Prof|Dr|Mr|Ms|Mrs)\.?\s/gi, '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();

  return (
    <section className="mt-16 pt-10 border-t border-gray-100">
      <h2 className="text-2xl font-bold text-navy mb-2 text-center">Our Team</h2>
      <p className="text-gray-500 text-center mb-10 text-sm">Leadership and research professionals supporting Precision Life Sciences</p>

      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {others.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
            className="bg-graybg rounded-xl p-6 text-center w-full md:w-[calc(50%-0.75rem)]"
          >
            {member.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={member.photo_url} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-cyan" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
                {initials(member.name)}
              </div>
            )}
            <h3 className="font-bold text-navy">{member.name}</h3>
            <p className="text-cyandark text-sm font-semibold mb-3">{member.role}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
