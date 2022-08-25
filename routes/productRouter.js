const express = require('express');
const productController = require('../controllers/productController');
const errorHandler =require('../middlewares/errorHandler');
const { validateToken } = require('../middlewares/auth.js');

const router = express.Router();

router.get('/new/list', errorHandler(productController.newLookUp));

router.get('/recommend/list', validateToken, errorHandler(productController.recommendLookUp));

router.get('/random/list', errorHandler(productController.randomLookUp));

router.get('/color/:colorId/product/:productId', errorHandler(productController.productColor));

router.get('/:productId', errorHandler(productController.getProductDetail));

module.exports = {
	router
}