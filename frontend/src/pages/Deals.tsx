import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, Tag, ArrowRight, Heart, Share2 } from 'lucide-react';

// Mock data for deals
const mockDeals = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    originalPrice: 299.99,
    discountPrice: 199.99,
    discount: 33,
    rating: 4.8,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Electronics",
    timeLeft: "2 days",
    isFavorite: false,
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    originalPrice: 399.99,
    discountPrice: 249.99,
    discount: 38,
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "Fitness",
    timeLeft: "5 hours",
    isFavorite: true,
    description: "Track your fitness goals with advanced health monitoring"
  },
  {
    id: 3,
    title: "Gaming Mechanical Keyboard",
    originalPrice: 159.99,
    discountPrice: 89.99,
    discount: 44,
    rating: 4.7,
    reviews: 634,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
    category: "Gaming",
    timeLeft: "1 day",
    isFavorite: false,
    description: "RGB backlit mechanical keyboard for gaming enthusiasts"
  },
  {
    id: 4,
    title: "Premium Coffee Maker",
    originalPrice: 249.99,
    discountPrice: 149.99,
    discount: 40,
    rating: 4.5,
    reviews: 1156,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    category: "Kitchen",
    timeLeft: "3 days",
    isFavorite: false,
    description: "Brew perfect coffee every time with programmable settings"
  },
  {
    id: 5,
    title: "Wireless Charging Pad",
    originalPrice: 79.99,
    discountPrice: 39.99,
    discount: 50,
    rating: 4.4,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
    category: "Electronics",
    timeLeft: "6 hours",
    isFavorite: false,
    description: "Fast wireless charging for all compatible devices"
  },
  {
    id: 6,
    title: "Smart Home Security Camera",
    originalPrice: 199.99,
    discountPrice: 119.99,
    discount: 40,
    rating: 4.6,
    reviews: 789,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    category: "Security",
    timeLeft: "4 days",
    isFavorite: true,
    description: "Monitor your home with HD video and smart alerts"
  }
];

const categories = ["All", "Electronics", "Fitness", "Gaming", "Kitchen", "Security"];

const DealCard = ({ deal, onToggleFavorite }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <div className="relative">
      <img 
        src={deal.image} 
        alt={deal.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
        -{deal.discount}%
      </div>
      <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={() => onToggleFavorite(deal.id)}
          className={`p-2 rounded-full transition-colors ${
            deal.isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Heart size={16} fill={deal.isFavorite ? 'currentColor' : 'none'} />
        </button>
        <button className="p-2 bg-white text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
          <Share2 size={16} />
        </button>
      </div>
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
        <Clock size={14} />
        {deal.timeLeft} left
      </div>
    </div>
    
    <div className="p-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
          {deal.category}
        </span>
        <div className="flex items-center gap-1">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">{deal.rating} ({deal.reviews})</span>
        </div>
      </div>
      
      <h3 className="font-bold text-lg mb-2 text-gray-900">{deal.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{deal.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">₹{deal.discountPrice}</span>
          <span className="text-lg text-gray-400 line-through">₹{deal.originalPrice}</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          View Deal <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </div>
);

const Deals = () => {
  const [deals, setDeals] = useState(mockDeals);
  const [filteredDeals, setFilteredDeals] = useState(mockDeals);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('discount');

  useEffect(() => {
    let filtered = deals;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(deal => 
        deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(deal => deal.category === selectedCategory);
    }

    // Sort deals
    switch (sortBy) {
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'price':
        filtered.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredDeals(filtered);
  }, [deals, searchTerm, selectedCategory, sortBy]);

  const handleToggleFavorite = (dealId) => {
    setDeals(prev => prev.map(deal => 
      deal.id === dealId ? { ...deal, isFavorite: !deal.isFavorite } : deal
    ));
  };

  const totalSavings = filteredDeals.reduce((sum, deal) => 
    sum + (deal.originalPrice - deal.discountPrice), 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🔥 Hot Deals & Discounts
            </h1>
            <p className="text-lg text-gray-600">
              Save big on top-rated products. Limited time offers!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">₹{totalSavings.toFixed(0)}</div>
              <div className="text-sm opacity-90">Total Savings Available</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">{filteredDeals.length}</div>
              <div className="text-sm opacity-90">Active Deals</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">Up to 50%</div>
              <div className="text-sm opacity-90">Maximum Discount</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search deals..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select 
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select 
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="discount">Sort by Discount</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredDeals.length === 0 ? (
          <div className="text-center py-12">
            <Tag size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No deals found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map(deal => (
              <DealCard 
                key={deal.id} 
                deal={deal} 
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="text-xl mb-6 opacity-90">
            Get notified about the hottest deals and exclusive discounts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;