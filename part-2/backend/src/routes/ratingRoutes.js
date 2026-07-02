import express from "express";
import { saveRating, getRating } from "../controllers/ratingController.js";

const router = express.Router();

router.post("/", saveRating);

router.get("/:userId/:movieId", getRating);

export default router;