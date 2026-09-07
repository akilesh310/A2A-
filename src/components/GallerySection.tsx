import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [activeTab, setActiveTab] = useState<'all' | 'food' | 'kitchen' | 'ambience' | 'moments'>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredGallery = activeTab === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  // Keyboard navigation for full-screen lightbox (Section 15)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev + 1) % filteredGallery.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredGallery.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredGallery.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  const currentItem: GalleryItem | undefined =
    selectedImageIndex !== null ? filteredGallery[selectedImageIndex] : undefined;

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-24 sm:py-36 bg-[#0a0a0a] text-white relative border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 text-xs tracking-[0.35em] uppercase text-[#D4AF37] font-medium mb-3"
          >
            <div className="h-[1px] w-8 bg-[#D4AF37]" />
            <span>VISUAL CHRONICLES</span>
            <div className="h-[1px] w-8 bg-[#D4AF37]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light text-white"
          >
            The A2A <span className="text-[#D4AF37] italic font-normal">Gallery</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-jakarta text-sm sm:text-base text-gray-400 mt-3 font-light"
          >
            Step inside our dining halls, watch the wood-fire ovens blaze, and immerse yourself in Coimbatore gastronomy.
          </motion.p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: 'ALL MOMENTS' },
            { id: 'food', label: 'FOOD CRAFT' },
            { id: 'kitchen', label: 'KITCHEN FIRE' },
            { id: 'ambience', label: 'AMBIENCE' },
            { id: 'moments', label: 'DINING MEMORIES' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-sm text-xs font-jakarta tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'bg-white/5 text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  delay: Math.min(idx * 0.06, 0.35),
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-[#121212] border border-white/10 hover:border-[#D4AF37]/50 shadow-xl ${
                  item.aspect === 'portrait'
                    ? 'sm:row-span-2 h-[340px] sm:h-[480px]'
                    : 'h-64 sm:h-72'
                }`}
                data-cursor="view"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />

                {/* Dark Hover Overlay with "View Image" indicator */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="self-end p-2.5 rounded-sm bg-black/70 backdrop-blur-md border border-white/20 text-[#D4AF37] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-jakarta tracking-widest text-[#D4AF37] uppercase font-bold">
                      {item.category}
                    </span>
                    <h3 className="font-cinzel text-lg font-bold text-white mt-0.5">
                      {item.title}
                    </h3>
                    <p className="font-jakarta text-xs text-gray-300 mt-1 line-clamp-2 font-light">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 z-10 p-3 rounded-sm bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white transition-colors cursor-pointer border border-white/15"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Prev Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-sm bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white transition-colors cursor-pointer border border-white/15"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-sm bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white transition-colors cursor-pointer border border-white/15"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Frame */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            >
              <motion.img
                key={currentItem.id}
                src={currentItem.image}
                alt={currentItem.title}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />

              {/* Caption & Counter */}
              <div className="mt-4 text-center max-w-xl">
                <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                  {currentItem.title}
                </h4>
                <p className="font-jakarta text-xs sm:text-sm text-gray-300 mt-1">
                  {currentItem.caption}
                </p>
                <span className="text-[11px] font-jakarta text-[#D4AF37] mt-2 block font-medium">
                  {selectedImageIndex + 1} of {filteredGallery.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
