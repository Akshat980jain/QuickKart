import React, { useState } from 'react';
import { 
  Award, 
  Crown, 
  Gift, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  Zap, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { LOYALTY_TIERS } from '../data/mockExtraPagesData';

const Rewards: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const userPoints = 2450;
  const userTierIndex = 1; // Silver Collective
  const nextTierPoints = 3000;
  const referralCode = 'JULIAN25VIP';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://quickkart.com/register?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const rewardVouchers = [
    { id: 'v-1', name: '₹500 Discount Voucher', points: 500, desc: 'Valid on orders above ₹2,000' },
    { id: 'v-2', name: 'Free Express Shipping Pass', points: 750, desc: 'Valid for 3 express deliveries' },
    { id: 'v-3', name: '₹1,500 VIP Gift Card', points: 1500, desc: 'Valid on all product categories' },
    { id: 'v-4', name: 'Exclusive Leather Care Kit', points: 2500, desc: 'Physical gift delivered to doorstep' },
  ];

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto space-y-12">
        
        {/* ─── HERO USER REWARDS HEADER ────────────────────────────────────────── */}
        <div className="bg-[#00241a] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#0d3b2e]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0d3b2e] rounded-full filter blur-3xl opacity-50 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fd6c1a]/20 text-[#fd6c1a] text-xs font-bold uppercase tracking-wider border border-[#fd6c1a]/30">
                <Crown className="w-3.5 h-3.5" /> QuickKart Circle VIP
              </span>
              <h1 className="font-headline font-bold text-3xl sm:text-5xl tracking-tight">
                Welcome back, Julian
              </h1>
              <p className="text-gray-300 text-sm sm:text-base max-w-xl font-light">
                You are currently a <strong className="text-[#a3d0be]">Silver Collective Member</strong>. Earn points on every purchase and unlock exclusive luxury privileges.
              </p>

              {/* Points Progress */}
              <div className="pt-4 space-y-2 max-w-md">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#a3d0be]">{userPoints} Points</span>
                  <span className="text-gray-400">{nextTierPoints - userPoints} Points to Gold Elite</span>
                </div>
                <div className="w-full h-3 bg-[#0d3b2e] rounded-full overflow-hidden border border-[#234e40]">
                  <div 
                    className="h-full bg-gradient-to-r from-[#fd6c1a] to-[#ffd700] rounded-full transition-all duration-1000"
                    style={{ width: `${(userPoints / nextTierPoints) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Points Summary Box */}
            <div className="lg:col-span-5 bg-[#0d3b2e]/60 backdrop-blur-md p-6 rounded-2xl border border-[#234e40] text-center space-y-3">
              <span className="text-xs uppercase text-gray-300 tracking-wider font-semibold">Available Reward Points</span>
              <div className="font-headline font-extrabold text-5xl text-[#ffd700] tracking-tight">
                {userPoints.toLocaleString()}
              </div>
              <p className="text-xs text-gray-300">Equivalent to ₹{userPoints} in voucher savings</p>
            </div>
          </div>
        </div>

        {/* ─── VIP TIERS OVERVIEW ──────────────────────────────────────────────── */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-headline font-bold text-3xl">QuickKart Circle Tiers</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Unlock higher tier rewards as your total points accumulate.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOYALTY_TIERS.map((tier, idx) => {
              const isCurrent = idx === userTierIndex;
              return (
                <div 
                  key={tier.name}
                  className={`p-6 rounded-2xl border transition-all relative ${
                    isCurrent 
                      ? 'bg-white dark:bg-[#1c2722] border-[#fd6c1a] shadow-lg ring-2 ring-[#fd6c1a]/20' 
                      : 'bg-white/60 dark:bg-[#1c2722]/60 border-gray-200 dark:border-[#2e3a35]'
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fd6c1a] text-white text-[10px] uppercase tracking-wider font-bold px-3 py-0.5 rounded-full shadow">
                      Current Tier
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow" style={{ backgroundColor: tier.color }}>
                      <Crown className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base">{tier.name}</h4>
                      <p className="text-xs text-gray-500">{tier.minPoints.toLocaleString()} Points</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-[#fd6c1a] flex-shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── REDEEM VOUCHERS CATALOG ─────────────────────────────────────────── */}
        <div className="space-y-6">
          <h2 className="font-headline font-bold text-2xl">Redeem Points for Vouchers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardVouchers.map((v) => {
              const canAfford = userPoints >= v.points;
              return (
                <div key={v.id} className="bg-white dark:bg-[#1c2722] p-6 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#fd6c1a]/10 text-[#fd6c1a] flex items-center justify-center">
                      <Gift className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-base">{v.name}</h4>
                    <p className="text-xs text-gray-500">{v.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-[#2e3a35] flex items-center justify-between">
                    <span className="font-extrabold text-sm text-[#00241a] dark:text-[#a3d0be]">{v.points} Pts</span>
                    <button
                      disabled={!canAfford}
                      onClick={() => alert(`Redeemed ${v.name}!`)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        canAfford 
                          ? 'bg-[#00241a] dark:bg-[#234e40] text-white hover:bg-[#0d3b2e]' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-[#2e3a35]'
                      }`}
                    >
                      {canAfford ? 'Redeem' : 'Need Points'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── REFERRAL BANNER ─────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-[#00241a] to-[#0d3b2e] text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-headline font-bold text-2xl">Invite Friends, Earn 500 Points Each</h3>
            <p className="text-sm text-gray-300 max-w-lg">
              Share your referral link. When your friends make their first purchase, you both receive 500 bonus reward points.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="px-4 py-3 bg-[#0d3b2e] rounded-xl font-mono text-sm font-bold border border-[#234e40]">
              {referralCode}
            </div>
            <button
              onClick={handleCopyLink}
              className="px-6 py-3 rounded-xl bg-[#fd6c1a] hover:bg-[#e8480a] text-white text-sm font-semibold flex items-center gap-2 transition-colors flex-shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied Link' : 'Copy Link'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Rewards;
