import { me, updateProfile } from '@/services/profileService';
import { useMutation, useQuery } from '@tanstack/react-query';


export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: (formData: FormData) => updateProfile(formData),
    });
};

export const useMe = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: () => me(),
    });
};
