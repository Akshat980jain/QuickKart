import { Deal, DealFilter, DealSortOptions, DealStats } from '../types';

// Mock API endpoints - replace with real API calls
const API_BASE_URL = 'https://quickkart-b0yb.onrender.com/deals';

class DealsService {
  // Fetch all deals with optional filters
  async getDeals(
    filters?: DealFilter,
    sortOptions?: DealSortOptions,
    page = 1,
    limit = 12
  ): Promise<{ deals: Deal[]; totalCount: number }> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters?.category && { category: filters.category }),
        ...(filters?.priceRange && {
          minPrice: filters.priceRange.min.toString(),
          maxPrice: filters.priceRange.max.toString(),
        }),
        ...(filters?.rating && { minRating: filters.rating.toString() }),
        ...(filters?.discount && { minDiscount: filters.discount.toString() }),
        ...(filters?.inStock && { inStock: 'true' }),
        ...(sortOptions?.sortBy && { sortBy: sortOptions.sortBy }),
        ...(sortOptions?.order && { order: sortOptions.order }),
      });

      const response = await fetch(`${API_BASE_URL}?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        deals: data.deals || [],
        totalCount: data.totalCount || 0
      };
    } catch (error) {
      console.error('Error fetching deals:', error);
      // Return mock data for development
      return this.getMockDeals(filters, sortOptions, page, limit);
    }
  }

  // Get a single deal by ID
  async getDealById(id: number): Promise<Deal | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching deal:', error);
      return null;
    }
  }

  // Toggle favorite status
  async toggleFavorite(dealId: number, userId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/${dealId}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }

  // Get deal statistics
  async getDealStats(): Promise<DealStats> {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching deal stats:', error);
      return {
        totalDeals: 0,
        totalSavings: 0,
        averageDiscount: 0,
        topCategory: 'Electronics'
      };
    }
  }

  // Subscribe to newsletter
  async subscribeNewsletter(email: string, preferences: any): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, preferences }),
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      return false;
    }
  }

  // Search deals
  async searchDeals(query: string, filters?: DealFilter): Promise<Deal[]> {
    try {
      const queryParams = new URLSearchParams({
        q: query,
        ...(filters?.category && { category: filters.category }),
      });

      const response = await fetch(`${API_BASE_URL}/search?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.deals || [];
    } catch (error) {
      console.error('Error searching deals:', error);
      return [];
    }
  }

  // Get trending deals
  async getTrendingDeals(limit = 6): Promise<Deal[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/trending?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.deals || [];
    } catch (error) {
      console.error('Error fetching trending deals:', error);
      return [];
    }
  }

  // Mock data for development
  private getMockDeals(
    filters?: DealFilter,
    sortOptions?: DealSortOptions,
    page = 1,
    limit = 12
  ): { deals: Deal[]; totalCount: number } {
    const mockDeals: Deal[] = [
      {
        id: 1,
        title: "Premium Wireless Headphones",
        originalPrice: 299.99,
        discountPrice: 199.99,
        discount: 33,
        rating: 4.8,
        reviews: 1247,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        category: "Electronics",
        timeLeft: "2 days",
        isFavorite: false,
        description: "High-quality wireless headphones with noise cancellation",
        brand: "AudioTech",
        tags: ["wireless", "noise-cancelling", "premium"],
        stock: 45,
        expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      },
      // Add more mock deals...
    ];

    let filteredDeals = mockDeals;

    // Apply filters
    if (filters) {
      if (filters.category) {
        filteredDeals = filteredDeals.filter(deal => deal.category === filters.category);
      }
      if (filters.priceRange) {
        filteredDeals = filteredDeals.filter(deal => 
          deal.discountPrice >= filters.priceRange!.min && 
          deal.discountPrice <= filters.priceRange!.max
        );
      }
      if (filters.rating) {
        filteredDeals = filteredDeals.filter(deal => deal.rating >= filters.rating!);
      }
      if (filters.discount) {
        filteredDeals = filteredDeals.filter(deal => deal.discount >= filters.discount!);
      }
      if (filters.inStock) {
        filteredDeals = filteredDeals.filter(deal => deal.stock && deal.stock > 0);
      }
    }

    // Apply sorting
    if (sortOptions) {
      filteredDeals.sort((a, b) => {
        let comparison = 0;
        
        switch (sortOptions.sortBy) {
          case 'discount':
            comparison = b.discount - a.discount;
            break;
          case 'price':
            comparison = a.discountPrice - b.discountPrice;
            break;
          case 'rating':
            comparison = b.rating - a.rating;
            break;
          case 'popularity':
            comparison = b.reviews - a.reviews;
            break;
          default:
            comparison = 0;
        }
        
        return sortOptions.order === 'asc' ? -comparison : comparison;
      });
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedDeals = filteredDeals.slice(startIndex, startIndex + limit);

    return {
      deals: paginatedDeals,
      totalCount: filteredDeals.length
    };
  }
}

export const dealsService = new DealsService(); 