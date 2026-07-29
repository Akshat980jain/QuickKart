import React from 'react';
import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  Star, 
  Plus, 
  ArrowUpRight,
  Clock
} from 'lucide-react';

const VendorDashboard: React.FC = () => {
  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-8 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-[#2e3a35] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#fd6c1a]">Merchant Portal</span>
            <h1 className="font-headline font-bold text-3xl sm:text-4xl mt-1">Zenith Atelier Merchant Hub</h1>
          </div>
          <button
            onClick={() => alert('Add Product Modal Opened')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#00241a] text-white text-xs font-semibold hover:bg-[#0d3b2e]"
          >
            <Plus className="w-4 h-4 text-[#fd6c1a]" /> Add New Listing
          </button>
        </div>

        {/* Merchant Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#1c2722] p-6 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-2">
            <span className="text-xs text-gray-500 font-semibold uppercase">Total Earnings (Net)</span>
            <div className="font-headline font-bold text-3xl">₹342,800</div>
            <span className="text-xs text-emerald-600 font-semibold">+14.2% this month</span>
          </div>

          <div className="bg-white dark:bg-[#1c2722] p-6 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-2">
            <span className="text-xs text-gray-500 font-semibold uppercase">Active Listings</span>
            <div className="font-headline font-bold text-3xl">42 Items</div>
            <span className="text-xs text-gray-400">All in stock</span>
          </div>

          <div className="bg-white dark:bg-[#1c2722] p-6 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-2">
            <span className="text-xs text-gray-500 font-semibold uppercase">Orders Dispatched</span>
            <div className="font-headline font-bold text-3xl">184</div>
            <span className="text-xs text-emerald-600 font-semibold">99.2% on-time dispatch</span>
          </div>

          <div className="bg-white dark:bg-[#1c2722] p-6 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-2">
            <span className="text-xs text-gray-500 font-semibold uppercase">Merchant Rating</span>
            <div className="font-headline font-bold text-3xl text-amber-500 flex items-center gap-1">
              4.9 <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <span className="text-xs text-gray-400">Based on 128 reviews</span>
          </div>
        </div>

        {/* Recent Merchant Orders */}
        <div className="bg-white dark:bg-[#1c2722] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-4">
          <h3 className="font-headline font-bold text-xl">Recent Merchant Sales</h3>
          
          <div className="divide-y divide-gray-100 dark:divide-[#2e3a35] text-xs">
            <div className="py-3 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">Zenith Obsidian Chronograph (Series 4)</p>
                <p className="text-gray-400">Order #QK-98421 • 1x Unit</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-[#00241a] dark:text-[#a3d0be]">₹24,990</p>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">Ready to Dispatch</span>
              </div>
            </div>

            <div className="py-3 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">Monolith Architectural Ceramic Vessel</p>
                <p className="text-gray-400">Order #QK-98418 • 2x Units</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-[#00241a] dark:text-[#a3d0be]">₹12,400</p>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px]">Shipped</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VendorDashboard;
