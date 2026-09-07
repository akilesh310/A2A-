import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Search, Flame, Plus, Check, Sparkles, Filter, Leaf } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, DietaryType } from '../types';

interface InteractiveMenuProps {
  onAddToCart: (item: MenuItem) => void;
}

type MenuCategory = 'all' | 'starters' | 'chicken' | 'mutton' | 'seafood' | 'biryani' | 'veg' | 'desserts';

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({ onAddToCart }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'ALL DISHES' },
    { id: 'biryani', label: 'BIRYANI & RICE' },
    { id: 'starters', label: 'STARTERS' },
    { id: 'chicken', label: 'CHICKEN' },
    { id: 'mutton', label: 'MUTTON' },
    { id: 'seafood', label: 'SEAFOOD' },
    { id: 'veg', label: 'VEG SPECIALS' },
    { id: 'desserts', label: 'DESSERTS & DRINKS' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesDietary =
        dietaryFilter === 'all' ||
        (dietaryFilter === 'veg' && item.dietary === 'veg') ||
        (dietaryFilter === 'non-veg' && item.dietary === 'non-veg');
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tamilName && item.tamilName.includes(searchQuery)) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  const handleAddItem = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="py-24 sm:py-36 bg-[#0a0a0a] text-white relative min-h-screen border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with entrance animation */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 text-xs tracking-[0.35em] uppercase text-[#D4AF37] font-medium mb-3"
          >
            <div className="h-[1px] w-8 bg-[#D4AF37]" />
            <span>CULINARY SELECTION</span>
            <div className="h-[1px] w-8 bg-[#D4AF37]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light text-white"
          >
            The A2A <span className="text-[#D4AF37] italic font-normal">Menu</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-jakarta text-sm sm:text-base text-gray-400 mt-3 font-light"
          >
            Every dish is cooked fresh to order with pure ghee, stone-ground spices, and Kongu love.
          </motion.p>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#121212] p-3 sm:p-4 rounded-2xl border border-white/10 shadow-lg">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search biryani, starters, chukka..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-gray-400 font-jakarta hidden md:inline flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#D4AF37]" /> Filter:
            </span>
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-jakarta transition-colors cursor-pointer ${
                dietaryFilter === 'all'
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-jakarta flex items-center gap-1.5 transition-colors cursor-pointer ${
                dietaryFilter === 'veg'
                  ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 font-bold'
                  : 'text-gray-400 hover:text-emerald-400'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Pure Veg
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-jakarta flex items-center gap-1.5 transition-colors cursor-pointer ${
                dietaryFilter === 'non-veg'
                  ? 'bg-red-950/90 text-red-400 border border-red-500/40 font-bold'
                  : 'text-gray-400 hover:text-red-400'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400" />
              Non-Veg
            </button>
          </div>
        </div>

        {/* Section 12: Sticky Menu Category Bar with Animated Underline */}
        <div className="sticky top-[60px] z-30 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-10 overflow-x-auto no-scrollbar shadow-2xl shadow-black">
          <div className="flex items-center gap-2 sm:gap-4 min-w-max justify-start lg:justify-center">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-jakarta tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#D4AF37] font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>

                  {/* Animated Underline Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryUnderline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#D4AF37]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#121212] rounded-2xl border border-white/10 p-8">
            <p className="font-cinzel text-lg text-white">No dishes match your criteria</p>
            <p className="text-xs text-gray-400 mt-1 font-jakarta">Try clearing your search query or selecting another category.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 bg-[#D4AF37] text-black rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => {
                const isAdded = addedItemIds[item.id];

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(idx * 0.04, 0.3),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="bg-[#121212] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-black hover:-translate-y-1 flex flex-col justify-between"
                    data-cursor="explore"
                  >
                    {/* Food Image with Hover Effect */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#181818]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 group-hover:brightness-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />

                      {/* Gradient overlay for contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/20" />

                      {/* Dietary indicator dot badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/85 backdrop-blur-sm border border-white/10">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.dietary === 'veg' ? 'bg-emerald-400' : 'bg-red-500'
                          }`}
                        />
                        <span className="text-[10px] font-jakarta tracking-wider uppercase text-white/90 font-medium">
                          {item.dietary === 'veg' ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>

                      {/* Badges: Chef Special / Bestseller */}
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                        {item.isChefSpecial && (
                          <span className="px-2.5 py-0.5 rounded-sm bg-[#D4AF37] text-black text-[10px] font-jakarta font-bold uppercase tracking-wider shadow">
                            Chef's Special
                          </span>
                        )}
                        {item.isBestseller && (
                          <span className="px-2.5 py-0.5 rounded-sm bg-black/80 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-jakarta font-bold uppercase tracking-wider shadow">
                            Bestseller
                          </span>
                        )}
                      </div>

                      {/* Price Pill */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-sm bg-[#D4AF37] text-black font-jakarta font-bold text-xs shadow-lg">
                        ₹{item.price}
                      </div>

                      {/* Spice indicator */}
                      {item.spiceLevel > 0 && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-0.5 px-2 py-0.5 rounded-sm bg-black/70 backdrop-blur-sm text-[#D4AF37]">
                          {Array.from({ length: item.spiceLevel }).map((_, i) => (
                            <Flame key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Content Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                            {item.name}
                          </h3>
                        </div>

                        {item.tamilName && (
                          <p className="text-xs text-[#D4AF37] font-normal mt-0.5 font-sans">
                            {item.tamilName}
                          </p>
                        )}

                        <p className="font-jakarta text-xs text-gray-400 mt-2.5 line-clamp-2 leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>

                      {/* Action Bar */}
                      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[11px] font-jakarta text-gray-400">
                          {item.portion || 'Freshly Prepared'}
                        </span>

                        <button
                          onClick={() => handleAddItem(item)}
                          className={`px-3.5 py-1.5 rounded-sm text-xs font-jakarta font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                            isAdded
                              ? 'bg-emerald-500 text-black'
                              : 'bg-[#D4AF37] hover:bg-[#e2bd44] text-black active:scale-95'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Order</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
