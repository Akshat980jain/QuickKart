import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ArrowLeft, 
  Check, 
  Plus, 
  Minus,
  Sparkles,
  Share2,
  Package
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';
import ProductCard from '../components/product/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { getProduct, products, loading } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { toast } = useToast();
  
  const product = getProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (product) {
      setIsWishlisted(isInWishlist(product.id));
    }
  }, [product, isInWishlist]);

  // Loading skeleton view while fetching products
  if (loading && !product) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0e1512] py-10 transition-colors duration-500">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8 animate-pulse">
          <div className="h-6 w-32 bg-[#e7e8e9] dark:bg-[#2e3a35] rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white dark:bg-[#1c2722] p-8 rounded-3xl border border-[#e7e8e9] dark:border-[#2e3a35]">
            <div className="lg:col-span-6 aspect-[4/5] bg-[#e7e8e9] dark:bg-[#222e29] rounded-2xl" />
            <div className="lg:col-span-6 space-y-6">
              <div className="h-4 w-24 bg-[#e7e8e9] dark:bg-[#2e3a35] rounded" />
              <div className="h-10 w-3/4 bg-[#e7e8e9] dark:bg-[#2e3a35] rounded-xl" />
              <div className="h-6 w-1/3 bg-[#e7e8e9] dark:bg-[#2e3a35] rounded-lg" />
              <div className="h-20 w-full bg-[#e7e8e9] dark:bg-[#2e3a35] rounded-2xl" />
              <div className="h-14 w-full bg-[#e7e8e9] dark:bg-[#2e3a35] rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not found view after loading completes
  if (!product) {
    return (
      <div className="min-h-[70vh] bg-[#f8f9fa] dark:bg-[#0e1512] flex flex-col items-center justify-center p-6 text-center space-y-6 transition-colors duration-500">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#fd6c1a] to-[#e8480a] flex items-center justify-center shadow-orange">
          <Package className="w-12 h-12 text-white" />
        </div>
        <div className="space-y-2 max-w-md">
          <h1 className="font-headline font-extrabold text-3xl text-[#00241a] dark:text-white">Product Not Found</h1>
          <p className="text-sm text-[#717974] dark:text-gray-400">The item you are looking for might have been moved or is no longer available.</p>
        </div>
        <Link to="/products" className="btn-primary">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast(`Added ${quantity}x "${product.name}" to cart!`, 'success');
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleToggleWishlist = () => {
    const res = toggleWishlist(product);
    setIsWishlisted(res === 'added');
    toast(res === 'added' ? `"${product.name}" added to wishlist ❤` : `"${product.name}" removed from wishlist`, res === 'added' ? 'success' : 'info');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, text: product.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast('Product link copied to clipboard!', 'info');
    }
  };

  const originalPrice = (product.discount && product.discount > 0 && product.discount < 100) 
    ? product.price / (1 - product.discount / 100) 
    : undefined;

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0e1512] py-10 transition-colors duration-500">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#717974] dark:text-gray-400 hover:text-[#00241a] dark:hover:text-[#a3d0be] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          <button 
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#717974] dark:text-gray-400 hover:text-[#00241a] dark:hover:text-[#a3d0be] bg-white dark:bg-[#1c2722] px-4 py-2 rounded-full border border-[#e7e8e9] dark:border-[#2e3a35] shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start bg-white dark:bg-[#1c2722] p-8 sm:p-12 rounded-[2rem] border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card">
          
          {/* Main Product Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#f3f4f5] dark:bg-[#141d19] relative border border-[#e7e8e9] dark:border-[#2e3a35] shadow-inner-lg group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80';
                }}
              />
              {product.discount > 0 && (
                <div className="absolute top-5 left-5 badge-hot text-xs px-3 py-1">
                  {product.discount}% OFF
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white font-bold text-base bg-black/60 px-6 py-2.5 rounded-2xl">Currently Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <span className="text-xs font-bold text-[#fd6c1a] uppercase tracking-[0.15em] block mb-2">{product.category}</span>
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00241a] dark:text-white leading-[1.1] mb-4 tracking-tight">
                {product.name}
              </h1>

              {/* Ratings & Reviews */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.round(product.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-[#e1e3e4] dark:text-[#2e3a35] fill-current'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#00241a] dark:text-white">{product.rating || 4.8}</span>
                <span className="text-xs text-[#717974] dark:text-gray-400">({product.reviews || 36} verified customer reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-4 pb-6 border-b border-[#e7e8e9] dark:border-[#2e3a35]">
              <span className="font-headline font-extrabold text-4xl text-[#00241a] dark:text-[#a3d0be]">
                {formatPrice(product.price)}
              </span>
              {originalPrice && (
                <span className="text-lg text-[#717974] dark:text-gray-500 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
              {product.inStock ? (
                <span className="ml-auto text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-900/50">
                  <Check className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                </span>
              ) : (
                <span className="ml-auto text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-3.5 py-1.5 rounded-full border border-rose-200 dark:border-rose-900/50">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-base text-[#414845] dark:text-gray-300 leading-relaxed font-sans">
              {product.description || 'Thoughtfully crafted with high-grade sustainable materials and minimalist design principles.'}
            </p>

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#717974] dark:text-gray-400">Quantity:</span>
                <div className="flex items-center bg-[#f3f4f5] dark:bg-[#222e29] rounded-2xl overflow-hidden border border-[#e7e8e9] dark:border-[#2e3a35]">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#e7e8e9] dark:hover:bg-[#2e3a35] text-[#191c1d] dark:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-[#191c1d] dark:text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#e7e8e9] dark:hover:bg-[#2e3a35] text-[#191c1d] dark:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className={`flex-1 btn-primary py-4.5 text-sm justify-center gap-2.5 ${
                    !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isAdding ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding to Bag...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      {product.inStock ? `Add ${quantity} to Cart — ${formatPrice(product.price * quantity)}` : 'Out of Stock'}
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleToggleWishlist}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`p-4.5 rounded-2xl border transition-all shadow-xs ${
                    isWishlisted 
                      ? 'bg-[#fd6c1a] border-[#fd6c1a] text-white shadow-orange scale-105' 
                      : 'bg-white dark:bg-[#1c2722] border-[#e7e8e9] dark:border-[#2e3a35] text-[#414845] dark:text-gray-300 hover:text-[#fd6c1a]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#e7e8e9] dark:border-[#2e3a35] text-center text-xs text-[#717974] dark:text-gray-400">
              <div className="flex flex-col items-center gap-2 p-3 bg-[#f8f9fa] dark:bg-[#222e29] rounded-2xl">
                <Truck className="w-5 h-5 text-[#00241a] dark:text-[#a3d0be]" />
                <span className="font-semibold">Free Express Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#f8f9fa] dark:bg-[#222e29] rounded-2xl">
                <RotateCcw className="w-5 h-5 text-[#00241a] dark:text-[#a3d0be]" />
                <span className="font-semibold">30-Day Easy Returns</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#f8f9fa] dark:bg-[#222e29] rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-[#00241a] dark:text-[#a3d0be]" />
                <span className="font-semibold">1-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className="bg-white dark:bg-[#1c2722] rounded-[2rem] p-8 sm:p-12 border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card space-y-8">
          <div className="flex items-center gap-8 border-b border-[#e7e8e9] dark:border-[#2e3a35] pb-4 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('desc')}
              className={`font-headline font-bold text-sm uppercase tracking-wider pb-4 -mb-4 transition-colors whitespace-nowrap ${
                activeTab === 'desc' 
                  ? 'text-[#00241a] dark:text-[#a3d0be] border-b-2 border-[#00241a] dark:border-[#a3d0be]' 
                  : 'text-[#717974] dark:text-gray-400 hover:text-[#00241a]'
              }`}
            >
              Description & Story
            </button>
            <button 
              onClick={() => setActiveTab('specs')}
              className={`font-headline font-bold text-sm uppercase tracking-wider pb-4 -mb-4 transition-colors whitespace-nowrap ${
                activeTab === 'specs' 
                  ? 'text-[#00241a] dark:text-[#a3d0be] border-b-2 border-[#00241a] dark:border-[#a3d0be]' 
                  : 'text-[#717974] dark:text-gray-400 hover:text-[#00241a]'
              }`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`font-headline font-bold text-sm uppercase tracking-wider pb-4 -mb-4 transition-colors whitespace-nowrap ${
                activeTab === 'reviews' 
                  ? 'text-[#00241a] dark:text-[#a3d0be] border-b-2 border-[#00241a] dark:border-[#a3d0be]' 
                  : 'text-[#717974] dark:text-gray-400 hover:text-[#00241a]'
              }`}
            >
              Reviews ({product.reviews || 24})
            </button>
          </div>

          <div className="text-sm text-[#414845] dark:text-gray-300 leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4 max-w-3xl">
                <p>{product.description || 'Crafted with extreme care and attention to detail.'} Engineered to bring timeless sophistication to your everyday environment.</p>
                <p>Every piece undergoes strict quality assurance to meet our high standards of durability, ergonomics, and aesthetic excellence.</p>
              </div>
            )}
            {activeTab === 'specs' && (
              <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[#f8f9fa] dark:bg-[#222e29] rounded-2xl border border-[#e7e8e9] dark:border-[#2e3a35]">
                  <dt className="font-bold text-xs uppercase tracking-wider text-[#717974] dark:text-gray-400 mb-1">Category</dt>
                  <dd className="font-semibold text-[#191c1d] dark:text-white capitalize">{product.category}</dd>
                </div>
                <div className="p-4 bg-[#f8f9fa] dark:bg-[#222e29] rounded-2xl border border-[#e7e8e9] dark:border-[#2e3a35]">
                  <dt className="font-bold text-xs uppercase tracking-wider text-[#717974] dark:text-gray-400 mb-1">SKU Code</dt>
                  <dd className="font-semibold text-[#191c1d] dark:text-white">QK-{product.id}</dd>
                </div>
                <div className="p-4 bg-[#f8f9fa] dark:bg-[#222e29] rounded-2xl border border-[#e7e8e9] dark:border-[#2e3a35]">
                  <dt className="font-bold text-xs uppercase tracking-wider text-[#717974] dark:text-gray-400 mb-1">Warranty</dt>
                  <dd className="font-semibold text-[#191c1d] dark:text-white">1 Year Manufacturer Warranty</dd>
                </div>
                <div className="p-4 bg-[#f8f9fa] dark:bg-[#222e29] rounded-2xl border border-[#e7e8e9] dark:border-[#2e3a35]">
                  <dt className="font-bold text-xs uppercase tracking-wider text-[#717974] dark:text-gray-400 mb-1">Shipping</dt>
                  <dd className="font-semibold text-[#191c1d] dark:text-white">Same-Day Dispatch</dd>
                </div>
              </dl>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-4 max-w-3xl">
                {[
                  { name: 'Sophia M.', rating: 5, date: 'Oct 24, 2024', comment: 'Exceeded my expectations! High quality materials and premium packaging.' },
                  { name: 'David K.', rating: 5, date: 'Oct 20, 2024', comment: 'Fast shipping and amazing product. Will definitely order from QuickKart again!' }
                ].map((rev, i) => (
                  <div key={i} className="p-5 bg-[#f8f9fa] dark:bg-[#222e29] rounded-2xl border border-[#e7e8e9] dark:border-[#2e3a35]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-[#191c1d] dark:text-white">{rev.name}</span>
                      <span className="text-xs text-[#717974]">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400 mb-2">
                      {[...Array(rev.rating)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#414845] dark:text-gray-300">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <h2 className="font-headline font-extrabold text-3xl text-[#00241a] dark:text-white tracking-tight">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;