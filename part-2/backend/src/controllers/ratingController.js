import pool from "../config/db.js";
import { calculateOverallRating } from "../utils/ratingCalculator.js";

export async function saveRating(req, res) {
    try {
        const { userId, movieId, story, acting, direction, visuals, music } = req.body;

        const overall = calculateOverallRating({ story, acting, direction, visuals, music });

        const result = await pool.query(
            `
            INSERT INTO ratings(
                user_id,
                movie_id,
                story,
                acting,
                direction,
                visuals,
                music,
                overall
            )
            VALUES(
                $1,$2,$3,$4,$5,$6,$7,$8
            )
            ON CONFLICT(user_id,movie_id)
            DO UPDATE
            SET
                story = EXCLUDED.story,
                acting = EXCLUDED.acting,
                direction = EXCLUDED.direction,
                visuals = EXCLUDED.visuals,
                music = EXCLUDED.music,
                overall = EXCLUDED.overall,
                updated_at = CURRENT_TIMESTAMP
            RETURNING *;
            `,
            [
                userId,
                movieId,
                story,
                acting,
                direction,
                visuals,
                music,
                overall,
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to save rating."
        });
    }
}

export async function getRating(req, res) {
    try {
        const { userId, movieId } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM ratings
            WHERE user_id=$1
            AND movie_id=$2
            `,
            [
                userId,
                movieId
            ]
        );

        if (result.rows.length === 0) {
            return res.json(null);
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch rating."
        });
    }
}