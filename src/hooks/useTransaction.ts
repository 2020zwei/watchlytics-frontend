import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { add, transactionById, transactions, update } from '@/services/transactionService';

export const useTransactions = (query: string) =>
    useQuery({
        queryKey: ['transactions'],
        queryFn: () => transactions(query),
        enabled: !!query,
    });
export const useTransactionById = (id: number | string) =>
    useQuery({
        queryKey: ['transactions'],
        queryFn: () => transactionById(id),
        enabled: !!id,
    });

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: add,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });
};
export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, formData }: { id: number | string; formData: FormData }) =>
            update({ id, formData }),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });
};

