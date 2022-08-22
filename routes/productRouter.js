const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/new', productController.newLookUp)

router.get('/recommend', productController.recommendLookUp)

router.get('/imageUrl/product/:productId/color/:colorId', productController.productColor)

module.exports = {
	router
}