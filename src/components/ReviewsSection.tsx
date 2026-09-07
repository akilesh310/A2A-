import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle } from 'lucide-react';
import { REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 6 seconds (not too fast as instructed in Section 18)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const review = REVIEWS[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="py-24 sm:py-36 bg-[#0a0a0a] text-white relative border-t border-white/10 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 text-xs tracking-[0.35em] uppercase text-[#D4AF37] font-medium mb-3"
          >
            <div className="h-[1px] w-8 bg-[#D4AF37]" />
            <span>GUEST TESTIMONIALS</span>
            <div className="h-[1px] w-8 bg-[#D4AF37]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light text-white"
          >
            Words from <span className="text-[#D4AF37] italic font-normal">Coimbatore</span>
          </motion.h2>

          {/* Rating Rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 mt-4"
          >
            <div className="flex items-center gap-1 text-[#D4AF37]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
              ))}
            </div>
            <span className="font-jakarta text-sm font-bold text-white">
              {RESTAURANT_INFO.rating} / 5.0
            </span>
            <span className="text-xs text-gray-400 font-jakarta">
              ({RESTAURANT_INFO.totalReviews} reviews)
            </span>
          </motion.div>
        </div>

        {/* Carousel Card Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-[#121212] border border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl shadow-black"
        >
          <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-white/5 absolute top-6 right-8 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center max-w-3xl mx-auto"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 text-[#D4AF37] mb-6">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37]" />
                ))}
              </div>

              {/* Review Comment Quote */}
              <p className="font-cormorant text-xl sm:text-2xl md:text-3xl italic text-gray-100 leading-relaxed">
                "{review.comment}"
              </p>

              {/* Favorite Dish Pill */}
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-black/60 border border-white/10">
                <span className="text-[11px] font-jakarta uppercase tracking-wider text-[#D4AF37] font-semibold">
                  Favorite Dish:
                </span>
                <span className="text-xs font-jakarta text-white font-medium">
                  {review.favoriteDish}
                </span>
              </div>

              {/* Reviewer Details */}
              <div className="mt-8 flex items-center gap-4">
                {review.avatar && (
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]/50"
                  />
                )}
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-cinzel text-base font-bold text-white">
                      {review.name}
                    </h4>
                    <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" title="Verified Guest" />
                  </div>
                  <p className="font-jakarta text-xs text-gray-400">
                    {review.location} • {review.date}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-sm border border-white/15 bg-white/5 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dot Indicators */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === i ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-sm border border-white/15 bg-white/5 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
