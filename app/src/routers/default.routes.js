import { Router } from "express";
import { getHomePage, getProductsPage, getProductDetailPage, getFilteredProducts } from "../controllers/product.controller.js";

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
router.get("/products", getProductsPage);
router.get("/products/:id", getProductDetailPage);
router.get("/api/products", getFilteredProducts);
export default router;