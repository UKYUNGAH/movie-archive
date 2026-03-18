import { usePopularAll } from '@/entities/movie/api/usePopularAll';
import Card from '@/entities/Card';
import MovieBanner from '@/widgets/MovieBanner';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { usePopularMovies } from '@/entities/movie/api/usePopularMovies';
import { usePopularTv } from '@/entities/movie/api/usePopularTv';
import { useEffect, useRef, useState } from 'react';
import Loading from '@/shared/ui/Loading';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function SwiperSection({ title, items, showIndex = false }) {
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const handleSlideChange = (swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    return (
        <section className="mt-8 md:mt-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-10 md:mb-14 px-4 sm:px-8 md:px-10">
                {title}
            </h2>

            <div className="relative group/section">
                <div
                    className={`absolute left-0 top-0 h-[75%] w-16 sm:w-20 md:w-24 z-20 bg-linear-to-r from-black to-transparent flex items-center transition-opacity duration-300 ${
                        isBeginning ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/section:opacity-100'
                    }`}
                >
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="ml-1 sm:ml-2 p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                    >
                        <ChevronLeft className="size-4 sm:size-5 md:size-6 text-white" />
                    </button>
                </div>

                <div
                    className={`absolute right-0 top-0 h-[75%] w-16 sm:w-20 md:w-24 z-20 bg-linear-to-l from-black to-transparent flex items-center justify-end transition-opacity duration-300 ${
                        isEnd ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/section:opacity-100'
                    }`}
                >
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="mr-1 sm:mr-2 p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                    >
                        <ChevronRight className="size-4 sm:size-5 md:size-6 text-white" />
                    </button>
                </div>

                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        0: { slidesPerView: 2, spaceBetween: 8 },
                        480: { slidesPerView: 3, spaceBetween: 12 },
                        768: { slidesPerView: 4, spaceBetween: 20 },
                        1024: { slidesPerView: 5, spaceBetween: 40 },
                    }}
                    className="overflow-visible! px-4! sm:px-8! md:px-10! pb-14! sm:pb-16! md:pb-20!"
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={item.id} className="overflow-visible! pl-4 sm:pl-8 md:pl-10">
                            <Card item={item} index={showIndex ? index + 1 : undefined} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default function HomePage() {
    const { all, isPending: isAllPending, isError } = usePopularAll();
    const { movies, isPending: isMoviePending } = usePopularMovies();
    const { tvShows, isPending: isTvPending } = usePopularTv();
    const [bannerIndex, setBannerIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        if (!all) return;
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setBannerIndex(Math.floor(Math.random() * all.length));
                setFade(true);
            }, 500);
        }, 15000);
        return () => clearInterval(interval);
    }, [all]);

    if (isAllPending || isMoviePending || isTvPending) return <Loading />;
    if (isError) return <p>에러임</p>;

    return (
        <div className="overflow-x-hidden">
            <MovieBanner item={all[bannerIndex]} fade={fade} />
            <SwiperSection title="TOP 20" items={all} showIndex />
            <SwiperSection title="인기 영화" items={movies} />
            <SwiperSection title="인기 TV" items={tvShows} />
        </div>
    );
}
