const BASE_URL = "http://localhost:8000";

export async function getFavorites(userId) {
    const response = await fetch(
        `${BASE_URL}/favorites/${userId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch favorites");
    }

    return response.json();
}

export async function addFavorite(userId, movieId) {
    const response = await fetch(
        `${BASE_URL}/favorites`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                userId,
                movieId
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to add favorite");
    }

    return response.json();
}

export async function removeFavorite(userId, movieId) {
    const response = await fetch(
        `${BASE_URL}/favorites/${userId}/${movieId}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to remove favorite");
    }

    return response.json();
}

export async function saveRating(data) {
    const response = await fetch(
        `${BASE_URL}/ratings`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)
        }
    );

    if(!response.ok){
        throw new Error("Failed to save rating");
    }

    return response.json();
}

export async function getRating(userId, movieId) {
    const response = await fetch(
        `${BASE_URL}/ratings/${userId}/${movieId}`
    );

    if(!response.ok){
        throw new Error("Failed to fetch rating");
    }

    return response.json();
}