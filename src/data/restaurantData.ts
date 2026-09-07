import { MenuItem, SignatureDish, Review, GalleryItem } from '../types';

export const RESTAURANT_INFO = {
  name: 'A2A Restaurant',
  tagline: 'Authentic Flavours, Memorable Moments',
  city: 'Coimbatore',
  state: 'Tamil Nadu',
  country: 'India',
  address: '1442, Avinashi Road, Near Nava India Junction, Peelamedu, Coimbatore, Tamil Nadu 641004',
  landmark: 'Opposite to Hindustan College / Near Fun Republic Mall',
  phone: '+91 98422 45890',
  secondaryPhone: '+91 422 256 7890',
  whatsappNumber: '919842245890',
  email: 'dine@a2arestaurant.in',
  hours: {
    lunch: '11:30 AM – 04:00 PM',
    dinner: '06:30 PM – 11:30 PM',
    days: 'Open All 7 Days'
  },
  rating: 4.8,
  totalReviews: '2,400+',
  googleMapsUrl: 'https://maps.google.com/?q=Avinashi+Road+Peelamedu+Coimbatore+Tamil+Nadu',
  heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-with-fire-in-a-restaurant-kitchen-41617-large.mp4',
  heroPoster: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop', // Sizzling biryani with spices
  sharedVideo: 'https://assets.mixkit.co/videos/preview/mixkit-hands-serving-food-at-a-dining-table-41590-large.mp4',
  sharedPoster: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop'
};

