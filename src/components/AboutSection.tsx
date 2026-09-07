import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Sparkles, Award, Utensils, Heart } from 'lucide-react';
import { QUALITATIVE_STATS } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  // Subtle parallax for the image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="py-24 sm:py-36 bg-[#0a0a0a] text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Subtle Warm Background Glow */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Large Image with Parallax & Mask Reveal */}
          <div className="lg:col-span-6 relative">
            <div
              ref={imageRef}
              className="relative h-[420px] sm:h-[520px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-black border border-white/15"
              data-cursor="view"
            >
              {/* Parallax Image */}
              <motion.div
                className="w-full h-[115%] absolute -top-[7.5%]"
                style={{ y: imageY, scale: imageScale }}
              >
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
                  alt="A2A Restaurant kitchen craftsmanship in Coimbatore"
                  className="w-full h-full object-cover object-center filter brightness-90"
                  loading="lazy"
                />
              </motion.div>

              {/* Editorial Frame Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20 pointer-events-none" />

              {/* Floating Award / Legacy Badge on the Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs p-5 rounded-xl bg-black/90 backdrop-blur-md border border-[#D4AF37]/30 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/50 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-white">Authentic Kongu Heritage</h4>
                    <p className="font-jakarta text-[11px] text-gray-400 mt-0.5">Avinashi Road, Coimbatore</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Restaurant Story */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-[1px] w-8 bg-[#D4AF37]" />
                <span className="font-jakarta text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-medium">
                  OUR CULINARY JOURNEY
                </span>
                <div className="h-[1px] w-8 bg-[#D4AF37]" />
              </div>

              <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light text-white leading-[1.15]">
                Rooted in Tradition, <br />
                <span className="italic font-normal text-gray-200">
                  Served with Coimbatore Warmth
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 font-jakarta text-sm sm:text-base text-gray-300 leading-relaxed font-light"
            >
              <p>
                At <strong className="text-white font-medium">A2A Restaurant</strong>, culinary heritage is more than just recipes — it is a living ritual. Born in the heart of Coimbatore, our kitchen celebrates the legendary spices of Tamil Nadu and the storied culinary traditions of the Kongunadu country.
              </p>
              <p>
                We eschew artificial colors and pre-packaged masalas. Every morning, our chefs roast whole coriander, dried Byadgi chillies, Tellicherry peppercorns, and cumin on cast-iron pans, stone-grinding them fresh to unlock the earthy richness only true South Indian wood-fired cooking can deliver.
              </p>
              <p className="border-l-2 border-[#D4AF37] pl-4 text-white italic font-cormorant text-lg sm:text-xl">
                "Every pot of Seeraga Samba biryani is sealed with dough and cooked slowly over hardwood coals, infusing each grain of rice with fragrant aroma and tender warmth."
              </p>
            </motion.div>

            {/* Scroll-triggered Qualitative Counters */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10"
            >
              {QUALITATIVE_STATS.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <div className="font-cinzel text-2xl sm:text-3xl font-light text-[#D4AF37] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-jakarta text-xs font-semibold text-white mt-1">
                    {stat.label}
                  </div>
                  <div className="font-jakarta text-[11px] text-gray-400 mt-0.5 leading-snug">
                    {stat.description}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
