const express = require('express');
const productController = require('../controllers/productController');
const { validateToken } = require('../middlewares/auth.js');

const router = express.Router();

router.get('/new/list', productController.newLookUp)

router.get('/recommend/list', validateToken, productController.recommendLookUp)

router.get('/random/list', productController.randomLookUp)

router.get('/:productId/color/:colorId', productController.productColor)

module.exports = {
	router
}