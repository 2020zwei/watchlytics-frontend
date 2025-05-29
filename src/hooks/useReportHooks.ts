import { useQuery } from '@tanstack/react-query';
import { expenses, bestSellings, reportStats } from '@/services/reportsService';
import { expense } from '@/services/dashboardService';

export const useExpense = () => {
    return useQuery({
        queryKey: ['expenses'],
        queryFn: () => expense(),
    });
};

export const useBestSelling = (page: number) => {
    return useQuery({
        queryKey: ['bestSellings', page],
        queryFn: () => bestSellings(page),
        enabled: !!page,
        placeholderData: (prevData) => prevData, // replaces keepPreviousData
    });
};

export const useReportStat = () => {
    return useQuery({
        queryKey: ['reportStats'],
        queryFn: reportStats,
    });
};
