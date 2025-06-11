import { useQuery } from '@tanstack/react-query';
import { bestSellings, reportStats, expenseReports, purchaseReports, stockReport, profitLoseReport } from '@/services/reportsService';
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
        placeholderData: (prevData) => prevData,
    });
};

export const useExpenseReport = (page:number) => {
    return useQuery({
        queryKey: ['expensereports'],
        queryFn: () => expenseReports(page),
        placeholderData: (prevData) => prevData,
    });
};

export const usePurchaseReport = (query: string) => {
    return useQuery({
        queryKey: ['purchasereports', query],
        queryFn: () => purchaseReports(query),
        enabled: !!query,
        placeholderData: (prevData) => prevData,
    });
};

export const useReportStat = () => {
    return useQuery({
        queryKey: ['reportStats'],
        queryFn: reportStats,
    });
};

export const useStockAgingReport = (query: { brand: string; model: string }) => {
    return useQuery({
        queryKey: ['stockReport', query],
        queryFn: () => stockReport(query),
        enabled: query !== undefined,
        placeholderData: (prevData) => prevData,
    });
};

export const useProfitLoseReport = (query: Record<string, any>, options = {}) =>
    useQuery({
        queryKey: ['profitLoseReport', query],
        queryFn: () => profitLoseReport(query),
        enabled: !!query?.period,
        ...options,
    });

export const usePurchaseReports = (query: Record<string, any>, options = {}) =>
    useQuery({
        queryKey: ['purchaseReports', query],
        queryFn: () => purchaseReports(query),
        enabled: !!query?.period,
        ...options,
    });


