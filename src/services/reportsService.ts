import { URLS } from '@/utils/constants';
import apiClient from './apiClient';

export const expenses = (payload: any) =>
    apiClient.get(URLS.EXPENSES, payload).then(res => res);

export const bestSellings = (page: number) =>
    apiClient.get(`${URLS.BEST_SELLING}?page=${page}&page_size=20`).then(res => res);

export const reportStats = () =>
    apiClient.get(URLS.REPORT_STATE).then(res => res.data);



export const expenseReports = (page:number=1) =>
    apiClient.get(`${URLS.REPORTS_EXPENSES}?/page=${page}`).then(res => res);

export const stockReport = (query: { brand?: string; model?: string }) => {
    const filteredQuery: Record<string, string> = {};
    Object.entries(query).forEach(([key, value]) => {
        if (value) {
            filteredQuery[key] = value;
        }
    });

    const params = new URLSearchParams(filteredQuery).toString();
    return apiClient.get(`${URLS.STOCK_AGING}?${params}`).then(res => res);
};
export const profitLoseReport = (query: any) => {
    const params = query && new URLSearchParams(query).toString() || "";
    return apiClient.get(`${URLS.MONTHLY_PROFIT}?${params}`).then(res => res);
};

export const purchaseReports = (query: any) => {
    const params = query && new URLSearchParams(query).toString() || "";
    return apiClient.get(`${URLS.PURCHASE_SALES}?${params}`).then(res => res);
};




