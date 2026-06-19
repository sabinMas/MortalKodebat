import { fetchProductById } from "../services/product.service.js";

export function getCartPage(req, res) {
    if (!req.session.cart) req.session.cart = [];

    res.render('cart', {
        title: 'Cart',
        cart: req.session.cart
    });
}

export function getCart(req, res) {
    if (!req.session.cart) req.session.cart = [];

    res.status(200).json({
        success: true,
        message: "Cart retrieved",
        cart: req.session.cart
    });
}

export async function addToCart(req, res) {
    try {
        const {productId} = req.body;

        const product = await fetchProductById(productId);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }
        if (!req.session.cart) req.session.cart = [];

        const existingItem = req.session.cart.find(
            (item) => item.productId === product.product_id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            req.session.cart.push({
                productId: product.product_id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

    res.status(200).json({
        success: true,
        message: existingItem ? "Item quantity increased" : "Added to cart",
        cart: req.session.cart
    });

  }catch (err) {
    console.error("Error adding to cart:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export function removeFromCart(req, res) {
    if (!req.session.cart) req.session.cart = [];

    const productId = Number(req.params.productId);

    req.session.cart = req.session.cart.filter(
        (item) => item.productId !== productId
    );
    res.status(200).json({
        success: true,
        message: "Removed from cart",
        cart: req.session.cart
    })
}

export function clearCart(req, res) {
    req.session.cart = [];

    res.status(200).json({
        success: true,
        message: "Cart cleared",
        cart: req.session.cart
    });
}
