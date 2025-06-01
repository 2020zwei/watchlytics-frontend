import { URLS } from '@/utils/constants';
import apiClient from './apiClient';

export const transactions = (query: string) =>
    apiClient.get(`${URLS.TRANSACTIONS}${query}`).then(res => res);;

export const transactionById = (id: number | string) =>
    apiClient.get(`${URLS.TRANSACTIONS}${id}/`).then(res => res);;

export const add = (payload: FormData) =>
    apiClient.post(URLS.TRANSACTIONS, payload).then(res => res);;

export const update = ({ id, formData }: { id: number | string; formData: FormData }) =>
    apiClient.patch(`${URLS.TRANSACTIONS}${id}/`, formData).then(res => res);;
