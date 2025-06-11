import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    categories,
    products,
    productDetail,
    createProduct,
    updateProduct,
    deleteProduct,
    stats,
    uploadProducts,
    markAsSold,
    bulkOperatoions,
} from '@/services/inventoryService';

// Get Categories
export const useCategories = () =>
    useQuery({
        queryKey: ['categories'],
        queryFn: categories,
    });

// Get Products with Query
export const useProducts = (query: string) =>
    useQuery({
        queryKey: ['products', query],
        queryFn: () => products(query),
        enabled: !!query,
    });

// Get Product Detail
export const useProductDetail = (id: number | string) =>
    useQuery({
        queryKey: ['productDetail', id],
        queryFn: () => productDetail(id),
        enabled: !!id,
    });


// Create Product
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
        },
    });
};

// Update Product
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, formData }: { id: number | string; formData: FormData }) =>
            updateProduct({ id, formData }),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};


// Delete Product
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number | string) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

// Get Stats
export const useStats = () =>
    useQuery({
        queryKey: ['stats'],
        queryFn: stats,
    });

// Upload Products
export const useUploadProducts = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadProducts,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};
export const useMarkAsSold = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: markAsSold,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};
export const useBulkOperation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: bulkOperatoions,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};
