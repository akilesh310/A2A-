import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Phone, Utensils, Navigation } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FloatingCTAProps {
  onOpenOrder: () => void;
  cartCount: number;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenOrder, cartCount }) => {
  return (
    <>
      {/* Desktop Floating Button (Bottom Right) */}
      <div className="hidden sm:block fixed bottom-8 right-8 z-40">
        <motion.button
          id="desktop-floating-order-btn"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenOrder}
          className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#C85A32] to-[#B04722] hover:brightness-110 text-white font-jakarta font-bold text-xs tracking-wider uppercase shadow-2xl shadow-[#C85A32]/50 border border-white/20 backdrop-blur-md cursor-pointer transition-all"
          aria-label="Open Order Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white text-[#C85A32] text-[10px] font-extrabold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span>ORDER NOW</span>
        </motion.button>
      </div>

      {/* Mobile Sticky Bottom Navigation (Section 20) */}
      {/* Structure: [ CALL | MENU | DIRECTIONS | ORDER ] */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0A09]/95 backdrop-blur-lg border-t border-[#2A2420] shadow-2xl px-2 py-2 safe-area-pb">
        <div className="grid grid-cols-4 gap-1 items-center">
          {/* 1. CALL */}
          <a
            href={`tel:${RESTAURANT_INFO.phone.replace(/[^0-9+]/g, '')}`}
            className="flex flex-col items-center justify-center py-1 text-[#EFE8DC]/80 hover:text-[#D4AF37] active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-[#D4AF37] mb-0.5" />
            <span className="text-[10px] font-jakarta font-semibold uppercase tracking-wider">
              Call
            </span>
          </a>

          {/* 2. MENU */}
          <a
            href="#menu"
            className="flex flex-col items-center justify-center py-1 text-[#EFE8DC]/80 hover:text-[#D4AF37] active:scale-95 transition-transform"
          >
            <Utensils className="w-4 h-4 text-[#E07850] mb-0.5" />
            <span className="text-[10px] font-jakarta font-semibold uppercase tracking-wider">
              Menu
            </span>
          </a>

          {/* 3. DIRECTIONS */}
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-[#EFE8DC]/80 hover:text-[#D4AF37] active:scale-95 transition-transform"
          >
            <Navigation className="w-4 h-4 text-[#D4AF37] mb-0.5" />
            <span className="text-[10px] font-jakarta font-semibold uppercase tracking-wider">
              Directions
            </span>
          </a>

          {/* 4. ORDER */}
          <button
            onClick={onOpenOrder}
            className="flex flex-col items-center justify-center py-1 px-1 bg-gradient-to-r from-[#C85A32] to-[#B04722] text-white rounded-xl shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 mb-0.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 w-3.5 h-3.5 rounded-full bg-white text-[#C85A32] text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-jakarta font-bold uppercase tracking-wider">
              Order
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
