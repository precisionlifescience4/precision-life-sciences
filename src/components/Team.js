'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch('/api/team').then(r => r.json()).then(setTeam);
  }, []);

  if (!team.length) return null;

  const initials = (name) =>
    name.split(' ').filter(w => w.length > 2 || /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('').toUpperCase();

  return (
    <section className="mt-16 pt-10 border-t border-gray-100">
      <h2 className="text-2xl font-bold text-navy mb-2 text-center">Leadership</h2>
      <p className="text-gray-500 text-center mb-10 text-sm">The people behind Precision Life Sciences</p>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {team.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
            className="bg-graybg rounded-xl p-6 text-center"
          >
            {member.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={member.photo_url} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-cyan" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
                {initials(member.name)}
              </div>
            )}
            <h3 className="font-bold text-navy">{member.name}</h3>
            <p className="text-cyan text-sm font-semibold mb-3">{member.role}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}