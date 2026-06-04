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
    try {
        let products = await fetchAllProducts();
        const hasFilters = 
        req.query.category ||
        req.query.environment ||
        req.query.sort ||
        req.query.search;

        
        

        if (hasFilters) {
            products = await fetchFilteredProducts(req.query);

        } else {
            products = await fetchAllProducts();
        }

        res.render("products", {
            title: "products page", products
        });

    } catch (err) {
        console.error("error loading products page:", err);
        res.status(500).send("Server Error");
    }
    // try{
    //     const products = await fetchAllProducts();
    //     res.render("products", {
    //         products,
    //         title: "Products Page"
    //     });
    // } catch (err) {
    //     console.error("Error loading products page:", err);
    //     res.status(500).send("Server Error");
    // }
}

export async function getProductDetailPage(req, res) {
    try {
        const { id } = req.params;
        const product = await fetchProductById(id);

        if (!product) {
            return res.status(404).render("404", {title: "Extension Not found"});
        }

        res.render("product-detail", {
            product,
            title: product.name
        });
    } catch (err) {
        console.error("Error loading product details page:", err);
        res.status(500).send("Server Error");
    }
}

export async function getFilteredProducts(req, res) {
    try {
        const filteredProducts = await fetchFilteredProducts(req.query);
        res.status(200).json(filteredProducts);
    } catch (err) {
        console.error("Error filtering the prodcts:", err);
        res.status(500).json({error: " Failed to retrieve filtered records"})
    }
}