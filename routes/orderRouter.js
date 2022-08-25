const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

const { validateToken } = require('../middlewares/auth.js');

router.get('/point', validateToken, orderController.lookUpPoint)

router.post('/payment', validateToken, orderController.payment)

module.exports = {
	router
}