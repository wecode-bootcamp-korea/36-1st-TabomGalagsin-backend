const categoriesService = require('../services/categoriesService');

const erroHandler = (err, res) => {
    return res.status(err.statusCode || 500).json({ message: err.message });
}

const categories = async (req, res) => {
    const { categoriesId } = req.params;

    if (Number(categoriesId) === 1) {
        return await type(req, res)
    } else if (Number(categoriesId) === 2) {
        return await color(req, res)
    }
}

const type = async (req, res) => {
    try {
        const { typeId } = req.params;

        const products = await categoriesService.typeSearch(typeId);
        return res.status(200).json({ products: products });
    } catch (err) {
        erroHandler(err, res);
    }
}

const color = async (req, res) => {
    try {
        const { typeId } = req.params;
        
        const products = await categoriesService.colorsSearch(typeId);
        return res.status(200).json({ products: products });
    } catch (err) {
        erroHandler(err, res);
    }
}

module.exports = {
    categories
}