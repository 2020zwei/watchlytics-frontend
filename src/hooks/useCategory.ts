import { categories } from '@/services/categoryService';
import { useQuery } from '@tanstack/react-query';
export const useCategores = (query: string) => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categories(),
    });
};
