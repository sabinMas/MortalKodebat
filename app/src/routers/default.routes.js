import { Router } from "express";
import { getHomePage, getProductsPage, getProductDetailPage, getFilteredProducts } from "../controllers/product.controller.js";
import { requireAuth } from "../utility/auth.middleware.js";

const router = Router();

// router.get("/", (req, res) => {
//     res.render("main", {
//         title: "MVC Starter App",
//         subtitle: "Express + EJS + Static Assets"
//     });
// });

// router.get("/api/oikodomos", (req, res) => {
//     res.render("main");
// });

router.get("/", getHomePage);
router.get("/products", requireAuth, getProductsPage);
router.get("/products/:id", requireAuth, getProductDetailPage);
router.get("/api/products", requireAuth, getFilteredProducts);
export default router;