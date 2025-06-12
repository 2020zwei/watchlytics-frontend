import { URLS } from '@/utils/constants';
import apiClient from './apiClient';

export const categories = () => {
    return apiClient.get(URLS.CATEGORES).then(res => res);
};

export const products = (query: string) => {
    return apiClient.get(`${URLS.PRODUCTS}${query}`).then(res => res);
};

export const productDetail = (id: number |string) => {
    return apiClient.get(`${URLS.PRODUT_DETAIL}${id}/`).then(res => res);
};

export const createProduct = (formData: FormData) => {
    return apiClient.post(URLS.ADD_PRODUCT, formData).then(res => res);
};

export const updateProduct = ({ id, formData }: { id: number | string; formData: FormData }) => {
    return apiClient.patch(`${URLS.UPDATE_PRODUCT}${id}/`, formData).then(res => res);
};


export const deleteProduct = (id: number | string) => {
    return apiClient.delete(`${URLS.DELETE_PRODUCT}/${id}/`).then(res => res);
};

export const stats = () => {
    return apiClient.get(URLS.STATS).then(res => res);
};

export const uploadProducts = (payload: Record<string, any>) => {
    return apiClient.post(URLS.UPLOAD_PORODUCTS, payload).then(res => res);
};
export const markAsSold = (payload: Record<string, any>) => {
    return apiClient.post(URLS.MARKAS_SOLD, payload).then(res => res);
};
export const bulkOperatoions = (payload: Record<string, any>) => {
    return apiClient.post(URLS.BULK_OPERATION, payload).then(res => res);
};
