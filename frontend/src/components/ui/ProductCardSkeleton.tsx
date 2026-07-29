import React from 'react';

/**
 * Animated skeleton placeholder for a product card while loading.
 */
const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 animate-pulse">
    {/* Image area */}
    <div className="aspect-square bg-gray-200 dark:bg-gray-700" />

    {/* Content area */}
    <div className="p-4 space-y-3">
      {/* Category */}
      <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
      {/* Title */}
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full" />
      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
        ))}
        <div className="w-10 h-4 bg-gray-200 dark:bg-gray-700 rounded-full ml-1" />
      </div>
      {/* Price row */}
      <div className="flex items-center justify-between pt-1">
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton;
