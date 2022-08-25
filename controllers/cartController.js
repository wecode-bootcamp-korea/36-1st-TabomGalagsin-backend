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

const searchCart = async (req, res) => {
    try {
        const { decoded } = req.body;
        const cartInfo = await cartService.searchCart(decoded.id);
        return res.status(200).json({ cart: cartInfo });
    } catch (err) {
        errorHandler(err, res);
    }
}

const updateCart = async (req, res) => {
    try {
        const { orderItemsId } = req.params;
        const { decoded, quantity } = req.body;
        
        await cartService.updateCart(decoded.id, orderItemsId, quantity);
        return res.status(200).json({ message: "CART_UPDATED" });
    } catch (err) {
        errorHandler(err, res);
    }
}

const deleteCart = async (req, res) => {
    try {
        const { orderItemsId } = req.params;
        await cartService.deleteCart(orderItemsId);
        return res.status(204).json({ message: "DELETED_DATA" });
    } catch (err) {
        errorHandler(err, res);
    }
}

module.exports = {
    createCart,
    searchCart,
    updateCart,
    deleteCart
}