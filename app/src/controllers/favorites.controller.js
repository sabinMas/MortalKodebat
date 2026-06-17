import { fetchProductById } from "../services/product.service.js";

export function getFavoritesPage(req, res) {
    if (!req.session.favorites) req.session.favorites = [];

    res.render('favorites', {
        title: 'Favorites',
        favorites: req.session.favorites
    });
}

export function getFavorites(req, res) {
    if (!req.session.favorites) req.session.favorites = [];

    res.status(200).json({
        success: true,
        message: "Favorites retrieved", 
        favorites: req.session.favorites
    });

}

export async function addFavorite(req, res) {
    try {
        const {productId} = req.body;

        const product = await fetchProductById(productId);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }
        if (!req.session.favorites) req.session.favorites = [];

        const alreadyFavorited = req.session.favorites.some(
            (item) => item.productId === product.product_id
        );
        
        if (!alreadyFavorited) {
            req.session.favorites.push({
                productId: product.product_id,
                name: product.name,
                price: product.price
            });
        }
    
    res.status(200).json({
        success: true,
        message: alreadyFavorited ? "Already in favorites" : "Added to favorites",
        favorites: req.session.favorites
    });

  }catch (err) {
    console.error("Error adding favorite:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
    
}

export function removeFavorite(req, res) {
    if (!req.session.favorites) req.session.favorites = [];

    const productId = Number(req.params.productId);

    req.session.favorites = req.session.favorites.filter(
        (item) => item.productId !== productId
    );
    res.status(200).json({
        success: true,
        message: "Removed from favorites",
        favorites: req.session.favorites
    })
    }

    export function clearFavorites(req, res) {
        req.session.favorites = [];

        res.status(200).json({
            success: true,
            message: "Favorites cleared",
            favorites: req.session.favorites
        });
        
    }
