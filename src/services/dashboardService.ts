import { URLS } from '@/utils/constants';
import apiClient from './apiClient';

export const stats = () => {
    return apiClient.get(URLS.DASHBOARD_STATS).then(res => res);
}
export const income = (params?: Record<string, any>) => {
    return apiClient.get(URLS.DASHBOARD_INCOME_BREAKDONW, { params }).then(res => res);
}
export const expense = () => {
    return apiClient.get(URLS.EXPENSES).then(res => res);
}
export const brands = () => {
    return apiClient.get(URLS.CATEGORES).then(res => res);
}
export const marketData = (params?: Record<string, any>) => {
    return apiClient.get(URLS.MARKET_COMPARISON, { params }).then(res => res);
}