export const SIGNATURE_DISHES: SignatureDish[] = [
  {
    id: 'sig-1',
    name: 'A2A Seeraga Samba Mutton Biryani',
    subtitle: 'Slow-Cooked Dum with Kongu Tender Goat',
    description: 'Fragrant short-grain Seeraga Samba rice gently simmered in pure ghee, stone-ground whole spices, and succulent prime mutton pieces cooked in brass degs over wood fire.',
    price: 360,
    dietary: 'non-veg',
    spiceLevel: 2,
    highlight: 'Wood-Fired Dum & Pure Ghee',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
    prepTime: '25 mins'
  },
  {
    id: 'sig-2',
    name: 'Kongunadu Chicken Chinthamani',
    subtitle: 'Rustic Crushed Red Chilli & Shallot Roast',
    description: 'A legendary regional recipe from the Kongu heartland—farm country chicken tossed with hand-torn whole red chillies, shallots, and curry leaves in cold-pressed sesame oil.',
    price: 320,
    dietary: 'non-veg',
    spiceLevel: 3,
    highlight: 'No Masala Powder • 100% Whole Spice',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1200&auto=format&fit=crop',
    prepTime: '18 mins'
  },
  {
    id: 'sig-3',
    name: 'Clay Oven Charcoal Tandoori Pomfret',
    subtitle: 'Fresh Bay of Bengal Catch Marinated in Stone-Ground Curd Spice',
    description: 'Whole silver pomfret fish marinated in yellow mustard, Kashmiri chillies, ajwain, and hung curd, blistered over flaming hardwood charcoal in our traditional tandoor.',
    price: 450,
    dietary: 'non-veg',
    spiceLevel: 2,
    highlight: 'Fresh Daily Catch • Charcoal Smoky',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
    prepTime: '22 mins'
  },
  {
    id: 'sig-4',
    name: 'Chettinad Pepper Mutton Chukka',
    subtitle: 'Dry Roasted Black Pepper & Fennel Crusted',
    description: 'Tender mutton cubes slow-roasted until dark mahogany with sun-dried Tellicherry black peppercorns, roasted coconut slivers, and fragrant star anise.',
    price: 390,
    dietary: 'non-veg',
    spiceLevel: 3,
    highlight: 'Tellicherry Peppercorn Crusted',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    prepTime: '20 mins'
  },
  {
    id: 'sig-5',
    name: 'Pallipalayam Tiger Prawns',
    subtitle: 'Country Garlic, Shallot & Fresh Coconut Sliver Toss',
    description: 'Plump jumbo coastal prawns cooked with garlic pods, crushed dried red chillies, and paper-thin coconut flakes, bursting with rich Kongu aroma.',
    price: 420,
    dietary: 'non-veg',
    spiceLevel: 2,
    highlight: 'Kongu Culinary Treasure',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=1200&auto=format&fit=crop',
    prepTime: '15 mins'
  },
  {
    id: 'sig-6',
    name: 'Madurai Style Mutton Kari Dosa',
    subtitle: 'Thick Crispy Dosa Layered with Egg & Spicy Minced Lamb',
    description: 'A Coimbatore favorite—golden crispy batter griddled on cast iron, topped with beaten egg and a generous heap of rich, slow-braised minced mutton gravy.',
    price: 290,
    dietary: 'non-veg',
    spiceLevel: 2,
    highlight: 'Cast-Iron Crisp & Rich Keema',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop',
    prepTime: '12 mins'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Biryani
  {
    id: 'm-biryani-1',
    name: 'A2A Seeraga Samba Mutton Biryani',
    tamilName: 'ஏ2ஏ சீரக சம்பா மட்டன் பிரியாணி',
    category: 'biryani',
    description: 'Traditional wood-fired Seeraga Samba short-grain rice with tender goat meat, slow-cooked in pure ghee, served with ennai kathirikai & onion raita.',
    price: 360,
    dietary: 'non-veg',
    spiceLevel: 2,
    isChefSpecial: true,
    isBestseller: true,
    portion: 'Serves 1-2',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-biryani-2',
    name: 'Kongu Nattu Kozhi Biryani',
    tamilName: 'கொங்கு நாட்டுக்கோழி பிரியாணி',
    category: 'biryani',
    description: 'Authentic free-range country chicken infused with aromatic spices and ghee-roasted garlic in fragrant Seeraga Samba rice.',
    price: 320,
    dietary: 'non-veg',
    spiceLevel: 2,
    isBestseller: true,
    portion: 'Serves 1-2',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-biryani-3',
    name: 'Hyderabadi Dum Chicken Biryani',
    tamilName: 'ஹைதராபாதி தம் சிக்கன் பிரியாணி',
    category: 'biryani',
    description: 'Long-grain aged basmati rice layered with saffron milk, caramelized shallots, and tender chicken slow cooked under sealed dough.',
    price: 290,
    dietary: 'non-veg',
    spiceLevel: 2,
    portion: 'Serves 1-2',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-biryani-4',
    name: 'Claypot Prawn Dum Biryani',
    tamilName: 'மண்பானை இறால் பிரியாணி',
    category: 'biryani',
    description: 'Succulent coastal prawns tossed with mint, coriander, and Seeraga Samba rice baked inside a sealed claypot over glowing coals.',
    price: 380,
    dietary: 'non-veg',
    spiceLevel: 2,
    isChefSpecial: true,
    portion: 'Serves 1-2',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-biryani-5',
    name: 'Kalan Paneer Dum Biryani (Veg)',
    tamilName: 'காளான் பன்னீர் தம் பிரியாணி',
    category: 'biryani',
    description: 'Button mushrooms and fresh malai paneer cubes slow dum cooked with green herbs, whole spices, saffron, and basmati rice.',
    price: 240,
    dietary: 'veg',
    spiceLevel: 1,
    portion: 'Serves 1-2',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=800&auto=format&fit=crop'
  },

  // Starters
  {
    id: 'm-start-1',
    name: 'Chicken Chinthamani (Dry)',
    tamilName: 'சிக்கன் சிந்தாமணி',
    category: 'starters',
    description: 'Signature Kongu dry starter tossed with crushed red chillies, shallots, and curry leaves in cold-pressed sesame oil.',
    price: 280,
    dietary: 'non-veg',
    spiceLevel: 3,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-start-2',
    name: 'Golden Crispy Dragon Chicken',
    tamilName: 'ட்ராகன் சிக்கன்',
    category: 'starters',
    description: 'Tender chicken strips wok-tossed with roasted cashews, bell peppers, honey-chilli glaze, and spring onions.',
    price: 290,
    dietary: 'non-veg',
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-start-3',
    name: 'Kothu Parotta (Mutton / Chicken / Veg)',
    tamilName: 'சுடச்சுட கொத்து பரோட்டா',
    category: 'starters',
    description: 'Flaky layered Malabar parottas chopped on sizzling iron with egg, onions, salna gravy, and aromatic whole spices.',
    price: 220,
    dietary: 'non-veg',
    spiceLevel: 2,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-start-4',
    name: 'Paneer Ghee Roast',
    tamilName: 'பன்னீர் நெய் ரோஸ்ட்',
    category: 'starters',
    description: 'Soft cottage cheese chunks pan-fried in rich spiced Mangalorean Byadgi chilli paste and artisanal cow ghee.',
    price: 250,
    dietary: 'veg',
    spiceLevel: 2,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-start-5',
    name: 'Gobi 65 & Baby Corn Toss',
    tamilName: 'கோபி 65',
    category: 'starters',
    description: 'Crunchy battered cauliflower florets and tender baby corn tossed with curry leaves, crushed garlic, and green chillies.',
    price: 190,
    dietary: 'veg',
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop'
  },

  // Chicken
  {
    id: 'm-chk-1',
    name: 'Kongunadu Nattu Kozhi Kulambu',
    tamilName: 'நாட்டுக்கோழி குழம்பு',
    category: 'chicken',
    description: 'Country chicken simmered in traditional earthen pots with freshly pounded coriander seeds, shallots, and black pepper.',
    price: 340,
    dietary: 'non-veg',
    spiceLevel: 3,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-chk-2',
    name: 'Butter Chicken Masala',
    tamilName: 'பட்டர் சிக்கன் மசாலா',
    category: 'chicken',
    description: 'Char-grilled tandoori chicken cooked in velvety tomato cream gravy finished with fenugreek and butter.',
    price: 310,
    dietary: 'non-veg',
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-chk-3',
    name: 'Pallipalayam Chicken Gravy',
    tamilName: 'பள்ளிபாளையம் சிக்கன் கிரேவி',
    category: 'chicken',
    description: 'Aromatic boneless chicken infused with sliced fresh coconut, garlic pods, and whole red chillies.',
    price: 310,
    dietary: 'non-veg',
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop'
  },

  // Mutton
  {
    id: 'm-mut-1',
    name: 'Chettinad Pepper Mutton Chukka',
    tamilName: 'செட்டிநாடு பெப்பர் மட்டன் சுக்கா',
    category: 'mutton',
    description: 'Tender baby goat meat slow roasted dry with whole tellicherry black pepper, roasted coconut flakes, and curry leaves.',
    price: 390,
    dietary: 'non-veg',
    spiceLevel: 3,
    isChefSpecial: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-mut-2',
    name: 'Mutton Nenju Elumbu Rasam Soup',
    tamilName: 'மட்டன் நெஞ்சு எலும்பு ரசம்',
    category: 'mutton',
    description: 'Clear healing mutton ribs broth simmered with crushed peppercorns, cumin, shallots, and fresh coriander root.',
    price: 180,
    dietary: 'non-veg',
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-mut-3',
    name: 'Kari Dosa with Egg & Minced Mutton',
    tamilName: 'மதுரை காரி தோசை',
    category: 'mutton',
    description: 'Crisp cast iron dosa topped with farm fresh beaten egg and deeply seasoned mutton keema gravy.',
    price: 290,
    dietary: 'non-veg',
    spiceLevel: 2,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop'
  },

  // Seafood
  {
    id: 'm-sea-1',
    name: 'Charcoal Tandoori Silver Pomfret',
    tamilName: 'தந்தூரி வவ்வால் மீன்',
    category: 'seafood',
    description: 'Whole silver pomfret marinated in coastal spice curd and grilled over incandescent charcoal embers.',
    price: 450,
    dietary: 'non-veg',
    spiceLevel: 2,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-sea-2',
    name: 'Vanjaram Fish Fry (King Fish Tawa Fry)',
    tamilName: 'வஞ்சிரம் தவா மீன் வறுவல்',
    category: 'seafood',
    description: 'Thick fresh Vanjaram slice marinated in red chilli tamarind paste, pan-seared crisp on iron tawa with curry leaves.',
    price: 420,
    dietary: 'non-veg',
    spiceLevel: 2,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-sea-3',
    name: 'Crab Pepper Masala (Nandu Roast)',
    tamilName: 'நண்டு பெப்பர் மசாலா',
    category: 'seafood',
    description: 'Sea crabs cracked and simmered in fiery black pepper and shallot masala with fresh ground spices.',
    price: 410,
    dietary: 'non-veg',
    spiceLevel: 3,
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=800&auto=format&fit=crop'
  },

  // Veg
  {
    id: 'm-veg-1',
    name: 'Kongu Urulai Roast (Baby Potato Roast)',
    tamilName: 'கொங்கு உருளை ரோஸ்ட்',
    category: 'veg',
    description: 'Tender baby potatoes slow-roasted in cold pressed gingelly oil with curry leaves, garlic, and sambar podi.',
    price: 190,
    dietary: 'veg',
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-veg-2',
    name: 'Dal Makhani Bukhara Style',
    tamilName: 'தால் மக்கானி',
    category: 'veg',
    description: 'Whole black lentils and kidney beans slow-simmered overnight over charcoal embers with fresh churned butter.',
    price: 230,
    dietary: 'veg',
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-veg-3',
    name: 'Ennai Kathirikai Kulambu',
    tamilName: 'எண்ணெய் கத்திரிக்காய் குழம்பு',
    category: 'veg',
    description: 'Small purple brinjal stuffed with roasted peanut, sesame, and tamarind spice blend, simmered to perfection.',
    price: 210,
    dietary: 'veg',
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop'
  },

  // Desserts & Beverages
  {
    id: 'm-des-1',
    name: 'Elaneer Payasam (Tender Coconut Kheer)',
    tamilName: 'இளநீர் பாயாசம்',
    category: 'desserts',
    description: 'Silky chilled coconut milk dessert blended with fresh tender coconut pulp, cardamom, and toasted cashew nuts.',
    price: 140,
    dietary: 'veg',
    spiceLevel: 0,
    isChefSpecial: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-des-2',
    name: 'Warm Gulab Jamun with Rabri & Pistachio',
    tamilName: 'குலாப் ஜாமூன் & ரப்ரி',
    category: 'desserts',
    description: 'Mawa dumplings soaked in saffron-rose syrup, served atop slow-reduced cardamom rabri and crushed Iranian pistachios.',
    price: 160,
    dietary: 'veg',
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-des-3',
    name: 'Authentic Kumbakonam Degree Filter Coffee',
    tamilName: 'கும்பகோணம் டிகிரி ஃபில்டர் காபி',
    category: 'desserts',
    description: 'Brewed with 80:20 plantation chicory blend and frothy fresh whole milk served in traditional brass dabarah and tumbler.',
    price: 60,
    dietary: 'veg',
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm-des-4',
    name: 'Nannari & Lemon Soda with Chia Seeds',
    tamilName: 'நன்னாரி லெமன் சோடா',
    category: 'desserts',
    description: 'Refreshing wild sarsaparilla root syrup infused with freshly squeezed Coimbatore key limes and sparkling soda.',
    price: 90,
    dietary: 'veg',
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop'
  }
];

export const WHY_A2A_FEATURES = [
  {
    id: 'f-1',
    title: 'Fresh Flavours',
    subtitle: 'Stone-Ground Daily',
    description: 'No preservatives or artificial coloring. Spices are roasted fresh every morning in brass cauldrons and ground on granite millstones for unmatched aroma.',
    tag: 'Authentic Spices'
  },
  {
    id: 'f-2',
    title: 'Something for Everyone',
    subtitle: 'From Kongu to Tandoori',
    description: 'Whether you crave fiery pepper chukka, aromatic Seeraga Samba biryani, wood-fired tandoori grills, or rich vegetarian curries, every palate finds delight.',
    tag: 'Diverse Selection'
  },
  {
    id: 'f-3',
    title: 'Family Friendly',
    subtitle: 'Warm Tamil Hospitality',
    description: 'Spacious AC dining halls, rooftop breeze seating, attentive table service, and dedicated celebrations zone designed for families, friends, and corporate gatherings.',
    tag: 'Pure Comfort'
  },
  {
    id: 'f-4',
    title: 'Easy to Reach',
    subtitle: 'Avinashi Road Landmark',
    description: 'Prime central location on Avinashi Road, Peelamedu, with complimentary valet parking, wheelchair accessibility, and fast takeaway pickup bays.',
    tag: 'Valet Parking'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Biryani Dum Sealing Ritual',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
    caption: 'Sealing the brass deg with whole wheat dough over charcoal embers',
    aspect: 'landscape'
  },
  {
    id: 'gal-2',
    title: 'Flame Wok Sear',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
    caption: 'High-heat stir fry producing authentic smoky wok-hei',
    aspect: 'portrait'
  },
  {
    id: 'gal-3',
    title: 'Sizzling Charcoal Tandoor',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
    caption: 'Fresh silver pomfret pulled red-hot from clay tandoor oven',
    aspect: 'square'
  },
  {
    id: 'gal-4',
    title: 'Warm Evening Dining Ambiance',
    category: 'ambience',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    caption: 'Golden ambient lighting and cozy teakwood booths',
    aspect: 'landscape'
  },
  {
    id: 'gal-5',
    title: 'Heritage Brass & Ghee Pour',
    category: 'moments',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    caption: 'Pure cow ghee drizzled over piping hot pepper mutton chukka',
    aspect: 'portrait'
  },
  {
    id: 'gal-6',
    title: 'Signature Cast Iron Kari Dosa',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop',
    caption: 'Golden griddled dosa topped with seasoned lamb keema',
    aspect: 'landscape'
  },
  {
    id: 'gal-7',
    title: 'The Rooftop Terrace at Dusk',
    category: 'ambience',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop',
    caption: 'Pleasant Coimbatore evening breeze with ambient lantern glow',
    aspect: 'landscape'
  },
  {
    id: 'gal-8',
    title: 'Traditional Filter Coffee Froth',
    category: 'moments',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
    caption: 'Poured from height creating signature frothy metre-coffee cap',
    aspect: 'square'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Karthik Senthilvelan',
    location: 'Race Course, Coimbatore',
    rating: 5,
    date: '2 days ago',
    comment: 'Without doubt the finest Seeraga Samba biryani in Coimbatore! The mutton was falling off the bone and the aroma of pure ghee and roasted whole spices took me straight back to authentic village feasts.',
    favoriteDish: 'A2A Seeraga Samba Mutton Biryani',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    name: 'Dr. Meenakshi Sundaram',
    location: 'RS Puram, Coimbatore',
    rating: 5,
    date: '1 week ago',
    comment: 'The Kongu Chicken Chinthamani is sheer perfection—crisp red chillies and shallots without heavy powdered gravy. Our family visited for dinner and the hospitality was exceptional. Will definitely be returning regularly!',
    favoriteDish: 'Kongunadu Chicken Chinthamani',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    name: 'Vigneshwaran Ramanathan',
    location: 'Saravanampatti, Coimbatore',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Charcoal Tandoori Pomfret was extraordinarily fresh and juicy. The restaurant decor has this rich, warm cinema aesthetic with very comfortable seating and courteous staff. Also loved the Elaneer Payasam!',
    favoriteDish: 'Tandoori Pomfret & Elaneer Payasam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-4',
    name: 'Ananya & Praveen',
    location: 'Saibaba Colony, Coimbatore',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Celebrated our anniversary at their AC terrace hall. The Kari Dosa, Mutton Chukka, and Kumbakonam filter coffee left every guest raving. Easy valet parking on Avinashi road is a huge plus.',
    favoriteDish: 'Madurai Kari Dosa & Mutton Chukka',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
  }
];

export const QUALITATIVE_STATS = [
  {
    value: '30+',
    unit: 'Years',
    label: 'Culinary Lineage',
    description: 'Rooted in timeless Tamil culinary wisdom'
  },
  {
    value: '100%',
    unit: 'Pure',
    label: 'Stone-Ground Spices',
    description: 'Cold-pressed oils & whole spices roasted daily'
  },
  {
    value: '48+',
    unit: 'Dishes',
    label: 'Mastered Recipes',
    description: 'Carefully curated regional specialties'
  },
  {
    value: '4.8★',
    unit: 'Rating',
    label: 'Coimbatore Diners',
    description: 'Over 2,400+ verified customer reviews'
  }
];
