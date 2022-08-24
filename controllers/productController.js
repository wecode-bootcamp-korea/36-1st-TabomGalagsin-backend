const productService = require('../services/productService');

const newLookUp = async (req, res) => {
    try {
        const newProduct = await productService.LookUpNew();
        res.status(200).json({newProduct : newProduct}) 
    }
    catch (err) {
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

const recommendLookUp = async (req, res) => {
    try {
        const decoded = await req.body.decoded;
        const recommendProduct = await productService.lookUpRecommend(decoded);
        res.status(200).json({recommendProduct : recommendProduct})
    }
    catch (err) {
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

const randomLookUp = async (req, res) => {
    try {
        const randomProduct = await productService.randomLookUp();
        res.status(200).json({randomProduct : randomProduct})
    }
    catch (err) {
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

const productColor = async (req, res) => {
    try {
        const productId = req.params.productId
        const colorId = req.params.colorId
        const productColorUrl = await productService.productColorLookUp(productId, colorId);
        res.status(200).json({productColorUrl : productColorUrl})
    }
    catch (err) {
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

const getProductDetail = async (req, res) => {
    try {
        const { productId } = req.params;
        const [products] = await productService.getProductDetailByproductId(productId);
        return res.status(200).json({products : products})
    } catch (err) {
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

module.exports = {
    productColor,
    newLookUp,
    recommendLookUp,
    randomLookUp,
    getProductDetail
}    