import { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchProducts } from '../services/api';

// Accept options with optional limit
export const useProducts = (options?: { limit?: number }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();
        // If limit is provided, slice the array
        const limitedProducts = options?.limit ? allProducts.slice(0, options.limit) : allProducts;
        setProducts(limitedProducts);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, [options?.limit]);

  const getProduct = async (id?: string): Promise<Product | undefined> => {
    if (!id) return undefined;
    try {
      // This method is no longer used in the new implementation
      return undefined;
    } catch (err) {
      console.error('Failed to fetch product:', err);
      return undefined;
    }
  };

  return {
    products,
    loading,
    error,
    getProduct
  };
};