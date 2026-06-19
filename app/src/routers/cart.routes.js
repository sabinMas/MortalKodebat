import { Router } from "express";
import { getCartPage, getCart, addToCart, removeFromCart, clearCart } from "../controllers/cart.controller.js";
import { requireAuth } from "../utility/auth.middleware.js";

const router = Router();

router.get('/cart', requireAuth, getCartPage);

router.get('/api/cart', requireAuth, getCart);
router.post('/api/cart/items', requireAuth, addToCart);
router.delete('/api/cart/items/:productId', requireAuth, removeFromCart);
router.post('/api/cart/clear', requireAuth, clearCart);

export default router;
