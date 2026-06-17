import { Router } from "express";
import { getFavoritesPage, getFavorites, addFavorite, removeFavorite, clearFavorites } from "../controllers/favorites.controller.js";
import { requireAuth } from "../utility/auth.middleware.js";

const router = Router();


router.get('/favorites', requireAuth, getFavoritesPage);

router.get('/api/favorites', requireAuth, getFavorites);
router.post('/api/favorites/items', requireAuth, addFavorite);
router.delete('/api/favorites/items/:productId', requireAuth, removeFavorite
);
router.post('/api/favorites/clear', requireAuth, clearFavorites);

export default router;