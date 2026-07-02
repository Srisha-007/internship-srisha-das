import express from "express";
import { getFavorites, addFavorite, deleteFavorite } from "../controllers/favoriteController.js";

const router = express.Router();

router.get("/:userId", getFavorites);
router.post("/", addFavorite);
router.delete("/:userId/:movieId", deleteFavorite);

export default router;