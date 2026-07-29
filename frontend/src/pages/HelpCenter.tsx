import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  HelpCircle, 
  Package, 
  Truck, 
  RotateCcw, 
  CreditCard, 
  ShieldCheck,
  ChevronDown,
  MessageSquare,
  Phone,
  Mail,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { FAQ_DATA } from '../data/mockExtraPagesData';

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const categories = [
    { id: 'all', name: 'All Categories', icon: HelpCircle },
    { id: 'orders', name: 'Orders & Tracking', icon: Package },
    { id: 'shipping', name: 'Shipping & Delivery', icon: Truck },
    { id: 'returns', name: 'Returns & Refunds', icon: RotateCcw },
    { id: 'payments', name: 'Payments & Billing', icon: CreditCard },
  ];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesQuery = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] transition-colors duration-300">
      
      {/* ─── HERO SEARCH SECTION ──────────────────────────────────────────────── */}
      <section className="bg-[#00241a] text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0d3b2e] rounded-full filter blur-3xl opacity-50 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d3b2e] text-[#a3d0be] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#234e40]">
            <Sparkles className="w-3.5 h-3.5" /> 24/7 Concierge Support
          </span>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl tracking-tight mb-4">
            How can we help you today?
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 font-light">
            Search our knowledge base, explore frequently asked questions, or connect with our concierge support team.
          </p>

          {/* Search Input Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers (e.g. tracking, returns, international delivery)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-[#1c2722] text-[#191c1d] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] shadow-lg text-sm sm:text-base border border-transparent dark:border-[#2e3a35]"
            />
          </div>
        </div>
      </section>

      {/* ─── CATEGORY NAV & FAQS ─────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        {/* Category Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all flex-shrink-0 border ${
                  isActive
                    ? 'bg-[#00241a] text-white border-[#00241a] shadow-md dark:bg-[#234e40] dark:border-[#234e40]'
                    : 'bg-white dark:bg-[#1c2722] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-[#2e3a35] hover:border-[#00241a]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#fd6c1a]' : 'text-gray-400'}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-headline font-semibold text-2xl mb-6">Frequently Asked Questions</h2>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white dark:bg-[#1c2722] border border-gray-200 dark:border-[#2e3a35] rounded-xl overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-base focus:outline-none"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#fd6c1a]' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm border-t border-gray-100 dark:border-[#2e3a35] pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-white dark:bg-[#1c2722] p-12 text-center rounded-xl border border-gray-200 dark:border-[#2e3a35]">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-1">No matching articles found</h3>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your search terms or filter selection.</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="text-xs font-semibold uppercase text-[#fd6c1a] hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Contact Cards Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-[#1c2722] border border-gray-200 dark:border-[#2e3a35] rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#00241a]/10 dark:bg-[#234e40]/40 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-[#00241a] dark:text-[#a3d0be]" />
              </div>
              <h3 className="font-headline font-semibold text-lg mb-2">Need Direct Support?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Our concierge team is available 24/7 to assist with your order inquiries.
              </p>
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#00241a] dark:bg-[#234e40] text-white text-sm font-semibold hover:bg-[#0d3b2e] transition-colors"
              >
                Submit Support Ticket <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-[#fd6c1a]/10 dark:bg-[#fd6c1a]/20 border border-[#fd6c1a]/30 rounded-xl p-6">
              <h4 className="font-semibold text-sm uppercase text-[#fd6c1a] tracking-wider mb-2">Self-Service Returns</h4>
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
                Need to return or exchange an item? Generate a free return label instantly.
              </p>
              <Link
                to="/returns"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#fd6c1a] hover:underline"
              >
                Start Return Request <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HelpCenter;
