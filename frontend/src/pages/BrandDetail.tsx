import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle,
  Package
} from 'lucide-react';
import { MOCK_BRANDS } from '../data/mockExtraPagesData';
import { generateMockProducts } from '../data/generateMockProducts';
import ProductCard from '../components/product/ProductCard';

const BrandDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const brand = MOCK_BRANDS.find(b => b.id === id) || MOCK_BRANDS[0];
  const allProducts = generateMockProducts();
  const brandProducts = allProducts.slice(0, 6);

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto space-y-10">
        
        {/* Back Link */}
        <Link
          to="/brands"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-[#00241a] dark:hover:text-[#a3d0be]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Brands
        </Link>

        {/* Brand Banner Header */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-[#2e3a35]">
          <img
            src={brand.coverImage}
            alt={brand.name}
            className="w-full h-80 sm:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-8 sm:p-12 flex flex-col justify-end text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase font-bold text-[#a3d0be] bg-[#00241a]/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-[#234e40]">
                <MapPin className="w-3.5 h-3.5" /> {brand.origin}
              </span>
              <span className="text-xs uppercase font-bold text-[#fd6c1a] bg-[#fd6c1a]/20 backdrop-blur-md px-3 py-1 rounded-full border border-[#fd6c1a]/30">
                {brand.category}
              </span>
            </div>
            <h1 className="font-headline font-bold text-4xl sm:text-6xl tracking-tight mb-2">{brand.name}</h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">{brand.description}</p>
          </div>
        </div>

        {/* Brand Authenticity Guarantee */}
        <div className="bg-white dark:bg-[#1c2722] p-6 rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base">Direct Official Brand Partner</h4>
              <p className="text-xs text-gray-500">Every item from {brand.name} sold on QuickKart comes with an official manufacturer warranty certificate.</p>
            </div>
          </div>
          <div className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#00241a] text-white flex-shrink-0">
            {brand.productCount} Authorized Items
          </div>
        </div>

        {/* Brand Products Grid */}
        <div className="space-y-6">
          <h2 className="font-headline font-bold text-2xl">Collection by {brand.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brandProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BrandDetail;
