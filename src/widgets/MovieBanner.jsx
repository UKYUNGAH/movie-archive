import { Link } from 'react-router-dom';
import { formatDate } from '@/shared/utils/formatDate';

export default function MovieBanner({ item, fade }) {
    return (
        <div
            className={`h-[55vh] sm:h-[65vh] md:h-[80vh] relative flex items-end py-10 sm:py-16 md:py-30 transition-opacity duration-500 ${
                fade ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 20%',
                }}
            >
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
            </div>

            <div className="relative z-10 px-4 sm:px-8 md:px-10 max-w-3xl">
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                    {item.title || item.name}
                </h3>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    {item.vote_average > 0 ? (
                        <>
                            <div className="flex text-base sm:text-xl">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={
                                            star <= Math.round(item.vote_average / 2)
                                                ? 'text-yellow-400'
                                                : 'text-gray-600'
                                        }
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="text-yellow-400 font-bold text-sm sm:text-base">
                                {(item.vote_average / 2).toFixed(1)}
                            </span>
                            <span className="text-white">•</span>
                        </>
                    ) : (
                        <>
                            <span className="text-sm sm:text-base">개봉 예정</span>
                            <span className="text-white">•</span>
                        </>
                    )}
                    <span className="text-sm sm:text-base">{formatDate(item.release_date || item.first_air_date)}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-300 text-sm sm:text-base">{item.media_type.toUpperCase()}</span>
                </div>

                <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-10 md:mb-14 leading-relaxed line-clamp-2 sm:line-clamp-3 break-keep">
                    {item.overview}
                </p>

                <Link
                    to={`/${item.media_type === 'tv' ? 'tv' : 'movie'}/${item.id}`}
                    className="inline-block backdrop-blur-md bg-white/5 border border-white/20 px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors text-white text-sm sm:text-base"
                >
                    더 알아보기
                </Link>
            </div>
        </div>
    );
}
