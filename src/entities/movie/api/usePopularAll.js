import { useQuery } from '@tanstack/react-query';
import { getPopularAll } from '@/shared/api/tmdb';

export const usePopularAll = () => {
    const query = useQuery({
        queryKey: ['popularAll'],
        queryFn: getPopularAll,
    });

    return {
        all: query.data,
        isPending: query.isPending,
        isError: query.isError,
    };
};
