import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#00241a] text-white pt-16 pb-12 border-t border-[#0d3b2e]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Trust Value Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#0d3b2e]">
          <Link to="/shipping-policy" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Truck className="w-8 h-8 text-[#a3d0be] flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">Free Express Shipping</h4>
              <p className="text-xs text-gray-400">On all orders over ₹499</p>
            </div>
          </Link>
          <Link to="/privacy" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <ShieldCheck className="w-8 h-8 text-[#a3d0be] flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">Secure Payment</h4>
              <p className="text-xs text-gray-400">100% SSL encrypted checkout</p>
            </div>
          </Link>
          <Link to="/returns" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <RotateCcw className="w-8 h-8 text-[#a3d0be] flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">30-Day Easy Returns</h4>
              <p className="text-xs text-gray-400">Hassle-free money back</p>
            </div>
          </Link>
          <Link to="/help" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Headphones className="w-8 h-8 text-[#a3d0be] flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">24/7 Dedicated Support</h4>
              <p className="text-xs text-gray-400">Always here to assist</p>
            </div>
          </Link>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12">
          {/* Brand Story */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="font-headline font-bold text-3xl tracking-tighter text-white">
              QuickKart<span className="text-[#fd6c1a]">.</span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Discover a curated collection where modern craftsmanship meets intentional design. Elevate your everyday with QuickKart's exclusive premium essentials.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-[#0d3b2e] hover:bg-[#fd6c1a] flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#0d3b2e] hover:bg-[#fd6c1a] flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#0d3b2e] hover:bg-[#fd6c1a] flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Discovery */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[#a3d0be]">Discovery</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/brands" className="hover:text-white transition-colors">Luxury Brands</Link></li>
              <li><Link to="/stores" className="hover:text-white transition-colors">Store Locator</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">QuickKart Journal</Link></li>
              <li><Link to="/rewards" className="hover:text-white transition-colors">VIP Circle Rewards</Link></li>
              <li><Link to="/gift-cards" className="hover:text-white transition-colors">Digital Gift Cards</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[#a3d0be]">Customer Care</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center & FAQ</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchange</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Compare Products</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Become a Seller</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[#a3d0be]">Stay Connected</h4>
            <p className="text-xs text-gray-300">Subscribe for private lookbook access, seasonal offers, and new drops.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-[#0d3b2e] border border-[#234e40] text-sm text-white px-4 py-2.5 rounded-l-xl focus:outline-none w-full placeholder:text-gray-400"
              />
              <button className="bg-[#fd6c1a] hover:bg-[#a33e00] text-white px-4 py-2.5 rounded-r-xl transition-colors flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#0d3b2e] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>&copy; {new Date().getFullYear()} QuickKart Inc. All rights reserved. Curated for Intentional Living.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/shipping-policy" className="hover:text-white">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;