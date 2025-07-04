import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  AlertCircle, 
  ArrowLeft, 
  ShoppingBag, 
  Tag,
  Sparkles,
  Shield,
  Truck,
  Heart,
  Gift
} from 'lucide-react';
import { useCart } from '../hooks/useCart';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  // Calculate shipping costs
  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  // Calculate tax (e.g. 8.5%)
  const taxRate = 0.085;
  const taxAmount = totalPrice * taxRate;
  // Calculate final total
  const discountAmount = totalPrice * promoDiscount;
  const orderTotal = totalPrice + shippingCost + taxAmount - discountAmount;

  const handlePromoCode = () => {
    // Simple promo code logic - in real app, this would call an API
    const promoCodes = {
      'SAVE10': 0.10,
      'WELCOME20': 0.20,
      'FIRST15': 0.15
    };
    
    if (promoCodes[promoCode.toUpperCase()]) {
      setAppliedPromo(promoCode.toUpperCase());
      setPromoDiscount(promoCodes[promoCode.toUpperCase()]);
      setPromoCode('');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo('');
    setPromoDiscount(0);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full blur-3xl opacity-60"></div>
            </div>
            
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-2xl">
                <ShoppingBag size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
                Looks like you haven't added any products to your cart yet. Start exploring our amazing collection!
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Shopping
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Your Shopping Cart</h1>
          <p className="text-gray-600 text-lg">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Cart Items */}
          <div className="xl:w-2/3">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              {/* Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 text-sm font-semibold text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              {/* Cart Items */}
              <div className="divide-y divide-gray-100">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center hover:bg-gray-50 transition-colors duration-200 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center mb-4 md:mb-0">
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-24 h-24 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        />
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-200"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 capitalize mb-2">{item.category}</p>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            In Stock
                          </span>
                          <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <Heart size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-2 text-center mb-4 md:mb-0">
                      <div className="md:hidden text-sm text-gray-500 mb-1">Price:</div>
                      <div className="font-bold text-lg text-gray-900">₹{item.price.toFixed(2)}</div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="col-span-2 text-center mb-4 md:mb-0">
                      <div className="md:hidden text-sm text-gray-500 mb-1">Quantity:</div>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center bg-gray-100 rounded-full p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700 hover:bg-white rounded-full p-2 transition-all duration-200"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-16 text-center bg-transparent font-semibold text-gray-900 focus:outline-none"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700 hover:bg-white rounded-full p-2 transition-all duration-200"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="col-span-2 text-center">
                      <div className="md:hidden text-sm text-gray-500 mb-1">Total:</div>
                      <div className="font-bold text-xl text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Continue Shopping */}
            <div className="mt-8">
              <Link 
                to="/products" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-lg group transition-colors duration-200"
              >
                <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="xl:w-1/3">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 sticky top-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <ShoppingBag size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
              </div>
              
              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Tag className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-gray-700 font-medium">Promo Code</span>
                </div>
                {appliedPromo ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                        <Gift size={12} className="text-white" />
                      </div>
                      <span className="text-green-700 font-medium">{appliedPromo}</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow p-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={handlePromoCode}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-r-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
              
              {/* Order Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{totalPrice.toFixed(2)}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Discount ({appliedPromo})</span>
                    <span className="font-semibold">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">Shipping</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-gray-900">₹{taxAmount.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">₹{orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Free Shipping Notice */}
              {totalPrice < 50 && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mr-3 mt-0.5" />
                    <div>
                      <p className="text-blue-800 font-medium mb-1">Almost there!</p>
                      <p className="text-blue-700 text-sm">
                        Add ₹{(50 - totalPrice).toFixed(2)} more to qualify for FREE shipping!
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Security Badge */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">Secure checkout protected by SSL</span>
                </div>
              </div>
              
              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
              >
                <span>Proceed to Checkout</span>
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;