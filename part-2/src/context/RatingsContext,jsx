import { createContext, useContext, useEffect, useState } from "react";

const RatingsContext = createContext();

export function RatingsProvider({ children }) {
    const [ratings, setRatings] = useState(() => {
        const storedRatings = localStorage.getItem("movieRatings");

        return storedRatings
            ? JSON.parse(storedRatings)
            : {};
    });

    useEffect(() => {
        localStorage.setItem(
            "movieRatings",
            JSON.stringify(ratings)
        );
    }, [ratings]);

    function rateMovie(movieId, rating) {
        setRatings((prev) => ({
            ...prev,
            [movieId]: rating
        }));
    }

    function getRating(movieId) {
        return ratings[movieId] || null;
    }

    return (
        <RatingsContext.Provider
            value={{
                ratings,
                rateMovie,
                getRating
            }}
        >
            {children}
        </RatingsContext.Provider>
    );
}

export function useRatings() {
    return useContext(RatingsContext);
}