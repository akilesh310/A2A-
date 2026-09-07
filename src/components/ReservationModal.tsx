import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, CheckCircle, Sparkles, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '07:30 PM',
    guests: 4,
    areaPreference: 'AC Dining Hall',
    specialNotes: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const timeSlots = [
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = 'A2A-RES-' + Math.floor(1000 + Math.random() * 9000);
    setBookingId(id);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-[#121212] border border-white/10 text-white rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-sm hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              /* Success confirmation */
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-cinzel text-2xl font-light text-white">Table Reserved!</h3>
                <p className="font-jakarta text-xs sm:text-sm text-gray-300 max-w-sm mx-auto">
                  We have reserved your table under <strong className="text-[#D4AF37]">{formData.fullName}</strong>. Your confirmation code is <strong className="text-[#D4AF37]">{bookingId}</strong>.
                </p>

                <div className="p-4 rounded-sm bg-black/60 border border-white/10 text-left text-xs space-y-2 font-jakarta">
                  <div className="flex justify-between text-gray-300">
                    <span>Date & Time:</span>
                    <span className="font-semibold text-white">{formData.date} at {formData.timeSlot}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Guests:</span>
                    <span className="font-semibold text-white">{formData.guests} Persons</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Area:</span>
                    <span className="font-semibold text-[#D4AF37]">{formData.areaPreference}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Location:</span>
                    <span className="font-semibold text-white">Avinashi Road, Peelamedu</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 font-jakarta">
                  A reminder SMS and WhatsApp will be sent to {formData.phone || RESTAURANT_INFO.phone}. Valet parking is ready for your arrival.
                </p>

                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-sm bg-[#D4AF37] hover:bg-[#e2bd44] text-black font-jakarta font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Great, Thank You
                </button>
              </div>
            ) : (
              /* Reservation Form */
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#D4AF37] font-medium mb-2">
                    <div className="h-[1px] w-6 bg-[#D4AF37]" />
                    <span>HOSPITALITY RESERVATIONS</span>
                  </div>
                  <h3 className="font-cinzel text-2xl font-light text-white">Book Your Table</h3>
                  <p className="font-jakarta text-xs text-gray-400 mt-1">
                    Experience authentic Kongu and Tandoori dining with guaranteed table seating.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 font-jakarta text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 rounded-sm px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98422 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 rounded-sm px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-gray-400 mb-1">Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Time Slot *</label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-[#121212]">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Guests *</label>
                      <input
                        type="number"
                        min="1"
                        max="25"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                        className="w-full bg-black/50 border border-white/15 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Seating Preference</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['AC Dining Hall', 'Rooftop Terrace', 'Family Suite'].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setFormData({ ...formData, areaPreference: area })}
                          className={`py-2 px-2 text-center rounded-sm transition-colors cursor-pointer text-[11px] ${
                            formData.areaPreference === area
                              ? 'bg-[#D4AF37] text-black font-bold'
                              : 'bg-black/50 border border-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Special Occasion / Requests</label>
                    <input
                      type="text"
                      placeholder="e.g., Birthday celebration, anniversary, high chair needed"
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 rounded-sm px-3.5 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-sm bg-[#D4AF37] hover:bg-[#e2bd44] text-black font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-98"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Reservation</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
