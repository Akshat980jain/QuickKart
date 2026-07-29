import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  const shippingCost = totalPrice > 500 ? 0 : 49;
  const taxRate = 0.08;
  const taxAmount = totalPrice * taxRate;
  const discountAmount = totalPrice * promoDiscount;
  const orderTotal = totalPrice + shippingCost + taxAmount - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const codes: Record<string, number> = {
      'AUTUMN10': 0.10,
      'VIP20': 0.20,
      'FIRST15': 0.15
    };
    const code = promoCode.trim().toUpperCase();
    if (codes[code]) {
      setAppliedPromo(code);
      setPromoDiscount(codes[code]);
      setPromoCode('');
      toast(`Promo code "${code}" applied — ${Math.round(codes[code] * 100)}% off!`, 'success');
    } else {
      toast('Invalid promo code. Try AUTUMN10 or VIP20.', 'error');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0e1512] flex flex-col items-center justify-center p-6 text-center space-y-8 transition-colors duration-500">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#beedd9] to-[#a3d0be] dark:from-[#0d3b2e] dark:to-[#234e40] flex items-center justify-center shadow-green animate-float">
          <ShoppingBag className="w-14 h-14 text-[#00241a] dark:text-[#a3d0be]" />
        </div>
        <div className="space-y-3 max-w-md">
          <h1 className="font-headline font-extrabold text-4xl text-[#00241a] dark:text-white tracking-tight">Your Bag is Empty</h1>
          <p className="text-base text-[#717974] dark:text-gray-400 leading-relaxed">Discover our curated collection of premium intentional luxury goods.</p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2.5 btn-primary text-sm"
        >
          <Sparkles className="w-4 h-4" />
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0e1512] py-10 transition-colors duration-500">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
        
        {/* Step Progress Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#e7e8e9] dark:border-[#2e3a35]">
          <div>
            <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-[#00241a] dark:text-white tracking-tight">Shopping Bag</h1>
            <p className="text-sm text-[#717974] dark:text-gray-400 mt-1">{cartItems.length} curated {cartItems.length === 1 ? 'item' : 'items'} selected</p>
          </div>

          {/* Steps Indicator */}
          <div className="hidden sm:flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
            {['1. Bag', '2. Shipping', '3. Payment'].map((step, i) => (
              <React.Fragment key={step}>
                {i > 0 && <span className="text-[#c0c8c3] dark:text-[#2e3a35]">›</span>}
                <span className={i === 0 ? 'text-[#00241a] dark:text-[#a3d0be] border-b-2 border-[#00241a] dark:border-[#a3d0be] pb-0.5' : 'text-[#717974] dark:text-gray-500'}>{step}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#beedd9]/60 dark:bg-[#0d3b2e]/50 p-5 rounded-2xl border border-[#a3d0be]/30 dark:border-[#234e40]/50">
          <div className="flex items-center gap-2 mb-3">
            <Truck className="w-4 h-4 text-[#00241a] dark:text-[#a3d0be]" />
            <span className="text-xs font-semibold text-[#002117] dark:text-[#a3d0be]">
              {totalPrice >= 500 ? (
                <>Congratulations! You qualified for <strong>Free Express Shipping</strong> 🎉</>
              ) : (
                <>Add <strong>{formatPrice(500 - totalPrice)}</strong> more to unlock <strong>Free Express Shipping</strong></>
              )}
            </span>
          </div>
          <div className="h-1.5 bg-[#a3d0be]/30 dark:bg-[#234e40]/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00241a] dark:bg-[#a3d0be] rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totalPrice / 500) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Item List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white dark:bg-[#1c2722] p-5 rounded-3xl border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card hover:shadow-card-lg transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-5"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-24 rounded-2xl overflow-hidden bg-[#f3f4f5] dark:bg-[#141d19] flex-shrink-0 border border-[#e7e8e9] dark:border-[#2e3a35]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#fd6c1a] uppercase tracking-[0.1em]">{item.category}</span>
                    <h3 className="font-headline font-bold text-base text-[#191c1d] dark:text-white line-clamp-2 mt-0.5 leading-snug">{item.name}</h3>
                    <div className="font-headline font-extrabold text-[#00241a] dark:text-[#a3d0be] mt-1.5">{formatPrice(item.price)}</div>
                    {item.discount > 0 && (
                      <div className="badge-hot inline-block mt-1">{item.discount}% OFF</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-[#e7e8e9]/60 dark:border-[#2e3a35]/60">
                  {/* Stepper */}
                  <div className="flex items-center bg-[#f3f4f5] dark:bg-[#222e29] rounded-2xl overflow-hidden border border-[#e7e8e9] dark:border-[#2e3a35]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-[#e7e8e9] dark:hover:bg-[#2e3a35] text-[#414845] dark:text-gray-300 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm font-bold text-[#191c1d] dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-[#e7e8e9] dark:hover:bg-[#2e3a35] text-[#414845] dark:text-gray-300 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="font-headline font-extrabold text-lg text-[#191c1d] dark:text-white text-right">
                    {formatPrice(item.price * item.quantity)}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      toast(`Removed "${item.name}" from cart`, 'info');
                    }}
                    className="p-2.5 rounded-xl text-[#717974] dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00241a] dark:text-[#a3d0be] pt-4"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            <div className="bg-white dark:bg-[#1c2722] p-7 rounded-3xl border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card space-y-6">
              <h2 className="font-headline font-bold text-xl text-[#00241a] dark:text-white pb-5 border-b border-[#e7e8e9] dark:border-[#2e3a35]">
                Order Summary
              </h2>

              <div className="space-y-3.5 text-sm text-[#414845] dark:text-gray-300">
                <div className="flex justify-between items-center">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold text-[#191c1d] dark:text-white">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE ✓</span> : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>GST (8%)</span>
                  <span className="font-semibold text-[#191c1d] dark:text-white">{formatPrice(taxAmount)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Promo: {appliedPromo}</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-[#e7e8e9] dark:border-[#2e3a35] flex justify-between items-center">
                  <span className="font-headline font-bold text-lg text-[#00241a] dark:text-white">Order Total</span>
                  <span className="font-headline font-extrabold text-xl text-[#00241a] dark:text-[#a3d0be]">{formatPrice(orderTotal)}</span>
                </div>
                
                {/* Promo Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo code (AUTUMN10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-[#f3f4f5] dark:bg-[#222e29] border border-[#e7e8e9] dark:border-[#2e3a35] text-sm px-4 py-3 pr-10 rounded-2xl text-[#191c1d] dark:text-white placeholder-[#717974] dark:placeholder-gray-500 focus:outline-none focus:border-[#00241a] dark:focus:border-[#a3d0be] transition-colors"
                    />
                    <Tag className="w-3.5 h-3.5 text-[#717974] absolute right-3 top-3.5" />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#fd6c1a] text-white text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-2xl hover:bg-[#e8480a] transition-colors flex-shrink-0 shadow-orange"
                  >
                    Apply
                  </button>
                </form>

                {/* Checkout CTA */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-primary py-4 text-sm justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#717974] dark:text-gray-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Secure Checkout
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-500" />
                    Free Returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;