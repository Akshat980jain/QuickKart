// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  discount: number;
}

// Cart types
export interface CartItem extends Product {
  quantity: number;
}

// Order types
export interface OrderItem extends CartItem {}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: Address;
  paymentMethod: string;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

// Address type
export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Deal {
  id: number;
  title: string;
  originalPrice: number;
  discountPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  timeLeft: string;
  isFavorite: boolean;
  description: string;
  brand?: string;
  tags?: string[];
  stock?: number;
  expiryDate?: Date;
}

export interface DealCategory {
  id: string;
  name: string;
  icon: string;
  dealCount: number;
}

export interface DealFilter {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  discount?: number;
  inStock?: boolean;
}

export interface DealSortOptions {
  sortBy: 'discount' | 'price' | 'rating' | 'popularity' | 'newest';
  order: 'asc' | 'desc';
}

export interface Newsletter {
  email: string;
  preferences: {
    categories: string[];
    maxPrice: number;
    minDiscount: number;
  };
}

export interface DealStats {
  totalDeals: number;
  totalSavings: number;
  averageDiscount: number;
  topCategory: string;
}