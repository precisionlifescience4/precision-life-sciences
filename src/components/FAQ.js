'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    id: 'status',
    question: 'What is the current status of Mugen-Plex products?',
    answer: 'The products are in development or validation and are presented as RUO. They are not currently available for diagnostic use or routine ordering.',
  },
  {
    id: 'format',
    question: 'What format does each kit use?',
    answer: 'The current portfolio is presented in consistent 24-, 48-, and 96-test formats. Request the relevant product information for the assay-specific contents and workflow.',
  },
  {
    id: 'storage',
    question: 'How should the kits be stored?',
    answer: 'The stated storage condition for the current Mugen-Plex portfolio is 2–8 °C. Always follow the product-specific documentation supplied with the kit.',
  },
  {
    id: 'specimens',
    question: 'Which specimen types are specified?',
    answer: 'Plasma is specified for HBV, HCV, HIV, Dengue/Chikungunya and CCHF. A nasopharyngeal swab is specified for Influenza A & B.',
  },
  {
    id: 'contact',
    question: 'How can I request product information or technical support?',
    answer: 'Use the enquiry form and select the relevant assay or project. The PLS team usually replies within one working day.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

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
        {FAQS.map((item, i) => (
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
              <span className={`text-cyandark text-xl transition-transform ${open === item.id ? 'rotate-45' : ''}`}>+</span>
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
