import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  ArrowUpRight, 
  BarChart3, 
  Calendar, 
  Download,
  PieChart
} from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = [
    { title: 'Gross Merchandise Value (GMV)', value: '₹1,284,300', change: '+18.4%', isPositive: true, icon: DollarSign },
    { title: 'Customer Lifetime Value (LTV)', value: '₹14,250', change: '+8.2%', isPositive: true, icon: Users },
    { title: 'Conversion Rate', value: '4.32%', change: '+0.8%', isPositive: true, icon: TrendingUp },
    { title: 'Avg Order Value (AOV)', value: '₹8,450', change: '-1.2%', isPositive: false, icon: ShoppingCart },
  ];

  const categoryBreakdown = [
    { name: 'Modern Tech & Horology', share: '42%', revenue: '₹539,400', color: '#00241a' },
    { name: 'Home Decor & Sculpture', share: '28%', revenue: '₹359,600', color: '#fd6c1a' },
    { name: 'Apparel & Leathercraft', share: '18%', revenue: '₹231,100', color: '#371410' },
    { name: 'Wellness & Botanical', share: '12%', revenue: '₹154,200', color: '#a3d0be' },
  ];

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-8 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-[#2e3a35] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#fd6c1a]">Executive Suite</span>
            <h1 className="font-headline font-bold text-3xl sm:text-4xl mt-1">Financial & Cohort Analytics</h1>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#1c2722] border border-gray-200 dark:border-[#2e3a35] text-xs font-semibold focus:outline-none"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Year to Date</option>
            </select>
            <button
              onClick={() => alert('Exporting PDF Report...')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00241a] dark:bg-[#234e40] text-white text-xs font-semibold hover:bg-[#0d3b2e]"
            >
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="bg-white dark:bg-[#1c2722] p-6 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold uppercase text-gray-500">{s.title}</span>
                  <div className="w-9 h-9 rounded-xl bg-[#00241a]/10 dark:bg-[#234e40]/40 text-[#00241a] dark:text-[#a3d0be] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="font-headline font-bold text-3xl">{s.value}</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <span className={s.isPositive ? 'text-emerald-600' : 'text-red-500'}>{s.change}</span>
                  <span className="text-gray-400 font-normal">vs previous period</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts & Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Revenue Trend Simulation */}
          <div className="lg:col-span-8 bg-white dark:bg-[#1c2722] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-headline font-bold text-xl">Revenue Velocity</h3>
                <p className="text-xs text-gray-500">Daily sales performance trajectory</p>
              </div>
              <span className="text-xs font-bold text-[#fd6c1a] bg-[#fd6c1a]/10 px-3 py-1 rounded-full">Live Metrics</span>
            </div>

            {/* Simulated Visual Graph Bar */}
            <div className="h-64 flex items-end gap-3 pt-8 pb-2 px-4 bg-[#f8f9fa] dark:bg-[#0e1512] rounded-2xl border border-gray-100 dark:border-[#2e3a35]">
              {[45, 60, 52, 78, 85, 92, 70, 88, 95, 110, 105, 125].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className="w-full bg-[#00241a] dark:bg-[#234e40] group-hover:bg-[#fd6c1a] transition-all rounded-t-md"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-gray-400 font-mono">W{i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Revenue Distribution */}
          <div className="lg:col-span-4 bg-white dark:bg-[#1c2722] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-6">
            <h3 className="font-headline font-bold text-xl">Category Share</h3>
            
            <div className="space-y-4">
              {categoryBreakdown.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>{cat.name}</span>
                    <span className="text-gray-500">{cat.share} ({cat.revenue})</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 dark:bg-[#2e3a35] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: cat.share, backgroundColor: cat.color }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;
