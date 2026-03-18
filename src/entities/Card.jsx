import { IMG_BASE_URL } from '@/shared/api/tmdb';
import { Link } from 'react-router-dom';

export default function Card({ item, index }) {
    return (
        <Link to={`/${item.media_type === 'tv' ? 'tv' : 'movie'}/${item.id}`} className="relative block group">
            {index && (
                <span className="absolute -left-3 sm:-left-5 md:-left-6 -top-4 sm:-top-6 md:-top-8 text-4xl sm:text-6xl md:text-7xl font-bold text-white/80 z-20 leading-none">
                    {index}
                </span>
            )}

            {/* 포스터 영역 */}
            <div className="relative aspect-2/3 rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 bg-gray-900">
                <img
                    src={`${IMG_BASE_URL}${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* 호버-평점 오버레이 */}
                <div className=" absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-2">
                    {item.vote_average > 0 ? (
                        <>
                            <div className="text-sm sm:text-base">
                                <span className="text-yellow-400 mr-1">★</span>
                                {item.vote_average.toFixed(1)}
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="text-yellow-400 text-sm sm:text-base">개봉 예정</span>
                        </>
                    )}
                </div>
            </div>
            <p className="font-semibold text-sm sm:text-base md:text-lg group-hover:text-yellow-400 transition-colors line-clamp-1">
                {item.title || item.name}
            </p>

            <p className="text-xs sm:text-sm text-gray-400">{item.release_date || item.first_air_date}</p>
        </Link>
    );
}
