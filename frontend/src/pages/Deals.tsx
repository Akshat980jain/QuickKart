import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, TrendingUp, Filter, Zap, Tag, ArrowRight, Flame } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { generateMockProducts } from '../data/generateMockProducts';

const Deals: React.FC = () => {
  const allProducts = generateMockProducts();
  const dealProducts = allProducts.filter(p => p.discount > 0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredDeals = selectedCategory === 'all'
    ? dealProducts
    : dealProducts.filter(p => p.category.toLowerCase().includes(selectedCategory));

  const dealCategories = [
    { id: 'all', label: 'All Hot Deals', count: dealProducts.length },
    { id: 'electronics', label: 'Electronics', count: dealProducts.filter(p => p.category.toLowerCase().includes('electronics')).length },
    { id: 'fashion', label: 'Fashion', count: dealProducts.filter(p => p.category.toLowerCase().includes('fashion')).length },
    { id: 'home', label: 'Home & Living', count: dealProducts.filter(p => p.category.toLowerCase().includes('home')).length },
    { id: 'beauty', label: 'Beauty', count: dealProducts.filter(p => p.category.toLowerCase().includes('beauty')).length },
  ];

  const topDeals = dealProducts.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0e1512] transition-colors duration-500 overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10 space-y-10">

        {/* ── Flash Sale Hero ── */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-floating border border-white/5">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00241a] via-[#0d3b2e] to-[#1a4a38]" />
          {/* Noise texture */}
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#fd6c1a]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 left-10 w-60 h-60 rounded-full bg-[#a3d0be]/8 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fd6c1a] text-white text-[10px] font-bold uppercase tracking-[0.12em] rounded-full shadow-orange">
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                Seasonal Flash Event
              </div>
              <h1 className="font-headline font-extrabold text-4xl sm:text-6xl xl:text-7xl tracking-[-0.03em] text-white leading-[1.03]">
                Autumn Hot <br className="hidden sm:block" />
                <span className="text-[#fd6c1a] italic">Deals</span> & Offers
              </h1>
              <p className="text-base text-[#a3d0be] max-w-xl leading-relaxed">
                Unbeatable limited-time discounts on our most coveted luxury essentials. Save up to 50% before inventory expires.
              </p>

              {/* Deal highlights */}
              <div className="flex flex-wrap gap-4 pt-2">
                {['Up to 50% OFF', 'Free Shipping', 'Extra 10% with code AUTUMN'].map((tag, i) => (
                  <div key={i} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-xs font-semibold text-white">
                    <Tag className="w-3 h-3 text-[#a3d0be]" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md p-7 rounded-3xl border border-white/15 text-center space-y-5">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#a3d0be]">
                  <Clock className="w-4 h-4 text-[#fd6c1a]" />
                  <span>Sale Ends In</span>
                  <span className="w-2 h-2 rounded-full bg-[#fd6c1a] animate-pulse" />
                </div>

                <div className="flex items-center justify-center gap-3">
                  {[
                    { val: timeLeft.hours, label: 'Hours' },
                    { val: null, label: null },
                    { val: timeLeft.minutes, label: 'Mins' },
                    { val: null, label: null },
                    { val: timeLeft.seconds, label: 'Secs' },
                  ].map((item, i) => 
                    item.val !== null ? (
                      <div key={i} className="flex flex-col items-center">
                        <div className="bg-[#00241a] w-16 sm:w-20 h-16 sm:h-20 rounded-2xl flex items-center justify-center shadow-card-lg border border-white/5">
                          <span className="font-headline font-extrabold text-3xl sm:text-4xl text-white tabular-nums">
                            {String(item.val).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold text-[#a3d0be]/70 uppercase tracking-wider mt-1.5">{item.label}</span>
                      </div>
                    ) : (
                      <span key={i} className="font-headline font-extrabold text-2xl text-white/40 mb-4">:</span>
                    )
                  )}
                </div>

                <div className="pt-1">
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#fd6c1a] to-[#e8480a] rounded-full transition-all"
                      style={{ width: `${((timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) / (24 * 3600)) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-[#a3d0be]/60 mt-2">Sale progress indicator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Featured Deal Cards ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-[#fd6c1a]" />
            <h2 className="font-headline font-bold text-xl text-[#00241a] dark:text-white">Featured Deals</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {topDeals.map((product, i) => (
              <div
                key={product.id}
                className="group relative rounded-3xl overflow-hidden h-52 flex items-end p-5 cursor-pointer shadow-card hover:shadow-card-xl transition-all duration-400 hover:-translate-y-1"
              >
                <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00241a]/90 via-[#00241a]/30 to-transparent" />
                <div className="relative z-10 space-y-1">
                  <div className="badge-hot inline-block">{product.discount}% OFF</div>
                  <p className="font-headline font-bold text-white text-sm line-clamp-2">{product.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Category Filter Bar ── */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-[#717974] dark:text-gray-400 uppercase tracking-wider flex-shrink-0 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {dealCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#00241a] text-white dark:bg-[#a3d0be] dark:text-[#002117] shadow-green'
                  : 'bg-white dark:bg-[#1c2722] text-[#414845] dark:text-gray-300 border border-[#e1e3e4] dark:border-[#2e3a35] hover:border-[#00241a]/30'
              }`}
            >
              {cat.label}
              {cat.count > 0 && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                  selectedCategory === cat.id
                    ? 'bg-white/20 text-white dark:text-[#002117] dark:bg-[#002117]/20'
                    : 'bg-[#e7e8e9] dark:bg-[#2e3a35] text-[#717974] dark:text-gray-400'
                }`}>
                  {cat.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Deals Summary Bar ── */}
        <div className="bg-white dark:bg-[#1c2722] rounded-2xl border border-[#e7e8e9] dark:border-[#2e3a35] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-[#414845] dark:text-gray-300">
            Showing <span className="font-bold text-[#00241a] dark:text-[#a3d0be]">{filteredDeals.length}</span> deals
            {selectedCategory !== 'all' && (
              <> in <span className="font-bold text-[#fd6c1a] capitalize">{selectedCategory}</span></>
            )}
          </p>
          <div className="flex items-center gap-2 text-[#fd6c1a] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Deals refresh every 24 hours
          </div>
        </div>

        {/* ── Deals Grid ── */}
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredDeals.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${(index % 8) * 60}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white dark:bg-[#1c2722] rounded-3xl border border-[#e7e8e9] dark:border-[#2e3a35]">
            <div className="w-16 h-16 rounded-full bg-[#f3f4f5] dark:bg-[#2e3a35] flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-[#717974]" />
            </div>
            <h3 className="font-headline font-bold text-xl text-[#191c1d] dark:text-white mb-2">No deals in this category</h3>
            <p className="text-sm text-[#717974] dark:text-gray-400 mb-4">Check back soon for new deals!</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-[#00241a] dark:bg-[#a3d0be] text-white dark:text-[#002117] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl"
            >
              View All Deals
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Deals;