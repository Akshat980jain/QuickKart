import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  ShoppingCart, 
  Star, 
  Trash2, 
  Plus, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { generateMockProducts } from '../data/generateMockProducts';
import { useCart } from '../hooks/useCart';

const Compare: React.FC = () => {
  const allProducts = generateMockProducts();
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    allProducts[0]?.id || 'prod-1',
    allProducts[1]?.id || 'prod-2',
    allProducts[2]?.id || 'prod-3',
  ]);

  const { addToCart } = useCart();

  const selectedProducts = allProducts.filter(p => selectedProductIds.includes(p.id));

  const handleRemoveProduct = (id: string) => {
    setSelectedProductIds(selectedProductIds.filter(pid => pid !== id));
  };

  const handleAddProductSlot = () => {
    const unselected = allProducts.find(p => !selectedProductIds.includes(p.id));
    if (unselected && selectedProductIds.length < 4) {
      setSelectedProductIds([...selectedProductIds, unselected.id]);
    }
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-[#2e3a35] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#fd6c1a] bg-[#fd6c1a]/10 px-3 py-1 rounded-full">
              Side-by-Side Analysis
            </span>
            <h1 className="font-headline font-bold text-3xl sm:text-4xl mt-2">Product Specification Matrix</h1>
          </div>
          {selectedProductIds.length < 4 && (
            <button
              onClick={handleAddProductSlot}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00241a] dark:bg-[#234e40] text-white text-xs font-semibold hover:bg-[#0d3b2e] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Product to Compare ({selectedProductIds.length}/4)
            </button>
          )}
        </div>

        {/* Comparison Matrix Grid Table */}
        {selectedProducts.length > 0 ? (
          <div className="bg-white dark:bg-[#1c2722] rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              
              {/* Product Header Row */}
              <thead>
                <tr className="border-b border-gray-200 dark:border-[#2e3a35]">
                  <th className="p-6 w-48 text-xs uppercase tracking-wider text-gray-500 font-bold bg-[#f8f9fa] dark:bg-[#0e1512]">
                    Products
                  </th>
                  {selectedProducts.map((product) => (
                    <th key={product.id} className="p-6 text-center align-top relative min-w-[220px]">
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-28 h-28 object-cover rounded-xl mx-auto mb-3 border border-gray-200 dark:border-[#2e3a35]"
                      />
                      <h4 className="font-bold text-sm line-clamp-1 mb-1">{product.name}</h4>
                      <p className="font-extrabold text-base text-[#00241a] dark:text-[#a3d0be] mb-3">₹{product.price.toLocaleString()}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full py-2 px-3 rounded-xl bg-[#00241a] dark:bg-[#234e40] text-white text-xs font-semibold hover:bg-[#0d3b2e] flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Specification Comparison Rows */}
              <tbody className="divide-y divide-gray-200 dark:divide-[#2e3a35] text-sm">
                
                {/* Rating */}
                <tr>
                  <td className="p-4 font-semibold text-xs uppercase text-gray-500 bg-[#f8f9fa] dark:bg-[#0e1512]">Rating & Reviews</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-amber-500 font-semibold">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <span>{p.rating || '4.8'}</span>
                        <span className="text-gray-400 text-xs">({p.reviewsCount || 120})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr>
                  <td className="p-4 font-semibold text-xs uppercase text-gray-500 bg-[#f8f9fa] dark:bg-[#0e1512]">Category</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-center font-medium capitalize text-gray-700 dark:text-gray-300">
                      {p.category}
                    </td>
                  ))}
                </tr>

                {/* Material / Craftsmanship */}
                <tr>
                  <td className="p-4 font-semibold text-xs uppercase text-gray-500 bg-[#f8f9fa] dark:bg-[#0e1512]">Material</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-center font-medium text-gray-700 dark:text-gray-300">
                      Grade 5 Titanium / Organic Stone
                    </td>
                  ))}
                </tr>

                {/* Warranty */}
                <tr>
                  <td className="p-4 font-semibold text-xs uppercase text-gray-500 bg-[#f8f9fa] dark:bg-[#0e1512]">Warranty</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-center font-medium text-emerald-600 dark:text-emerald-400">
                      2-Year Official Warranty
                    </td>
                  ))}
                </tr>

                {/* Express Shipping */}
                <tr>
                  <td className="p-4 font-semibold text-xs uppercase text-gray-500 bg-[#f8f9fa] dark:bg-[#0e1512]">Express Shipping</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-400 px-2.5 py-1 rounded-full">
                        <Check className="w-3.5 h-3.5" /> Available
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Stock Status */}
                <tr>
                  <td className="p-4 font-semibold text-xs uppercase text-gray-500 bg-[#f8f9fa] dark:bg-[#0e1512]">Stock Status</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-center font-medium text-gray-700 dark:text-gray-300">
                      In Stock (Ready to dispatch)
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1c2722] p-16 text-center rounded-2xl border border-gray-200 dark:border-[#2e3a35]">
            <h3 className="font-semibold text-lg mb-2">No Products Selected for Comparison</h3>
            <p className="text-gray-500 text-sm mb-6">Select products from the catalog to compare their specifications side-by-side.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00241a] text-white text-sm font-semibold hover:bg-[#0d3b2e]"
            >
              Browse Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Compare;
