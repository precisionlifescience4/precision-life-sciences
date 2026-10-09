'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const [whatsapp, setWhatsapp] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => setWhatsapp(d.whatsapp));
  }, []);

  if (!whatsapp || pathname === '/contact') return null;

  return (
    <motion.a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      className="fixed right-3 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-green-600 text-white transition-colors hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:right-6 sm:h-14 sm:w-14"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.699 4.6 1.902 6.463L4 29l7.738-1.867A11.93 11.93 0 0016 27c6.628 0 12-5.373 12-12S22.629 3 16.001 3zm6.964 16.955c-.297.836-1.474 1.53-2.412 1.729-.642.137-1.48.246-4.302-.924-3.61-1.497-5.933-5.156-6.115-5.393-.176-.237-1.462-1.947-1.462-3.716s.923-2.639 1.253-3c.33-.362.72-.452.96-.452.24 0 .48.002.69.013.222.011.518-.084.81.618.297.72 1.008 2.489 1.096 2.669.088.18.147.39.03.627-.117.237-.176.386-.35.593-.176.207-.37.462-.528.62-.176.176-.36.367-.155.72.207.353.918 1.514 1.97 2.452 1.353 1.207 2.494 1.581 2.847 1.758.353.176.559.147.766-.089.207-.237.883-1.03 1.118-1.383.235-.353.47-.294.79-.176.324.117 2.061.972 2.414 1.148.353.176.588.264.674.412.088.147.088.847-.209 1.683z"/>
      </svg>
    </motion.a>
  );
}
