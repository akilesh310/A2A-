import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, Phone, Clock, Navigation, Car, UtensilsCrossed, Calendar, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface LocationSectionProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenReservation, onOpenOrder }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="location"
      className="py-24 sm:py-36 bg-[#0a0a0a] text-white relative border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Restaurant Information */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#D4AF37] font-medium mb-3">
                <div className="h-[1px] w-8 bg-[#D4AF37]" />
                <span>VISIT US IN COIMBATORE</span>
                <div className="h-[1px] w-8 bg-[#D4AF37]" />
              </div>

              <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
                Flavours Await You on <br />
                <span className="text-[#D4AF37] italic font-normal">Avinashi Road</span>
              </h2>

              <p className="font-jakarta text-sm sm:text-base text-gray-400 mt-3 font-light leading-relaxed">
                Located centrally in Peelamedu, A2A Restaurant is easily accessible from all corners of Coimbatore with complimentary valet service.
              </p>
            </motion.div>

            {/* Information Cards */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#121212] border border-white/10">
                <div className="w-10 h-10 rounded-sm bg-black/60 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-white">Restaurant Location</h4>
                  <p className="font-jakarta text-xs sm:text-sm text-gray-300 mt-1">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="font-jakarta text-xs text-[#D4AF37] mt-0.5 font-medium">
                    {RESTAURANT_INFO.landmark}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#121212] border border-white/10">
                <div className="w-10 h-10 rounded-sm bg-black/60 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-cinzel text-sm font-bold text-white">Dining & Takeaway Hours</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    <div className="text-xs text-gray-300 font-jakarta">
                      <span className="text-[#D4AF37] font-semibold">Lunch:</span> {RESTAURANT_INFO.hours.lunch}
                    </div>
                    <div className="text-xs text-gray-300 font-jakarta">
                      <span className="text-[#D4AF37] font-semibold">Dinner:</span> {RESTAURANT_INFO.hours.dinner}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 font-jakarta mt-1">
                    {RESTAURANT_INFO.hours.days}
                  </p>
                </div>
              </div>

              {/* Contact & Parking */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#121212] border border-white/10">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <span className="text-[11px] text-gray-500 uppercase font-jakarta block">Direct Booking</span>
                    <span className="text-xs font-semibold text-white font-jakarta">{RESTAURANT_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#121212] border border-white/10">
                  <Car className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <span className="text-[11px] text-gray-500 uppercase font-jakarta block">Valet Service</span>
                    <span className="text-xs font-semibold text-white font-jakarta">Free Dedicated Valet</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Animated CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-sm bg-[#D4AF37] hover:bg-[#e2bd44] text-black font-jakarta font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shadow-lg active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>GET DIRECTIONS</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75" />
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/[^0-9+]/g, '')}`}
                className="px-6 py-3 rounded-sm bg-white/5 hover:bg-[#D4AF37] hover:text-black border border-white/15 text-white font-jakarta font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D4AF37] hover:text-black" />
                <span>CALL NOW</span>
              </a>

              <button
                onClick={onOpenReservation}
                className="px-6 py-3 rounded-sm bg-white/5 hover:bg-[#D4AF37] hover:text-black border border-white/15 text-white font-jakarta font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>BOOK TABLE</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT: Interactive Google Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black bg-[#121212]"
          >
            {/* Interactive Embedded Google Map */}
            <iframe
              title="A2A Restaurant Location Coimbatore"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.273014769062!2d77.0003!3d11.0254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8582f3a61f52b%3A0x8e83344654921600!2sAvinashi%20Rd%2C%20Peelamedu%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-125"
              loading="lazy"
              allowFullScreen
            />

            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/95 backdrop-blur-md border border-[#D4AF37]/30 shadow-xl max-w-xs pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
                <span className="font-cinzel text-xs font-bold text-white">A2A Restaurant</span>
              </div>
              <p className="text-[11px] font-jakarta text-gray-400 mt-0.5">
                Avinashi Road, Peelamedu, Coimbatore
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
