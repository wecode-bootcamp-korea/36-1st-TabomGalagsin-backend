const productsService = require('../services/productsService');

const getProductDetail = async (req, res) => {
    try {
        const { productId } = req.params;
        const products = await productsService.getProductDetailByproductId(productId);
        return res.status(200).json({products : products})
    } catch (err) {
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

module.exports = {
    getProductDetail
}