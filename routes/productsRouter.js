const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:productId', productController.getProductDetail);

module.exports = {
    router
}