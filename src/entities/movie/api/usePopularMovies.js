import { useQuery } from '@tanstack/react-query';
import { getPopularMovies } from '@/shared/api/tmdb';

export const usePopularMovies = () => {
    const query = useQuery({
        queryKey: ['popularMovies'],
        queryFn: getPopularMovies,
    });

    return {
        movies: query.data,
        isPending: query.isPending,
        isError: query.isError,
    };
};
