import { useState } from "react";

import { useTrendingMovie } from "../hooks/useTrendingMovie";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { useGenres } from "../hooks/useGenres";
import { useGenreMovies } from "../hooks/useGenreMovies";
import { useMovies } from "../hooks/useMovies";
import { getSectionTitle } from "../utils/getSectionTitle";

import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import SearchBar from "../components/SearchBar/SearchBar";
import GenreFilter from "../components/GenreFilter/GenreFilter";
import MovieCard from "../components/MovieCard/MovieCard";

import styles from "./HomePage.module.css";

function HomePage() {      
    const { featuredMovie } = useTrendingMovie();
    const { movies, loading, error } = useMovies();
    const { query, inputValue, setInputValue, clearSearch } = useSearchQuery();
    const { movies: searchedMovies, loading: searchLoading, error: searchError } = useMovieSearch(query);
    const [activeGenre, setActiveGenre] = useState(null);
    const { genres, loading: genresLoading } = useGenres();
    const { movies: genreMovies, loading: genreLoading, error: genreError } = useGenreMovies(activeGenre);

    const displayedMovies = 
        query 
            ? searchedMovies 
            : activeGenre
                ? genreMovies
                : movies;
    const isLoading = searchLoading || genreLoading || loading;
    const pageError = error || searchError || genreError;
    const searchStatus = 
        query && !searchLoading
            ? `${searchedMovies.length} results found`
            : "";
    const noResults = 
        query && !searchLoading && searchedMovies.length === 0;

    function handleSearchChange(value) {
        setActiveGenre(null);
        setInputValue(value);
    }

    return (
        <>
            <Navbar />
            <HeroBanner movie = {featuredMovie} />

            <div className={styles.page}>
                <SearchBar
                    value={inputValue}
                    onChange={handleSearchChange}
                    onClear={clearSearch}
                    loading={searchLoading}
                />
                {!genresLoading && (
                    <GenreFilter
                        genres={genres} 
                        activeGenre={activeGenre} 
                        onGenreSelect={(genreId) => {
                            clearSearch();
                            setActiveGenre(genreId);
                        }}
                    />
                )}
                {query && searchLoading && (
                    <p className={styles.searchStatus}>
                        Searching for "{query}"...
                    </p>
                )}
                {searchStatus && (
                    <p className={styles.searchStatus}>
                        {searchStatus}
                    </p>
                )}
                
                <h1 className={styles.pageTitle}>
                    {getSectionTitle(query, activeGenre, genres)}
                </h1>

                {noResults && (
                    <p className={styles.searchStatus}>
                        No movies found.
                    </p>
                )}

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