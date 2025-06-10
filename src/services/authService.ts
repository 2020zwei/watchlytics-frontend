import { URLS } from '@/utils/constants';
import apiClient from './apiClient';

export const signup = (payload: any) =>
    apiClient.post(URLS.REGISTER, payload);

export const signin = (payload: any) =>
    apiClient.post(URLS.LOGIN, payload);

export const forgotpassword = (payload: any) =>
    apiClient.post(URLS.FORGOT_PASSWORD, payload);

export const passwordReset = (payload: any, id:string) =>
    apiClient.post(`${URLS.RESET_PASSWORD}${id}`, payload);
