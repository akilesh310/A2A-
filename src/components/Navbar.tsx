import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, UtensilsCrossed, Calendar, ShoppingBag, Menu as MenuIcon, X, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation, onOpenOrder, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Signature', href: '#signature' },
    { label: 'Our Story', href: '#story' },
    { label: 'Why A2A', href: '#why-us' },
    { label: 'Menu', href: '#menu' },
    { label: 'Moments', href: '#shared-video' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/80'
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Monogram Box */}
          <a
            href="#"
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm"
          >
            <div className="w-10 h-10 border-2 border-[#D4AF37] flex items-center justify-center rounded-sm bg-black/40 group-hover:bg-[#D4AF37]/10 transition-colors shadow-sm shadow-[#D4AF37]/20">
              <span className="font-cinzel text-xl font-bold text-[#D4AF37]">A</span>
            </div>
            <div>
              <span
                className={`font-cinzel tracking-[0.28em] font-light text-white transition-all duration-300 block uppercase ${
                  isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                }`}
              >
                A2A
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase block font-jakarta -mt-1 font-medium">
                Coimbatore
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-jakarta uppercase tracking-widest text-white/80 hover:text-[#D4AF37] transition-colors duration-200 relative py-1 group font-medium"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Phone Quick Dial */}
            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 text-xs text-white/80 hover:text-[#D4AF37] px-3.5 py-2 rounded-sm border border-white/15 hover:border-[#D4AF37]/60 transition-colors"
              title="Call A2A Restaurant"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-jakarta tracking-wide hidden xl:inline">{RESTAURANT_INFO.phone}</span>
              <span className="font-jakarta tracking-wide xl:hidden">Call</span>
            </a>

            {/* Book Table Button */}
            <button
              id="nav-reserve-btn"
              onClick={onOpenReservation}
              className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-sm border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-200 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>

            {/* Order Online Button */}
            <button
              id="nav-order-btn"
              onClick={onOpenOrder}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4.5 py-2 rounded-sm bg-[#D4AF37] hover:bg-[#e2bd44] text-black shadow-lg shadow-[#D4AF37]/20 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Now</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-black text-[#D4AF37] text-[11px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu & Quick Cart Buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenOrder}
              className="relative p-2 rounded-sm bg-[#141414] border border-white/15 text-white"
              aria-label="View Order Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#D4AF37] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#0a0a0a]/98 border-b border-white/10 backdrop-blur-xl px-6 py-6 sm:hidden flex flex-col gap-4 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-cinzel text-white hover:text-[#D4AF37] py-2 border-b border-white/5 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#D4AF37] font-jakarta">→</span>
                </a>
              ))}
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 rounded-sm border border-[#D4AF37] text-[#D4AF37] font-jakarta font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-black transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrder();
                }}
                className="w-full py-3 rounded-sm bg-[#D4AF37] text-black font-jakarta font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Online {cartCount > 0 ? `(${cartCount} items)` : ''}</span>
              </button>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs text-white/70 py-1"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Avinashi Road, Peelamedu, Coimbatore</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
