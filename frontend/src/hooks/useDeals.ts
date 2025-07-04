import { useState, useEffect, useCallback } from 'react';
import { Deal, DealFilter, DealSortOptions, DealStats } from '../types';
import { dealsService } from '../services/dealsService';

interface UseDealsReturn {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
  toggleFavorite: (dealId: number) => Promise<void>;
}

export const useDeals = (
  filters?: DealFilter,
  sortOptions?: DealSortOptions,
  initialLimit = 12
): UseDealsReturn => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadDeals = useCallback(async (pageToLoad = 1, append = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const { deals: newDeals, totalCount: total } = await dealsService.getDeals(
        filters,
        sortOptions,
        pageToLoad,
        initialLimit
      );

      if (append) {
        setDeals(prev => [...prev, ...newDeals]);
      } else {
        setDeals(newDeals);
      }
      
      setTotalCount(total);
      setHasMore(newDeals.length === initialLimit && (pageToLoad * initialLimit) < total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters, sortOptions, initialLimit]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadDeals(nextPage, true);
    }
  }, [loading, hasMore, page, loadDeals]);

  const refresh = useCallback(() => {
    setPage(1);
    loadDeals(1, false);
  }, [loadDeals]);

  const toggleFavorite = useCallback(async (dealId: number) => {
    try {
      // Optimistically update UI
      setDeals(prev => prev.map(deal => 
        deal.id === dealId ? { ...deal, isFavorite: !deal.isFavorite } : deal
      ));

      // Make API call (you'll need to implement user authentication)
      // await dealsService.toggleFavorite(dealId, currentUserId);
    } catch (err) {
      // Revert optimistic update on error
      setDeals(prev => prev.map(deal => 
        deal.id === dealId ? { ...deal, isFavorite: !deal.isFavorite } : deal
      ));
      console.error('Error toggling favorite:', err);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    loadDeals(1, false);
  }, [loadDeals]);

  return {
    deals,
    loading,
    error,
    totalCount,
    hasMore,
    loadMore,
    refresh,
    toggleFavorite
  };
};

// Hook for deal statistics
export const useDealStats = () => {
  const [stats, setStats] = useState<DealStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const dealStats = await dealsService.getDealStats();
        setStats(dealStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return { stats, loading, error };
};

// Hook for search functionality
export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string, filters?: DealFilter) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await dealsService.searchDeals(query, filters);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setError(null);
  }, []);

  return {
    searchResults,
    loading,
    error,
    search,
    clearSearch
  };
};

// Hook for trending deals
export const useTrending = (limit = 6) => {
  const [trendingDeals, setTrendingDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        setError(null);
        const deals = await dealsService.getTrendingDeals(limit);
        setTrendingDeals(deals);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trending deals');
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, [limit]);

  return { trendingDeals, loading, error };
}; 