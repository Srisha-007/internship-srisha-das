import pool from "../config/db.js";

export async function getFavorites(req, res) {
    try {
        const { userId } = req.params;

        const result = await pool.query(
            `
            SELECT movie_id
            FROM favorites
            WHERE user_id = $1
            ORDER BY created_at DESC
            `,
            [userId]
        );

        res.json(
            result.rows.map(row => row.movie_id)
        );

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch favorites."
        });
    }
}

export async function addFavorite(req, res) {
    try {
        const { userId, movieId } = req.body;

        await pool.query(
            `
            INSERT INTO favorites(user_id,movie_id)
            VALUES($1,$2)
            ON CONFLICT(user_id,movie_id)
            DO NOTHING
            `,
            [userId, movieId]
        );

        res.status(201).json({
            message: "Favorite added."
        });
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to add favorite."
        });
    }
}

export async function deleteFavorite(req, res) {
    try {
        const { userId, movieId } = req.params;

        await pool.query(
            `
            DELETE FROM favorites
            WHERE user_id=$1
            AND movie_id=$2
            `,
            [userId, movieId]
        );

        res.json({
            message: "Favorite removed."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to remove favorite."
        });
    }

}