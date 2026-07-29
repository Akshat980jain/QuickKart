import React, { useState } from 'react';
import { 
  Store, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle,
  Globe
} from 'lucide-react';

const BecomeSeller: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('tech');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto space-y-16">
        
        {/* Hero Banner */}
        <div className="bg-[#00241a] text-white rounded-3xl p-8 sm:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0d3b2e] rounded-full filter blur-3xl opacity-50 pointer-events-none" />
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fd6c1a]/20 text-[#fd6c1a] text-xs font-bold uppercase tracking-wider">
              QuickKart Merchant Network
            </span>
            <h1 className="font-headline font-bold text-4xl sm:text-6xl tracking-tight">Sell Your Luxury Creations Worldwide</h1>
            <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
              Join an elite collective of master artisans, watchmakers, and interior studios reaching over 200,000 discerning luxury buyers.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#1c2722] p-8 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00241a] text-white flex items-center justify-center">
              <Globe className="w-6 h-6 text-[#fd6c1a]" />
            </div>
            <h3 className="font-headline font-bold text-xl">Global Express Reach</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Cross-border logistics and customs clearance handled seamlessly through QuickKart's courier network.</p>
          </div>

          <div className="bg-white dark:bg-[#1c2722] p-8 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00241a] text-white flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#a3d0be]" />
            </div>
            <h3 className="font-headline font-bold text-xl">Competitive 8% Commission</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Industry-lowest merchant fees with zero hidden listing charges or monthly setup subscription fees.</p>
          </div>

          <div className="bg-white dark:bg-[#1c2722] p-8 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00241a] text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-headline font-bold text-xl">Weekly Merchant Payouts</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Direct automated bank transfers every Monday for all dispatched orders with real-time tax invoicing.</p>
          </div>
        </div>

        {/* Seller Registration Form */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#1c2722] p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-headline font-bold text-2xl">Merchant Application Submitted</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">Our seller onboarding team will review your application for {businessName} and contact {email} within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-headline font-bold text-2xl text-center mb-6">Apply for QuickKart Merchant Account</h3>
              
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Brand / Studio Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Atelier Geneve"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Business Contact Email</label>
                <input
                  type="email"
                  required
                  placeholder="merchant@brand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Primary Product Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] text-sm focus:outline-none"
                >
                  <option value="tech">Horology & Modern Tech</option>
                  <option value="decor">Architectural Home Decor</option>
                  <option value="apparel">Luxury Apparel & Leathercraft</option>
                  <option value="beauty">Organic Skincare & Wellness</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#00241a] text-white text-xs font-semibold hover:bg-[#0d3b2e] shadow-lg flex items-center justify-center gap-2"
              >
                Submit Merchant Application <ArrowRight className="w-4 h-4 text-[#fd6c1a]" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default BecomeSeller;
