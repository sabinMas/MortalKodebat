import { fetchAllProducts, fetchFilteredProducts, fetchProductById } from "../services/product.service.js";

export async function getHomePage(req, res) {
    try {

        console.log("route hit");
        const allProducts = await fetchAllProducts();

        console.log("data:", allProducts);
        const featuredExtensions = allProducts.slice(0, 3);

        console.log("feattures:", featuredExtensions);

        res.render("main", {
            title: "Oikodomos",
            featured: featuredExtensions
        });
    } catch (err) {
        console.error("Error rendering home page: ", err);
        res.status(500).send("Server Error");
    }
}

export async function getProductsPage(req, res) {
    try{
        const products = await fetchAllProducts();
        res.render("products", {
            products,
            title: "Products Page"
        });
    } catch (err) {
        console.error("Error loading products page:", error);
        res.status(500).send("Server Error");
    }
}