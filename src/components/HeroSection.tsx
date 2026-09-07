import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Sparkles, Volume2, VolumeX, ArrowRight, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMenu, onOrderNow }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Parallax scroll effect (Section 4)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Video transforms: scale 1 -> 1.08, moves slightly vertically, reduces opacity very subtly
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.85, 0.4]);

  // Text transforms: translateY 0 -> -80px, opacity 1 -> 0
  const textY = useTransform(scrollYProgress, [0, 0.65], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const smoothEasing = [0.22, 1, 0.36, 1];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center select-none pt-24 pb-12"
    >
      {/* Background Video & Fallback Poster Container */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          scale: videoScale,
          y: videoY,
          opacity: videoOpacity,
        }}
      >
        {/* High-res warm poster image */}
        <img
          src={RESTAURANT_INFO.heroPoster}
          alt="A2A Restaurant authentic culinary ambiance"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.6]"
          loading="eager"
          fetchPriority="high"
        />

        {/* 100vh Full-screen Cinematic Video */}
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          poster={RESTAURANT_INFO.heroPoster}
        >
          <source src={RESTAURANT_INFO.heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Elegant Dark Color Grading Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/90 via-transparent to-black/70 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(10,10,10,0.9)_100%)] pointer-events-none" />
      </motion.div>

      {/* Floating Sound Toggle Control (Bottom Left) */}
      <div className="absolute bottom-8 left-6 sm:left-12 z-20 flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#D4AF37] border border-white/15 hover:border-[#D4AF37] text-white hover:text-black backdrop-blur-xl transition-all duration-300 flex items-center justify-center cursor-pointer group shadow-xl"
          aria-label={isMuted ? 'Unmute video ambience' : 'Mute video ambience'}
          title={isMuted ? 'Unmute ambience' : 'Mute ambience'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#D4AF37] group-hover:text-black transition-colors" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#D4AF37] group-hover:text-black transition-colors" />
          )}
        </button>
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 font-jakarta hidden sm:inline">
          {isMuted ? 'Ambience Muted' : 'Sound Active'}
        </span>
      </div>

      {/* City Location Tag (Bottom Right) */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 hidden md:flex items-center gap-2.5 text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-jakarta">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
        <span>Avinashi Road • Peelamedu, Coimbatore</span>
      </div>

      {/* Center Hero Content */}
      <motion.div
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center my-auto"
        style={{
          y: textY,
          opacity: textOpacity,
        }}
      >
        {/* 0.3s: Eyebrow with gold accent flanking lines (as in Elegant Dark theme) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: smoothEasing }}
          className="mb-6 flex items-center justify-center space-x-3 sm:space-x-4 opacity-90"
        >
          <div className="h-[1px] w-8 sm:w-14 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs sm:text-sm tracking-[0.45em] uppercase font-jakarta font-medium">
            Coimbatore, Tamil Nadu
          </span>
          <div className="h-[1px] w-8 sm:w-14 bg-[#D4AF37]" />
        </motion.div>

        {/* 0.6s: Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: smoothEasing }}
          className="space-y-1 sm:space-y-2 mb-6"
        >
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl italic font-normal text-white leading-none tracking-tight">
            Authentic Flavours.
          </h1>
          <span className="font-jakarta not-italic font-extralight tracking-tight opacity-90 text-3xl sm:text-5xl md:text-6xl lg:text-7xl block text-gray-200">
            Memorable Moments.
          </span>
        </motion.div>

        {/* 0.9s: Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: smoothEasing }}
          className="max-w-xl text-sm sm:text-base md:text-lg font-light text-gray-300 leading-relaxed mx-auto mb-10 tracking-wide font-jakarta"
        >
          Discover flavours made for every appetite — from fragrant Seeraga Samba biryanis to wood-fired Kongu grills and rich culinary heritage.
        </motion.p>

        {/* 1.2s: CTA buttons from Elegant Dark design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: smoothEasing }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto"
        >
          <button
            id="hero-explore-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4.5 bg-[#D4AF37] hover:bg-[#e2bd44] text-black font-bold text-xs sm:text-sm tracking-widest uppercase shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 group rounded-sm"
          >
            <Utensils className="w-4 h-4 text-black" />
            <span>EXPLORE MENU</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-order-now-btn"
            onClick={onOrderNow}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4.5 border border-white/30 backdrop-blur-md text-white font-bold text-xs sm:text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 rounded-sm"
          >
            <span>ORDER NOW</span>
          </button>
        </motion.div>

        {/* 1.5s: Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: smoothEasing }}
          className="mt-12 sm:mt-16 flex flex-col items-center"
        >
          <a
            href="#signature"
            className="group flex flex-col items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors focus:outline-none"
            aria-label="Scroll to explore signature dishes"
          >
            <span className="font-jakarta text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-medium">
              SCROLL TO EXPLORE
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-5 h-9 rounded-full border border-white/25 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 rounded-full bg-[#D4AF37]" />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
