// Single source of truth for all category data used across the app

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
  gradient: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    description: 'Latest gadgets and cutting-edge devices',
    productCount: 1250,
    gradient: 'from-blue-600 to-purple-600',
  },
  {
    id: 2,
    name: 'Fashion',
    slug: 'clothing',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80',
    description: 'Trendy fashion for every occasion',
    productCount: 2100,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    slug: 'home',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
    description: 'Transform your living space',
    productCount: 890,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 4,
    name: 'Sports & Outdoors',
    slug: 'sports',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80',
    description: 'Gear up for your adventures',
    productCount: 675,
    gradient: 'from-orange-500 to-red-500',
  },
];

// Flat list format for dropdowns/filters
export const CATEGORY_OPTIONS = [
  { id: 'all', name: 'All Categories' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'home', name: 'Home & Kitchen' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'sports', name: 'Sports' },
  { id: 'books', name: 'Books' },
  { id: 'toys', name: 'Toys' },
  { id: 'automotive', name: 'Automotive' },
  { id: 'garden', name: 'Garden' },
  { id: 'food', name: 'Food & Beverages' },
];

// Search suggestion mock data (used in Header)
export const SEARCH_SUGGESTIONS = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', trending: true },
  { id: 2, name: 'Smart Watch', category: 'Electronics', trending: true },
  { id: 3, name: 'Coffee Maker', category: 'Home & Kitchen', trending: false },
  { id: 4, name: 'Running Shoes', category: 'Sports', trending: true },
  { id: 5, name: 'Laptop Stand', category: 'Electronics', trending: false },
];
