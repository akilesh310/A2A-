import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SignatureDishes } from './components/SignatureDishes';
import { AboutSection } from './components/AboutSection';
import { WhyA2ASection } from './components/WhyA2ASection';
import { InteractiveMenu } from './components/InteractiveMenu';
import { VideoSharedSection } from './components/VideoSharedSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { ReservationModal } from './components/ReservationModal';
import { OrderDrawer } from './components/OrderDrawer';
import { FloatingCTA } from './components/FloatingCTA';
import { Footer } from './components/Footer';
import { CartItem, MenuItem } from './types';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('a2a_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('a2a_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cart]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (menuItem: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { menuItem, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.menuItem.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-jakarta selection:bg-[#D4AF37] selection:text-black relative">
      {/* 1. Loading Screen (Section 24) */}
      <LoadingScreen />

      {/* 2. Custom Desktop Cursor (Section 21) */}
      <CustomCursor />

      {/* 3. Top Scroll Progress Indicator (Section 5) */}
      <ScrollProgressBar />

      {/* 4. Sticky Animated Navbar (Section 23) */}
      <Navbar
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenOrder={() => setIsOrderDrawerOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Main Content Sections Flow */}
      <main>
        {/* 1. CINEMATIC HERO VIDEO (Section 2, 3, 4) */}
        <HeroSection
          onExploreMenu={scrollToMenu}
          onOrderNow={() => setIsOrderDrawerOpen(true)}
        />

        {/* 2. SIGNATURE DISHES (Section 7) */}
        <SignatureDishes onAddToCart={handleAddToCart} />

        {/* 3. RESTAURANT STORY (Section 9, 10, 17) */}
        <AboutSection />

        {/* 4. WHY A2A (Section 14) */}
        <WhyA2ASection />

        {/* 5. INTERACTIVE MENU (Section 11, 12, 13) */}
        <InteractiveMenu onAddToCart={handleAddToCart} />

        {/* 6. CINEMATIC FOOD VIDEO (Section 16) */}
        <VideoSharedSection />

        {/* 7. PHOTO GALLERY & LIGHTBOX (Section 15) */}
        <GallerySection />

        {/* 8. CUSTOMER REVIEWS (Section 18) */}
        <ReviewsSection />

        {/* 9. LOCATION & GOOGLE MAP (Section 19) */}
        <LocationSection
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenOrder={() => setIsOrderDrawerOpen(true)}
        />
      </main>

      {/* 10. PREMIUM FOOTER */}
      <Footer />

      {/* Floating CTA & Mobile Sticky Navigation Bar (Section 20) */}
      <FloatingCTA
        onOpenOrder={() => setIsOrderDrawerOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Interactive Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Interactive Order Drawer & Cart */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
