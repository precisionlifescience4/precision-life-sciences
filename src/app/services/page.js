'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    fetch('/api/faqs').then(r => r.json()).then(setFaqs);
  }, []);

  if (!faqs.length) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-3xl font-extrabold text-navy text-center mb-10"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-3">
        {faqs.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === item.id ? null : item.id)}
              className="w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-navy bg-graybg hover:bg-gray-100 transition-colors"
            >
              {item.question}
              <span className={`text-cyan text-xl transition-transform ${open === item.id ? 'rotate-45' : ''}`}>+</span>
            </button>
            <AnimatePresence>
              {open === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 py-4 text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}