import { URLS } from '@/utils/constants';
import apiClient from './apiClient';

export const updateProfile = (formData: FormData) =>
    apiClient.put(URLS.UPDATE_PROFILE, formData).then((res) => res);


export const me = () =>
    apiClient.get(URLS.ME, { timeout: 5000, withCredentials: true }).then(res => res.data);

