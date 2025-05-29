import { URLS } from '@/utils/constants';
import apiClient from './apiClient';


export const customers = (query: string) =>
    apiClient.get(`${URLS.CUSTOMERS}${query}`).then(res => res);

export const customer = (id: number) =>
    apiClient.get(`${URLS.CUSTOMERS}${id}`).then(res => res);

export const create = (payload: any) =>
    apiClient.post(URLS.CUSTOMERS, payload).then(res => res);

export const remove = (id: number) =>
    apiClient.delete(`${URLS.CUSTOMERS}${id}`).then(res => res);

export const update = (payload: any, id: number) =>
    apiClient.patch(`${URLS.CUSTOMERS}${id}`, payload).then(res => res);

export const reportStats = () =>
    apiClient.get(URLS.REPORT_STATE).then(res => res.data);

