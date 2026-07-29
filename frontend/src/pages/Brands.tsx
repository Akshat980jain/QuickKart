import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Search, 
  Layers 
} from 'lucide-react';
import { MOCK_BRANDS } from '../data/mockExtraPagesData';

const Brands: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredBrands = MOCK_BRANDS.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || b.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#fd6c1a] bg-[#fd6c1a]/10 px-3.5 py-1 rounded-full">
            Curated Artisans & Houses
          </span>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl tracking-tight">Luxury Brands Directory</h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Discover master horologists, minimalist architects, and organic skincare laboratories partnered with QuickKart.
          </p>
        </div>

        {/* Featured Brand Banner */}
        {MOCK_BRANDS.filter(b => b.featured).slice(0, 1).map(brand => (
          <div key={brand.id} className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-[#2e3a35] group">
            <img
              src={brand.coverImage}
              alt={brand.name}
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 sm:p-12 flex flex-col justify-end text-white">
              <span className="text-xs uppercase tracking-widest text-[#a3d0be] font-bold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#fd6c1a]" /> Featured Maison
              </span>
              <h2 className="font-headline font-bold text-3xl sm:text-4xl mb-2">{brand.name}</h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-xl mb-4 font-light">{brand.description}</p>
              <div className="flex items-center gap-4">
                <Link
                  to={`/brands/${brand.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fd6c1a] hover:bg-[#e8480a] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
                >
                  Explore Collection ({brand.productCount} Items) <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search brands by name or origin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-[#1c2722] border border-gray-200 dark:border-[#2e3a35] text-sm focus:outline-none focus:ring-2 focus:ring-[#fd6c1a]"
            />
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBrands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brands/${brand.id}`}
              className="bg-white dark:bg-[#1c2722] rounded-2xl overflow-hidden border border-gray-200 dark:border-[#2e3a35] shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={brand.coverImage}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#a3d0be]" /> {brand.origin}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#fd6c1a]">{brand.category}</span>
                  <h3 className="font-headline font-bold text-xl text-[#191c1d] dark:text-white group-hover:text-[#fd6c1a] transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{brand.tagline}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-100 dark:border-[#2e3a35] text-xs font-semibold">
                <span className="text-gray-500">{brand.productCount} Products</span>
                <span className="text-[#00241a] dark:text-[#a3d0be] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  View <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Brands;
