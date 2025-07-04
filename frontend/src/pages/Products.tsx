import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, X, Search, Sparkles, Star } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../hooks/useProducts';

const categories = [
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
  { id: 'food', name: 'Food & Beverages' }
];

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

  // Update search params when filters change
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
  
  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchQuery(searchQuery);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSortBy('rating');
    setSortOrder('desc');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 mr-2" />
            Premium Products
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find everything you need from our curated collection of premium products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">
                  <Filter size={18} className="text-white" />
                </div>
                <span className="font-semibold text-gray-800">Filters</span>
              </div>
              <ChevronDown size={18} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Sidebar Filters */}
          <div 
            className={`${
              showFilters ? 'block' : 'hidden'
            } lg:block lg:w-80 space-y-6 sticky top-20 h-fit`}
          >
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-xl text-gray-900 flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">
                    <Filter size={16} className="text-white" />
                  </div>
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center group transition-colors"
                >
                  <X size={14} className="mr-1 group-hover:rotate-90 transition-transform" />
                  Clear All
                </button>
              </div>
              
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Star size={16} className="text-yellow-500 mr-2" />
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center group">
                      <input
                        type="radio"
                        id={category.id}
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={() => {
                          setSelectedCategory(category.id);
                          setCurrentPage(1);
                          setShowFilters(false);
                        }}
                        className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <label 
                        htmlFor={category.id} 
                        className="ml-3 text-gray-700 font-medium cursor-pointer group-hover:text-blue-600 transition-colors"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">₹{priceRange[0]}</span>
                    <span className="text-gray-600 font-medium">₹{priceRange[1]}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="text-xs text-gray-600 font-medium mb-1 block">Min</label>
                      <input
                        type="number"
                        min="0"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-xs text-gray-600 font-medium mb-1 block">Max</label>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sort Options */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Sort By</h3>
                <div className="space-y-3">
                  <div className="flex items-center group">
                    <input
                      type="radio"
                      id="rating-desc"
                      name="sort"
                      checked={sortBy === 'rating' && sortOrder === 'desc'}
                      onChange={() => { setSortBy('rating'); setSortOrder('desc'); }}
                      className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="rating-desc" className="ml-3 text-gray-700 font-medium cursor-pointer group-hover:text-blue-600 transition-colors">
                      Highest Rated
                    </label>
                  </div>
                  <div className="flex items-center group">
                    <input
                      type="radio"
                      id="price-asc"
                      name="sort"
                      checked={sortBy === 'price' && sortOrder === 'asc'}
                      onChange={() => { setSortBy('price'); setSortOrder('asc'); }}
                      className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="price-asc" className="ml-3 text-gray-700 font-medium cursor-pointer group-hover:text-blue-600 transition-colors">
                      Price: Low to High
                    </label>
                  </div>
                  <div className="flex items-center group">
                    <input
                      type="radio"
                      id="price-desc"
                      name="sort"
                      checked={sortBy === 'price' && sortOrder === 'desc'}
                      onChange={() => { setSortBy('price'); setSortOrder('desc'); }}
                      className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="price-desc" className="ml-3 text-gray-700 font-medium cursor-pointer group-hover:text-blue-600 transition-colors">
                      Price: High to Low
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product List */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <form onSubmit={handleSearchSubmit} className="flex-1">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Search for amazing products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-all duration-300 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white"
                    />
                    <div className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                      <Search size={20} />
                    </div>
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setCurrentPage(1);
                        }}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                </form>
                
                <div className="flex items-center gap-3">
                  <label htmlFor="mobile-sort" className="text-gray-700 font-semibold whitespace-nowrap">
                    Sort By:
                  </label>
                  <select
                    id="mobile-sort"
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [newSortBy, newSortOrder] = e.target.value.split('-') as ['price' | 'rating', 'asc' | 'desc'];
                      setSortBy(newSortBy);
                      setSortOrder(newSortOrder);
                    }}
                    className="border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 transition-colors bg-gray-50 font-medium"
                  >
                    <option value="rating-desc">Highest Rated</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Results Info */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600 text-lg">
                Showing <span className="font-semibold text-blue-600">{products.length}</span> products
                {searchQuery && <span> matching "<span className="font-semibold text-purple-600">{searchQuery}</span>"</span>}
              </p>
            </div>
            
            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="relative">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200"></div>
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-blue-600 animate-pulse" size={24} />
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-2xl text-red-700 border border-red-200 shadow-lg">
                <div className="flex items-center mb-2">
                  <X className="mr-2" size={20} />
                  <span className="font-semibold">Error</span>
                </div>
                <p>{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-12 rounded-2xl text-center shadow-lg">
                <div className="mb-6">
                  <Search className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">No products found</h3>
                  <p className="text-gray-600 text-lg mb-6">Try adjusting your filters or search terms to find what you're looking for.</p>
                </div>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                  {products.map(product => (
                    <div key={product.id} className="transform hover:scale-105 transition-all duration-300">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;