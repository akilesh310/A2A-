import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'explore' | 'hidden'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch device or reduced motion preference
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsTouchDevice(hasTouch || prefersReducedMotion || window.innerWidth < 1024);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Inspect target element for cursor states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewElem = target.closest('[data-cursor="view"]');
      const exploreElem = target.closest('[data-cursor="explore"]');
      const buttonElem = target.closest('button, a, input, [role="button"], select');

      if (viewElem) {
        setCursorType('view');
      } else if (exploreElem) {
        setCursorType('explore');
      } else if (buttonElem) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  const isTextCursor = cursorType === 'view' || cursorType === 'explore';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Ring / Contextual Pill */}
      <motion.div
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-colors duration-200 ${
          isTextCursor
            ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/40 font-cinzel tracking-widest text-[10px] font-bold'
            : cursorType === 'pointer'
            ? 'border-2 border-[#D4AF37] bg-[#D4AF37]/15'
            : 'border border-[#D4AF37]/60 bg-transparent'
        }`}
        animate={{
          x: position.x - (isTextCursor ? 36 : cursorType === 'pointer' ? 24 : 16),
          y: position.y - (isTextCursor ? 36 : cursorType === 'pointer' ? 24 : 16),
          width: isTextCursor ? 72 : cursorType === 'pointer' ? 48 : 32,
          height: isTextCursor ? 72 : cursorType === 'pointer' ? 48 : 32,
          scale: 1,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        {cursorType === 'view' && <span>VIEW</span>}
        {cursorType === 'explore' && <span>EXPLORE</span>}
      </motion.div>

      {/* Center Core Dot (hidden when showing contextual text) */}
      {!isTextCursor && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#D4AF37]"
          animate={{
            x: position.x - 4,
            y: position.y - 4,
            scale: cursorType === 'pointer' ? 1.5 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 35,
            stiffness: 500,
            mass: 0.1,
          }}
        />
      )}
    </div>
  );
};
