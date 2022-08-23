const productsService = require('../services/productsService');

const searchProductDetail = async (req, res) => {
    try {
        const { productId } = req.params;
        const products = await productsService.searchProduct(productId);
        return res.status(200).json({products : products})
    } catch (err) {
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

module.exports = {
    searchProductDetail
}