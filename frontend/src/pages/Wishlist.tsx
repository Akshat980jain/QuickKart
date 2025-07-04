import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Trash2, Share2, Filter, Grid, List } from 'lucide-react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 89.99,
      originalPrice: 129.99,
      image: '/api/placeholder/300/300',
      rating: 4.5,
      reviews: 234,
      inStock: true,
      category: 'Electronics',
      discount: 31
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 199.99,
      originalPrice: 249.99,
      image: '/api/placeholder/300/300',
      rating: 4.7,
      reviews: 567,
      inStock: true,
      category: 'Fitness',
      discount: 20
    },
    {
      id: 3,
      name: 'Portable Laptop Stand',
      price: 34.99,
      originalPrice: 49.99,
      image: '/api/placeholder/300/300',
      rating: 4.3,
      reviews: 89,
      inStock: false,
      category: 'Accessories',
      discount: 30
    },
    {
      id: 4,
      name: 'Wireless Charging Pad',
      price: 24.99,
      originalPrice: 34.99,
      image: '/api/placeholder/300/300',
      rating: 4.1,
      reviews: 156,
      inStock: true,
      category: 'Electronics',
      discount: 29
    }
  ]);

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = (item) => {
    alert(`Added ${item.name} to cart!`);
  };

  const shareItem = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out this ${item.name} for ₹${item.price}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Check out this ${item.name} for ₹${item.price}`);
      alert('Link copied to clipboard!');
    }
  };

  const sortedAndFilteredItems = wishlistItems
    .filter(item => {
      if (filterBy === 'all') return true;
      if (filterBy === 'inStock') return item.inStock;
      if (filterBy === 'outOfStock') return !item.inStock;
      return item.category.toLowerCase() === filterBy.toLowerCase();
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return b.discount - a.discount;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Heart className="mr-3 text-red-500" size={28} />
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <span className="ml-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              {wishlistItems.length}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              {viewMode === 'grid' ? <List size={18} /> : <Grid size={18} />}
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Items</h3>
            <p className="text-2xl font-bold text-blue-600">{wishlistItems.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Value</h3>
            <p className="text-2xl font-bold text-green-600">₹{totalValue.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Savings</h3>
            <p className="text-2xl font-bold text-red-600">₹{totalSavings.toFixed(2)}</p>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" size={18} />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Items</option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
                <option value="electronics">Electronics</option>
                <option value="fitness">Fitness</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="discount">Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        {sortedAndFilteredItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Heart className="mx-auto mb-4 text-gray-400" size={48} />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500">Start adding items you love to your wishlist!</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {sortedAndFilteredItems.map(item => (
              <div key={item.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}>
                <div className={`relative ${viewMode === 'list' ? 'w-48' : ''}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full object-cover ${viewMode === 'list' ? 'h-48' : 'h-56'}`}
                  />
                  {item.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                      -{item.discount}%
                    </div>
                  )}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">({item.reviews})</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <span className="text-xl font-bold text-blue-600">₹{item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{item.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                      className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                        item.inStock
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4 inline mr-2" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => shareItem(item)}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <Share2 size={16} />
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 border border-red-300 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
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