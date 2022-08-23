const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:productId', productController.searchProductDetail);

module.exports = {
    router
}