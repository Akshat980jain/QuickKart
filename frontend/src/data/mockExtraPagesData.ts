export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'orders' | 'shipping' | 'returns' | 'payments' | 'account';
}

export interface LoyaltyTier {
  name: string;
  minPoints: number;
  perks: string[];
  color: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  tagline: string;
  description: string;
  origin: string;
  category: string;
  productCount: number;
  featured: boolean;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  distanceKm: number;
  lat: number;
  lng: number;
  amenities: string[];
  stockAvailable: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  coverImage: string;
  category: string;
  readTime: string;
  publishedAt: string;
  featured: boolean;
  shopTheLookProducts?: string[];
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  paymentMethod: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  itemsCount: number;
  shippingAddress: string;
  trackingNumber?: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  usageCount: number;
  maxUsage: number;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Scheduled';
}

export interface SupportTicket {
  id: string;
  ticketId: string;
  customerName: string;
  email: string;
  subject: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  lastUpdated: string;
  messagesCount: number;
}

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'orders',
    question: 'How do I track my active QuickKart order?',
    answer: 'You can track your order in real-time by going to your Account Profile > Order History, or by using the Order Success page link sent to your registered email.'
  },
  {
    id: 'faq-2',
    category: 'orders',
    question: 'Can I modify or cancel my order after placing it?',
    answer: 'Orders can be modified or cancelled within 30 minutes of placement directly from your profile, provided dispatch processing has not been initiated.'
  },
  {
    id: 'faq-3',
    category: 'shipping',
    question: 'What are the express shipping timelines?',
    answer: 'Standard shipping takes 2-4 business days. Express Same-Day Delivery is available for select metro postal codes when ordered before 12:00 PM.'
  },
  {
    id: 'faq-4',
    category: 'shipping',
    question: 'Do you offer international shipping?',
    answer: 'Yes! QuickKart ships globally to over 60 countries. International express delivery typically takes 5-8 business days.'
  },
  {
    id: 'faq-5',
    category: 'returns',
    question: 'What is QuickKart’s return & exchange policy?',
    answer: 'We offer a hassle-free 30-day return policy for unused items in original packaging. You can print a free return shipping label from our Returns Portal.'
  },
  {
    id: 'faq-6',
    category: 'payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept Credit/Debit Cards (Visa, Mastercard, AMEX), UPI payments, Apple Pay, Google Pay, Net Banking, and Cash on Delivery (COD).'
  }
];

// ─── LOYALTY TIERS DATA ────────────────────────────────────────────────────────
export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    name: 'Bronze Member',
    minPoints: 0,
    perks: ['1x Points on Purchases', 'Standard Birthday Voucher', 'Early Access to Seasonal Sales'],
    color: '#cd7f32'
  },
  {
    name: 'Silver Collective',
    minPoints: 1000,
    perks: ['1.5x Points on Purchases', 'Free Express Shipping Vouchers', 'Priority Customer Support'],
    color: '#c0c0c0'
  },
  {
    name: 'Gold Elite',
    minPoints: 3000,
    perks: ['2x Points on Purchases', 'Dedicated Concierge', 'Exclusive Product Pre-Orders', 'Free Returns Always'],
    color: '#ffd700'
  },
  {
    name: 'Platinum Vanguard',
    minPoints: 7500,
    perks: ['3x Points on Purchases', 'Personal Stylist Consultation', 'Annual VIP Mystery Gift', 'Zero Fees on International Shipping'],
    color: '#e5e4e2'
  }
];

