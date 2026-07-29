import React, { useState } from 'react';
import { 
  Gift, 
  CreditCard, 
  Send, 
  CheckCircle, 
  Sparkles, 
  Heart,
  PartyPopper,
  Smile,
  ShieldCheck
} from 'lucide-react';

const GiftCards: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState('birthday');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const presetAmounts = [1000, 2500, 5000, 10000];

  const cardThemes = [
    { id: 'birthday', label: 'Birthday Celebration', color: 'from-[#00241a] to-[#0d3b2e]', icon: PartyPopper },
    { id: 'thankyou', label: 'Warm Gratitude', color: 'from-[#a33e00] to-[#fd6c1a]', icon: Heart },
    { id: 'holiday', label: 'Festive Luxury', color: 'from-[#371410] to-[#512923]', icon: Sparkles },
    { id: 'generic', label: 'QuickKart Classic', color: 'from-[#234e40] to-[#002117]', icon: Gift },
  ];

  const finalAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount >= 500 && recipientEmail.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#fd6c1a] bg-[#fd6c1a]/10 px-3 py-1 rounded-full">
            Digital E-Gift Vouchers
          </span>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl mt-3 mb-4">Give The Gift of Luxury</h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Instant digital delivery to any inbox. Let your loved ones choose from QuickKart’s curated collection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Live Card Preview */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-headline font-semibold text-lg">Live Digital Card Preview</h3>
            
            {/* Interactive Gift Card Graphic */}
            <div className={`w-full aspect-[1.6/1] rounded-3xl p-6 sm:p-8 text-white bg-gradient-to-br ${cardThemes.find(t => t.id === selectedTheme)?.color} shadow-2xl relative overflow-hidden flex flex-col justify-between border border-white/20`}>
              <div className="flex justify-between items-start">
                <span className="font-headline font-bold text-2xl tracking-tighter">
                  QuickKart<span className="text-[#fd6c1a]">.</span>
                </span>
                <Gift className="w-8 h-8 opacity-80" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-1">E-GIFT CARD</p>
                <div className="font-headline font-extrabold text-3xl sm:text-4xl tracking-tight">
                  ₹{finalAmount.toLocaleString()}
                </div>
              </div>

              <div className="flex justify-between items-end text-xs text-white/80 border-t border-white/20 pt-3">
                <div>
                  <p className="text-[10px] text-white/60 uppercase">FOR</p>
                  <p className="font-semibold">{recipientName || 'Recipient Name'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/60 uppercase">FROM</p>
                  <p className="font-semibold">{senderName || 'Your Name'}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#1c2722] rounded-xl border border-gray-200 dark:border-[#2e3a35] text-xs text-gray-500 space-y-2">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#fd6c1a]" /> No expiration date. Valid across all store categories.
              </p>
              <p>Delivered instantly via email with a unique redemption claim code.</p>
            </div>
          </div>

          {/* Right Column: Customization Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1c2722] p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-headline font-bold text-2xl">Gift Card Scheduled!</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm max-w-md mx-auto">
                  Your ₹{finalAmount.toLocaleString()} QuickKart E-Gift Card has been processed and sent to <strong className="text-[#191c1d] dark:text-white">{recipientEmail}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-[#00241a] text-white text-sm font-semibold hover:bg-[#0d3b2e]"
                >
                  Send Another Gift Card
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Select Amount */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">1. Select Voucher Value</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                        className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                          selectedAmount === amt && !customAmount
                            ? 'bg-[#00241a] text-white border-[#00241a] dark:bg-[#234e40]'
                            : 'bg-[#f8f9fa] dark:bg-[#0e1512] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-[#2e3a35]'
                        }`}
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min="500"
                    max="100000"
                    placeholder="Or enter custom amount (Min ₹500)..."
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
                  />
                </div>

                {/* 2. Select Theme */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">2. Choose Card Design Theme</label>
                  <div className="grid grid-cols-2 gap-3">
                    {cardThemes.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTheme(t.id)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                          selectedTheme === t.id
                            ? 'border-[#fd6c1a] bg-[#fd6c1a]/10 text-[#fd6c1a]'
                            : 'border-gray-200 dark:border-[#2e3a35] text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        <t.icon className="w-4 h-4" /> {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Recipient Details */}
                <div className="space-y-4 pt-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">3. Recipient Information</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Recipient Full Name"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Recipient Email Address"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name (Sender)"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
                  />
                  <textarea
                    rows={3}
                    placeholder="Add a personal gift message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#00241a] dark:bg-[#234e40] text-white font-semibold text-sm hover:bg-[#0d3b2e] transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  Proceed to Checkout (₹{finalAmount.toLocaleString()}) <Send className="w-4 h-4" />
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default GiftCards;
