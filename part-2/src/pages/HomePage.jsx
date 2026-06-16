import {useEffect, useState} from "react";
import { getPopularMovies } from "../services/tmdb";

function HomePage() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        async function fetchMovies() {
            try {
                const data = await getPopularMovies();
                setMovies(data.results);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            {movies.length >0 && (
                <pre>
                    {JSON.stringify(movies[0], null, 2)}
                </pre>
            )}
        </div>
    );
}

export default HomePage;