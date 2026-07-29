import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  CheckCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Star,
  Zap,
  Award,
  ChevronRight
} from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { generateMockProducts } from '../data/generateMockProducts';

const Home: React.FC = () => {
  const allProducts = generateMockProducts();
  const trendingProducts = allProducts.slice(0, 8);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const categories = [
    {
      id: 'home-decor',
      name: 'Home Decor',
      tag: 'Refined Living',
      slug: 'home-living',
      count: '1.2K+',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'modern-tech',
      name: 'Modern Tech',
      tag: 'Smart Design',
      slug: 'electronics',
      count: '840+',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'apparel',
      name: 'Apparel',
      tag: 'Timeless Style',
      slug: 'fashion',
      count: '2.1K+',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'wellness',
      name: 'Wellness',
      tag: 'Daily Ritual',
      slug: 'beauty',
      count: '650+',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const stats = [
    { value: '200K+', label: 'Happy Customers', icon: '😊' },
    { value: '50K+', label: 'Products', icon: '📦' },
    { value: '4.9★', label: 'Average Rating', icon: '⭐' },
    { value: '99%', label: 'On-Time Delivery', icon: '🚀' },
  ];

  const features = [
    { icon: Truck, title: 'Free Express Delivery', desc: 'On orders above ₹499. Swift same-day options available.' },
    { icon: ShieldCheck, title: 'Verified Authenticity', desc: '100% genuine products with manufacturer warranty.' },
    { icon: RotateCcw, title: '30-Day Returns', desc: 'Hassle-free returns, no questions asked policy.' },
    { icon: Headphones, title: '24/7 Concierge', desc: 'Premium support available around the clock.' },
  ];

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] transition-colors duration-500 overflow-x-hidden">
      
      {/* ─── HERO SECTION ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden" ref={heroRef}>
        {/* Background Orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orb bg-orb-primary opacity-60 pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-orb bg-orb-accent opacity-40 pointer-events-none" />
        <div className="absolute -bottom-20 right-1/3 w-[300px] h-[300px] bg-orb bg-orb-primary opacity-30 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* ── Left Hero Content ── */}
            <div className={`lg:col-span-6 z-10 space-y-7 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#beedd9] dark:bg-[#0d3b2e]/80 text-[#002117] dark:text-[#a3d0be] rounded-full text-xs font-bold uppercase tracking-widest border border-[#a3d0be]/40 dark:border-[#a3d0be]/20 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00241a] dark:bg-[#a3d0be] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00241a] dark:bg-[#a3d0be]"></span>
                </span>
                Autumn Collection 2024
              </div>

              {/* Headline */}
              <h1 className="font-headline text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-extrabold tracking-[-0.03em] text-[#00241a] dark:text-white leading-[1.03]">
                Elegance in{' '}
                <br className="hidden sm:block" />
                <span className="italic text-[#fd6c1a] relative">
                  Every Detail.
                  <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 240 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4C50 1.5 190 1.5 238 4" stroke="#fd6c1a" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
                  </svg>
                </span>
              </h1>

              {/* Subheading */}
              <p className="font-sans text-lg text-[#414845] dark:text-gray-300 max-w-xl leading-relaxed">
                Discover a curated collection where modern craftsmanship meets timeless design. Elevate your everyday with QuickKart's exclusive premium essentials.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link 
                  to="/products" 
                  className="group inline-flex items-center gap-2.5 bg-[#00241a] dark:bg-[#a3d0be] text-white dark:text-[#002117] font-headline font-bold text-sm px-8 py-4 rounded-2xl shadow-green hover:shadow-card-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  Shop The Collection
                  <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  to="/deals" 
                  className="inline-flex items-center gap-2.5 border-2 border-[#00241a] dark:border-[#a3d0be] text-[#00241a] dark:text-[#a3d0be] font-headline font-bold text-sm px-8 py-4 rounded-2xl hover:bg-[#00241a]/8 dark:hover:bg-[#a3d0be]/8 transition-all active:scale-95"
                >
                  <Zap className="w-4 h-4" />
                  View Hot Deals
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-2">
                  {['bg-amber-400', 'bg-emerald-400', 'bg-sky-400', 'bg-rose-400'].map((color, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-white dark:border-[#0e1512] flex items-center justify-center text-white text-xs font-bold shadow-xs`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-[#414845] dark:text-gray-400">
                  <span className="font-bold text-[#00241a] dark:text-[#a3d0be]">200K+</span> customers love QuickKart
                </div>
              </div>
            </div>

            {/* ── Right Hero Bento Images ── */}
            <div className={`lg:col-span-6 relative h-[480px] sm:h-[580px] w-full flex items-center justify-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              
              {/* Background Image (rotated) */}
              <div className="absolute top-0 right-0 w-4/5 h-[380px] sm:h-[450px] rounded-3xl overflow-hidden shadow-card-xl transform -rotate-3 z-0 border border-white/50 dark:border-[#2e3a35]/50 img-hover-zoom group cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&auto=format&fit=crop&q=80" 
                  alt="Luxury Living Interior" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#00241a]/20 to-transparent" />
              </div>

              {/* Foreground Image (rotated opposite) */}
              <div className="absolute bottom-0 left-0 w-[72%] h-[300px] sm:h-[370px] rounded-3xl overflow-hidden shadow-card-xl border-[6px] border-[#f8f9fa] dark:border-[#0e1512] transform rotate-3 z-10 img-hover-zoom cursor-pointer group">
                <img 
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80" 
                  alt="Handcrafted Accessories" 
                  className="w-full h-full object-cover"
                />
                {/* Discount chip */}
                <div className="absolute top-4 left-4 bg-[#fd6c1a] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-orange animate-pulse-ring">
                  20% OFF FIRST ORDER
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute top-8 left-4 sm:top-12 sm:-left-4 z-20 card-premium p-4 shadow-floating animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#beedd9] dark:bg-[#0d3b2e] flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <div className="font-headline font-bold text-base text-[#00241a] dark:text-white">4.9 / 5.0</div>
                    <div className="text-xs text-[#717974] dark:text-gray-400">200K+ Reviews</div>
                  </div>
                </div>
              </div>

              {/* Floating award card */}
              <div className="absolute bottom-16 right-2 sm:bottom-20 sm:-right-4 z-20 card-premium p-4 shadow-floating animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#fd6c1a]/10 dark:bg-[#fd6c1a]/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-[#fd6c1a]" />
                  </div>
                  <div>
                    <div className="font-headline font-bold text-sm text-[#00241a] dark:text-white">Top Rated 2024</div>
                    <div className="text-xs text-[#717974] dark:text-gray-400">Premium Store</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────────────────────── */}
      <div className="border-y border-[#e1e3e4]/60 dark:border-[#2e3a35]/60 bg-white/60 dark:bg-[#1c2722]/60 backdrop-blur-sm">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-[#e1e3e4]/60 dark:divide-[#2e3a35]/60">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 lg:px-8 first:pl-0 last:pr-0">
                <span className="text-3xl leading-none">{stat.icon}</span>
                <div>
                  <div className="font-headline font-extrabold text-2xl text-[#00241a] dark:text-white tracking-tight">{stat.value}</div>
                  <div className="text-xs text-[#717974] dark:text-gray-400 font-medium mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CURATED CATEGORIES ───────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#1c2722] py-20 border-b border-[#e1e3e4]/60 dark:border-[#2e3a35]/60 transition-colors duration-500 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orb bg-orb-primary opacity-40" />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#fd6c1a] uppercase tracking-[0.15em] block mb-2">Handpicked Selections</span>
              <h2 className="font-headline text-4xl sm:text-5xl font-extrabold text-[#00241a] dark:text-white tracking-tight">
                Curated Categories
              </h2>
              <p className="mt-3 text-base text-[#414845] dark:text-gray-400 max-w-md">
                Explore our expertly selected ranges, from daily essentials to luxury statement pieces.
              </p>
            </div>
            <Link 
              to="/products" 
              className="flex items-center gap-2 text-[#00241a] dark:text-[#a3d0be] font-bold text-sm hover:gap-3 transition-all group"
            >
              Explore All Categories
              <div className="w-7 h-7 rounded-full bg-[#00241a]/8 dark:bg-[#a3d0be]/10 flex items-center justify-center group-hover:bg-[#00241a]/15 dark:group-hover:bg-[#a3d0be]/20 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, index) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card hover:shadow-card-xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#00241a]/92 via-[#00241a]/30 to-[#00241a]/10 opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                
                {/* Count chip */}
                <div className="absolute top-4 right-4 bg-white/15 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                  {cat.count} Items
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 p-6 w-full translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] font-bold text-[#a3d0be]/80 uppercase tracking-[0.12em] block mb-1.5">{cat.tag}</span>
                  <h3 className="font-headline text-2xl font-bold text-white mb-3">{cat.name}</h3>
                  <div className="flex items-center gap-1.5 text-[#a3d0be] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <span>Shop Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRENDING PRODUCTS ────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-orb bg-orb-accent opacity-30" />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#fd6c1a] uppercase tracking-[0.15em] block mb-2">Seasonal Picks</span>
              <h2 className="font-headline text-4xl sm:text-5xl font-extrabold text-[#00241a] dark:text-white tracking-tight">
                Trending Now
              </h2>
            </div>
            <Link 
              to="/products" 
              className="flex items-center gap-2 text-[#00241a] dark:text-[#a3d0be] font-bold text-sm hover:gap-3 transition-all group"
            >
              View Full Catalog
              <div className="w-7 h-7 rounded-full bg-[#00241a]/8 dark:bg-[#a3d0be]/10 flex items-center justify-center group-hover:bg-[#00241a]/15 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

          {/* Tab Filters */}
          <div className="flex items-center gap-2.5 mb-8 overflow-x-auto scrollbar-none pb-1">
            {['All Items', 'New Arrivals', 'Best Sellers', 'On Sale', 'Limited Edition'].map((tab, i) => (
              <button
                key={tab}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  i === 0
                    ? 'bg-[#00241a] text-white dark:bg-[#a3d0be] dark:text-[#002117] shadow-green'
                    : 'bg-white dark:bg-[#1c2722] text-[#414845] dark:text-gray-300 border border-[#e1e3e4] dark:border-[#2e3a35] hover:border-[#00241a]/30 dark:hover:border-[#a3d0be]/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trendingProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL BANNERS ────────────────────────────────────────────────── */}
      <section className="py-8 pb-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Banner 1 */}
            <div className="group relative rounded-3xl overflow-hidden min-h-[420px] flex items-end p-8 sm:p-12 shadow-card hover:shadow-card-xl cursor-pointer border border-[#e1e3e4]/60 dark:border-[#2e3a35]/60 transition-all duration-500 hover:-translate-y-1">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=85" 
                alt="Artisan Collection" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00241a]/96 via-[#00241a]/50 to-transparent" />
              <div className="relative z-10 space-y-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#a3d0be] uppercase tracking-[0.15em] bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  <Sparkles className="w-3 h-3" /> Limited Release
                </span>
                <h3 className="font-headline text-3xl sm:text-4xl font-bold text-white leading-snug">The Artisan<br/>Collection</h3>
                <p className="text-sm text-gray-300 max-w-sm leading-relaxed opacity-90">Hand-selected materials crafted into minimalist furniture and lifestyle accents.</p>
                <Link 
                  to="/products?category=home-living" 
                  className="inline-flex items-center gap-2 bg-white text-[#00241a] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-[#beedd9] transition-colors shadow-lg"
                >
                  Shop Collection <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Banner 2 */}
            <div className="group relative rounded-3xl overflow-hidden min-h-[420px] flex items-end p-8 sm:p-12 shadow-card hover:shadow-card-xl cursor-pointer border border-[#e1e3e4]/60 dark:border-[#2e3a35]/60 transition-all duration-500 hover:-translate-y-1">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=85" 
                alt="Sustainable Essentials" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00241a]/96 via-[#00241a]/50 to-transparent" />
              <div className="relative z-10 space-y-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#fd6c1a] uppercase tracking-[0.15em] bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  <TrendingUp className="w-3 h-3" /> Eco Luxury
                </span>
                <h3 className="font-headline text-3xl sm:text-4xl font-bold text-white leading-snug">Sustainable<br/>Everyday Essentials</h3>
                <p className="text-sm text-gray-300 max-w-sm leading-relaxed opacity-90">Thoughtfully engineered apparel and footwear designed to last a lifetime.</p>
                <Link 
                  to="/products?category=footwear" 
                  className="inline-flex items-center gap-2 bg-[#fd6c1a] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-[#e8480a] transition-colors shadow-orange"
                >
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY QUICKKART ────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#1c2722] py-20 border-y border-[#e1e3e4]/60 dark:border-[#2e3a35]/60 transition-colors duration-500">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-[#fd6c1a] uppercase tracking-[0.15em] block mb-2">Our Promise</span>
            <h2 className="font-headline text-4xl sm:text-5xl font-extrabold text-[#00241a] dark:text-white tracking-tight">
              The QuickKart Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div 
                key={i} 
                className="group p-7 rounded-3xl bg-[#f8f9fa] dark:bg-[#222e29] border border-[#e7e8e9] dark:border-[#2e3a35] hover:border-[#00241a]/20 dark:hover:border-[#a3d0be]/20 hover:shadow-card-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#00241a] dark:bg-[#0d3b2e] text-[#a3d0be] flex items-center justify-center mb-5 shadow-green group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-headline font-bold text-base text-[#00241a] dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-[#717974] dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MORE PRODUCTS (Second Row) ───────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#fd6c1a] uppercase tracking-[0.15em] block mb-2">Members Choice</span>
              <h2 className="font-headline text-4xl sm:text-5xl font-extrabold text-[#00241a] dark:text-white tracking-tight">
                Staff Picks
              </h2>
            </div>
            <Link to="/products" className="flex items-center gap-2 text-[#00241a] dark:text-[#a3d0be] font-bold text-sm hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allProducts.slice(8, 12).map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────────────────────────── */}
      <section className="pb-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#00241a] via-[#0d3b2e] to-[#234e40] rounded-[2rem] p-10 sm:p-16 overflow-hidden shadow-floating border border-white/5">
            
            {/* Decorative orbs inside card */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#fd6c1a]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-[#a3d0be]/10 blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left content */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#fd6c1a] flex items-center justify-center shadow-orange">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Stay Ahead of the Drop
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
                  Join our private subscriber circle for early access to limited edition drops, exclusive lookbooks, and members-only pricing. No spam, ever.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  {['Early Access', 'Exclusive Deals', 'Members Pricing'].map((tag, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[#a3d0be] text-xs font-semibold">
                      <CheckCircle className="w-3.5 h-3.5 text-[#a3d0be]" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right form */}
              <div>
                {subscribed ? (
                  <div className="inline-flex items-center gap-3 bg-[#beedd9] text-[#002117] px-7 py-4 rounded-2xl font-bold text-sm shadow-card-lg animate-scale-in">
                    <CheckCircle className="w-5 h-5 text-[#00241a]" /> You're on the VIP guestlist! 🎉
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm px-5 py-4 rounded-2xl focus:outline-none focus:border-[#a3d0be] placeholder:text-gray-400 transition-colors"
                        required
                      />
                      <button 
                        type="submit" 
                        className="bg-[#fd6c1a] hover:bg-[#e8480a] text-white font-headline font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-2xl transition-all shadow-orange hover:shadow-card-lg hover:-translate-y-0.5 active:scale-95 flex-shrink-0 flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Join Now
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-400">By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;