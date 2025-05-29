import { URLS } from '@/utils/constants';
import apiClient from './apiClient';

export const expenses = (payload: any) =>
    apiClient.get(URLS.EXPENSES, payload).then(res => res);

export const bestSellings = (page: number) =>
    apiClient.get(`${URLS.BEST_SELLING}?page=${page}&page_size=20`).then(res => res);

export const reportStats = () =>
    apiClient.get(URLS.REPORT_STATE).then(res => res.data);

