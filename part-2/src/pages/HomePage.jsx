import { useEffect } from "react";

import { useTrendingMovie } from "../hooks/useTrendingMovie";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { useMovies } from "../hooks/useMovies";

import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieCard from "../components/MovieCard/MovieCard";

import styles from "./HomePage.module.css";

 function HomePage() {  
    
    const { featuredMovie } = useTrendingMovie();
    const { movies, loading, error } = useMovies();
    const { query, inputValue, setInputValue, setSearchParams } = useSearchQuery();

    return (
        <>
            <Navbar />
            <HeroBanner movie = {featuredMovie} />
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