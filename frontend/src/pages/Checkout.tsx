import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CreditCard, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Lock, 
  ArrowLeft, 
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { formatPrice } from '../utils/formatPrice';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    address: '42 Elm Street, Suite 400',
    city: 'Mumbai',
    pincode: '400001',
  });

  const subtotal = totalPrice;
  const shippingFee = shippingMethod === 'express' ? 99 : (subtotal > 500 ? 0 : 49);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shippingFee + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const now = new Date();
    const orderData = {
      orderNumber: `QK-${Math.floor(100000 + Math.random() * 900000)}`,
      trackingCode: `TRK-${Math.floor(1000000 + Math.random() * 9000000)}-EXP`,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      estimatedDelivery: new Date(now.setDate(now.getDate() + (shippingMethod === 'express' ? 2 : 4))).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        discount: item.discount || 0
      })),
      subtotal,
      shippingFee,
      tax,
      grandTotal,
      shippingAddress: {
        name: formData.name || 'John Doe',
        email: formData.email || 'john@example.com',
        address: formData.address || '42 Elm Street',
        city: formData.city || 'Mumbai',
        pincode: formData.pincode || '400001',
      },
      paymentMethod,
      shippingMethod
    };

    setTimeout(() => {
      try {
        localStorage.setItem('quickkart_last_order', JSON.stringify(orderData));
      } catch (err) {
        console.error('Failed to save order:', err);
      }
      clearCart();
      setIsProcessing(false);
      navigate('/order-success', { state: { order: orderData } });
    }, 1500);
  };

  if (!cartItems.length) {
    return (
      <div className="min-h-[65vh] bg-[#f8f9fa] dark:bg-[#0e1512] flex flex-col items-center justify-center p-6 text-center space-y-6 transition-colors duration-500">
        <div className="w-20 h-20 rounded-full bg-[#beedd9] dark:bg-[#0d3b2e] text-[#00241a] dark:text-[#a3d0be] flex items-center justify-center shadow-green">
          <Sparkles className="w-10 h-10" />
        </div>
        <h1 className="font-headline font-extrabold text-3xl text-[#00241a] dark:text-white tracking-tight">No Items to Checkout</h1>
        <p className="text-sm text-[#717974] dark:text-gray-400 max-w-sm">Your shopping bag is empty. Add some products before proceeding to checkout.</p>
        <Link to="/products" className="btn-primary text-xs">
          <ArrowLeft className="w-4 h-4" /> Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0e1512] py-10 transition-colors duration-500">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
        
        {/* Header & Steps */}
        <div className="flex items-center justify-between pb-6 border-b border-[#e7e8e9] dark:border-[#2e3a35]">
          <div>
            <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-[#00241a] dark:text-white tracking-tight">Checkout</h1>
            <p className="text-sm text-[#717974] dark:text-gray-400 mt-1">Complete your order details</p>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
            <span className="text-emerald-600 dark:text-emerald-400">✓ 1. Bag</span>
            <span className="text-[#c0c8c3] dark:text-[#2e3a35]">›</span>
            <span className="text-[#00241a] dark:text-[#a3d0be] border-b-2 border-[#00241a] dark:border-[#a3d0be] pb-0.5">2. Shipping & Payment</span>
            <span className="text-[#c0c8c3] dark:text-[#2e3a35]">›</span>
            <span className="text-[#717974] dark:text-gray-500">3. Confirmation</span>
          </div>
        </div>

        {/* Layout Grid */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Shipping & Payment Form Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Shipping Address */}
            <div className="bg-white dark:bg-[#1c2722] p-8 rounded-3xl border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card space-y-6">
              <h2 className="font-headline font-bold text-xl text-[#00241a] dark:text-white flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#fd6c1a]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#fd6c1a]" />
                </div>
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#717974] dark:text-gray-400 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                    className="w-full bg-[#f3f4f5] dark:bg-[#222e29] border border-[#e7e8e9] dark:border-[#2e3a35] rounded-2xl px-4 py-3.5 text-sm text-[#191c1d] dark:text-white focus:outline-none focus:border-[#00241a] dark:focus:border-[#a3d0be] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#717974] dark:text-gray-400 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    className="w-full bg-[#f3f4f5] dark:bg-[#222e29] border border-[#e7e8e9] dark:border-[#2e3a35] rounded-2xl px-4 py-3.5 text-sm text-[#191c1d] dark:text-white focus:outline-none focus:border-[#00241a] dark:focus:border-[#a3d0be] transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#717974] dark:text-gray-400 mb-1.5">Street Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="42 Elm Street, Suite 400" 
                    required 
                    className="w-full bg-[#f3f4f5] dark:bg-[#222e29] border border-[#e7e8e9] dark:border-[#2e3a35] rounded-2xl px-4 py-3.5 text-sm text-[#191c1d] dark:text-white focus:outline-none focus:border-[#00241a] dark:focus:border-[#a3d0be] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#717974] dark:text-gray-400 mb-1.5">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai" 
                    required 
                    className="w-full bg-[#f3f4f5] dark:bg-[#222e29] border border-[#e7e8e9] dark:border-[#2e3a35] rounded-2xl px-4 py-3.5 text-sm text-[#191c1d] dark:text-white focus:outline-none focus:border-[#00241a] dark:focus:border-[#a3d0be] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#717974] dark:text-gray-400 mb-1.5">Pincode / Zip</label>
                  <input 
                    type="text" 
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="400001" 
                    required 
                    className="w-full bg-[#f3f4f5] dark:bg-[#222e29] border border-[#e7e8e9] dark:border-[#2e3a35] rounded-2xl px-4 py-3.5 text-sm text-[#191c1d] dark:text-white focus:outline-none focus:border-[#00241a] dark:focus:border-[#a3d0be] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white dark:bg-[#1c2722] p-8 rounded-3xl border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card space-y-5">
              <h2 className="font-headline font-bold text-xl text-[#00241a] dark:text-white flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#fd6c1a]/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#fd6c1a]" />
                </div>
                Delivery Option
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  onClick={() => setShippingMethod('express')}
                  className={`p-5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    shippingMethod === 'express' 
                      ? 'border-[#00241a] dark:border-[#a3d0be] bg-[#beedd9]/30 dark:bg-[#0d3b2e]/50 shadow-green' 
                      : 'border-[#e7e8e9] dark:border-[#2e3a35] bg-[#f8f9fa] dark:bg-[#222e29]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" checked={shippingMethod === 'express'} readOnly className="accent-[#00241a] dark:accent-[#a3d0be]" />
                    <div>
                      <div className="font-bold text-sm text-[#191c1d] dark:text-white">Express Delivery</div>
                      <div className="text-xs text-[#717974] dark:text-gray-400 mt-0.5">Delivered in 1–2 Days</div>
                    </div>
                  </div>
                  <span className="font-headline font-bold text-sm text-[#00241a] dark:text-[#a3d0be]">₹99</span>
                </div>

                <div 
                  onClick={() => setShippingMethod('standard')}
                  className={`p-5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    shippingMethod === 'standard' 
                      ? 'border-[#00241a] dark:border-[#a3d0be] bg-[#beedd9]/30 dark:bg-[#0d3b2e]/50 shadow-green' 
                      : 'border-[#e7e8e9] dark:border-[#2e3a35] bg-[#f8f9fa] dark:bg-[#222e29]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" checked={shippingMethod === 'standard'} readOnly className="accent-[#00241a] dark:accent-[#a3d0be]" />
                    <div>
                      <div className="font-bold text-sm text-[#191c1d] dark:text-white">Standard Shipping</div>
                      <div className="text-xs text-[#717974] dark:text-gray-400 mt-0.5">Delivered in 3–5 Days</div>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">FREE</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-[#1c2722] p-8 rounded-3xl border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card space-y-6">
              <h2 className="font-headline font-bold text-xl text-[#00241a] dark:text-white flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#fd6c1a]/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[#fd6c1a]" />
                </div>
                Payment Method
              </h2>

              <div className="space-y-3">
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-[#00241a] dark:border-[#a3d0be] bg-[#beedd9]/30 dark:bg-[#0d3b2e]/50 shadow-green' 
                      : 'border-[#e7e8e9] dark:border-[#2e3a35] bg-[#f8f9fa] dark:bg-[#222e29]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" checked={paymentMethod === 'card'} readOnly className="accent-[#00241a] dark:accent-[#a3d0be]" />
                    <span className="font-bold text-sm text-[#191c1d] dark:text-white">Credit / Debit Card</span>
                  </div>
                  <Lock className="w-4 h-4 text-[#717974]" />
                </div>

                <div 
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'upi' 
                      ? 'border-[#00241a] dark:border-[#a3d0be] bg-[#beedd9]/30 dark:bg-[#0d3b2e]/50 shadow-green' 
                      : 'border-[#e7e8e9] dark:border-[#2e3a35] bg-[#f8f9fa] dark:bg-[#222e29]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" checked={paymentMethod === 'upi'} readOnly className="accent-[#00241a] dark:accent-[#a3d0be]" />
                    <span className="font-bold text-sm text-[#191c1d] dark:text-white">Instant UPI / QR Code</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#fd6c1a]" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Sticky Summary */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            <div className="bg-white dark:bg-[#1c2722] p-7 rounded-3xl border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card space-y-6">
              <h3 className="font-headline font-bold text-xl text-[#00241a] dark:text-white pb-4 border-b border-[#e7e8e9] dark:border-[#2e3a35]">
                Order Details
              </h3>

              {/* Items Preview */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs text-[#191c1d] dark:text-white">
                    <div className="w-10 h-12 rounded-lg overflow-hidden bg-[#f3f4f5] dark:bg-[#141d19] flex-shrink-0 border border-[#e7e8e9] dark:border-[#2e3a35]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{item.name}</p>
                      <p className="text-[#717974] dark:text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-3 text-xs text-[#414845] dark:text-gray-300 pt-4 border-t border-[#e7e8e9] dark:border-[#2e3a35]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#191c1d] dark:text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-[#191c1d] dark:text-white">{formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span className="font-bold text-[#191c1d] dark:text-white">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-headline font-bold text-[#00241a] dark:text-[#a3d0be] pt-3 border-t border-[#e7e8e9] dark:border-[#2e3a35]">
                  <span>Total Due</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full btn-primary py-4 text-xs uppercase tracking-wider justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Payment...
                  </span>
                ) : (
                  <>Complete & Pay {formatPrice(grandTotal)} <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#717974] dark:text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>256-Bit SSL Encrypted Payment</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;