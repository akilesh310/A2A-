import React from 'react';
import { ArrowUp, MapPin, Phone, Mail, Instagram, Facebook, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] text-gray-400 pt-20 pb-28 sm:pb-16 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Col 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm border border-[#D4AF37] flex items-center justify-center bg-black/60">
                <span className="font-cinzel text-lg font-bold text-[#D4AF37]">A</span>
              </div>
              <div>
                <span className="font-cinzel text-2xl font-bold text-white tracking-widest block">
                  A2A RESTAURANT
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-jakarta block font-semibold">
                  Coimbatore, Tamil Nadu
                </span>
              </div>
            </div>

            <p className="font-jakarta text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed font-light">
              Celebrating the authentic culinary heritage of Kongunadu and Tamil Nadu. Wood-fired Seeraga Samba biryanis, stone-ground masalas, and warm South Indian hospitality.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-colors"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white tracking-wider uppercase">
              Explore A2A
            </h4>
            <ul className="space-y-2 text-xs font-jakarta text-gray-400">
              <li>
                <a href="#signature" className="hover:text-[#D4AF37] transition-colors">
                  Signature Dishes
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#D4AF37] transition-colors">
                  Our Culinary Story
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#D4AF37] transition-colors">
                  Why A2A Restaurant
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D4AF37] transition-colors">
                  Full Menu & Specials
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#D4AF37] transition-colors">
                  Kitchen & Ambiance Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#D4AF37] transition-colors">
                  Guest Reviews
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#D4AF37] transition-colors">
                  Location & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Visit & Timings (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white tracking-wider uppercase">
              Location & Hours
            </h4>
            <div className="space-y-2 text-xs font-jakarta text-gray-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 text-[11px] font-jakarta text-gray-400">
              <p>
                <span className="text-[#D4AF37] font-semibold">Lunch:</span> {RESTAURANT_INFO.hours.lunch}
              </p>
              <p>
                <span className="text-[#D4AF37] font-semibold">Dinner:</span> {RESTAURANT_INFO.hours.dinner}
              </p>
              <p className="text-[#D4AF37] mt-0.5">{RESTAURANT_INFO.hours.days}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-jakarta text-gray-500">
          <p>
            © {new Date().getFullYear()} A2A Restaurant, Coimbatore. All rights reserved. Crafted with authentic Tamil passion.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#D4AF37] transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-sm bg-white/5 border border-white/10 group-hover:border-[#D4AF37] flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
