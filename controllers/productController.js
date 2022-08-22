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
        const token = await req.headers.authorization;
        if(token){
            const recommendProduct = await productService.lookUpRecommend(token);
            res.status(200).json({recommendProduct : recommendProduct})
        }
        else {
            const notrecommendProduct = await productService.notlookUpRecommend();
            res.status(200).json({notrecommendProduct : notrecommendProduct})
        }
    }
    catch (err) {
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

const productColor = async (req, res) => {
    try {
        const productId = req.params.productId
        const colorId = req.params.colorId
        const productColorUrl = await productService.productColor(productId, colorId);
        res.status(200).json({productColorUrl : productColorUrl})
    }
    catch (err) {
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

module.exports = {
    productColor, newLookUp, recommendLookUp
}