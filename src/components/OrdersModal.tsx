import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Clock, PackageOpen, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { db } from '../firebase';

interface SavedOrder {
  id: string;
  orderNumber: string;
  total: number;
  orderType: string;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  items: { name: string; price: number; quantity: number }[];
}

interface OrdersModalProps { isOpen: boolean; onClose: () => void; userId: string | null; }

export const OrdersModal: React.FC<OrdersModalProps> = ({ isOpen, onClose, userId }) => {
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !userId) return;
    setLoading(true);
    return onSnapshot(query(collection(db, 'users', userId, 'orders'), orderBy('createdAt', 'desc')), (snapshot) => {
      setOrders(snapshot.docs.map((document) => ({ id: document.id, ...document.data() } as SavedOrder)));
      setLoading(false);
    }, () => setLoading(false));
  }, [isOpen, userId]);

  return <AnimatePresence>{isOpen && (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-label="Close order history" className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} className="relative flex max-h-[80vh] w-full max-w-lg flex-col border border-white/10 bg-[#121212] shadow-2xl">
        <header className="flex items-center justify-between border-b border-white/10 p-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">Live order view</p><h2 className="mt-1 font-cinzel text-xl text-white">Your orders</h2></div><button onClick={onClose} className="p-2 text-white/60 hover:text-white"><X className="h-5 w-5" /></button></header>
        <div className="overflow-y-auto p-5">{loading ? <p className="py-10 text-center text-xs text-gray-400">Loading your orders…</p> : orders.length === 0 ? <div className="py-12 text-center"><PackageOpen className="mx-auto h-10 w-10 text-[#D4AF37]" /><p className="mt-4 text-sm text-white">No orders yet</p><p className="mt-1 text-xs text-gray-400">Your placed orders will appear here live.</p></div> : <div className="space-y-3">{orders.map((order) => <article key={order.id} className="border border-white/10 bg-black/30 p-4"><div className="flex items-start justify-between"><div><p className="font-cinzel text-sm text-white">{order.orderNumber}</p><p className="mt-1 text-[10px] uppercase tracking-wider text-gray-500">{order.orderType} · {order.paymentMethod}</p></div><span className="border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-2 py-1 text-[10px] font-bold uppercase text-[#D4AF37]">{order.status}</span></div><div className="mt-3 space-y-1 border-y border-white/10 py-3 text-xs text-gray-300">{order.items.map((item, index) => <div key={index} className="flex justify-between"><span>{item.name} × {item.quantity}</span><span>₹{item.price * item.quantity}</span></div>)}</div><div className="mt-3 flex items-center justify-between text-xs"><span className="flex items-center gap-1 text-gray-400"><Clock className="h-3.5 w-3.5" />{order.paymentStatus}</span><strong className="text-[#D4AF37]">₹{order.total}</strong></div></article>)}</div>}</div>
      </motion.section>
    </div>
  )}</AnimatePresence>;
};
