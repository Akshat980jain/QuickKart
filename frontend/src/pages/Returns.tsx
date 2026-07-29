import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  RotateCcw, 
  Package, 
  CheckCircle, 
  Upload, 
  Printer, 
  Truck, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const Returns: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedReason, setSelectedReason] = useState('size_issue');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const returnReasons = [
    { id: 'size_issue', label: 'Size / Fit too small or large' },
    { id: 'damaged', label: 'Item arrived damaged or defective' },
    { id: 'not_as_described', label: 'Item differs from web description' },
    { id: 'changed_mind', label: 'Changed my mind / No longer needed' },
    { id: 'wrong_item', label: 'Received incorrect item' },
  ];

  const handleLookupOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim() && email.trim()) {
      setStep(2);
    }
  };

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[800px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[#00241a] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
            <RotateCcw className="w-8 h-8 text-[#fd6c1a]" />
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl mb-2">Returns & Exchange Portal</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
            Hassle-free 30-day return policy. Enter your order details below to generate a pre-paid return shipping label.
          </p>
        </div>

        {/* Progress Tracker Bar */}
        <div className="flex items-center justify-between max-w-md mx-auto mb-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-[#2e3a35] -translate-y-1/2 -z-0" />
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-[#00241a] text-white dark:bg-[#234e40]' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <span className="text-xs font-medium mt-1.5">Lookup</span>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-[#00241a] text-white dark:bg-[#234e40]' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <span className="text-xs font-medium mt-1.5">Reason</span>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-[#00241a] text-white dark:bg-[#234e40]' : 'bg-gray-200 text-gray-500'}`}>3</div>
            <span className="text-xs font-medium mt-1.5">Label</span>
          </div>
        </div>

        {/* ─── STEP 1: ORDER LOOKUP ─────────────────────────────────────────── */}
        {step === 1 && (
          <form onSubmit={handleLookupOrder} className="bg-white dark:bg-[#1c2722] p-8 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-6">
            <h2 className="font-headline font-semibold text-xl mb-4">Find Your Order</h2>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">Order Number</label>
              <input
                type="text"
                required
                placeholder="e.g. QK-98421"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">Billing Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. julian@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#00241a] dark:bg-[#234e40] text-white font-semibold text-sm hover:bg-[#0d3b2e] transition-colors flex items-center justify-center gap-2"
            >
              Locate Items <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* ─── STEP 2: REASON SELECTION ─────────────────────────────────────── */}
        {step === 2 && (
          <form onSubmit={handleSubmitReturn} className="bg-white dark:bg-[#1c2722] p-8 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-6">
            <h2 className="font-headline font-semibold text-xl">Select Items & Return Reason</h2>
            <div className="p-4 bg-[#f8f9fa] dark:bg-[#0e1512] rounded-xl flex items-center gap-4 border border-gray-200 dark:border-[#2e3a35]">
              <Package className="w-8 h-8 text-[#00241a] dark:text-[#a3d0be] flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Zenith Obsidian Chronograph</h4>
                <p className="text-xs text-gray-500">Order #{orderNumber} • Delivered July 28</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">Reason for Return</label>
              <div className="space-y-2">
                {returnReasons.map((r) => (
                  <label key={r.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-[#2e3a35] hover:bg-gray-50 dark:hover:bg-[#2e3a35]/50 cursor-pointer">
                    <input
                      type="radio"
                      name="return_reason"
                      checked={selectedReason === r.id}
                      onChange={() => setSelectedReason(r.id)}
                      className="accent-[#fd6c1a]"
                    />
                    <span className="text-sm font-medium">{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">Additional Comments (Optional)</label>
              <textarea
                rows={3}
                placeholder="Provide extra details..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl border border-gray-300 dark:border-[#2e3a35] text-sm font-semibold hover:bg-gray-100 dark:hover:bg-[#2e3a35]"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 rounded-xl bg-[#00241a] dark:bg-[#234e40] text-white font-semibold text-sm hover:bg-[#0d3b2e] transition-colors"
              >
                Generate Return Label
              </button>
            </div>
          </form>
        )}

        {/* ─── STEP 3: CONFIRMATION & PRINT LABEL ────────────────────────────── */}
        {step === 3 && (
          <div className="bg-white dark:bg-[#1c2722] p-8 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="font-headline font-bold text-2xl">Return Request Authorized</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Your return RMA reference <strong className="text-[#191c1d] dark:text-white">RMA-88401</strong> has been created. A printable shipping label has been sent to {email}.
            </p>

            <div className="p-6 bg-[#f8f9fa] dark:bg-[#0e1512] rounded-xl border border-dashed border-gray-300 dark:border-[#2e3a35] text-left space-y-3">
              <div className="flex justify-between text-xs font-semibold uppercase text-gray-500">
                <span>Pre-paid Courier</span>
                <span>DHL Express Drop-off</span>
              </div>
              <p className="text-sm font-semibold">Package Barcode: ||||| | |||| ||| |||| QK-RMA-88401</p>
              <p className="text-xs text-gray-500">Drop off package at any authorized courier kiosk within 14 days.</p>
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={() => alert('Printing Return Label...')}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#00241a] text-white text-sm font-semibold hover:bg-[#0d3b2e]"
              >
                <Printer className="w-4 h-4" /> Print Label
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl border border-gray-300 dark:border-[#2e3a35] text-sm font-semibold"
              >
                Back to Shopping
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Returns;
