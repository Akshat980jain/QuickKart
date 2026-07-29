import React, { useState } from 'react';
import { Truck, MapPin, Clock, ShieldCheck, CheckCircle } from 'lucide-react';

const ShippingPolicy: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [coverageStatus, setCoverageStatus] = useState<null | { express: boolean; time: string }>(null);

  const handleCheckCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim()) {
      setCoverageStatus({
        express: pincode.startsWith('11') || pincode.startsWith('40') || pincode.startsWith('56'),
        time: pincode.startsWith('11') ? 'Same-Day Express (Order by 12 PM)' : 'Standard 2-3 Business Days'
      });
    }
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[900px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#00241a] text-white flex items-center justify-center mx-auto shadow-lg">
            <Truck className="w-7 h-7 text-[#fd6c1a]" />
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl">Shipping & Delivery Guidelines</h1>
          <p className="text-xs text-gray-500">Global & Express Domestic Dispatch Timelines</p>
        </div>

        {/* Postal Code Coverage Checker Widget */}
        <div className="bg-white dark:bg-[#1c2722] p-8 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-4">
          <h3 className="font-headline font-bold text-lg">Check Express Delivery for Your Postal Code</h3>
          
          <form onSubmit={handleCheckCoverage} className="flex gap-3">
            <input
              type="text"
              placeholder="Enter 6-digit Pincode (e.g. 110001)..."
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#00241a] dark:bg-[#234e40] text-white text-xs font-semibold hover:bg-[#0d3b2e]"
            >
              Check Availability
            </button>
          </form>

          {coverageStatus && (
            <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-3 border ${
              coverageStatus.express
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50'
                : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50'
            }`}>
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Service Available for {pincode}</p>
                <p>{coverageStatus.time}</p>
              </div>
            </div>
          )}
        </div>

        {/* Policy Details */}
        <div className="bg-white dark:bg-[#1c2722] p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-8 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h3 className="font-headline font-bold text-xl text-[#00241a] dark:text-[#a3d0be]">1. Shipping Options & Costs</h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>• <strong>Free Express Shipping:</strong> Available on all orders over ₹499 within India.</p>
              <p>• <strong>Standard Shipping:</strong> ₹49 flat fee for orders under ₹499 (2-4 business days).</p>
              <p>• <strong>Same-Day Metro Delivery:</strong> ₹149 for select postal codes (Order before 12:00 PM).</p>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="font-headline font-bold text-xl text-[#00241a] dark:text-[#a3d0be]">2. International Shipping</h3>
            <p className="text-gray-600 dark:text-gray-300">
              QuickKart delivers to over 60 countries via DHL Express and FedEx. International delivery typically takes 5-8 business days. Customs duties are calculated transparently at checkout.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-headline font-bold text-xl text-[#00241a] dark:text-[#a3d0be]">3. Signature Requirement</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To safeguard high-value horology and fine jewelry orders over ₹20,000, an adult signature is required upon package delivery.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};

export default ShippingPolicy;
