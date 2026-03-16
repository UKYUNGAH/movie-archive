import Loading from '@/shared/ui/Loading';
import { getPopularAll } from '@/shared/api/tmdb';
import { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getPopularAll().then((result) => {
            console.log('api:', result);
            setData(result);
        });
    }, []);

    if (!data) return <Loading />;
    return (
        <div>
            <div>{data.length}개</div>
            <div>{data[0].title || data[0].name}</div>
        </div>
    );
}

export default App;
