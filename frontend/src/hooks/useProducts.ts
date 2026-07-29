import { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchProducts } from '../services/api';
import { generateMockProducts } from '../data/generateMockProducts';

const categoryFallbackImages: Record<string, string[]> = {
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
  ],
  clothing: [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80'
  ],
  home: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80'
  ],
  beauty: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80'
  ],
  sports: [
    'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80'
  ],
  toys: [
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558060370-d644479be6f7?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80'
  ],
  automotive: [
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80'
  ],
  books: [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
  ],
  garden: [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80'
  ],
  food: [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80'
  ]
};

function sanitizeImageUrl(image: string, category: string, idx: number): string {
  if (!image || typeof image !== 'string' || image.includes('pexels.com')) {
    const list = categoryFallbackImages[category?.toLowerCase()] || categoryFallbackImages.electronics;
    return list[idx % list.length];
  }
  return image;
}

// Accept options with optional limit
export const useProducts = (options?: { limit?: number }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchProducts();
        
        if (isMounted && Array.isArray(fetchedData) && fetchedData.length > 0) {
          const normalized: Product[] = fetchedData.map((p: any, idx: number) => ({
            id: p.id ? String(p.id) : `prod_${idx + 1}`,
            name: p.name || 'Untitled Product',
            description: p.description || 'High-quality curated product designed for modern living.',
            price: typeof p.price === 'number' ? p.price : parseFloat(p.price) || 99.99,
            image: sanitizeImageUrl(p.image, p.category, idx),
            category: p.category || 'general',
            inStock: p.inStock ?? true,
            rating: typeof p.rating === 'number' ? p.rating : parseFloat(p.rating) || 4.5,
            reviews: typeof p.reviews === 'number' ? p.reviews : parseInt(p.reviews) || 24,
            discount: typeof p.discount === 'number' ? p.discount : parseFloat(p.discount) || 0,
          }));
          const finalProducts = options?.limit ? normalized.slice(0, options.limit) : normalized;
          setProducts(finalProducts);
          setError(null);
        } else if (isMounted) {
          const fallbackMocks = generateMockProducts(24);
          const finalProducts = options?.limit ? fallbackMocks.slice(0, options.limit) : fallbackMocks;
          setProducts(finalProducts);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('API fetch failed, falling back to mock products:', err);
          const fallbackMocks = generateMockProducts(24);
          const finalProducts = options?.limit ? fallbackMocks.slice(0, options.limit) : fallbackMocks;
          setProducts(finalProducts);
          setError(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [options?.limit]);

  const getProduct = (id?: string): Product | undefined => {
    if (!id) return undefined;
    return products.find(p => p.id === id || String(p.id) === String(id));
  };

  return {
    products,
    loading,
    error,
    getProduct
  };
};