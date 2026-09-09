import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Elegant quick reveal under 1.2 seconds so user experience is snappy
    const timer = setTimeout(() => {
      setIsLoaded(true);
      if (onComplete) onComplete();
    }, 1100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="flex flex-col items-center">
            {/* Restaurant logo & brand name */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-40 h-20 overflow-hidden rounded-full border border-[#D4AF37]/70 bg-black mb-4 shadow-lg shadow-[#D4AF37]/10">
                <img src="/a2a-restaurant-logo.jpg" alt="A2A Restaurant" className="h-full w-full object-cover" />
              </div>
              <span className="font-cinzel text-2xl sm:text-3xl font-light tracking-[0.35em] uppercase text-white">
                A2A Restaurant
              </span>
              <p className="font-jakarta text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#D4AF37] mt-2 font-medium">
                Coimbatore • Tamil Nadu
              </p>
            </motion.div>

            {/* Elegant golden progress line */}
            <div className="w-36 sm:w-48 h-[2px] bg-white/10 mt-6 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-[#D4AF37] w-1/2"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
