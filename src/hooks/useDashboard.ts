import { useQuery } from '@tanstack/react-query';
import { stats, expense, income, marketData, brands, soldItems } from '@/services/dashboardService';

export const useStats = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: stats,
    });
};

export const useBrands = () => {
    return useQuery({
        queryKey: ['brands'],
        queryFn: brands,
    });
};

export const useExpense = (params?: Record<string, any>) =>
    useQuery({
        queryKey: ['expense', params],
        queryFn: () => expense(params),
        enabled: !!params,
    });

export const useIncome = () =>
    useQuery({
        queryKey: ['income'],
        queryFn: income,
    });
export const useSoldItems = (query: any) =>
    useQuery({
        queryKey: ['soldItems'],
        queryFn: () => soldItems(query),
        enabled: !!query,
    });

export const useMarketData = (params?: Record<string, any>) =>
    useQuery({
        queryKey: ['marketData', params],
        queryFn: () => marketData(params),
        enabled: !!params,
    });
