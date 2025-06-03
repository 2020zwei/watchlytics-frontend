import { URLS } from '@/utils/constants';
import apiClient from './apiClient';


export const invoices = (query: string) =>
    apiClient.get(`${URLS.INVOICE}${query}`).then(res => res);
