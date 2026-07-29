import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Trash2, Share2, Grid, List, Package, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();
  const { toast } = useToast();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  const handleAddToCart = (item: typeof wishlistItems[0]) => {
    addToCart(item);
    toast(`"${item.name}" added to cart!`, 'success');
  };

  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeFromWishlist(id);
    toast(`"${name}" removed from wishlist`, 'info');
  };

  const handleShare = (item: typeof wishlistItems[0]) => {
    if (navigator.share) {
      navigator.share({ title: item.name, text: `Check out this ${item.name} on QuickKart!`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(`Check out this ${item.name} for ${formatPrice(item.price)} on QuickKart!`);
      toast('Product link copied!', 'info');
    }
  };

  const sortedAndFilteredItems = [...wishlistItems]
    .filter((item) => {
      if (filterBy === 'all') return true;
      if (filterBy === 'inStock') return item.inStock;
      if (filterBy === 'outOfStock') return !item.inStock;
      return item.category.toLowerCase() === filterBy.toLowerCase();
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'discount': return b.discount - a.discount;
        default: return a.name.localeCompare(b.name);
      }
    });

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = wishlistItems.reduce((sum, item) => {
    const original = item.discount > 0 ? item.price / (1 - item.discount / 100) : item.price;
    return sum + (original - item.price);
  }, 0);

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0e1512] flex items-center justify-center p-6 transition-colors duration-500">
        <div className="text-center max-w-md animate-fade-in">
          <div className="w-28 h-28 bg-gradient-to-br from-[#fd6c1a] to-[#e8480a] rounded-full flex items-center justify-center mx-auto mb-8 shadow-orange">
            <Heart className="w-14 h-14 text-white" />
          </div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-[#00241a] dark:text-white mb-4 tracking-tight">
            Your Wishlist is Empty
          </h2>
          <p className="text-[#717974] dark:text-gray-400 mb-8 leading-relaxed">
            Browse our curated collection and save items you love. Your favorites will appear here.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 bg-[#00241a] dark:bg-[#a3d0be] text-white dark:text-[#002117] font-headline font-bold px-8 py-4 rounded-2xl hover:bg-[#0d3b2e] dark:hover:bg-[#beedd9] transition-all shadow-green hover:-translate-y-0.5"
          >
            <Package className="w-5 h-5" />
            Browse Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0e1512] transition-colors duration-500">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10 space-y-8">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-headline font-extrabold text-4xl sm:text-5xl text-[#00241a] dark:text-white tracking-tight">
                My Wishlist
              </h1>
              <span className="inline-flex items-center justify-center w-9 h-9 bg-[#fd6c1a] text-white rounded-full font-bold text-sm shadow-orange">
                {wishlistItems.length}
              </span>
            </div>
            <p className="text-sm text-[#717974] dark:text-gray-400">Your curated collection of favorites</p>
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
            className="p-3 rounded-2xl bg-white dark:bg-[#1c2722] border border-[#e7e8e9] dark:border-[#2e3a35] text-[#414845] dark:text-gray-300 hover:bg-[#f3f4f5] dark:hover:bg-[#222e29] transition-colors shadow-xs"
          >
            {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
          </button>
        </div>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#1c2722] rounded-3xl p-6 border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#beedd9] dark:bg-[#0d3b2e] flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#00241a] dark:text-[#a3d0be] fill-current" />
              </div>
              <span className="text-xs font-bold text-[#717974] dark:text-gray-400 uppercase tracking-wider">Total Items</span>
            </div>
            <p className="font-headline font-extrabold text-3xl text-[#00241a] dark:text-white">{wishlistItems.length}</p>
          </div>
          <div className="bg-white dark:bg-[#1c2722] rounded-3xl p-6 border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-[#717974] dark:text-gray-400 uppercase tracking-wider">Total Value</span>
            </div>
            <p className="font-headline font-extrabold text-3xl text-emerald-600 dark:text-emerald-400">{formatPrice(totalValue)}</p>
          </div>
          <div className="bg-white dark:bg-[#1c2722] rounded-3xl p-6 border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#fd6c1a]/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#fd6c1a]" />
              </div>
              <span className="text-xs font-bold text-[#717974] dark:text-gray-400 uppercase tracking-wider">You Save</span>
            </div>
            <p className="font-headline font-extrabold text-3xl text-[#fd6c1a]">{formatPrice(totalSavings)}</p>
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="bg-white dark:bg-[#1c2722] rounded-3xl border border-[#e7e8e9] dark:border-[#2e3a35] p-5 shadow-card">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-bold text-[#717974] dark:text-gray-400 uppercase tracking-wider">Filter:</span>
              {['all', 'inStock', 'outOfStock'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterBy(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    filterBy === f
                      ? 'bg-[#00241a] dark:bg-[#a3d0be] text-white dark:text-[#002117]'
                      : 'bg-[#f3f4f5] dark:bg-[#222e29] text-[#414845] dark:text-gray-300'
                  }`}
                >
                  {f === 'all' ? 'All Items' : f === 'inStock' ? 'In Stock' : 'Out of Stock'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-xs font-bold text-[#717974] dark:text-gray-400 uppercase tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#f3f4f5] dark:bg-[#222e29] border border-[#e7e8e9] dark:border-[#2e3a35] text-sm font-semibold text-[#191c1d] dark:text-white px-3 py-2 rounded-xl focus:outline-none focus:border-[#00241a] dark:focus:border-[#a3d0be] transition-colors"
              >
                <option value="name">Name (A–Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Most Discounted</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Wishlist Items ── */}
        {sortedAndFilteredItems.length === 0 ? (
          <div className="bg-white dark:bg-[#1c2722] rounded-3xl border border-[#e7e8e9] dark:border-[#2e3a35] p-14 text-center shadow-card">
            <Heart className="mx-auto mb-4 text-[#e1e3e4] dark:text-[#2e3a35]" size={52} />
            <p className="text-[#717974] dark:text-gray-400 font-medium">No items match your current filter.</p>
          </div>
        ) : (
          <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {sortedAndFilteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`group card-premium overflow-hidden transition-all animate-fade-in ${viewMode === 'list' ? 'flex' : ''}`}
                style={{ animationDelay: `${(index % 8) * 60}ms` }}
              >
                {/* Image */}
                <div className={`relative overflow-hidden img-hover-zoom ${viewMode === 'list' ? 'w-44 sm:w-56 flex-shrink-0' : 'aspect-[4/5]'}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full object-cover transition-transform duration-700 ${viewMode === 'list' ? 'h-full group-hover:scale-105' : 'h-full group-hover:scale-108'}`}
                  />
                  {item.discount > 0 && (
                    <div className="absolute top-3 left-3 badge-hot">-{item.discount}%</div>
                  )}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white font-bold text-sm bg-black/50 px-4 py-2 rounded-xl">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[10px] text-[#fd6c1a] uppercase tracking-[0.1em] mb-1.5 font-bold">{item.category}</p>
                  <h3 className="font-headline font-semibold text-[#191c1d] dark:text-white mb-2.5 line-clamp-2 text-sm leading-snug">{item.name}</h3>
                  <div className="flex items-center gap-1.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-amber-400 fill-amber-400' : 'text-[#e1e3e4] dark:text-[#2e3a35] fill-current'}`} />
                    ))}
                    <span className="text-xs text-[#717974] dark:text-gray-400">({item.reviews})</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="font-headline font-extrabold text-lg text-[#00241a] dark:text-[#a3d0be]">{formatPrice(item.price)}</span>
                    {item.discount > 0 && (
                      <span className="text-xs text-[#717974] dark:text-gray-500 line-through">{formatPrice(item.price / (1 - item.discount / 100))}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-auto">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      aria-label={`Add ${item.name} to cart`}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                        item.inStock
                          ? 'bg-[#00241a] dark:bg-[#a3d0be] text-white dark:text-[#002117] hover:bg-[#0d3b2e] dark:hover:bg-[#beedd9] shadow-green hover:-translate-y-0.5'
                          : 'bg-[#f3f4f5] dark:bg-[#2e3a35] text-[#717974] cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {item.inStock ? 'Add to Cart' : 'Unavailable'}
                    </button>
                    <button
                      onClick={() => handleShare(item)}
                      aria-label={`Share ${item.name}`}
                      className="p-2.5 rounded-2xl border border-[#e7e8e9] dark:border-[#2e3a35] text-[#717974] dark:text-gray-400 hover:bg-[#f3f4f5] dark:hover:bg-[#222e29] transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                      aria-label={`Remove ${item.name} from wishlist`}
                      className="p-2.5 rounded-2xl border border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;