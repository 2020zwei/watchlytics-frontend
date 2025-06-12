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
export const addCard = (payload?: Record<string, any>) => {
    return apiClient.post(URLS.CARDS, payload).then(res => res);
};
export const getCards = () => {
    return apiClient.get(URLS.CARDS).then(res => res);
};
export const deleteCard = (id: number) => {
    return apiClient.delete(`${URLS.CARDS}${id}/`).then(res => res);
};
export const setDefaultCard = (id: number) => {
    return apiClient.post(`${URLS.CARDS}${id}/set_default/`).then(res => res);
};

export const cancelSubscription = (payload?: Record<string, any>) => {
    return apiClient.post(URLS.SUBSCRBE, payload).then(res => res);
};
