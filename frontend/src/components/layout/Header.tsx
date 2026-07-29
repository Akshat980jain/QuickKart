import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Search, 
  LogOut, 
  Bell, 
  Heart, 
  Package, 
  Settings, 
  ChevronDown, 
  TrendingUp, 
  Sun, 
  Moon,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useTheme } from '../../context/ThemeContext';
import { CATEGORIES as categories, SEARCH_SUGGESTIONS as mockSearchSuggestions } from '../../data/categories';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);

  const { user, logout } = useAuth();
  const { cartItems, wishlistItems } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion.name);
    navigate(`/products?search=${encodeURIComponent(suggestion.name)}`);
    setIsSearchFocused(false);
  };

  const isActiveRoute = (path: string) => location.pathname === path;
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems?.length ?? 0;

  const mockNotifications = [
    { id: 1, title: "Order Shipped", message: "Your order #1234 has been shipped", time: "2h ago", unread: true },
    { id: 2, title: "Flash Sale", message: "20% off on Autumn Collection", time: "4h ago", unread: true },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#00241a] dark:bg-[#0d3b2e] text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <div className="hidden sm:flex items-center space-x-4 text-white/80">
            <span>Free Express Shipping on Orders Over ₹500</span>
          </div>
          <div className="flex items-center space-x-2 mx-auto sm:mx-0">
            <Sparkles className="w-3.5 h-3.5 text-[#fd6c1a] animate-pulse" />
            <span className="font-semibold text-white">Autumn Drop 2024 — Up to 30% Off Curated Goods</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-white/80">
            <Link to="/deals" className="hover:text-white transition-colors">Hot Deals</Link>
            <span>•</span>
            <Link to="/notifications" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#f8f9fa]/90 dark:bg-[#191c1d]/90 border-b border-[#e1e3e4]/70 dark:border-[#2e3132]/70 transition-all duration-300">
        <nav className="flex justify-between items-center w-full px-4 sm:px-6 max-w-[1280px] mx-auto py-3.5">
          {/* Left: Brand Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="font-headline font-bold text-2xl tracking-tighter text-[#00241a] dark:text-[#a3d0be]">
              QuickKart<span className="text-[#fd6c1a]">.</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link 
                to="/" 
                className={`transition-colors py-1 ${
                  isActiveRoute('/') 
                    ? 'text-[#00241a] dark:text-[#a3d0be] font-semibold border-b-2 border-[#00241a] dark:border-[#a3d0be]' 
                    : 'text-[#414845] dark:text-gray-300 hover:text-[#00241a] dark:hover:text-[#a3d0be]'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`transition-colors py-1 ${
                  isActiveRoute('/products') 
                    ? 'text-[#00241a] dark:text-[#a3d0be] font-semibold border-b-2 border-[#00241a] dark:border-[#a3d0be]' 
                    : 'text-[#414845] dark:text-gray-300 hover:text-[#00241a] dark:hover:text-[#a3d0be]'
                }`}
              >
                Shop All
              </Link>
              
              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[#414845] dark:text-gray-300 hover:text-[#00241a] dark:hover:text-[#a3d0be] transition-colors py-1">
                  Categories
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-60 bg-white dark:bg-[#2e3132] rounded-2xl shadow-xl border border-[#e1e3e4] dark:border-[#414845] z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 py-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.slug}`}
                      className="flex items-center px-4 py-2.5 hover:bg-[#f3f4f5] dark:hover:bg-[#191c1d] transition-colors text-sm text-[#191c1d] dark:text-white"
                    >
                      <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded-lg object-cover mr-3" />
                      <div>
                        <div className="font-medium">{cat.name}</div>
                        <div className="text-xs text-[#717974]">{cat.productCount} items</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                to="/deals" 
                className={`flex items-center gap-1 transition-colors py-1 ${
                  isActiveRoute('/deals') 
                    ? 'text-[#fd6c1a] font-semibold' 
                    : 'text-[#414845] dark:text-gray-300 hover:text-[#fd6c1a]'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Deals
                <span className="bg-[#fd6c1a] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase">Hot</span>
              </Link>

              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="text-[#414845] dark:text-gray-300 hover:text-[#00241a] dark:hover:text-[#a3d0be] transition-colors py-1"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* Center/Right: Search Bar & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="hidden lg:flex items-center bg-[#f3f4f5] dark:bg-[#2e3132] rounded-full px-4 py-2 w-64 sm:w-72 border border-[#c0c8c3] dark:border-[#414845] focus-within:border-[#00241a] dark:focus-within:border-[#a3d0be] transition-all relative" ref={searchRef}>
              <Search className="w-4 h-4 text-[#717974] dark:text-gray-400 mr-2 flex-shrink-0" />
              <form onSubmit={handleSearch} className="w-full">
                <input 
                  type="text" 
                  placeholder="Search curated goods..."
                  className="bg-transparent border-none focus:outline-none text-sm w-full text-[#191c1d] dark:text-white placeholder-[#717974] dark:placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                />
              </form>

              {/* Suggestions dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-[#2e3132] rounded-2xl shadow-xl border border-[#e1e3e4] dark:border-[#414845] z-50 overflow-hidden">
                  {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSuggestionClick(item)}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#f3f4f5] dark:hover:bg-[#191c1d] flex items-center justify-between text-[#191c1d] dark:text-white"
                      >
                        <span>{item.name}</span>
                        <span className="text-xs text-[#717974]">{item.category}</span>
                      </button>
                    ))
                  ) : searchQuery ? (
                    <div className="p-4 text-xs text-[#717974] text-center">No matching curated items found</div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Wishlist */}
              <Link 
                to="/wishlist" 
                className="p-2 hover:bg-[#f3f4f5] dark:hover:bg-[#2e3132] rounded-xl transition-all relative text-[#191c1d] dark:text-white"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#fd6c1a] rounded-full"></span>
                )}
              </Link>

              {/* Cart */}
              <Link 
                to="/cart" 
                className="p-2 hover:bg-[#f3f4f5] dark:hover:bg-[#2e3132] rounded-xl transition-all relative text-[#191c1d] dark:text-white"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#00241a] dark:bg-[#a3d0be] text-white dark:text-[#00241a] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="p-2 hover:bg-[#f3f4f5] dark:hover:bg-[#2e3132] rounded-xl transition-all text-[#191c1d] dark:text-white"
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>

              {/* User Account / Avatar */}
              {user ? (
                <div className="relative" ref={userDropdownRef}>
                  <button 
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 ml-1 p-1 hover:bg-[#f3f4f5] dark:hover:bg-[#2e3132] rounded-full transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#00241a] text-[#beedd9] flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#2e3132] rounded-2xl shadow-xl border border-[#e1e3e4] dark:border-[#414845] z-50 py-2 text-sm">
                      <div className="px-4 py-2 border-b border-[#e1e3e4] dark:border-[#414845]">
                        <div className="font-semibold text-[#191c1d] dark:text-white">{user.name}</div>
                        <div className="text-xs text-[#717974]">{user.email}</div>
                      </div>
                      <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-[#f3f4f5] dark:hover:bg-[#191c1d] text-[#191c1d] dark:text-white">
                        <User className="w-4 h-4 mr-2" /> Profile
                      </Link>
                      <Link to="/orders" className="flex items-center px-4 py-2 hover:bg-[#f3f4f5] dark:hover:bg-[#191c1d] text-[#191c1d] dark:text-white">
                        <Package className="w-4 h-4 mr-2" /> Orders
                      </Link>
                      <button 
                        onClick={logout}
                        className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-[#00241a] dark:bg-[#a3d0be] text-white dark:text-[#00241a] font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-[#0d3b2e] dark:hover:bg-[#beedd9] transition-all ml-1 shadow-sm"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile Menu Trigger */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-[#191c1d] dark:text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#191c1d] border-b border-[#e1e3e4] px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block font-medium text-[#191c1d] dark:text-white">Home</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block font-medium text-[#191c1d] dark:text-white">Shop All</Link>
            <Link to="/deals" onClick={() => setIsMenuOpen(false)} className="block font-medium text-[#fd6c1a]">Hot Deals</Link>
            <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block font-medium text-[#191c1d] dark:text-white">My Orders</Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;