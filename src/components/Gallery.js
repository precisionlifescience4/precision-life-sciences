'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch('/api/gallery').then(r => r.json()).then(setImages);
  }, []);

  if (!images.length) return null;

  return (
       <section className="max-w-6xl mx-auto px-4 pt-4 pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-cyan font-semibold text-sm tracking-widest uppercase">Gallery</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-2">Our Products & Facility</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
            onClick={() => setActive(img)}
            className="relative aspect-square rounded-xl overflow-hidden bg-graybg group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.image_url} alt={img.caption || 'Gallery image'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-3 py-2 text-white text-xs text-left opacity-0 group-hover:opacity-100 transition-opacity">
                {img.caption}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={active.image_url}
              alt={active.caption}
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
            />
            {active.caption && (
              <p className="absolute bottom-6 text-white text-sm bg-black/50 px-4 py-2 rounded-full">{active.caption}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}