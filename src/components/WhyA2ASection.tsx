import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles, Utensils, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { WHY_A2A_FEATURES } from '../data/restaurantData';

export const WhyA2ASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const featureIcons = [
    <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
    <Utensils className="w-6 h-6 text-[#C85A32]" />,
    <Users className="w-6 h-6 text-[#D4AF37]" />,
    <MapPin className="w-6 h-6 text-[#C85A32]" />,
  ];

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="py-24 sm:py-32 bg-[#0a0a0a] text-white relative border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 text-xs tracking-[0.35em] uppercase text-[#D4AF37] font-medium mb-3"
          >
            <div className="h-[1px] w-8 bg-[#D4AF37]" />
            <span>THE A2A STANDARD</span>
            <div className="h-[1px] w-8 bg-[#D4AF37]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light text-white"
          >
            Why Dine at <span className="text-[#D4AF37] italic font-normal">A2A</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-jakarta text-sm sm:text-base text-gray-400 mt-3 font-light"
          >
            Four commitments that elevate every meal from dinner into a cherished memory.
          </motion.p>
        </div>

        {/* Four Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WHY_A2A_FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-[#121212] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-black hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                {/* Icon with subtle scale animation */}
                <div className="w-13 h-13 rounded-sm bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-[#D4AF37]/40 transition-all duration-300">
                  <div className="text-[#D4AF37]">
                    {featureIcons[idx]}
                  </div>
                </div>

                <div className="text-[10px] font-jakarta uppercase tracking-widest text-[#D4AF37] font-semibold mb-1">
                  {feature.tag}
                </div>

                <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {feature.title}
                </h3>

                <p className="font-cormorant text-sm italic text-gray-300 mt-0.5">
                  {feature.subtitle}
                </p>

                <p className="font-jakarta text-xs sm:text-sm text-gray-400 mt-4 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-gray-400 font-jakarta">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Certified Quality</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
