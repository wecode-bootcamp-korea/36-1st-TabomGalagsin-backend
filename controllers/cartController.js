const cartService = require('../services/cartService');

const errorHandler = (err, res) => {
    return res.status(err.statusCode || 500).json({ message: err.message });
}

const createCart = async (req, res) => {
    try {
        const { productId, quantity, sizeId, colorId, decoded } = req.body;
        const userId = decoded.id;

        if(!productId || !quantity || !sizeId || !colorId) {
            return res.status(400).json({message : "KEY_ERROR"});
        }

        await cartService.createCart(productId, quantity, sizeId, colorId, userId);
        return res.status(201).json({ message: "CREATE_CART" });
    } catch (err) {
        console.log(err)
        errorHandler(err, res);
    }
}

module.exports = {
    createCart
}