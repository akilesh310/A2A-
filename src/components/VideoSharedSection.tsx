import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const VideoSharedSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;

    // Pause when off-screen to conserve CPU / GPU as requested in Section 16 & 28
    if (isInView) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isInView]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={sectionRef}
      id="shared-video"
      className="relative w-full h-[65vh] sm:h-[75vh] min-h-[480px] bg-black overflow-hidden flex items-center justify-center select-none"
    >
      {/* High-res fallback poster image */}
      <img
        src={RESTAURANT_INFO.sharedPoster}
        alt="Dining moments at A2A Restaurant Coimbatore"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.65]"
        loading="lazy"
      />

      {/* Cinematic Ambience Video */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.7]"
        poster={RESTAURANT_INFO.sharedPoster}
      >
        <source src={RESTAURANT_INFO.sharedVideo} type="video/mp4" />
      </video>

      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />

      {/* Content Overlay with Heading & Supporting Text */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 text-xs tracking-[0.35em] uppercase text-[#D4AF37] font-medium mb-6"
        >
          <div className="h-[1px] w-8 bg-[#D4AF37]" />
          <span>THE DINING RITUAL</span>
          <div className="h-[1px] w-8 bg-[#D4AF37]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-wide"
        >
          Made to Be Shared
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant text-2xl sm:text-3xl md:text-4xl italic text-[#D4AF37] mt-3 font-normal"
        >
          "Good food tastes even better when shared."
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-jakarta text-xs sm:text-sm text-gray-300 max-w-lg mx-auto mt-4 font-light leading-relaxed"
        >
          Whether gathered around a communal biryani platter or sharing hot starters under our rooftop lights, A2A creates memories that linger long after the feast.
        </motion.p>
      </div>

      {/* Video Controls (Bottom Right) */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-20 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="p-2.5 rounded-sm bg-black/80 hover:bg-black border border-white/20 hover:border-[#D4AF37] text-white backdrop-blur-md transition-all cursor-pointer"
          aria-label={isPlaying ? 'Pause ambient video' : 'Play ambient video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#D4AF37]" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-sm bg-black/80 hover:bg-black border border-white/20 hover:border-[#D4AF37] text-white backdrop-blur-md transition-all cursor-pointer"
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#D4AF37]" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
        </button>
      </div>
    </section>
  );
};
