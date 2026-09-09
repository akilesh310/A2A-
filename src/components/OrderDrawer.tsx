import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, CheckCircle, ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { db } from '../firebase';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  user: User | null;
  onRequireAuth: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  user,
  onRequireAuth,
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | 'card'>('cash');
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const deliveryCharge = orderType === 'delivery' && subtotal > 0 ? 40 : 0;
  const total = subtotal + gst + deliveryCharge;

  const saveOrder = async () => {
    if (!user) {
      onRequireAuth();
      return false;
    }
    setIsSaving(true);
    setSubmitError('');
    try {
      const generatedOrderNumber = `A2A-${Date.now().toString().slice(-6)}`;
      await addDoc(collection(db, 'users', user.uid, 'orders'), {
        orderNumber: generatedOrderNumber,
        userId: user.uid,
        customer: { name: customerName || user.displayName || '', email: user.email || '', phone: customerPhone, address: orderType === 'delivery' ? customerAddress : '' },
        orderType,
        items: cart.map(({ menuItem, quantity, specialInstructions }) => ({ id: menuItem.id, name: menuItem.name, price: menuItem.price, quantity, specialInstructions: specialInstructions || '' })),
        notes,
        subtotal,
        gst,
        deliveryCharge,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'cash' ? 'Pay at counter / on delivery' : 'Payment pending',
        status: 'Received',
        createdAt: serverTimestamp(),
      });
      setOrderNumber(generatedOrderNumber);
      setIsSubmitted(true);
      return true;
    } catch (error) {
      console.error('Could not save order:', error);
      setSubmitError('Your order could not be saved. Check Firestore setup and try again.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleWhatsAppOrder = async () => {
    if (cart.length === 0) return;

    const saved = await saveOrder();
    if (!saved) return;

    let message = `*A2A RESTAURANT COIMBATORE - NEW ORDER*\n`;
    message += `Order Type: ${orderType.toUpperCase()}\n`;
    if (customerName) message += `Customer Name: ${customerName}\n`;
    if (customerPhone) message += `Phone: ${customerPhone}\n`;
    if (orderType === 'delivery' && customerAddress) message += `Address: ${customerAddress}\n`;
    message += `\n*ITEMS:*\n`;

    cart.forEach((item) => {
      message += `• ${item.menuItem.name} x ${item.quantity} = ₹${item.menuItem.price * item.quantity}\n`;
    });

    message += `\nSubtotal: ₹${subtotal}\n`;
    message += `GST (5%): ₹${gst}\n`;
    if (deliveryCharge > 0) message += `Delivery Fee: ₹${deliveryCharge}\n`;
    message += `*Total Amount: ₹${total}*\n`;
    if (notes) message += `Notes: ${notes}\n`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');

  };

  const handleInstantCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    await saveOrder();
  };

  const handleResetOrder = () => {
    setIsSubmitted(false);
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Slide-out Drawer Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#121212] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-white">Your Order</h3>
                    <p className="text-[11px] font-jakarta text-[#D4AF37]">
                      {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-sm hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {isSubmitted ? (
                  /* Success Screen */
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="font-cinzel text-2xl font-light text-white">Order Received!</h4>
                    <p className="font-jakarta text-xs text-gray-300 max-w-xs mx-auto">
                      Your order <strong className="text-[#D4AF37]">{orderNumber}</strong> has been logged. Our kitchen at Avinashi Road is preparing your meal fresh!
                    </p>
                    <div className="p-4 rounded-sm bg-black/60 border border-white/10 text-left text-xs space-y-1.5 font-jakarta">
                      <div className="flex justify-between text-gray-400">
                        <span>Order Method:</span>
                        <span className="uppercase text-white font-semibold">{orderType}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Estimated Preparation:</span>
                        <span className="text-[#D4AF37] font-semibold">20-25 mins</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Total Paid / Due:</span>
                        <span className="text-white font-bold">₹{total}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleResetOrder}
                      className="w-full py-3 rounded-sm bg-[#D4AF37] hover:bg-[#e2bd44] text-black font-jakarta font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Done / Order More
                    </button>
                  </div>
                ) : cart.length === 0 ? (
                  /* Empty State */
                  <div className="py-20 text-center space-y-3">
                    <div className="w-16 h-16 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="font-cinzel text-lg text-white">Your cart is empty</h4>
                    <p className="text-xs text-gray-400 font-jakarta max-w-xs mx-auto">
                      Browse our signature biryanis, Kongu roasts, and starters to begin your culinary journey.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-4 px-6 py-2.5 rounded-sm bg-[#D4AF37] text-black text-xs font-bold font-jakarta cursor-pointer hover:bg-[#e2bd44]"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Order Type Toggle */}
                    <div>
                      <label className="block text-xs font-jakarta uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                        Dining Preference
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'dine-in', label: 'Dine-in' },
                          { id: 'takeaway', label: 'Takeaway' },
                          { id: 'delivery', label: 'Delivery' },
                        ].map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setOrderType(type.id as any)}
                            className={`py-2 rounded-sm text-xs font-jakarta font-bold transition-all cursor-pointer ${
                              orderType === type.id
                                ? 'bg-[#D4AF37] text-black shadow-md'
                                : 'bg-black/50 border border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-400 font-jakarta">
                        <span>Items</span>
                        <button
                          onClick={onClearCart}
                          className="text-red-400 hover:underline text-[11px] cursor-pointer"
                        >
                          Clear all
                        </button>
                      </div>

                      {cart.map((item) => (
                        <div
                          key={item.menuItem.id}
                          className="flex items-center justify-between p-3 rounded-sm bg-black/50 border border-white/10"
                        >
                          <div className="flex-1 pr-3">
                            <h5 className="font-cinzel text-xs sm:text-sm font-bold text-white leading-tight">
                              {item.menuItem.name}
                            </h5>
                            <span className="text-xs text-[#D4AF37] font-semibold">
                              ₹{item.menuItem.price * item.quantity}
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-black/80 px-2 py-1 rounded-sm border border-white/15">
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                              className="p-1 text-white/70 hover:text-white cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-jakarta font-bold text-white w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                              className="p-1 text-white/70 hover:text-white cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.menuItem.id)}
                            className="p-1.5 ml-2 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Customer Info Form */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-black/50 border border-white/15 rounded-sm px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Contact Phone Number (+91)"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full bg-black/50 border border-white/15 rounded-sm px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      {orderType === 'delivery' && (
                        <div>
                          <input
                            type="text"
                            placeholder="Delivery Address in Coimbatore (Street, Area, Landmark)"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="w-full bg-black/50 border border-white/15 rounded-sm px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      )}
                      <div>
                        <input
                          type="text"
                          placeholder="Cooking instructions (e.g., spicy, extra raita)"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full bg-black/50 border border-white/15 rounded-sm px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    {/* Bill Breakdown */}
                    <div>
                      <label className="mb-2 block text-xs font-jakarta font-semibold uppercase tracking-wider text-gray-400">Payment method</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[{ id: 'cash', label: orderType === 'delivery' ? 'Cash / COD' : 'Pay at counter' }, { id: 'upi', label: 'UPI' }, { id: 'card', label: 'Card' }].map((method) => <button key={method.id} type="button" onClick={() => setPaymentMethod(method.id as 'cash' | 'upi' | 'card')} className={`min-h-12 rounded-sm border px-1 text-[10px] font-bold ${paymentMethod === method.id ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]' : 'border-white/10 bg-black/40 text-gray-400'}`}>{method.label}</button>)}
                      </div>
                      {paymentMethod !== 'cash' && <p className="mt-2 text-[10px] text-gray-500">Online payment is marked pending until a payment gateway is connected.</p>}
                    </div>
                    <div className="p-4 rounded-sm bg-black/60 border border-white/10 space-y-2 text-xs font-jakarta">
                      <div className="flex justify-between text-gray-400">
                        <span>Item Subtotal</span>
                        <span>₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Taxes (GST 5%)</span>
                        <span>₹{gst}</span>
                      </div>
                      {orderType === 'delivery' && (
                        <div className="flex justify-between text-gray-400">
                          <span>Delivery Fee (Peelamedu area)</span>
                          <span>₹{deliveryCharge}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-white/10 flex justify-between text-white font-bold text-sm">
                        <span>Grand Total</span>
                        <span className="text-[#D4AF37]">₹{total}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer Actions */}
              {!isSubmitted && cart.length > 0 && (
                <div className="p-6 border-t border-white/10 space-y-3 bg-[#121212]">
                  <button
                    onClick={handleWhatsAppOrder}
                    disabled={isSaving}
                    className="w-full py-3.5 rounded-sm bg-[#25D366] hover:bg-[#20bd5a] text-black font-jakarta font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSaving ? 'Saving order…' : 'Order via WhatsApp'}</span>
                  </button>

                  <button
                    onClick={handleInstantCheckout}
                    disabled={isSaving}
                    className="w-full py-3 rounded-sm bg-[#D4AF37] hover:bg-[#e2bd44] text-black font-jakarta font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-98"
                  >
                    <span>{isSaving ? 'Saving order…' : user ? 'Place order' : 'Sign in to place order'}</span>
                  </button>
                  {submitError && <p className="text-center text-[11px] text-red-300">{submitError}</p>}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
