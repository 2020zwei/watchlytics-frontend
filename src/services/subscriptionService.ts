import { URLS } from '@/utils/constants';
import apiClient from './apiClient';

export const plans = () => {
    return apiClient.get(URLS.PLANS).then(res => res);
};

export const planById = (id: string) => {
    return apiClient.get(`${URLS.PLANS}${id}/`).then(res => res);
};

export const subcriptionDetail = () => {
    return apiClient.get(URLS.SUBSCRIPTION_DETAILS).then(res => res);
};

export const createSubcription = (payload?: Record<string, any>) => {
    return apiClient.post(URLS.SUBSCRBE, payload).then(res => res);
};

export const cancelSubscription = (payload?: Record<string, any>) => {
    return apiClient.post(URLS.SUBSCRBE, payload).then(res => res);
};