// ─── BRANDS DATA ──────────────────────────────────────────────────────────────
export const MOCK_BRANDS: Brand[] = [
  {
    id: 'zenith-atelier',
    name: 'Zenith Atelier',
    logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Precision horology and luxury leathercraft',
    description: 'Crafted in Geneva with sustainable titanium and vegetable-tanned leather, Zenith Atelier creates timeless horological masterworks.',
    origin: 'Geneva, Switzerland',
    category: 'Modern Tech & Timepieces',
    productCount: 42,
    featured: true
  },
  {
    id: 'aero-labs',
    name: 'Aero Labs',
    logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Minimalist acoustic engineering',
    description: 'Pioneers in high-resolution spatial audio transducers and sleek ergonomic noise-cancelling headphones.',
    origin: 'Stockholm, Sweden',
    category: 'Audio & Gadgets',
    productCount: 28,
    featured: true
  },
  {
    id: 'monolith-living',
    name: 'Monolith Living',
    logo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Architectural ceramics & home accent sculpture',
    description: 'Hand-thrown stoneware vessels designed by Scandinavian architects for modern interior sanctuaries.',
    origin: 'Copenhagen, Denmark',
    category: 'Home Decor',
    productCount: 35,
    featured: true
  },
  {
    id: 'lumia-skin',
    name: 'Lumia Botanical',
    logo: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Organic bioactive skincare rituals',
    description: 'Cold-pressed botanical elixirs formulated with arctic berries and hyaluronic marine complexes.',
    origin: 'Reykjavik, Iceland',
    category: 'Wellness & Beauty',
    productCount: 19,
    featured: false
  }
];

// ─── STORES DATA ──────────────────────────────────────────────────────────────
export const MOCK_STORES: StoreLocation[] = [
  {
    id: 'store-1',
    name: 'QuickKart Flagship Pavilion',
    address: '450 Connaught Place, Block C',
    city: 'New Delhi',
    phone: '+91 11 4500 8800',
    hours: '10:00 AM - 9:30 PM (Mon-Sun)',
    distanceKm: 2.4,
    lat: 28.6315,
    lng: 77.2167,
    amenities: ['Same-Day Pickup', 'Personal Concierge Desk', 'Watch Winder Service', 'Cafe Lounge'],
    stockAvailable: true
  },
  {
    id: 'store-2',
    name: 'QuickKart Cyber Hub Experience Center',
    address: 'DLF Cyber City, Tower 10-B',
    city: 'Gurugram',
    phone: '+91 124 6710 9900',
    hours: '11:00 AM - 10:00 PM (Mon-Sun)',
    distanceKm: 14.8,
    lat: 28.495,
    lng: 77.089,
    amenities: ['Same-Day Pickup', 'Audio Soundproof Testing Booth', 'Express Return Drop-box'],
    stockAvailable: true
  },
  {
    id: 'store-3',
    name: 'QuickKart Bandra Collective',
    address: '78 Linking Road, Bandra West',
    city: 'Mumbai',
    phone: '+91 22 8899 4411',
    hours: '10:30 AM - 9:00 PM (Mon-Sun)',
    distanceKm: 28.5,
    lat: 19.06,
    lng: 72.83,
    amenities: ['Same-Day Pickup', 'VIP Styling Salon', 'Gift Wrapping Bar'],
    stockAvailable: true
  }
];

// ─── BLOG POSTS DATA ─────────────────────────────────────────────────────────
export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'the-art-of-minimalist-living',
    title: 'The Art of Minimalist Living: Designing a Calm Home Sanctuary',
    excerpt: 'Explore how thoughtful architectural ceramics and warm indirect lighting can transform your living space into a tranquil retreat.',
    content: `
      Living in a fast-paced world demands a home environment that promotes clarity and tranquility. Minimalist interior design is not merely about removing objects—it is about curated intentionality.

      ### 1. Embrace Natural Textures
      Subtle stoneware, matte linen, and unvarnished oak bring organic tactility to interior spaces. Instead of bright artificial surfaces, choose earthy ceramic vessels that ground the room.

      ### 2. Strategic Negative Space
      Allow furniture pieces room to breathe. A single statement armchair or a sculpted vessel on a wooden plinth creates a focal point without overcrowding the sensory field.

      ### 3. Warm Ambient Lighting
      Replace harsh overhead lighting with layered floor lamps, indirect LED strips, and warm amber temperature bulbs (2700K).
    `,
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      role: 'Chief Interior Curator'
    },
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&auto=format&fit=crop&q=80',
    category: 'Living & Design',
    readTime: '5 min read',
    publishedAt: 'July 24, 2026',
    featured: true
  },
  {
    id: 'blog-2',
    slug: 'titanium-horology-revolution',
    title: 'The Titanium Horology Revolution: Grade 5 Metal in Modern Timepieces',
    excerpt: 'Why luxury watchmakers are pivoting from 316L stainless steel to aerospace grade 5 titanium alloys.',
    content: `
      Titanium has quickly emerged as the metal of choice for contemporary luxury horology. Offering half the weight of stainless steel with superior corrosion resistance, it provides unparalleled wrist ergonomics.
    `,
    author: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      role: 'Senior Watch & Tech Editor'
    },
    coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=80',
    category: 'Craftsmanship',
    readTime: '7 min read',
    publishedAt: 'July 18, 2026',
    featured: false
  }
];

