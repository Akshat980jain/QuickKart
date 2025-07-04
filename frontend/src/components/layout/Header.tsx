import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Search, 
  LogOut, 
  ShoppingBag,
  Bell,
  Heart,
  Package,
  Settings,
  ChevronDown,
  Sparkles,
  Star,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

// Mock data for search suggestions
const mockSearchSuggestions = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", trending: true },
  { id: 2, name: "Smart Watch", category: "Electronics", trending: true },
  { id: 3, name: "Coffee Maker", category: "Home & Kitchen", trending: false },
  { id: 4, name: "Running Shoes", category: "Sports", trending: true },
  { id: 5, name: "Laptop Stand", category: "Electronics", trending: false },
];

// Add categories mock data from Home.tsx
const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Latest gadgets and cutting-edge devices",
    productCount: 1250,
    gradient: "from-blue-600 to-purple-600"
  },
  {
    id: 2,
    name: "Fashion",
    slug: "clothing",
    image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Trendy fashion for every occasion",
    productCount: 2100,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 3,
    name: "Home & Kitchen",
    slug: "home",
    image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Transform your living space",
    productCount: 890,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    name: "Sports & Outdoors",
    slug: "sports",
    image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Gear up for your adventures",
    productCount: 675,
    gradient: "from-orange-500 to-red-500"
  }
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter search suggestions
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSearchSuggestions.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchQuery]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    navigate(`/products?search=${encodeURIComponent(suggestion.name)}`);
    setIsSearchFocused(false);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const mockNotifications = [
    { id: 1, title: "Order Shipped", message: "Your order #1234 has been shipped", time: "2 hours ago", unread: true },
    { id: 2, title: "Flash Sale", message: "50% off on electronics", time: "4 hours ago", unread: true },
    { id: 3, title: "Order Delivered", message: "Your order has been delivered", time: "1 day ago", unread: false },
  ];

  const unreadNotifications = mockNotifications.filter(n => n.unread).length;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              <span>support@quickkart.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Free shipping on orders over ₹50
            </span>
            <div className="flex items-center">
              <Sparkles className="w-4 h-4 mr-1 animate-pulse" />
              <span>New Year Sale - Up to 70% Off!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white shadow-md'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center group">
              <div className="relative">
                <ShoppingBag className="mr-2 transition-transform group-hover:scale-110" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QuickKart
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`relative py-2 px-4 rounded-full transition-all duration-300 ${
                  isActiveRoute('/') 
                    ? 'text-blue-600 bg-blue-50 shadow-sm' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Home
                {isActiveRoute('/') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </Link>
              <Link 
                to="/products" 
                className={`relative py-2 px-4 rounded-full transition-all duration-300 ${
                  isActiveRoute('/products') 
                    ? 'text-blue-600 bg-blue-50 shadow-sm' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Products
                {isActiveRoute('/products') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </Link>
              <div className="relative group">
                <button
                  className={`relative py-2 px-4 rounded-full transition-all duration-300 flex items-center ${
                    isActiveRoute('/categories')
                      ? 'text-blue-600 bg-blue-50 shadow-sm'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  Categories
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto transition-all duration-200">
                  <div className="py-2">
                    {categories.map(category => (
                      <Link
                        key={category.id}
                        to={`/products?category=${category.slug}`}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <img src={category.image} alt={category.name} className="w-10 h-10 rounded-lg object-cover mr-3" />
                        <div>
                          <div className="font-semibold text-gray-900">{category.name}</div>
                          <div className="text-xs text-gray-500">{category.productCount} products</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link 
                to="/deals" 
                className={`relative py-2 px-4 rounded-full transition-all duration-300 flex items-center ${
                  isActiveRoute('/deals') 
                    ? 'text-blue-600 bg-blue-50 shadow-sm' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Deals
                <div className="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  Hot
                </div>
              </Link>
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={`relative py-2 px-4 rounded-full transition-all duration-300 ${
                    isActiveRoute('/admin') 
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  Admin
                </Link>
              )}
            </nav>

            {/* Enhanced Search Bar */}
            <div className="hidden md:flex items-center relative" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products, brands, categories..."
                    className={`w-80 pl-12 pr-4 py-3 rounded-full border-2 transition-all duration-300 ${
                      isSearchFocused 
                        ? 'border-blue-500 bg-white shadow-lg' 
                        : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                  />
                  <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </form>

              {/* Search Suggestions Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  {filteredSuggestions.length > 0 ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">Search Suggestions</span>
                          <span className="text-xs text-gray-500">{filteredSuggestions.length} results</span>
                        </div>
                      </div>
                      {filteredSuggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group transition-colors"
                        >
                          <div className="flex items-center">
                            <Search className="w-4 h-4 text-gray-400 mr-3" />
                            <div>
                              <span className="text-gray-900 font-medium">{suggestion.name}</span>
                              <span className="text-gray-500 text-sm ml-2">in {suggestion.category}</span>
                            </div>
                          </div>
                          {suggestion.trending && (
                            <div className="flex items-center text-orange-500 text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </div>
                          )}
                        </button>
                      ))}
                    </>
                  ) : searchQuery.length > 0 ? (
                    <div className="px-4 py-6 text-center text-gray-500">
                      <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p>No results found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <div className="px-4 py-3">
                      <div className="text-sm font-semibold text-gray-700 mb-3">Trending Searches</div>
                      {mockSearchSuggestions.filter(s => s.trending).map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-2 py-2 text-left hover:bg-gray-50 flex items-center text-sm text-gray-600 rounded-lg transition-colors"
                        >
                          <TrendingUp className="w-3 h-3 text-orange-500 mr-2" />
                          {suggestion.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Controls */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <Link 
                to="/wishlist" 
                className="relative p-2 text-gray-700 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
              >
                <Heart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                >
                  <Bell className="w-6 h-6" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">Notifications</span>
                        <button className="text-blue-600 text-sm hover:text-blue-700">
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                        notification.unread ? 'bg-blue-50/50' : ''
                      }`}>
                        <div className="flex items-start">
                          <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                            notification.unread ? 'bg-blue-600' : 'bg-gray-300'
                          }`}></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link 
                to="/cart" 
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50 group"
              >
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {/* User Account */}
              {user ? (
                <div className="relative" ref={userDropdownRef}>
                  <button 
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden lg:block text-left">
                      <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">Welcome back!</div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                      showUserDropdown ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* User Dropdown */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <Link 
                          to="/profile" 
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <User className="w-5 h-5 mr-3" />
                          My Profile
                        </Link>
                        <Link 
                          to="/orders" 
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <Package className="w-5 h-5 mr-3" />
                          Order History
                        </Link>
                        <Link 
                          to="/wishlist" 
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <Heart className="w-5 h-5 mr-3" />
                          Wishlist
                        </Link>
                        <Link 
                          to="/settings" 
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <Settings className="w-5 h-5 mr-3" />
                          Settings
                        </Link>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button 
                            onClick={() => {
                              logout();
                              setShowUserDropdown(false);
                            }}
                            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-5 h-5 mr-3" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50" 
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 bg-white rounded-b-2xl shadow-lg">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6 px-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link 
                  to="/" 
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActiveRoute('/') 
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium">Home</span>
                </Link>
                <Link 
                  to="/products" 
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActiveRoute('/products') 
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium">Products</span>
                </Link>
                <Link 
                  to="/categories" 
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActiveRoute('/categories') 
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium">Categories</span>
                </Link>
                <Link 
                  to="/deals" 
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActiveRoute('/deals') 
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    <span className="font-medium">Deals</span>
                  </div>
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Hot
                  </div>
                </Link>
                <Link 
                  to="/orders" 
                  className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="w-5 h-5 mr-2" />
                  <span className="font-medium">Orders</span>
                </Link>
                <Link 
                  to="/wishlist" 
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    <span className="font-medium">Wishlist</span>
                  </div>
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActiveRoute('/admin') 
                        ? 'text-blue-600 bg-blue-50 shadow-sm' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">Admin</span>
                  </Link>
                )}
                {!user ? (
                  <Link 
                    to="/login" 
                    className="flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-2" />
                    <span className="font-medium">Login</span>
                  </Link>
                ) : (
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    <span className="font-medium">Logout</span>
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;