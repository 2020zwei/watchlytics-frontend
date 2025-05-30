import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

let hasShownTimeoutToast = false; 

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;

        if (error.code === 'ECONNABORTED' && !hasShownTimeoutToast) {
            hasShownTimeoutToast = true;
            toast.error("Request timed out! Try again");
            console.error('⏱️ Request timed out');
        }
        if (error.code === "ERR_NETWORK" && !hasShownTimeoutToast) {
            hasShownTimeoutToast = true;
            toast.error("Network Error");
            console.error("Network Error");
        }

        if (status === 401 || status === 403) {
            Cookies.remove('access_token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default apiClient;