// ─── ADMIN ORDERS DATA ────────────────────────────────────────────────────────
export const MOCK_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: 'ord-1001',
    orderNumber: 'QK-98421',
    customerName: 'Julian Thorne',
    customerEmail: 'julian.t@example.com',
    date: '2026-07-28',
    total: 24990,
    paymentMethod: 'Credit Card',
    status: 'Delivered',
    itemsCount: 2,
    shippingAddress: '42 Regent Street, Flat 4B, New Delhi',
    trackingNumber: 'TRK-9081238'
  },
  {
    id: 'ord-1002',
    orderNumber: 'QK-98422',
    customerName: 'Sophia Chen',
    customerEmail: 'sophia.c@example.com',
    date: '2026-07-29',
    total: 12400,
    paymentMethod: 'UPI (GPay)',
    status: 'Processing',
    itemsCount: 1,
    shippingAddress: '15 Palm Avenue, Sector 54, Gurugram',
    trackingNumber: 'TRK-9081239'
  },
  {
    id: 'ord-1003',
    orderNumber: 'QK-98423',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.s@example.com',
    date: '2026-07-29',
    total: 48900,
    paymentMethod: 'Net Banking',
    status: 'Shipped',
    itemsCount: 4,
    shippingAddress: '88 Marine Drive, Mumbai',
    trackingNumber: 'TRK-9081240'
  },
  {
    id: 'ord-1004',
    orderNumber: 'QK-98424',
    customerName: 'Maya Patel',
    customerEmail: 'maya.p@example.com',
    date: '2026-07-29',
    total: 7500,
    paymentMethod: 'Cash on Delivery',
    status: 'Pending',
    itemsCount: 1,
    shippingAddress: '12 Indiranagar 10th Main, Bengaluru'
  }
];

// ─── ADMIN COUPONS DATA ──────────────────────────────────────────────────────
export const MOCK_ADMIN_COUPONS: AdminCoupon[] = [
  {
    id: 'c-1',
    code: 'QUICK20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 2000,
    usageCount: 412,
    maxUsage: 1000,
    expiryDate: '2026-08-31',
    status: 'Active'
  },
  {
    id: 'c-2',
    code: 'WELCOME500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 1500,
    usageCount: 1250,
    maxUsage: 5000,
    expiryDate: '2026-12-31',
    status: 'Active'
  },
  {
    id: 'c-3',
    code: 'VIPEXCLUSIVE',
    discountType: 'percentage',
    discountValue: 30,
    minOrderValue: 10000,
    usageCount: 88,
    maxUsage: 150,
    expiryDate: '2026-07-31',
    status: 'Active'
  }
];

// ─── SUPPORT TICKETS DATA ─────────────────────────────────────────────────────
export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 't-1',
    ticketId: 'TICK-4091',
    customerName: 'Rohan Mehta',
    email: 'rohan.m@example.com',
    subject: 'Request for size exchange on Wool Coat',
    category: 'Exchange',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-07-29 08:30 AM',
    lastUpdated: '10 mins ago',
    messagesCount: 2
  },
  {
    id: 't-2',
    ticketId: 'TICK-4089',
    customerName: 'Ananya Roy',
    email: 'ananya.r@example.com',
    subject: 'Delayed dispatch for Order #QK-98110',
    category: 'Shipping',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-07-28 04:15 PM',
    lastUpdated: '1 hour ago',
    messagesCount: 5
  },
  {
    id: 't-3',
    ticketId: 'TICK-4085',
    customerName: 'Vikram Malhotra',
    email: 'vikram.m@example.com',
    subject: 'Invoice copy required for company tax filing',
    category: 'Billing',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-07-27 11:00 AM',
    lastUpdated: 'Yesterday',
    messagesCount: 3
  }
];
