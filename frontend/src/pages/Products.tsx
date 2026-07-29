import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, X, Search, Sparkles } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import ProductCardSkeleton from '../components/ui/ProductCardSkeleton';
import { useProducts } from '../hooks/useProducts';
import { CATEGORY_OPTIONS as categories } from '../data/categories';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  const pageParam = parseInt(searchParams.get('page') || '1');
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [currentPage, setCurrentPage] = useState(pageParam);
  
  const { products, loading, error } = useProducts({ limit: 20 });

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    if (currentPage > 1) {
      params.set('page', currentPage.toString());
    }
    setSearchParams(params);
  }, [selectedCategory, searchQuery, currentPage, setSearchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };
  
  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSortBy('rating');
    setSortOrder('desc');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#191c1d] transition-colors duration-300 py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-[#e1e3e4] dark:border-[#414845]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#beedd9] dark:bg-[#0d3b2e] text-[#002117] dark:text-[#a3d0be] rounded-full text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#00241a] dark:text-[#a3d0be]" /> Curated Catalog
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-[#00241a] dark:text-[#a3d0be] tracking-tight mb-2">
              Discover Essentials
            </h1>
            <p className="font-sans text-base text-[#414845] dark:text-gray-300 max-w-lg">
              Explore our handpicked collection of premium essentials designed for modern living.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#717974] dark:text-gray-400 uppercase tracking-widest bg-white dark:bg-[#2e3132] px-4 py-2.5 rounded-full border border-[#e1e3e4] dark:border-[#414845] shadow-sm">
              {products.length} Items Available
            </span>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between bg-white dark:bg-[#2e3132] p-4 rounded-2xl border border-[#e1e3e4] dark:border-[#414845] shadow-sm text-[#191c1d] dark:text-white"
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                <Filter className="w-4 h-4 text-[#fd6c1a]" /> Filters & Sort
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Sidebar Filter Box */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-72 space-y-6 sticky top-24 h-fit`}>
            <div className="bg-white dark:bg-[#2e3132] p-6 rounded-2xl border border-[#e1e3e4] dark:border-[#414845] shadow-sm space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#e1e3e4] dark:border-[#414845]">
                <h2 className="font-headline font-bold text-lg text-[#00241a] dark:text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#fd6c1a]" /> Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#fd6c1a] font-bold hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#717974] dark:text-gray-400 mb-4">
                  Category
                </h3>
                <div className="space-y-2.5">
                  {categories.map((cat) => (
                    <label 
                      key={cat.id}
                      className="flex items-center gap-3 text-sm text-[#191c1d] dark:text-gray-200 cursor-pointer hover:text-[#fd6c1a] transition-colors"
                    >
                      <input 
                        type="radio" 
                        name="category" 
                        value={cat.id}
                        checked={selectedCategory === cat.id}
                        onChange={() => {
                          setSelectedCategory(cat.id);
                          setCurrentPage(1);
                        }}
                        className="accent-[#00241a] dark:accent-[#a3d0be] w-4 h-4"
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#717974] dark:text-gray-400 mb-4">
                  Max Price: ₹{priceRange[1]}
                </h3>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#00241a] dark:accent-[#a3d0be] bg-[#edeeef] dark:bg-[#191c1d] h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Sort By */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#717974] dark:text-gray-400 mb-4">
                  Sort Order
                </h3>
                <div className="space-y-2.5 text-sm text-[#191c1d] dark:text-gray-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="sort" 
                      checked={sortBy === 'rating'} 
                      onChange={() => { setSortBy('rating'); setSortOrder('desc'); }}
                      className="accent-[#00241a] dark:accent-[#a3d0be]"
                    />
                    <span>Highest Rated</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="sort" 
                      checked={sortBy === 'price' && sortOrder === 'asc'} 
                      onChange={() => { setSortBy('price'); setSortOrder('asc'); }}
                      className="accent-[#00241a] dark:accent-[#a3d0be]"
                    />
                    <span>Price: Low to High</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="sort" 
                      checked={sortBy === 'price' && sortOrder === 'desc'} 
                      onChange={() => { setSortBy('price'); setSortOrder('desc'); }}
                      className="accent-[#00241a] dark:accent-[#a3d0be]"
                    />
                    <span>Price: High to Low</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Catalog Area */}
          <main className="flex-1 space-y-6">
            {/* Top Search & Filter Control Bar */}
            <div className="bg-white dark:bg-[#2e3132] p-4 rounded-2xl border border-[#e1e3e4] dark:border-[#414845] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f3f4f5] dark:bg-[#191c1d] text-sm text-[#191c1d] dark:text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#c0c8c3] dark:border-[#414845] focus:outline-none focus:border-[#00241a]"
                />
                <Search className="w-4 h-4 text-[#717974] absolute left-3.5 top-3" />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-[#717974]">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <span className="text-xs font-semibold text-[#717974] uppercase tracking-wider">Sort:</span>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [newSortBy, newSortOrder] = e.target.value.split('-') as ['price' | 'rating', 'asc' | 'desc'];
                    setSortBy(newSortBy);
                    setSortOrder(newSortOrder);
                  }}
                  className="bg-[#f3f4f5] dark:bg-[#191c1d] border border-[#c0c8c3] dark:border-[#414845] text-xs font-semibold text-[#191c1d] dark:text-white px-3 py-2.5 rounded-xl focus:outline-none"
                >
                  <option value="rating-desc">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="p-8 bg-red-50 text-red-700 rounded-2xl border border-red-200">
                <p>{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-[#2e3132] rounded-2xl border border-[#e1e3e4] dark:border-[#414845] space-y-4">
                <Search className="w-12 h-12 text-[#717974] mx-auto" />
                <h3 className="font-headline font-bold text-xl text-[#191c1d] dark:text-white">No products found</h3>
                <p className="text-sm text-[#717974]">Try clearing filters or searching for something else.</p>
                <button 
                  onClick={clearFilters}
                  className="bg-[#00241a] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <ProductCard key={`${product.id}-${index}`} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;