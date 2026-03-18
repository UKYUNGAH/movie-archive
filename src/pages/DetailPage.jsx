import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useMovieDetail } from '@/entities/movie/api/useMovieDetail';
import { useTvDetail } from '@/entities/movie/api/useTvDetail';
import { IMG_BASE_URL } from '@/shared/api/tmdb';
import { ArrowLeft, Calendar, Clock, X } from 'lucide-react';
import { formatDate } from '@/shared/utils/formatDate';
import { useState } from 'react';
import Loading from '@/shared/ui/Loading';

export default function DetailPage({ type }) {
    const [showTrailer, setShowTrailer] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const movieDetail = useMovieDetail(type === 'movie' ? id : null);
    const tvDetail = useTvDetail(type === 'tv' ? id : null);
    const { detail, trailer, director, screenplay, isPending, isError } = type === 'movie' ? movieDetail : tvDetail;

    if (isPending) return <Loading />;
    if (isError) return <p>에러임</p>;
    if (!detail) return null;

    console.log('detail:', detail);

    return (
        <div className="relative min-h-screen text-white bg-black">
            {/* 히어로 섹션 */}
            <div className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})` }}
                >
                    <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-black" />
                </div>

                {/* 뒤로가기 버튼 */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 sm:top-8 sm:left-8 backdrop-blur-md bg-white/10 border boder-white/20 p-2 sm:p-3 rounded-full hover:bg-white/20 transition-colors z-20 cursor-pointer"
                >
                    <ArrowLeft className="size-5 sm:size-6" />
                </button>

                {/* 포스터, 제목, 별점, 장르 */}
                {/* 포스터 + 제목 /별점 /장르 */}
                <div className="relative h-full flex items-end">
                    <div className="w-full px-4 sm:px-8 md:px-16 pb-8 md:pb-12 flex flex-row gap-4 sm:gap-6 md:gap-8 items-end">
                        <div className="shrink-0">
                            <div className="w-24 sm:w-40 md:w-48 lg:w-64 aspect-2/3 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white/10">
                                <img
                                    src={`${IMG_BASE_URL}${detail.poster_path}`}
                                    alt={detail.title || detail.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-1 pb-1 md:pb-4 min-w-0">
                            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4 md:mb-6 tracking-tight leading-tight truncate sm:whitespace-normal">
                                {detail.title || detail.name}
                            </h1>
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4 md:mb-6">
                                <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`${
                                                star <= Math.round(detail.vote_average / 2)
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-600'
                                            } text-base sm:text-xl md:text-2xl`}
                                        >
                                            ★{' '}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-yellow-400 font-bold text-sm sm:text-lg md:text-xl">
                                    {(detail.vote_average / 2).toFixed(1)}
                                </span>
                                <span className="text-gray-400 text-xs sm:text-sm md:text-base">/ 5.0</span>
                            </div>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {detail.genres.map((genre, i) => (
                                    <span
                                        key={i}
                                        className={`backdrop-blur-md bg-white/10 border border-white/30 px-2 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base font-medium ${i >= 2 ? 'hidden sm:inline-block' : ''}`}
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 상세 정보 */}
            <div className="px-4 sm:px-8 md:px-16 py-8 md:py-16">
                <div className="max-w-4xl mb-8 md:mb-12">
                    <div className="flex flex-wrap gap-4 sm:gap-8 text-gray-300">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Calendar className="size-4 sm:size-5 text-yellow-400 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">
                                    {type === 'movie' ? '개봉일 ' : '첫 방영일 '}
                                </p>
                                <strong className="text-sm sm:text-lg font-medium">
                                    {formatDate(detail.release_date || detail.first_air_date)}
                                </strong>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Clock className="size-4 sm:size-5 text-yellow-400 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">
                                    {type === 'movie' ? '상영시간 ' : '방영정보 '}
                                </p>
                                <strong className="text-sm sm:text-lg font-medium">
                                    {type === 'movie'
                                        ? `${detail.runtime}분`
                                        : `시즌 ${detail.number_of_seasons} · ${detail.number_of_episodes}화 `}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>

                {detail.overview && (
                    <div className="mb-8 md:mb-12">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-6">줄거리</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                            {detail.overview}
                        </p>
                    </div>
                )}

                {(director || screenplay) && (
                    <div className="mb-8 md:mb-12">
                        <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">제작진</h2>
                        <div className="flex flex-wrap gap-4 sm:gap-8">
                            {director && (
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <img
                                        src={
                                            director.profile_path
                                                ? `${IMG_BASE_URL}${director.profile_path}`
                                                : 'https://placehold.co/60x60/333/fff?text=?'
                                        }
                                        alt={director.name}
                                        className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">감독</p>
                                        <p className="text-sm sm:text-base font-medium">{director.name}</p>
                                    </div>
                                </div>
                            )}

                            {screenplay && (
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <img
                                        src={
                                            screenplay.profile_path
                                                ? `${IMG_BASE_URL}${screenplay.profile_path}`
                                                : 'https://placehold.co/60x60/333/fff?text=?'
                                        }
                                        alt={screenplay.name}
                                        className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">각본</p>
                                        <p className="text-sm sm:text-base font-medium">{screenplay.name}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 트레일러 버튼 */}
                {trailer && (
                    <button
                        onClick={() => setShowTrailer(true)}
                        className="w-full sm:w-auto bg-yellow-400 text-black px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-yellow-300 transition-colors"
                    >
                        ▶ Watch Trailer
                    </button>
                )}

                {/* 트레일러 팝업 */}
                {showTrailer && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowTrailer(false)}
                    >
                        <div className="w-full max-w-4xl aspect-video relative" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setShowTrailer(false)}
                                className="absolute -top-10 sm:-top-12 right-0 bg-white/20 backdrop-blur-md rounded-full p-2 hover:bg-white/40 transition-colors"
                            >
                                <X className="size-5 sm:size-6" />
                            </button>
                            <iframe
                                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                                className="w-full h-full rounded-xl"
                                allowFullScreen
                                allow="autoplay"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
