import React from 'react';
import { ShieldCheck, Scale, FileText } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[900px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#00241a] text-white flex items-center justify-center mx-auto shadow-lg">
            <Scale className="w-7 h-7 text-[#fd6c1a]" />
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl">Terms of Service & Buyer Protection</h1>
          <p className="text-xs text-gray-500">Effective Date: July 29, 2026</p>
        </div>

        <div className="bg-white dark:bg-[#1c2722] p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-8 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h3 className="font-headline font-bold text-xl text-[#00241a] dark:text-[#a3d0be]">1. Account Registration & User Obligations</h3>
            <p className="text-gray-600 dark:text-gray-300">
              By accessing QuickKart, you agree to provide accurate registration information. Users are responsible for maintaining the confidentiality of their credentials and all activities occurring under their account.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-headline font-bold text-xl text-[#00241a] dark:text-[#a3d0be]">2. Pricing & Product Accuracy</h3>
            <p className="text-gray-600 dark:text-gray-300">
              While we strive to ensure 100% pricing accuracy, errors may occasionally occur. In the event of a pricing error, QuickKart reserves the right to cancel affected orders prior to dispatch, with full instant refund.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-headline font-bold text-xl text-[#00241a] dark:text-[#a3d0be]">3. QuickKart Buyer Guarantee</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every item purchased is guaranteed authentic. If an item arrives damaged or fails authenticity verification, QuickKart provides a 100% money-back refund plus complimentary return shipping.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-headline font-bold text-xl text-[#00241a] dark:text-[#a3d0be]">4. Intellectual Property</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All branding, product images, editorial content, and software code on QuickKart are protected by copyright laws and belong exclusively to QuickKart or its official brand partners.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};

export default Terms;
