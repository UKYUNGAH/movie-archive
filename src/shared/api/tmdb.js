import axios from 'axios';

const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        ianguage: 'ko-KR',
    },
});

// 오늘의 트렌딩 전체
export const getPopularAll = () => tmdb.get('/trending/all/day').then((res) => res.data.results);

// 인기 영화
export const getPopularMovie = () => tmdb.get('/movie/popular').then((item) => ({ ...item, media_type: 'movie' }));

// 인기 tv
export const getPopularTv = () => tmdb.get('/tv/popular').then((item) => ({ ...item, media_type: 'tv' }));

// 영화 상세
export const getMovieDetail = (id) => tmdb.get(`/movie/${id}`).then((res) => res.data);

// tv 상세
export const getTvDetail = (id) => tmdb.get(`/tv/${id}`).then((res) => res.data);

// 영화 트레일러
export const getMovieVideos = (id) =>
    tmdb.get(`/movie/${id}/videos`, { params: { language: 'en-US' } }).then((res) => res.data.results);

// tv 트레일러
export const getTvVideos = (id) =>
    tmdb.get(`/tv/${id}/videos`, { params: { language: 'en-US' } }).then((res) => res.data.results);

// 영화 출연진, 제작진
export const getMovieCredits = (id) => tmdb.get(`/movie/${id}/credits`).then((res) => res.data);

// tv 출연진, 제작진
export const getTvCredits = (id) => tmdb.get(`/tv/${id}/credits`).then((res) => res.data);

// 포스터 배경 이미지 url 기본 주소
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
