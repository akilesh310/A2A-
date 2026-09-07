export type DietaryType = 'veg' | 'non-veg' | 'egg';

export interface MenuItem {
  id: string;
  name: string;
  tamilName?: string;
  category: 'starters' | 'chicken' | 'mutton' | 'seafood' | 'biryani' | 'veg' | 'desserts';
  description: string;
  price: number;
  dietary: DietaryType;
  spiceLevel: 0 | 1 | 2 | 3; // 0: Mild, 1: Medium, 2: Spicy, 3: Fiery Kongu
  isChefSpecial?: boolean;
  isBestseller?: boolean;
  image: string;
  portion?: string;
}

export interface SignatureDish {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  dietary: DietaryType;
  spiceLevel: number;
  highlight: string;
  image: string;
  prepTime: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  favoriteDish: string;
  avatar?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ambience' | 'food' | 'kitchen' | 'moments';
  image: string;
  caption: string;
  aspect?: 'portrait' | 'landscape' | 'square';
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface ReservationDetails {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guests: number;
  areaPreference: 'AC Dining Hall' | 'Rooftop Terrace' | 'Traditional Family Suite';
  specialOccasion?: string;
}
