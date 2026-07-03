import fetch from "node-fetch";

const BASE_URL = "https://api.themoviedb.org/3";

export async function submitTMDBRating( movieId, rating ) {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/rating?api_key=${process.env.TMDB_API_KEY}&guest_session_id=${process.env.TMDB_GUEST_SESSION}`,
        {
            method: "POST",

            headers: {
                "Content-Type":"application/json;charset=utf-8"
            },

            body: JSON.stringify({
                value: rating
            })
        }
    );

    if(!response.ok){
        throw new Error("TMDB rating failed.");
    }

    return response.json();
}