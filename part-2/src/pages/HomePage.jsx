import {useEffect} from "react";
import { getPopularMovies } from "../services/tmdb";

function HomePage() {
    useEffect(() => {
        async function fetchMovies() {
            try {
                const data = await getPopularMovies();
                console.log(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchMovies();
    }, []);

    return <h1>Home Page</h1>;
}

export default HomePage;