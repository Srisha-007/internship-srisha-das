import { useState } from "react";

import { useTrendingMovie } from "../hooks/useTrendingMovie";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { useGenres } from "../hooks/useGenres";
import { useGenreMovies } from "../hooks/useGenreMovies";
import { useMovies } from "../hooks/useMovies";
import { getSectionTitle } from "../utils/formatters";

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
    const [selectedGenres, setSelectedGenres] = useState([]);
    const { genres, loading: genresLoading } = useGenres();
    const { movies: genreMovies, loading: genreLoading, error: genreError } = useGenreMovies(selectedGenres);

    const displayedMovies = 
        query 
            ? searchedMovies 
            : selectedGenres.length > 0
                ? genreMovies
                : movies;
    const isLoading = searchLoading || genreLoading || loading;
    const pageError = error || searchError || genreError;
    const searchStatus = 
        query && !searchLoading
            ? `${searchedMovies.length} results found`
            : "";
    const noResults = 
        !isLoading && displayedMovies.length === 0;

    function handleSearchChange(value) {
        setSelectedGenres([]);
        setInputValue(value);
    }
    function handleGenreToggle(genreId) {
        clearSearch();

        if (genreId ===null) {
            setSelectedGenres([]);
            return;
        }
        setSelectedGenres((prev) => {
            if (prev.includes(genreId)) {
                return prev.filter(id => id !== genreId);
            }
            return [...prev, genreId];
        });
    }

    return (
        <>
            <Navbar />
            <HeroBanner movie = {featuredMovie} />

            <div className={styles.page}>
                <SearchBar
                    value={inputValue}
                    onChange={handleSearchChange}
                    onClear={() => {
                        clearSearch();
                        setSelectedGenres([]);
                    }}
                    loading={searchLoading}
                />
                {!genresLoading && (
                    <GenreFilter
                        genres={genres} 
                        selectedGenres={selectedGenres} 
                        onGenreToggle={handleGenreToggle}
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
                    {getSectionTitle(query, selectedGenres, genres)}
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