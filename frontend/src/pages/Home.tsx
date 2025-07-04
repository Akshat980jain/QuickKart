import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  CreditCard, 
  Package, 
  Headphones, 
  ChevronRight,
  Sparkles,
  Star,
  ArrowRight,
  Shield,
  Clock,
  Gift,
  TrendingUp,
  Users,
  Heart,
  Eye,
  ShoppingCart,
  Mail,
  CheckCircle,
  X,
  Play,
  Pause,
  ChevronLeft,
  Zap,
  Award,
  Globe
} from 'lucide-react';

// Mock data - in real app, this would come from APIs
const mockProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.8,
    reviews: 1234,
    category: "electronics",
    badge: "Best Seller",
    isNew: false
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.7,
    reviews: 892,
    category: "electronics",
    badge: "Limited Edition",
    isNew: true
  },
  {
    id: 3,
    name: "Premium Coffee Maker",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.9,
    reviews: 567,
    category: "home",
    badge: "Editor's Choice",
    isNew: false
  },
  {
    id: 4,
    name: "Designer Backpack",
    price: 89.99,
    originalPrice: 120.99,
    image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.6,
    reviews: 423,
    category: "clothing",
    badge: "Trending",
    isNew: true
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    text: "Amazing shopping experience! Fast delivery and excellent customer service. Highly recommended!",
    location: "New York, NY"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    text: "The quality of products is outstanding. I've been a customer for 2 years and never disappointed.",
    location: "Los Angeles, CA"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    text: "Quick delivery, great prices, and hassle-free returns. This is my go-to shopping destination!",
    location: "Chicago, IL"
  }
];

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

// Advanced Product Card Component
const ProductCard = ({ product, index, onQuickView, onAddToWishlist }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.badge}
          </span>
        </div>
      )}

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercentage}%
          </span>
        </div>
      )}

      {/* Quick Actions */}
      <div className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-all duration-300 ${
        isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`}>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onAddToWishlist(product)}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
          </div>
          {product.isNew && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
              New
            </span>
          )}
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors transform hover:scale-110">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Newsletter Component
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
      <div className="relative container mx-auto px-6 py-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 mr-2" />
            Exclusive Offers
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Newsletter
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Get exclusive deals, early access to new products, and insider tips delivered straight to your inbox. Join over 50,000 happy subscribers!
          </p>
          
          {isSubmitted ? (
            <div className="flex items-center justify-center gap-3 max-w-md mx-auto bg-green-500/20 border border-green-500/50 rounded-full px-6 py-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-semibold">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow px-6 py-4 rounded-full border-2 border-transparent focus:outline-none focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}
          
          <p className="text-gray-400 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

// Testimonials Carousel
const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-gray-50 rounded-3xl py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">Over 10,000+ satisfied customers worldwide</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-8">
                  <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-blue-100"
                    />
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-lg mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="bg-white shadow-lg p-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="bg-white shadow-lg p-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="bg-white shadow-lg p-2 rounded-full hover:bg-gray-50 transition-colors ml-2"
            >
              {isAutoPlaying ? (
                <Pause className="w-5 h-5 text-gray-600" />
              ) : (
                <Play className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Home Component
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [visitorCount, setVisitorCount] = useState(0);

  // Simulate real-time visitor count
  useEffect(() => {
    const baseCount = 1247;
    setVisitorCount(baseCount);

    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleQuickView = useCallback((product) => {
    setQuickViewProduct(product);
  }, []);

  const handleAddToWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const features = useMemo(() => [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Fast and free delivery on orders over $50. Get your products delivered in 2-3 business days.",
      color: "blue",
      stats: "2-3 Days"
    },
    {
      icon: Package,
      title: "Easy Returns",
      description: "Hassle-free 30-day return policy. Not satisfied? We'll make it right, guaranteed.",
      color: "green",
      stats: "30 Days"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Bank-level security with 256-bit SSL encryption. Your payment information is always protected.",
      color: "purple",
      stats: "256-bit SSL"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support via chat, email, or phone. We're here when you need us.",
      color: "orange",
      stats: "24/7 Available"
    }
  ], []);

  return (
    <div className="space-y-16 bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Enhanced Animations */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0 z-10">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-white/90 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              New Arrivals Daily
            </div>
            
            {/* Live Visitor Counter */}
            <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 ml-4 text-green-300 text-sm font-medium">
              <Users className="w-4 h-4 mr-2" />
              {visitorCount.toLocaleString()} online now
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
              Shop Smart, 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                Shop Quick
              </span>
              with QuickKart
            </h1>
            <p className="text-blue-100 text-xl mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Discover amazing products at unbeatable prices. Free shipping on your first order plus exclusive member benefits!
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl group"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shop Now
                <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/deals" 
                className="inline-flex items-center justify-center border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <Zap className="w-5 h-5 mr-2" />
                View Deals
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              <img 
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Shopping Experience" 
                className="relative rounded-2xl shadow-2xl object-cover w-full h-96 md:h-[500px] transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose QuickKart?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience the difference with our premium shopping features</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className={`text-${feature.color}-600 mx-auto bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 w-20 h-20 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={36} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
              <div className={`text-${feature.color}-600 font-semibold text-sm`}>
                {feature.stats}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products with Advanced Cards */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 mr-2" />
            Featured Products
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Now</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">Discover our most popular products loved by thousands of customers</p>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">Updated hourly</span>
            </div>
          </div>
          <Link 
            to="/products" 
            className="group text-blue-600 hover:text-blue-700 flex items-center font-semibold text-lg transition-colors"
          >
            View All Products 
            <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {mockProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onQuickView={handleQuickView}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore our wide range of products across different categories</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="aspect-w-16 aspect-h-10 relative">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90 mb-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">{category.productCount.toLocaleString()} products</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 mr-2" />
                <span className="text-4xl font-bold">50K+</span>
              </div>
              <p className="text-blue-100">Happy Customers</p>
            </div>
            <div className="text-white">
              <div className="flex items-center justify-center mb-4">
                <Package className="w-8 h-8 mr-2" />
                <span className="text-4xl font-bold">100K+</span>
              </div>
              <p className="text-blue-100">Products Delivered</p>
            </div>
            <div className="text-white">
              <div className="flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 mr-2" />
                <span className="text-4xl font-bold">25+</span>
              </div>
              <p className="text-blue-100">Countries Served</p>
            </div>
            <div className="text-white">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 mr-2" />
                <span className="text-4xl font-bold">4.9</span>
              </div>
              <p className="text-blue-100">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative p-6">
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img 
                    src={quickViewProduct.image} 
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{quickViewProduct.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(quickViewProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({quickViewProduct.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-900">₹{quickViewProduct.price}</span>
                    {quickViewProduct.originalPrice > quickViewProduct.price && (
                      <span className="text-lg text-gray-500 line-through">₹{quickViewProduct.originalPrice}</span>
                    )}
                  </div>
                  
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleAddToWishlist(quickViewProduct)}
                      className="p-3 border-2 border-gray-200 rounded-full hover:border-red-300 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;