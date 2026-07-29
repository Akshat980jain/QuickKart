import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Truck, Package, Copy, ArrowRight, ShieldCheck, MapPin, Star, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';
import { generateMockProducts } from '../data/generateMockProducts';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category?: string;
}

interface OrderData {
  orderNumber: string;
  trackingCode: string;
  date: string;
  estimatedDelivery: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  grandTotal: number;
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
  };
  paymentMethod?: string;
  shippingMethod?: string;
}

const OrderSuccess: React.FC = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [checkVisible, setCheckVisible] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setCheckVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // 1. Try to read order from navigation state
    if (location.state && location.state.order) {
      setOrder(location.state.order);
      return;
    }

    // 2. Try to read last placed order from localStorage
    try {
      const storedOrder = localStorage.getItem('quickkart_last_order');
      if (storedOrder) {
        setOrder(JSON.parse(storedOrder));
        return;
      }
    } catch (err) {
      console.error('Failed to parse order from localStorage:', err);
    }

    // 3. Fallback: Generate dynamic sample order from real mock products (never hardcoded text)
    const mockProds = generateMockProducts(3);
    const sampleItems: OrderItem[] = mockProds.slice(0, 2).map((p, idx) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
      quantity: idx + 1,
      category: p.category
    }));

    const sampleSubtotal = sampleItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const sampleShipping = 99;
    const sampleTax = sampleSubtotal * 0.08;
    const sampleTotal = sampleSubtotal + sampleShipping + sampleTax;
    const now = new Date();

    const fallbackOrder: OrderData = {
      orderNumber: `QK-${Math.floor(100000 + Math.random() * 900000)}`,
      trackingCode: `TRK-${Math.floor(1000000 + Math.random() * 9000000)}-EXP`,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      estimatedDelivery: new Date(now.setDate(now.getDate() + 2)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: sampleItems,
      subtotal: sampleSubtotal,
      shippingFee: sampleShipping,
      tax: sampleTax,
      grandTotal: sampleTotal,
      shippingAddress: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: '42 Elm Street, Suite 400',
        city: 'Mumbai',
        pincode: '400001',
      },
      paymentMethod: 'card',
      shippingMethod: 'express'
    };

    setOrder(fallbackOrder);
  }, [location.state]);

  const copyTracking = () => {
    if (order?.trackingCode) {
      navigator.clipboard.writeText(order.trackingCode);
      toast('Tracking code copied to clipboard!', 'success');
    }
  };

  if (!order) {
    return null;
  }

  const steps = [
    { step: 1, label: 'Order Placed', sub: order.date, done: true },
    { step: 2, label: 'Processing', sub: 'Packing in Warehouse', done: true },
    { step: 3, label: 'Shipped', sub: 'In Transit', done: false },
    { step: 4, label: 'Delivered', sub: 'Doorstep', done: false },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0e1512] py-12 transition-colors duration-500 overflow-x-hidden">
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 space-y-6">

        {/* ── Success Hero Card ── */}
        <div className={`relative bg-white dark:bg-[#1c2722] rounded-[2rem] p-8 sm:p-12 border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card-lg text-center overflow-hidden transition-all duration-700 ${checkVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Background decoration */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#beedd9]/30 dark:bg-[#0d3b2e]/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#fd6c1a]/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            {/* Animated success icon */}
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-[#beedd9] to-[#a3d0be] dark:from-[#0d3b2e] dark:to-[#234e40] flex items-center justify-center mx-auto shadow-green transition-all duration-500 ${checkVisible ? 'scale-100' : 'scale-0'}`}>
              <CheckCircle className="w-10 h-10 text-[#00241a] dark:text-[#a3d0be]" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#fd6c1a] uppercase tracking-[0.15em] block mb-2">Payment Confirmed ✓</span>
              <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-[#00241a] dark:text-white tracking-tight">
                Thank You for Your Order!
              </h1>
              <p className="text-sm text-[#414845] dark:text-gray-300 max-w-md mx-auto leading-relaxed mt-3">
                Your payment was successful and your order{' '}
                <span className="font-bold text-[#00241a] dark:text-[#a3d0be] bg-[#beedd9]/40 dark:bg-[#0d3b2e]/40 px-2 py-0.5 rounded-md">#{order.orderNumber}</span>{' '}
                has been received by our fulfillment center.
              </p>
            </div>

            {/* Order meta */}
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#717974] dark:text-gray-400 bg-[#f3f4f5] dark:bg-[#222e29] px-4 py-2 rounded-full">
                <Package className="w-3.5 h-3.5 text-[#00241a] dark:text-[#a3d0be]" /> Order #{order.orderNumber}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 rounded-full">
                <Truck className="w-3.5 h-3.5" /> Est. Delivery: {order.estimatedDelivery}
              </div>
            </div>
          </div>
        </div>

        {/* ── Dynamic Order Items Summary ── */}
        <div className="bg-white dark:bg-[#1c2722] rounded-3xl border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card overflow-hidden">
          <div className="p-6 border-b border-[#e7e8e9] dark:border-[#2e3a35] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#fd6c1a]/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-[#fd6c1a]" />
              </div>
              <h2 className="font-headline font-bold text-lg text-[#00241a] dark:text-white">Items in Your Order ({order.items.length})</h2>
            </div>
            <span className="text-xs font-bold text-[#717974] dark:text-gray-400">{order.date}</span>
          </div>

          <div className="divide-y divide-[#e7e8e9]/60 dark:divide-[#2e3a35]/60">
            {order.items.map((item, i) => (
              <div key={`${item.id}-${i}`} className="flex items-center gap-4 p-5 hover:bg-[#f8f9fa] dark:hover:bg-[#222e29] transition-colors">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#f3f4f5] dark:bg-[#141d19] border border-[#e7e8e9] dark:border-[#2e3a35] flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {item.category && (
                    <span className="text-[10px] font-bold text-[#fd6c1a] uppercase tracking-wider block mb-0.5">{item.category}</span>
                  )}
                  <p className="font-semibold text-sm text-[#191c1d] dark:text-white truncate">{item.name}</p>
                  <p className="text-xs text-[#717974] dark:text-gray-400 mt-0.5">Quantity: {item.quantity} × {formatPrice(item.price)}</p>
                </div>
                <span className="font-headline font-extrabold text-base text-[#00241a] dark:text-[#a3d0be]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}

            {/* Calculations Breakdown */}
            <div className="p-6 bg-[#f8f9fa] dark:bg-[#222e29] space-y-2 text-xs text-[#414845] dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#191c1d] dark:text-white">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee ({order.shippingMethod || 'Express'})</span>
                <span className="font-semibold">
                  {order.shippingFee === 0 ? <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span> : formatPrice(order.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (8%)</span>
                <span className="font-semibold text-[#191c1d] dark:text-white">{formatPrice(order.tax)}</span>
              </div>
              <div className="pt-3 border-t border-[#e7e8e9] dark:border-[#2e3a35] flex justify-between items-center text-sm font-headline font-bold">
                <span className="text-[#00241a] dark:text-white">Total Amount Paid</span>
                <span className="font-extrabold text-xl text-[#00241a] dark:text-[#a3d0be]">{formatPrice(order.grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Delivery Tracking Timeline ── */}
        <div className="bg-white dark:bg-[#1c2722] rounded-3xl border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#fd6c1a]/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-[#fd6c1a]" />
              </div>
              <h2 className="font-headline font-bold text-lg text-[#00241a] dark:text-white">Live Delivery Tracking</h2>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-[#e7e8e9] dark:bg-[#2e3a35]" />
            <div className="absolute top-5 left-5 h-0.5 bg-[#00241a] dark:bg-[#a3d0be] transition-all" style={{ width: '35%' }} />

            <div className="grid grid-cols-4 gap-2 relative">
              {steps.map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center">
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all ${
                    s.done
                      ? 'bg-[#00241a] dark:bg-[#a3d0be] border-[#00241a] dark:border-[#a3d0be] text-white dark:text-[#002117] shadow-green'
                      : 'bg-white dark:bg-[#1c2722] border-[#e7e8e9] dark:border-[#2e3a35] text-[#717974] dark:text-gray-500'
                  }`}>
                    {s.done ? <CheckCircle className="w-5 h-5" /> : s.step}
                  </div>
                  <div className="mt-3">
                    <div className={`text-xs font-bold ${s.done ? 'text-[#00241a] dark:text-[#a3d0be]' : 'text-[#717974] dark:text-gray-500'}`}>
                      {s.label}
                    </div>
                    <div className="text-[10px] text-[#717974] dark:text-gray-500 mt-0.5">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking Code */}
          <div className="bg-[#f8f9fa] dark:bg-[#222e29] p-5 rounded-2xl flex items-center justify-between border border-[#e7e8e9] dark:border-[#2e3a35]">
            <div>
              <span className="text-[10px] font-bold text-[#717974] dark:text-gray-400 uppercase tracking-wider block mb-1">Courier Tracking (AWB)</span>
              <span className="font-headline font-bold text-[#00241a] dark:text-[#beedd9] text-base">{order.trackingCode}</span>
            </div>
            <button
              onClick={copyTracking}
              className="flex items-center gap-2 bg-white dark:bg-[#1c2722] px-4 py-2.5 rounded-xl font-bold text-xs text-[#191c1d] dark:text-white border border-[#e7e8e9] dark:border-[#2e3a35] hover:bg-[#f3f4f5] dark:hover:bg-[#222e29] transition-colors shadow-xs"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Code
            </button>
          </div>

          {/* Dynamic Shipping Address */}
          <div className="flex items-start gap-3.5 bg-[#f8f9fa] dark:bg-[#222e29] p-5 rounded-2xl border border-[#e7e8e9] dark:border-[#2e3a35]">
            <div className="w-10 h-10 rounded-xl bg-[#00241a]/10 dark:bg-[#a3d0be]/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#00241a] dark:text-[#a3d0be]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#717974] dark:text-gray-400 uppercase tracking-wider block mb-1">Delivery Address</span>
              <p className="text-sm font-semibold text-[#191c1d] dark:text-white">{order.shippingAddress.name}</p>
              <p className="text-xs text-[#717974] dark:text-gray-400 mt-0.5">
                {order.shippingAddress.address}, {order.shippingAddress.city} — {order.shippingAddress.pincode}
              </p>
              <p className="text-[11px] text-[#717974] dark:text-gray-500 mt-0.5">Email: {order.shippingAddress.email}</p>
            </div>
          </div>
        </div>

        {/* ── Trust & Rating ── */}
        <div className="bg-gradient-to-br from-[#00241a] to-[#0d3b2e] rounded-3xl p-8 text-center space-y-4 shadow-floating border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#fd6c1a] flex items-center justify-center mx-auto mb-4 shadow-orange">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-headline font-bold text-xl text-white mb-2">Rate Your Experience</h3>
            <p className="text-sm text-gray-300 mb-4">How was your shopping experience with QuickKart?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#fd6c1a] text-white hover:scale-110 transition-all flex items-center justify-center">
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/orders"
            className="flex-1 btn-primary py-4 justify-center gap-2 text-sm"
          >
            <Package className="w-4 h-4" /> View Order Details
          </Link>
          <Link
            to="/products"
            className="flex-1 bg-white dark:bg-[#1c2722] hover:bg-[#f3f4f5] dark:hover:bg-[#222e29] text-[#00241a] dark:text-white border border-[#e7e8e9] dark:border-[#2e3a35] font-headline font-bold text-sm uppercase tracking-wider py-4 rounded-2xl transition-all text-center flex items-center justify-center gap-2 shadow-xs"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;