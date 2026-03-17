import Loading from '@/shared/ui/Loading';
import { usePopularAll } from '@/entities/movie/api/usePopularAll';
import Card from '../entities/Card';
import { useMovieDetail } from '@/entities/movie/api/useMovieDetail';
import MovieBanner from '@/widgets/MovieBanner';

function App() {
    const { all, isPending } = usePopularAll();
    const { detail, trailer, director } = useMovieDetail('157336');
    console.log('detail:', detail);
    console.log('trailer:', trailer);
    console.log('director:', director);

    if (isPending) return <Loading />;

    return (
        <div>
            <MovieBanner item={all?.[0]} fade={true} />
            {all.map((item) => (
                <Card key={item.id} item={item}></Card>
            ))}
        </div>
    );
}

export default App;
