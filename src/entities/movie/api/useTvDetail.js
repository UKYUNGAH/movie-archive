import { useQuery } from '@tanstack/react-query';
import { getTvDetail, getTvVideos, getTvCredits } from '@/shared/api/tmdb';

export const useTvDetail = (id) => {
    const detailQuery = useQuery({
        queryKey: ['tvDetail', id],
        queryFn: () => getTvDetail(id),
        enabled: !!id,
    });
    const videoQuery = useQuery({
        queryKey: ['tvVideos', id],
        queryFn: () => getTvVideos(id),
        enabled: !!id,
    });
    const creditsQuery = useQuery({
        queryKey: ['tvCredits', id],
        queryFn: () => getTvCredits(id),
        enabled: !!id,
    });
    const trailer = Array.isArray(videoQuery.data)
        ? videoQuery.data.find((v) => v.site === 'YouTube' && v.type === 'Trailer')
        : null;

    // TV는 감독 대신 '제작자 (created_by)' 필드 사용
    const director = detailQuery.data?.created_by?.[0];
    const screenplay = creditsQuery.data?.crew?.find((c) => c.job === 'Screenplay');

    // TV는 출연진도 반환 (영화 훅에는 없음 )
    const cast = creditsQuery.data?.cast?.slice(0, 10);
    return {
        detail: detailQuery.data,
        trailer,
        director,
        cast,
        screenplay,
        isPending: detailQuery.isPending || videoQuery.isPending || creditsQuery.isPending,
        isError: detailQuery.isError || videoQuery.isError || creditsQuery.isError,
    };
};
