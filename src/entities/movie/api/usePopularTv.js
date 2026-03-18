import { useQuery } from '@tanstack/react-query';
import { getPopularTv } from '@/shared/api/tmdb';

export const usePopularTv = () => {
    const query = useQuery({
        queryKey: ['popularTv'],
        queryFn: getPopularTv,
    });

    return {
        tvShows: query.data,
        isPending: query.isPending,
        isError: query.isError,
    };
};
