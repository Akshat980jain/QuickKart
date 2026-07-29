import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  PackageCheck,
  AlertTriangle,
  Download
} from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';

const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Revenue', value: '₹12,48,900', change: '+14.2%', isPositive: true, icon: DollarSign },
    { title: 'Total Orders', value: '1,420', change: '+8.7%', isPositive: true, icon: ShoppingBag },
    { title: 'Active Users', value: '12,450', change: '+24.1%', isPositive: true, icon: Users },
    { title: 'Conversion Rate', value: '3.82%', change: '-0.4%', isPositive: false, icon: TrendingUp },
  ];

  const recentOrders = [
    { id: '#QK-9021', customer: 'Alexander Wright', date: 'Oct 27, 2024', total: 4299, status: 'Completed', statusBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' },
    { id: '#QK-9020', customer: 'Elena Rostova', date: 'Oct 27, 2024', total: 18990, status: 'Processing', statusBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' },
    { id: '#QK-9019', customer: 'Marcus Vance', date: 'Oct 26, 2024', total: 7490, status: 'Shipped', statusBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' },
    { id: '#QK-9018', customer: 'Chloe Bennett', date: 'Oct 26, 2024', total: 2999, status: 'Completed', statusBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#191c1d] py-10 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e1e3e4] dark:border-[#414845]">
          <div>
            <span className="text-xs font-bold text-[#fd6c1a] uppercase tracking-widest block mb-1">Executive Portal</span>
            <h1 className="font-headline text-3xl font-extrabold text-[#00241a] dark:text-[#a3d0be]">Admin Dashboard</h1>
          </div>
          <button className="inline-flex items-center gap-2 bg-[#00241a] dark:bg-[#a3d0be] text-white dark:text-[#002117] font-headline font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white dark:bg-[#2e3132] p-6 rounded-3xl border border-[#e1e3e4] dark:border-[#414845] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#beedd9]/30 dark:bg-[#0d3b2e]/40 text-[#00241a] dark:text-[#a3d0be] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold ${stat.isPositive ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-[#717974] dark:text-gray-400 uppercase tracking-wider block mb-1">{stat.title}</span>
                  <div className="font-headline font-extrabold text-2xl text-[#191c1d] dark:text-white">{stat.value}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Orders Table & Inventory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Recent Orders */}
          <div className="lg:col-span-8 bg-white dark:bg-[#2e3132] p-6 sm:p-8 rounded-3xl border border-[#e1e3e4] dark:border-[#414845] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#e1e3e4] dark:border-[#414845]">
              <h2 className="font-headline font-bold text-lg text-[#00241a] dark:text-white">Recent Orders</h2>
              <span className="text-xs text-[#fd6c1a] font-bold cursor-pointer hover:underline">View All</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[#717974] dark:text-gray-400 uppercase tracking-wider border-b border-[#e1e3e4] dark:border-[#414845]">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e1e3e4]/60 dark:divide-[#414845] text-[#191c1d] dark:text-white font-medium">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#f3f4f5] dark:hover:bg-[#191c1d]/50 transition-colors">
                      <td className="py-4 font-headline font-bold text-[#00241a] dark:text-[#a3d0be]">{order.id}</td>
                      <td className="py-4">{order.customer}</td>
                      <td className="py-4 text-[#717974]">{order.date}</td>
                      <td className="py-4 font-bold">{formatPrice(order.total)}</td>
                      <td className="py-4 text-right">
                        <span className={`px-2.5 py-1 rounded-full font-bold ${order.statusBg}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="lg:col-span-4 bg-white dark:bg-[#2e3132] p-6 rounded-3xl border border-[#e1e3e4] dark:border-[#414845] shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-[#e1e3e4] dark:border-[#414845]">
              <AlertTriangle className="w-5 h-5 text-[#fd6c1a]" />
              <h2 className="font-headline font-bold text-lg text-[#00241a] dark:text-white">Low Inventory Alerts</h2>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#f3f4f5] dark:bg-[#191c1d] rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[#191c1d] dark:text-white">Wireless Headphones</div>
                  <div className="text-[10px] text-rose-500 font-bold">Only 2 items left</div>
                </div>
                <button className="bg-[#00241a] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                  Restock
                </button>
              </div>

              <div className="p-3 bg-[#f3f4f5] dark:bg-[#191c1d] rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[#191c1d] dark:text-white">Artisan Leather Chair</div>
                  <div className="text-[10px] text-rose-500 font-bold">Only 1 item left</div>
                </div>
                <button className="bg-[#00241a] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                  Restock
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;