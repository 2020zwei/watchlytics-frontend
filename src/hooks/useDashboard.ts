import { useQuery } from '@tanstack/react-query';
import { stats, expense, income, marketData, brands } from '@/services/dashboardService';

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

export const useExpense = () =>
    useQuery({
        queryKey: ['expense'],
        queryFn: expense,
    });

export const useIncome = () =>
    useQuery({
        queryKey: ['income'],
        queryFn: income,
    });

export const useMarketData = (params?: Record<string, any>) =>
    useQuery({
        queryKey: ['marketData', params],
        queryFn: () => marketData(params),
        enabled: !!params,
    });
