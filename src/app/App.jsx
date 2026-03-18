import { Route, Routes } from 'react-router-dom';
import DetailPage from '@/pages/DetailPage';
import HomePage from '@/pages/HomePage';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<DetailPage type="movie" />} />
            <Route path="/tv/:id" element={<DetailPage type="tv" />} />
        </Routes>
    );
}
