import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "CineScope Backend Running"
    });
});

const PORT = process.env.PORT || 8000;

async function connectDatabase() {
    try {
        await pool.query("SELECT NOW()");
        console.log("Connected to PostgreSQL");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

connectDatabase();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});