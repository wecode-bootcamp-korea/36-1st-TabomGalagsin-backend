const express = require('express');
const orderController = require('../controllers/orderController');
const errorHandler =require('../middlewares/errorHandler');

const router = express.Router();

const { validateToken } = require('../middlewares/auth.js');

router.get('/point', validateToken, errorHandler(orderController.lookUpPoint));

router.post('/payment', validateToken, errorHandler(orderController.payment));

module.exports = {
	router
}