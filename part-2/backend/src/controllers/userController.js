import pool from "../config/db.js";

export async function createUser(req, res) {
    const { name, email } = req.body;

    try {
        const result = await pool.query(
            `
            INSERT INTO users(name, email)
            VALUES ($1, $2)
            RETURNING *;
            `,
            [name, email]
        );

        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create user"
        });
    }
}

export async function getUser(req, res) {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `
            SELECT *
            FROM users
            WHERE id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch user"
        });
    }
}