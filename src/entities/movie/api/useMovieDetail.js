import { useQuery } from '@tanstack/react-query';
import { getMovieDetail, getMovieVideos, getMovieCredits } from '@/shared/api/tmdb';

export const useMovieDetail = (id) => {
    const detailQuery = useQuery({
        queryKey: ['movieDetail', id],
        queryFn: () => getMovieDetail(id),
        enabled: !!id,
    });

    const videoQuery = useQuery({
        queryKey: ['movieVideos', id],
        queryFn: () => getMovieVideos(id),
        enabled: !!id,
    });

    const creditsQuery = useQuery({
        queryKey: ['getMovieCredits', id],
        queryFn: () => getMovieCredits(id),
        enabled: !!id,
    });

    const trailer = Array.isArray(videoQuery.data)
        ? videoQuery.data.find((v) => v.site === 'YouTube' && v.type === 'Trailer')
        : null;

    // crew 배열에서 감독 , 각본 찾기
    const director = creditsQuery.data?.crew?.find((c) => c.job === 'Director');
    const screenplay = creditsQuery.data?.crew?.find((c) => c.job === 'Screenplay');

    return {
        detail: detailQuery.data,
        trailer,
        director,
        screenplay,
        // 3개 중 하나라도 로딩 중이면 isPending = true
        isPending: detailQuery.isPending || videoQuery.isPending || creditsQuery.isPending,
        isError: detailQuery.isError || videoQuery.isError || creditsQuery.isError,
    };
};
