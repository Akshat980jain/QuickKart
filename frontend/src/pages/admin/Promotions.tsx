import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Calendar, 
  CheckCircle, 
  Sparkles, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { MOCK_ADMIN_COUPONS, AdminCoupon } from '../../data/mockExtraPagesData';

const AdminPromotions: React.FC = () => {
  const [coupons, setCoupons] = useState<AdminCoupon[]>(MOCK_ADMIN_COUPONS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [discountValue, setDiscountValue] = useState(20);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCode.trim()) {
      const created: AdminCoupon = {
        id: `c-${Date.now()}`,
        code: newCode.toUpperCase().trim(),
        discountType: 'percentage',
        discountValue,
        minOrderValue: 2000,
        usageCount: 0,
        maxUsage: 500,
        expiryDate: '2026-12-31',
        status: 'Active'
      };
      setCoupons([created, ...coupons]);
      setNewCode('');
      setShowCreateModal(false);
    }
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-8 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-[#2e3a35] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#fd6c1a]">Marketing Suite</span>
            <h1 className="font-headline font-bold text-3xl sm:text-4xl mt-1">Coupons & Flash Sales Manager</h1>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#00241a] dark:bg-[#234e40] text-white text-xs font-semibold hover:bg-[#0d3b2e]"
          >
            <Plus className="w-4 h-4 text-[#fd6c1a]" /> Create Voucher Code
          </button>
        </div>

        {/* Coupons List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map((c) => (
            <div key={c.id} className="bg-white dark:bg-[#1c2722] p-6 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-mono font-bold text-lg text-[#00241a] dark:text-[#a3d0be] bg-[#00241a]/10 dark:bg-[#234e40]/40 px-3 py-1 rounded-lg border border-[#234e40]/20">
                  {c.code}
                </span>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                  {c.status}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-2xl text-[#fd6c1a]">
                  {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                </h4>
                <p className="text-xs text-gray-500">Min order value: ₹{c.minOrderValue.toLocaleString()}</p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-[#2e3a35] flex items-center justify-between text-xs text-gray-500">
                <span>Usage: {c.usageCount} / {c.maxUsage}</span>
                <span>Expires: {c.expiryDate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <form onSubmit={handleCreateCoupon} className="bg-white dark:bg-[#1c2722] p-8 rounded-3xl border border-gray-200 dark:border-[#2e3a35] max-w-md w-full space-y-4 shadow-2xl">
              <h3 className="font-headline font-bold text-xl mb-2">Create New Coupon Code</h3>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Coupon Code Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH30"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  min="5"
                  max="90"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] text-sm focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-1/2 py-3 rounded-xl border border-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-[#00241a] text-white text-xs font-semibold hover:bg-[#0d3b2e]"
                >
                  Save Voucher
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPromotions;
