import { URLS } from '@/utils/constants';
import apiClient from './apiClient';


export const categories = () =>
    apiClient.get(`${URLS.PRODUCTS}/`).then(res => res);

