import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight, Flame, Plus, Check, Clock, Sparkles } from 'lucide-react';
import { SIGNATURE_DISHES } from '../data/restaurantData';
import { SignatureDish, MenuItem } from '../types';

interface SignatureDishesProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenItemModal?: (dish: SignatureDish) => void;
}

export const SignatureDishes: React.FC<SignatureDishesProps> = ({ onAddToCart }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddDish = (dish: SignatureDish) => {
    // Map SignatureDish to MenuItem format
    const menuItem: MenuItem = {
      id: dish.id,
      name: dish.name,
      category: dish.id.includes('biryani') ? 'biryani' : 'starters',
      description: dish.description,
      price: dish.price,
      dietary: dish.dietary,
      spiceLevel: dish.spiceLevel as 0 | 1 | 2 | 3,
      isChefSpecial: true,
      image: dish.image,
    };

    onAddToCart(menuItem);
    setAddedIds((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [dish.id]: false }));
    }, 1800);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="signature"
      className="py-24 sm:py-32 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] relative overflow-hidden border-t border-white/10"
    >
      {/* Subtle Background Accent Lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Progressive Text Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="h-[1px] w-8 bg-[#D4AF37]" />
              <span className="font-jakarta text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-medium">
                CHEF'S MASTERPIECES
              </span>
              <div className="h-[1px] w-8 bg-[#D4AF37]" />
            </motion.div>

            {/* Progressive Heading Reveal */}
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-3"
              >
                A Taste
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-3 text-[#D4AF37] italic font-normal"
              >
                Worth Coming
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-gray-200"
              >
                Back For
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-jakarta text-sm sm:text-base text-gray-300 mt-4 leading-relaxed font-light"
            >
              Time-honoured recipes crafted with stone-ground Kongu spices, cold-pressed sesame oils, and hardwood charcoal fire.
            </motion.p>
          </div>

          {/* Navigation Controls for Horizontal Scroll */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-sm border border-white/15 bg-white/5 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-md"
              aria-label="Previous dishes"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-sm border border-white/15 bg-white/5 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-md"
              aria-label="Next dishes"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Card Scroller Track with Staggered Entrance */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {SIGNATURE_DISHES.map((dish, idx) => {
            const isAdded = addedIds[dish.id];

            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex-shrink-0 w-[300px] sm:w-[360px] md:w-[380px] bg-[#121212] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden snap-start group transition-all duration-300 hover:shadow-2xl hover:shadow-black flex flex-col justify-between"
                data-cursor="explore"
              >
                {/* Image Box with Masked Reveal & Subtle Zoom */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#181818]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />

                  {/* Dark gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/25 to-transparent" />

                  {/* Highlights Badge */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                    <span className="px-3 py-1 rounded-sm bg-black/85 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-jakarta font-bold tracking-widest uppercase">
                      {dish.highlight}
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-sm bg-[#D4AF37] text-black font-jakarta font-bold text-sm shadow-lg">
                    ₹{dish.price}
                  </div>

                  {/* Spice indicator */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-sm bg-black/70 backdrop-blur-sm text-xs text-[#D4AF37]">
                    {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                      <Flame key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                    <span className="text-[10px] text-white/80 font-jakarta ml-1">
                      {dish.spiceLevel === 3 ? 'Fiery' : dish.spiceLevel === 2 ? 'Medium' : 'Mild'}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {dish.name}
                    </h3>
                    <p className="font-cormorant text-sm italic text-[#D4AF37] mt-1">
                      {dish.subtitle}
                    </p>
                    <p className="font-jakarta text-xs sm:text-sm text-gray-400 mt-3 line-clamp-3 leading-relaxed font-light">
                      {dish.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-jakarta">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{dish.prepTime}</span>
                    </div>

                    <button
                      onClick={() => handleAddDish(dish)}
                      className={`px-4 py-2 rounded-sm text-xs font-jakarta font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-md ${
                        isAdded
                          ? 'bg-emerald-500 text-black'
                          : 'bg-[#D4AF37] hover:bg-[#e2bd44] text-black active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>ADD TO ORDER</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
