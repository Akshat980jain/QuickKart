import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle,
  Clock,
  Globe
} from 'lucide-react';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#fd6c1a] bg-[#fd6c1a]/10 px-3 py-1 rounded-full">
            We'd Love To Hear From You
          </span>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl mt-3 mb-4">Contact QuickKart Concierge</h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Have questions regarding luxury orders, brand partnerships, or custom styling? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1c2722] p-8 sm:p-10 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-headline font-bold text-2xl">Message Received</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm max-w-md mx-auto">
                  Thank you for reaching out. A QuickKart support specialist will respond to {formData.email} within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#00241a] text-white text-sm font-semibold hover:bg-[#0d3b2e]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-headline font-semibold text-xl mb-6">Send Us a Message</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Julian Thorne"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="julian@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
                  >
                    <option value="general">General Support Inquiry</option>
                    <option value="order">Order Status & Dispatch</option>
                    <option value="corporate">Corporate & Bulk Gifting</option>
                    <option value="partnership">Brand / Press Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="How can we assist you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#00241a] dark:bg-[#234e40] text-white font-semibold text-sm hover:bg-[#0d3b2e] transition-colors flex items-center justify-center gap-2"
                >
                  Submit Inquiry <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#00241a] text-white p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#0d3b2e] rounded-full filter blur-2xl opacity-40 pointer-events-none" />
              <h3 className="font-headline font-bold text-2xl mb-6 relative z-10">Quick Contact Info</h3>
              
              <div className="space-y-6 text-sm relative z-10">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#a3d0be] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-xs text-gray-400 uppercase">Concierge Email</h5>
                    <p className="font-medium text-white">concierge@quickkart.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#a3d0be] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-xs text-gray-400 uppercase">24/7 Priority Line</h5>
                    <p className="font-medium text-white">+91 1800 900 8822 (Toll Free)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#a3d0be] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-xs text-gray-400 uppercase">Headquarters</h5>
                    <p className="font-medium text-white">QuickKart Pavilion, Block C, Connaught Place, New Delhi - 110001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#a3d0be] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-xs text-gray-400 uppercase">Support Hours</h5>
                    <p className="font-medium text-white">24/7 Digital Concierge Desk</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1c2722] p-8 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm">
              <h4 className="font-headline font-semibold text-lg mb-2">Corporate Orders & Press</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                For custom corporate gift hampers, bulk orders, or press inquiries, please email our corporate team directly at <span className="font-semibold text-[#fd6c1a]">corporate@quickkart.com</span>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
