import { useTrendingMovie } from "../hooks/useTrendingMovie";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { useMovies } from "../hooks/useMovies";

import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieCard from "../components/MovieCard/MovieCard";

import styles from "./HomePage.module.css";

 function HomePage() {  
    
    const { featuredMovie } = useTrendingMovie();
    const { movies, loading, error } = useMovies();
    const { query, inputValue, setInputValue, clearSearch } = useSearchQuery();
    const { movies: searchedMovies, loading: searchLoading, error: searchError } = useMovieSearch(query);
    const displayedMovies = 
        query 
            ? searchedMovies 
            : movies;
    const isLoading = searchLoading || loading;
    const pageError = error || searchError;
    
    return (
        <>
            <Navbar />
            <HeroBanner movie = {featuredMovie} />

            <div className={styles.page}>
                <SearchBar
                    value={inputValue}
                    onChange={setInputValue}
                    onClear={clearSearch}
                    loading={searchLoading}
                />
                <h1 className={styles.pageTitle}>
                    {query 
                        ? `Search Results for "${query}"` 
                        : "Popular Movies"
                    }
                </h1>

                {isLoading && <p>Loading movies...</p>}
                {pageError && <p className={styles.error}>{pageError}</p>}

                {!isLoading && !pageError && 
                    <div className={styles.moviesGrid}>
                        {displayedMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                }
            </div>
        </>
    );
}

export default HomePage;