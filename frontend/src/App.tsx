import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import Layout from './components/layout/Layout';

// Existing Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';
import Deals from './pages/Deals';
import Wishlist from './pages/Wishlist';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

// Existing Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminUsers from './pages/admin/Users';

// ─── NEW EXPANSION PAGES ───────────────────────────────────────────────────────
// Support & Self-Service
import HelpCenter from './pages/HelpCenter';
import Returns from './pages/Returns';
import ContactUs from './pages/ContactUs';

// Loyalty & Engagement
import Rewards from './pages/Rewards';
import GiftCards from './pages/GiftCards';
import Compare from './pages/Compare';

// Content, Discovery & Stores
import Brands from './pages/Brands';
import BrandDetail from './pages/BrandDetail';
import StoreLocator from './pages/StoreLocator';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// Legal & Information
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import ShippingPolicy from './pages/ShippingPolicy';

// Extended Admin Suite
import AdminAnalytics from './pages/admin/Analytics';
import AdminOrders from './pages/admin/Orders';
import AdminPromotions from './pages/admin/Promotions';
import AdminSupportTickets from './pages/admin/SupportTickets';

// Seller / Vendor Portal
import BecomeSeller from './pages/vendor/BecomeSeller';
import VendorDashboard from './pages/vendor/Dashboard';

// Context providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* Core Customer Routes */}
                  <Route index element={<Home />} />
                  <Route path="products" element={<Products />} />
                  <Route path="products/:id" element={<ProductDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="orders" element={<OrderHistory />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="order-success" element={<OrderSuccess />} />
                  <Route path="deals" element={<Deals />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="settings" element={<Settings />} />

                  {/* Customer Support Portal */}
                  <Route path="help" element={<HelpCenter />} />
                  <Route path="returns" element={<Returns />} />
                  <Route path="contact" element={<ContactUs />} />

                  {/* Customer Loyalty & Rewards */}
                  <Route path="rewards" element={<Rewards />} />
                  <Route path="gift-cards" element={<GiftCards />} />
                  <Route path="compare" element={<Compare />} />

                  {/* Discovery & Content */}
                  <Route path="brands" element={<Brands />} />
                  <Route path="brands/:id" element={<BrandDetail />} />
                  <Route path="stores" element={<StoreLocator />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="blog/:slug" element={<BlogPost />} />

                  {/* Legal & Policy */}
                  <Route path="privacy" element={<PrivacyPolicy />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="shipping-policy" element={<ShippingPolicy />} />

                  {/* Admin Routes */}
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="admin/products" element={<AdminProducts />} />
                  <Route path="admin/users" element={<AdminUsers />} />
                  <Route path="admin/analytics" element={<AdminAnalytics />} />
                  <Route path="admin/orders" element={<AdminOrders />} />
                  <Route path="admin/promotions" element={<AdminPromotions />} />
                  <Route path="admin/support" element={<AdminSupportTickets />} />

                  {/* Vendor / Seller Portal */}
                  <Route path="sell" element={<BecomeSeller />} />
                  <Route path="vendor/dashboard" element={<VendorDashboard />} />

                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Router>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;