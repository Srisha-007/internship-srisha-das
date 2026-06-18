import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard/MovieCard";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import styles from "./HomePage.module.css";

 function HomePage() {
    const { movies, loading, error } = useMovies();

    return (
        <>
            <HeroBanner />
            <div className={styles.page}>
                <h1 className={styles.pageTitle}>
                    Popular Movies
                </h1>

                {loading && <p>Loading movies...</p>}
                {error && <p className={styles.error}>{error}</p>}

                {!loading && !error && 
                    <div className={styles.moviesGrid}>
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                }
            </div>
        </>
    );
}

export default HomePage;