import React from 'react';
import { ShieldCheck, Lock, Eye, Trash2, Download } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[900px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#00241a] text-white flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-7 h-7 text-[#fd6c1a]" />
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl">Privacy Policy & Data Rights</h1>
          <p className="text-xs text-gray-500">Effective Date: July 29, 2026 • GDPR & CCPA Compliant</p>
        </div>

        <div className="bg-white dark:bg-[#1c2722] p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-8 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h3 className="font-headline font-bold text-xl text-[#00241a] dark:text-[#a3d0be]">1. Information We Collect</h3>
            <p className="text-gray-600 dark:text-gray-300">
              When you browse or make a purchase on QuickKart, we collect personal information necessary to fulfill your luxury orders, including your full name, shipping address, email, phone number, and payment transaction tokens.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-headline font-bold text-xl text-[#00241a] dark:text-[#a3d0be]">2. How We Protect Your Data</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We employ 256-bit SSL encryption across all transaction channels. Payment credentials are processed via PCI-DSS Level 1 certified gateways; QuickKart never stores raw credit card numbers.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-headline font-bold text-xl text-[#00241a] dark:text-[#a3d0be]">3. Cookie Preferences</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We use essential cookies for cart persistence and session security, as well as analytics cookies to personalize your shopping experience. You can modify your browser settings to decline non-essential cookies.
            </p>
          </section>

          <section className="space-y-4 p-6 bg-[#f8f9fa] dark:bg-[#0e1512] rounded-2xl border border-gray-200 dark:border-[#2e3a35]">
            <h4 className="font-bold text-base">Your Data Control Rights</h4>
            <p className="text-xs text-gray-500">Under GDPR & CCPA laws, you have the right to request a full export of your stored personal data or submit a request for account & data erasure.</p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => alert('Data Export Requested. A download link will be emailed to your account address.')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00241a] text-white text-xs font-semibold hover:bg-[#0d3b2e]"
              >
                <Download className="w-4 h-4" /> Export My Data (JSON)
              </button>
              <button
                onClick={() => alert('Data Deletion Request Initiated. Our privacy compliance team will process your request within 48 hours.')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-300 text-red-600 dark:border-red-900/50 dark:text-red-400 text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <Trash2 className="w-4 h-4" /> Request Account Erasure
              </button>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
