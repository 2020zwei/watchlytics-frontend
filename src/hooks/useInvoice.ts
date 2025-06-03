import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    customers,
    customer,
    create,
    remove,
    update,
} from '@/services/customerService';
import { invoices } from '@/services/invoiceService';

// Fetch all invoices with query params
export const useInvoices = (query?: string | undefined) => {
    return useQuery({
        queryKey: ['invoices', query],
        queryFn: () => invoices(query!),
        enabled: !!query,
        placeholderData: (prev) => prev,
    });
};

// Fetch single invoice by ID
export const useInvoiceById = (id: number) => {
    return useQuery({
        queryKey: ['customer', id],
        queryFn: () => customer(id),
        enabled: !!id,
    });
};

// Create a new invoice
export const useCreateInvoice = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
    });
};

// Update invoice
export const useUpdateInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: any }) => update(payload, id),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            queryClient.invalidateQueries({ queryKey: ['customer', variables.id] });
        },
    });
};


// Delete invoice
export const useDeleteInvoice = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
    });
};
