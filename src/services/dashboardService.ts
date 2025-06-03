import { URLS } from '@/utils/constants';
import apiClient from './apiClient';

export const stats = () => {
    return apiClient.get(URLS.DASHBOARD_STATS).then(res => res);
}
export const income = (params?: Record<string, any>) => {
    return apiClient.get(URLS.DASHBOARD_INCOME_BREAKDONW, { params }).then(res => res);
}
export const expense = (params: Record<string, any> = {}) => {
    // return apiClient.get(URLS.DASHBOARD_EXPENSE_TRACKING).then(res => res);
    const finalParams = {
        ...params,
    };
    return apiClient.get(URLS.DASHBOARD_EXPENSE_TRACKING, { params: finalParams }).then(res => res);
}

export const brands = () => {
    return apiClient.get(URLS.CATEGORES).then(res => res);
}

export const soldItems = (query: string | number) => {
    return apiClient.get(`${URLS.SOLD_ITEMS}${query}`).then(res => res);
}

export const marketData = (params: Record<string, any> = {}) => {
    const finalParams = {
        page_size: 20,
        ...params,
    };
    return apiClient.get(URLS.MARKET_COMPARISON, { params: finalParams }).then(res => res);
};

