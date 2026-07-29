import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye, Zap } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../context/ToastContext';
import { Product } from '../../types';
import { formatPrice } from '../../utils/formatPrice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(() => isInWishlist(product.id));
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);
    toast(`"${product.name}" added to cart!`, 'success');
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleWishlist(product);
    setIsWishlisted(result === 'added');
    toast(
      result === 'added'
        ? `"${product.name}" added to wishlist ❤`
        : `"${product.name}" removed from wishlist`,
      result === 'added' ? 'success' : 'info'
    );
  };

  const originalPrice = product.discount > 0 ? product.price / (1 - product.discount / 100) : null;
  const savingsAmount = originalPrice ? originalPrice - product.price : 0;

  const ratingStars = Math.round(product.rating);

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col rounded-3xl bg-white dark:bg-[#1c2722] overflow-hidden border border-[#e7e8e9] dark:border-[#2e3a35] shadow-card hover:shadow-card-xl transition-all duration-400 hover:-translate-y-1.5 h-full relative"
    >
      {/* ── Product Image ── */}
      <div className="relative overflow-hidden bg-[#f3f4f5] dark:bg-[#141d19]" style={{ aspectRatio: '4/5' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60';
          }}
          style={{ willChange: 'transform' }}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount > 0 && (
            <div className="badge-hot">
              {product.discount}% OFF
            </div>
          )}
          {!product.inStock && (
            <div className="bg-[#191c1d]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Out of Stock
            </div>
          )}
        </div>

        {/* Action Buttons (top right) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/* Wishlist */}
          <button
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-xs ${
              isWishlisted
                ? 'bg-[#fd6c1a] text-white scale-110 shadow-orange'
                : 'bg-white/85 dark:bg-[#191c1d]/85 text-[#414845] dark:text-gray-300 hover:bg-[#fd6c1a] hover:text-white hover:scale-110'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          
          {/* Quick View (visible on hover) */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            aria-label="Quick view"
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/85 dark:bg-[#191c1d]/85 text-[#414845] dark:text-gray-300 hover:bg-[#00241a] hover:text-white hover:scale-110 backdrop-blur-md transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-xs"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Overlay (slides up) */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-350">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className={`w-full py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-card-lg ${
              isAdding
                ? 'bg-[#00241a] text-white scale-95'
                : product.inStock
                  ? 'bg-white dark:bg-[#00241a] text-[#00241a] dark:text-white hover:bg-[#beedd9] dark:hover:bg-[#0d3b2e]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isAdding ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                {product.inStock ? 'Quick Add' : 'Out of Stock'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Card Details ── */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        <div className="text-[10px] font-bold text-[#fd6c1a] uppercase tracking-[0.1em] mb-1.5">
          {product.category}
        </div>

        {/* Name */}
        <h3 className="font-headline font-semibold text-[#191c1d] dark:text-white text-[0.9375rem] leading-snug mb-2.5 line-clamp-2 group-hover:text-[#00241a] dark:group-hover:text-[#a3d0be] transition-colors">
          {product.name}
        </h3>

        {/* Star Ratings */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < ratingStars
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-[#e1e3e4] dark:text-[#414845] fill-current'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#191c1d] dark:text-white">{product.rating}</span>
          <span className="text-xs text-[#717974] dark:text-gray-500">({product.reviews})</span>
        </div>

        {/* Price & Cart Button */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#e7e8e9]/60 dark:border-[#2e3a35]/60">
          <div className="flex flex-col">
            <span className="font-headline font-extrabold text-[1.0625rem] text-[#00241a] dark:text-[#a3d0be] leading-none">
              {formatPrice(product.price)}
            </span>
            {originalPrice && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-[#717974] dark:text-gray-500 line-through">
                  {formatPrice(originalPrice)}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  Save {formatPrice(savingsAmount)}
                </span>
              </div>
            )}
          </div>

          {/* Mobile / visible cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
            className={`flex items-center justify-center p-2.5 rounded-xl transition-all active:scale-90 shadow-xs ${
              product.inStock
                ? 'bg-[#00241a] dark:bg-[#a3d0be] text-white dark:text-[#00241a] hover:bg-[#0d3b2e] dark:hover:bg-[#beedd9] hover:shadow-green'
                : 'bg-gray-100 dark:bg-[#2e3a35] text-gray-400 cursor-not-allowed'
            }`}
          >
            {isAdding ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-[#002117]/30 dark:border-t-[#002117] rounded-full animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Flash sale timer overlay for discounted items */}
      {product.discount >= 20 && (
        <div className="absolute bottom-[76px] left-3 right-3 bg-[#fd6c1a]/95 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
          <Zap className="w-3 h-3" />
          Limited Stock — Order Today!
        </div>
      )}
    </Link>
  );
};

export default ProductCard;