import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    plans,
    cancelSubscription,
    createSubcription,
    planById,
    subcriptionDetail,
    addCard,
    getCards,
    deleteCard,
    setDefaultCard,
} from '@/services/subscriptionService';

export const usePlans = () => {
    return useQuery({
        queryKey: ['plans'],
        queryFn: () => plans(),
    });
};

export const usePlanById = (id: string) =>
    useQuery({
        queryKey: ['planById', id],
        queryFn: () => planById(id),
    });

export const useSubcriptionDetail = () =>
    useQuery({
        queryKey: ['subscriptionDetail'],
        queryFn: subcriptionDetail,
    });

export const useCancelSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cancelSubscription,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptionDetail'] });
        },
    });
};

export const useCreateSubcription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSubcription,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptionDetail'] });
        },
    });
};

export const useAddCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addCard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cards'] });
        },
    });
};

export const useGetCards = () => {
    return useQuery({
        queryKey: ['getCards'],
        queryFn: () => getCards()
    });
};

export const useDeleteCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCards'] });
        },
    });
};

export const useDefaultCardCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: setDefaultCard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCards'] });
        },
    });
};