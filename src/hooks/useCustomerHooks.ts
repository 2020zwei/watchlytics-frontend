import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    customers,
    customer,
    create,
    remove,
    update,
    reportStats
} from '@/services/customerService';

// Fetch all customers with query params
export const useCustomers = (query: string) => {
    return useQuery({
        queryKey: ['customers', query],
        queryFn: () => customers(query),
        enabled: !!query,
        placeholderData: (prev) => prev,
    });
};

// Fetch single customer by ID
export const useCustomer = (id: number) => {
    return useQuery({
        queryKey: ['customer', id],
        queryFn: () => customer(id),
        enabled: !!id,
    });
};

// Fetch customer report stats
export const useCustomerReportStats = () => {
    return useQuery({
        queryKey: ['customer-report-stats'],
        queryFn: reportStats,
    });
};

// Create a new customer
export const useCreateCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
    });
};

// Update customer
export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: any }) => update(payload, id),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            queryClient.invalidateQueries({ queryKey: ['customer', variables.id] });
        },
    });
};


// Delete customer
export const useRemoveCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
    });
};
