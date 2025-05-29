import { useMutation } from '@tanstack/react-query';
import {
    signup,
    signin,
    forgotpassword,
    passwordReset,
} from '@/services/authService';

export const useSignup = () => {
    return useMutation({
        mutationFn: signup,
    });
};

export const useSignin = () => {
    return useMutation({
        mutationFn: signin,
    });
};

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: forgotpassword,
    });
};

export const usePasswordReset = () => {
    return useMutation({
        mutationFn: ({ payload, id }: { payload: any; id: string }) =>
            passwordReset(payload, id),
    });
};
